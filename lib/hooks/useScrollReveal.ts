import { CSSProperties, useMemo } from 'react';
import useInView from './useInView';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type Options = {
  direction?: Direction;
  distance?: number; // px
  duration?: number; // ms
  delay?: number; // ms
  once?: boolean;
};

export default function useScrollReveal({ direction = 'up', distance = 24, duration = 500, delay = 0, once = true }: Options = {}) {
  const [ref, inView] = useInView({ once });

  const transformHidden = useMemo(() => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      default:
        return 'none';
    }
  }, [direction, distance]);

  const style: CSSProperties = useMemo(
    () => ({
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : transformHidden,
      transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    }),
    [inView, transformHidden, duration, delay]
  );

  return { ref, style } as const;
}

