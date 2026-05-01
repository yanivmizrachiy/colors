#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

OWNER="yanivmizrachiy"
REPO="colors"
URL="https://$OWNER.github.io/$REPO/"
WORK="$HOME/colors"

echo "=== COLORS PAGES CHECK START ==="
echo "URL=$URL"

if ! command -v node >/dev/null 2>&1; then
  pkg update -y
  pkg install -y nodejs
fi

if [ -d "$WORK" ]; then
  cd "$WORK"
  if [ -f scripts/post-publish-audit.js ]; then
    node scripts/post-publish-audit.js
  else
    echo "LOCAL_AUDIT_SCRIPT_MISSING"
  fi
else
  echo "LOCAL_REPO_NOT_FOUND=$WORK"
fi

if command -v termux-open-url >/dev/null 2>&1; then
  termux-open-url "$URL"
  echo "OPENED_ON_PHONE=$URL"
else
  echo "OPEN_MANUALLY=$URL"
fi

echo "=== COLORS PAGES CHECK END ==="
