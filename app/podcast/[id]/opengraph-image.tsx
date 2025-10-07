// ABOUTME: Dynamic OG image for podcast episodes using Edge runtime
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: string } }) {
  const title = 'CloudFix Podcast';
  const guest = params.id ? `Episode ${params.id}` : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 56,
          color: '#0b0f13',
          background: 'linear-gradient(135deg, #00BCD4 0%, #7ee7f5 100%)',
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.85 }}>Podcast</div>
        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        {guest && <div style={{ fontSize: 28, opacity: 0.9 }}>{guest}</div>}
        <div style={{ fontSize: 22, opacity: 0.85 }}>cloudfix.com</div>
      </div>
    ),
    { ...size }
  );
}
