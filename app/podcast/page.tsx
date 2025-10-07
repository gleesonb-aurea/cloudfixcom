import Image from 'next/image';
import Link from 'next/link';
import { getAllEpisodes } from '@/lib/podcast';
import PodcastPlayer from '@/components/podcast/PodcastPlayer';

export const metadata = { title: 'Podcast | CloudFix' };

export default async function PodcastPage({ searchParams }: { searchParams?: { episode?: string } }) {
  const episodes = await getAllEpisodes();
  const featured = episodes.find((e) => e.featured) || episodes[0];
  const current = episodes.find((e) => e.id === searchParams?.episode) || featured;

  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Podcast</h1>
        {current && (
          <div className="mb-10">
            <PodcastPlayer episode={current} />
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((ep) => (
            <Link key={ep.id} href={`/podcast?episode=${ep.id}`} className="group">
              <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image src={ep.guest.avatar} alt={ep.guest.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{ep.title}</h3>
                    <div className="text-sm text-gray-500">{new Date(ep.publishDate).toLocaleDateString()} • {ep.duration} min</div>
                  </div>
                </div>
                <p className="text-gray-600 mt-3 line-clamp-2">{ep.description}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

