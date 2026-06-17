# Clear — Astro template

> Brand & base template for fast, clean, statically-hosted sites.
> Copy this folder to start a new client or venture site. See the launch SOP at
> `~/ai/_system/sop/template-clear-launch.md`.

## Stack

- **Astro 6** — static output (`output: 'static'`), no SSR adapter
- **Tailwind CSS v4** — via `@tailwindcss/vite` (CSS-first config, no `tailwind.config`)
- **Mulish** — self-hosted with `@fontsource/mulish` (imported in `Base.astro`)
- **Cloudflare Pages** — hosting (build: `npm run build`, output: `dist/`)
- **@astrojs/sitemap** — generates `sitemap-index.xml`
- **OKF integration** (`src/integrations/okf.js`) — generates `llms.txt` + `okf/bundle.json` on build

## Commands

```bash
npm install        # install deps
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the build
```

## Structure

```
src/
  components/   Header, Footer, SEO, Drawer
  layouts/      Base.astro — html shell, theme init, drawer/theme JS
  pages/        index, about, contact
  styles/       global.css (tailwind + base), tokens.css (design tokens)
  integrations/ okf.js — llms.txt + OKF bundle generator
public/         robots.txt, llms.txt, favicons, fonts/, okf/
```

## Design system

- **Tokens** live in `src/styles/tokens.css`.
- **Fluid type** — `--text-xs … --text-5xl` (in `@theme`), used as Tailwind utilities (`text-lg`, `text-5xl`, …).
- **Fluid space** — `--space-2xs … --space-3xl`, used as arbitrary utilities, e.g. `px-[var(--space-md)]`.
- **Colours** — semantic tokens (`--c-bg`, `--c-text`, `--c-accent`, …) mapped to utilities (`bg-bg`, `text-muted`, `border-border`, `bg-accent`). Override the dark values under `body.dark`.

## Theming

Light/dark is a `dark` class on `<body>`, persisted to `localStorage` (`theme`) and
defaulting to the system preference. A no-flash inline script sets it before paint;
`[data-theme-toggle]` buttons flip it.

## Layout

- Top nav: logo left, nav centre, hamburger right.
- Slide-out drawer (`Drawer.astro`): 40vw, right edge, on mobile and desktop; opened by
  `[data-drawer-open]`, closed by overlay click, close button, or Escape.

## Conventions

- Edit source styles in `src/styles/` — never hand-edit compiled CSS.
- Keep it static: do not add an SSR adapter unless a page genuinely needs server rendering.
- Update `site` in `astro.config.mjs` and the `okf({ name, description })` options per project.
