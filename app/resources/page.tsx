import Link from 'next/link';
import { getAllResources } from '@/lib/resources';
import ResourceCard from '@/components/ui/ResourceCard';

export const metadata = { title: 'Resources | CloudFix' };

export default async function ResourcesPage() {
  const resources = await getAllResources();
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Resources</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r) => (
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
      </section>
    </div>
  );
}

