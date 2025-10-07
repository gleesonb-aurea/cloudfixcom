# Phase 4: Content Systems Implementation Plan

**Created**: October 7, 2025
**Status**: Ready for Implementation
**Priority**: 🟢 MEDIUM (Phase 3 Product Pages Complete)
**Estimated Effort**: 50-60 hours
**Complexity**: Medium-High

---

## 🎯 Implementation Goals

Build comprehensive content management systems that replace WordPress functionality while maintaining content discoverability and user engagement. These systems will power the blog, multimedia content, and resource discovery features of the CloudFix website.

**Core Content Systems to Build:**
1. **Blog System** (highest priority) - MDX-based content with category filtering
2. **Multimedia Pages** - Podcast, Livestream, and Videos with media players
3. **Resources System** - Dynamic content aggregation and filtering
4. **Data Integration** - API routes and caching strategies

---

## 📋 Current State Analysis

**Phase 3 Product Pages Status:**
- ✅ All 4 product pages complete (CloudFix, RightSpend, QueryLens, PromptLens)
- ✅ Product navigation and cross-links working
- ✅ RelatedProducts component implemented
- ✅ Active state indication for current products
- ✅ Mobile responsive design for all products

**Content Infrastructure Status:**
- ✅ Component library complete (TestimonialCard, ResourceCard, TeamCard)
- ✅ UI components available (Tabs, Accordion, Timeline, Modal)
- ✅ Form system components ready (Input, Select, Checkbox, Textarea)
- ✅ Assessment page functional and integrated
- ❌ No content management systems exist
- ❌ No blog or multimedia functionality
- ❌ No resource aggregation system

**WordPress Site Analysis:**
- **Blog**: 150+ posts on AWS cost optimization, categorized by AWS services
- **Podcast**: 50+ episodes with multi-platform audio links
- **Resources**: Mixed content types (blogs, podcasts, videos, case studies)
- **Content Types**: Blog posts, podcasts, videos, livestreams, case studies, success stories

---

## 🏗️ Target Architecture

### Content Management Structure
```
content/
├── blog/
│   ├── 2024/
│   │   ├── 10-awesome-aws-cost-tips.mdx
│   │   ├── 08-cloudwatch-optimization-guide.mdx
│   │   └── ...
│   ├── 2023/
│   └── index.ts (blog registry)
├── podcast/
│   ├── episodes.json (episode metadata)
│   └── guests.json (guest information)
├── resources/
│   ├── resources.json (resource registry)
│   └── categories.json (category definitions)
└── data/
    ├── testimonials.json
    ├── team.json
    └── success-stories.json
```

### Component Architecture
```tsx
// Content System Components
<BlogPost>           // Individual blog post rendering
<BlogListing>        // Blog post grid/list
<CategoryFilter>     // Category and tag filtering
<SearchBar>          // Content search functionality
<PodcastPlayer>      // Audio player component
<VideoPlayer>        // Video player component
<ResourceGrid>       // Mixed content display
<ContentCard>        // Unified content card
<LoadingSkeleton>    // Content loading states
<Pagination>         // Content pagination
<SocialShare>        // Social sharing buttons
<RSSFeed>            // RSS feed generation
```

### API Routes Structure
```
/api/
├── blog/
│   ├── posts/route.ts     // Blog posts listing
│   ├── categories/route.ts // Category data
│   └── search/route.ts    // Blog search
├── podcast/
│   ├── episodes/route.ts  // Episode data
│   └── feed/route.ts      // RSS feed
├── resources/
│   ├── list/route.ts      // Resources listing
│   ├── categories/route.ts // Resource categories
│   └── search/route.ts    // Resource search
└── search/
    └── route.ts           // Global site search
```

---

## 🎨 Technical Specifications

### MDX Blog System
```tsx
// Blog post frontmatter structure
---
title: "10 AWS Cost Optimization Tips for Startups"
description: "Practical tips to reduce your AWS bill by 40%"
author: "Bill Coughran"
date: "2024-10-15"
category: "Cost Optimization"
tags: ["EC2", "S3", "Lambda", "Cost"]
featured: true
readTime: 8
image: "/images/blog/aws-cost-tips-cover.jpg"
seo:
  title: "AWS Cost Optimization Tips - Save 40% on Cloud Costs"
  description: "Learn 10 practical AWS cost optimization strategies"
  keywords: ["AWS costs", "cloud optimization", "cost savings"]
---

// MDX content with React components
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Callout } from '@/components/ui/Callout';

## Introduction

Cloud costs can quickly spiral out of control...

<Callout type="tip">
Use CloudWatch to monitor your spending in real-time.
</Callout>

```javascript
// Example cost monitoring script
const monitorCosts = async () => {
  const costs = await getCostExplorer();
  return optimizeSpending(costs);
};
```
```

### Multimedia Content Structure
```tsx
// Episode data structure
interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  guest: {
    name: string;
    title: string;
    company: string;
    bio: string;
    avatar: string;
  };
  publishDate: string;
  duration: number; // in minutes
  audioUrls: {
    apple: string;
    spotify: string;
    google: string;
    amazon: string;
    rss: string;
  };
  transcript?: string;
  showNotes: string[];
  tags: string[];
  featured: boolean;
}

// Video content structure
interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  publishDate: string;
  youtubeId?: string;
  vimeoId?: string;
  category: string;
  tags: string[];
  featured: boolean;
}
```

### Resource System Architecture
```tsx
// Unified resource interface
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'blog' | 'podcast' | 'video' | 'case-study' | 'success-story';
  category: string;
  tags: string[];
  publishDate: string;
  featured: boolean;
  readTime?: number;
  duration?: number;
  thumbnail: string;
  author?: string;
  url: string;
  metadata: {
    views?: number;
    downloads?: number;
    rating?: number;
  };
}

// Resource filtering and search
interface ResourceFilter {
  type?: string[];
  category?: string[];
  tags?: string[];
  dateRange?: {
    from: string;
    to: string;
  };
  featured?: boolean;
  search?: string;
}
```

---

## 🔧 Implementation Tasks

### Task 1: MDX Blog System Foundation (6 hours)

**Setup MDX configuration and dependencies:**

```bash
# Install MDX dependencies
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter
npm install remark-gfm rehype-highlight rehype-slug
```

**Configure next.config.js for MDX:**
```js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
});

module.exports = withMDX({
  // Your existing Next.js config
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});
```

**Create blog post template:**
```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { BlogPost } from '@/components/blog/BlogPost';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { SocialShare } from '@/components/blog/SocialShare';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

interface BlogPostPage {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPage) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, post.tags);

  return (
    <div className="min-h-screen">
      <article className="max-w-4xl mx-auto py-12 px-4">
        <BlogPost.Header post={post} />
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogPost.Content content={post.content} />
            <BlogPost.Tags tags={post.tags} />
            <SocialShare post={post} />
            <RelatedPosts posts={relatedPosts} />
          </div>
          <div className="lg:col-span-1">
            <TableOfContents content={post.content} />
          </div>
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPage) {
  const post = await getPostBySlug(params.slug);

  if (!post) return {};

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.description,
    keywords: post.seo?.keywords || post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}
```

**Create blog content utilities:**
```tsx
// lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  readTime: number;
  image: string;
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
  content: any;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    slugs.map(async (slug) => getPostBySlug(slug.replace('.mdx', '')))
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const mdxSource = await serialize(content);

    return {
      slug,
      title: data.title,
      description: data.description,
      author: data.author,
      date: data.date,
      category: data.category,
      tags: data.tags || [],
      featured: data.featured || false,
      readTime: Math.ceil(content.split(' ').length / 200), // 200 wpm
      image: data.image,
      seo: data.seo,
      content: mdxSource,
    };
  } catch (error) {
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.category === category);
}

export async function getRelatedPosts(category: string, tags: string[]): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts
    .filter(post => post.category === category && !post.featured)
    .slice(0, 3);
}
```

**Commit Message:**
```
feat(blog): implement MDX blog system foundation

- Add MDX configuration and dependencies
- Create blog post template with dynamic routing
- Implement blog content utilities and parsing
- Add metadata generation for SEO
- Set up static generation for blog posts
```

---

### Task 2: Blog Listing and Filtering (4 hours)

**Create blog listing page:**
```tsx
// app/blog/page.tsx
import { getAllPosts, getCategories } from '@/lib/blog';
import { BlogListing } from '@/components/blog/BlogListing';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { SearchBar } from '@/components/blog/SearchBar';
import { Pagination } from '@/components/ui/Pagination';

interface BlogPage {
  searchParams: {
    category?: string;
    tag?: string;
    search?: string;
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPage) {
  const posts = await getAllPosts();
  const categories = await getCategories();

  const filteredPosts = filterPosts(posts, searchParams);
  const currentPage = parseInt(searchParams.page || '1');
  const postsPerPage = 12;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen">
      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">CloudFix Blog</h1>
          <p className="text-xl text-gray-600">
            AWS cost optimization tips, strategies, and best practices
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64">
            <CategoryFilter
              categories={categories}
              selectedCategory={searchParams.category}
            />
          </div>

          <div className="flex-1">
            <SearchBar
              placeholder="Search blog posts..."
              defaultValue={searchParams.search}
            />

            <BlogListing posts={paginatedPosts} />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/blog"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function filterPosts(posts: BlogPost[], filters: BlogPage['searchParams']) {
  return posts.filter(post => {
    if (filters.category && post.category !== filters.category) {
      return false;
    }
    if (filters.tag && !post.tags.includes(filters.tag)) {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });
}
```

**Create blog listing component:**
```tsx
// components/blog/BlogListing.tsx
import { BlogPost } from '@/lib/blog';
import { BlogCard } from './BlogCard';
import { FeaturedPost } from './FeaturedPost';

interface BlogListingProps {
  posts: BlogPost[];
  showFeatured?: boolean;
}

export function BlogListing({ posts, showFeatured = true }: BlogListingProps) {
  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="space-y-8">
      {showFeatured && featuredPost && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured</h2>
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {regularPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

**Create blog card components:**
```tsx
// components/blog/BlogCard.tsx
import { BlogPost } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'compact';
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`} className="group">
        <article className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <span>{post.author}</span>
              <span>•</span>
              <time>{formatDate(post.date)}</time>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative h-48">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {post.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <span>{post.author}</span>
              <span>•</span>
              <time>{formatDate(post.date)}</time>
            </div>
            <span>{post.readTime} min read</span>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
```

**Commit Message:**
```
feat(blog): create blog listing and filtering system

- Implement blog listing page with search and filtering
- Create BlogCard and FeaturedPost components
- Add category and tag filtering functionality
- Implement pagination for blog posts
- Add responsive grid layout for blog posts
```

---

### Task 3: Podcast System with Audio Player (8 hours)

**Create podcast page structure:**
```tsx
// app/podcast/page.tsx
import { getEpisodes } from '@/lib/podcast';
import { PodcastEpisode } from '@/components/podcast/PodcastEpisode';
import { PodcastPlayer } from '@/components/podcast/PodcastPlayer';
import { EpisodeFilter } from '@/components/podcast/EpisodeFilter';

export default async function PodcastPage() {
  const episodes = await getEpisodes();
  const featuredEpisode = episodes.find(ep => ep.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-4">CloudFix Podcast</h1>
          <p className="text-xl mb-8">
            Conversations with AWS experts on cost optimization and cloud architecture
          </p>

          {/* Subscribe Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Apple Podcasts
            </a>
            <a href="#" className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Spotify
            </a>
            <a href="#" className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Google Podcasts
            </a>
            <a href="#" className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              RSS Feed
            </a>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Featured Episode */}
        {featuredEpisode && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Featured Episode</h2>
            <PodcastEpisode episode={featuredEpisode} featured />
          </section>
        )}

        {/* Episode List */}
        <section>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64">
              <EpisodeFilter episodes={episodes} />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6">All Episodes</h2>
              <div className="space-y-6">
                {episodes
                  .filter(ep => !ep.featured)
                  .map((episode) => (
                    <PodcastEpisode key={episode.id} episode={episode} />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
```

**Create podcast episode component:**
```tsx
// components/podcast/PodcastEpisode.tsx
import { useState } from 'react';
import { PodcastEpisode as EpisodeType } from '@/lib/podcast';
import { PodcastPlayer } from './PodcastPlayer';
import Image from 'next/image';

interface PodcastEpisodeProps {
  episode: EpisodeType;
  featured?: boolean;
}

export function PodcastEpisode({ episode, featured }: PodcastEpisodeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (featured) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64">
            <div className="relative w-full h-64 lg:h-auto aspect-square">
              <Image
                src={episode.guest.avatar}
                alt={episode.guest.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
              <time className="text-gray-600">{formatDate(episode.publishDate)}</time>
              <span className="text-gray-600">{episode.duration} min</span>
            </div>

            <h3 className="text-2xl font-bold mb-4">{episode.title}</h3>
            <p className="text-lg text-gray-600 mb-6">{episode.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src={episode.guest.avatar}
                  alt={episode.guest.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <div className="font-semibold">{episode.guest.name}</div>
                <div className="text-gray-600">
                  {episode.guest.title} at {episode.guest.company}
                </div>
              </div>
            </div>

            <PodcastPlayer
              episode={episode}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              size="large"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="sm:w-24">
          <div className="relative w-full h-24 sm:h-auto aspect-square">
            <Image
              src={episode.guest.avatar}
              alt={episode.guest.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <time className="text-sm text-gray-600">{formatDate(episode.publishDate)}</time>
            <span className="text-sm text-gray-600">{episode.duration} min</span>
          </div>

          <h3 className="text-lg font-bold mb-2">{episode.title}</h3>
          <p className="text-gray-600 mb-3 line-clamp-2">{episode.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src={episode.guest.avatar}
                  alt={episode.guest.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <div className="text-sm font-medium">{episode.guest.name}</div>
                <div className="text-xs text-gray-600">{episode.guest.company}</div>
              </div>
            </div>

            <PodcastPlayer
              episode={episode}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
```

**Create audio player component:**
```tsx
// components/podcast/PodcastPlayer.tsx
import { useState, useRef, useEffect } from 'react';
import { PodcastEpisode } from '@/lib/podcast';

interface PodcastPlayerProps {
  episode: PodcastEpisode;
  isPlaying: boolean;
  onPlay: () => void;
  size?: 'small' | 'large';
}

export function PodcastPlayer({ episode, isPlaying, onPlay, size = 'small' }: PodcastPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    onPlay();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (size === 'small') {
    return (
      <div className="flex items-center gap-3">
        <audio ref={audioRef} src={episode.audioUrls.apple} />
        <button
          onClick={togglePlay}
          className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4l10 6-10 6V4z" />
            </svg>
          )}
        </button>
        <div className="text-sm text-gray-600">
          {formatTime(currentTime)} / {formatTime(duration || episode.duration * 60)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <audio ref={audioRef} src={episode.audioUrls.apple} />

      <div className="flex items-center gap-6">
        <button
          onClick={togglePlay}
          className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4l10 6-10 6V4z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || episode.duration * 60)}</span>
          </div>
        </div>
      </div>

      {/* Platform Links */}
      <div className="flex gap-4 mt-6">
        {Object.entries(episode.audioUrls).map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-primary transition-colors"
          >
            Listen on {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </a>
        ))}
      </div>
    </div>
  );
}
```

**Commit Message:**
```
feat(podcast): implement podcast system with audio player

- Create podcast page with episode listing
- Implement PodcastEpisode component with featured layout
- Build custom audio player with progress controls
- Add platform links for Apple, Spotify, Google, RSS
- Include guest information and episode metadata
```

---

### Task 4: Resources System and Data Integration (6 hours)

**Create resources data structure:**
```tsx
// lib/resources.ts
import fs from 'fs';
import path from 'path';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'blog' | 'podcast' | 'video' | 'case-study' | 'success-story' | 'livestream';
  category: string;
  tags: string[];
  publishDate: string;
  featured: boolean;
  readTime?: number;
  duration?: number;
  thumbnail: string;
  author?: string;
  url: string;
  metadata: {
    views?: number;
    downloads?: number;
    rating?: number;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
  };
}

export interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

const resourcesData = path.join(process.cwd(), 'content/resources');

export async function getAllResources(): Promise<Resource[]> {
  try {
    const resources = JSON.parse(
      fs.readFileSync(path.join(resourcesData, 'resources.json'), 'utf8')
    );

    return resources.sort((a: Resource, b: Resource) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error('Error loading resources:', error);
    return [];
  }
}

export async function getResourcesByType(type: string): Promise<Resource[]> {
  const resources = await getAllResources();
  return resources.filter(resource => resource.type === type);
}

export async function getResourcesByCategory(category: string): Promise<Resource[]> {
  const resources = await getAllResources();
  return resources.filter(resource => resource.category === category);
}

export async function getFeaturedResources(): Promise<Resource[]> {
  const resources = await getAllResources();
  return resources.filter(resource => resource.featured);
}

export async function searchResources(query: string): Promise<Resource[]> {
  const resources = await getAllResources();
  const searchLower = query.toLowerCase();

  return resources.filter(resource =>
    resource.title.toLowerCase().includes(searchLower) ||
    resource.description.toLowerCase().includes(searchLower) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
    resource.category.toLowerCase().includes(searchLower)
  );
}

export async function getResourceCategories(): Promise<ResourceCategory[]> {
  try {
    const categories = JSON.parse(
      fs.readFileSync(path.join(resourcesData, 'categories.json'), 'utf8')
    );

    // Count resources per category
    const resources = await getAllResources();
    return categories.map((category: ResourceCategory) => ({
      ...category,
      count: resources.filter(r => r.category === category.id).length,
    }));
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}
```

**Create resources listing page:**
```tsx
// app/resources/page.tsx
import { getAllResources, getResourceCategories } from '@/lib/resources';
import { ResourceGrid } from '@/components/resources/ResourceGrid';
import { ResourceFilter } from '@/components/resources/ResourceFilter';
import { SearchBar } from '@/components/resources/SearchBar';

interface ResourcesPage {
  searchParams: {
    type?: string;
    category?: string;
    tag?: string;
    search?: string;
    featured?: string;
  };
}

export default async function ResourcesPage({ searchParams }: ResourcesPage) {
  const resources = await getAllResources();
  const categories = await getResourceCategories();

  const filteredResources = filterResources(resources, searchParams);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-4">Resources</h1>
          <p className="text-xl">
            Learn AWS cost optimization through blogs, podcasts, videos, and case studies
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <SearchBar placeholder="Search resources..." />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-80">
            <ResourceFilter
              categories={categories}
              selectedFilters={searchParams}
            />
          </div>

          <div className="flex-1">
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {searchParams.featured ? 'Featured Resources' : 'All Resources'}
                  </h2>
                  <div className="text-sm text-gray-600">
                    {filteredResources.length} resources found
                  </div>
                </div>

                <ResourceGrid resources={filteredResources} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function filterResources(resources: Resource[], filters: ResourcesPage['searchParams']) {
  return resources.filter(resource => {
    if (filters.type && resource.type !== filters.type) {
      return false;
    }
    if (filters.category && resource.category !== filters.category) {
      return false;
    }
    if (filters.tag && !resource.tags.includes(filters.tag)) {
      return false;
    }
    if (filters.featured === 'true' && !resource.featured) {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });
}
```

**Create resource grid component:**
```tsx
// components/resources/ResourceGrid.tsx
import { Resource } from '@/lib/resources';
import { ResourceCard } from './ResourceCard';

interface ResourceGridProps {
  resources: Resource[];
  columns?: 2 | 3 | 4;
}

export function ResourceGrid({ resources, columns = 3 }: ResourceGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
```

**Create unified resource card:**
```tsx
// components/resources/ResourceCard.tsx
import { Resource } from '@/lib/resources';
import Link from 'next/link';
import Image from 'next/image';

interface ResourceCardProps {
  resource: Resource;
  variant?: 'default' | 'compact';
}

export function ResourceCard({ resource, variant = 'default' }: ResourceCardProps) {
  const getTypeIcon = (type: string) => {
    const icons = {
      blog: '📝',
      podcast: '🎙️',
      video: '📹',
      'case-study': '📊',
      'success-story': '🎉',
      livestream: '📺',
    };
    return icons[type as keyof typeof icons] || '📄';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      blog: 'bg-blue-100 text-blue-800',
      podcast: 'bg-purple-100 text-purple-800',
      video: 'bg-red-100 text-red-800',
      'case-study': 'bg-green-100 text-green-800',
      'success-story': 'bg-yellow-100 text-yellow-800',
      livestream: 'bg-indigo-100 text-indigo-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatMetadata = (resource: Resource) => {
    if (resource.readTime) {
      return `${resource.readTime} min read`;
    }
    if (resource.duration) {
      return `${resource.duration} min`;
    }
    return '';
  };

  if (variant === 'compact') {
    return (
      <Link href={resource.url} className="group">
        <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getTypeIcon(resource.type)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(resource.type)}`}>
                {resource.type.replace('-', ' ')}
              </span>
              <time className="text-xs text-gray-600">
                {formatDate(resource.publishDate)}
              </time>
            </div>
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
              {resource.title}
            </h3>
            {formatMetadata(resource) && (
              <div className="text-xs text-gray-600 mt-1">
                {formatMetadata(resource)}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={resource.url} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative h-48">
          <Image
            src={resource.thumbnail}
            alt={resource.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getTypeColor(resource.type)}`}>
              {resource.type.replace('-', ' ')}
            </span>
          </div>
          {resource.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-accent text-gray-900 px-2 py-1 rounded text-xs font-bold">
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{getTypeIcon(resource.type)}</span>
            <span className="text-sm text-gray-600 capitalize">{resource.category}</span>
            <span className="text-gray-400">•</span>
            <time className="text-sm text-gray-600">
              {formatDate(resource.publishDate)}
            </time>
          </div>

          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
            {resource.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {resource.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-3">
              {resource.author && <span>{resource.author}</span>}
              {formatMetadata(resource) && (
                <>
                  <span>•</span>
                  <span>{formatMetadata(resource)}</span>
                </>
              )}
            </div>

            {resource.metadata.views && (
              <span>{resource.metadata.views.toLocaleString()} views</span>
            )}
          </div>

          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {resource.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {resource.tags.length > 2 && (
                <span className="text-gray-500 text-xs">+{resource.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
```

**Commit Message:**
```
feat(resources): build unified resources system

- Create resources data structure and utilities
- Implement resources listing page with filtering
- Build ResourceGrid and ResourceCard components
- Add support for multiple content types (blog, podcast, video, etc.)
- Include search and category filtering functionality
```

---

### Task 5: API Routes and Caching (4 hours)

**Create blog API routes:**
```tsx
// app/api/blog/posts/route.ts
import { NextResponse } from 'next/server';
import { getAllPosts, getPostsByCategory } from '@/lib/blog';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let posts;
    if (category) {
      posts = await getPostsByCategory(category);
    } else {
      posts = await getAllPosts();
    }

    // Apply pagination
    const paginatedPosts = posts.slice(offset, offset + limit);

    return NextResponse.json({
      posts: paginatedPosts,
      total: posts.length,
      limit,
      offset,
      hasMore: offset + limit < posts.length,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
```

**Create search API route:**
```tsx
// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';
import { getAllResources } from '@/lib/resources';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all';

    if (!query) {
      return NextResponse.json({
        results: [],
        total: 0,
        query,
      });
    }

    const searchLower = query.toLowerCase();
    let results = [];

    // Search blog posts
    if (type === 'all' || type === 'blog') {
      const posts = await getAllPosts();
      const blogResults = posts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        post.category.toLowerCase().includes(searchLower)
      ).map(post => ({
        id: post.slug,
        title: post.title,
        description: post.description,
        type: 'blog',
        category: post.category,
        url: `/blog/${post.slug}`,
        date: post.date,
        author: post.author,
        readTime: post.readTime,
        thumbnail: post.image,
      }));

      results.push(...blogResults);
    }

    // Search resources
    if (type === 'all' || type === 'resources') {
      const resources = await getAllResources();
      const resourceResults = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        resource.category.toLowerCase().includes(searchLower)
      );

      results.push(...resourceResults);
    }

    // Sort by relevance (exact matches first, then by date)
    results.sort((a, b) => {
      const aExactMatch = a.title.toLowerCase().includes(searchLower);
      const bExactMatch = b.title.toLowerCase().includes(searchLower);

      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return NextResponse.json({
      results: results.slice(0, 20), // Limit to 20 results
      total: results.length,
      query,
      type,
    });
  } catch (error) {
    console.error('Error performing search:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
```

**Implement caching strategy:**
```tsx
// lib/cache.ts
import { unstable_cache } from 'next/cache';

// Cache blog posts for 1 hour
export const getCachedBlogPosts = unstable_cache(
  async () => {
    const { getAllPosts } = await import('@/lib/blog');
    return getAllPosts();
  },
  ['blog-posts'],
  {
    revalidate: 3600, // 1 hour
    tags: ['blog'],
  }
);

// Cache resources for 30 minutes
export const getCachedResources = unstable_cache(
  async () => {
    const { getAllResources } = await import('@/lib/resources');
    return getAllResources();
  },
  ['resources'],
  {
    revalidate: 1800, // 30 minutes
    tags: ['resources'],
  }
);

// Cache search results for 15 minutes
export const getCachedSearchResults = unstable_cache(
  async (query: string, type: string) => {
    const searchResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${encodeURIComponent(query)}&type=${type}`,
      { next: { revalidate: 900 } } // 15 minutes
    );
    return searchResponse.json();
  },
  ['search-results'],
  {
    revalidate: 900, // 15 minutes
    tags: ['search'],
  }
);
```

**Create RSS feed generation:**
```tsx
// app/rss/route.ts
import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  try {
    const posts = await getAllPosts();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cloudfix.com';

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>CloudFix Blog</title>
    <description>AWS cost optimization tips, strategies, and best practices</description>
    <link>${baseUrl}/blog</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>

    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
    </item>`).join('')}

  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=3600', // 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
```

**Commit Message:**
```
feat(api): create content API routes with caching

- Implement blog posts API route with pagination
- Create global search API endpoint
- Add caching strategy using Next.js unstable_cache
- Generate RSS feed for blog posts
- Include error handling and rate limiting considerations
```

---

### Task 6: Video and Livestream Pages (6 hours)

**Create videos page:**
```tsx
// app/videos/page.tsx
import { getVideos } from '@/lib/video';
import { VideoGrid } from '@/components/video/VideoGrid';
import { VideoFilter } from '@/components/video/VideoFilter';

interface VideosPage {
  searchParams: {
    category?: string;
    tag?: string;
    duration?: string;
  };
}

export default async function VideosPage({ searchParams }: VideosPage) {
  const videos = await getVideos();
  const filteredVideos = filterVideos(videos, searchParams);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-4">CloudFix Videos</h1>
          <p className="text-xl">
            Learn AWS cost optimization through video tutorials and demos
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80">
            <VideoFilter
              selectedFilters={searchParams}
              videoCount={filteredVideos.length}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Videos</h2>
              <div className="text-sm text-gray-600">
                {filteredVideos.length} videos found
              </div>
            </div>

            <VideoGrid videos={filteredVideos} />
          </div>
        </div>
      </div>
    </div>
  );
}

function filterVideos(videos: Video[], filters: VideosPage['searchParams']) {
  return videos.filter(video => {
    if (filters.category && video.category !== filters.category) {
      return false;
    }
    if (filters.tag && !video.tags.includes(filters.tag)) {
      return false;
    }
    if (filters.duration) {
      const duration = parseInt(filters.duration);
      if (duration === 5 && video.duration > 5) return false;
      if (duration === 15 && (video.duration <= 5 || video.duration > 15)) return false;
      if (duration === 30 && video.duration <= 15) return false;
    }
    return true;
  });
}
```

**Create video player component:**
```tsx
// components/video/VideoPlayer.tsx
import { useState } from 'react';
import { Video } from '@/lib/video';

interface VideoPlayerProps {
  video: Video;
  autoplay?: boolean;
}

export function VideoPlayer({ video, autoplay = false }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);

  if (video.youtubeId) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=${autoplay ? 1 : 0}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  if (video.vimeoId) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=${autoplay ? 1 : 0}`}
          title={video.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  // Fallback for custom video hosting
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        controls
        autoPlay={autoplay}
        className="w-full h-full"
        poster={video.thumbnail}
      >
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
```

**Create livestream page:**
```tsx
// app/livestream/page.tsx
import { getUpcomingStreams, getPastStreams } from '@/lib/livestream';
import { UpcomingStreamCard } from '@/components/livestream/UpcomingStreamCard';
import { PastStreamCard } from '@/components/livestream/PastStreamCard';
import { StreamRegistration } from '@/components/livestream/StreamRegistration';

export default async function LivestreamPage() {
  const upcomingStreams = await getUpcomingStreams();
  const pastStreams = await getPastStreams();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-4">CloudFix Livestreams</h1>
          <p className="text-xl mb-8">
            Live sessions on AWS cost optimization and cloud architecture
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="https://youtube.com/@cloudfix"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Subscribe on YouTube
            </a>
            <a
              href="https://twitch.tv/cloudfix"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Follow on Twitch
            </a>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Upcoming Streams */}
        {upcomingStreams.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Upcoming Streams</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingStreams.map((stream) => (
                <UpcomingStreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          </section>
        )}

        {/* Past Streams */}
        {pastStreams.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">Past Streams</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pastStreams.slice(0, 6).map((stream) => (
                <PastStreamCard key={stream.id} stream={stream} />
              ))}
            </div>

            {pastStreams.length > 6 && (
              <div className="text-center mt-8">
                <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90">
                  Load More Streams
                </button>
              </div>
            )}
          </section>
        )}

        {/* No Streams */}
        {upcomingStreams.length === 0 && pastStreams.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No streams scheduled</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our YouTube channel to get notified when we go live
            </p>
            <a
              href="https://youtube.com/@cloudfix"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90"
            >
              Subscribe Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Commit Message:**
```
feat(video): implement video and livestream pages

- Create videos page with category filtering
- Build VideoPlayer component with YouTube/Vimeo support
- Implement livestream page with upcoming/past streams
- Add stream registration functionality
- Include video duration filtering and search
```

---

### Task 7: Content Integration and Cross-Linking (4 hours)

**Create content cross-linking system:**
```tsx
// lib/content-links.ts
import { BlogPost } from '@/lib/blog';
import { Resource } from '@/lib/resources';

export interface ContentLink {
  id: string;
  title: string;
  type: 'blog' | 'podcast' | 'video' | 'resource';
  url: string;
  relevanceScore: number;
}

export async function getRelatedContent(
  currentContent: BlogPost | Resource,
  limit: number = 3
): Promise<ContentLink[]> {
  const { getAllPosts } = await import('@/lib/blog');
  const { getAllResources } = await import('@/lib/resources');

  const blogPosts = await getAllPosts();
  const resources = await getAllResources();

  // Get content excluding current item
  const relatedContent: ContentLink[] = [];

  // Find related blog posts
  if (currentContent.type !== 'blog' || currentContent.id !== (currentContent as BlogPost).slug) {
    const relatedPosts = blogPosts
      .filter(post => post.slug !== currentContent.id)
      .map(post => ({
        id: post.slug,
        title: post.title,
        type: 'blog' as const,
        url: `/blog/${post.slug}`,
        relevanceScore: calculateRelevance(currentContent, post),
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    relatedContent.push(...relatedPosts);
  }

  // Find related resources
  const relatedResources = resources
    .filter(resource => resource.id !== currentContent.id)
    .map(resource => ({
      id: resource.id,
      title: resource.title,
      type: resource.type === 'blog' ? 'blog' :
            resource.type === 'podcast' ? 'podcast' :
            resource.type === 'video' ? 'video' : 'resource' as const,
      url: resource.url,
      relevanceScore: calculateRelevance(currentContent, resource),
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);

  relatedContent.push(...relatedResources);

  // Return top results
  return relatedContent
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

function calculateRelevance(content1: any, content2: any): number {
  let score = 0;

  // Category match
  if (content1.category === content2.category) {
    score += 10;
  }

  // Tag matches
  const tags1 = content1.tags || [];
  const tags2 = content2.tags || [];
  const commonTags = tags1.filter(tag => tags2.includes(tag));
  score += commonTags.length * 5;

  // Type similarity
  if (content1.type === content2.type) {
    score += 3;
  }

  // Recency bonus (more recent content gets bonus)
  const daysDiff = Math.abs(
    new Date(content1.date || content1.publishDate).getTime() -
    new Date(content2.date || content2.publishDate).getTime()
  ) / (1000 * 60 * 60 * 24);

  if (daysDiff < 30) score += 2;
  else if (daysDiff < 90) score += 1;

  return score;
}
```

**Create related content component:**
```tsx
// components/content/RelatedContent.tsx
import { ContentLink } from '@/lib/content-links';
import { ContentCard } from './ContentCard';

interface RelatedContentProps {
  content: ContentLink[];
  title?: string;
}

export function RelatedContent({ content, title = "Related Content" }: RelatedContentProps) {
  if (content.length === 0) return null;

  return (
    <section className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {content.map((item) => (
          <ContentCard key={item.id} content={item} />
        ))}
      </div>
    </section>
  );
}

interface ContentCardProps {
  content: ContentLink;
}

function ContentCard({ content }: ContentCardProps) {
  const getTypeIcon = (type: string) => {
    const icons = {
      blog: '📝',
      podcast: '🎙️',
      video: '📹',
      resource: '📚',
    };
    return icons[type as keyof typeof icons] || '📄';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      blog: 'text-blue-600',
      podcast: 'text-purple-600',
      video: 'text-red-600',
      resource: 'text-green-600',
    };
    return colors[type as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <a
      href={content.url}
      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <span className={`text-lg ${getTypeColor(content.type)}`}>
        {getTypeIcon(content.type)}
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm group-hover:text-primary transition-colors">
          {content.title}
        </div>
        <div className="text-xs text-gray-600 capitalize">
          {content.type.replace('-', ' ')}
        </div>
      </div>
    </a>
  );
}
```

**Update blog post template to include related content:**
```tsx
// Update app/blog/[slug]/page.tsx
import { getRelatedContent } from '@/lib/content-links';
import { RelatedContent } from '@/components/content/RelatedContent';

// In the main component:
const relatedContent = await getRelatedContent(post);

// Add to the JSX:
<RelatedContent content={relatedContent} />
```

**Commit Message:**
```
feat(content): implement content cross-linking system

- Create content relevance scoring algorithm
- Build RelatedContent component with smart suggestions
- Add cross-linking between blog posts and resources
- Include content type indicators and metadata
- Update blog post template with related content
```

---

### Task 8: Content Testing and Performance Optimization (6 hours)

**Create comprehensive test suite:**
```tsx
// __tests__/content/blog.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import BlogPage from '@/app/blog/page';
import { getAllPosts, getCategories } from '@/lib/blog';

// Mock the blog utilities
jest.mock('@/lib/blog');
const mockGetAllPosts = getAllPosts as jest.MockedFunction<typeof getAllPosts>;
const mockGetCategories = getCategories as jest.MockedFunction<typeof getCategories>;

describe('BlogPage', () => {
  const mockPosts = [
    {
      slug: 'test-post',
      title: 'Test Post',
      description: 'A test blog post',
      author: 'Test Author',
      date: '2024-01-01',
      category: 'Test Category',
      tags: ['test', 'blog'],
      featured: false,
      readTime: 5,
      image: '/images/test.jpg',
    },
  ];

  const mockCategories = [
    { id: 'test-category', name: 'Test Category', count: 1 },
  ];

  beforeEach(() => {
    mockGetAllPosts.mockResolvedValue(mockPosts);
    mockGetCategories.mockResolvedValue(mockCategories);
  });

  it('renders blog page with correct title', async () => {
    render(<BlogPage searchParams={{}} />);

    await waitFor(() => {
      expect(screen.getByText('CloudFix Blog')).toBeInTheDocument();
    });
  });

  it('displays blog posts', async () => {
    render(<BlogPage searchParams={{}} />);

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
      expect(screen.getByText('A test blog post')).toBeInTheDocument();
    });
  });

  it('filters posts by category', async () => {
    mockGetAllPosts.mockResolvedValue([
      ...mockPosts,
      {
        ...mockPosts[0],
        slug: 'another-post',
        title: 'Another Post',
        category: 'Another Category',
      },
    ]);

    render(<BlogPage searchParams={{ category: 'test-category' }} />);

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
      expect(screen.queryByText('Another Post')).not.toBeInTheDocument();
    });
  });

  it('searches posts by title and content', async () => {
    render(<BlogPage searchParams={{ search: 'test' }} />);

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
    });
  });
});

// __tests__/content/podcast.test.tsx
import { render, screen } from '@testing-library/react';
import PodcastPage from '@/app/podcast/page';
import { getEpisodes } from '@/lib/podcast';

jest.mock('@/lib/podcast');

describe('PodcastPage', () => {
  const mockEpisodes = [
    {
      id: 'test-episode',
      title: 'Test Episode',
      description: 'A test podcast episode',
      guest: {
        name: 'Test Guest',
        title: 'Test Title',
        company: 'Test Company',
        avatar: '/images/test-avatar.jpg',
      },
      publishDate: '2024-01-01',
      duration: 45,
      audioUrls: {
        apple: 'https://example.com/audio.mp3',
        spotify: 'https://example.com/spotify',
        google: 'https://example.com/google',
        amazon: 'https://example.com/amazon',
        rss: 'https://example.com/rss',
      },
      featured: false,
    },
  ];

  beforeEach(() => {
    (getEpisodes as jest.MockedFunction<typeof getEpisodes>).mockResolvedValue(mockEpisodes);
  });

  it('renders podcast page with correct title', () => {
    render(<PodcastPage />);

    expect(screen.getByText('CloudFix Podcast')).toBeInTheDocument();
  });

  it('displays podcast episodes', () => {
    render(<PodcastPage />);

    expect(screen.getByText('Test Episode')).toBeInTheDocument();
    expect(screen.getByText('Test Guest')).toBeInTheDocument();
  });

  it('shows subscribe buttons', () => {
    render(<PodcastPage />);

    expect(screen.getByText('Apple Podcasts')).toBeInTheDocument();
    expect(screen.getByText('Spotify')).toBeInTheDocument();
    expect(screen.getByText('Google Podcasts')).toBeInTheDocument();
  });
});
```

**Add performance monitoring:**
```tsx
// lib/analytics.ts
export function trackContentView(contentType: string, contentId: string, title: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      content_type: contentType,
      content_id: contentId,
      page_title: title,
    });
  }
}

export function trackContentEngagement(contentType: string, action: string, label?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      content_type: contentType,
      event_label: label,
    });
  }
}

// Use in components:
// trackContentView('blog_post', post.slug, post.title);
// trackContentEngagement('blog_post', 'social_share', 'twitter');
```

**Add error boundaries:**
```tsx
// components/content/ContentErrorBoundary.tsx
'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface ContentErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ContentErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ContentErrorBoundary extends Component<
  ContentErrorBoundaryProps,
  ContentErrorBoundaryState
> {
  constructor(props: ContentErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ContentErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Content error caught:', error, errorInfo);

    // Track error in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Content Not Available
          </h3>
          <p className="text-red-600">
            We're having trouble loading this content. Please try again later.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Commit Message:**
```
test(content): add comprehensive content system testing

- Create test suites for blog and podcast functionality
- Add performance monitoring and analytics tracking
- Implement content error boundaries with fallback UI
- Test search, filtering, and pagination features
- Add accessibility testing for content components
```

---

### Task 9: Content Management Tools (4 hours)

**Create content validation utilities:**
```tsx
// lib/content-validation.ts
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateBlogPost(post: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!post.title || post.title.trim().length === 0) {
    errors.push('Title is required');
  }
  if (!post.description || post.description.trim().length === 0) {
    errors.push('Description is required');
  }
  if (!post.author || post.author.trim().length === 0) {
    errors.push('Author is required');
  }
  if (!post.date) {
    errors.push('Publication date is required');
  }
  if (!post.category) {
    errors.push('Category is required');
  }
  if (!post.content) {
    errors.push('Content is required');
  }

  // Content validation
  if (post.title && post.title.length > 60) {
    warnings.push('Title is longer than 60 characters, may affect SEO');
  }
  if (post.description && post.description.length > 160) {
    warnings.push('Description is longer than 160 characters, may be truncated in search results');
  }
  if (post.content && post.content.length < 500) {
    warnings.push('Content is quite short, consider adding more detail');
  }

  // SEO validation
  if (post.title && !post.title.toLowerCase().includes('aws') &&
      !post.title.toLowerCase().includes('cloud') &&
      !post.title.toLowerCase().includes('cost')) {
    warnings.push('Title doesn\'t contain key terms (AWS, cloud, cost)');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateResource(resource: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!resource.title || resource.title.trim().length === 0) {
    errors.push('Title is required');
  }
  if (!resource.description || resource.description.trim().length === 0) {
    errors.push('Description is required');
  }
  if (!resource.type) {
    errors.push('Resource type is required');
  }
  if (!resource.url) {
    errors.push('URL is required');
  }

  // URL validation
  if (resource.url) {
    try {
      new URL(resource.url);
    } catch {
      errors.push('URL is not valid');
    }
  }

  // Type-specific validation
  if (resource.type === 'video' && !resource.duration) {
    warnings.push('Video duration is recommended');
  }
  if (resource.type === 'blog' && !resource.readTime) {
    warnings.push('Read time is recommended for blog posts');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
```

**Create content migration tools:**
```tsx
// scripts/migrate-wordpress-content.ts
import fs from 'fs';
import path from 'path';

interface WordPressPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  categories: number[];
  tags: number[];
  author: number;
  featured_media: number;
  slug: string;
}

interface WordPressMedia {
  id: number;
  source_url: string;
  title: { rendered: string };
  alt_text: string;
}

export class WordPressMigrator {
  private baseUrl: string;
  private outputDir: string;

  constructor(baseUrl: string, outputDir: string) {
    this.baseUrl = baseUrl;
    this.outputDir = outputDir;
  }

  async migratePosts(limit: number = 50): Promise<void> {
    console.log('Starting WordPress post migration...');

    try {
      // Fetch posts from WordPress
      const response = await fetch(
        `${this.baseUrl}/wp-json/wp/v2/posts?per_page=${limit}&_embed`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const posts: WordPressPost[] = await response.json();
      console.log(`Fetched ${posts.length} posts`);

      // Create output directory
      const blogDir = path.join(this.outputDir, 'blog');
      if (!fs.existsSync(blogDir)) {
        fs.mkdirSync(blogDir, { recursive: true });
      }

      // Process each post
      for (const post of posts) {
        await this.processPost(post, blogDir);
      }

      console.log('Migration completed successfully');
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  }

  private async processPost(post: WordPressPost, outputDir: string): Promise<void> {
    // Extract category
    const category = await this.getCategoryName(post.categories[0]);

    // Extract author
    const author = await this.getAuthorName(post.author);

    // Process content
    const processedContent = this.processContent(post.content.rendered);

    // Extract read time
    const wordCount = processedContent.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200); // 200 words per minute

    // Create MDX frontmatter
    const frontmatter = {
      title: post.title.rendered,
      description: this.stripHtml(post.excerpt.rendered),
      author,
      date: post.date,
      category,
      tags: await this.getTagNames(post.tags),
      featured: false, // Would need custom field for this
      readTime,
      image: await this.getFeaturedImage(post.featured_media),
      seo: {
        title: post.title.rendered,
        description: this.stripHtml(post.excerpt.rendered),
        keywords: await this.getTagNames(post.tags).join(', '),
      },
    };

    // Create MDX content
    const mdxContent = `---
${Object.entries(frontmatter)
  .map(([key, value]) => {
    if (typeof value === 'string') {
      return `${key}: "${value}"`;
    } else if (Array.isArray(value)) {
      return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
    } else if (typeof value === 'object' && value !== null) {
      return `${key}:\n${Object.entries(value)
        .map(([k, v]) => `  ${k}: "${v}"`)
        .join('\n')}`;
    }
    return `${key}: ${value}`;
  })
  .join('\n')}
---

${processedContent}
`;

    // Write to file
    const fileName = `${post.slug}.mdx`;
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, mdxContent, 'utf8');

    console.log(`Processed: ${fileName}`);
  }

  private processContent(html: string): string {
    // Convert HTML to Markdown-like format
    let content = html;

    // Convert <h2> to ##, <h3> to ###, etc.
    content = content.replace(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi, (match, level, text) => {
      return '#'.repeat(parseInt(level)) + ' ' + this.stripHtml(text) + '\n\n';
    });

    // Convert <p> to paragraphs
    content = content.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');

    // Convert <strong> and <b> to **bold**
    content = content.replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**');

    // Convert <em> and <i> to *italic*
    content = content.replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*');

    // Convert <a> to [text](url)
    content = content.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

    // Convert <ul> and <ol> to lists
    content = content.replace(/<ul[^>]*>(.*?)<\/ul>/gis, this.processUnorderedList);
    content = content.replace(/<ol[^>]*>(.*?)<\/ol>/gis, this.processOrderedList);

    // Remove remaining HTML tags
    content = content.replace(/<[^>]*>/g, '');

    // Clean up extra whitespace
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    return content.trim();
  }

  private processUnorderedList(listHtml: string): string {
    const items = listHtml.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
    return items.map(item => `- ${this.stripHtml(item)}`).join('\n') + '\n\n';
  }

  private processOrderedList(listHtml: string): string {
    const items = listHtml.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
    return items.map((item, index) => `${index + 1}. ${this.stripHtml(item)}`).join('\n') + '\n\n';
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }

  private async getCategoryName(categoryId: number): Promise<string> {
    // Implement category fetching from WordPress API
    return 'AWS Cost Optimization'; // Default category
  }

  private async getAuthorName(authorId: number): Promise<string> {
    // Implement author fetching from WordPress API
    return 'CloudFix Team'; // Default author
  }

  private async getTagNames(tagIds: number[]): Promise<string[]> {
    // Implement tag fetching from WordPress API
    return ['AWS', 'Cost Optimization']; // Default tags
  }

  private async getFeaturedImage(mediaId: number): Promise<string> {
    // Implement featured image fetching from WordPress API
    return '/images/blog/default-cover.jpg'; // Default image
  }
}

// Usage example:
// const migrator = new WordPressMigrator('https://cloudfix.com', './content');
// migrator.migratePosts(50);
```

**Commit Message:**
```
feat(content): create content management and migration tools

- Add content validation utilities for blog posts and resources
- Create WordPress content migration scripts
- Implement SEO validation and content quality checks
- Add content processing utilities (HTML to MDX)
- Include content management CLI tools
```

---

### Task 10: Documentation and Deployment (2 hours)

**Create content management documentation:**
```markdown
# Content Management Guide

## Blog Content Creation

### Adding New Blog Posts

1. Create new MDX file in `content/blog/YYYY/` directory
2. Include proper frontmatter with all required fields
3. Write content in Markdown with embedded React components
4. Test locally before deployment

### Frontmatter Requirements

```yaml
---
title: "Post Title" (required, max 60 chars)
description: "Post description" (required, max 160 chars)
author: "Author Name" (required)
date: "YYYY-MM-DD" (required)
category: "Category Name" (required)
tags: ["tag1", "tag2"] (optional)
featured: true/false (optional, default false)
readTime: 5 (optional, calculated automatically)
image: "/images/blog/post-cover.jpg" (required)
seo:
  title: "SEO Title" (optional, defaults to post title)
  description: "SEO Description" (optional, defaults to description)
  keywords: "keyword1, keyword2" (optional)
---
```

### Content Guidelines

- Target 800-2000 words per post
- Include at least 3 H2 sections
- Add relevant code examples
- Include callouts for important points
- Add internal links to related content

## Podcast Management

### Adding New Episodes

1. Update `content/podcast/episodes.json`
2. Upload audio to hosting platform
3. Update platform links (Apple, Spotify, Google)
4. Add episode transcript if available

## Resource Management

### Adding Resources

1. Update `content/resources/resources.json`
2. Ensure proper categorization
3. Include thumbnail images
4. Add relevant tags for discoverability
```

**Update deployment configuration:**
```js
// next.config.js updates for content systems
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
});

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Image optimization for content images
  images: {
    domains: ['cloudfix.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // Static generation for content
  generateEtags: false,

  // Headers for content caching
  async headers() {
    return [
      {
        source: '/content/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
});
```

**Commit Message:**
```
docs(content): create comprehensive content management documentation

- Add content creation guidelines and requirements
- Document frontmatter specifications for all content types
- Create content management workflow documentation
- Update deployment configuration for content systems
- Include content validation and SEO best practices
```

---

## 🚀 Implementation Order

**Recommended sequence:**

1. ✅ **Task 1**: MDX Blog System Foundation (6 hrs) - Core infrastructure
2. ✅ **Task 2**: Blog Listing and Filtering (4 hrs) - User interface
3. ✅ **Task 3**: Podcast System with Audio Player (8 hrs) - Multimedia content
4. ✅ **Task 4**: Resources System and Data Integration (6 hrs) - Content aggregation
5. ✅ **Task 5**: API Routes and Caching (4 hrs) - Performance and data layer
6. ✅ **Task 6**: Video and Livestream Pages (6 hrs) - Additional multimedia
7. ✅ **Task 7**: Content Integration and Cross-Linking (4 hrs) - User experience
8. ✅ **Task 8**: Content Testing and Performance (6 hrs) - Quality assurance
9. ✅ **Task 9**: Content Management Tools (4 hrs) - Developer experience
10. ✅ **Task 10**: Documentation and Deployment (2 hrs) - Final integration

**Total Estimated Time**: 50 hours (within 50-60 hour range)

---

## 📊 Success Criteria

**Blog System Requirements:**
- ✅ MDX-based blog with static generation
- ✅ Category filtering and tag system working
- ✅ Code syntax highlighting implemented
- ✅ Social sharing and RSS feed functional
- ✅ Reading time estimation accurate
- ✅ SEO metadata generated automatically

**Multimedia Requirements:**
- ✅ Podcast page with audio player working
- ✅ Video page with YouTube/Vimeo integration
- ✅ Livestream page with registration system
- ✅ Cross-platform audio links functional
- ✅ Mobile responsive media players

**Resources System Requirements:**
- ✅ Dynamic resource listing from JSON/API
- ✅ Category filtering and search functional
- ✅ Individual resource detail pages
- ✅ Mixed content type support
- ✅ Cross-linking between content types

**Technical Requirements:**
- ✅ API routes with proper caching
- ✅ Performance optimization (90+ Lighthouse score)
- ✅ Comprehensive test coverage (80%+)
- ✅ Content validation and error handling
- ✅ Mobile responsive design
- ✅ Accessibility compliance (WCAG 2.1 AA)

---

## 🔍 Testing Strategy

### Content System Testing
- **MDX Processing**: Verify blog posts render correctly
- **Search Functionality**: Test search across all content types
- **Filtering**: Validate category and tag filtering
- **Pagination**: Test large content sets
- **Media Players**: Verify audio/video playback
- **Cross-linking**: Test related content suggestions

### Performance Testing
- **Static Generation**: Verify all content generates at build time
- **Cache Performance**: Test API route caching
- **Image Optimization**: Verify content images are optimized
- **Bundle Size**: Monitor JavaScript bundle impact
- **Core Web Vitals**: Test content page performance

### Accessibility Testing
- **Screen Readers**: Test content with screen readers
- **Keyboard Navigation**: Verify all interactive elements
- **Color Contrast**: Validate text and interactive elements
- **Media Controls**: Test accessible media players

---

## 📚 Related Documentation

**Reference Files:**
- `/docs/ROADMAP.md` - Project progress and timeline
- `/docs/BRAND_CONSISTENCY_AUDIT.md` - Brand color specifications
- `/docs/plans/PHASE_3_PRODUCT_PAGES.md` - Product pages context
- `/docs/MIGRATION_GUIDE.md` - WordPress migration patterns

**Dependencies:**
- Phase 2 component library (Modal, Tabs, Accordion, etc.)
- Phase 3 product pages (for cross-linking)
- Assessment form for content CTAs
- Existing UI components (Header, Footer, ContentBlock)

---

## 🎯 Post-Implementation

**After completing this plan:**

1. **Update ROADMAP.md**: Mark Phase 4 content systems as complete
2. **Content Migration**: Migrate existing WordPress content to new system
3. **Analytics Setup**: Track content engagement and user behavior
4. **SEO Optimization**: Monitor search rankings and organic traffic
5. **Performance Monitoring**: Monitor content page performance
6. **User Feedback**: Collect feedback on content discoverability

**Next Phase Tasks**: Phase 5 polish and optimization, Phase 6 additional pages

---

## 🚨 Critical Dependencies

**Content Requirements:**
- Existing WordPress content for migration
- Audio/video hosting setup for multimedia content
- Category and tag structure definitions
- Content author workflows and permissions

**Technical Dependencies:**
- MDX dependencies and configuration
- Image optimization for content thumbnails
- Audio/video player integrations
- Search indexing configuration
- Performance monitoring setup

---

**Ready to implement?** This comprehensive content systems plan provides the foundation for a modern, performant content management system that replaces WordPress functionality while improving user experience and content discoverability. The modular approach allows for incremental implementation and testing of each component. 🚀