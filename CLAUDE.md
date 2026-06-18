# template-clear — Claude Code Instructions

## What this is
A production-ready Astro template for brandandco projects.
Light/dark, fluid type, full SEO/AIO stack, Cloudflare Pages.

## Single source of truth
src/site.config.mjs — edit this first on every project.
Never edit SEO.astro, JsonLD.astro, astro.config.mjs
for client data.

## Stack
- Astro 6, Tailwind 4, static output
- Cloudflare Pages (no adapter needed)
- Mulish self-hosted via fontsource
- No React, no Vue, no SSR

## Structure
src/
  components/
    Header.astro      ← logo, nav, hamburger, drawer
    Footer.astro      ← copyright, theme toggle
    SEO.astro         ← all meta tags
    JsonLD.astro      ← all structured data
    Drawer.astro      ← slide-out nav panel
  layouts/
    Base.astro        ← wraps every page
  pages/
    index.astro       ← home
    about.astro       ← about
    contact.astro     ← contact + form
    404.astro         ← not found
    robots.txt.ts     ← dynamic, reads site.config
  styles/
    global.css        ← resets, base styles
    tokens.css        ← design tokens (type, space, color)
  integrations/
    okf.js            ← builds llms.txt + OKF bundle
  site.config.mjs     ← SINGLE SOURCE OF TRUTH

public/
  fonts/              ← self-hosted Mulish woff2
  okf/                ← generated OKF bundle
  favicon.svg         ← template favicon
  og-default.png      ← default OG image 1200x630
  _headers            ← Cloudflare cache + security
  llms.txt            ← generated at build
  robots.txt          ← generated at build

## On every new project
1. Copy template to correct folder
2. Edit src/site.config.mjs
3. Edit astro.config.mjs okf pages map
4. Edit brief.md
5. Run npm run build to verify
6. Push to GitHub → Cloudflare auto-deploys

## SEO/AIO stack (auto-generated every build)
- JSON-LD: WebSite + Organization + WebPage +
  BreadcrumbList on every page
- robots.txt: all AI crawlers explicitly allowed
- llms.txt: org info + per-page summaries
- OKF bundle: index.md + per-page .md + bundle.json
- sitemap.xml: auto via @astrojs/sitemap

## Performance rules
- No Google Fonts — self-hosted only
- No external scripts
- Inline critical CSS
- font-display: swap always
- Images: use <Image /> from astro:assets only
- Target: 100/100 Lighthouse mobile

## Forms
- POST to /functions/api/submit.js
- Inline JS — no page redirect
- Honeypot field required
- RESEND_API_KEY in Cloudflare env vars only

## Launch checklist
- [ ] site.config.mjs filled
- [ ] brief.md filled
- [ ] astro.config.mjs okf pages map filled
- [ ] npm run build passes clean
- [ ] GitHub repo created
- [ ] Cloudflare Pages connected
- [ ] Custom domain connected
- [ ] CNAME DNS record added
- [ ] Zone optimization applied
- [ ] RESEND_API_KEY added as secret
- [ ] Lighthouse 100/100 verified
