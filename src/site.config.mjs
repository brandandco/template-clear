// ─────────────────────────────────────────────────────────────
// Single source of truth for site identity.
// Update these per project — astro.config.mjs, SEO.astro, JsonLD.astro
// and the OKF integration all read from here, so nothing can drift.
// ─────────────────────────────────────────────────────────────
export const siteConfig = {
  name: 'SITE_NAME',
  description: 'SITE_DESCRIPTION',
  tagline: 'SITE_TAGLINE',
  email: 'SITE_EMAIL',
  phone: 'SITE_PHONE',
  address: 'SITE_ADDRESS',
  domain: 'DOMAIN.com',
};
