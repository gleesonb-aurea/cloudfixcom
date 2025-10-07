// ABOUTME: Blog post detail page rendering MDX content with TOC
// ABOUTME: Includes structured data, related posts, and social sharing
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import TableOfContents from '@/components/blog/TableOfContents';
import { slugify } from '@/lib/utils';
import { BlogCard } from '@/components/blog/BlogCard';
import type { Metadata } from 'next';
import { SocialShare } from '@/components/blog/SocialShare';
import Link from 'next/link';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  // Map headings to include ids in rendered HTML so TOC anchors work
  const components = {
    h2: (props: any) => {
      const text = String(props.children ?? '');
      const id = slugify(text);
      return <h2 id={id} {...props} />;
    },
    h3: (props: any) => {
      const text = String(props.children ?? '');
      const id = slugify(text);
      return <h3 id={id} {...props} />;
    },
  } as any;

  // Related posts (same category or overlapping tags)
  const allPosts = await getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags?.some((t) => post.tags?.includes(t))))
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      <article className="max-w-5xl mx-auto py-12 px-4">
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title,
              datePublished: post.date,
              author: { '@type': 'Person', name: post.author },
              description: post.description,
              image: post.image ? [post.image] : undefined,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://cloudfix.com/blog/${post.slug}`,
              },
            }),
          }}
        />
        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Link href={`/blog/category/${encodeURIComponent(post.category)}`} className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {post.category}
            </Link>
            {post.tags?.map((t) => (
              <Link key={t} href={`/blog/tag/${encodeURIComponent(t)}`} className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">
                #{t}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
          <p className="text-gray-600 mt-2">{post.description}</p>
          <div className="mt-3 text-sm text-gray-500 flex items-center gap-3">
            <span>{post.author}</span>
            <span>•</span>
            <time>{new Date(post.date).toLocaleDateString()}</time>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>
        </header>
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 prose prose-gray max-w-none">
            {/* MDX content (RSC-compatible MDXRemote) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <MDXRemote source={post.content} components={components} />
          </div>
          <div className="lg:col-span-1">
            <TableOfContents content={post.content} />
          </div>
        </div>
        <SocialShare url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`} title={post.title} />
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <BlogCard key={r.slug} post={r} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.description,
    keywords: post.seo?.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : undefined,
    },
  };
}
