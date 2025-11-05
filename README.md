# Emoji Eraser

[![CI](https://github.com/dvbwitso/emoji-eraser/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/dvbwitso/emoji-eraser/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/DabwitsoMweemba.emoji-eraser?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=DabwitsoMweemba.emoji-eraser)
[![VS Code Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/DabwitsoMweemba.emoji-eraser)](https://marketplace.visualstudio.com/items?itemName=DabwitsoMweemba.emoji-eraser)

A powerful **VS Code extension** that cleans AI-generated code artifacts from your codebase. Remove emojis, debug statements, AI comments, trailing whitespace, and more—perfect for teams working with AI coding assistants like GitHub Copilot, ChatGPT, and Claude.

---

## Features

### Core Cleanup Features
- **Remove Emojis** - Clean emojis from code, comments, strings, or everywhere
- **Remove Debug Statements** - Strip console.log, print(), debugger, and similar debug code
- **Remove AI Comment Markers** - Clean up "AI-generated", "Copilot suggestion" comments
- **Remove Trailing Whitespace** - Clean up whitespace at line ends
- **Clean All AI Artifacts** - One-click cleanup of all common AI code issues

### Advanced Options
- **Single File Cleanup** - Clean the currently active file
- **Workspace-Wide Cleanup** - Scan and clean your entire workspace in bulk
- **Selective Removal** - Target comments only, strings only, or specific artifact types
- **Preview Changes** - See diffs before applying changes
- **Smart Formatting** - Fixes double spaces and preserves code structure

**Why this extension?**
- Keep codebases professional and production-ready after AI assistance
- Prevent accidental debug statements and emojis in production code
- Maintain consistent code quality across AI-assisted projects
- Simple UX: one command per scope with optional previews

---

## Available Commands

Open the Command Palette (Ctrl/Cmd+Shift+P) and type:

### Emoji Removal
- **Remove Emojis from Current File** — `emoji-eraser.removeFromFile`
- **Remove Emojis from Workspace** — `emoji-eraser.removeFromWorkspace`
- **Remove Emojis from Comments Only** — `emoji-eraser.removeFromComments`
- **Remove Emojis from Strings Only** — `emoji-eraser.removeFromStrings`

### AI Artifact Cleanup
- **Clean All AI Artifacts** — `emoji-eraser.cleanAllArtifacts` ⭐ *Recommended*
- **Remove Debug Statements** — `emoji-eraser.removeDebugStatements`
- **Remove AI Comment Markers** — `emoji-eraser.removeAIComments`
- **Remove Trailing Whitespace** — `emoji-eraser.removeTrailingWhitespace`

---

## Supported Languages

**Debug Statement Removal** supports:
- **JavaScript/TypeScript** - console.log, debugger
- **React (JSX/TSX)** - console.log, debugger
- **Vue** - console.log, debugger
- **Svelte** - console.log, debugger
- **Python** - print, pprint, breakpoint
- **Java** - System.out.println, System.err.println
- **Kotlin** - println, print
- **C#** - Console.WriteLine, Debug.WriteLine
- **PHP** - var_dump, print_r, echo
- **Ruby** - puts, p, pp
- **Go** - fmt.Println, log.Println
- **Rust** - println!, print!, dbg!
- **C/C++** - printf, std::cout
- **Swift** - print, debugPrint
- **Dart/Flutter** - print, debugPrint

**Emoji & AI Comment Removal** works with **all file types**!

**Trailing Whitespace Removal** works with **all file types**!

---

## Before / After Examples

### Example 1: AI-Generated Code Cleanup

**Before:**
```js
// AI-generated code
function deployApp() {
  const message = "Deploy completed ";
  console.log("Debug: Starting deployment ");
  
  debugger;
  
  // Copilot suggestion: Add error handling
  return message;   
}
```

**After running "Clean All AI Artifacts":**
```js
function deployApp() {
  const message = "Deploy completed";
  
  return message;
}
```

### Example 2: Debug Statement Removal

**Before (Python):**
```python
def calculate(x, y):
    print(f"Debug: x={x}, y={y}")
    result = x + y
    print(f"Result: {result}")
    breakpoint()
    return result
```

**After:**
```python
def calculate(x, y):
    result = x + y
    return result
```

---

## Screenshots

1. ![Command palette demo](images/Demo-CMD+SHIFT+P.png)
2. ![Prompt to continue dialog](images/prompt-to-continue.png)
3. ![Removing emojis demo](images/removing-emojis.png)

---

## Configuration

Configure the extension in VS Code settings:

```json
{
  "emojiEraser.fileTypes": [
    "javascript",
    "typescript",
    "python",
    "java",
    "markdown",
    "json",
    "html",
    "css"
  ],
  "emojiEraser.showNotifications": true
}
```

**Settings:**
- `emojiEraser.fileTypes` - File types to scan for artifacts (workspace operations)
- `emojiEraser.showNotifications` - Show summary notifications after cleanup

---

## Installation & Development

```bash
git clone https://github.com/dvbwitso/emoji-eraser.git
cd emoji-eraser
npm install
npm run compile
code .
# Press F5 to launch Extension Development Host
```

---

## Contributing

Contributions welcome — open an issue with the feature idea or bug.

## License

MIT © Dabwitso Mweemba
