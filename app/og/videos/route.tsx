// ABOUTME: Default OG image for videos section
// ABOUTME: Edge runtime route generating 1200x630 OG images with videos branding
import { ImageResponse } from 'next/og';
import { renderOg } from '@/lib/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const t = searchParams.get('title') || 'CloudFix Videos';
  const title = decodeURIComponent(t);

  return new ImageResponse(
    renderOg({ header: 'Videos', title, gradient: ['#60a5fa', '#bfdbfe'] }),
    { width: 1200, height: 630 }
  );
}
