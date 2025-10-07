import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { triggerAllIntersections } from '@/test/utils/intersection';
import useInView from '@/lib/hooks/useInView';
import useFadeIn from '@/lib/hooks/useFadeIn';
import useSlideUp from '@/lib/hooks/useSlideUp';

function InViewProbe() {
  const [ref, inView] = useInView({ once: true });
  return (
    <div>
      <div ref={ref as React.RefObject<HTMLDivElement>}>target</div>
      <span>state:{inView ? 'in' : 'out'}</span>
    </div>
  );
}

function FadeInProbe() {
  const anim = useFadeIn({ duration: 200, delay: 50, once: true });
  return (
    <div {...anim} data-testid="fade">
      fade
    </div>
  );
}

function SlideUpProbe() {
  const anim = useSlideUp({ duration: 200, delay: 0, distance: 16, once: true });
  return (
    <div {...anim} data-testid="slide">
      slide
    </div>
  );
}

describe('Animation Hooks', () => {
  test('useInView switches state on intersection', () => {
    render(<InViewProbe />);
    expect(screen.getByText('state:out')).toBeInTheDocument();
    act(() => {
      triggerAllIntersections(true);
    });
    expect(screen.getByText('state:in')).toBeInTheDocument();
  });

  test('useFadeIn updates style when in view', () => {
    render(<FadeInProbe />);
    const el = screen.getByTestId('fade');
    expect(el).toHaveStyle({ opacity: '0' });
    act(() => {
      triggerAllIntersections(true);
    });
    expect(el).toHaveStyle({ opacity: '1' });
  });

  test('useSlideUp updates transform when in view', () => {
    render(<SlideUpProbe />);
    const el = screen.getByTestId('slide');
    expect(el.style.transform).toMatch(/translateY/);
    act(() => {
      triggerAllIntersections(true);
    });
    expect(el.style.transform).toBe('translateY(0px)');
  });
});
