# Quick Customization Guide

Get your landing page up and running in minutes with these quick customization steps.

## 🚀 5-Minute Setup

### 1. Clone and Install

```bash
# Clone the template
git clone <your-repo-url> my-landing
cd my-landing

# Install dependencies
bun install

# Start development server
bun dev
```

### 2. Update Brand Identity

#### Change Logo and Site Name
Edit `src/components/ui/Header.astro`:
```astro
<!-- Line 12: Update your brand name -->
<span class="text-xl font-semibold text-white">YourBrand</span>
```

#### Update Site Metadata
Edit `src/pages/index.astro`:
```astro
<!-- Lines 11-13: Update title and description -->
<Layout 
  title="YourProduct - Your tagline here"
  description="Your product description for SEO"
>
```

### 3. Customize Colors

Edit `src/styles/global.css` to change the color scheme:

```css
/* Primary Brand Colors */
:root {
  /* Change these to match your brand */
  --primary-blue: #4F81F4;    /* Your primary color */
  --primary-blue-hover: #3B6FE8;
  --primary-blue-light: #E3EBFE;
  
  /* Accent colors */
  --success-green: #10B981;
  --achievement-orange: #F59E0B;
  --accent-purple: #8B5CF6;
}
```

### 4. Update Hero Content

Edit `src/components/sections/HeroSection.astro`:

```astro
<!-- Update headline (line ~20) -->
<h1>Your Amazing Product</h1>

<!-- Update subheadline (line ~24) -->
<p>Your compelling value proposition</p>

<!-- Update CTA button (line ~30) -->
<Button>Get Started Free</Button>
```

### 5. Replace Screenshots

1. Add your product screenshots to `src/assets/screenshots/`
2. Update image imports in component files:

```astro
// In FeaturesSection.astro
import screenshot1 from '../../assets/screenshots/your-screenshot.png';
```

## 🎨 Quick Content Updates

### Navigation Menu
`src/components/ui/Header.astro` - Lines 20-40

### Hero Section
`src/components/sections/HeroSection.astro` - Main headline and CTA

### Features
`src/components/sections/FeaturesSection.astro` - Product features

### Testimonials
`src/components/sections/TestimonialsSection.astro` - Customer reviews

### Pricing
`src/components/sections/PricingSection.astro` - Pricing tiers

### FAQ
`src/components/sections/FAQSection.astro` - Common questions

### Footer
`src/components/sections/FinalSections.astro` - Footer links and copyright

## 📝 Common Customizations

### Add New Pages

Create new pages in `src/pages/`:

```astro
---
// src/pages/features.astro
import Layout from '../layouts/Layout.astro';
import Header from '../components/ui/Header.astro';
---

<Layout title="Features - YourProduct">
  <Header />
  <main>
    <!-- Your content here -->
  </main>
</Layout>
```

### Add New Sections

Create new sections in `src/components/sections/`:

```astro
---
// src/components/sections/YourSection.astro
import Container from '../ui/Container.astro';
---

<section class="py-16 bg-white dark:bg-gray-900">
  <Container>
    <!-- Your section content -->
  </Container>
</section>
```

Then import and use in your pages:

```astro
---
import YourSection from '../components/sections/YourSection.astro';
---

<YourSection />
```

### Modify Components

All reusable components are in `src/components/ui/`:
- `Button.astro` - Button styles and variants
- `Card.astro` - Card layouts
- `Container.astro` - Content container
- `Badge.astro` - Labels and badges

### Update Forms

Forms use placeholder actions. To make them functional:

1. **Email Signup** (`src/components/ui/EmailSignupForm.tsx`):
```tsx
// Line 25: Add your email service
const response = await fetch('YOUR_API_ENDPOINT', {
  method: 'POST',
  body: JSON.stringify({ email })
});
```

2. **Contact Form** (when created):
```tsx
// Add your form handler
const handleSubmit = async (data) => {
  await fetch('YOUR_CONTACT_API', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};
```

## 🚢 Deployment

### Build for Production

```bash
bun build
```

The optimized site will be in the `dist/` folder.

### Deploy to Netlify

1. Push to GitHub
2. Connect repository to Netlify
3. Build command: `bun build`
4. Publish directory: `dist`

### Deploy to Vercel

```bash
npx vercel
```

### Deploy to GitHub Pages

1. Enable Pages in repository settings
2. Set source to GitHub Actions
3. Push to main branch

## 📚 Next Steps

- Check the [Comprehensive Setup Guide](./setup-guide.md) for detailed customization
- Review the [Component Library](./component-library.md) for all available components
- See the [Style Guide](./styleguide.md) for design system details

## 🆘 Need Help?

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

**Pro Tip**: Use search and replace to quickly update "Zeyn" to your product name throughout the template!