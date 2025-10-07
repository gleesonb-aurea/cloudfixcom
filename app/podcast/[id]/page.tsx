// ABOUTME: Podcast episode detail page with player and JSON-LD
// ABOUTME: Shows guest info, show notes, and platform badges
import type { Metadata } from 'next';
export const revalidate = 21600; // 6 hours ISR for podcast episodes
import Link from 'next/link';
import { getEpisodeById, getAllEpisodes } from '@/lib/podcast';
import PodcastPlayer from '@/components/podcast/PodcastPlayer';
import PlatformBadges from '@/components/podcast/PlatformBadges';
import GuestPanel from '@/components/podcast/GuestPanel';

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'PodcastEpisode',
              name: ep.title,
              datePublished: ep.publishDate,
              description: ep.description,
              associatedMedia: ep.audio ? { '@type': 'AudioObject', contentUrl: ep.audio } : undefined,
              url: `https://cloudfix.com/podcast/${ep.id}`,
            }),
          }}
        />
        <Link href="/podcast" className="text-primary hover:underline">← All episodes</Link>
        <h1 className="text-4xl font-bold mt-4">{ep.title}</h1>
        <div className="text-sm text-gray-500 mt-1">{new Date(ep.publishDate).toLocaleDateString('en-GB', { dateStyle: 'medium' })} • {ep.duration} min</div>
        <div className="mt-6"><PodcastPlayer episode={ep} /></div>
        <PlatformBadges episode={ep} className="mt-4" />
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Guest</h2>
          <GuestPanel guest={ep.guest} />
        </div>
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
