import React from 'react';
import { render, screen } from '@testing-library/react';
import PromptLensPage from '@/app/promptlens/page';

describe('PromptLens Product Page', () => {
  it('renders hero and CTA', () => {
    render(<PromptLensPage />);
    expect(screen.getByText('LLM Optimization')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Talk to an Expert/i })).toBeInTheDocument();
  });

  it('includes related products section', () => {
    render(<PromptLensPage />);
    expect(screen.getByText('Complete CloudFix Platform')).toBeInTheDocument();
  });
});

