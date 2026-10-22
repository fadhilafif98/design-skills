#!/usr/bin/env bash
# Render a page in a real browser and measure it. No screenshots unless --shots asks for them;
# they go to a temp dir outside the project (override with --out).
# Usage: inspect.sh <file-or-url> [--shots none|fold|page] [--out DIR] [--name page] [--widths 1440,768,390]
#                   [--config design/brand.json] [--allow rule,rule] [--no-extra] [--json]
#   inspect.sh index.html --name build                                   # measure only
#   inspect.sh "design/direction-picker.html?v=2" --name concept2 --widths 1440 --no-extra --shots fold
#   inspect.sh index.html --name final --widths 1440,390 --shots page    # for the critique
# Requires Node 18+. First run installs Playwright + Chromium into a private cache dir.
# Exit code 1 means at least one FAIL: the page is not done.
set -euo pipefail

[ $# -ge 1 ] || { sed -n '2,9p' "$0"; exit 2; }
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
tool="${XDG_CACHE_HOME:-$HOME/.cache}/awwwards-web-design"

if [ ! -d "$tool/node_modules/playwright" ]; then
  mkdir -p "$tool"
  [ -f "$tool/package.json" ] || echo '{"private":true}' > "$tool/package.json"
  (cd "$tool" && npm install --silent --no-audit --no-fund playwright@1 >/dev/null)
  (cd "$tool" && npx playwright install chromium >/dev/null)
fi

NODE_PATH="$tool/node_modules" exec node "$here/inspect.mjs" "$@"
