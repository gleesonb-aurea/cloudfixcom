import React from 'react';
import { render, screen } from '@testing-library/react';
import QueryLensPage from '@/app/querylens/page';

describe('QueryLens Product Page', () => {
  it('renders hero and CTA', () => {
    render(<QueryLensPage />);
    expect(screen.getByText('Database Query Optimization')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Get a Demo/i })).toBeInTheDocument();
  });

  it('includes related products section', () => {
    render(<QueryLensPage />);
    expect(screen.getByText('Complete CloudFix Platform')).toBeInTheDocument();
  });
});

