// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// ⭐ Stabiele, SEO‑vriendelijke Astro-config met sitemap
export default defineConfig({
  site: 'https://youngdolphins.vercel.app',

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true, // Nodig zodat Tailwind je layout toepast
    }),
    sitemap({
      filter: (page) => !page.includes('/private'), // optioneel: filter
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

  // ⚡ Performance
  build: {
    inlineStylesheets: 'auto',
  },

  // 🚀 Prefetch
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // 🧱 Static output voor Vercel
  output: 'static',

  // 🧩 HTML compressie
  compressHTML: true,

  // 🔧 Vite optimalisatie
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
