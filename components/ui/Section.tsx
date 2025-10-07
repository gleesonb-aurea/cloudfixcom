import { cn } from '@/lib/utils';
import React from 'react';

type Padding = 'none' | 'sm' | 'md' | 'lg';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  padding?: Padding;
  muted?: boolean;
}

const padClass: Record<Padding, string> = {
  none: 'py-0',
  sm: 'py-8',
  md: 'py-16',
  lg: 'py-24',
};

export default function Section({ as: Comp = 'section', padding = 'md', muted = false, className, ...props }: SectionProps) {
  return (
    <Comp
      className={cn(padClass[padding], muted && 'bg-gray-50', className)}
      {...props}
    />
  );
}

