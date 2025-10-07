import React from 'react';
import { cn } from '@/lib/utils';

export interface SplitLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: boolean;
  align?: 'start' | 'center';
  gap?: 4 | 6 | 8 | 10 | 12;
}

export default function SplitLayout({ left, right, reverse = false, align = 'center', gap = 8, className, ...props }: SplitLayoutProps) {
  const content = reverse ? [right, left] : [left, right];
  return (
    <div
      className={cn('grid md:grid-cols-2', `gap-${gap}`, align === 'center' ? 'items-center' : 'items-start', className)}
      {...props}
    >
      <div>{content[0]}</div>
      <div>{content[1]}</div>
    </div>
  );
}

