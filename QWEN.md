# Zeyn Landing Page - Project Context

This is an Astro-based static website for the landing page of "Zeyn", a writing application targeted at novelists. The site is built with performance and modern web practices in mind.

## Project Overview

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: Mix of Astro components (`.astro`) and React components (`.tsx`)
- **Deployment Target**: Static site generation (SSG)

The landing page is designed to be a high-converting page for the Zeyn writing app launch. It emphasizes a clean, distraction-free aesthetic with a dark theme, consistent with the app's focus.

## Key Technologies & Configurations

1.  **Astro (`astro.config.mjs`)**:
    *   Uses the `@astrojs/react` integration for React components.
    *   Uses the `@astrojs/tailwind` integration for styling.
    *   Configured for static site generation (`output: 'static'`).
    *   Enables HTML compression (`compressHTML: true`).
    *   Configures prefetching for better navigation (`prefetch`).
    *   Sets the site URL to `https://zeyn.app`.

2.  **Tailwind CSS (`tailwind.config.js`)**:
    *   Extensively customized theme with a specific color palette, typography, spacing, shadows, and gradients tailored for the Zeyn brand.
    *   Includes custom colors (primary blues, success greens, accent purples/pinks/teals, light/dark mode variants), font sizes, font weights, border radii, and box shadows.
    *   Defines custom gradients for visual appeal.
    *   Includes a plugin for `prefers-reduced-motion` support.

3.  **Package Management**: Uses `bun` as the package manager and runtime.

## Project Structure

Based on the standard Astro structure and files observed:

```
/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, optimized via Astro
│   ├── components/         # UI components (Astro and React)
│   │   ├── sections/       # Page section components
│   │   └── ui/             # Reusable UI components (buttons, forms, etc.)
│   ├── layouts/            # Page layout components
│   └── pages/              # Page routes (Astro files)
├── astro.config.mjs        # Astro configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project README
```

## Building and Running

All commands are run from the project's root directory using `bun`:

| Command                | Action                                           |
| ---------------------- | ------------------------------------------------ |
| `bun install`          | Installs project dependencies                    |
| `bun dev`              | Starts the local development server at `localhost:4321` |
| `bun build`            | Builds the production site to the `./dist/` directory |
| `bun preview`          | Previews the built site locally before deployment |

## Development Conventions

- **Component Structure**: Components are organized by type (UI elements vs. page sections) and technology (`.astro` for mostly static/markup, `.tsx` for interactive React).
- **Styling**: Primarily uses Tailwind CSS utility classes directly in component markup. Custom theme values are defined in `tailwind.config.js`.
- **Images**: Images are imported and optimized using Astro's `Image` component from `astro:assets`.
- **Performance**: The Astro config includes settings for inlining critical CSS, prefetching, and HTML compression to optimize for performance.