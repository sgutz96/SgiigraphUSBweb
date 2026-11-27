# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component and the usual starting point for UI work
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

Tailwind emits utility classes in `@layer utilities`, and CSS outside any cascade layer overrides every layer regardless of specificity. Put global element styles, such as resets and defaults for `body`, headings, `button`, or `input`, inside `@layer base { ... }` so utility classes on those elements still apply. Tailwind's Preflight already applies `box-sizing: border-box`, removes default margins, and sets `font: inherit` on form controls, so do not repeat those rules.

## Design system (SIGGRAPH USBBOG)

Follow these conventions for any UI work. The live style guide is at `#/sistema`.

- **Tokens only.** Colors, radii, fonts and the marquee animation are defined in `@theme` in `src/index.css`. Never write raw hex values or `slate-*` in components: use `bg-ink-800`, `text-muted`, `border-line`, `rounded-card`, `font-display`, etc. Illustrations (`Bird.tsx`, `Art.tsx`) are the only exception.
- **Primitives** live in `src/components/ui/`: `Button` (solid / outline / quiet, `href` renders a link), `Card` + `cardClass()`, `Section` (background `base` / `alt` / `paper`), `Eyebrow`, `Tag`, `FilterChips`, `Modal`, `BackLink`. Build new sections from these.
- **Tone.** `Section background="paper"` provides a light tone through `ToneContext`; components read it with `useTone()` and switch to `orange-ink` / `teal-ink` / `paper-muted` for contrast. Do not use brand `orange` for text on paper.
- **Type.** Headings: `font-display font-bold uppercase`. Labels: the `eyebrow` utility. Body: Montserrat (default). Fonts are self-hosted via `@fontsource` imports in `src/main.tsx`.
- **Content** is centralized in `src/data/content.ts`. Stats are derived from content; do not invent numbers or testimonials.
- **Routing** is hash-based (`src/lib/useHashRoute.ts`): `navigate(page, detailSlug?)`. Public files must be referenced with `asset()` from `src/lib/asset.ts`.
- **Accessibility.** Keep 44px minimum targets, the `focus-ring` utility, `useReducedMotion` for every animation, and never animate `opacity` from 0.
