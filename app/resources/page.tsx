import Link from 'next/link';
import { getAllResources } from '@/lib/resources';
import { paginate } from '@/lib/blog';
import ResourceCard from '@/components/ui/ResourceCard';

export const metadata = { title: 'Resources | CloudFix' };

export default async function ResourcesPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const type = typeof searchParams?.type === 'string' ? searchParams?.type : undefined;
  const category = typeof searchParams?.category === 'string' ? searchParams?.category : undefined;
  const q = typeof searchParams?.q === 'string' ? searchParams?.q : undefined;
  const sort = typeof searchParams?.sort === 'string' ? searchParams?.sort : 'date-desc';
  const page = Number(searchParams?.page || 1) || 1;
  const resources = await getAllResources();
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
        return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
      case 'date-desc':
      default:
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
  });
  const { items, pages, current } = paginate(sorted, page, 9);
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6">Resources</h1>
        <form method="get" className="mb-8 flex flex-col md:flex-row gap-4 md:items-center">
          <input name="q" defaultValue={q} placeholder="Search resources" className="rounded-lg border border-gray-300 px-3 py-2 w-full md:w-80" />
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
              date={new Date(r.publishDate).toLocaleDateString()}
              authorName={r.author}
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
                <a key={p} href={href} className={`px-3 py-1 rounded border ${p===current ? 'bg-primary text-white border-primary' : 'border-gray-200'}`}>{p}</a>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
