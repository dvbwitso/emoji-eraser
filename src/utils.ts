/**
 * Comprehensive emoji regex pattern
 * Matches most emojis including:
 * - Basic emojis (-)
 * - Symbols & Pictographs
 * - Transport & Map symbols
 * - Supplementary symbols
 * - Skin tone modifiers
 * - Regional indicators (flags)
 */
export const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{238C}-\u{2454}\u{20D0}-\u{20FF}\u{FE0F}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}]/gu;

/**
 * Remove all emojis from a given text string
 * @param text - The input text containing emojis
 * @returns Text with all emojis removed
 */
export function removeEmojis(text: string): string {
  return text.replace(EMOJI_REGEX, '');
}

/**
 * Count the number of emojis in a given text
 * @param text - The input text
 * @returns Number of emojis found
 */
export function countEmojis(text: string): number {
  const matches = text.match(EMOJI_REGEX);
  return matches ? matches.length : 0;
}

/**
 * Check if text contains any emojis
 * @param text - The input text
 * @returns True if emojis are present
 */
export function hasEmojis(text: string): boolean {
  return EMOJI_REGEX.test(text);
}

/**
 * Remove emojis from code comments only
 * This is a basic implementation that handles common comment patterns
 * @param text - The input code text
 * @param languageId - VS Code language identifier
 * @returns Text with emojis removed from comments
 */
export function removeEmojisFromComments(text: string, languageId: string): string {
  const lines = text.split('\n');
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]!;
    
    // Handle single-line comments (// or # or --)
    if (languageId === 'python' || languageId === 'ruby' || languageId === 'bash') {
      // Python, Ruby, Bash use #
      const commentMatch = line.match(/^(\s*)(#.*)$/);
      if (commentMatch) {
        result.push(commentMatch[1]! + removeEmojis(commentMatch[2]!));
        continue;
      }
    } else if (languageId === 'sql') {
      // SQL uses --
      const commentMatch = line.match(/^(\s*)(--.*)$/);
      if (commentMatch) {
        result.push(commentMatch[1]! + removeEmojis(commentMatch[2]!));
        continue;
      }
    } else {
      // JavaScript, TypeScript, Java, C++, etc. use //
      const commentMatch = line.match(/^(\s*)(\/\/.*)$/);
      if (commentMatch) {
        result.push(commentMatch[1]! + removeEmojis(commentMatch[2]!));
        continue;
      }
    }
    
    // Handle inline comments after code
    if (languageId !== 'python' && languageId !== 'ruby' && languageId !== 'bash') {
      const inlineMatch = line.match(/^(.+?)(\/\/.*)$/);
      if (inlineMatch) {
        result.push(inlineMatch[1]! + removeEmojis(inlineMatch[2]!));
        continue;
      }
    }
    
    // For Markdown, handle heading lines and list items
    if (languageId === 'markdown') {
      const mdMatch = line.match(/^(\s*)(#{1,6}\s+|[-*+]\s+|>\s+)(.*)$/);
      if (mdMatch) {
        result.push(mdMatch[1]! + mdMatch[2]! + removeEmojis(mdMatch[3]!));
        continue;
      }
    }
    
    result.push(line);
  }

  return result.join('\n');
}

/**
 * Remove emojis from string literals only
 * This is a simplified implementation for common cases
 * @param text - The input code text
 * @returns Text with emojis removed from strings
 */
export function removeEmojisFromStrings(text: string): string {
  // Match single and double quoted strings and remove emojis from them
  return text.replace(/(['"`])(?:(?=(\\?))\2.)*?\1/g, (match) => {
    return removeEmojis(match);
  });
}

/**
 * Get file extension summary statistics
 */
export interface EmojiStats {
  totalEmojis: number;
  filesProcessed: number;
  filesWithEmojis: number;
}

/**
 * Format emoji removal summary message
 * @param stats - Statistics object
 * @returns Formatted message string
 */
export function formatSummary(stats: EmojiStats): string {
  if (stats.totalEmojis === 0) {
    return `No emojis found in ${stats.filesProcessed} file(s).`;
  }
  
  return ` Removed ${stats.totalEmojis} emoji(s) from ${stats.filesWithEmojis} file(s) (${stats.filesProcessed} total files scanned).`;
}

// ============================================================================
// AI Code Cleanup Functions
// ============================================================================

/**
 * Remove trailing whitespace from each line
 * @param text - The input text
 * @returns Text with trailing whitespace removed
 */
export function removeTrailingWhitespace(text: string): string {
  return text.split('\n').map(line => line.replace(/\s+$/, '')).join('\n');
}

/**
 * Count lines with trailing whitespace
 * @param text - The input text
 * @returns Number of lines with trailing whitespace
 */
export function countTrailingWhitespace(text: string): number {
  const lines = text.split('\n');
  return lines.filter(line => /\s+$/.test(line)).length;
}

/**
 * Debug statement patterns for different languages
 */
const DEBUG_PATTERNS: Record<string, RegExp[]> = {
  javascript: [
    /^\s*console\.(log|debug|info|warn|error|trace)\([^)]*\);?\s*$/gm,
    /^\s*debugger;?\s*$/gm,
  ],
  typescript: [
    /^\s*console\.(log|debug|info|warn|error|trace)\([^)]*\);?\s*$/gm,
    /^\s*debugger;?\s*$/gm,
  ],
  javascriptreact: [
    /^\s*console\.(log|debug|info|warn|error|trace)\([^)]*\);?\s*$/gm,
    /^\s*debugger;?\s*$/gm,
  ],
  typescriptreact: [
    /^\s*console\.(log|debug|info|warn|error|trace)\([^)]*\);?\s*$/gm,
    /^\s*debugger;?\s*$/gm,
  ],
  vue: [
    /^\s*console\.(log|debug|info|warn|error|trace)\([^)]*\);?\s*$/gm,
    /^\s*debugger;?\s*$/gm,
  ],
  svelte: [
    /^\s*console\.(log|debug|info|warn|error|trace)\([^)]*\);?\s*$/gm,
    /^\s*debugger;?\s*$/gm,
  ],
  python: [
    /^\s*print\([^)]*\)\s*$/gm,
    /^\s*pprint\([^)]*\)\s*$/gm,
    /^\s*breakpoint\(\)\s*$/gm,
  ],
  java: [
    /^\s*System\.out\.print(ln)?\([^)]*\);?\s*$/gm,
    /^\s*System\.err\.print(ln)?\([^)]*\);?\s*$/gm,
  ],
  kotlin: [
    /^\s*println\([^)]*\)\s*$/gm,
    /^\s*print\([^)]*\)\s*$/gm,
  ],
  csharp: [
    /^\s*Console\.Write(Line)?\([^)]*\);?\s*$/gm,
    /^\s*Debug\.Write(Line)?\([^)]*\);?\s*$/gm,
  ],
  php: [
    /^\s*var_dump\([^)]*\);?\s*$/gm,
    /^\s*print_r\([^)]*\);?\s*$/gm,
    /^\s*echo\s+[^;]+;?\s*$/gm,
  ],
  ruby: [
    /^\s*puts\s+[^\n]+$/gm,
    /^\s*p\s+[^\n]+$/gm,
    /^\s*pp\s+[^\n]+$/gm,
  ],
  go: [
    /^\s*fmt\.Print(ln|f)?\([^)]*\)\s*$/gm,
    /^\s*log\.Print(ln|f)?\([^)]*\)\s*$/gm,
  ],
  rust: [
    /^\s*println!\([^)]*\);?\s*$/gm,
    /^\s*print!\([^)]*\);?\s*$/gm,
    /^\s*dbg!\([^)]*\);?\s*$/gm,
  ],
  cpp: [
    /^\s*std::cout\s*<<[^;]+;?\s*$/gm,
    /^\s*printf\([^)]*\);?\s*$/gm,
  ],
  c: [
    /^\s*printf\([^)]*\);?\s*$/gm,
  ],
  swift: [
    /^\s*print\([^)]*\)\s*$/gm,
    /^\s*debugPrint\([^)]*\)\s*$/gm,
  ],
  dart: [
    /^\s*print\([^)]*\);?\s*$/gm,
    /^\s*debugPrint\([^)]*\);?\s*$/gm,
  ],
};

/**
 * Remove debug statements from code
 * @param text - The input code text
 * @param languageId - VS Code language identifier
 * @returns Text with debug statements removed
 */
export function removeDebugStatements(text: string, languageId: string): string {
  const patterns = DEBUG_PATTERNS[languageId] || DEBUG_PATTERNS['javascript'];
  let result = text;
  
  for (const pattern of patterns) {
    result = result.replace(pattern, '');
  }
  
  // Remove empty lines left by debug statement removal
  result = result.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return result;
}

/**
 * Count debug statements in code
 * @param text - The input code text
 * @param languageId - VS Code language identifier
 * @returns Number of debug statements found
 */
export function countDebugStatements(text: string, languageId: string): number {
  const patterns = DEBUG_PATTERNS[languageId] || DEBUG_PATTERNS['javascript'];
  let count = 0;
  
  for (const pattern of patterns) {
    const matches = text.match(pattern);
    count += matches ? matches.length : 0;
  }
  
  return count;
}

/**
 * AI comment markers to remove
 */
const AI_COMMENT_PATTERNS = [
  /^\s*\/\/\s*(AI-generated|Generated by AI|Copilot|AI suggestion|Generated code).*$/gmi,
  /^\s*#\s*(AI-generated|Generated by AI|Copilot|AI suggestion|Generated code).*$/gmi,
  /^\s*\/\*\s*(AI-generated|Generated by AI|Copilot|AI suggestion|Generated code).*\*\/\s*$/gmi,
  /^\s*<!--\s*(AI-generated|Generated by AI|Copilot|AI suggestion|Generated code).*-->\s*$/gmi,
];

/**
 * Remove AI-generated comment markers
 * @param text - The input text
 * @returns Text with AI comment markers removed
 */
export function removeAIComments(text: string): string {
  let result = text;
  
  for (const pattern of AI_COMMENT_PATTERNS) {
    result = result.replace(pattern, '');
  }
  
  // Clean up multiple consecutive blank lines
  result = result.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return result;
}

/**
 * Count AI comment markers
 * @param text - The input text
 * @returns Number of AI comment markers found
 */
export function countAIComments(text: string): number {
  let count = 0;
  
  for (const pattern of AI_COMMENT_PATTERNS) {
    const matches = text.match(pattern);
    count += matches ? matches.length : 0;
  }
  
  return count;
}

/**
 * Fix multiple consecutive spaces (left after emoji removal or other operations)
 * @param text - The input text
 * @returns Text with consecutive spaces reduced to single space
 */
export function fixMultipleSpaces(text: string): string {
  // Fix multiple spaces in text (but preserve indentation at start of line)
  return text.split('\n').map(line => {
    // Keep leading whitespace, fix the rest
    const match = line.match(/^(\s*)(.*)/);
    if (match) {
      const indent = match[1];
      const content = match[2]!.replace(/  +/g, ' ');
      return indent + content;
    }
    return line;
  }).join('\n');
}

/**
 * Apply all AI cleanup operations
 * @param text - The input text
 * @param languageId - VS Code language identifier
 * @returns Fully cleaned text
 */
export function cleanAllAIArtifacts(text: string, languageId: string): string {
  let result = text;
  
  // Apply all cleaners in sequence
  result = removeEmojis(result);
  result = removeDebugStatements(result, languageId);
  result = removeAIComments(result);
  result = removeTrailingWhitespace(result);
  result = fixMultipleSpaces(result);
  
  return result;
}

/**
 * Statistics for AI cleanup operations
 */
export interface CleanupStats {
  emojisRemoved: number;
  debugStatementsRemoved: number;
  aiCommentsRemoved: number;
  trailingWhitespaceLines: number;
  filesProcessed: number;
  filesModified: number;
}

/**
 * Format cleanup summary message
 * @param stats - Cleanup statistics
 * @returns Formatted message string
 */
export function formatCleanupSummary(stats: CleanupStats): string {
  const items: string[] = [];
  
  if (stats.emojisRemoved > 0) {
    items.push(`${stats.emojisRemoved} emoji(s)`);
  }
  if (stats.debugStatementsRemoved > 0) {
    items.push(`${stats.debugStatementsRemoved} debug statement(s)`);
  }
  if (stats.aiCommentsRemoved > 0) {
    items.push(`${stats.aiCommentsRemoved} AI comment(s)`);
  }
  if (stats.trailingWhitespaceLines > 0) {
    items.push(`trailing whitespace from ${stats.trailingWhitespaceLines} line(s)`);
  }
  
  if (items.length === 0) {
    return `No issues found in ${stats.filesProcessed} file(s).`;
  }
  
  return `Cleaned: ${items.join(', ')} from ${stats.filesModified} file(s).`;
}