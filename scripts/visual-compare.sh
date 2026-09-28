#!/usr/bin/env bash
# Captures baseline screenshots from a base git ref's build, then compares the current
# checkout's build against them. Both captures run on this machine, so fonts and
# rendering match. Usage: npm run test:visual:compare -- [base-ref]  (default: origin/main)
set -euo pipefail

BASE_REF="${1:-origin/main}"
ROOT="$(git rev-parse --show-toplevel)"
BASE_DIR="$(mktemp -d)"

cleanup() {
  git -C "$ROOT" worktree remove --force "$BASE_DIR" >/dev/null 2>&1 || true
}
trap cleanup EXIT

cd "$ROOT"
git worktree add --detach "$BASE_DIR" "$BASE_REF"
(cd "$BASE_DIR" && npm ci --no-audit --no-fund && npm run build)

rm -rf e2e/__screenshots__
VISUAL_DIST_DIR="$BASE_DIR/dist" npx playwright test --update-snapshots=all --reporter=list

npm run build
VISUAL_DIST_DIR="$ROOT/dist" npx playwright test
