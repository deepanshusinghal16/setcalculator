# Fix GitHub Authentication

GitHub no longer accepts passwords. You need to use a **Personal Access Token** instead.

## Option 1: Use Personal Access Token (Easiest)

### Step 1: Create a Personal Access Token

1. Go to GitHub: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Set Calculator Deployment`
4. Select expiration: **90 days** (or No expiration if you prefer)
5. Check these permissions:
   - ✅ **repo** (Full control of private repositories)
6. Click **"Generate token"**
7. **IMPORTANT:** Copy the token immediately (you won't see it again!)
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Use the Token to Push

When prompted for password, paste your **token** instead:

```bash
cd /Users/deepanshusinghal/Documents/GitHub/set-calculator

# Push again (use token as password)
git push -u origin main
```

When asked:
- **Username:** `deepanshusinghal16`
- **Password:** Paste your token (starts with `ghp_`)

### Step 3: Save Credentials (Optional)

To avoid entering token every time:

```bash
# Configure git to store credentials
git config --global credential.helper osxkeychain

# Then push (will ask once and save)
git push -u origin main
```

## Option 2: Use SSH (More Secure)

### Step 1: Check if you have SSH keys

```bash
ls -al ~/.ssh
```

### Step 2: Generate SSH key (if needed)

```bash
ssh-keygen -t ed25519 -C "deepanshusinghal2003@gmail.com"
# Press Enter for default location
# Press Enter for no passphrase (or set one)
```

### Step 3: Add SSH key to GitHub

1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. Go to: https://github.com/settings/keys
3. Click **"New SSH key"**
4. Paste the key and save

### Step 4: Change remote to SSH

```bash
cd /Users/deepanshusinghal/Documents/GitHub/set-calculator
git remote set-url origin git@github.com:deepanshusinghal16/setcalculator.git
git push -u origin main
```

## Quick Fix (Recommended)

**Just use Option 1** - it's the fastest:
1. Create token at: https://github.com/settings/tokens
2. Run: `git push -u origin main`
3. Use token as password
