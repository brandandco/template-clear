export default function okfIntegration(options = {}) {
  let siteConfig = {};

  return {
    name: 'okf-integration',
    hooks: {
      'astro:config:done': ({ config }) => {
        siteConfig = {
          site: config.site?.toString().replace(/\/$/, '') ?? '',
          name: options.name ?? 'Clear',
          description: options.description ?? '',
          tagline: options.tagline ?? '',
          email: options.email ?? '',
          phone: options.phone ?? '',
          address: options.address ?? '',
        };
      },
      'astro:build:done': async ({ pages, dir }) => {
        const { writeFile, mkdir } = await import('node:fs/promises');
        const { join } = await import('node:path');
        const { fileURLToPath } = await import('node:url');
        const dirPath = fileURLToPath(dir);

        // Build page list — normalize to leading-slash, no-trailing-slash ('' -> '/')
        const routes = [...new Set(
          pages
            .map((p) => '/' + p.pathname.replace(/^\/+/, '').replace(/\/$/, ''))
            .filter((p) => !p.includes('404'))
            .sort()
        )];

        const pagesMeta = options.pages ?? {};

        // ── llms.txt ──────────────────────────────
        const llms = [
          `# ${siteConfig.name}`,
          ``,
          `> ${siteConfig.tagline || siteConfig.description}`,
          ``,
          `## About`,
          `${siteConfig.description}`,
          ``,
          siteConfig.email ? `- Email: ${siteConfig.email}` : '',
          siteConfig.phone ? `- Phone: ${siteConfig.phone}` : '',
          siteConfig.address ? `- Address: ${siteConfig.address}` : '',
          ``,
          `## Pages`,
          ...routes.map((route) => {
            const meta = pagesMeta[route] ?? {};
            const label = meta.title ?? routeToTitle(route);
            const desc = meta.description ? ` — ${meta.description}` : '';
            return `- [${label}](${siteConfig.site}${route})${desc}`;
          }),
        ].filter((line) => line !== '').join('\n');

        await writeFile(join(dirPath, 'llms.txt'), llms);

        // ── OKF index.md ──────────────────────────
        const okfDir = join(dirPath, 'okf');
        await mkdir(okfDir, { recursive: true });

        const index = [
          `---`,
          `type: Index`,
          `title: ${siteConfig.name} Knowledge Bundle`,
          `description: ${siteConfig.description}`,
          `resource: ${siteConfig.site}/okf/index.md`,
          `generated: ${new Date().toISOString()}`,
          `---`,
          ``,
          `# ${siteConfig.name} — Knowledge Bundle`,
          ``,
          `> ${siteConfig.tagline || siteConfig.description}`,
          ``,
          `## Pages`,
          ...routes.map((route) => {
            const meta = pagesMeta[route] ?? {};
            const label = meta.title ?? routeToTitle(route);
            return `- [${label}](${siteConfig.site}${route}) — [OKF](${siteConfig.site}/okf${route === '/' ? '/home' : route}.md)`;
          }),
        ].join('\n');

        await writeFile(join(okfDir, 'index.md'), index);

        // ── OKF per-page .md files ─────────────────
        for (const route of routes) {
          const meta = pagesMeta[route] ?? {};
          const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\/$/, '');
          const label = meta.title ?? routeToTitle(route);
          const desc = meta.description ?? siteConfig.description;

          const content = [
            `---`,
            `type: WebPage`,
            `title: ${label}`,
            `description: ${desc}`,
            `resource: ${siteConfig.site}${route}`,
            `tags: ${JSON.stringify(meta.tags ?? [])}`,
            `---`,
            ``,
            `# ${label}`,
            ``,
            desc,
          ].join('\n');

          await writeFile(join(okfDir, `${slug}.md`), content);
        }

        // ── OKF bundle.json ────────────────────────
        const bundle = {
          okf: '1.0',
          generated: new Date().toISOString(),
          site: {
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.site,
            tagline: siteConfig.tagline,
            contact: {
              email: siteConfig.email,
              phone: siteConfig.phone,
              address: siteConfig.address,
            }
          },
          pages: routes.map((route) => {
            const meta = pagesMeta[route] ?? {};
            return {
              path: route,
              url: `${siteConfig.site}${route}`,
              title: meta.title ?? routeToTitle(route),
              description: meta.description ?? siteConfig.description,
              tags: meta.tags ?? [],
            };
          }),
        };

        await writeFile(
          join(okfDir, 'bundle.json'),
          JSON.stringify(bundle, null, 2)
        );

        console.log(`[okf] llms.txt + okf/index.md + ${routes.length} page files + bundle.json`);
      }
    }
  };
}

function routeToTitle(route) {
  if (route === '/') return 'Home';
  return route
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
