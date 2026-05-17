// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://youngdolphins.nl',

  integrations: [
    react(),
    tailwind({ applyBaseStyles: true }),
    sitemap({
      filter: (page) => !page.includes('/private'),
    }),
  ],

  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  output: 'server',
  adapter: vercel({
  nodeVersion: "20"
}),
  build: {
    inlineStylesheets: 'auto',
    format: 'file',
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  compressHTML: true,

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [],
  },

  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  },
});
