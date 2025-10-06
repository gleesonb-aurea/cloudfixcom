# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 migration of the CloudFix WordPress site (cloudfix.com) to a modern static site. The project is currently **17% complete** (4 of 24 pages built) with solid architectural foundations and brand guidelines in place.

**Status**: Active development, migrating from PHP/WordPress to Next.js/TypeScript/Tailwind CSS stack.

## Development Commands

```bash
# Development
npm run dev              # Start development server (http://localhost:3000)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Common workflow
npm install             # Install dependencies
npm run dev            # Make changes
npm run build          # Verify build before commit
```

## Architecture & Structure

### Core Technology Stack
- **Next.js 14** with App Router (not Pages Router)
- **TypeScript** for type safety
- **Tailwind CSS** with custom CloudFix brand colors
- **React Hook Form + Zod** for form validation
- **Radix UI** for accessible form components

### Project Layout
```
app/                    # Next.js App Router pages
├── layout.tsx          # Root layout with global metadata
├── page.tsx            # Homepage
├── globals.css         # Global styles and CSS utilities
└── [page]/page.tsx     # Individual pages (auto-routing)

components/             # Reusable React components
├── Header.tsx          # Navigation with mobile menu
├── Footer.tsx          # Footer with schema markup
├── Hero.tsx            # Flexible hero sections
├── ContentBlock.tsx    # Multi-column layouts with FeatureCard/StatCard
└── Newsletter.tsx      # Newsletter signup with webhook

docs/                   # Comprehensive project documentation
├── README.md           # Documentation index
├── ROADMAP.md          # Development phases and task tracking
├── BRAND_CONSISTENCY_AUDIT.md  # Brand color specifications
└── DEPLOYMENT_GUIDE.md # Vercel deployment instructions
```

### Brand Color System
**Critical**: Always use CloudFix brand colors from `tailwind.config.ts`:
- `primary` (Cyan: #00BCD4) - Main brand color
- `secondary` (Blue: #0088CC) - Secondary brand color
- `accent` (Yellow: #fecd00) - CTA buttons and highlights

**Never use purple colors** - these were from previous incorrect implementation.

### Component Patterns

#### ContentBlock Component
The primary layout component for multi-column sections:
```tsx
<ContentBlock title="Section Title" columns={3} centered>
  <FeatureCard icon="🔍" title="Feature" description="Details" />
  <StatCard value="$2.5M" label="Saved" description="Customer savings" />
</ContentBlock>
```

#### Hero Component
Flexible hero sections with optional CTAs:
```tsx
<Hero
  title="Main Headline"
  subtitle="Badge text"
  description="Supporting content"
  ctaText="Get Started"
  ctaLink="/assessment"
/>
```

### Form System
Forms use React Hook Form + Zod validation:
- Input components in `components/forms/` (to be created)
- Validation schemas using Zod
- reCAPTCHA integration for security
- Webhook submission pattern (see Newsletter.tsx)

## Current Development Status

### ✅ Completed (Phase 0)
- Foundation: Next.js 14 + TypeScript + Tailwind setup
- Brand colors corrected and implemented consistently
- Core components: Header, Footer, Hero, ContentBlock, Newsletter
- Pages: Homepage, Features, Pricing, Contact (stub)
- Comprehensive documentation system

### 🔴 Critical Priority - Phase 1
**Assessment Page** (`/app/assessment/page.tsx`) - **BLOCKING ALL CTAs**
- All site navigation and buttons point to `/assessment` but page doesn't exist (404)
- Multi-step form needed: Company info → AWS usage → Contact details
- Primary conversion path for the business
- Estimated 16-20 hours to implement

### 🟡 High Priority - Phase 1-2
- Form system components (Input, Select, Checkbox validation)
- Header dropdown navigation (Solutions, Resources menus)
- Product pages: `/cloudfix`, `/rightspend`, `/querylens`

### 📊 Development Metrics
- **Progress**: 17% complete (4 of 24 pages)
- **Timeline**: 6-8 weeks to launch-ready
- **Total Effort**: ~300-350 hours estimated
- **Current Focus**: Assessment page completion

## Important Implementation Notes

### SEO Configuration
- Basic meta tags implemented in `layout.tsx`
- Missing: robots.txt, sitemap.xml, structured data (see SEO_ANALYSIS_REPORT.md)
- All pages need proper metadata for search optimization

### Image Optimization
- Images hosted on cloudfix.com domain are pre-configured in `next.config.js`
- Use Next.js `<Image>` component for optimization
- Alt text required for accessibility

### Environment Variables
Create `.env.local` for sensitive configuration:
```env
NEXT_PUBLIC_NEWSLETTER_WEBHOOK=your-webhook-url
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-key
```

### Documentation References
Always consult documentation in `/docs/` directory:
- `ROADMAP.md` - Current development phase and task priorities
- `BRAND_CONSISTENCY_AUDIT.md` - Brand color specifications
- `DEPLOYMENT_GUIDE.md` - Vercel deployment steps
- `MIGRATION_GUIDE.md` - WordPress content migration patterns

## Migration Context

This is a WordPress → Next.js migration project. The original site uses:
- PHP/WordPress with ACF flexible content
- Multiple plugins (SEO, forms, optimization)
- Custom post types (resources, podcast, testimonials)

The Next.js version aims to replicate functionality while improving:
- Performance (4x faster page loads)
- Maintenance costs ($0 vs $960-1440/year)
- Development workflow (Git-based vs WordPress admin)

## Key Architectural Decisions

1. **Static Generation**: All pages pre-rendered at build time for performance
2. **Component-Based**: Modular React components for maintainability
3. **Brand Consistency**: Centralized color system in Tailwind config
4. **Documentation-First**: Comprehensive docs for project continuity
5. **Progressive Enhancement**: Core functionality first, polish later

**Next Action**: Build Assessment page (primary conversion path)