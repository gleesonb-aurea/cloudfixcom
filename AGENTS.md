# Repository Guidelines

## Project Structure & Module Organization
- `app/` – Next.js App Router routes (`page.tsx`, `layout.tsx`), global styles in `app/globals.css`.
- `components/` – Reusable UI components (PascalCase files, colocated concerns).
- `lib/` – Shared utilities and API helpers (TypeScript modules).
- `public/` – Static assets (images, icons) served from `/`.
- `docs/` – Project documentation and guides.
- `scripts/` – Node scripts for maintenance/analysis.
Use kebab-case for route folders, PascalCase for components, and the `@/*` path alias from `tsconfig.json` for imports (e.g., `import Button from '@/components/ui/Button'`).

## Build, Test, and Development Commands
- `npm run dev` – Start the Next.js dev server with HMR.
- `npm run build` – Create an optimized production build.
- `npm run start` – Run the production server (after build).
- `npm run lint` – Lint with Next.js/ESLint configuration.
Install dependencies with `npm ci` for reproducible installs.

## Coding Style & Naming Conventions
- Language: TypeScript (strict); add explicit types at module boundaries.
- Indentation: 2 spaces; keep imports sorted and grouped.
- React: Function components; component files use `ComponentName.tsx`.
- Hooks/utilities: hooks start with `use*`; utilities are camelCase in `lib/`.
- Styling: Tailwind CSS; prefer semantic class composition and readable class lists.

## Testing Guidelines
- No test runner is configured yet. If adding tests, prefer Jest + React Testing Library (or Vitest) with files named `<name>.test.ts(x)` under `__tests__/` or beside the source.
- Keep tests deterministic and fast; focus on core routes/components and utility functions.
- When introducing tests, add an `npm test` script and ensure CI can run it.

## Commit & Pull Request Guidelines
- Use Conventional Commits (e.g., `feat:`, `fix:`, `docs:`, `chore:`). Example: `feat(pricing): add calculator to /pricing`.
- Keep commits small and focused; describe the “why” in the body when helpful.
- PRs should include: clear description, linked issues, and screenshots for UI changes.
- Before requesting review: run `npm run lint` and `npm run build` locally.

## Security & Configuration Tips
- Secrets belong in `.env.local` (never committed). Access via `process.env.*`.
- Don’t commit `.next/` or local logs; place static assets in `public/`.
- Validate external data in `lib/` with zod or similar where appropriate.

## Agent-Specific Notes
- Respect the directory structure and naming patterns above.
- Prefer minimal, targeted changes; avoid renaming top-level folders.
- If you change conventions or scripts, update this document accordingly.

