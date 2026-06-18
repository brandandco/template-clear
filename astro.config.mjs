// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import okf from './src/integrations/okf.js';

// Single source of truth for site identity (shared with SEO.astro / JsonLD.astro).
import { siteConfig } from './src/site.config.mjs';
export { siteConfig };

// Per-page metadata for llms.txt / OKF output.
const pages = {
  '/': { title: 'Home', description: 'HOMEPAGE_DESCRIPTION', tags: [] },
  '/about': { title: 'About', description: 'ABOUT_DESCRIPTION', tags: [] },
  '/contact': { title: 'Contact', description: 'CONTACT_DESCRIPTION', tags: [] },
};

// https://astro.build/config
export default defineConfig({
  // Fully static site — deployed to Cloudflare Pages. No SSR adapter.
  output: 'static',

  // Derived from siteConfig.domain — the single place to set the domain.
  site: `https://${siteConfig.domain}`,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    okf({ ...siteConfig, pages }),
  ],
});