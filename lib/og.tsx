// ABOUTME: Shared utilities for generating Open Graph images
// ABOUTME: Centralizes style and layout for 1200x630 OG cards
import React from 'react';

export interface OgParams {
  header: string;
  title: string;
  subtitle?: string;
  gradient: [string, string];
}

export function renderOg({ header, title, subtitle, gradient }: OgParams) {
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
        color: '#0b0f13',
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.85 }}>{header}</div>
      <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
      <div style={{ fontSize: 22, opacity: 0.85 }}>cloudfix.com{subtitle ? ` • ${subtitle}` : ''}</div>
    </div>
  );
}

