# Quick Deploy Guide

Your GitHub repository: **https://github.com/deepanshusinghal16/setcalculator.git**

## Step 1: Push Code to GitHub

Run this script in your terminal:

```bash
cd /Users/deepanshusinghal/Documents/GitHub/set-calculator
./PUSH_TO_GITHUB.sh
```

**OR** run these commands manually:

```bash
cd /Users/deepanshusinghal/Documents/GitHub/set-calculator

# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Set Calculator ready for Vercel deployment"

# Add remote repository
git remote add origin https://github.com/deepanshusinghal16/setcalculator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or use SSH: `git remote set-url origin git@github.com:deepanshusinghal16/setcalculator.git`

## Step 2: Deploy on Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account (recommended)
3. **Click "Add New Project"**
4. **Import** the `setcalculator` repository
5. **Configure** (Vercel will auto-detect settings):
   - Framework Preset: **Other**
   - Root Directory: `./` (default)
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
6. **Click "Deploy"**
7. **Wait 1-2 minutes** for deployment
8. **Done!** Your app will be live at: `https://setcalculator-xxxxx.vercel.app`

## That's It! 🎉

Your Set Calculator will be live and accessible to anyone with the URL.

## Future Updates

Every time you push to GitHub, Vercel will automatically redeploy:

```bash
git add .
git commit -m "Your update message"
git push
```

## Need Help?

- GitHub Repo: https://github.com/deepanshusinghal16/setcalculator
- Vercel Docs: https://vercel.com/docs
