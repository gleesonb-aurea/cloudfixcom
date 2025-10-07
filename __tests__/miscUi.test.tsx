import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from '@/components/ui/Spinner';
import Skeleton from '@/components/ui/Skeleton';

describe('Misc UI', () => {
  test('Spinner renders with status role and size class', () => {
    render(<Spinner size={8} />);
    const el = screen.getByRole('status', { name: /loading/i });
    expect(el).toBeInTheDocument();
    const svg = el.querySelector('svg');
    expect(svg?.getAttribute('class') || '').toMatch(/h-8/);
  });

  test('Skeleton renders with pulse and sizing classes', () => {
    render(<Skeleton data-testid="sk" width="w-32" height="h-6" />);
    const el = screen.getByTestId('sk');
    expect(el.className).toMatch(/animate-pulse/);
    expect(el.className).toMatch(/w-32/);
    expect(el.className).toMatch(/h-6/);
  });
});
