// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL and BASE_PATH are set automatically by the GitHub Pages workflow.
// Locally (and on Netlify) the site is served from "/".
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
});
