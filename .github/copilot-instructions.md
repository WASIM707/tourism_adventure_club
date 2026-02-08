# Copilot / AI Agent Instructions

Purpose: quick, actionable guidance to help an AI coding agent be productive in this repository.

**Quick Start**
- **Install & run**: prefer using `pnpm` (project has a lockfile). Run `pnpm install` then `pnpm dev`.
- **Build**: `pnpm build` and `pnpm start` for production preview. `npm` also works with the scripts in `package.json`.

**Big Picture / Architecture**
- Next.js App Router project (routes live in `app/`). Server components are default; interactive UI uses client components.
- Global layout and theme are wired in [app/layout.tsx](app/layout.tsx) and `components/theme-provider.tsx`.
- UI primitives live in `components/ui/`. Page-level composed components are in `components/` and page routes under `app/` and `app/destinations`.

**Project-specific conventions**
- Server vs Client: add `'use client'` as the first line to mark a client component (see `components/theme-provider.tsx` and `components/qr/QrGenerator.tsx`).
- Path alias: imports use `@/` (configured in `tsconfig.json`) — e.g. `import { ThemeProvider } from "@/components/theme-provider"`.
- Styling: Tailwind is used; global CSS files are `app/globals.css` and `styles/globals.css`.
- UI pattern: keep low-level primitives in `components/ui/` and compose page-specific components in `components/`.

**Key files to inspect**
- [package.json](package.json) — scripts and core dependencies (Next 15, React 19, Radix UI, qrcode, zod, react-hook-form).
- [next.config.mjs](next.config.mjs) — notable: `images.unoptimized: true`, and TypeScript/ESLint build ignores.
- [tsconfig.json](tsconfig.json) — `@/` path alias and TS options.
- [components/theme-provider.tsx](components/theme-provider.tsx) — client component example.
- [components/qr/QrGenerator.tsx](components/qr/QrGenerator.tsx) and [lib/qr.ts](lib/qr.ts) — QR generation flow.

**External integrations & dependencies**
- Radix UI for accessible primitives (`@radix-ui/*`).
- Tailwind CSS with `tailwind-merge` and animations plugin.
- `qrcode` package for QR generation; `framer-motion` and `recharts` used for visuals.

**Build & Debug tips**
- Use `pnpm` to match the lockfile; `pnpm install` before running.
- `next.config.mjs` disables Next image optimization and ignores type/lint build errors — watch out when diagnosing runtime issues.
- Server components cannot access browser APIs — convert to client components by adding `'use client'` if you need hooks or DOM.

**Editing guidelines**
- Add new primitives under `components/ui/` and keep compositional components in `components/`.
- Keep import style consistent (use `@/` alias).
- If adding interactive logic, ensure `'use client'` is present and that hooks are only used in client components.

If you want, I can expand this with examples, CI notes, or a short contributor checklist. Tell me which area to expand.
