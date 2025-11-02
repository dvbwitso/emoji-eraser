# Branch Protection Quick Setup

## Step-by-Step Guide to Protect Main Branch

### 1. Navigate to Repository Settings
1. Go to https://github.com/dvbwitso/emoji-eraser
2. Click **Settings** tab
3. Click **Branches** in left sidebar

### 2. Add Branch Protection Rule
Click **Add rule** button

### 3. Configure Rule

**Branch name pattern:**
```
main
```

**Settings to Enable:**

#### Protect matching branches

 **Require a pull request before merging**
-  Require approvals: **1**
-  Dismiss stale pull request approvals when new commits are pushed
-  Require review from Code Owners

 **Require status checks to pass before merging**
-  Require branches to be up to date before merging
- **Add status checks:**
  - `Build & Test (ubuntu-latest, 20.x)`
  - `Code Quality Checks`
  - `Validate Pull Request`
  
 **Require conversation resolution before merging**

 **Require signed commits** (recommended)

 **Require linear history**

 **Do not allow bypassing the above settings**

#### Rules applied to everyone including administrators

 **Restrict who can push to matching branches**
- Click **Restrict pushes that create matching branches**
- Add user: `dvbwitso`

 **Allow force pushes**
- Select: **Specify who can force push**
- Add: `dvbwitso`

 **Allow deletions** (keep unchecked)

### 4. Save Changes
Click **Create** or **Save changes**

---

## Quick Commands Reference

### For Contributors (Not You)
```bash
# Create feature branch
git checkout -b feat/my-feature

# Make changes and commit
git add .
git commit -m "feat: add my feature"

# Push to GitHub
git push origin feat/my-feature

# Create PR on GitHub web interface
```

### For You (Owner - @dvbwitso)
```bash
# Direct push to main (you can do this)
git checkout main
git add .
git commit -m "fix: urgent hotfix"
git push origin main

# Or create PR (recommended for tracking)
git checkout -b feat/my-feature
git push origin feat/my-feature
# Create PR, approve yourself, merge
```

### Creating Releases
```bash
# Update version
npm version patch   # 1.0.0 -> 1.0.1
npm version minor   # 1.0.0 -> 1.1.0
npm version major   # 1.0.0 -> 2.0.0

# Update CHANGELOG.md

# Push with tags
git push origin main --tags
```

---

## What Happens After Setup?

###  Contributors Must:
1. Fork the repository or create a branch
2. Make changes in their branch
3. Create a Pull Request
4. Wait for CI checks to pass
5. Get approval from @dvbwitso
6. Cannot push directly to main

###  You Can:
1. Push directly to main (you're the owner)
2. Approve and merge PRs
3. Force push if needed
4. Create releases by pushing tags

###  Automated Actions:
- **Every PR:** CI runs tests, validates code
- **Every Monday:** Dependency updates check
- **On tag push:** Automatic release and publish
- **Direct push attempts:** Blocked unless you

---

## Testing Branch Protection

### Test 1: Try to push to main from another account
```bash
# Should fail with:
# "Required status checks failed"
# "Review required"
```

### Test 2: Create a PR
```bash
git checkout -b test/branch-protection
echo "test" > test.txt
git add test.txt
git commit -m "test: verify branch protection"
git push origin test/branch-protection

# Go to GitHub, create PR
# Notice: Cannot merge until checks pass and approval given
```

### Test 3: Your direct push (should work)
```bash
git checkout main
echo "hotfix" > hotfix.txt
git add hotfix.txt
git commit -m "fix: emergency hotfix"
git push origin main

# Should succeed - you're the owner!
```

---

## Secrets to Configure

Before first release, add these secrets:

1. **VSCE_PAT** - VS Code Marketplace token
   - Go to: https://marketplace.visualstudio.com/manage/publishers/dvbwitso
   - Create token with Marketplace > Manage scope
   - Add to: Settings > Secrets and variables > Actions

2. **OVSX_PAT** - Open VSX token (optional)
   - Go to: https://open-vsx.org/user-settings/tokens
   - Create new token
   - Add to GitHub secrets

---

## Status Checks After First Push

After pushing these CI/CD files, you'll see:
-  CI workflow runs
-  Build succeeds on all platforms
-  Status checks appear in Settings > Branches

Then you can add them to required checks!

---

**Ready to protect main!** 
