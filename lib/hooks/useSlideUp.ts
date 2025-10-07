import { CSSProperties, useMemo } from 'react';
import useInView from './useInView';

type Options = {
  duration?: number; // ms
  delay?: number; // ms
  distance?: number; // px
  once?: boolean;
};

export default function useSlideUp({ duration = 300, delay = 0, distance = 24, once = true }: Options = {}) {
  const [ref, inView] = useInView({ once });

  const style: CSSProperties = useMemo(() => ({
    transform: inView ? 'translateY(0px)' : `translateY(${distance}px)`,
    opacity: inView ? 1 : 0,
    transition: `transform ${duration}ms ease-out ${delay}ms, opacity ${duration}ms ease-out ${delay}ms`,
  }), [inView, duration, delay, distance]);

  return { ref, style } as const;
}

