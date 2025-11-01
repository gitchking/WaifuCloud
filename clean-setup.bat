@echo off
echo 🌸 WaifuCloud - Clean Repository Setup
echo ======================================
echo.

echo 📁 Initializing fresh Git repository...
git init
git branch -M main

echo.
echo 📝 Configuring Git...
git config user.name "WaifuCloud Developer"
git config user.email "developer@waifucloud.com"

echo.
echo 📦 Adding all WaifuCloud files...
git add .

echo.
echo 💾 Creating clean initial commit...
git commit -m "WaifuCloud: Complete anime wallpaper gallery with Cloudflare Pages support"

echo.
echo 🔗 Adding remote repository...
git remote add origin https://github.com/gitchking/WaifuCloud.git

echo.
echo 🚀 Pushing clean version to GitHub...
echo This will overwrite any existing content
git push --force origin main

if errorlevel 1 (
    echo.
    echo ⚠️  Standard push failed. Trying alternative method...
    
    REM Try fetching first then force push
    git fetch origin 2>nul
    git push --force-with-lease origin main
    
    if errorlevel 1 (
        echo.
        echo ❌ All push methods failed.
        echo.
        echo Manual steps to fix:
        echo 1. Go to https://github.com/gitchking/WaifuCloud
        echo 2. Delete the repository if it exists
        echo 3. Create a new empty repository named "WaifuCloud"
        echo 4. Run this script again
        pause
        exit /b 1
    )
)

echo.
echo 🎉 SUCCESS! Clean WaifuCloud repository created!
echo.
echo 🌐 Repository: https://github.com/gitchking/WaifuCloud
echo 📋 Ready for Cloudflare Pages deployment
echo.
echo Next steps:
echo 1. Visit https://pages.cloudflare.com/
echo 2. Connect your GitHub repository
echo 3. Deploy your anime gallery!
echo.
pause