import { cn } from '@/lib/utils';
import React from 'react';

type Padding = 'none' | 'sm' | 'md' | 'lg';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: Padding;
  muted?: boolean;
}

const padClass: Record<Padding, string> = {
  none: 'py-0',
  sm: 'py-8',
  md: 'py-16',
  lg: 'py-24',
};

export default function Section({ padding = 'md', muted = false, className, children, ...props }: SectionProps) {
  return (
    <section className={cn(padClass[padding], muted && 'bg-gray-50', className)} {...props}>
      {children}
    </section>
  );
}
