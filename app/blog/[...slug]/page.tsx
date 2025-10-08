// ABOUTME: Individual blog post page for nested slugs (categories)
// ABOUTME: Uses ISR with on-demand generation for efficient build performance
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXImage from '@/components/mdx/MDXImage';
import { H2, H3 } from '@/components/mdx/Heading';
import { extractTocFromMdx } from '@/lib/toc';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600; // 1 hour ISR for blog posts
// Dynamic rendering with ISR; we intentionally avoid full pre-rendering
// to keep build memory low and tolerate legacy MDX content.

interface BlogPostPageProps {
  params: {
    slug: string[];
  };
}

// ABOUTME: Posts are generated on-demand with ISR to reduce build memory usage.

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = params;
  const slugString = slug.join('/');
  const post = await getPostBySlug(slugString);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudfix.com';

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.description,
    keywords: post.seo?.keywords?.join(', ') || post.tags?.join(', '),
    alternates: { canonical: `${siteUrl}/blog/${slugString}` },
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        { url: `${siteUrl}/og/blog?slug=${encodeURIComponent(slugString)}`, alt: post.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.description,
      images: [`${siteUrl}/og/blog?slug=${encodeURIComponent(slugString)}`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const slugString = slug.join('/');
  const post = await getPostBySlug(slugString);

  if (!post) {
    notFound();
  }

  const toc = post ? extractTocFromMdx(post.content) : [];

  return (
    <div className="min-h-screen">
      <article className="max-w-4xl mx-auto py-12 px-4">
        <header className="mb-8">
          <div className="mb-4">
            <Link
              href="/blog"
              className="text-primary hover:underline text-sm"
            >
              ← Back to Blog
            </Link>
          </div>

          <div className="text-primary font-semibold mb-2">
            {post.category}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {post.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-3">
              <span>{post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {post.image && (
            <div className="relative h-64 md:h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {toc.length > 0 && (
          <nav aria-label="Table of contents" className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-2 text-sm font-semibold tracking-wide text-gray-700">On this page</div>
            <ul className="space-y-1 text-sm">
              {toc.map((item) => (
                <li key={item.id} className={item.depth === 3 ? 'ml-4' : ''}>
                  <a href={`#${item.id}`} className="text-gray-700 hover:text-primary">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24">
          <MDXRemote
            source={post.content}
            components={{
              img: (props: any) => <MDXImage {...props} />,
              h2: (props: any) => <H2 {...props} />,
              h3: (props: any) => <H3 {...props} />,
            }}
          />
        </div>

        {post.tags && post.tags.length > 0 && (
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-sm hover:border-primary hover:text-primary"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </footer>
        )}
      </article>
    </div>
  );
}
