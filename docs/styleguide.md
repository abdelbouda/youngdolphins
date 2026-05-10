# Zeyn Landing Page Style Guide

**Vision:** Blazing fast, responsive, addictive and eye-friendly landing page inspired by Notion, Tesla, and Linear that seamlessly integrates with Zeyn app screenshots.

## Design Philosophy

### Core Principles
- **Minimal Cognitive Load** (Linear) - Clean, linear progression with minimal choices
- **Product-Focused** (Tesla) - Let the app screenshots and features speak for themselves
- **Distraction-Free** (Notion) - Professional, clean interface with generous white space
- **Performance-First** - Blazing fast loading with optimized assets and minimal JavaScript

## Color System

### Primary Colors
```css
/* Primary Blue - Zeyn Brand */
--primary-blue: #4F81F4;
--primary-blue-hover: #3B6FE8;
--primary-blue-light: #E3EBFE;

/* Success Green */
--success-green: #10B981;
--success-green-light: #D1FAE5;

/* Achievement Orange */
--achievement-orange: #F59E0B;
--achievement-orange-light: #FEF3C7;

/* Accent Purple */
--accent-purple: #8B5CF6;
--accent-purple-light: #EDE9FE;
```

### Light Mode
```css
/* Backgrounds */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-card: #FFFFFF;
--bg-hover: #F3F4F6;

/* Text */
--text-primary: #111827;
--text-secondary: #6B7280;
--text-muted: #9CA3AF;

/* Borders */
--border-light: #E5E7EB;
--border-medium: #D1D5DB;
--shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
```

### Dark Mode
```css
/* Backgrounds */
--bg-primary: #0A0A0A;
--bg-secondary: #1A1A1A;
--bg-card: #161616;
--bg-hover: #262626;

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #A3A3A3;
--text-muted: #737373;

/* Borders */
--border-light: #262626;
--border-medium: #404040;
--shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
```

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Scale & Hierarchy
```css
/* Display - Hero headings */
--text-6xl: 3.75rem; /* 60px */
--text-5xl: 3rem;    /* 48px */

/* Headings */
--text-4xl: 2.25rem; /* 36px */
--text-3xl: 1.875rem; /* 30px */
--text-2xl: 1.5rem;   /* 24px */
--text-xl: 1.25rem;   /* 20px */
--text-lg: 1.125rem;  /* 18px */

/* Body */
--text-base: 1rem;    /* 16px */
--text-sm: 0.875rem;  /* 14px */
--text-xs: 0.75rem;   /* 12px */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## Layout System

### Spacing Scale (rem-based)
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Container Sizes
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

## Component Patterns

### Cards
```css
/* Light Mode Card */
.card-light {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

/* Dark Mode Card */
.card-dark {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  box-shadow: var(--shadow);
}
```

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--primary-blue);
  color: white;
  border-radius: 8px;
  font-weight: var(--font-medium);
  transition: all 150ms ease;
}

.btn-primary:hover {
  background: var(--primary-blue-hover);
  transform: translateY(-1px);
}
```

### Navigation
- Clean horizontal navigation with icon + text
- Consistent spacing and hover states
- Theme toggle prominently placed
- Minimal visual noise

## Animation & Motion

### Principles
- **Subtle & Fast** - 150-200ms transitions
- **Purposeful** - Only animate to guide attention or provide feedback
- **Reduced Motion Friendly** - Respect `prefers-reduced-motion`

### Common Animations
```css
/* Hover Lift */
transform: translateY(-1px);
transition: transform 150ms ease;

/* Fade In */
opacity: 0;
animation: fadeIn 300ms ease-out forwards;

/* Scale on Hover */
transform: scale(1.02);
transition: transform 200ms ease;
```

## Screenshot Integration

### Embedding Strategy
- Use high-quality WebP format for performance
- Implement lazy loading for below-fold screenshots
- Maintain aspect ratios with responsive containers
- Add subtle shadows that match card styling
- Ensure screenshots blend with background colors

### Container Patterns
```css
.screenshot-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: var(--bg-card);
}
```

## Performance Guidelines

### Critical Optimizations
- Inline critical CSS for above-the-fold content
- Preload hero fonts and images
- Use `loading="lazy"` for non-critical images
- Implement proper image sizing and format optimization
- Minimize JavaScript bundle size
- Use CSS transforms for animations (GPU acceleration)

### Loading Strategy
1. **Critical Path**: Logo, navigation, hero text
2. **Progressive Enhancement**: Screenshots, animations, interactive elements
3. **Deferred**: Analytics, non-essential third-party scripts

## Responsive Breakpoints

```css
/* Mobile First Approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

## Accessibility

### Requirements
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Focus indicators for all interactive elements
- Semantic HTML structure
- Screen reader friendly labels
- Keyboard navigation support

## Implementation Notes

### Tailwind Configuration
- Extend default theme with Zeyn color palette
- Configure custom spacing scale
- Add Inter font family
- Set up dark mode with 'class' strategy

### Component Architecture
- Use Astro components for static elements
- React components only when interactivity is needed
- Implement proper `client:*` directives for hydration
- Minimize JavaScript bundle size through selective hydration