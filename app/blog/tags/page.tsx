import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata = { title: 'Blog Tags | CloudFix' };

export default async function BlogTagsPage() {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();
  posts.forEach((p) => (p.tags || []).forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
  const tags = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Blog Tags</h1>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map(([name, count]) => (
            <Link key={name} href={`/blog/tag/${encodeURIComponent(name)}`} className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 hover:border-primary hover:text-primary">
              #{name} <span className="ml-1 text-gray-500">({count})</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

