Highlights
- Build: Clean Vite 5 config; removed optimizeDeps.exclude; fixed Tailwind/PostCSS resolution; build succeeds.
- Linting: ESLint ignores (.vercel, dist, node_modules) + Node/test globals; lint passes.
- Testing: Vitest on happy-dom, single thread + forks, no PostCSS in tests; updated assertions to match Dutch UI; 3 tests passing.
- API: Fixed mailer catch block to log and rethrow.
- Repo: Switched to pnpm-lock.yaml (removed package-lock.json); added basic CI workflow; removed duplicate PostCSS config; consolidated Tailwind config.

Changes
- vite.config.js: remove optimizeDeps exclude; keep @vitejs/plugin-react.
- eslint.config.js: add ignores + Node/test envs; enable test globals.
- vitest.config.ts: happy-dom, disable PostCSS in tests, fork pool.
- api/_lib/mailer.js: fix truncated catch; proper error log.
- tests: update copy-sensitive assertions.
- housekeeping: .npmrc, pnpm-lock.yaml, CI workflow, tailwind.config.cjs.

Verification
- pnpm install
- pnpm lint
- pnpm build
- pnpm test:run
