@echo off
echo 🚀 Portfolio Deployment Script
echo ================================
echo.

echo 📁 Checking current directory...
if not exist "index.html" (
    echo ❌ Error: index.html not found in current directory
    echo Please run this script from your portfolio folder
    pause
    exit /b 1
)

echo ✅ Found index.html
echo.

echo 🔍 Checking Git status...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: This is not a Git repository
    echo.
    echo To fix this:
    echo 1. Create a new repository on GitHub named "portfolio"
    echo 2. Run: git init
    echo 3. Run: git remote add origin https://github.com/kingsleyokoli/portfolio.git
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo ✅ Git repository found
echo.

echo 📝 Adding all files...
git add .

echo 💬 Committing changes...
git commit -m "Update portfolio - %date% %time%"

echo 🚀 Pushing to GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo 🎉 Success! Your portfolio has been deployed
    echo.
    echo 🌐 Your site will be live at:
    echo    https://kingsleyokoli.github.io/portfolio
    echo.
    echo 📋 Next steps:
    echo    1. Go to your GitHub repository
    echo    2. Settings → Pages
    echo    3. Enable GitHub Pages from main branch
    echo    4. Wait 2-5 minutes for deployment
    echo.
    echo 💡 Need help? See DEPLOYMENT.md
) else (
    echo.
    echo ❌ Error: Failed to push to GitHub
    echo Check your Git configuration and try again
)

echo.
pause
