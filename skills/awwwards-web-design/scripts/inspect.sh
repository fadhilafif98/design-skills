#!/usr/bin/env bash
# Render a page in a real browser, measure it, and save legible viewport-slice screenshots.
# Usage: inspect.sh <file-or-url> [--out design/inspect] [--name page] [--widths 1440,768,390]
#                   [--config design/brand.json] [--allow rule,rule] [--no-extra] [--json]
#   inspect.sh index.html --name hero
#   inspect.sh "design/direction-picker.html?v=2" --name concept2 --widths 1440,390 --no-extra
# Requires Node 18+. First run installs Playwright + Chromium into a private cache dir.
# Exit code 1 means at least one FAIL: the page is not done.
set -euo pipefail

[ $# -ge 1 ] || { sed -n '2,7p' "$0"; exit 2; }
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
tool="${XDG_CACHE_HOME:-$HOME/.cache}/awwwards-web-design"

if [ ! -d "$tool/node_modules/playwright" ]; then
  mkdir -p "$tool"
  [ -f "$tool/package.json" ] || echo '{"private":true}' > "$tool/package.json"
  (cd "$tool" && npm install --silent --no-audit --no-fund playwright@1 >/dev/null)
  (cd "$tool" && npx playwright install chromium >/dev/null)
fi

NODE_PATH="$tool/node_modules" exec node "$here/inspect.mjs" "$@"
