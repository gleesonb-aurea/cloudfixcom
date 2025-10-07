// ABOUTME: Individual blog post page for nested slugs (categories)
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXImage from '@/components/mdx/MDXImage';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600; // 1 hour ISR for blog posts

interface BlogPostPageProps {
  params: {
    slug: string[];
  };
}

// Note: Do not prebuild all post routes to keep build memory usage low.
// Posts are generated on-demand with ISR (revalidate above).

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = params;
  const slugString = slug.join('/');
  const post = await getPostBySlug(slugString);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.description,
    keywords: post.seo?.keywords?.join(', ') || post.tags?.join(', '),
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{
        url: post.image,
        alt: post.title,
      }] : [],
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

        <div className="prose prose-lg max-w-none">
          <MDXRemote
            source={post.content}
            components={{
              img: (props: any) => <MDXImage {...props} />,
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
