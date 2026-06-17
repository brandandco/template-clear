// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import okf from './src/integrations/okf.js';

// https://astro.build/config
export default defineConfig({
  // Fully static site — deployed to Cloudflare Pages. No SSR adapter.
  output: 'static',

  // Replace with the live domain on launch (see template-clear-launch SOP).
  site: 'https://DOMAIN.com',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    okf({ name: 'Clear', description: 'A clean, fast website.' }),
  ],
});