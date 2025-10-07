// ABOUTME: Videos page displaying CloudFix video content grid
// ABOUTME: Fetches and renders videos with modal player support
import { getAllVideos } from '@/lib/videos';
import VideoGrid from '@/components/videos/VideoGrid';

export const metadata = { title: 'Videos | CloudFix' };
export const revalidate = 21600; // 6 hours ISR

export default async function VideosPage() {
  const vids = await getAllVideos();
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Videos</h1>
        <VideoGrid videos={vids} />
      </section>
    </div>
  );
}
