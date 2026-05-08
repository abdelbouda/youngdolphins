// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel'; // ✅ juiste import voor Astro 5.x

export default defineConfig({
  site: 'https://youngdolphins.vercel.app',

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap({
      filter: (page) => !page.includes('/private'),
    }),
  ],

  // 🌍 Internationalization (i18n)
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // ⭐ Middleware werkt alleen met server‑output
  output: 'server',

  // ⭐ Vercel serverless adapter
  adapter: vercel(),

  // ⚡ Performance
  build: {
    inlineStylesheets: 'auto',
  },

  // 🚀 Prefetch
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // 🧩 HTML‑compressie
  compressHTML: true,

  // 🔧 Vite‑optimalisatie
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
