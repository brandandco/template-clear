import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * OKF (Open Knowledge File) — build integration for the Clear template.
 *
 * After each production build it writes two machine-readable artifacts into
 * the output directory, derived from the site's `site` URL and the options
 * passed here (single source of truth lives in astro.config.mjs):
 *
 *   /llms.txt          plain-text site map for LLM crawlers (https://llmstxt.org/)
 *   /okf/bundle.json   structured knowledge bundle describing the site
 *
 * @param {object}   [options]
 * @param {string}   [options.name]        Site / brand name.
 * @param {string}   [options.description] One-line site description.
 * @param {string[]} [options.exclude]     Route slugs to omit (default: ['404']).
 */
export default function okf(options = {}) {
  let siteUrl = '';

  return {
    name: 'okf',
    hooks: {
      'astro:config:done': ({ config }) => {
        siteUrl = config.site ? String(config.site).replace(/\/$/, '') : '';
      },

      'astro:build:done': async ({ dir, pages, logger }) => {
        const outDir = fileURLToPath(dir);
        const name = options.name || 'Untitled site';
        const description = options.description || '';
        const exclude = new Set(options.exclude || ['404']);

        const routes = pages
          .map((p) => p.pathname.replace(/index\.html$/, '').replace(/\.html$/, ''))
          .map((p) => '/' + p.replace(/^\/+/, '').replace(/\/$/, ''))
          .filter((r) => !exclude.has(r.replace(/^\//, '')))
          .filter((r, i, arr) => arr.indexOf(r) === i)
          .sort();

        // llms.txt — https://llmstxt.org/
        const llms = [
          `# ${name}`,
          '',
          ...(description ? [`> ${description}`, ''] : []),
          '## Pages',
          ...routes.map((r) => `- [${r}](${siteUrl}${r})`),
          '',
        ].join('\n');
        await fs.writeFile(path.join(outDir, 'llms.txt'), llms, 'utf-8');

        // OKF bundle — structured JSON
        const bundle = {
          okf: '1.0',
          generated: new Date().toISOString(),
          site: { name, description, url: siteUrl },
          pages: routes.map((r) => ({ path: r, url: `${siteUrl}${r}` })),
        };
        await fs.mkdir(path.join(outDir, 'okf'), { recursive: true });
        await fs.writeFile(
          path.join(outDir, 'okf', 'bundle.json'),
          JSON.stringify(bundle, null, 2),
          'utf-8',
        );

        logger.info(`wrote llms.txt + okf/bundle.json (${routes.length} pages)`);
      },
    },
  };
}
