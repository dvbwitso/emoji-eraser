/**
 * Comprehensive emoji regex pattern
 * Matches most emojis including:
 * - Basic emojis (😀-🙏)
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
  
  return `✅ Removed ${stats.totalEmojis} emoji(s) from ${stats.filesWithEmojis} file(s) (${stats.filesProcessed} total files scanned).`;
}
