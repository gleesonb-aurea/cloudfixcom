// ABOUTME: Default OG image for videos section
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const t = searchParams.get('title') || 'CloudFix Videos';
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
          background: 'linear-gradient(135deg, #60a5fa 0%, #bfdbfe 100%)',
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.85 }}>Videos</div>
        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 22, opacity: 0.85 }}>cloudfix.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

