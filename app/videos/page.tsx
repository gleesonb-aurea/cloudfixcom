// ABOUTME: Videos page displaying CloudFix video content grid
// ABOUTME: Fetches and renders videos with modal player support
import { getAllVideos } from '@/lib/videos';
import dynamic from 'next/dynamic';
import SkeletonBlock from '@/components/ui/SkeletonBlock';
const VideoGrid = dynamic(() => import('@/components/videos/VideoGrid'), {
  ssr: false,
  loading: () => <SkeletonBlock className="h-64 w-full" />,
});

export const metadata = {
  title: 'Videos | CloudFix',
  alternates: { canonical: '/videos' },
  openGraph: {
    title: 'Videos | CloudFix',
    type: 'website',
    images: [{ url: '/og/videos?title=CloudFix%20Videos', alt: 'CloudFix Videos' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/videos?title=CloudFix%20Videos'],
  },
};
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
