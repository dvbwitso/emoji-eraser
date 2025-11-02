# CI/CD Setup Guide

## Overview

This project uses GitHub Actions for continuous integration and deployment. The CI/CD pipeline ensures code quality, runs tests, and automates releases.

## Workflows

### 1. **CI Workflow** (`ci.yml`)
Runs on every push and pull request to `main` and `develop` branches.

**Jobs:**
- **Build & Test** - Multi-OS (Ubuntu, Windows, macOS) and multi-Node (18.x, 20.x)
  - Installs dependencies
  - Compiles TypeScript
  - Runs tests
  - Packages extension as VSIX
  - Uploads artifacts

- **Code Quality** - TypeScript type checking and code analysis
  - Validates TypeScript compilation
  - Checks for TODO/FIXME comments
  - Validates package.json format
  - Warns about console.log statements

- **Security** - Dependency security scanning
  - Runs npm audit
  - Checks for outdated packages

### 2. **Release Workflow** (`release.yml`)
Triggered when pushing a version tag (e.g., `v1.0.0`).

**Jobs:**
- **Validate Tag** - Ensures tag format matches semantic versioning
- **Build & Publish** - Creates GitHub release and publishes to VS Code Marketplace
- **Notify Success** - Confirms successful deployment

**To create a release:**
```bash
# Update version in package.json
npm version patch|minor|major

# Push tag to trigger release
git push --tags
```

### 3. **PR Validation** (`pr-validation.yml`)
Validates pull requests before merging.

**Checks:**
-  PR title follows [Conventional Commits](https://www.conventionalcommits.org/)
-  PR has meaningful description (min 20 characters)
-  Code compiles successfully
-  All tests pass
-  Reports bundle size
-  **Blocks direct pushes to main** (only @dvbwitso allowed)

**PR Title Format:**
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore, perf
Example: feat(commands): add workspace emoji removal
```

### 4. **Dependency Updates** (`dependency-updates.yml`)
Automated weekly dependency maintenance.

**Schedule:** Every Monday at 9 AM UTC

**Actions:**
- Checks for outdated packages
- Updates minor and patch versions
- Runs security audit fixes
- Creates automated PR if updates found
- Validates compilation and tests

## Branch Protection Rules

### Required Setup on GitHub

1. Go to **Settings** → **Branches** → **Add rule**

2. **Branch name pattern:** `main`

3. **Enable the following:**

    **Require a pull request before merging**
   - Required approving reviews: 1
   - Dismiss stale pull request approvals when new commits are pushed
   - Require review from Code Owners

    **Require status checks to pass before merging**
   - Require branches to be up to date before merging
   - Status checks that are required:
     - `Build & Test (ubuntu-latest, 20.x)`
     - `Code Quality Checks`
     - `Validate Pull Request`

    **Require conversation resolution before merging**

    **Require signed commits** (optional but recommended)

    **Require linear history**

    **Do not allow bypassing the above settings**

    **Restrict who can push to matching branches**
   - Add: `dvbwitso` (only you can push directly)

    **Allow force pushes:** Specify who can force push
   - Add: `dvbwitso`

    **Allow deletions:** Unchecked

## Secrets Configuration

### Required Secrets

Add these in **Settings** → **Secrets and variables** → **Actions**:

1. **VSCE_PAT** - VS Code Marketplace Personal Access Token
   - Create at: https://marketplace.visualstudio.com/manage
   - Required for publishing extensions

2. **OVSX_PAT** - Open VSX Registry Personal Access Token (optional)
   - Create at: https://open-vsx.org/user-settings/tokens
   - Required for publishing to Open VSX

### How to Create VSCE_PAT:

1. Go to https://dev.azure.com
2. Create a Personal Access Token
3. Set organization to "All accessible organizations"
4. Set scopes to "Marketplace > Manage"
5. Copy the token and add as secret in GitHub

## Code Owners

The `.github/CODEOWNERS` file defines ownership:

- **@dvbwitso** owns all files
- Specific approval required for:
  - `/src/` - Core extension code
  - `/.github/workflows/` - CI/CD workflows
  - `/package.json` - Package configuration

## Issue Templates

Two templates available:

1. **Bug Report** - For reporting issues
2. **Feature Request** - For suggesting new features

## Pull Request Template

Automatic template includes:
- Checklist for contributors
- Type of change classification
- Testing instructions
- Related issue linking

## Workflow Badges

Add these to your README.md:

```markdown
[![CI](https://github.com/dvbwitso/emoji-eraser/actions/workflows/ci.yml/badge.svg)](https://github.com/dvbwitso/emoji-eraser/actions/workflows/ci.yml)
[![Release](https://github.com/dvbwitso/emoji-eraser/actions/workflows/release.yml/badge.svg)](https://github.com/dvbwitso/emoji-eraser/actions/workflows/release.yml)
```

## Release Process

### Automated Release Flow:

1. **Develop on a feature branch:**
   ```bash
   git checkout -b feat/new-feature
   # Make changes
   git commit -m "feat: add new feature"
   git push origin feat/new-feature
   ```

2. **Create Pull Request:**
   - CI runs automatically
   - Address any failing checks
   - Get approval from code owner
   - Squash and merge

3. **Create Release:**
   ```bash
   git checkout main
   git pull origin main
   
   # Update version (updates package.json and creates tag)
   npm version patch  # 1.0.0 -> 1.0.1
   # or
   npm version minor  # 1.0.0 -> 1.1.0
   # or
   npm version major  # 1.0.0 -> 2.0.0
   
   # Update CHANGELOG.md manually
   
   # Push changes and tags
   git push origin main --tags
   ```

4. **Automated Deployment:**
   - Release workflow triggers
   - Extension is built and packaged
   - GitHub release is created
   - Published to VS Code Marketplace
   - Published to Open VSX (if configured)

## Manual Workflow Triggers

Some workflows can be manually triggered:

```bash
# Go to Actions tab on GitHub
# Select "Dependency Updates"
# Click "Run workflow"
```

## Monitoring

### Check Workflow Status:
- Go to **Actions** tab in GitHub
- View all workflow runs
- Click on specific run for detailed logs

### Artifacts:
- Built VSIX files available in CI runs
- Retention: 30 days

## Troubleshooting

### CI Fails:
1. Check the logs in Actions tab
2. Run locally: `npm run compile`
3. Fix issues and push again

### Release Fails:
1. Verify tag format: `v1.2.3`
2. Check package.json version matches tag
3. Ensure secrets are configured
4. Check workflow logs for details

### PR Blocked:
1. Ensure PR title follows conventional commits
2. Add meaningful description
3. Resolve all review comments
4. Get approval from @dvbwitso

## Best Practices

 Always create feature branches  
 Use conventional commit messages  
 Keep PRs focused and small  
 Write tests for new features  
 Update documentation  
 Respond to review feedback  
 Keep dependencies updated  

## Security

- All dependencies are automatically scanned weekly
- Security audit runs on every push
- Critical vulnerabilities block merges
- Only signed commits from @dvbwitso can merge to main

---

**Questions?** Open an issue or contact @dvbwitso Email: mweembadabwitso@gmail.com
