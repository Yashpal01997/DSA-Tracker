#!/bin/bash
# DSA Tracker — One-time setup script (Mac/Linux)
# Run: chmod +x SETUP.sh && ./SETUP.sh

USERNAME="yashpal01997"
REPO="dsa-tracker"

echo "=== DSA Tracker Setup ==="

# 1. Install dependencies
echo -e "\n[1/4] Installing dependencies..."
npm install

# 2. Create GitHub repo
echo -e "\n[2/4] Creating GitHub repo..."
gh repo create $USERNAME/$REPO --public --source=. --remote=origin --push

# 3. Build and deploy to GitHub Pages
echo -e "\n[3/4] Building and deploying..."
npm run deploy

# 4. Enable GitHub Pages
echo -e "\n[4/4] Enabling GitHub Pages..."
gh api repos/$USERNAME/$REPO/pages --method POST \
  --field source[branch]=gh-pages \
  --field source[path]=/ 2>/dev/null || true

echo -e "\n✅ Done! Live in ~60s at:"
echo "   https://$USERNAME.github.io/$REPO/"
echo ""
echo "On any device — open in Chrome → three-dot menu → Install App"
