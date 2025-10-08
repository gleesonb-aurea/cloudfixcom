# CloudFix - Next.js Website

Modern, fast, and SEO-optimized static site for CloudFix built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### 3. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
cloudfix-nextjs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer with schema markup
│   ├── Hero.tsx           # Hero section component
│   ├── ContentBlock.tsx   # Content block components
│   └── Newsletter.tsx     # Newsletter signup form
├── public/                # Static assets
│   └── images/           # Image files
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json          # Dependencies
```

## 🎨 Components

### Hero Component
```tsx
<Hero
  title="Your Main Headline"
  subtitle="Optional badge text"
  description="Supporting text"
  ctaText="Primary Button"
  ctaLink="/link"
  secondaryCtaText="Secondary Button"
  secondaryCtaLink="/link"
/>
```

### Content Block
```tsx
<ContentBlock title="Section Title" columns={3} centered>
  <FeatureCard
    icon="🔍"
    title="Feature Title"
    description="Feature description"
  />
</ContentBlock>
```

### Newsletter
```tsx
<Newsletter />
```

## 🚀 Deploying to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/cloudfix-nextjs.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js - just click "Deploy"
6. Done! Your site is live

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## 🌐 Custom Domain Setup

After deploying to Vercel:

1. Go to your project settings
2. Click "Domains"
3. Add "cloudfix.com"
4. Update your DNS records:

**At your DNS provider (GoDaddy/Cloudflare/etc):**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. Wait 10-60 minutes for DNS propagation
6. SSL certificate is automatically provisioned

## 📝 Adding New Pages

Create a new file in `app/`:

```tsx
// app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>About CloudFix</h1>
      <p>Content here...</p>
    </div>
  );
}
```

The page is automatically available at `/about`

## 🎯 Adding Blog Posts (Future)

Create an MDX file in `content/blog/`:

```mdx
---
title: "How to Save Money on AWS"
date: "2025-10-03"
author: "Your Name"
---

# How to Save Money on AWS

Your content here...
```

Then create `app/blog/page.tsx` to list all posts.

## 📊 SEO Features

Already included:
- ✅ Proper meta tags (Open Graph, Twitter Cards)
- ✅ Organization schema markup
- ✅ Sitemap generation (automatic)
- ✅ robots.txt (automatic)
- ✅ Fast page loads (<1s)
- ✅ Image optimization
- ✅ Mobile responsive

## 🔧 Environment Variables

Create `.env.local` for sensitive data:

```env
NEXT_PUBLIC_NEWSLETTER_WEBHOOK=your-webhook-url
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL=https://your-webhook.example/endpoint
```

- `NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL` is used by both the Assessment form (`/assessment`) and the Partnerships forms (`/partners`). All submissions include a `source` field (either `cloudfix-assessment-form` or `cloudfix-partner-form`) and a `formType` for partner variants.

Local testing tip: you can point this to a request bin or a Zapier test hook and submit a test entry from `/assessment` and both partner forms on `/partners`.

## 📦 Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Vercel** - Deployment platform

## 🆚 WordPress vs Next.js

### Before (WordPress):
- Manual updates required
- PHP/MySQL security concerns
- Slow page loads (2-4s)
- Plugin dependencies
- $20-50/month hosting

### After (Next.js):
- Git-based version control
- Static, secure pages
- Fast page loads (<1s)
- No plugins needed
- $0/month hosting (Vercel free tier)

## 📚 Documentation

**📖 [Complete Documentation Index](./docs/README.md)**

All project documentation is centralized in `/docs`:
- **[Migration Summary](./docs/NEXT_JS_MIGRATION_SUMMARY.md)** - Overall project status
- **[Brand Audit](./docs/BRAND_CONSISTENCY_AUDIT.md)** - ⚠️ **Action Required**: Brand color corrections
- **[Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)** - Step-by-step Vercel deployment
- **[Migration Guide](./docs/MIGRATION_GUIDE.md)** - WordPress content migration
- **[SEO Analysis](./docs/SEO_ANALYSIS_REPORT.md)** - SEO implementation

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## 🤝 Contributing

This is a single-maintainer project. To make changes:

1. Edit files locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Vercel auto-deploys

## 📞 Support

Questions? Issues? Check:
- Next.js docs: https://nextjs.org/docs
- Vercel support: https://vercel.com/support
- Tailwind docs: https://tailwindcss.com/docs
