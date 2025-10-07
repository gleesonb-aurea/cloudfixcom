// ABOUTME: Dynamic OG image generator for blog posts via query param slug
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug') || 'CloudFix Blog';
  const parts = slug.split('/');
  const last = parts[parts.length - 1] || slug;
  const title = decodeURIComponent(last)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());

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
          background: 'linear-gradient(135deg, #00BCD4 0%, #7ee7f5 100%)',
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.85 }}>Blog</div>
        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 22, opacity: 0.85 }}>cloudfix.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

