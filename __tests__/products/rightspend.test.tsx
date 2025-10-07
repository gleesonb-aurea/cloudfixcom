import React from 'react';
import { render, screen } from '@testing-library/react';
import RightSpendPage from '@/app/rightspend/page';

describe('RightSpend Product Page', () => {
  it('renders hero and CTA', () => {
    render(<RightSpendPage />);
    expect(screen.getByText('Reserved Instance Management')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Optimize RIs/i })).toBeInTheDocument();
  });

  it('shows RI feature cards', () => {
    render(<RightSpendPage />);
    expect(screen.getByText('Usage Analysis')).toBeInTheDocument();
    expect(screen.getByText('Smart Recommendations')).toBeInTheDocument();
    expect(screen.getByText('Automated Renewals')).toBeInTheDocument();
  });

  it('includes related products section', () => {
    render(<RightSpendPage />);
    expect(screen.getByText('Complete CloudFix Platform')).toBeInTheDocument();
  });
});

