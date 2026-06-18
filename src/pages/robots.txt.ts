import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') ?? '';
  return new Response(
`User-agent: *
Allow: /

# AI Crawlers — explicitly allowed
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Omgilibot
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`, { headers: { 'Content-Type': 'text/plain' } });
};
