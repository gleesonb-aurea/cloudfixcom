import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { BlogListing } from '@/components/blog/BlogListing';

interface PageProps { params: { category: string } }

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const cats = Array.from(new Set(posts.map((p) => p.category)));
  return cats.map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Blog – ${params.category}`,
    description: `Posts in category ${params.category}`,
    alternates: { canonical: `/blog/category/${params.category}` },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const posts = (await getAllPosts()).filter((p) => p.category === params.category);
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6">Category: {params.category}</h1>
        <div className="mb-6">
          <Link href="/blog" className="text-primary hover:underline">← All posts</Link>
        </div>
        <BlogListing posts={posts} showFeatured={false} />
      </section>
    </div>
  );
}

