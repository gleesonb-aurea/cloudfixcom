// ABOUTME: Shared utilities for generating Open Graph images
// ABOUTME: Centralizes style and layout for 1200x630 OG cards
import React from 'react';

export interface OgParams {
  header: string;
  title: string;
  subtitle?: string;
  gradient: [string, string];
}

// Brand color tokens mirrored from tailwind.config.ts
export const BRAND = {
  text: '#212121', // gray-900
  primary: ['#00BCD4', '#4DD0E1'] as [string, string],
  secondary: ['#0088CC', '#42A5F5'] as [string, string],
  accent: ['#fecd00', '#FFEB3B'] as [string, string],
};

export function renderOg({ header, title, subtitle, gradient }: OgParams): React.ReactElement {
  const [from, to] = gradient;
  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 56,
        color: BRAND.text,
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.85 }}>{header}</div>
      <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
      <div style={{ fontSize: 22, opacity: 0.85 }}>cloudfix.com{subtitle ? ` • ${subtitle}` : ''}</div>
    </div>
  );
}
