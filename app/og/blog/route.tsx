// ABOUTME: Dynamic OG image generator for blog posts via query param slug
// ABOUTME: Edge runtime route generating 1200x630 OG images with blog branding
import { ImageResponse } from 'next/og';
import { renderOg } from '@/lib/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug') || 'CloudFix Blog';
  const parts = slug.split('/');
  const last = parts[parts.length - 1] || slug || 'CloudFix Blog';
  const title = decodeURIComponent(last)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());

  return new ImageResponse(
    renderOg({ header: 'Blog', title, gradient: ['#00BCD4', '#7ee7f5'] }),
    { width: 1200, height: 630 }
  );
}
