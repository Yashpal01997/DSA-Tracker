# DSA Tracker — One-time setup script (Windows PowerShell)
# Run this once from inside the dsa-tracker folder

$username = "yashpal01997"
$repo = "dsa-tracker"

Write-Host "=== DSA Tracker Setup ===" -ForegroundColor Cyan

# 1. Install dependencies
Write-Host "`n[1/4] Installing dependencies..." -ForegroundColor Yellow
npm install

# 2. Create GitHub repo (opens browser to authenticate if needed)
Write-Host "`n[2/4] Creating GitHub repo..." -ForegroundColor Yellow
gh repo create $username/$repo --public --source=. --remote=origin --push
# If gh CLI not installed: manually create at https://github.com/new
# then run: git remote add origin https://github.com/yashpal01997/dsa-tracker.git && git push -u origin main

# 3. Build and deploy to GitHub Pages
Write-Host "`n[3/4] Deploying to GitHub Pages..." -ForegroundColor Yellow
npm run deploy

# 4. Enable GitHub Pages (gh CLI)
Write-Host "`n[4/4] Enabling GitHub Pages..." -ForegroundColor Yellow
gh api repos/$username/$repo/pages --method POST --field source[branch]=gh-pages --field source[path]=/ 2>$null
Write-Host "GitHub Pages enabled on gh-pages branch" -ForegroundColor Green

Write-Host "`n✅ Done! Your app will be live in ~60 seconds at:" -ForegroundColor Green
Write-Host "   https://$username.github.io/$repo/" -ForegroundColor Cyan
Write-Host "`nOn any device — open that URL in Chrome → three-dot menu → Install App" -ForegroundColor White
