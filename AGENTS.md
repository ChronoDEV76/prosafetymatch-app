# Repository Guidelines

## Project Structure & Module Organization
- Vite + React app deployed on Vercel.
- Source in `src/`:
  - Pages in `src/pages/` and layouts in `src/layouts/`.
  - Feature modules under `src/features/<domain>/` with `components/` and `assets/`.
  - Entry points `src/main.jsx`, `src/App.jsx`; global styles `src/index.css`, Tailwind configured via `tailwind.config.js`.
- Static assets in `public/`.
- Serverless functions for Vercel in `api/`.
- Build output in `dist/` (ignored by Git).

## Build, Test, and Development Commands
- `pnpm dev` – Start local dev server (Vite) at `http://localhost:5173`.
- `pnpm build` – Production build to `dist/`.
- `pnpm preview` – Serve the built app locally.
- `pnpm lint` – Run ESLint on the repo.
- Deploy (Vercel): `pnpm deploy:preview` or `pnpm deploy:prod`.

## Coding Style & Naming Conventions
- Use ESLint config in `eslint.config.js`; fix issues proactively.
- Indentation: 2 spaces; semicolons optional (follow existing files); single quotes preferred.
- React components: PascalCase filenames (e.g., `Header.jsx`); hooks: `useSomething.js`.
- Exports: default for pages/layouts, named for reusable components.
- Styles: Tailwind for utility classes; place long class lists on multiple lines for readability.
- Paths: keep feature-based folders (`src/features/<domain>`). Avoid deep nesting when possible.

## Testing Guidelines
- Framework: Vitest + React Testing Library (jsdom).
- Commands: `pnpm test` (watch), `pnpm test:run` (CI + coverage), `pnpm test:ui` (interactive UI).
- Tests live in `src/__tests__/` and `*.test.jsx` next to source.
- Focus on high-value paths: routing, auth flows, critical UI states.

## Commit & Pull Request Guidelines
- Commit messages: prefer Conventional Commits (e.g., `feat: add signup flow`, `fix: handle token expiry`, `chore: bump deps`).
- PRs should include:
  - Summary, screenshots for UI changes, and linked issue.
  - Clear scope (small, focused diffs). Note any follow-ups.
  - Steps to verify (commands, routes to visit).
- Branch names: `feat/<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`.

## Security & Configuration Tips
- Secrets go in `env.local` (never commit). Keep `vercel.json` and serverless `api/` endpoints minimal and reviewed.
- Validate and sanitize inputs in API handlers; avoid exposing JWTs to the client.
