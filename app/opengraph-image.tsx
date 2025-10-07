// ABOUTME: Global OG image for root-level sharing
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const title = 'CloudFix – Automated AWS Cost Optimization';
  const subtitle = 'Find and fix AWS cost issues automatically';
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 64,
          color: '#0b0f13',
          background: 'linear-gradient(135deg, #00BCD4 0%, #7ee7f5 100%)',
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800, marginBottom: 16 }}>
          {title}
        </div>
        <div style={{ fontSize: 28, opacity: 0.8 }}>{subtitle}</div>
      </div>
    ),
    { ...size }
  );
}

