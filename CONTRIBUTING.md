# Contributing to Emoji Eraser

Thank you for your interest in contributing to Emoji Eraser!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dvbwitso/emoji-eraser.git
   cd emoji-eraser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile the extension**
   ```bash
   npm run compile
   ```

4. **Run and test**
   - Press `F5` in VS Code to launch the Extension Development Host
   - Test your changes in the new window

## Development Workflow

1. **Make your changes** in the `src/` directory
2. **Compile** with `npm run compile` or `npm run watch`
3. **Test** by pressing `F5` to launch the extension
4. **Debug** using VS Code's built-in debugger

## File Structure

- `src/extension.ts` - Main extension logic and command registration
- `src/utils.ts` - Utility functions for emoji detection and removal
- `package.json` - Extension manifest and configuration
- `tsconfig.json` - TypeScript compiler settings

## Adding New Features

### Adding a New Command

1. Add command to `package.json` under `contributes.commands`:
   ```json
   {
     "command": "emoji-eraser.yourCommand",
     "title": "Your Command Title",
     "category": "Emoji Eraser"
   }
   ```

2. Register the command in `src/extension.ts`:
   ```typescript
   const yourCommand = vscode.commands.registerCommand(
     'emoji-eraser.yourCommand',
     async () => {
       // Your implementation
     }
   );
   context.subscriptions.push(yourCommand);
   ```

### Adding Configuration Options

Add to `package.json` under `contributes.configuration.properties`:
```json
"emojiEraser.yourSetting": {
  "type": "boolean",
  "default": true,
  "description": "Your setting description"
}
```

## Testing

### Manual Testing
- Use the provided test files: `test-emoji-file.ts` and `test-emoji-file.py`
- Create your own test scenarios
- Test edge cases

### Test Checklist
- [ ] Single file removal
- [ ] Workspace removal
- [ ] Comments-only removal
- [ ] Strings-only removal
- [ ] Preview mode
- [ ] Configuration changes
- [ ] Different file types
- [ ] Large files
- [ ] Edge cases (empty files, no emojis, etc.)

## Code Style

- Follow existing code patterns
- Use TypeScript strict mode
- Add JSDoc comments for public functions
- Keep functions focused and small
- Use meaningful variable names

## Submitting Changes

1. **Fork** the repository
2. **Create a branch** for your feature: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Pull Request Guidelines
- Provide a clear description of the changes
- Reference any related issues
- Include screenshots/GIFs if relevant
- Ensure code compiles without errors
- Test thoroughly before submitting

## Reporting Issues

When reporting issues, please include:
- VS Code version
- Extension version
- Steps to reproduce
- Expected vs actual behavior
- Sample code if applicable

## Feature Requests

We welcome feature suggestions! Please:
- Check existing issues first
- Describe the use case
- Explain why it would be useful
- Provide examples if possible

## Questions?

Feel free to open an issue with your question or reach out to the maintainer.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make Emoji Eraser better!
