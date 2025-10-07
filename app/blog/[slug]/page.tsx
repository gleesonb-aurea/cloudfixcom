import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';
import { SocialShare } from '@/components/blog/SocialShare';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <div className="min-h-screen">
      <article className="max-w-3xl mx-auto py-12 px-4">
        <header className="mb-8">
          <div className="text-primary font-semibold mb-2">{post.category}</div>
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
        <div className="prose prose-gray max-w-none">
          {/* MDX content (RSC-compatible MDXRemote) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <MDXRemote source={post.content} />
        </div>
        <SocialShare url={`https://cloudfix.com/blog/${post.slug}`} title={post.title} />
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
