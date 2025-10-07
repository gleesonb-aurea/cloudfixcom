import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string; // e.g., 'w-full', 'w-32'
  height?: string; // e.g., 'h-4', 'h-8'
  rounded?: string; // e.g., 'rounded-md'
}

export default function Skeleton({ width = 'w-full', height = 'h-4', rounded = 'rounded', className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse bg-gray-200', width, height, rounded, className)}
      aria-hidden="true"
      {...props}
    />
  );
}

