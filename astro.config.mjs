// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// If you buy a custom domain (e.g. rahulnivash.com), change `site` to it
// and add a public/CNAME file containing just the domain.
export default defineConfig({
  site: 'https://rahulnivash.github.io',
  integrations: [sitemap()],
  build: {
    // One small page: inlining the CSS saves a request on first load.
    inlineStylesheets: 'always',
  },
});
