#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail
OWNER="yanivmizrachiy"
REPO="colors"
BRANCH="main"
WORK="${1:-$HOME/colors}"
echo "=== COLORS SMART PUBLISH START ==="
if ! command -v git >/dev/null 2>&1 || ! command -v node >/dev/null 2>&1 || ! command -v gh >/dev/null 2>&1; then
  echo "Installing missing basics via pkg..."
  pkg update -y
  pkg install -y git nodejs gh
fi
if ! gh auth status >/dev/null 2>&1; then
  echo "GH_AUTH_REQUIRED"
  echo "Run first: gh auth login"
  exit 20
fi
cd "$WORK"
node scripts/validate.js
node scripts/doctor.js
git init
git branch -M "$BRANCH"
if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  echo "REPO_EXISTS=$OWNER/$REPO"
else
  echo "CREATING_REPO=$OWNER/$REPO"
  gh repo create "$OWNER/$REPO" --public --description "colors — Hebrew RTL design library for GPT website generation" --source=. --remote=origin
fi
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "https://github.com/$OWNER/$REPO.git"
else
  git remote add origin "https://github.com/$OWNER/$REPO.git"
fi
git add .
if git diff --cached --quiet; then
  echo "NO_CHANGES_TO_COMMIT"
else
  git commit -m "Initial colors V4 design system app"
fi
git push -u origin "$BRANCH"
# Pages deployment is handled by .github/workflows/pages.yml.
gh api -X POST "repos/$OWNER/$REPO/pages" -f build_type=workflow >/dev/null 2>&1 || true
echo "COLORS_PUBLISH_OK"
echo "REPO_URL=https://github.com/$OWNER/$REPO"
echo "PAGES_EXPECTED=https://$OWNER.github.io/$REPO/"
echo "ACTIONS=https://github.com/$OWNER/$REPO/actions"
