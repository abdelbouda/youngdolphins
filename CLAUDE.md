# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a comprehensive Astro-based landing page template using React components and Tailwind CSS. The template includes the original Zeyn landing page as a showcase example, plus additional sections, pages, and components that can be customized for any product or service. The project uses bun as the package manager and follows Astro's file-based routing system.

## Development Commands

- `bun install` - Install dependencies
- `bun dev` - Start development server at localhost:4321
- `bun build` - Build production site to ./dist/
- `bun preview` - Preview production build locally
- `bun astro check` - Type check the project

## Architecture

**Framework Stack:**
- Astro v5.13.2 with React and Tailwind CSS integrations
- TypeScript with strict configuration
- File-based routing in src/pages/

**Key Directories:**
- `src/components/` - React components (JSX) and Astro components
- `src/layouts/` - Layout components that wrap pages
- `src/pages/` - Route definitions (index.astro is the homepage)
- `src/assets/screenshots/` - Contains light/dark mode screenshots of the Zeyn app
- `src/styles/` - Global CSS with Tailwind directives

**Component Hydration:**
- React components require `client:load` directive in Astro files for interactivity
- Example: `<Hero client:load />` in index.astro

**Styling:**
- Tailwind CSS configured to scan all Astro, JS, JSX, and TS files
- Global styles in src/styles/global.css
- Component-level styles use Tailwind classes or Astro scoped styles
- **Design System:** Follow docs/styleguide.md for colors, typography, and visual patterns

## Design Guidelines

**Style Guide:** `docs/styleguide.md` contains comprehensive design system with:
- Color tokens for light/dark modes matching Zeyn app
- Typography scale and font hierarchy
- Component patterns and spacing system
- Performance-optimized animation guidelines
- Screenshot integration strategies

## File Structure Notes

- Entry point: src/pages/index.astro renders the Hero component
- Layout wrapper: src/layouts/Layout.astro provides HTML structure and imports global styles
- Interactive components: src/components/Hero.jsx demonstrates React state management with Tailwind styling

## KEY RULES

- never run dev server on your own, never run `bun run dev` or `bun dev`
- always create documentation and plan files in the `docs/` directory

## TESTING

- you are allowed to use playwright mcp to test sth
- you can create playwright tests in the `e2e` folder if needed
 