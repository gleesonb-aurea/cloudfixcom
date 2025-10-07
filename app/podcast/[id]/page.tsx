import type { Metadata } from 'next';
import Link from 'next/link';
import { getEpisodeById, getAllEpisodes } from '@/lib/podcast';
import PodcastPlayer from '@/components/podcast/PodcastPlayer';

interface PageProps { params: { id: string } }

export async function generateStaticParams() {
  const eps = await getAllEpisodes();
  return eps.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const ep = await getEpisodeById(params.id);
  if (!ep) return {};
  return {
    title: `${ep.title} – Podcast`,
    description: ep.description,
    alternates: { canonical: `/podcast/${ep.id}` },
    openGraph: {
      title: ep.title,
      description: ep.description,
      url: `/podcast/${ep.id}`,
      type: 'website',
    },
  };
}

export default async function PodcastEpisodePage({ params }: PageProps) {
  const ep = await getEpisodeById(params.id);
  if (!ep) return null;
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto py-12 px-4">
        <Link href="/podcast" className="text-primary hover:underline">← All episodes</Link>
        <h1 className="text-4xl font-bold mt-4">{ep.title}</h1>
        <div className="text-sm text-gray-500 mt-1">{new Date(ep.publishDate).toLocaleDateString('en-GB', { dateStyle: 'medium' })} • {ep.duration} min</div>
        <div className="mt-6"><PodcastPlayer episode={ep} /></div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Show Notes</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {ep.showNotes.map((n, i) => (
              <li key={i} className="mb-1">{n}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
