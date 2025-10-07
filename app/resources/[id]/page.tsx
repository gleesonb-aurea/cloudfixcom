import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getResourceById, getAllResources } from '@/lib/resources';
import { SocialShare } from '@/components/blog/SocialShare';
import ResourceCard from '@/components/ui/ResourceCard';

interface ResourceDetailProps { params: { id: string } }

export default async function ResourceDetailPage({ params }: ResourceDetailProps) {
  const res = await getResourceById(params.id);
  if (!res) return notFound();
  const all = await getAllResources();
  const related = all.filter((r) => r.id !== res.id && (r.category === res.category || r.tags.some((t) => res.tags.includes(t)))).slice(0,3);

  return (
    <div className="min-h-screen">
      <section className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <a href={`/resources?category=${encodeURIComponent(res.category)}`} className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{res.category}</a>
          {res.tags?.map((t) => (
            <a key={t} href={`/resources?tag=${encodeURIComponent(t)}`} className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">#{t}</a>
          ))}
        </div>
        <h1 className="text-4xl font-bold mb-2">{res.title}</h1>
        <div className="text-sm text-gray-500 mb-6">{new Date((res as any).publishDate || (res as any).date || new Date().toISOString()).toLocaleDateString()}</div>
        <div className="text-gray-600 mb-6">{res.description}</div>
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-3">
          <span>{res.category}</span>
          <span>•</span>
          <time>{new Date(res.publishDate).toLocaleDateString()}</time>
        </div>
        {('downloadUrl' in res as any) && (res as any).downloadUrl ? (
          <a href={(res as any).downloadUrl} className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark" download>
            Download {res.type === 'case-study' ? 'Case Study' : 'Resource'}
          </a>
        ) : (
          <a href={res.url} className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark">View Resource</a>
        )}
        <SocialShare url={`https://cloudfix.com/resources/${res.id}`} title={res.title} />
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((r) => (
                <ResourceCard
                  key={r.id}
                  title={r.title}
                  href={`/resources/${r.id}`}
                  thumbnailSrc={r.thumbnail}
                  category={r.category}
                  date={new Date((r as any).publishDate || (r as any).date || new Date().toISOString()).toLocaleDateString()}
                  authorName={r.author}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllResources } = await import('@/lib/resources');
  const all = await getAllResources();
  return all.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: ResourceDetailProps): Promise<Metadata> {
  const res = await getResourceById(params.id);
  if (!res) return {};
  return {
    title: `${res.title} – Resource`,
    description: res.description,
    alternates: { canonical: `/resources/${res.id}` },
    openGraph: {
      title: res.title,
      description: res.description,
      url: `/resources/${res.id}`,
      type: 'article',
    },
  };
}
