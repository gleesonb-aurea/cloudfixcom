// ABOUTME: Dynamic OG image for podcast page and episodes
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const t = searchParams.get('title') || 'CloudFix Podcast';
  const title = decodeURIComponent(t);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 56,
          color: '#0b0f13',
          background: 'linear-gradient(135deg, #34d399 0%, #a7f3d0 100%)',
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.85 }}>Podcast</div>
        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 22, opacity: 0.85 }}>cloudfix.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

