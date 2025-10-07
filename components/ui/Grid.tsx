import { cn } from '@/lib/utils';
import React from 'react';

type Breakpoints = 'base' | 'sm' | 'md' | 'lg' | 'xl';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: Partial<Record<Breakpoints, number>>;
  gap?: 0 | 2 | 4 | 6 | 8 | 10 | 12; // tailwind spacing steps
}

function colsToClasses(cols?: GridProps['cols']) {
  if (!cols) return 'grid-cols-1';
  const parts: string[] = [];
  const map: Record<Breakpoints, string> = { base: '', sm: 'sm:', md: 'md:', lg: 'lg:', xl: 'xl:' };
  (Object.keys(cols) as Breakpoints[]).forEach((bp) => {
    const n = cols[bp];
    if (!n) return;
    const prefix = map[bp];
    parts.push(`${prefix}grid-cols-${n}`);
  });
  if (!('base' in (cols as any))) parts.unshift('grid-cols-1');
  return parts.join(' ');
}

export default function Grid({ cols = { base: 1 }, gap = 6, className, ...props }: GridProps) {
  return (
    <div className={cn('grid', colsToClasses(cols), gap ? `gap-${gap}` : '', className)} {...props} />
  );
}

