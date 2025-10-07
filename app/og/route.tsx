// ABOUTME: Default OG image for site-wide sharing
// ABOUTME: Edge runtime route generating 1200x630 OG images with CloudFix branding
import { ImageResponse } from 'next/og';
import { renderOg } from '@/lib/og';

export const runtime = 'edge';

export async function GET() {
  const title = 'CloudFix — Automated AWS Cost Optimization';
  return new ImageResponse(
    renderOg({ header: 'CloudFix', title, subtitle: 'Find and fix AWS cost issues automatically', gradient: ['#00BCD4', '#7ee7f5'] }),
    { width: 1200, height: 630 }
  );
}
