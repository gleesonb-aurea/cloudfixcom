// ABOUTME: Default OG image for site-wide sharing
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const title = 'CloudFix — Automated AWS Cost Optimization';
  const subtitle = 'Find and fix AWS cost issues automatically';

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
        <div style={{ fontSize: 28, fontWeight: 700, opacity: 0.85 }}>CloudFix</div>
        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 24, opacity: 0.85 }}>{subtitle}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

