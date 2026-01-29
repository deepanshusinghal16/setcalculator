#!/bin/bash

# Script to push Set Calculator to GitHub using Personal Access Token
# Repository: https://github.com/deepanshusinghal16/setcalculator.git

echo "🚀 Pushing Set Calculator to GitHub..."
echo ""
echo "⚠️  GitHub requires a Personal Access Token (not password)"
echo ""
echo "If you don't have a token yet:"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Click 'Generate new token (classic)'"
echo "3. Name it: 'Set Calculator Deployment'"
echo "4. Check 'repo' permission"
echo "5. Generate and copy the token"
echo ""
read -p "Press Enter when you have your token ready..."

# Navigate to set-calculator directory
cd "$(dirname "$0")"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📝 Adding files..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    echo "💾 Committing files..."
    git commit -m "Initial commit: Set Calculator ready for Vercel deployment"
fi

# Add remote (if not already added)
if ! git remote | grep -q "origin"; then
    echo "🔗 Adding remote repository..."
    git remote add origin https://github.com/deepanshusinghal16/setcalculator.git
else
    # Update remote URL to ensure it's correct
    git remote set-url origin https://github.com/deepanshusinghal16/setcalculator.git
    echo "✅ Remote configured"
fi

# Set main branch
git branch -M main

# Push to GitHub
echo ""
echo "⬆️  Pushing to GitHub..."
echo "When prompted:"
echo "  Username: deepanshusinghal16"
echo "  Password: Paste your Personal Access Token (starts with ghp_)"
echo ""
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your code is now on GitHub."
    echo ""
    echo "Next steps:"
    echo "1. Go to https://vercel.com"
    echo "2. Sign in with GitHub"
    echo "3. Click 'Add New Project'"
    echo "4. Import 'setcalculator' repository"
    echo "5. Click 'Deploy'"
else
    echo ""
    echo "❌ Push failed. Make sure you:"
    echo "1. Created a Personal Access Token at: https://github.com/settings/tokens"
    echo "2. Used the token (not password) when prompted"
    echo ""
    echo "See FIX_AUTH.md for detailed instructions"
fi
