import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata = { title: 'Blog Categories | CloudFix' };

export default async function BlogCategoriesPage() {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();
  posts.forEach((p) => counts.set(p.category, (counts.get(p.category) || 0) + 1));
  const cats = Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Blog Categories</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cats.map(([name, count]) => (
            <Link key={name} href={`/blog/category/${encodeURIComponent(name)}`} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{name}</span>
                <span className="text-sm text-gray-600">{count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

