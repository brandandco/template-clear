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
    okf({
      name: 'SITE_NAME',
      description: 'SITE_DESCRIPTION',
      tagline: 'SITE_TAGLINE',
      email: 'SITE_EMAIL',
      phone: 'SITE_PHONE',
      address: 'SITE_ADDRESS',
      pages: {
        '/': {
          title: 'Home',
          description: 'HOMEPAGE_DESCRIPTION',
          tags: [],
        },
        '/about': {
          title: 'About',
          description: 'ABOUT_DESCRIPTION',
          tags: [],
        },
        '/contact': {
          title: 'Contact',
          description: 'CONTACT_DESCRIPTION',
          tags: [],
        },
      },
    }),
  ],
});