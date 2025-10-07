// ABOUTME: Resources listing page with filtering, search, and pagination
// ABOUTME: Displays all resource types (blog, podcast, video, case-study, success-story) with category-based quick filters
import Link from 'next/link';
import { getAllResources } from '@/lib/resources';
import { paginate } from '@/lib/blog';
import ResourceCard from '@/components/ui/ResourceCard';

export const metadata = { title: 'Resources | CloudFix', description: 'Explore CloudFix resources including blogs, podcasts, videos, and case studies.', alternates: { canonical: '/resources' } };
export const revalidate = 1800; // 30 minutes ISR for resources listing

export default async function ResourcesPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const type = typeof searchParams?.type === 'string' ? searchParams?.type : undefined;
  const category = typeof searchParams?.category === 'string' ? searchParams?.category : undefined;
  const q = typeof searchParams?.q === 'string' ? searchParams?.q : undefined;
  const sort = typeof searchParams?.sort === 'string' ? searchParams?.sort : 'date-desc';
  const page = Number(searchParams?.page || 1) || 1;
  const resources = await getAllResources();
  const categoriesSet = new Set(resources.map((r) => r.category));
  const categories = Array.from(categoriesSet).sort();
  const filtered = resources.filter((r) => {
    if (type && r.type !== type) return false;
    if (category && r.category !== category) return false;
    if (q) {
      const ql = q.toLowerCase();
      const hay = `${r.title} ${r.description} ${r.tags.join(' ')}`.toLowerCase();
      if (!hay.includes(ql)) return false;
    }
    return true;
  });
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'date-asc':
        return new Date(a.publishDate ?? a.date ?? '1970-01-01').getTime() - new Date(b.publishDate ?? b.date ?? '1970-01-01').getTime();
      case 'date-desc':
      default:
        return new Date(b.publishDate ?? b.date ?? '1970-01-01').getTime() - new Date(a.publishDate ?? a.date ?? '1970-01-01').getTime();
    }
  });
  const { items, pages, current } = paginate(sorted, page, 9);
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6">Resources</h1>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-600">Quick filters:</span>
          <Link href="/resources" className={`rounded-full border px-3 py-1 ${!type ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>All</Link>
          <Link href="/resources?type=blog" className={`rounded-full border px-3 py-1 ${type === 'blog' ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>Blogs</Link>
          <Link href="/resources?type=podcast" className={`rounded-full border px-3 py-1 ${type === 'podcast' ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>Podcasts</Link>
          <Link href="/resources?type=video" className={`rounded-full border px-3 py-1 ${type === 'video' ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>Videos</Link>
          <Link href="/resources?type=case-study" className={`rounded-full border px-3 py-1 ${type === 'case-study' ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>Case Studies</Link>
          <Link href="/resources?type=success-story" className={`rounded-full border px-3 py-1 ${type === 'success-story' ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>Success Stories</Link>
          <span className="ml-3 text-gray-600">Categories:</span>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/resources?category=${encodeURIComponent(c)}`}
              className={`rounded-full border px-3 py-1 ${category === c ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}
            >
              {c}
            </Link>
          ))}
        </div>
        <form method="get" className="mb-8 flex flex-col md:flex-row gap-4 md:items-center">
          <input aria-label="Search resources" name="q" defaultValue={q} placeholder="Search resources" className="rounded-lg border border-gray-300 px-3 py-2 w-full md:w-80" />
          <div className="flex gap-2 items-center">
            <select name="type" defaultValue={type} className="rounded-lg border border-gray-300 px-3 py-2">
              <option value="">All Types</option>
              <option value="blog">Blog</option>
              <option value="podcast">Podcast</option>
              <option value="video">Video</option>
              <option value="case-study">Case Study</option>
              <option value="success-story">Success Story</option>
            </select>
            <select name="sort" defaultValue={sort} className="rounded-lg border border-gray-300 px-3 py-2">
              <option value="date-desc">Newest</option>
              <option value="date-asc">Oldest</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-white">Filter</button>
          </div>
        </form>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((r) => (
            <ResourceCard
              key={r.id}
              title={r.title}
              href={r.url}
              thumbnailSrc={r.thumbnail}
              category={r.category}
              date={new Date(r.publishDate ?? r.date ?? '1970-01-01').toLocaleDateString()}
              authorName={r.author}
              badge={r.type?.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())}
            />
          ))}
        </div>

        {pages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => {
              const p = i + 1;
              const qs = new URLSearchParams();
              if (q) qs.set('q', q);
              if (type) qs.set('type', type);
              if (category) qs.set('category', category);
              if (sort) qs.set('sort', sort);
              if (p !== 1) qs.set('page', String(p));
              const href = qs.toString() ? `/resources?${qs.toString()}` : '/resources';
              return (
                <Link key={p} href={href} className={`px-3 py-1 rounded border ${p===current ? 'bg-primary text-white border-primary' : 'border-gray-200'}`}>{p}</Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
