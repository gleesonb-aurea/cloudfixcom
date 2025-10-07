import ResourceCard from '@/components/ui/ResourceCard';
import { getAllResources } from '@/lib/resources';

export const metadata = { title: 'Success Stories | CloudFix' };

export default async function SuccessStoriesPage() {
  const all = await getAllResources();
  const stories = all.filter((r) => r.type === 'case-study' || r.type === 'success-story');
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Success Stories</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s) => (
            <ResourceCard
              key={s.id}
              title={s.title}
              href={`/resources/${s.id}`}
              thumbnailSrc={s.thumbnail}
              category={s.category}
              date={new Date(s.publishDate).toLocaleDateString()}
              authorName={s.author}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

