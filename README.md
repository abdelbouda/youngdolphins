# Astro Landing Template

A comprehensive, performance-optimized landing page template built with Astro, React, and Tailwind CSS. Inspired by Linear, Notion, and Tesla design principles, this template provides a complete foundation for creating modern, conversion-focused landing pages.

## ✨ Features

- **🚀 Blazing Fast Performance** - Built with Astro for optimal loading times
- **🎨 Beautiful Design System** - Comprehensive style guide with consistent components
- **🌙 Dark/Light Mode** - Seamless theme switching with system preference detection
- **📱 Fully Responsive** - Mobile-first design that works on all devices
- **♿ Accessible** - WCAG compliant with proper semantic HTML
- **🔧 Developer Friendly** - TypeScript support with comprehensive documentation
- **📊 Multiple Page Examples** - Landing, about, pricing, blog, and more
- **🎭 Rich Component Library** - Forms, cards, modals, animations, and UI elements
- **⚡ Performance Optimized** - Lazy loading, image optimization, minimal JavaScript

## 🚀 Quick Start

Get up and running in 5 minutes:

```bash
# Clone the repository
git clone <your-repo-url> my-landing-page
cd my-landing-page

# Install dependencies (requires Node.js 18+)
bun install

# Start the development server
bun dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser to see the template in action.

### Immediate Customization

1. **Update branding**: Edit `src/components/ui/Header.astro` for logo and navigation
2. **Change colors**: Modify color variables in `src/styles/global.css`
3. **Update content**: Edit `src/pages/index.astro` and component files
4. **Add your screenshots**: Replace images in `src/assets/screenshots/`

## 📁 Project Structure

```
astro-landing-template/
├── src/
│   ├── assets/                    # Images, icons, and static assets
│   │   └── screenshots/           # Product screenshots (light/dark)
│   ├── components/
│   │   ├── sections/             # Landing page sections
│   │   │   ├── HeroSection.astro
│   │   │   ├── FeaturesSection.astro
│   │   │   ├── TestimonialsSection.astro
│   │   │   ├── PricingSection.astro
│   │   │   └── ...
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   └── forms/                # Form components
│   ├── layouts/
│   │   └── Layout.astro          # Base HTML layout
│   ├── pages/                    # File-based routing
│   │   ├── index.astro           # Landing page
│   │   ├── about.astro           # About page
│   │   ├── pricing.astro         # Pricing page
│   │   ├── contact.astro         # Contact page
│   │   ├── blog/                 # Blog pages
│   │   └── ...
│   └── styles/
│       └── global.css            # Global styles and CSS variables
├── docs/                         # Documentation
│   ├── customization-guide.md
│   ├── component-library.md
│   └── styleguide.md
└── public/                       # Static assets
```

## 🎯 What's Included

### Landing Page Sections
- ✅ Hero section with CTA
- ✅ Problem/solution showcase
- ✅ Feature highlights
- ✅ Testimonials grid
- ✅ Pricing comparison
- ✅ FAQ accordion
- ✅ Stats/metrics display
- ✅ Team preview
- ✅ Integration showcase
- ✅ Trust indicators
- ✅ Newsletter signup
- ✅ Footer with links

### Additional Pages
- ✅ About page with company story
- ✅ Contact page with form
- ✅ Detailed pricing page
- ✅ Features showcase
- ✅ Blog listing and post templates
- ✅ Help/support page
- ✅ 404 error page
- ✅ Coming soon page

### Component Library
- ✅ Button variations (primary, secondary, ghost)
- ✅ Card layouts (product, testimonial, blog)
- ✅ Form components with validation
- ✅ Modal and dialog examples
- ✅ Loading states and skeleton screens
- ✅ Navigation variants
- ✅ Footer options

### Animations & Interactions
- ✅ Scroll-triggered animations
- ✅ Hover micro-interactions
- ✅ Loading animations
- ✅ Smooth transitions
- ✅ Performance-optimized effects

## 🛠️ Technology Stack

- **[Astro](https://astro.build/)** - Static site generator with partial hydration
- **[React](https://react.dev/)** - For interactive components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager

## 📚 Documentation

- **[Quick Customization Guide](docs/quick-customization.md)** - Get started in minutes
- **[Comprehensive Setup Guide](docs/setup-guide.md)** - Detailed configuration
- **[Component Library](docs/component-library.md)** - All available components
- **[Style Guide](docs/styleguide.md)** - Design system and tokens
- **[Animation System](docs/animations.md)** - Performance-optimized effects
- **[Performance Guide](docs/performance.md)** - Optimization best practices

## 🎨 Design Philosophy

This template follows three key design principles:

1. **Minimal Cognitive Load** (Linear) - Clean, focused interface with clear hierarchy
2. **Product-Focused** (Tesla) - Let your product and features speak for themselves
3. **Distraction-Free** (Notion) - Professional, clean interface with generous white space

The design system includes:
- Consistent color palette with dark/light mode support
- Typography scale based on Inter font
- Component patterns with proper spacing
- Performance-optimized animations
- Accessibility-first approach

## 🚀 Deployment

Build your site for production:

```bash
bun build
```

The built site will be in the `dist/` directory, ready for deployment to any static hosting provider:

- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Import your project for instant deployment
- **GitHub Pages**: Enable Pages in your repository settings
- **Cloudflare Pages**: Connect your repository for global CDN

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original design inspiration from the Zeyn writing application
- Design principles from Linear, Notion, and Tesla
- Built with the amazing Astro framework
- UI components inspired by modern design systems

---

**Need help?** Check out the [documentation](docs/) or open an issue on GitHub.