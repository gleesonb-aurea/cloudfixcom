import { notFound } from 'next/navigation';
import { getResourceById } from '@/lib/resources';

interface ResourceDetailProps { params: { id: string } }

export default async function ResourceDetailPage({ params }: ResourceDetailProps) {
  const res = await getResourceById(params.id);
  if (!res) return notFound();

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
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllResources } = await import('@/lib/resources');
  const all = await getAllResources();
  return all.map((r) => ({ id: r.id }));
}

