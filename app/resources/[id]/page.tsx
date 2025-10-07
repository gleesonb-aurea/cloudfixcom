import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getResourceById, getAllResources } from '@/lib/resources';
import { SocialShare } from '@/components/blog/SocialShare';

interface ResourceDetailProps { params: { id: string } }

export default async function ResourceDetailPage({ params }: ResourceDetailProps) {
  const res = await getResourceById(params.id);
  if (!res) return notFound();
  const all = await getAllResources();
  const related = all.filter((r) => r.id !== res.id && (r.category === res.category || r.tags.some((t) => res.tags.includes(t)))).slice(0,3);

  return (
    <div className="min-h-screen">
      <section className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">{res.title}</h1>
        <div className="text-gray-600 mb-6">{res.description}</div>
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-3">
          <span>{res.category}</span>
          <span>•</span>
          <time>{new Date(res.publishDate).toLocaleDateString()}</time>
        </div>
        <a href={res.url} className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark">View Resource</a>
        <SocialShare url={`https://cloudfix.com/resources/${res.id}`} title={res.title} />
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Related Resources</h2>
            <ul className="list-disc pl-5 text-primary">
              {related.map((r) => (
                <li key={r.id} className="mb-1"><a href={`/resources/${r.id}`} className="hover:underline">{r.title}</a></li>
              ))}
            </ul>
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
