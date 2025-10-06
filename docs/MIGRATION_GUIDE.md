# WordPress to Next.js Migration Guide

## 📋 Overview

This guide helps you migrate your remaining CloudFix WordPress content to the new Next.js site.

---

## 🎯 Migration Strategy

### Phase 1: Homepage (✅ COMPLETE)
- Homepage is built and ready
- All components working
- SEO markup included

### Phase 2: Core Pages (Next)
- About page
- Features page
- Pricing page
- Contact page
- How It Works page

### Phase 3: Blog & Resources
- Export all blog posts
- Convert to MDX format
- Import into Next.js

### Phase 4: Media
- Export images from WordPress
- Optimize and upload to `/public/images/`
- Update references

### Phase 5: Go Live
- Final testing
- DNS switchover
- Monitor

---

## 📄 Exporting Content from WordPress

### Option 1: Manual Export (Recommended for Small Sites)

1. **Copy page content:**
   - Go to WordPress admin → Pages
   - Open each page
   - Copy the content
   - Paste into new Next.js pages

2. **Save ACF field data:**
   - Use ACF Export feature
   - Save field configurations as JSON
   - Use as reference for component props

### Option 2: WordPress Export Tool

```bash
# In WordPress admin:
Tools → Export → All content → Download
```

This creates an XML file with all your content.

### Option 3: Use WP-CLI (Advanced)

```bash
# Export all posts
wp post list --post_type=post --format=json > posts.json

# Export all pages
wp post list --post_type=page --format=json > pages.json

# Export resources
wp post list --post_type=resources --format=json > resources.json
```

---

## 🔄 Converting Content

### Create a New Page

Example: Creating the "About" page

**File:** `app/about/page.tsx`

```tsx
import Hero from '@/components/Hero';
import ContentBlock from '@/components/ContentBlock';

export const metadata = {
  title: "About CloudFix | AWS Cost Optimization",
  description: "Learn about CloudFix's mission to help companies reduce AWS costs automatically."
};

export default function About() {
  return (
    <>
      <Hero
        title="About CloudFix"
        description="We're on a mission to make AWS cost optimization accessible to every company."
      />

      <ContentBlock>
        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2>Our Story</h2>
          <p>
            CloudFix was founded in 2020 when our team realized that most
            companies were overpaying for AWS by 30-50%...
          </p>

          <h2>Our Mission</h2>
          <p>
            We believe every company deserves access to enterprise-grade
            AWS optimization tools...
          </p>
        </div>
      </ContentBlock>
    </>
  );
}
```

**That's it!** The page is now live at `/about`

### Converting Blog Posts to MDX

**Step 1: Install MDX support**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

**Step 2: Update next.config.ts**

```typescript
import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

export default withMDX(nextConfig)
```

**Step 3: Create content directory**

```bash
mkdir -p content/blog
```

**Step 4: Convert a blog post**

**From WordPress:**
```
Title: How to Save Money on AWS
Date: October 3, 2025
Categories: Guides
Content: AWS costs can get out of hand quickly...
```

**To MDX:**

**File:** `content/blog/how-to-save-money-on-aws.mdx`

```mdx
---
title: "How to Save Money on AWS"
date: "2025-10-03"
author: "Your Name"
category: "Guides"
excerpt: "AWS costs can get out of hand quickly. Learn 5 proven strategies to reduce your cloud bills."
image: "/images/blog/aws-savings.jpg"
---

# How to Save Money on AWS

AWS costs can get out of hand quickly. In this guide, we'll cover 5 proven strategies to reduce your cloud bills.

## 1. Right-Size Your Instances

Many companies are running instances that are too large for their workload...

<ContentBlock columns={2}>
  <FeatureCard
    title="Before"
    description="Running t3.xlarge 24/7: $150/month"
  />
  <FeatureCard
    title="After"
    description="Running t3.medium on schedule: $40/month"
  />
</ContentBlock>

## 2. Use Reserved Instances

If you have predictable workloads...

[Continue with your content]
```

**Step 5: Create blog listing page**

**File:** `app/blog/page.tsx`

```tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Blog() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace('.mdx', ''),
      ...data,
    };
  });

  return (
    <div className="container-custom section-padding">
      <h1 className="text-5xl font-bold mb-12">Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6"
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <time className="text-sm text-gray-500">{post.date}</time>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Step 6: Create blog post template**

**File:** `app/blog/[slug]/page.tsx`

```tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content/blog', `${params.slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return (
    <article className="container-custom section-padding prose prose-lg max-w-4xl mx-auto">
      <h1>{data.title}</h1>
      <time className="text-gray-500">{data.date}</time>

      <MDXRemote source={content} />
    </article>
  );
}
```

---

## 🖼️ Migrating Images

### Option 1: Bulk Download from WordPress

```bash
# SSH into your WordPress server
cd /path/to/wordpress/wp-content/uploads

# Download all images
scp -r uploads/ user@yourcomputer:/local/path/
```

### Option 2: Use WordPress Export

1. Install "All-in-One WP Migration" plugin
2. Export → Media only
3. Download and extract

### Copy to Next.js

```bash
# Copy images to public folder
cp -r wordpress/uploads/* cloudfix-nextjs/public/images/
```

### Use in Next.js

```tsx
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="CloudFix Logo"
  width={200}
  height={50}
  priority // For above-the-fold images
/>
```

**Benefits:**
- Automatic optimization
- Lazy loading
- WebP conversion
- Responsive sizing

---

## 📊 Content Mapping

### WordPress ACF Blocks → Next.js Components

| WordPress ACF Block | Next.js Component | Example |
|---------------------|-------------------|---------|
| Hero Block | `<Hero />` | Hero section |
| Content Block | `<ContentBlock />` | Multi-column content |
| Timeline Block | Create `<Timeline />` | Roadmap, history |
| Testimonials | `<Testimonial />` | Customer quotes |
| Logo Strip | `<LogoGrid />` | Partner logos |
| Newsletter | `<Newsletter />` | Already built! |

### Example: Creating Timeline Component

**File:** `components/Timeline.tsx`

```tsx
interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {items.map((item, index) => (
        <div key={index} className="relative pl-8 pb-12 border-l-2 border-primary">
          <div className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-primary font-bold text-lg mb-2">{item.year}</div>
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Usage:**

```tsx
<Timeline
  items={[
    {
      year: "2020",
      title: "CloudFix Founded",
      description: "Started with a mission to simplify AWS optimization"
    },
    {
      year: "2021",
      title: "First 100 Customers",
      description: "Saved over $10M in AWS costs"
    },
    // ...
  ]}
/>
```

---

## 🔍 SEO Migration

### WordPress SEO Data

If using Yoast or RankMath, export:
- Meta titles
- Meta descriptions
- Focus keywords
- Open Graph data

### Add to Next.js

**Per-page metadata:**

```tsx
// app/about/page.tsx
export const metadata = {
  title: "About CloudFix | AWS Cost Optimization Platform",
  description: "Learn how CloudFix helps companies save 30%+ on AWS costs automatically.",
  openGraph: {
    title: "About CloudFix",
    description: "Learn how CloudFix helps companies save 30%+ on AWS costs.",
    images: ['/images/og-about.jpg'],
  },
};
```

### 301 Redirects

If URLs change, add redirects:

**File:** `next.config.ts`

```typescript
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/resources/:slug',
        permanent: true,
      },
    ];
  },
};
```

---

## ✅ Pre-Launch Checklist

Before switching DNS:

### Content
- [ ] All pages created
- [ ] All blog posts migrated
- [ ] All images uploaded
- [ ] All links tested

### SEO
- [ ] Meta titles/descriptions added
- [ ] Schema markup verified
- [ ] Sitemap generated (automatic)
- [ ] Robots.txt configured (automatic)
- [ ] 301 redirects added

### Functionality
- [ ] Forms work
- [ ] Newsletter signup works
- [ ] Navigation works
- [ ] Search works (if applicable)
- [ ] Mobile responsive

### Performance
- [ ] PageSpeed score 90+
- [ ] All images optimized
- [ ] No console errors
- [ ] Load time < 2s

---

## 🚀 Launch Day

### Step 1: Final WordPress Backup

```bash
# Backup WordPress database
mysqldump -u username -p database > backup.sql

# Backup WordPress files
tar -czf wordpress-backup.tar.gz /path/to/wordpress/
```

### Step 2: Update DNS

Update your DNS records to point to Vercel (as per DEPLOYMENT_GUIDE.md)

### Step 3: Monitor

Watch for:
- DNS propagation (10-60 minutes)
- SSL certificate issuance (automatic)
- Any 404 errors
- Form submissions working

### Step 4: Keep WordPress Read-Only

Don't delete WordPress immediately:
- Keep it running for 30 days
- Use as reference if needed
- Backup one final time
- Then decommission

---

## 📈 Post-Migration Tasks

### Week 1
- Monitor Google Search Console for errors
- Fix any broken links
- Verify all forms working
- Check analytics tracking

### Week 2
- Submit new sitemap to Google
- Update social media links
- Update email signatures
- Notify partners of new site

### Month 1
- Monitor search rankings
- Check for 404 errors
- Optimize based on analytics
- Add any missing content

---

## 🎉 Benefits After Migration

### Performance
- ✅ 3x faster page loads
- ✅ 90+ PageSpeed scores
- ✅ Better Core Web Vitals

### Maintenance
- ✅ No WordPress updates
- ✅ No plugin conflicts
- ✅ No security patches
- ✅ No database optimization

### Development
- ✅ Git version control
- ✅ Easy to make changes
- ✅ Preview branches
- ✅ Rollback in seconds

### Cost
- ✅ $0 hosting (Vercel free tier)
- ✅ No server management
- ✅ No backup costs
- ✅ No security monitoring costs

---

## 🆘 Troubleshooting

### "My old site still shows"

**Solution:** DNS hasn't propagated yet. Wait 30-60 minutes. Clear browser cache.

### "Images don't load"

**Solution:** Check image paths. Should be `/images/filename.png` (relative to public folder).

### "Blog posts show 404"

**Solution:** Make sure MDX files are in correct location and `[slug]/page.tsx` exists.

### "Forms don't submit"

**Solution:** Check webhook URL in `components/Newsletter.tsx`. Test locally first.

---

## 📞 Need Help?

**Migration stuck?** Common issues:
- Images: Check file paths and permissions
- Forms: Verify webhook URLs
- SEO: Use Google Rich Results Test
- Performance: Run PageSpeed Insights

**Still stuck?** Review:
- README.md for basic usage
- DEPLOYMENT_GUIDE.md for deployment
- Next.js docs: https://nextjs.org/docs

---

## 🎯 Success!

Once migrated, you'll have:
- ✅ Modern, fast website
- ✅ Easy to maintain
- ✅ Version controlled
- ✅ Free hosting
- ✅ No WordPress headaches

**Welcome to the modern web! 🚀**
