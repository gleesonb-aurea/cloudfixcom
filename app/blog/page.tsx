// ABOUTME: Blog index with filters, search, and pagination
// ABOUTME: Lists posts with category/tag filters, popular tags, and RSS link
import { getAllPosts, getAllCategories, getAllTags, paginate, queryPosts } from '@/lib/blog';
import { BlogListing } from '@/components/blog/BlogListing';
import Link from 'next/link';

export const metadata = { title: 'CloudFix Blog' };

export default async function BlogIndexPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const category = typeof searchParams?.category === 'string' ? searchParams?.category : undefined;
  const tag = typeof searchParams?.tag === 'string' ? searchParams?.tag : undefined;
  const q = typeof searchParams?.q === 'string' ? searchParams?.q : undefined;
  const page = Number(searchParams?.page || 1) || 1;

  const [categories, tags] = await Promise.all([getAllCategories(), getAllTags()]);
  const postsAll = await getAllPosts();
  const tagCounts = new Map<string, number>();
  postsAll.forEach((p) => (p.tags||[]).forEach((t) => tagCounts.set(t, (tagCounts.get(t)||0)+1)));
  const popularTags = Array.from(tagCounts.entries()).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const filtered = await queryPosts({ category, tag, q });
  const { items, pages, current } = paginate(filtered, page, 9);
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <div className="mb-4 text-sm text-gray-600">
          <Link href="/blog/rss.xml" className="text-primary hover:underline">Subscribe via RSS</Link>
        </div>
        <form method="get" className="mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Category:</span>
            <Link href={`/blog${q ? `?q=${encodeURIComponent(q)}` : ''}`} className={`px-3 py-1 rounded-full border ${!category ? 'bg-primary text-white border-primary' : 'border-gray-200'}`}>All</Link>
            {categories.map((c) => {
              const qs = new URLSearchParams();
              if (q) qs.set('q', q);
              qs.set('category', c);
              return (
                <Link key={c} href={`/blog?${qs.toString()}`} className={`px-3 py-1 rounded-full border ${category===c ? 'bg-primary text-white border-primary' : 'border-gray-200'}`}>{c}</Link>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Tags:</span>
            <Link href={`/blog${q ? `?q=${encodeURIComponent(q)}` : ''}${category ? `${q? '&' : '?'}category=${encodeURIComponent(category)}` : ''}`} className={`px-3 py-1 rounded-full border ${!tag ? 'bg-primary text-white border-primary' : 'border-gray-200'}`}>All</Link>
            {tags.map((t) => {
              const qs = new URLSearchParams();
              if (q) qs.set('q', q);
              if (category) qs.set('category', category);
              qs.set('tag', t);
              return (
                <Link key={t} href={`/blog?${qs.toString()}`} className={`px-3 py-1 rounded-full border ${tag===t ? 'bg-primary text-white border-primary' : 'border-gray-200'}`}>{t}</Link>
              );
            })}
          </div>
          <div className="flex gap-2 items-center">
            <input aria-label="Search blog posts" name="q" defaultValue={q} placeholder="Search posts" className="w-64 max-w-full rounded-lg border border-gray-300 px-3 py-2" />
            {category && <input type="hidden" name="category" value={category} />}
            {tag && <input type="hidden" name="tag" value={tag} />}
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-white">Search</button>
          </div>
        </form>

        <div className="mb-8">
          <div className="mb-2 text-sm text-gray-600">Popular tags:</div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {popularTags.map(([name,count]) => (
              <Link key={name} href={`/blog/tag/${encodeURIComponent(name)}`} className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 hover:border-primary hover:text-primary">
                #{name} <span className="ml-1 text-gray-500">({count})</span>
              </Link>
            ))}
          </div>
        </div>

        <BlogListing posts={items} />

        {pages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => {
              const p = i + 1;
              const qs = new URLSearchParams();
              if (q) qs.set('q', q);
              if (category) qs.set('category', category);
              if (tag) qs.set('tag', tag);
              if (p !== 1) qs.set('page', String(p));
              const href = qs.toString() ? `/blog?${qs.toString()}` : '/blog';
              return (
                <Link key={p} href={href} className={`px-3 py-1 rounded border ${p===current ? 'bg-primary text-white border-primary' : 'border-gray-200'}`}>{p}</Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  );
}
