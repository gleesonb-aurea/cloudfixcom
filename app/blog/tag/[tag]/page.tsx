import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { BlogListing } from '@/components/blog/BlogListing';

interface PageProps { params: { tag: string } }

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags || [])));
  return tags.map((t) => ({ tag: t }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Blog – Tag: ${params.tag}`,
    description: `Posts tagged with ${params.tag}`,
    alternates: { canonical: `/blog/tag/${params.tag}` },
  };
}

export default async function BlogTagPage({ params }: PageProps) {
  const posts = (await getAllPosts()).filter((p) => (p.tags || []).includes(params.tag));
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6">Tag: {params.tag}</h1>
        <div className="mb-6">
          <Link href="/blog" className="text-primary hover:underline">← All posts</Link>
        </div>
        <BlogListing posts={posts} showFeatured={false} />
      </section>
    </div>
  );
}

