import * as vscode from 'vscode';
import {
  removeEmojis,
  countEmojis,
  removeEmojisFromComments,
  removeEmojisFromStrings,
  formatSummary,
  type EmojiStats
} from './utils';

/**
 * Activate the extension
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Emoji Eraser extension is now active!');

  // Register command: Remove emojis from current file
  const removeFromFileCommand = vscode.commands.registerCommand(
    'emoji-eraser.removeFromFile',
    async () => {
      await removeEmojisFromCurrentFile();
    }
  );

  // Register command: Remove emojis from workspace
  const removeFromWorkspaceCommand = vscode.commands.registerCommand(
    'emoji-eraser.removeFromWorkspace',
    async () => {
      await removeEmojisFromWorkspace();
    }
  );

  // Register command: Remove emojis from comments only
  const removeFromCommentsCommand = vscode.commands.registerCommand(
    'emoji-eraser.removeFromComments',
    async () => {
      await removeEmojisFromCurrentFile('comments');
    }
  );

  // Register command: Remove emojis from strings only
  const removeFromStringsCommand = vscode.commands.registerCommand(
    'emoji-eraser.removeFromStrings',
    async () => {
      await removeEmojisFromCurrentFile('strings');
    }
  );

  context.subscriptions.push(
    removeFromFileCommand,
    removeFromWorkspaceCommand,
    removeFromCommentsCommand,
    removeFromStringsCommand
  );
}

/**
 * Remove emojis from the currently active editor
 */
async function removeEmojisFromCurrentFile(mode: 'all' | 'comments' | 'strings' = 'all') {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No active file to process.');
    return;
  }

  const document = editor.document;
  const text = document.getText();
  const emojiCount = countEmojis(text);

  if (emojiCount === 0) {
    vscode.window.showInformationMessage('No emojis found in this file.');
    return;
  }

  // Ask for confirmation
  const answer = await vscode.window.showWarningMessage(
    `Found ${emojiCount} emoji(s) in this file. Remove them?`,
    'Yes',
    'Preview',
    'Cancel'
  );

  if (answer === 'Cancel' || !answer) {
    return;
  }

  let cleanedText: string;

  switch (mode) {
    case 'comments':
      cleanedText = removeEmojisFromComments(text, document.languageId);
      break;
    case 'strings':
      cleanedText = removeEmojisFromStrings(text);
      break;
    default:
      cleanedText = removeEmojis(text);
  }

  if (answer === 'Preview') {
    // Show diff in a new editor
    await showDiff(document, text, cleanedText);
    return;
  }

  // Apply the changes
  const success = await editor.edit((editBuilder) => {
    const firstLine = document.lineAt(0);
    const lastLine = document.lineAt(document.lineCount - 1);
    const fullRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
    editBuilder.replace(fullRange, cleanedText);
  });

  if (success) {
    const config = vscode.workspace.getConfiguration('emojiEraser');
    const showNotifications = config.get<boolean>('showNotifications', true);

    if (showNotifications) {
      const finalCount = countEmojis(cleanedText);
      const removed = emojiCount - finalCount;
      vscode.window.showInformationMessage(
        `✅ Removed ${removed} emoji(s) from this file.`
      );
    }
  } else {
    vscode.window.showErrorMessage('Failed to remove emojis.');
  }
}

/**
 * Remove emojis from all files in the workspace
 */
async function removeEmojisFromWorkspace() {
  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (!workspaceFolders) {
    vscode.window.showWarningMessage('No workspace folder open.');
    return;
  }

  // Get configuration
  const config = vscode.workspace.getConfiguration('emojiEraser');
  const fileTypes = config.get<string[]>('fileTypes', [
    'javascript',
    'typescript',
    'python',
    'java',
    'markdown',
    'json',
    'html',
    'css'
  ]);

  // Ask for confirmation
  const answer = await vscode.window.showWarningMessage(
    'This will remove emojis from all files in the workspace. Continue?',
    'Yes',
    'Cancel'
  );

  if (answer !== 'Yes') {
    return;
  }

  // Show progress
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Removing emojis from workspace',
      cancellable: true
    },
    async (progress, token) => {
      const stats: EmojiStats = {
        totalEmojis: 0,
        filesProcessed: 0,
        filesWithEmojis: 0
      };

      // Find all files in workspace
      const files = await vscode.workspace.findFiles(
        '**/*',
        '{**/node_modules/**,**/.git/**,**/dist/**,**/out/**,**/build/**}'
      );

      progress.report({ increment: 0, message: `Found ${files.length} files` });

      for (let i = 0; i < files.length; i++) {
        if (token.isCancellationRequested) {
          vscode.window.showWarningMessage('Operation cancelled.');
          return;
        }

        const file = files[i];
        if (!file) continue;

        progress.report({
          increment: (100 / files.length),
          message: `Processing ${i + 1}/${files.length}`
        });

        try {
          const document = await vscode.workspace.openTextDocument(file);

          // Check if file type is in the allowed list
          if (!fileTypes.includes(document.languageId)) {
            continue;
          }

          stats.filesProcessed++;

          const text = document.getText();
          const emojiCount = countEmojis(text);

          if (emojiCount === 0) {
            continue;
          }

          stats.filesWithEmojis++;
          stats.totalEmojis += emojiCount;

          const cleanedText = removeEmojis(text);

          // Apply changes
          const edit = new vscode.WorkspaceEdit();
          const firstLine = document.lineAt(0);
          const lastLine = document.lineAt(document.lineCount - 1);
          const fullRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
          edit.replace(file, fullRange, cleanedText);
          await vscode.workspace.applyEdit(edit);

          // Save the file
          await document.save();
        } catch (error) {
          console.error(`Error processing file ${file.fsPath}:`, error);
        }
      }

      // Show summary
      const config = vscode.workspace.getConfiguration('emojiEraser');
      const showNotifications = config.get<boolean>('showNotifications', true);

      if (showNotifications) {
        vscode.window.showInformationMessage(formatSummary(stats));
      }
    }
  );
}

/**
 * Show a diff view between original and cleaned text
 */
async function showDiff(
  originalDocument: vscode.TextDocument,
  originalText: string,
  cleanedText: string
) {
  // Create a temporary URI for the cleaned version
  const originalUri = originalDocument.uri;
  const cleanedUri = originalUri.with({
    scheme: 'untitled',
    path: originalUri.path + '.cleaned'
  });

  // Create a new document with the cleaned text
  const cleanedDoc = await vscode.workspace.openTextDocument(cleanedUri);
  const edit = new vscode.WorkspaceEdit();
  edit.insert(cleanedUri, new vscode.Position(0, 0), cleanedText);
  await vscode.workspace.applyEdit(edit);

  // Show the diff
  await vscode.commands.executeCommand(
    'vscode.diff',
    originalUri,
    cleanedUri,
    `Emoji Removal Preview: ${originalDocument.fileName}`
  );
}

/**
 * Deactivate the extension
 */
export function deactivate() {
  console.log('Emoji Eraser extension is now deactivated.');
}
