# Step-by-Step Deployment Guide (Method 1)

Follow these steps to deploy your Set Calculator to Vercel:

## Step 1: Create a New GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `set-calculator` (or any name you prefer)
4. Description: "A web-based set calculator for performing union, intersection, and difference operations"
5. Choose **Public** (or Private if you prefer)
6. **DO NOT** initialize with README, .gitignore, or license (we already have files)
7. Click **"Create repository"**

## Step 2: Push Your Code to GitHub

Open your terminal and run these commands:

```bash
# Navigate to your set-calculator folder
cd /Users/deepanshusinghal/Documents/GitHub/set-calculator

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Set Calculator ready for Vercel deployment"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/set-calculator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username in the git remote command.

## Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or **"Log In"** if you already have an account)
   - You can sign up with your GitHub account (recommended)
3. After signing in, click **"Add New Project"**
4. You'll see a list of your GitHub repositories
5. Find and click **"Import"** next to your `set-calculator` repository
6. Vercel will auto-detect it's a static site:
   - **Framework Preset:** Other
   - **Root Directory:** `./` (default)
   - **Build Command:** (leave empty - not needed for static sites)
   - **Output Directory:** (leave empty)
7. Click **"Deploy"**
8. Wait 1-2 minutes for deployment to complete
9. **Done!** Your app is live! 🎉

## Step 4: Access Your Live App

After deployment, Vercel will show you:
- **Production URL:** `https://set-calculator-xxxxx.vercel.app`
- **Preview URLs:** For each commit/pull request

Click the production URL to see your live Set Calculator!

## Optional: Custom Domain

1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Enter your custom domain (e.g., `setcalc.yourdomain.com`)
3. Follow the DNS configuration instructions
4. Vercel will automatically set up SSL/HTTPS

## Updating Your Site

Every time you push changes to GitHub, Vercel will automatically redeploy your site!

```bash
git add .
git commit -m "Your update message"
git push
```

That's it! Your site will be updated automatically.

## Troubleshooting

- **"Repository not found"**: Make sure you've pushed your code to GitHub first
- **"Build failed"**: Check that `index.html`, `app.js`, and `app.css` are in the root directory
- **Styles not loading**: Verify file paths in `index.html` match your file structure

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
