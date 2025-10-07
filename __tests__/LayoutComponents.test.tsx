import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Grid from '@/components/ui/Grid';
import SplitLayout from '@/components/ui/SplitLayout';

describe('Layout Components', () => {
  test('Container applies size classes', () => {
    const { rerender } = render(<Container size="xl" data-testid="c">Content</Container>);
    expect(screen.getByTestId('c').className).toMatch(/max-w-7xl/);
    rerender(<Container size="full" data-testid="c">Content</Container>);
    expect(screen.getByTestId('c').className).toMatch(/max-w-none/);
  });

  test('Section applies padding and background', () => {
    const { rerender } = render(<Section padding="lg" data-testid="s">Body</Section>);
    expect(screen.getByTestId('s').className).toMatch(/py-24/);
    rerender(<Section padding="none" muted data-testid="s">Body</Section>);
    expect(screen.getByTestId('s').className).toMatch(/py-0/);
    expect(screen.getByTestId('s').className).toMatch(/bg-gray-50/);
  });

  test('Grid applies responsive column classes and gap', () => {
    render(
      <Grid cols={{ base: 1, md: 3 }} gap={8} data-testid="g">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Grid>
    );
    const el = screen.getByTestId('g');
    expect(el.className).toMatch(/grid-cols-1/);
    expect(el.className).toMatch(/md:grid-cols-3/);
    expect(el.className).toMatch(/gap-8/);
  });

  test('SplitLayout renders left/right and supports reverse', () => {
    const { rerender } = render(
      <SplitLayout data-testid="split" left={<div data-testid="col">Left</div>} right={<div data-testid="col">Right</div>} />
    );
    let cols = screen.getAllByTestId('col');
    expect(cols[0]).toHaveTextContent('Left');
    expect(cols[1]).toHaveTextContent('Right');

    rerender(
      <SplitLayout data-testid="split" reverse left={<div data-testid="col">Left</div>} right={<div data-testid="col">Right</div>} />
    );
    cols = screen.getAllByTestId('col');
    expect(cols[0]).toHaveTextContent('Right');
    expect(cols[1]).toHaveTextContent('Left');
  });
});

