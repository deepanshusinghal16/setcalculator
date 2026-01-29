# Deploying Set Calculator to Vercel

This guide will help you deploy the Set Calculator to Vercel for free.

## Prerequisites

1. A GitHub account
2. A Vercel account (sign up at [vercel.com](https://vercel.com) - it's free)

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Push to GitHub

1. Create a new repository on GitHub (or use an existing one)
2. Push your `set-calculator` folder to GitHub:
   ```bash
   cd set-calculator
   git init
   git add .
   git commit -m "Initial commit: Set Calculator"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect it's a static site
5. Click **"Deploy"**
6. Wait for deployment to complete (usually 1-2 minutes)
7. Your app will be live at `https://your-project-name.vercel.app`

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
cd set-calculator
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No**
- Project name? (Press Enter for default or enter a custom name)
- Directory? (Press Enter for `./`)

### Step 4: Deploy to Production

```bash
vercel --prod
```

Your app will be live at the provided URL!

## Files Included

The following files are deployed:
- `index.html` - Main HTML file
- `app.js` - JavaScript logic
- `app.css` - Styles
- `vercel.json` - Vercel configuration

## Custom Domain (Optional)

1. Go to your project on Vercel dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## Updating Your Deployment

Every time you push to your GitHub repository, Vercel will automatically redeploy your site!

Or manually deploy:
```bash
vercel --prod
```

## Troubleshooting

- **404 errors**: Make sure `index.html` exists in the root
- **Styles not loading**: Check that `app.css` is in the same directory
- **JavaScript not working**: Check browser console for errors

## Support

For Vercel-specific issues, check [Vercel Documentation](https://vercel.com/docs)
