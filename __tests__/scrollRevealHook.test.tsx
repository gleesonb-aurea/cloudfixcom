import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { triggerAllIntersections } from '@/test/utils/intersection';
import useScrollReveal from '@/lib/hooks/useScrollReveal';

function Probe() {
  const anim = useScrollReveal({ direction: 'left', distance: 20, duration: 100, delay: 0, once: true });
  return (
    <div {...anim} data-testid="rev">hello</div>
  );
}

describe('useScrollReveal', () => {
  test('applies hidden transform then reveals', () => {
    render(<Probe />);
    const el = screen.getByTestId('rev');
    expect(el.style.opacity).toBe('0');
    expect(el.style.transform).toMatch(/translateX/);
    act(() => triggerAllIntersections(true));
    expect(el.style.opacity).toBe('1');
    expect(el.style.transform).toBe('none');
  });
});

