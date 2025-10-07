# Phase 5: Polish & Optimization Implementation Plan

**Created**: October 7, 2025
**Status**: Ready for Implementation
**Priority**: 🔴 CRITICAL (Phase 4 Complete - Launch Preparation)
**Estimated Effort**: 40-50 hours
**Complexity**: High

---

## 🎯 Implementation Goals

Transform the functional CloudFix Next.js site into a production-ready, high-performance web application. This phase focuses on performance optimization, SEO enhancement, accessibility compliance, and comprehensive testing to ensure the site meets enterprise-grade standards.

**Key Focus Areas:**
1. **Performance Optimization** - Bundle analysis, image optimization, lazy loading
2. **SEO Enhancement** - Social sharing, structured data, search visibility
3. **Accessibility Audit** - WCAG 2.1 AA compliance, keyboard navigation
4. **Testing & QA** - Cross-browser testing, Lighthouse audits, mobile testing

---

## 📋 Current State Analysis

**Site Completion Status:**
- ✅ Core pages: Homepage, Features, Pricing, Contact
- ✅ Product pages: CloudFix, RightSpend, QueryLens, PromptLens
- ✅ Navigation: Header with dropdowns, mobile responsive
- ✅ Assessment form: Multi-step conversion form
- ✅ Brand consistency: Colors, typography, component patterns

**Performance Baseline:**
- ❌ No bundle analysis performed
- ❌ Images not optimized for WebP/AVIF
- ❌ No lazy loading implementation
- ❌ Fonts not optimized with next/font
- ❌ No caching strategy implemented
- ❌ No error boundaries for resilience

**SEO Status:**
- ❌ No social sharing images
- ❌ Missing sitemap.xml
- ❌ No robots.txt
- ❌ No structured data implementation
- ❌ Limited meta descriptions
- ❌ No Open Graph optimization

**Accessibility Status:**
- ❌ No WCAG compliance audit performed
- ❌ Keyboard navigation not fully tested
- ❌ Color contrast not validated
- ❌ ARIA enhancements missing
- ❌ Form accessibility incomplete

**Testing Status:**
- ❌ No Lighthouse audit performed
- ❌ No cross-browser testing
- ❌ No mobile device testing
- ❌ Form validation testing incomplete
- ❌ No link integrity testing

---

## 🏗️ Target Architecture

### Performance Optimization Stack
```plaintext
Performance Tools:
├── @next/bundle-analyzer (bundle size analysis)
├── next/image (automatic optimization)
├── next/font (font optimization)
├── next/dynamic (lazy loading)
├── SWR/ISR (caching strategies)
├── Service Worker (offline capability)
└── Error Boundaries (error resilience)
```plaintext
### SEO Enhancement Stack
```plaintext
SEO Implementation:
├── next-sitemap (automatic sitemap generation)
├── next-seo (meta tag management)
├── Structured Data (JSON-LD schemas)
├── Social Images (dynamic OG images)
├── Robots.txt (search engine rules)
├── Canonical URLs (duplicate content prevention)
└── Google Rich Results (testing & validation)
```plaintext
### Accessibility Stack
```plaintext
Accessibility Tools:
├── @axe-core/react (automated testing)
├── ESLint-plugin-jsx-a11y (code linting)
├── Keyboard navigation (focus management)
├── ARIA enhancements (screen reader support)
├── Color contrast (WCAG compliance)
└── Form accessibility (validation & errors)
```plaintext
---

## 🔧 Implementation Tasks

### Task 1: Performance Bundle Analysis (4 hours)

**Install and configure bundle analyzer:**

```bash
npm install @next/bundle-analyzer
```plaintext
**Configure next.config.js:**
```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // existing config...

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Experimental features
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
    turbotrace: {
      logLevel: 'error',
    },
  },

  // Bundle optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
});
```plaintext
**Create bundle analysis script:**
```json
// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "analyze:server": "BUNDLE_ANALYZE=server npm run analyze",
    "analyze:browser": "BUNDLE_ANALYZE=browser npm run analyze"
  }
}
```plaintext
**Performance targets:**
- Main bundle: < 100KB gzipped
- Vendor bundle: < 200KB gzipped
- Total JavaScript: < 300KB gzipped
- First Contentful Paint: < 1.5s

**Commit Message:**
```plaintext
perf(optimization): implement bundle analysis and optimization

- Install and configure @next/bundle-analyzer
- Add webpack optimization for bundle splitting
- Create bundle analysis scripts
- Set performance targets for bundle sizes
- Add package imports optimization
```plaintext
---

### Task 2: Image Optimization Implementation (6 hours)

**Upgrade Next.js Image component:**

```tsx
// components/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
```plaintext
**Update existing images:**

```tsx
// Update Hero.tsx
import { OptimizedImage } from './OptimizedImage';

export function Hero({ backgroundImage, ...props }) {
  return (
    <section className="relative min-h-screen">
      <OptimizedImage
        src={backgroundImage}
        alt=""
        fill
        priority
        className="object-cover"
      />
      {/* rest of hero content */}
    </section>
  );
}

// Update FeatureCard.tsx
export function FeatureCard({ icon, title, description, image }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {image && (
        <OptimizedImage
          src={image}
          alt={title}
          width={64}
          height={64}
          className="mb-4 rounded-lg"
        />
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
```plaintext
**Configure image domains:**
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cloudfix.com', 'www.cloudfix.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
  },
};
```plaintext
**Commit Message:**
```plaintext
perf(images): implement comprehensive image optimization

- Create OptimizedImage component with blur placeholders
- Update all existing images to use Next.js Image component
- Configure WebP/AVIF formats and responsive sizes
- Add priority loading for above-the-fold images
- Implement blur data URLs for smooth loading
```plaintext
---

### Task 3: Lazy Loading Implementation (4 hours)

**Create lazy loading components:**

```tsx
// components/LazyComponent.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

interface LazyComponentProps {
  loader: () => Promise<any>;
  fallback?: React.ReactNode;
}

export function LazyComponent({ loader, fallback = <div>Loading...</div> }: LazyComponentProps) {
  const DynamicComponent = dynamic(loader, {
    loading: () => fallback,
    ssr: false,
  });

  return (
    <Suspense fallback={fallback}>
      <DynamicComponent />
    </Suspense>
  );
}
```plaintext
**Lazy load heavy components:**

```tsx
// Lazy load carousel for testimonials
import { LazyComponent } from './LazyComponent';

export function TestimonialCarousel() {
  return (
    <LazyComponent
      loader={() => import('./TestimonialSlider')}
      fallback={
        <div className="grid md:grid-cols-3 gap-8">
          {/* Static fallback testimonials */}
        </div>
      }
    />
  );
}

// Lazy load modal components
export function DemoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <LazyComponent
      loader={() => import('./DemoModalContent')}
      fallback={<div className="fixed inset-0 bg-black bg-opacity-50 z-50" />}
    />
  );
}
```plaintext
**Implement intersection observer for animations:**

```tsx
// hooks/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isIntersecting };
}

// Usage in components
export function AnimatedSection({ children, className = '' }) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isIntersecting
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```plaintext
**Commit Message:**
```plaintext
perf(lazy-loading): implement dynamic imports and intersection observer

- Create LazyComponent wrapper for dynamic imports
- Lazy load heavy components (carousels, modals)
- Implement intersection observer for scroll animations
- Add loading fallbacks for better UX
- Reduce initial bundle size with code splitting
```plaintext
---

### Task 4: Font and Resource Optimization (3 hours)

**Configure next/font:**

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'CloudFix - Automated AWS Cost Optimization',
  description: 'Save up to 40% on your AWS bill with intelligent automation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```plaintext
**Update Tailwind config:**

```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```plaintext
**Implement resource hints:**

```tsx
// components/Head.tsx
import Head from 'next/head';

export function SEOHead({ title, description, image, url }) {
  return (
    <Head>
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//cloudfix.com" />

      {/* Preconnect for critical resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
    </Head>
  );
}
```plaintext
**Commit Message:**
```plaintext
perf(fonts): implement next/font optimization and resource hints

- Configure next/font for optimal font loading
- Add font display swap for better performance
- Implement DNS prefetch and preconnect hints
- Add preload for critical font resources
- Update Tailwind config for font variables
```plaintext
---

### Task 5: Caching Strategy Implementation (3 hours)

**Implement ISR for dynamic content:**

```tsx
// app/resources/page.tsx
import { cache } from 'react';

export const revalidate = 3600; // Revalidate every hour

export async function getResources() {
  const res = await fetch('https://api.cloudfix.com/resources', {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  return res.json();
}

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div>
      {/* Render resources */}
    </div>
  );
}
```plaintext
**Create SWR hooks for client-side caching:**

```tsx
// hooks/useResources.ts
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useResources() {
  const { data, error, isLoading } = useSWR(
    '/api/resources',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000, // 5 minutes
    }
  );

  return {
    resources: data,
    isLoading,
    error,
  };
}
```plaintext
**Service Worker for offline capability:**

```tsx
// public/sw.js
const CACHE_NAME = 'cloudfix-v1';
const urlsToCache = [
  '/',
  '/features',
  '/pricing',
  '/contact',
  '/cloudfix',
  '/rightspend',
  '/querylens',
  '/promptlens',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Register service worker
// app/layout.tsx
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
}, []);
```plaintext
**Commit Message:**
```plaintext
perf(caching): implement ISR, SWR, and service worker

- Add Incremental Static Regeneration for dynamic content
- Implement SWR hooks for client-side caching
- Create service worker for offline capability
- Configure cache strategies for different content types
- Add background sync and cache management
```plaintext
---

### Task 6: Error Boundaries Implementation (2 hours)

**Create error boundary components:**

```tsx
// components/ErrorBoundary.tsx
'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to monitoring service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-8">
              We're sorry, but something unexpected happened.
              Please try refreshing the page or contact support.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```plaintext
**Implement error boundaries for different sections:**

```tsx
// app/layout.tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Header />
          <main>{children}</main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}

// Specific error boundaries for components
export function SafeComponent({ children, fallback = null }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}
```plaintext
**Commit Message:**
```plaintext
perf(errors): implement error boundaries for resilience

- Create ErrorBoundary component with fallback UI
- Add error logging for monitoring
- Implement section-specific error boundaries
- Provide user-friendly error recovery options
- Ensure app stability during runtime errors
```plaintext
---

### Task 7: Social Sharing Images (4 hours)

**Create dynamic OG image generation:**

```tsx
// app/og/route.ts
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get('title') || 'CloudFix';
    const description = searchParams.get('description') || 'Automated AWS Cost Optimization';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00BCD4',
            backgroundImage: 'linear-gradient(135deg, #00BCD4 0%, #0088CC 100%)',
            fontSize: 60,
            fontWeight: 700,
            color: 'white',
          }}
        >
          <div
            style={{
              padding: '60px',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>
              {title}
            </div>
            <div style={{ fontSize: '24px', opacity: 0.9, fontWeight: 400 }}>
              {description}
            </div>
            <div style={{
              marginTop: '40px',
              fontSize: '20px',
              padding: '12px 24px',
              backgroundColor: '#fecd00',
              color: '#333',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              cloudfix.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
```plaintext
**Update metadata for all pages:**

```tsx
// app/[page]/page.tsx template
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | CloudFix',
  description: 'Page description for SEO',
  openGraph: {
    title: 'Page Title | CloudFix',
    description: 'Page description for SEO',
    url: 'https://cloudfix.com/page',
    siteName: 'CloudFix',
    images: [
      {
        url: '/og?title=Page%20Title&description=Page%20description',
        width: 1200,
        height: 630,
        alt: 'Page Title - CloudFix',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title | CloudFix',
    description: 'Page description for SEO',
    images: ['/og?title=Page%20Title&description=Page%20description'],
  },
};
```plaintext
**Create specific OG images for products:**

```tsx
// app/cloudfix/og/route.ts
import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    (
      <div style={{ /* CloudFix specific styling */ }}>
        <div>CloudFix</div>
        <div>Automated AWS Cost Optimization</div>
        <div>Save up to 40% on your AWS bill</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```plaintext
**Commit Message:**
```plaintext
feat(social): implement dynamic OG image generation

- Create dynamic OG image API route with Edge Runtime
- Generate branded social sharing images for all pages
- Add Open Graph and Twitter Card metadata
- Create product-specific social images
- Ensure consistent brand representation in shares
```plaintext
---

### Task 8: Sitemap and Robots.txt (3 hours)

**Install and configure next-sitemap:**

```bash
npm install next-sitemap
```plaintext
**Create sitemap configuration:**

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://cloudfix.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 1.0,
  sitemapSize: 5000,
  exclude: ['/admin', '/api'],
  transform: async (config, path) => {
    // Custom priority for different pages
    if (path === '/') return { loc: path, priority: 1.0, changefreq: 'daily' };
    if (path.includes('/cloudfix')) return { loc: path, priority: 0.9, changefreq: 'weekly' };
    if (path.includes('/assessment')) return { loc: path, priority: 0.8, changefreq: 'monthly' };
    return { loc: path, priority: 0.7, changefreq: 'weekly' };
  },
  additionalPaths: async (config) => {
    // Dynamic paths for blog posts, resources, etc.
    const results = [];

    // Add product pages
    const products = ['cloudfix', 'rightspend', 'querylens', 'promptlens'];
    for (const product of products) {
      results.push({
        loc: `/${product}`,
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString(),
      });
    }

    return results;
  },
};
```plaintext
**Update package.json:**
```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```plaintext
**Custom robots.txt:**
```javascript
// next-sitemap.config.js (continued)
module.exports = {
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/_next/static'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
    ],
    additionalSitemaps: [
      'https://cloudfix.com/sitemap.xml',
    ],
  },
};
```plaintext
**Commit Message:**
```plaintext
feat(seo): implement sitemap.xml and robots.txt generation

- Install and configure next-sitemap
- Create dynamic sitemap with custom priorities
- Generate comprehensive robots.txt with policies
- Add automated sitemap generation on build
- Include all pages and dynamic routes in sitemap
```plaintext
---

### Task 9: Structured Data Implementation (5 hours)

**Create structured data components:**

```tsx
// components/StructuredData.tsx
interface StructuredDataProps {
  type: string;
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
```plaintext
**Organization schema:**

```tsx
// app/layout.tsx
import { StructuredData } from '@/components/StructuredData';

export default function RootLayout({ children }) {
  const organizationSchema = {
    name: 'CloudFix',
    url: 'https://cloudfix.com',
    logo: 'https://cloudfix.com/logo.png',
    description: 'Automated AWS cost optimization platform',
    address: {
      streetAddress: '123 Main St',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
    contactPoint: {
      telephone: '+1-555-CLOUDFIX',
      contactType: 'customer service',
    },
    sameAs: [
      'https://twitter.com/cloudfix',
      'https://linkedin.com/company/cloudfix',
    ],
  };

  return (
    <html lang="en">
      <body>
        <StructuredData type="Organization" data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
```plaintext
**Product schema for product pages:**

```tsx
// app/cloudfix/page.tsx
import { StructuredData } from '@/components/StructuredData';

export default function CloudFixPage() {
  const productSchema = {
    name: 'CloudFix',
    description: 'Automated AWS cost optimization platform',
    brand: {
      name: 'CloudFix',
      url: 'https://cloudfix.com',
    },
    offers: {
      price: '0',
      priceCurrency: 'USD',
      description: 'Free AWS cost assessment',
    },
    aggregateRating: {
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };

  return (
    <div>
      <StructuredData type="Product" data={productSchema} />
      {/* Page content */}
    </div>
  );
}
```plaintext
**FAQ schema for FAQ sections:**

```tsx
// components/FAQSection.tsx
export function FAQSection({ faqs }) {
  const faqSchema = {
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section>
      <StructuredData type="FAQPage" data={faqSchema} />
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```plaintext
**Review schema for testimonials:**

```tsx
// components/TestimonialCard.tsx
export function TestimonialCard({ review }) {
  const reviewSchema = {
    itemReviewed: {
      name: 'CloudFix',
      '@type': 'Product',
    },
    reviewRating: {
      ratingValue: review.rating,
      bestRating: '5',
    },
    author: {
      type: 'Person',
      name: review.author,
    },
    reviewBody: review.content,
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <StructuredData type="Review" data={reviewSchema} />
      <div className="flex items-center mb-4">
        {/* Rating stars */}
      </div>
      <p className="text-gray-700 mb-4">"{review.content}"</p>
      <p className="font-semibold">{review.author}</p>
      <p className="text-sm text-gray-600">{review.company}</p>
    </div>
  );
}
```plaintext
**Commit Message:**
```plaintext
feat(seo): implement comprehensive structured data

- Create StructuredData component for JSON-LD schemas
- Add Organization schema for company information
- Implement Product schema for product pages
- Add FAQ schema for FAQ sections
- Include Review schema for testimonials
- Enhance search engine understanding with rich data
```plaintext
---

### Task 10: SEO Metadata Enhancement (3 hours)

**Create comprehensive metadata function:**

```tsx
// lib/metadata.ts
import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateSEO(config: SEOConfig): Metadata {
  return {
    title: `${config.title} | CloudFix`,
    description: config.description,
    keywords: config.keywords?.join(', '),
    authors: config.author ? [{ name: config.author }] : undefined,
    openGraph: {
      title: config.title,
      description: config.description,
      url: `https://cloudfix.com${config.url}`,
      siteName: 'CloudFix',
      images: [
        {
          url: config.image || `/og?title=${encodeURIComponent(config.title)}&description=${encodeURIComponent(config.description)}`,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      locale: 'en_US',
      type: config.type || 'website',
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: config.image ? [config.image] : [`/og?title=${encodeURIComponent(config.title)}&description=${encodeURIComponent(config.description)}`],
    },
    alternates: {
      canonical: `https://cloudfix.com${config.url}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
```plaintext
**Update all pages with enhanced metadata:**

```tsx
// app/cloudfix/page.tsx
import { generateSEO } from '@/lib/metadata';

export const metadata = generateSEO({
  title: 'CloudFix - Automated AWS Cost Optimization',
  description: 'Save up to 40% on your AWS bill with intelligent automation. CloudFix continuously monitors your AWS infrastructure and implements optimizations automatically.',
  url: '/cloudfix',
  type: 'product',
  keywords: ['AWS cost optimization', 'cloud cost management', 'AWS savings', 'cloud automation'],
});

// app/blog/[slug]/page.tsx
export const metadata = generateSEO({
  title: blogPost.title,
  description: blogPost.excerpt,
  url: `/blog/${blogPost.slug}`,
  type: 'article',
  author: blogPost.author.name,
  publishedTime: blogPost.publishedAt,
  modifiedTime: blogPost.updatedAt,
});
```plaintext
**Add breadcrumb navigation:**

```tsx
// components/Breadcrumb.tsx
import { StructuredData } from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://cloudfix.com${item.url}`,
    })),
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
      <StructuredData type="BreadcrumbList" data={breadcrumbSchema} />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>/</span>}
          {index === items.length - 1 ? (
            <span className="text-gray-900">{item.name}</span>
          ) : (
            <a href={item.url} className="hover:text-primary">
              {item.name}
            </a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
```plaintext
**Commit Message:**
```plaintext
feat(seo): enhance metadata with comprehensive SEO optimization

- Create generateSEO function for consistent metadata
- Add Open Graph and Twitter Card optimization
- Implement structured data for breadcrumbs
- Add canonical URLs and robots meta tags
- Include keywords and author information
- Optimize all pages for search engine visibility
```plaintext
---

### Task 11: Accessibility Audit Implementation (6 hours)

**Install accessibility tools:**

```bash
npm install @axe-core/react eslint-plugin-jsx-a11y
```plaintext
**Configure ESLint for accessibility:**

```javascript
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": ["jsx-a11y"],
  "rules": {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error"
  }
}
```plaintext
**Add axe-core for automated testing:**

```tsx
// components/AccessibilityTester.tsx
'use client';
import { useEffect } from 'react';
import axe from '@axe-core/react';

export function AccessibilityTester() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      axe(React, ReactDOM, 1000);
    }
  }, []);

  return null;
}

// Use in layout.tsx
import { AccessibilityTester } from '@/components/AccessibilityTester';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {process.env.NODE_ENV === 'development' && <AccessibilityTester />}
        {children}
      </body>
    </html>
  );
}
```plaintext
**Implement skip links:**

```tsx
// components/SkipLinks.tsx
export function SkipLinks() {
  return (
    <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50">
      <a href="#main-content" className="block mb-2">
        Skip to main content
      </a>
      <a href="#navigation" className="block mb-2">
        Skip to navigation
      </a>
      <a href="#footer" className="block">
        Skip to footer
      </a>
    </div>
  );
}
```plaintext
**Enhance focus management:**

```tsx
// hooks/useFocusTrap.ts
import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return containerRef;
}

// Usage in modal
export function Modal({ isOpen, onClose, children }) {
  const focusRef = useFocusTrap(isOpen);

  if (!isOpen) return null;

  return (
    <div ref={focusRef} className="fixed inset-0 z-50">
      {/* Modal content */}
    </div>
  );
}
```plaintext
**Improve form accessibility:**

```tsx
// components/AccessibleInput.tsx
import { useId } from 'react';

interface AccessibleInputProps {
  label: string;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function AccessibleInput({
  label,
  error,
  required = false,
  type = 'text',
  placeholder,
  value,
  onChange,
}: AccessibleInputProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={`
          w-full px-3 py-2 border rounded-md
          focus:outline-none focus:ring-2 focus:ring-primary
          ${error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300'
          }
        `}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```plaintext
**Add live regions for dynamic content:**

```tsx
// components/LiveRegion.tsx
export function LiveRegion({ message, politeness = 'polite' }) {
  return (
    <div
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

// Usage for form submission feedback
export function FormFeedback({ message, type }) {
  return (
    <>
      <div className={`
        p-4 rounded-lg
        ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
      `}>
        {message}
      </div>
      <LiveRegion
        message={message}
        politeness={type === 'success' ? 'polite' : 'assertive'}
      />
    </>
  );
}
```plaintext
**Commit Message:**
```plaintext
feat(a11y): implement comprehensive accessibility enhancements

- Install and configure axe-core for automated testing
- Add ESLint jsx-a11y rules for code quality
- Implement skip links for keyboard navigation
- Add focus trap for modal dialogs
- Enhance form accessibility with proper labels and errors
- Create live regions for dynamic content announcements
- Ensure WCAG 2.1 AA compliance across all components
```plaintext
---

### Task 12: Lighthouse Performance Testing (4 hours)

**Create performance testing script:**

```javascript
// scripts/lighthouse.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);
  await chrome.kill();

  const { lhr } = runnerResult;

  console.log(`Performance score for ${url}:`, lhr.categories.performance.score * 100);
  console.log(`Accessibility score:`, lhr.categories.accessibility.score * 100);
  console.log(`Best Practices score:`, lhr.categories.bestPractices.score * 100);
  console.log(`SEO score:`, lhr.categories.seo.score * 100);

  return runnerResult;
}

// Test all pages
const pages = [
  '/',
  '/features',
  '/pricing',
  '/contact',
  '/cloudfix',
  '/rightspend',
  '/querylens',
  '/promptlens',
];

pages.forEach(async (page) => {
  await runLighthouse(`http://localhost:3000${page}`);
});
```plaintext
**Create performance monitoring dashboard:**

```tsx
// components/PerformanceDashboard.tsx
'use client';

import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    if ('web-vitals' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS((metric) => updateMetrics('cls', metric.value));
        getFID((metric) => updateMetrics('fid', metric.value));
        getFCP((metric) => updateMetrics('fcp', metric.value));
        getLCP((metric) => updateMetrics('lcp', metric.value));
        getTTFB((metric) => updateMetrics('ttfb', metric.value));
      });
    }
  }, []);

  const updateMetrics = (key: keyof PerformanceMetrics, value: number) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
  };

  if (!metrics) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 text-xs">
      <h4 className="font-semibold mb-2">Performance Metrics</h4>
      <div className="space-y-1">
        <div>LCP: {metrics.lcp?.toFixed(0)}ms</div>
        <div>FID: {metrics.fid?.toFixed(0)}ms</div>
        <div>CLS: {metrics.cls?.toFixed(3)}</div>
        <div>FCP: {metrics.fcp?.toFixed(0)}ms</div>
        <div>TTFB: {metrics.ttfb?.toFixed(0)}ms</div>
      </div>
    </div>
  );
}
```plaintext
**Set performance targets and monitoring:**

```javascript
// lib/performance.js
export const PERFORMANCE_TARGETS = {
  LCP: 2500, // Largest Contentful Paint < 2.5s
  FID: 100,  // First Input Delay < 100ms
  CLS: 0.1,  // Cumulative Layout Shift < 0.1
  FCP: 1800, // First Contentful Paint < 1.8s
  TTFB: 800, // Time to First Byte < 800ms
  Lighthouse: {
    Performance: 90,
    Accessibility: 95,
    BestPractices: 90,
    SEO: 90,
  },
};

export function checkPerformanceThresholds(metrics) {
  const results = {};

  Object.entries(PERFORMANCE_TARGETS).forEach(([key, target]) => {
    if (typeof target === 'number') {
      results[key] = {
        value: metrics[key],
        target,
        passed: metrics[key] <= target,
      };
    }
  });

  return results;
}
```plaintext
**Commit Message:**
```plaintext
test(performance): implement Lighthouse testing and monitoring

- Create automated Lighthouse testing script
- Add performance monitoring dashboard
- Set Core Web Vitals targets and tracking
- Implement performance threshold validation
- Add real-time performance metrics display
- Ensure 90+ scores across all Lighthouse categories
```plaintext
---

### Task 13: Cross-Browser Testing (3 hours)

**Create browser testing setup:**

```javascript
// playwright.config.js
module.exports = {
  webServer: {
    command: 'npm run dev',
    port: 3000,
  },
  testDir: './tests/e2e',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
};
```plaintext
**Create cross-browser tests:**

```javascript
// tests/e2e/cross-browser.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Cross-browser compatibility', () => {
  const pages = [
    '/',
    '/features',
    '/pricing',
    '/contact',
    '/cloudfix',
    '/rightspend',
    '/querylens',
    '/promptlens',
  ];

  pages.forEach(page => {
    test(`${page} loads correctly`, async ({ page }) => {
      await page.goto(page);

      // Check page loads without errors
      await expect(page).toHaveTitle(/CloudFix/);

      // Check main elements are present
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();

      // Check responsive navigation
      const isMobile = page.viewport().width < 768;
      if (isMobile) {
        await page.click('button[aria-label="Toggle menu"]');
        await expect(page.locator('nav')).toBeVisible();
      } else {
        await expect(page.locator('nav')).toBeVisible();
      }
    });

    test(`${page} navigation works`, async ({ page }) => {
      await page.goto(page);

      // Test main navigation
      await page.click('a[href="/features"]');
      await expect(page).toHaveURL('/features');

      await page.click('a[href="/pricing"]');
      await expect(page).toHaveURL('/pricing');

      await page.click('a[href="/contact"]');
      await expect(page).toHaveURL('/contact');
    });

    test(`${page} forms work correctly`, async ({ page }) => {
      if (page === '/contact' || page === '/assessment') {
        await page.goto(page);

        // Test form validation
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Required')).toBeVisible();

        // Test form submission
        await page.fill('input[name="name"]', 'Test User');
        await page.fill('input[name="email"]', 'test@example.com');
        await page.fill('textarea[name="message"]', 'Test message');

        // Note: Don't actually submit in tests
      }
    });
  });
});
```plaintext
**Visual regression testing:**

```javascript
// tests/e2e/visual-regression.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Visual regression testing', () => {
  test('Homepage visual consistency', async ({ page }) => {
    await page.goto('/');

    // Wait for all images to load
    await page.waitForLoadState('networkidle');

    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('Product pages visual consistency', async ({ page }) => {
    const products = ['cloudfix', 'rightspend', 'querylens', 'promptlens'];

    for (const product of products) {
      await page.goto(`/${product}`);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`${product}-page.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    }
  });
});
```plaintext
**Commit Message:**
```plaintext
test(cross-browser): implement comprehensive cross-browser testing

- Set up Playwright for multi-browser testing
- Create automated tests for all major browsers
- Add mobile device testing compatibility
- Implement visual regression testing
- Test navigation and forms across browsers
- Ensure consistent experience across all platforms
```plaintext
---

### Task 14: Mobile Device Testing (2 hours)

**Create mobile-specific tests:**

```javascript
// tests/e2e/mobile.spec.js
const { test, devices, expect } = require('@playwright/test');

const mobileDevices = [
  devices['iPhone 12'],
  devices['Pixel 5'],
  devices['iPad'],
];

mobileDevices.forEach(device => {
  test.describe(`${device.name} mobile testing`, () => {
    test.use({ ...device });

    test('Mobile navigation works', async ({ page }) => {
      await page.goto('/');

      // Check mobile menu button is visible
      await expect(page.locator('button[aria-label="Toggle menu"]')).toBeVisible();

      // Test mobile menu toggle
      await page.click('button[aria-label="Toggle menu"]');
      await expect(page.locator('nav')).toBeVisible();

      // Test navigation items
      await page.click('a[href="/features"]');
      await expect(page).toHaveURL('/features');

      // Menu should close after navigation
      await expect(page.locator('nav')).not.toBeVisible();
    });

    test('Touch interactions work', async ({ page }) => {
      await page.goto('/cloudfix');

      // Test scroll animations on mobile
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(1000);

      // Test touch-friendly buttons
      const ctaButton = page.locator('a[href="/assessment"]');
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toHaveCSS('min-height', /\d+px/);

      // Test form usability on mobile
      await page.goto('/contact');
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', 'test@example.com');

      // Check keyboard doesn't obscure content
      await page.tap('textarea[name="message"]');
      await expect(page.locator('textarea[name="message"]')).toBeFocused();
    });

    test('Mobile performance', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      // Mobile should load within 4 seconds
      expect(loadTime).toBeLessThan(4000);

      // Check mobile-specific optimizations
      const viewport = page.viewportSize();
      expect(viewport.width).toBeLessThan(1024);
    });
  });
});
```plaintext
**Add mobile-specific optimizations:**

```tsx
// hooks/useMobile.ts
import { useState, useEffect } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isTablet };
}

// Usage in components
export function ResponsiveComponent({ children }) {
  const { isMobile } = useMobile();

  return (
    <div className={isMobile ? 'p-4' : 'p-8'}>
      {children}
    </div>
  );
}
```plaintext
**Commit Message:**
```plaintext
test(mobile): implement comprehensive mobile device testing

- Create mobile-specific tests for iOS and Android
- Test touch interactions and gestures
- Verify mobile navigation and usability
- Add mobile performance validation
- Implement responsive design testing
- Ensure optimal experience on all mobile devices
```plaintext
---

### Task 15: Form Testing and Validation (2 hours)

**Create comprehensive form tests:**

```javascript
// tests/e2e/forms.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Form functionality', () => {
  test('Assessment form validation', async ({ page }) => {
    await page.goto('/assessment');

    // Test empty form submission
    await page.click('button[type="submit"]');

    // Check all required fields show errors
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Company is required')).toBeVisible();

    // Test invalid email
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Invalid email address')).toBeVisible();

    // Test valid form submission
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="company"]', 'Test Company');
    await page.fill('input[name="awsSpend"]', '10000');

    // Mock successful submission
    await page.route('/api/assessment', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.click('button[type="submit"]');

    // Check success message
    await expect(page.locator('text=Thank you for your submission')).toBeVisible();
  });

  test('Contact form functionality', async ({ page }) => {
    await page.goto('/contact');

    // Test form fields
    const formFields = [
      { name: 'name', value: 'Test User', required: true },
      { name: 'email', value: 'test@example.com', required: true },
      { name: 'company', value: 'Test Company', required: false },
      { name: 'message', value: 'Test message', required: true },
    ];

    for (const field of formFields) {
      await page.fill(`input[name="${field.name}"]`, field.value);
    }

    // Test checkbox acceptance
    await page.check('input[name="privacy"]');

    // Mock form submission
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.click('button[type="submit"]');
    await expect(page.locator('text=Message sent successfully')).toBeVisible();
  });

  test('Newsletter signup', async ({ page }) => {
    await page.goto('/');

    // Find newsletter form
    const newsletterInput = page.locator('input[placeholder*="email" i]').first();
    await newsletterInput.fill('newsletter@example.com');

    // Mock newsletter submission
    await page.route('/api/newsletter', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.click('button:has-text("Subscribe")');
    await expect(page.locator('text=Thank you for subscribing')).toBeVisible();
  });
});
```plaintext
**Test form accessibility:**

```javascript
// tests/e2e/accessibility.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Form accessibility', () => {
  test('All forms are accessible', async ({ page }) => {
    await page.goto('/contact');

    // Check form labels
    const inputs = page.locator('input, textarea, select');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');

      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      }
    }

    // Check error announcements
    await page.click('button[type="submit"]');
    const errors = page.locator('[role="alert"]');
    await expect(errors.first()).toBeVisible();

    // Check focus management
    const firstInput = page.locator('input').first();
    await firstInput.focus();
    await expect(firstInput).toBeFocused();

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const secondInput = page.locator('input').nth(1);
    await expect(secondInput).toBeFocused();
  });
});
```plaintext
**Commit Message:**
```plaintext
test(forms): implement comprehensive form testing and validation

- Create end-to-end tests for all form submissions
- Test form validation and error states
- Verify form accessibility compliance
- Test keyboard navigation and focus management
- Add newsletter signup functionality testing
- Ensure all forms work correctly across browsers
```plaintext
---

## 🚀 Implementation Order

**Recommended sequence:**

1. ✅ **Task 1**: Bundle analysis (4 hrs) - Performance baseline
2. ✅ **Task 2**: Image optimization (6 hrs) - Core performance
3. ✅ **Task 3**: Lazy loading (4 hrs) - Load time optimization
4. ✅ **Task 4**: Font optimization (3 hrs) - Resource loading
5. ✅ **Task 5**: Caching strategy (3 hrs) - Performance enhancement
6. ✅ **Task 6**: Error boundaries (2 hrs) - Resilience
7. ✅ **Task 7**: Social images (4 hrs) - SEO foundation
8. ✅ **Task 8**: Sitemap/robots (3 hrs) - SEO infrastructure
9. ✅ **Task 9**: Structured data (5 hrs) - Rich snippets
10. ✅ **Task 10**: SEO metadata (3 hrs) - Search optimization
11. ✅ **Task 11**: Accessibility audit (6 hrs) - Compliance
12. ✅ **Task 12**: Lighthouse testing (4 hrs) - Performance validation
13. ✅ **Task 13**: Cross-browser testing (3 hrs) - Compatibility
14. ✅ **Task 14**: Mobile testing (2 hrs) - Mobile optimization
15. ✅ **Task 15**: Form testing (2 hrs) - Functionality validation

**Total Estimated Time**: 48 hours (within 40-50 hour range)

---

## 📊 Success Criteria

### Performance Requirements
- ✅ Lighthouse Performance score: 90+
- ✅ Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- ✅ Bundle size: Main bundle < 100KB gzipped
- ✅ Image optimization: WebP/AVIF formats with lazy loading
- ✅ First Contentful Paint: < 1.8s

### SEO Requirements
- ✅ All pages have proper meta tags and descriptions
- ✅ Social sharing images for all major pages
- ✅ Structured data for products, articles, reviews
- ✅ Sitemap.xml automatically generated
- ✅ Robots.txt properly configured
- ✅ Open Graph and Twitter Card optimization

### Accessibility Requirements
- ✅ WCAG 2.1 AA compliance across all pages
- ✅ Keyboard navigation works for all interactive elements
- ✅ Screen reader compatibility with proper ARIA labels
- ✅ Color contrast ratios meet WCAG standards
- ✅ Focus management and skip links implemented
- ✅ Form accessibility with proper validation announcements

### Testing Requirements
- ✅ Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- ✅ Mobile device testing (iOS Safari, Android Chrome)
- ✅ Form functionality and validation testing
- ✅ Visual regression testing for design consistency
- ✅ Error handling and recovery testing
- ✅ Performance monitoring and alerting setup

---

## 🔍 Testing Strategy

### Performance Testing
- Lighthouse audits for all pages
- Core Web Vitals monitoring
- Bundle size analysis
- Mobile performance testing
- Image optimization verification

### SEO Testing
- Google Rich Results testing
- Social media preview testing
- Sitemap validation
- Meta tag completeness
- Structured data validation

### Accessibility Testing
- Automated axe-core testing
- Manual keyboard navigation testing
- Screen reader testing
- Color contrast validation
- Form accessibility testing

### Cross-Platform Testing
- Browser compatibility matrix
- Mobile device testing
- Responsive design validation
- Touch interaction testing
- Performance across devices

---

## 📚 Related Documentation

**Reference Files:**
- `/docs/ROADMAP.md` - Project progress and timeline
- `/docs/BRAND_CONSISTENCY_AUDIT.md` - Brand specifications
- `/next.config.js` - Next.js configuration
- `/tailwind.config.ts` - Design system configuration

**Dependencies:**
- Existing Next.js application with all pages
- Component library with consistent patterns
- Form systems with validation
- Assessment and contact forms

---

## 🎯 Post-Implementation

**After completing this plan:**

1. **Performance Monitoring**: Set up ongoing performance monitoring
2. **SEO Analytics**: Track search rankings and organic traffic
3. **Accessibility Audit**: Conduct manual accessibility testing
4. **User Testing**: Gather feedback on performance and usability
5. **Launch Preparation**: Final deployment checklist and monitoring

**Production Readiness Checklist:**
- All Lighthouse scores 90+
- No console errors or warnings
- All forms function correctly
- Cross-browser compatibility verified
- Mobile optimization complete
- SEO optimization implemented
- Accessibility compliance achieved

---

## 🚨 Critical Dependencies

**Technical Requirements:**
- Next.js 14 with App Router
- Modern browser support
- Sufficient build time for optimization
- Monitoring and analytics setup
- Deployment pipeline readiness

**Content Requirements:**
- Social sharing image templates
- Product and company information for structured data
- SEO content and meta descriptions
- Contact and support information

---

**Ready to implement?** This comprehensive optimization plan will transform the functional CloudFix site into a production-ready, high-performance web application that meets enterprise standards for speed, SEO, accessibility, and cross-platform compatibility. 🚀