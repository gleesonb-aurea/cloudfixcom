import Image from 'next/image';
import { getAllVideos } from '@/lib/videos';

export const metadata = { title: 'Videos | CloudFix' };

export default async function VideosPage() {
  const vids = await getAllVideos();
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Videos</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vids.map((v) => (
            <a key={v.id} href={`https://www.youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noopener noreferrer" className="group">
              <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image src={v.thumbnail} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{v.description}</p>
              </article>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

