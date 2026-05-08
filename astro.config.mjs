// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// ✅ Volledige Astro-config voor Young Dolphins
export default defineConfig({
  site: 'https://youngdolphins.vercel.app', // correcte site-URL voor SEO en canonical links

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true, // laat Tailwind basisstijlen toepassen
    }),
    sitemap(),
  ],

  // 🌍 Internationalization (i18n)
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: {
      prefixDefaultLocale: false, // /nl blijft standaard zonder prefix
    },
  },

  // ⚡ Performance-optimalisaties
  build: {
    inlineStylesheets: 'auto', // inline critical CSS
  },

  // 🚀 Prefetch voor snellere navigatie
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // 🖼️ Image-optimalisatie
  image: {
    domains: [],
    remotePatterns: [],
  },

  // 🧱 Output-instellingen
  output: 'static', // statische site voor Vercel

  // 🧩 Compressie voor kleinere build
  compressHTML: true,

  // ✅ Extra instellingen voor nette builds
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
