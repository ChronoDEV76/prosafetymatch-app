#!/usr/bin/env bash
set -euo pipefail

# ---- settings you can customize ----
PROJECT_NAME="${PROJECT_NAME:-prosafetymatch-app}"
REQUIRED_NODE="20.19.0"
REQUIRED_CMDS=("pnpm" "node" "vercel" "git")
CUSTOM_DOMAIN="${CUSTOM_DOMAIN:-}"   # e.g. prosafetymatch.app  (optional)
# ------------------------------------

pass() { echo -e "✅ $1"; }
warn() { echo -e "⚠️  $1"; }
fail() { echo -e "❌ $1"; exit 1; }

# 0) required commands
for c in "${REQUIRED_CMDS[@]}"; do
  command -v "$c" >/dev/null 2>&1 || fail "Command not found: $c (install it and re-run)"
done
pass "Required commands available: ${REQUIRED_CMDS[*]}"

# 1) Node version
have_node="$(node -v | sed 's/^v//')"
if printf '%s\n%s\n' "$REQUIRED_NODE" "$have_node" | sort -V | tail -n1 | grep -qx "$have_node"; then
  pass "Node >= $REQUIRED_NODE ($have_node)"
else
  fail "Node $have_node < $REQUIRED_NODE — please upgrade"
fi

# 2) Basic project files
test -f package.json || fail "package.json missing"
jq -e '.devDependencies.vite or .dependencies.vite' package.json >/dev/null 2>&1 \
  && pass "Vite dependency found" || fail "Vite not found in package.json"
test -f vite.config.js -o -f vite.config.ts && pass "vite.config present" || warn "vite.config not found (Vite defaults will apply)"
test -d src && pass "src/ directory present" || warn "src/ directory not found"

# 3) Local build
echo "— Running local build (pnpm run build)…"
pnpm run build >/dev/null 2>&1 && pass "Local build succeeded" || fail "Local build failed"

# 4) Vercel auth
if vercel whoami >/dev/null 2>&1; then
  pass "Vercel CLI authenticated"
else
  fail "Not logged in to Vercel CLI (run: pnpm dlx vercel login)"
fi

# 5) Vercel project link
if test -f .vercel/project.json; then
  proj="$(jq -r '.projectId' .vercel/project.json 2>/dev/null || true)"
  if [ -n "$proj" ] && [ "$proj" != "null" ]; then
    pass "Vercel project linked (.vercel/project.json)"
  else
    warn "Project link file exists but missing projectId"
  fi
else
  warn "Not linked to Vercel yet (run: pnpm dlx vercel && commit .vercel/)"
fi

# 6) Show Vercel environments
echo "— Vercel environments:"
vercel env ls || warn "Could not list env vars (ensure project is linked)"

# 7) Show Vercel domains
echo "— Vercel domains:"
vercel domains ls || warn "Could not list domains (ensure project is linked)"

# 8) Optional: DNS check for custom domain
if [ -n "$CUSTOM_DOMAIN" ]; then
  echo "— DNS check for ${CUSTOM_DOMAIN}"
  if command -v dig >/dev/null 2>&1; then
    dig +short CNAME "$CUSTOM_DOMAIN" | grep -iq "vercel" \
      && pass "CNAME of ${CUSTOM_DOMAIN} points to Vercel" \
      || warn "CNAME for ${CUSTOM_DOMAIN} does not appear to point to Vercel yet"
  else
    warn "dig not installed; skipping DNS check"
  fi
fi

# 9) Git check + auto commit & push
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  pass "Git repository present"
  echo "— Git remotes:"
  git remote -v || true

  # Detect current branch
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  echo "Current branch: $CURRENT_BRANCH"

  # Stage all changes
  git add -A

  # Commit only if there are staged changes
  if ! git diff --cached --quiet; then
    COMMIT_MSG="chore: auto-check-deploy commit $(date +'%Y-%m-%d %H:%M:%S')"
    echo "Committing changes: $COMMIT_MSG"
    git commit -m "$COMMIT_MSG"
  else
    echo "No changes to commit."
  fi

  # Ensure remote exists
  if git remote get-url origin >/dev/null 2>&1; then
    echo "Pushing branch $CURRENT_BRANCH to origin..."
    git push -u origin "$CURRENT_BRANCH"
    pass "Changes pushed to GitHub successfully."
  else
    warn "No remote 'origin' found. Please add it first: git remote add origin <repo-url>"
  fi
else
  warn "Not a Git repository; skipping Git commit & push."
fi

echo
pass "All checks completed."

