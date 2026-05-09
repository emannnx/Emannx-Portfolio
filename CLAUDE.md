# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev          # start dev server
bun run build        # production build (tsc + vite build)
bun run lint         # ESLint
bun run test         # vitest run (single pass)
bun run test:watch   # vitest watch mode
bun run preview      # preview production build
```

Run a single test file: `bun run test src/path/to/file.test.ts`

## Architecture

Single-page portfolio built with **React 18 + Vite + TypeScript**. All routes live in `src/pages/`; `Index.tsx` is the main page and assembles sections top-to-bottom. `App.tsx` wraps with React Query, Tooltip provider, and React Router.

**Path alias:** `@/` maps to `src/`.

**Styling:** Tailwind CSS v3 with a custom design token system in `src/index.css`. CSS variables (`--foreground`, `--primary`, etc.) are defined in `:root` / `.dark` and consumed via Tailwind's `hsl(var(--...))` color config. Custom utility classes (`heading-xl`, `body-lg`, `text-gradient`, `grid-background`, `card-shadow`) and keyframe animations (`animate-float`, `animate-pulse-soft`) are defined in `src/index.css`. **Do not use the leftover Vite boilerplate in `src/App.css` for layout** — `#root` there is intentionally minimal.

**Component library:** shadcn/ui components live in `src/components/ui/` and should not be edited directly. Custom page sections live in `src/components/`.

**Animation:** Framer Motion is the primary animation library. `ThreeBackground.tsx` exists but is currently commented out everywhere.

**Fonts:** Space Grotesk (headings) and Inter (body), loaded via Google Fonts in `src/index.css`.

**Tests:** Vitest + jsdom + Testing Library. Test files go in `src/` alongside source or in `src/test/`. Setup file is `src/test/setup.ts`.
