'use client';

import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CarouselProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number; // ms
  className?: string;
}

export function Carousel({ children, autoPlay = false, interval = 3000, className }: CarouselProps) {
  const slides = useMemo(() => React.Children.toArray(children), [children]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const goToSlide = (index: number) => {
    const count = slides.length;
    if (count === 0) return;
    const next = (index + count) % count;
    setCurrentIndex(next);
  };

  const goToNext = () => goToSlide(currentIndex + 1);
  const goToPrevious = () => goToSlide(currentIndex - 1);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1 || isPaused) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, slides.length, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipe = 50;
    if (swipeDistance > minSwipe) goToNext();
    else if (swipeDistance < -minSwipe) goToPrevious();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      role="region"
      aria-label="Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="relative w-full">
        {slides.map((child, index) => (
          <div key={index} className={cn(index === currentIndex ? 'block' : 'hidden', 'w-full')}>
            {child}
          </div>
        ))}
      </div>

      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn('w-2 h-2 rounded-full transition-colors', index === currentIndex ? 'bg-primary' : 'bg-white/50 hover:bg-white/75')}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CarouselItem({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export default Carousel;

