import { CSSProperties, useMemo } from 'react';
import useInView from './useInView';

type Options = {
  duration?: number; // ms
  delay?: number; // ms
  initialOpacity?: number;
  once?: boolean;
};

export default function useFadeIn({ duration = 300, delay = 0, initialOpacity = 0, once = true }: Options = {}) {
  const [ref, inView] = useInView({ once });

  const style: CSSProperties = useMemo(() => ({
    opacity: inView ? 1 : initialOpacity,
    transition: `opacity ${duration}ms ease-out ${delay}ms`,
  }), [inView, duration, delay, initialOpacity]);

  return { ref, style } as const;
}

