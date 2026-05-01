#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

OWNER="yanivmizrachiy"
REPO="colors"
BRANCH="main"
WORK="$HOME/colors"
DOWNLOADS="/sdcard/Download"

echo "=== COLORS V5 SMART PUBLISH START ==="

need_tool() {
  command -v "$1" >/dev/null 2>&1
}

if ! need_tool termux-setup-storage; then
  echo "TERMUX_STORAGE_NOTE=If Downloads is inaccessible, run termux-setup-storage once."
fi

if ! need_tool git || ! need_tool node || ! need_tool gh || ! need_tool unzip; then
  echo "Installing missing tools: git nodejs gh unzip"
  pkg update -y
  pkg install -y git nodejs gh unzip
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "GH_AUTH_REQUIRED"
  echo "Run this once, then rerun this script:"
  echo "gh auth login"
  exit 20
fi

ZIP="$(ls -t "$DOWNLOADS"/colors_v5_repo_ready.zip "$DOWNLOADS"/colors_v4_repo_ready.zip "$DOWNLOADS"/colors_v3_repo_ready.zip "$DOWNLOADS"/colors_repo_ready.zip 2>/dev/null | head -n 1 || true)"
if [ -z "$ZIP" ]; then
  echo "ZIP_NOT_FOUND"
  echo "Download colors_v5_repo_ready.zip to Android Downloads first."
  exit 30
fi

echo "ZIP_FOUND=$ZIP"

rm -rf "$WORK"
mkdir -p "$WORK"
TMP="$HOME/.colors_publish_tmp"
rm -rf "$TMP"
mkdir -p "$TMP"
unzip -q "$ZIP" -d "$TMP"

SRC="$(find "$TMP" -maxdepth 3 -type f -name index.html -print -quit | xargs dirname)"
if [ -z "$SRC" ] || [ ! -f "$SRC/site.config.json" ]; then
  echo "BAD_ZIP_STRUCTURE"
  exit 31
fi

cp -a "$SRC"/. "$WORK"/
cd "$WORK"

node scripts/validate.js
node scripts/doctor.js

git init
git branch -M "$BRANCH"
git config user.name "Yaniv GPT Colors Publisher" || true
git config user.email "yanivmizrachiy@users.noreply.github.com" || true

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
  git commit -m "Initial colors V5 design system app"
fi

git push -u origin "$BRANCH"

echo "Enabling GitHub Pages via Actions if possible..."
gh api -X POST "repos/$OWNER/$REPO/pages" -f build_type=workflow >/dev/null 2>&1 || true

echo "COLORS_V5_PUBLISH_OK"
echo "REPO_URL=https://github.com/$OWNER/$REPO"
echo "ACTIONS_URL=https://github.com/$OWNER/$REPO/actions"
echo "PAGES_EXPECTED=https://$OWNER.github.io/$REPO/"
