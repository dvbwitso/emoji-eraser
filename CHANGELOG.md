# Change Log

All notable changes to the "Emoji Eraser" extension will be documented in this file.

## [1.1.1] - 2025-11-05

### Documentation
- Updated README with clearer feature descriptions
- Improved supported languages documentation
- Enhanced examples and use cases

## [1.1.0] - 2025-11-04

### Major Update: AI Code Cleanup Features

#### New Features
-  **Clean All AI Artifacts** - One-click cleanup of all AI-generated code issues
-  **Remove Debug Statements** - Strip console.log, print(), debugger, and similar debug code
  - Supports 15+ languages: JavaScript, TypeScript, React (JSX/TSX), Vue, Svelte, Python, Java, Kotlin, C#, PHP, Ruby, Go, Rust, C/C++, Swift, Dart/Flutter
-  **Remove AI Comment Markers** - Clean "AI-generated", "Copilot suggestion" comments
-  **Remove Trailing Whitespace** - Clean whitespace at line ends
-  **Smart Spacing** - Fix double spaces left after cleanup operations

#### New Commands
- `Emoji Eraser: Clean All AI Artifacts` (recommended for comprehensive cleanup)
- `Emoji Eraser: Remove Debug Statements`
- `Emoji Eraser: Remove AI Comment Markers`
- `Emoji Eraser: Remove Trailing Whitespace`

#### Improvements
- Enhanced extension description to highlight AI code cleanup capabilities
- Added support for multiple programming languages in debug statement detection
- Better formatting preservation after cleanup operations
- Updated README with new examples and use cases

## [1.0.0] - 2025-11-02

### Initial Release

#### Features
-  Remove emojis from current file
-  Remove emojis from entire workspace
-  Remove emojis from comments only
-  Remove emojis from strings only
-  Preview changes before applying
-  Emoji count statistics and notifications
-  Configurable file type filters
-  Confirmation dialogs for safety
-  Progress indicators for workspace operations

#### Configuration
- `emojiEraser.fileTypes`: Array of language IDs to process
- `emojiEraser.showNotifications`: Toggle summary notifications

#### Commands
- `Emoji Eraser: Remove Emojis from Current File`
- `Emoji Eraser: Remove Emojis from Workspace`
- `Emoji Eraser: Remove Emojis from Comments Only`
- `Emoji Eraser: Remove Emojis from Strings Only`
