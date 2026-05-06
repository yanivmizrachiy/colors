#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

REPO="${HOME}/colors"
BRANCH="main"
SITE="https://yanivmizrachiy.github.io/colors/"

cd "$REPO"
echo "=== COLORS TRUTH CLOSE START ==="
date '+%Y-%m-%d %H:%M:%S %Z'

echo "=== 1. sync repo ==="
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

echo "=== 2. clean source data ==="
node scripts/clean-data-truth.cjs

echo "=== 3. local validation ==="
node scripts/validate.js

echo "=== 4. colors gallery validation ==="
node scripts/validate-colors-gallery.cjs

echo "=== 5. local doctor ==="
node scripts/doctor.js

echo "=== 6. zero demo audit ==="
node scripts/audit-zero-demo.js

echo "=== 7. commit data cleanup if changed ==="
if [ -n "$(git status --porcelain design-tokens.json site.config.json)" ]; then
  git add design-tokens.json site.config.json
  git commit -m "Clean source design data truth wording"
  git push origin "$BRANCH"
  echo "PUSHED_DATA_CLEANUP=1"
else
  echo "PUSHED_DATA_CLEANUP=0"
fi

echo "=== 8. live verify with retries ==="
PASS=0
for i in 1 2 3 4 5 6 7 8 9 10 11 12; do
  echo "LIVE_VERIFY_ATTEMPT=$i"
  if node scripts/verify-live-colors.mjs; then
    PASS=1
    break
  fi
  sleep 10
done
if [ "$PASS" != "1" ]; then
  echo "LIVE_VERIFY_STILL_FAILING"
  echo "This may be GitHub Pages cache, but do not mark 100% yet."
  exit 1
fi

echo "=== 9. final report ==="
mkdir -p STATE/termux
REPORT="STATE/termux/COLORS_TRUTH_CLOSE_$(date '+%Y%m%d_%H%M%S').txt"
{
  echo "COLORS_TRUTH_CLOSE_OK"
  echo "date=$(date '+%Y-%m-%d %H:%M:%S %Z')"
  echo "commit=$(git rev-parse HEAD)"
  echo "site=$SITE"
  echo "validate=OK"
  echo "colors_gallery=OK"
  echo "doctor=OK"
  echo "zero_demo_audit=OK"
  echo "live_verify=OK"
  echo "manual_phone_check=still_required"
  echo "colors_gallery_url=${SITE}colors-gallery.html"
  echo "qa_mobile=${SITE}qa-mobile.html"
} > "$REPORT"
cat "$REPORT"

echo "COLORS_TRUTH_CLOSE_DONE"
