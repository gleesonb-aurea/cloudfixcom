import React from 'react';
import { render, screen } from '@testing-library/react';
import CloudFixPage from '@/app/cloudfix/page';

describe('CloudFix Product Page', () => {
  it('renders product hero and CTA', () => {
    render(<CloudFixPage />);
    expect(screen.getByText('Automated AWS Cost Optimization')).toBeInTheDocument();
    const links = screen.getAllByRole('link', { name: /Start Free Assessment/i });
    expect(links.length).toBeGreaterThan(0);
  });

  it('shows value proposition features', () => {
    render(<CloudFixPage />);
    expect(screen.getByText('Automated Optimization')).toBeInTheDocument();
    expect(screen.getByText('Real-time Monitoring')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Security')).toBeInTheDocument();
  });

  it('includes related products section', () => {
    render(<CloudFixPage />);
    expect(screen.getByText('Complete CloudFix Platform')).toBeInTheDocument();
  });
});
