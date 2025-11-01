#!/bin/bash

echo "🔄 Rolling back WaifuCloud repository"
echo "====================================="
echo ""

echo "⚠️  WARNING: This will reset the GitHub repository to a clean state"
echo "This will remove all commits and start fresh"
echo ""
read -p "Are you sure you want to continue? (y/N): " confirm
if [[ ! $confirm == [yY] && ! $confirm == [yY][eE][sS] ]]; then
    echo "❌ Rollback cancelled"
    exit 0
fi

echo ""
echo "🧹 Cleaning local repository..."

# Remove git history
if [ -d ".git" ]; then
    echo "Removing .git directory..."
    rm -rf .git
fi

echo ""
echo "📁 Reinitializing clean repository..."
git init
git branch -M main

echo ""
echo "📝 Configuring Git..."
git config user.name "WaifuCloud Developer" 2>/dev/null || true
git config user.email "developer@waifucloud.com" 2>/dev/null || true

echo ""
echo "🔗 Adding remote repository..."
git remote add origin https://github.com/gitchking/WaifuCloud.git

echo ""
echo "📦 Adding all files for fresh commit..."
git add .

echo ""
echo "💾 Creating fresh initial commit..."
git commit -m "Initial commit: WaifuCloud - Clean anime wallpaper gallery"

echo ""
echo "🚀 Force pushing clean version to GitHub..."
echo "This will completely replace the repository content"
if git push --force origin main; then
    echo ""
    echo "✅ SUCCESS! Repository has been reset to clean state"
    echo ""
    echo "🌐 Repository URL: https://github.com/gitchking/WaifuCloud"
    echo "📋 The repository now contains only clean WaifuCloud code"
    echo ""
    echo "Next steps:"
    echo "1. Visit the repository to verify it's clean"
    echo "2. Deploy to Cloudflare Pages"
    echo "3. Enjoy your anime gallery!"
else
    echo ""
    echo "❌ Push failed. Repository might be protected."
    echo "Try these manual steps:"
    echo "1. Go to https://github.com/gitchking/WaifuCloud/settings"
    echo "2. Scroll down to \"Danger Zone\""
    echo "3. Delete the repository"
    echo "4. Create a new repository with the same name"
    echo "5. Run this script again"
    exit 1
fi

echo ""