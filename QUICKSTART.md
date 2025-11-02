# Emoji Eraser - Quick Start Guide

##  What is Emoji Eraser?

Emoji Eraser is a VS Code extension that helps you remove emojis from your codebase. Perfect for maintaining clean, professional code or removing accidentally added emojis.

##  How to Test the Extension

### 1. Launch the Extension
1. Open this project in VS Code
2. Press **F5** (or Run → Start Debugging)
3. This will open a new "Extension Development Host" window

### 2. Test the Commands

In the Extension Development Host window:

#### Test Single File Removal
1. Open the `test-emoji-file.ts` file (included in this project)
2. Press **Cmd+Shift+P** (Mac) or **Ctrl+Shift+P** (Windows/Linux)
3. Type "Remove Emojis from Current File"
4. Click "Yes" to confirm
5. Watch the emojis disappear!

#### Test Preview Mode
1. Open any file with emojis
2. Run the command again
3. This time, click "Preview"
4. You'll see a diff view showing what will be removed

#### Test Comments-Only Removal
1. Open a file with emojis in both comments and code
2. Run "Remove Emojis from Comments Only"
3. Only emojis in comments will be removed

#### Test Strings-Only Removal
1. Open a file with emojis in strings
2. Run "Remove Emojis from Strings Only"
3. Only emojis in string literals will be removed

#### Test Workspace Removal
1. Create a few test files with emojis
2. Run "Remove Emojis from Workspace"
3. Confirm the operation
4. Watch the progress notification
5. Get a summary of removed emojis

##  Configuration

You can configure the extension in VS Code settings:

```json
{
  "emojiEraser.fileTypes": [
    "javascript",
    "typescript",
    "python",
    "java",
    "markdown"
  ],
  "emojiEraser.showNotifications": true
}
```

##  Available Commands

- `Emoji Eraser: Remove Emojis from Current File` - Remove all emojis from active file
- `Emoji Eraser: Remove Emojis from Workspace` - Scan and clean entire workspace
- `Emoji Eraser: Remove Emojis from Comments Only` - Target comments only
- `Emoji Eraser: Remove Emojis from Strings Only` - Target string literals only

##  Optional: Add Keyboard Shortcuts

1. Open Keyboard Shortcuts (Cmd+K Cmd+S or Ctrl+K Ctrl+S)
2. Search for "emoji-eraser"
3. Assign your preferred shortcuts

Example:
```json
{
  "key": "ctrl+alt+e",
  "command": "emoji-eraser.removeFromFile"
}
```

##  Publishing the Extension

When ready to publish:

1. Install vsce globally:
   ```bash
   npm install -g vsce
   ```

2. Create a publisher account at https://marketplace.visualstudio.com/

3. Package the extension:
   ```bash
   vsce package
   ```

4. Publish:
   ```bash
   vsce publish
   ```

## Troubleshooting

- **Extension not loading?** Make sure you compiled with `npm run compile`
- **Commands not showing?** Reload the Extension Development Host window
- **Changes not applying?** Check the file isn't read-only

##  Tips

- Use the Preview option first to see what will be changed
- The extension respects VS Code's undo functionality
- Workspace operations can be cancelled mid-process
- Check the Output panel for any error messages

Enjoy cleaning your codebase! 
