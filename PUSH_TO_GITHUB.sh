#!/bin/bash

# Script to push Set Calculator to GitHub
# Repository: https://github.com/deepanshusinghal16/setcalculator.git

echo "🚀 Pushing Set Calculator to GitHub..."

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

# Commit
echo "💾 Committing files..."
git commit -m "Initial commit: Set Calculator ready for Vercel deployment"

# Add remote (if not already added)
if ! git remote | grep -q "origin"; then
    echo "🔗 Adding remote repository..."
    git remote add origin https://github.com/deepanshusinghal16/setcalculator.git
else
    echo "✅ Remote already configured"
fi

# Set main branch
git branch -M main

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Your code is now on GitHub."
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Sign in with GitHub"
echo "3. Click 'Add New Project'"
echo "4. Import 'setcalculator' repository"
echo "5. Click 'Deploy'"
