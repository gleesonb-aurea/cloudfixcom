// ABOUTME: Podcast listing and player page with tag filters
// ABOUTME: Features current episode player, platform badges, and episode grid
import Image from 'next/image';
import Link from 'next/link';
import { getAllEpisodes } from '@/lib/podcast';
import PodcastPlayer from '@/components/podcast/PodcastPlayer';
import PlatformBadges from '@/components/podcast/PlatformBadges';

export const metadata = { title: 'Podcast | CloudFix', description: 'Tune into AWS cost optimization conversations with CloudFix and guests.' };
export const revalidate = 21600; // 6 hours ISR

export default async function PodcastPage({ searchParams }: { searchParams?: { episode?: string; tag?: string } }) {
  const episodes = await getAllEpisodes();
  const tag = searchParams?.tag;
  const filtered = tag ? episodes.filter((e) => e.tags.includes(tag)) : episodes;
  const featured = filtered.find((e) => e.featured) || filtered[0] || episodes[0];
  const current = episodes.find((e) => e.id === searchParams?.episode) || featured;

  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Podcast</h1>
        {current && (
          <div className="mb-10">
            <PodcastPlayer episode={current} />
            <PlatformBadges episode={current} className="mt-3" />
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">Filter by tag:</span>
          <Link href="/podcast" className={`px-3 py-1 rounded-full border ${!tag ? 'bg-primary text-white border-primary' : 'border-gray-200'}`}>All</Link>
          {Array.from(new Set(episodes.flatMap((e) => e.tags))).map((t) => (
            <Link key={t} href={`/podcast?tag=${encodeURIComponent(t)}`} className={`px-3 py-1 rounded-full border ${tag===t ? 'bg-primary text-white border-primary' : 'border-gray-200'}`}>{t}</Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ep) => (
            <Link key={ep.id} href={`/podcast?episode=${ep.id}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`} className="group">
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
                {ep.tags?.length ? (
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    {ep.tags.map((tg) => (
                      <Link key={tg} href={`/podcast?tag=${encodeURIComponent(tg)}`} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-700 hover:bg-gray-200">#{tg}</Link>
                    ))}
                  </div>
                ) : null}
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Subscribe</h2>
          <p className="text-gray-600 mb-4">Get new episodes on your favorite platform</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a className="text-primary hover:underline" href={episodes[0]?.audioUrls.apple} target="_blank" rel="noopener noreferrer">Apple Podcasts</a>
            <a className="text-primary hover:underline" href={episodes[0]?.audioUrls.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>
            <a className="text-primary hover:underline" href={episodes[0]?.audioUrls.google} target="_blank" rel="noopener noreferrer">Google Podcasts</a>
            <a className="text-primary hover:underline" href={episodes[0]?.audioUrls.amazon} target="_blank" rel="noopener noreferrer">Amazon Music</a>
            <a className="text-primary hover:underline" href={episodes[0]?.audioUrls.rss} target="_blank" rel="noopener noreferrer">RSS</a>
          </div>
        </div>
      </section>
    </div>
  );
}
