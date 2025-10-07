import { MutableRefObject, RefCallback, useCallback, useEffect, useRef, useState } from 'react';

type Options = IntersectionObserverInit & { once?: boolean };

type Refish<T extends Element> = MutableRefObject<T | null> | RefCallback<T>;

export default function useInView<T extends Element = Element>(options: Options = {}): [Refish<T>, boolean] {
  const { root = null, rootMargin, threshold, once = false } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  const setRef = useCallback<RefCallback<T>>((node) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      }
    }, { root, rootMargin, threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold, once]);

  return [setRef as Refish<T>, inView];
}

