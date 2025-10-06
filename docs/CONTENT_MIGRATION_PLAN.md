# CloudFix Content Migration Plan

**Status:** Planning Phase
**Created:** October 6, 2025

## Overview

The SEO audits were conducted prematurely - only the homepage skeleton exists. This plan outlines the **complete content migration** from WordPress cloudfix.com to Next.js with **integrated SEO optimization** at every step.

## Migration Strategy

### Phase 1: Content Analysis & Extraction
**Goal:** Understand what content exists on WordPress and plan migration

1. Crawl cloudfix.com to extract all page content
2. Identify key content elements:
   - Real testimonials with customer details
   - Actual case studies with metrics
   - Team member bios and photos
   - Product features and descriptions
   - Blog posts and resources
   - Technical documentation
3. Map WordPress content to Next.js page structure
4. Identify content gaps and improvements

### Phase 2: Homepage Content Migration
**Goal:** Migrate homepage with SEO optimization

**Process:**
1. Extract existing cloudfix.com homepage content
2. Enhance with SEO best practices
3. Run through **ai-seo-optimizer** agent for AI search optimization
4. Run through **seo-content-auditor** agent for quality check
5. Implement feedback and iterate

**Deliverables:**
- Fully optimized homepage with real content
- JSON-LD schema markup
- Enhanced metadata
- Real testimonials and case studies

### Phase 3: Priority 1 Pages Migration
**Pages (7 total):**
1. `/pricing/` - Pricing plans
2. `/assessment/` - Free assessment CTA
3. `/success-stories/` - Customer success stories
4. `/cloudfix/` - CloudFix solution
5. `/rightspend/` - RightSpend solution
6. `/querylens/` - QueryLens solution
7. `/blog/` - Blog index

**SEO Integration:**
- Each page reviewed by **seo-meta-optimizer** for metadata
- **seo-structure-architect** validates heading hierarchy
- **ai-seo-optimizer** ensures AI search compatibility
- **seo-content-auditor** scores content quality (target: 8+/10)

### Phase 4: Priority 2 Pages Migration
**Pages (10 total):**
- About, Leadership, Contact
- MCP Servers
- Cost Optimization Services
- AWS Partnership
- Podcast, Livestream, Videos, Webinar

**SEO Integration:**
- Same agent workflow as Phase 3
- Add page-specific schema markup
- Implement breadcrumbs
- Optimize internal linking

### Phase 5: Content & Resources System
**Goal:** Set up dynamic blog/resources with MDX

1. Install and configure MDX
2. Create blog post templates
3. Migrate existing blog posts
4. Set up resource categories
5. Implement podcast/video pages
6. Add pagination and filtering

**SEO Integration:**
- Article schema markup for blog posts
- Video schema for video content
- Podcast schema for episodes
- Proper canonical URLs
- Optimized meta descriptions per post

### Phase 6: Final Pages & Polish
**Pages (5 total):**
- Partner pages (2)
- Legal pages (2)
- News & Events

**Final Optimization:**
- Internal linking audit
- Schema markup validation
- Site-wide breadcrumbs
- Image optimization
- Performance testing

## SEO Agent Integration Workflow

For **each page migration**, follow this workflow:

```
1. Extract content from WordPress
2. Draft Next.js page implementation
3. Run through ai-seo-optimizer agent
   └─> Implement AI search optimizations
4. Run through seo-meta-optimizer agent
   └─> Refine metadata, OG tags, descriptions
5. Run through seo-structure-architect agent
   └─> Validate headers, schema, internal links
6. Run through seo-content-auditor agent
   └─> Score content quality, identify gaps
7. Iterate until content score ≥ 8/10
8. Final review and deploy
```

## Content Quality Targets

| Page Type | Min Word Count | Content Score | Schema Required |
|-----------|---------------|---------------|-----------------|
| Homepage | 2,000+ | 9/10 | Organization, WebSite |
| Product/Solution | 1,500+ | 8.5/10 | Product, Service |
| About/Company | 1,200+ | 8/10 | Organization, BreadcrumbList |
| Blog Post | 1,000+ | 8/10 | Article, BreadcrumbList |
| Resource Page | 800+ | 7.5/10 | Article |
| Legal | 500+ | 7/10 | WebPage |

## Timeline

| Phase | Duration | Pages | Status |
|-------|----------|-------|--------|
| Phase 1: Analysis | 4-6 hours | - | Not Started |
| Phase 2: Homepage | 8-12 hours | 1 | Not Started |
| Phase 3: Priority 1 | 20-30 hours | 7 | Not Started |
| Phase 4: Priority 2 | 25-35 hours | 10 | Not Started |
| Phase 5: Content System | 15-20 hours | Dynamic | Not Started |
| Phase 6: Final Polish | 10-15 hours | 5 | Not Started |
| **Total** | **82-118 hours** | **24+** | **0% Complete** |

## Success Metrics

### Before Migration (WordPress)
- Technical SEO: 8.8/10
- Content Quality: 8.8/10
- Page Load: 2-4s
- Monthly Organic Traffic: [baseline]

### After Migration (Next.js Target)
- Technical SEO: 9.5/10 (+8%)
- Content Quality: 9.0/10 (+2%)
- Page Load: <1s (-75%)
- Monthly Organic Traffic: +30-50% in 3 months

## Tools & Resources

- **WordPress Source:** https://cloudfix.com
- **SEO Agents:** ai-seo-optimizer, seo-meta-optimizer, seo-structure-architect, seo-content-auditor
- **Testing:** Google Rich Results Test, PageSpeed Insights
- **Schema Validation:** schema.org validator
- **Content Analysis:** WebFetch for WordPress content extraction

## Next Steps

1. ✅ Create migration plan (this document)
2. ⏳ Extract WordPress homepage content
3. ⏳ Begin Phase 2: Homepage migration with SEO agent workflow
4. ⏳ Iterate through all phases
5. ⏳ Final comprehensive SEO audit

## Notes

- The initial SEO audit (4.2/10 content score) was conducted on skeleton homepage only
- Real content migration will bring scores up to 8-9/10 range
- Each page will be optimized for both traditional SEO and AI search (LLMO/GEO)
- WordPress testimonials, case studies, and team info will be preserved and enhanced

---

**Last Updated:** October 6, 2025
**Next Review:** After Phase 2 completion
