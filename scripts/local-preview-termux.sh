#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail
cd "$HOME/colors"

if ! command -v python >/dev/null 2>&1; then
  pkg update -y
  pkg install -y python
fi

PORT="${1:-8080}"
URL="http://127.0.0.1:$PORT/"

echo "COLORS_LOCAL_PREVIEW=$URL"
echo "Stop server with CTRL+C"

if command -v termux-open-url >/dev/null 2>&1; then
  (sleep 1; termux-open-url "$URL") >/dev/null 2>&1 &
fi

python -m http.server "$PORT"
