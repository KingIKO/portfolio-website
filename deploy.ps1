# Quick deployment script for portfolio updates
Write-Host "🚀 Deploying portfolio updates to GitHub..." -ForegroundColor Green

# Add all changes
git add .

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Update portfolio - $timestamp"

# Push to GitHub
git push origin master

Write-Host "✅ Portfolio deployed successfully!" -ForegroundColor Green
Write-Host "🌐 Your site will update in 2-3 minutes at:" -ForegroundColor Cyan
Write-Host "   https://kingiko.github.io/portfolio-website" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Replace 'YOUR_USERNAME' with your actual GitHub username" -ForegroundColor Gray
