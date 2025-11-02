# Emoji Eraser

A lightweight **VS Code extension** that removes all emojis from your codebase. Keep your code clean, professional, and emoji-free—perfect for teams, APIs, or projects where emojis accidentally sneak into strings, comments, or markdown in this LLM era.

---

## Features

### Core Features
- **Single File Emoji Removal**  
  Remove all emojis from the currently active file with a single command.  

- **Workspace-Wide Emoji Removal**  
  Scan your entire workspace and clean emojis in bulk.  

- **Selective Removal**  
  Options to remove emojis from:
  - **Comments only**  
  - **Strings only**  
  - **Everywhere in code**

- **Preview / Undo**  
  Preview changes before applying or use VS Code’s native undo for safety.

- **Emoji Count / Summary**  
  Get notifications like:
  - “Removed 24 emojis from this file”  
  - “Workspace: 137 emojis removed”

- **Hotkey Support (Optional)**  
  Assign a shortcut for fast emoji removal without opening the Command Palette.

---

### Optional Future Enhancements
- **Auto-scan on save**  
- **File-type filters** (clean `.js`, `.ts`, `.md` only)  
- **Log file** to track cleaned files and counts  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dvbwitso/emoji-eraser.git
cd emoji-eraser
```

2. Install dependencies

```bash
npm install
```

3. Compile TypeScript

```bash
npm run compile
```

4. Run in VS Code

Open the project in VS Code and press F5 to run the extension in a new Extension Development Host window.

---

## Usage

- Open a file → Ctrl+Shift+P → "Remove Emojis from Current File"
- Clean the entire workspace → Ctrl+Shift+P → "Remove Emojis from Workspace"
- Optional: Configure hotkeys in VS Code settings

---

## Contributing

Contributions and suggestions are welcome. Please open an issue or submit a pull request.

---

## License

MIT License © Dabwitso Mweemba
