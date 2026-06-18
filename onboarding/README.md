# Client Onboarding — How It Works

## The flow

1. **Get existing website URL from client**
   Claude Code scrapes it → identifies business type →
   generates pre-filled Google Doc intake form

2. **Share Google Doc with client**
   Client reviews, corrects, and completes the form
   (or fills client-intake.md directly for smaller projects)

3. **Claude Code reads completed intake**
   Reads via Google Drive MCP or client-intake.md
   Asks clarifying questions if needed
   Fills onboarding.md with structured data

4. **Claude Code generates brief.md from onboarding.md**
   Maps business data → project decisions
   Sets site.config.mjs values
   Defines pages, schema type, SEO signals

5. **Build pipeline runs**
   Everything in site.config.mjs flows into:
   meta tags, JSON-LD, robots.txt, llms.txt, OKF bundle

## Files

- client-intake.md — the form the client fills
- onboarding.md — structured data Claude Code writes
- README.md — this file

## Claude Code SOP for onboarding

When given a new client project:

1. Read ~/ai/_system/sop/template-clear-launch.md
2. Ask for existing website URL
3. Scrape it with web_fetch
4. Identify: business type, services, location,
   existing SEO signals, content gaps
5. Pre-fill client-intake.md with scraped data
6. Flag what's missing for client to complete
7. Once client completes: read and ask clarifications
8. Fill onboarding.md completely
9. Generate brief.md from onboarding.md
10. Fill site.config.mjs from onboarding.md
11. Fill astro.config.mjs okf pages map
12. Run npm run build
13. Follow template-clear-launch.md steps 4-12
