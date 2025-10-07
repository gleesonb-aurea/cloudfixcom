# CloudFix Next.js - Complete Site Implementation Plan

**Created**: October 6, 2025
**Last Updated**: October 6, 2025
**Status**: Master Plan - Active Development
**Target Launch**: November 17, 2025 (6 weeks)
**Estimated Total Effort**: 300-350 hours

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites & Environment Setup](#prerequisites--environment-setup)
3. [Development Principles](#development-principles)
4. [Phase 1: Critical Foundations](#phase-1-critical-foundations)
5. [Phase 2: Component Library](#phase-2-component-library)
6. [Phase 3: Product & Company Pages](#phase-3-product--company-pages)
7. [Phase 4: Content Systems](#phase-4-content-systems)
8. [Phase 5: Polish & Optimization](#phase-5-polish--optimization)
9. [Phase 6: Launch Preparation](#phase-6-launch-preparation)
10. [Testing Strategy](#testing-strategy)
11. [Troubleshooting Guide](#troubleshooting-guide)

---

## Project Overview

### What Are We Building?

You are migrating the CloudFix WordPress website (cloudfix.com) to a modern Next.js 14 static site. CloudFix provides AWS cost optimization tools and services. The site has **24 pages total**, and you're starting with **6 pages already complete** (25% done).

### Why This Migration?

- **Performance**: 4x faster page loads with static generation
- **Cost**: $0 vs $960-1440/year (no WordPress hosting/plugins)
- **Maintainability**: Git-based workflow vs WordPress admin
- **Developer Experience**: Modern React/TypeScript stack

### Current Status

**✅ Completed (Phase 0)**:
- Homepage (`/`)
- Features page (`/features`)
- Pricing page (`/pricing`)
- About page (`/about`)
- Assessment page (`/assessment`) - Multi-step form with validation
- Contact page stub (`/contact`)
- Core components: Header, Footer, Hero, ContentBlock, Newsletter
- Brand colors corrected (cyan/blue/yellow)

**🔴 Your Job**: Build the remaining 18 pages + enhance existing infrastructure

---

## Prerequisites & Environment Setup

### Required Knowledge

**Must Know**:
- React fundamentals (components, hooks, state)
- TypeScript basics (types, interfaces)
- HTML/CSS fundamentals
- Git basics (commit, push, pull, branches)

**Will Learn**:
- Next.js 14 App Router (we'll teach you)
- Tailwind CSS utility classes (we'll provide examples)
- React Hook Form + Zod validation (copy existing patterns)
- CloudFix business domain (explained in each task)

### Tech Stack Overview

```
Framework:    Next.js 14 (App Router, NOT Pages Router)
Language:     TypeScript
Styling:      Tailwind CSS
Forms:        React Hook Form + Zod validation
UI Library:   Radix UI (accessible components)
Icons:        Lucide React
Testing:      Jest + React Testing Library
Deployment:   Vercel
```

### Local Development Setup

**Step 1: Verify Node.js**
```bash
node --version  # Should be 18.x or 20.x
npm --version   # Should be 9.x or 10.x
```

**Step 2: Install Dependencies**
```bash
cd /mnt/c/Users/bill/Studio/cloudfixcom/cloudfix-nextjs
npm install
```

**Step 3: Start Development Server**
```bash
npm run dev
# Open http://localhost:3000 in browser
```

**Step 4: Verify Build Works**
```bash
npm run build
# Should complete without errors
```

### Project Structure You'll Work With

```
cloudfix-nextjs/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx             # Root layout (Header/Footer)
│   ├── page.tsx               # Homepage (/)
│   ├── globals.css            # Global styles
│   ├── features/page.tsx      # /features page
│   ├── pricing/page.tsx       # /pricing page
│   └── [new-page]/page.tsx    # You'll create these
│
├── components/                 # Reusable React components
│   ├── Header.tsx             # Navigation (you'll enhance)
│   ├── Footer.tsx             # Footer with schema
│   ├── Hero.tsx               # Hero sections
│   ├── ContentBlock.tsx       # Multi-column layouts
│   ├── Newsletter.tsx         # Newsletter signup
│   ├── ui/                    # Form components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── ...
│   └── assessment/            # Assessment form components
│
├── lib/                       # Utility functions
│   ├── utils.ts              # Helper functions
│   └── validations/          # Zod schemas
│
├── docs/                      # Documentation (READ THESE)
│   ├── ROADMAP.md            # Overall project roadmap
│   ├── BRAND_CONSISTENCY_AUDIT.md  # Color guidelines
│   ├── MIGRATION_GUIDE.md    # Content migration patterns
│   └── plans/                # Implementation plans
│
├── public/                    # Static assets
│   └── images/               # Images (logos, icons)
│
├── tailwind.config.ts        # Tailwind configuration
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript configuration
```

### Essential Files to Understand

**MUST READ before starting**:

1. **`CLAUDE.md`** (root) - Project rules and guidelines
2. **`docs/BRAND_CONSISTENCY_AUDIT.md`** - Brand colors (CRITICAL)
3. **`docs/ROADMAP.md`** - Project phases and progress
4. **`docs/MIGRATION_GUIDE.md`** - Content patterns
5. **`tailwind.config.ts`** - Brand color definitions

### Brand Colors (MEMORIZE THESE)

```typescript
// From tailwind.config.ts
primary:      '#00BCD4'  // Cyan - Main brand color
primary-light: '#4DD0E1'  // Light cyan
primary-dark:  '#0097A7'  // Dark cyan

secondary:     '#0088CC'  // Blue - Secondary brand
secondary-light: '#33A3D9'
secondary-dark:  '#006699'

accent:        '#fecd00'  // Yellow - CTA buttons
accent-dark:   '#e5b800'  // Dark yellow

// NEVER use purple colors - those were wrong
```

**Usage**:
- `bg-primary` = cyan background
- `text-primary` = cyan text
- `hover:bg-primary-dark` = darker cyan on hover
- `bg-accent` = yellow (for CTAs)

---

## Development Principles

### Core Rules (From CLAUDE.md)

**1. YAGNI (You Aren't Gonna Need It)**
- Don't add features we don't need right now
- Build only what's in the task description
- If you think "we might need X later" - stop, you don't need it

**2. DRY (Don't Repeat Yourself)**
- Copy existing patterns from the codebase
- If you write the same code twice, extract a component
- Look for similar components before creating new ones

**3. KISS (Keep It Simple, Stupid)**
- Simple > Clever
- Readable > Concise
- Maintainable > Performance (unless performance is the task)

**4. TDD (Test-Driven Development)**

**For EVERY feature or bug fix**:
```
1. Write a failing test that validates the desired functionality
2. Run the test to confirm it fails as expected
3. Write ONLY enough code to make the test pass
4. Run the test to confirm success
5. Refactor if needed while keeping tests green
```

Example:
```tsx
// ❌ WRONG: Write code first, test later
function addNumbers(a, b) { return a + b; }
test('adds numbers', () => expect(addNumbers(2,3)).toBe(5))

// ✅ RIGHT: Write test first
test('adds numbers', () => expect(addNumbers(2,3)).toBe(5))  // FAILS
function addNumbers(a, b) { return a + b; }  // Now write code
// Test passes ✓
```

### Git Commit Strategy

**Commit frequency**: After completing each bite-sized task (every 1-2 hours)

**Commit message format**:
```
<type>: <short summary in imperative mood>

<optional body explaining WHY, not WHAT>

Examples:
✅ GOOD:
feat: add Products dropdown to navigation

- Displays CloudFix, RightSpend, QueryLens, PromptLens
- Click-to-toggle with single-action switching
- Includes product descriptions for clarity

✅ GOOD:
fix: correct brand colors in hero section

Purple replaced with cyan/blue per brand guidelines.
Refs: docs/BRAND_CONSISTENCY_AUDIT.md

❌ BAD:
update header  # Too vague, not imperative

❌ BAD:
feat: added dropdown menu with products and stuff  # Past tense, unclear
```

**Commit types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code restructure without behavior change
- `test:` - Adding/updating tests
- `docs:` - Documentation changes
- `style:` - Formatting, whitespace (no code change)
- `chore:` - Build config, dependencies

**Before every commit**:
```bash
npm run lint    # Must pass
npm run build   # Must succeed
npm test        # Must pass
```

### File Naming Conventions

```
Components:      PascalCase     Header.tsx, ContentBlock.tsx
Pages:          lowercase      page.tsx, layout.tsx
Utilities:      camelCase      utils.ts, validators.ts
Types:          PascalCase     types.ts (export type UserData)
Constants:      UPPER_SNAKE    PRODUCTS, API_ROUTES
```

### Code Style Guidelines

**TypeScript**:
```tsx
// ✅ DO: Explicit types for component props
interface HeroProps {
  title: string;
  subtitle?: string;  // Optional with ?
  ctaText: string;
}

export function Hero({ title, subtitle, ctaText }: HeroProps) {
  // ...
}

// ❌ DON'T: Implicit any
export function Hero({ title, subtitle, ctaText }) {  // No types!
```

**React**:
```tsx
// ✅ DO: Functional components with hooks
export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  return <div>{isOpen && <p>Open!</p>}</div>;
}

// ❌ DON'T: Class components (old pattern)
class MyComponent extends React.Component {  // Don't use classes
```

**Tailwind CSS**:
```tsx
// ✅ DO: Utility classes, mobile-first
<div className="px-4 py-8 md:px-6 lg:px-8 bg-primary text-white">

// ❌ DON'T: Inline styles or custom CSS
<div style={{padding: '32px', backgroundColor: '#00BCD4'}}>  // Don't do this
```

---

## Phase 1: Critical Foundations

**Status**: 80% Complete (Header Enhancement remaining)
**Priority**: 🔴 CRITICAL - Blocks Launch
**Estimated Remaining Effort**: 12-14 hours
**Target Completion**: October 13, 2025

### What's Already Done

✅ **Environment Setup**: `.env.example` created
✅ **Form System**: All UI components built (Input, Select, Checkbox, Button, Form)
✅ **Assessment Page**: Complete multi-step form with validation

### Task 1.1: Environment Configuration (CRITICAL)

**⏱️ Estimated Time**: 30 minutes
**🎯 Goal**: Create `.env.local` file with environment variables for webhooks and APIs

**Context**: The Assessment form and Newsletter need webhook URLs to submit data. Analytics need tracking IDs. These are sensitive values that shouldn't be committed to git.

**Files to Create**:
- `.env.local` (root directory)

**Files to Modify**:
- None (just copy `.env.example`)

**Implementation Steps**:

**Step 1**: Copy the example file
```bash
cp .env.example .env.local
```

**Step 2**: Open `.env.local` and replace placeholders

**What each variable does**:
```bash
# Used in app/sitemap.ts and robots.ts
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Local dev URL

# Used in lib/assessment-api.ts (line 14)
# Zapier, Make.com, or custom webhook that receives form data
NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_HOOK

# Used in components/Newsletter.tsx (line 42)
# Same webhook provider, different endpoint
NEXT_PUBLIC_NEWSLETTER_WEBHOOK=https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_HOOK

# Used in app/layout.tsx for analytics tracking
# Get from Google Analytics 4 dashboard
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Step 3**: Verify `.env.local` is in `.gitignore`
```bash
cat .gitignore | grep .env.local
# Should output: .env.local
# If not, add it:
echo ".env.local" >> .gitignore
```

**Testing**:

```bash
# Test 1: Verify env vars load
npm run dev
# Open browser console, type: console.log(process.env.NEXT_PUBLIC_SITE_URL)
# Should show your URL (NOT "undefined")

# Test 2: Build succeeds
npm run build
# Should complete without errors

# Test 3: Assessment form uses webhook
# Fill out assessment form completely
# Check webhook dashboard (Zapier/Make.com) for received data
```

**Troubleshooting**:

```
Problem: "process.env.NEXT_PUBLIC_X is undefined"
Solution:
1. Env vars MUST start with NEXT_PUBLIC_ to be available in browser
2. Restart dev server after changing .env.local
3. Clear .next folder: rm -rf .next && npm run dev

Problem: "Assessment submission fails"
Solution:
1. Check webhook URL is correct (test with curl)
2. Check browser Network tab for failed requests
3. Check webhook dashboard for errors
```

**Acceptance Criteria**:
- [ ] `.env.local` file exists
- [ ] Contains all 4 environment variables
- [ ] `.env.local` is in `.gitignore`
- [ ] Dev server starts without errors
- [ ] Assessment form submits successfully to webhook
- [ ] Build completes successfully

**Commit Message**:
```
chore: configure environment variables

- Create .env.local with webhook URLs and analytics ID
- Verify .gitignore excludes .env.local
- Test assessment and newsletter webhooks
```

**Documentation to Read**:
- `.env.example` - Variable descriptions
- `docs/DEPLOYMENT_GUIDE.md` - Environment setup section

---

### Task 1.2: Header Dropdown Navigation (HIGH PRIORITY)

**⏱️ Estimated Time**: 10-12 hours
**🎯 Goal**: Replace flat navigation with dropdown menus for Products and Resources

**Context**: Users can't discover our 4 products (CloudFix, RightSpend, QueryLens, PromptLens) because they're not in navigation. This is a critical discoverability problem.

**IMPORTANT**: A detailed implementation plan already exists:
👉 **READ THIS FIRST**: `docs/plans/HEADER_DROPDOWN_IMPLEMENTATION_PLAN.md`

That plan contains:
- Complete code examples
- Tailwind class specifications
- Testing checklists
- Commit message templates
- Troubleshooting guide

**Quick Summary**:

1. Add dropdown state management to Header.tsx
2. Build Products dropdown (4 products with descriptions)
3. Build Resources dropdown (Blog, Podcast, Case Studies, Docs)
4. Implement click-outside-to-close
5. Add keyboard navigation (Tab, Enter, Escape)
6. Build mobile accordion version
7. Test desktop and mobile interactions

**Follow the detailed plan in `HEADER_DROPDOWN_IMPLEMENTATION_PLAN.md`**.

**Acceptance Criteria**:
- [ ] Products dropdown shows 4 products with descriptions
- [ ] Resources dropdown shows 4 items
- [ ] Click-to-toggle works on desktop
- [ ] Keyboard navigation works (Tab, Escape)
- [ ] Mobile accordion animates smoothly
- [ ] Active page indicator works
- [ ] All tests pass

---

## Phase 2: Component Library

**Status**: Not Started
**Priority**: 🟡 HIGH
**Estimated Effort**: 50-60 hours
**Dependencies**: Phase 1 complete
**Target Completion**: October 20, 2025

### Overview

Phase 2 builds reusable interactive components needed across multiple pages. These components will be used in Phase 3 (product pages) and Phase 4 (content pages).

**Strategy**: Build simple, accessible components. Don't over-engineer. Copy patterns from existing codebase.

---

### Task 2.1: Carousel/Slider Component

**⏱️ Estimated Time**: 8 hours
**🎯 Goal**: Build a testimonial/logo carousel for reuse across pages

**Context**: Product pages and homepage need to display customer testimonials and company logos in a rotating carousel. This is a common SaaS website pattern.

**What You're Building**:
- Auto-rotating carousel (3 second intervals)
- Manual navigation (prev/next arrows)
- Dot indicators showing current slide
- Touch/swipe support for mobile
- Pause on hover
- Accessible keyboard navigation

**Files to Create**:
- `components/Carousel.tsx` - Main carousel component
- `components/CarouselItem.tsx` - Individual slide wrapper
- `__tests__/Carousel.test.tsx` - Test file

**Dependencies**:
```bash
# No new dependencies needed
# Uses CSS transforms and React state
```

**Implementation (TDD Approach)**:

**Step 1: Write Failing Tests** (1 hour)

```tsx
// __tests__/Carousel.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Carousel, CarouselItem } from '@/components/Carousel';

describe('Carousel', () => {
  test('renders all carousel items', () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </Carousel>
    );

    // Only first slide should be visible initially
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  test('navigates to next slide on button click', () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    );

    const nextButton = screen.getByLabelText('Next slide');
    fireEvent.click(nextButton);

    expect(screen.getByText('Slide 2')).toBeVisible();
  });

  test('navigates to previous slide', () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    );

    const nextButton = screen.getByLabelText('Next slide');
    const prevButton = screen.getByLabelText('Previous slide');

    fireEvent.click(nextButton); // Go to slide 2
    fireEvent.click(prevButton); // Back to slide 1

    expect(screen.getByText('Slide 1')).toBeVisible();
  });

  test('wraps to first slide from last slide', () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    );

    const nextButton = screen.getByLabelText('Next slide');

    fireEvent.click(nextButton); // Slide 2
    fireEvent.click(nextButton); // Should wrap to Slide 1

    expect(screen.getByText('Slide 1')).toBeVisible();
  });

  test('auto-rotates every 3 seconds', async () => {
    jest.useFakeTimers();

    render(
      <Carousel autoPlay interval={3000}>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    );

    expect(screen.getByText('Slide 1')).toBeVisible();

    // Fast-forward 3 seconds
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.getByText('Slide 2')).toBeVisible();
    });

    jest.useRealTimers();
  });

  test('pauses auto-play on hover', () => {
    jest.useFakeTimers();

    render(
      <Carousel autoPlay interval={3000}>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    );

    const carousel = screen.getByRole('region');
    fireEvent.mouseEnter(carousel);

    // Auto-play should be paused
    jest.advanceTimersByTime(5000);
    expect(screen.getByText('Slide 1')).toBeVisible();

    jest.useRealTimers();
  });

  test('updates dot indicator on slide change', () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    );

    const dots = screen.getAllByRole('button', { name: /go to slide/i });
    expect(dots[0]).toHaveClass('active'); // First dot active

    fireEvent.click(screen.getByLabelText('Next slide'));

    expect(dots[1]).toHaveClass('active'); // Second dot active
  });

  test('navigates by clicking dot indicators', () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </Carousel>
    );

    const dot3 = screen.getByLabelText('Go to slide 3');
    fireEvent.click(dot3);

    expect(screen.getByText('Slide 3')).toBeVisible();
  });
});
```

**Run tests** (should fail):
```bash
npm test -- Carousel.test.tsx
# All tests should FAIL because component doesn't exist yet
```

**Step 2: Create Basic Component Structure** (1 hour)

```tsx
// components/Carousel.tsx
'use client';

import { useState, useEffect, useRef, Children, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function Carousel({
  children,
  autoPlay = false,
  interval = 3000,
  className = '',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slidesArray = Children.toArray(children);
  const totalSlides = slidesArray.length;

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      role="region"
      aria-label="Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slidesArray.map((slide, index) => (
          <div
            key={index}
            className="min-w-full"
            aria-hidden={index !== currentIndex}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slidesArray.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-primary active'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Simple wrapper component for carousel items
export function CarouselItem({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}
```

**Run tests** (should pass now):
```bash
npm test -- Carousel.test.tsx
# All tests should PASS ✓
```

**Step 3: Add Touch/Swipe Support** (2 hours)

```tsx
// Add to Carousel component
export function Carousel({ children, autoPlay, interval, className }: CarouselProps) {
  // ... existing state ...
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // pixels

    if (swipeDistance > minSwipeDistance) {
      goToNext();
    } else if (swipeDistance < -minSwipeDistance) {
      goToPrevious();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      role="region"
      aria-label="Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ... rest of JSX ... */}
    </div>
  );
}
```

**Add touch tests**:
```tsx
// __tests__/Carousel.test.tsx
test('swipes to next slide on touch', () => {
  render(
    <Carousel>
      <CarouselItem>Slide 1</CarouselItem>
      <CarouselItem>Slide 2</CarouselItem>
    </Carousel>
  );

  const carousel = screen.getByRole('region');

  // Simulate swipe left (next)
  fireEvent.touchStart(carousel, { touches: [{ clientX: 200 }] });
  fireEvent.touchMove(carousel, { touches: [{ clientX: 100 }] });
  fireEvent.touchEnd(carousel);

  expect(screen.getByText('Slide 2')).toBeVisible();
});
```

**Step 4: Add Keyboard Navigation** (1 hour)

```tsx
// Add keyboard handler
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    goToPrevious();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    goToNext();
  }
};

return (
  <div
    // ... existing props ...
    onKeyDown={handleKeyDown}
    tabIndex={0}
  >
```

**Step 5: Create Usage Example** (30 minutes)

```tsx
// Example usage for product pages
<Carousel autoPlay interval={5000} className="h-96 bg-gray-100">
  <CarouselItem>
    <div className="h-full flex items-center justify-center">
      <img src="/logos/company1.png" alt="Company 1" className="h-20" />
    </div>
  </CarouselItem>
  <CarouselItem>
    <div className="h-full flex items-center justify-center">
      <img src="/logos/company2.png" alt="Company 2" className="h-20" />
    </div>
  </CarouselItem>
</Carousel>
```

**Step 6: Manual Testing** (30 minutes)

Create test page: `app/test-carousel/page.tsx`
```tsx
import { Carousel, CarouselItem } from '@/components/Carousel';

export default function TestCarouselPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Carousel Test Page</h1>

      <section>
        <h2 className="text-xl font-bold mb-4">Auto-play Carousel</h2>
        <Carousel autoPlay interval={3000} className="h-64 bg-gray-100">
          <CarouselItem>
            <div className="h-full flex items-center justify-center text-2xl">
              Slide 1
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-full flex items-center justify-center text-2xl">
              Slide 2
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-full flex items-center justify-center text-2xl">
              Slide 3
            </div>
          </CarouselItem>
        </Carousel>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Manual Navigation Only</h2>
        <Carousel className="h-64 bg-gray-100">
          <CarouselItem>
            <div className="h-full flex items-center justify-center">
              <img src="/images/bcg.png" alt="BCG" className="h-20" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-full flex items-center justify-center">
              <img src="/images/mastercard.png" alt="Mastercard" className="h-20" />
            </div>
          </CarouselItem>
        </Carousel>
      </section>
    </div>
  );
}
```

**Testing checklist**:
```bash
# Start dev server
npm run dev

# Open http://localhost:3000/test-carousel

# Desktop tests:
□ Auto-play carousel rotates every 3 seconds
□ Hover pauses auto-play
□ Mouse leave resumes auto-play
□ Clicking next arrow advances slide
□ Clicking prev arrow goes back
□ Clicking dots jumps to specific slide
□ Arrow keys (←→) navigate slides
□ Wraps from last to first slide
□ Wraps from first to last slide

# Mobile tests (use browser DevTools device mode):
□ Swipe left goes to next slide
□ Swipe right goes to previous slide
□ Touch controls work smoothly
□ No accidental navigation on small swipes

# Accessibility tests:
□ Keyboard Tab focuses carousel
□ Arrow keys work when focused
□ Screen reader announces current slide
□ ARIA labels present on all buttons
```

**Step 7: Commit Your Work**

```bash
# Run tests
npm test -- Carousel.test.tsx  # Should pass ✓

# Lint
npm run lint  # Should pass ✓

# Build
npm run build  # Should succeed ✓

# Commit
git add components/Carousel.tsx components/CarouselItem.tsx __tests__/Carousel.test.tsx
git commit -m "feat: add Carousel component with touch and keyboard support

- Auto-play with configurable interval
- Manual navigation (arrows, dots, keyboard)
- Touch/swipe support for mobile
- Pause on hover
- Accessible with ARIA labels
- Comprehensive test coverage"
```

**Acceptance Criteria**:
- [ ] All tests pass (12+ tests)
- [ ] Manual testing checklist complete
- [ ] Touch gestures work on mobile
- [ ] Keyboard navigation functional
- [ ] Auto-play can be enabled/disabled
- [ ] Pause on hover works
- [ ] ARIA labels present
- [ ] Build succeeds without errors

**Documentation to Read**:
- React Testing Library docs: https://testing-library.com/docs/react-testing-library/intro/
- Jest timer mocks: https://jestjs.io/docs/timer-mocks

**Common Issues & Solutions**:

```
Problem: "Tests fail with 'act' warnings"
Solution: Wrap state updates in act():
import { act } from '@testing-library/react';
act(() => {
  jest.advanceTimersByTime(3000);
});

Problem: "Carousel jumps/stutters during transition"
Solution: Ensure transition-transform is applied:
className="flex transition-transform duration-500 ease-out"

Problem: "Touch events don't work"
Solution: Check touch event handlers are on correct element (container, not slides)

Problem: "Auto-play doesn't pause on hover"
Solution: Verify isPaused state is updating and useEffect dependencies are correct
```

---

*[Continue with remaining Phase 2 tasks: Modal, Tabs, Accordion, Timeline, Animation hooks...]*

---

## Testing Strategy

### Test-Driven Development (TDD) Process

**For EVERY component/feature, follow this exact process:**

**1. Write Failing Tests First**
```tsx
// Write test describing desired behavior
test('button should be disabled when loading', () => {
  render(<Button loading>Click me</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});

// Run test - it MUST fail
npm test  // ❌ FAILS - component doesn't exist or behavior not implemented
```

**2. Write Minimum Code to Pass**
```tsx
// Now implement just enough to pass
export function Button({ loading, children }: ButtonProps) {
  return <button disabled={loading}>{children}</button>;
}

// Run test again
npm test  // ✅ PASSES
```

**3. Refactor While Keeping Tests Green**
```tsx
// Improve code quality, add TypeScript types, etc.
interface ButtonProps {
  loading?: boolean;
  children: ReactNode;
}

export function Button({ loading = false, children }: ButtonProps) {
  return (
    <button
      disabled={loading}
      className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
    >
      {children}
    </button>
  );
}

// Tests still pass ✅
npm test
```

### Test Structure Template

**Use this template for all component tests:**

```tsx
// __tests__/ComponentName.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComponentName } from '@/components/ComponentName';

describe('ComponentName', () => {
  // 1. Rendering tests
  describe('rendering', () => {
    test('renders with required props', () => {
      render(<ComponentName requiredProp="value" />);
      expect(screen.getByText('value')).toBeInTheDocument();
    });

    test('renders with optional props', () => {
      render(<ComponentName requiredProp="value" optionalProp="extra" />);
      expect(screen.getByText('extra')).toBeInTheDocument();
    });
  });

  // 2. Interaction tests
  describe('interactions', () => {
    test('handles click events', () => {
      const handleClick = jest.fn();
      render(<ComponentName onClick={handleClick} />);

      fireEvent.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // 3. State management tests
  describe('state management', () => {
    test('updates state on user action', () => {
      render(<ComponentName />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'new value' } });

      expect(input).toHaveValue('new value');
    });
  });

  // 4. Accessibility tests
  describe('accessibility', () => {
    test('has correct ARIA labels', () => {
      render(<ComponentName />);
      expect(screen.getByLabelText('Expected label')).toBeInTheDocument();
    });

    test('supports keyboard navigation', () => {
      render(<ComponentName />);
      const element = screen.getByRole('button');

      element.focus();
      fireEvent.keyDown(element, { key: 'Enter' });

      expect(element).toHaveFocus();
    });
  });

  // 5. Error/edge case tests
  describe('edge cases', () => {
    test('handles empty data gracefully', () => {
      render(<ComponentName items={[]} />);
      expect(screen.getByText('No items')).toBeInTheDocument();
    });

    test('handles null/undefined props', () => {
      render(<ComponentName optionalProp={null} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- ComponentName.test.tsx

# Run tests in watch mode (re-runs on file changes)
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run tests matching a pattern
npm test -- --testNamePattern="handles click"
```

### Test Coverage Goals

**Minimum acceptable coverage:**
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

**Check coverage:**
```bash
npm test -- --coverage
# Generates coverage report in terminal
# Detailed HTML report in coverage/lcov-report/index.html
```

### Common Testing Patterns

**Pattern 1: Testing Async Behavior**
```tsx
test('loads data asynchronously', async () => {
  render(<DataComponent />);

  // Wait for loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

**Pattern 2: Testing Form Submission**
```tsx
test('submits form with valid data', async () => {
  const handleSubmit = jest.fn();
  render(<FormComponent onSubmit={handleSubmit} />);

  // Fill form
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@example.com' }
  });

  // Submit
  fireEvent.click(screen.getByText('Submit'));

  // Verify submission
  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com'
    });
  });
});
```

**Pattern 3: Testing Error States**
```tsx
test('displays error message on validation failure', async () => {
  render(<FormComponent />);

  // Submit without filling required field
  fireEvent.click(screen.getByText('Submit'));

  // Check for error message
  await waitFor(() => {
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});
```

**Pattern 4: Testing Component State**
```tsx
test('toggles visibility on button click', () => {
  render(<ToggleComponent />);

  // Initially hidden
  expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();

  // Click toggle
  fireEvent.click(screen.getByText('Toggle'));

  // Now visible
  expect(screen.getByText('Hidden content')).toBeInTheDocument();
});
```

---

## Troubleshooting Guide

### Build Errors

**Error: "Module not found"**
```
Solution:
1. Check import path is correct (use @/ for absolute imports)
2. Verify file exists at that path
3. Check file extension (.tsx vs .ts)
4. Restart TypeScript server in VSCode (Cmd+Shift+P → "Restart TS Server")
```

**Error: "Type 'X' is not assignable to type 'Y'"**
```
Solution:
1. Check TypeScript types match
2. Use type assertion if you know better than TS: value as ExpectedType
3. Make prop optional with ?: if it's not always present
4. Check component props interface matches usage
```

**Error: "Cannot find name 'process'"**
```
Solution:
Environment variables aren't loading. Check:
1. .env.local exists
2. Variables start with NEXT_PUBLIC_
3. Dev server restarted after adding variables
4. Import from next/server for server-side env vars
```

### Test Failures

**Error: "Unable to find element"**
```
Solution:
1. Use screen.debug() to see rendered output
2. Check role/text/label is correct
3. Use screen.getByRole() over getByText() when possible
4. Wait for async content with waitFor()
```

**Error: "Test timeout exceeded"**
```
Solution:
1. Check for infinite loops in useEffect
2. Use waitFor() with explicit timeout: waitFor(() => {...}, { timeout: 5000 })
3. Mock async operations if they're slow
4. Clear timers with jest.useRealTimers() after test
```

**Error: "'act' warning in test"**
```
Solution:
Wrap state updates in act():
import { act } from '@testing-library/react';

act(() => {
  // state update code
});
```

### Runtime Errors

**Error: "Hydration failed"**
```
Solution:
Server and client HTML don't match. Check:
1. No conditional rendering based on browser APIs
2. No Date.now() or Math.random() in render
3. Use useEffect for client-only code
4. Add 'use client' directive if using hooks
```

**Error: "Cannot read property 'X' of undefined"**
```
Solution:
1. Add optional chaining: object?.property
2. Add default values: const { prop = 'default' } = props
3. Add null checks: if (object) { object.property }
4. Use TypeScript to catch these at compile time
```

**Error: "Maximum update depth exceeded"**
```
Solution:
Infinite loop in useState/useEffect. Check:
1. useEffect dependencies are correct
2. setState not called directly in render
3. No setState in useEffect without dependencies
```

### Styling Issues

**Problem: "Tailwind classes not working"**
```
Solution:
1. Check class name has no typos
2. Verify tailwind.config.ts includes the file path
3. Restart dev server
4. Check for conflicting CSS
5. Use arbitrary values: w-[123px] if standard class missing
```

**Problem: "Mobile styles not applying"**
```
Solution:
1. Tailwind is mobile-first: base styles apply to mobile
2. Use md: prefix for tablet, lg: for desktop
3. Test in browser DevTools device mode
4. Check viewport meta tag in layout.tsx
```

**Problem: "Custom brand colors not working"**
```
Solution:
1. Check tailwind.config.ts defines colors
2. Use correct syntax: bg-primary (not bg-primary-500)
3. Restart dev server after changing config
4. Use theme() in arbitrary values: bg-[theme(colors.primary)]
```

### Git Issues

**Problem: "Merge conflict"**
```
Solution:
1. Open conflicted file
2. Look for <<<<<<< markers
3. Keep correct version, remove markers
4. Test that code works
5. git add <file> && git commit
```

**Problem: "Accidentally committed .env.local"**
```
Solution:
1. Remove from git: git rm --cached .env.local
2. Add to .gitignore: echo ".env.local" >> .gitignore
3. Commit: git commit -m "chore: remove .env.local from git"
4. Rotate all secrets (they're now public!)
```

**Problem: "Need to undo last commit"**
```
Solution:
# Keep changes, undo commit:
git reset --soft HEAD~1

# Discard changes, undo commit (CAREFUL!):
git reset --hard HEAD~1

# Already pushed? Create new commit that reverses changes:
git revert HEAD
```

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run lint            # Run linter
npm test                # Run tests

# Git
git status              # Check status
git add <file>          # Stage file
git commit -m "msg"     # Commit with message
git push                # Push to remote

# Common shortcuts
npm run dev &           # Run dev server in background
Ctrl+C                  # Stop running process
clear                   # Clear terminal
```

### File Path Shortcuts

```tsx
// Absolute imports (use these)
import { Component } from '@/components/Component';
import { util } from '@/lib/utils';

// Relative imports (avoid for deep nesting)
import { Component } from '../../../components/Component';  // Hard to maintain
```

### Tailwind CSS Cheat Sheet

```tsx
// Layout
flex, grid, block, inline, hidden

// Spacing (4px = 1 unit)
p-4 (padding: 16px)
px-4 (padding-left & right: 16px)
py-4 (padding-top & bottom: 16px)
m-4 (margin: 16px)
gap-4 (gap: 16px)

// Sizing
w-full (width: 100%)
h-screen (height: 100vh)
max-w-4xl (max-width: 56rem)

// Colors (CloudFix brand)
bg-primary (cyan background)
text-white (white text)
border-gray-200 (light gray border)

// Typography
text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl
font-normal, font-medium, font-semibold, font-bold

// Responsive
sm:text-lg (tablet and up)
md:flex (laptop and up)
lg:px-8 (desktop and up)

// States
hover:bg-primary-dark
focus:ring-2
disabled:opacity-50
```

### React Hooks Cheat Sheet

```tsx
// State
const [count, setCount] = useState(0);
setCount(1);  // Set to value
setCount(prev => prev + 1);  // Update based on previous

// Effect (side effects, API calls, subscriptions)
useEffect(() => {
  // Runs after every render
}, [dependencies]);  // Only re-run if dependencies change

// Ref (DOM access, mutable value that doesn't cause re-render)
const ref = useRef<HTMLDivElement>(null);
ref.current?.focus();

// Memo (expensive calculations)
const value = useMemo(() => expensiveCalculation(a, b), [a, b]);

// Callback (stable function reference)
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```

### TypeScript Cheat Sheet

```tsx
// Basic types
string, number, boolean, null, undefined

// Arrays
string[], Array<string>, number[]

// Objects
interface User {
  name: string;
  age: number;
  email?: string;  // Optional
}

// Function types
type OnClick = (event: MouseEvent) => void;

// Union types (either/or)
type Status = 'loading' | 'success' | 'error';

// Generic types
interface Box<T> {
  value: T;
}
const stringBox: Box<string> = { value: 'hello' };

// Type assertion
const value = something as SomeType;

// Utility types
Partial<User>  // All properties optional
Required<User>  // All properties required
Pick<User, 'name' | 'email'>  // Only name and email
Omit<User, 'age'>  // Everything except age
```

---

## Contact & Support

**Questions about**:
- **Business logic**: Ask Bill (what should feature do?)
- **Technical decisions**: Check CLAUDE.md and existing code first
- **Build errors**: Check Troubleshooting Guide above
- **Test failures**: Read error message carefully, check test examples

**Before asking for help**:
1. Read the error message completely
2. Check Troubleshooting Guide
3. Search codebase for similar patterns
4. Try ChatGPT/Claude with error message
5. Check relevant documentation

**When asking for help, provide**:
1. Exact error message
2. Code you're working on
3. What you've already tried
4. Expected vs actual behavior

---

## Document Status

**Last Updated**: October 6, 2025
**Maintained By**: Development Team
**Next Review**: October 13, 2025

**Changelog**:
- Oct 6, 2025: Initial master plan created
- Oct 6, 2025: Added Phase 1 and Phase 2 (Carousel component) detailed tasks

**TODO for this document**:
- [ ] Complete Phase 2 remaining components (Modal, Tabs, Accordion, etc.)
- [ ] Add Phase 3: Product & Company Pages
- [ ] Add Phase 4: Content Systems (Blog, MDX)
- [ ] Add Phase 5: Polish & Optimization
- [ ] Add Phase 6: Launch Checklist

---

*This is a living document. Update it as we learn and discover better patterns.*
