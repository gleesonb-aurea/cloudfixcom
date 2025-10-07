// ABOUTME: Skeleton loading placeholder component
// ABOUTME: Displays animated placeholder whilst content loads

interface SkeletonBlockProps {
  className?: string;
}

export default function SkeletonBlock({ className = '' }: SkeletonBlockProps) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

