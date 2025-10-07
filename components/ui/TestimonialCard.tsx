import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export interface TestimonialCardProps {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  companyLogoSrc?: string;
  rating?: number; // 0-5
  className?: string;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  company,
  avatarSrc,
  companyLogoSrc,
  rating,
  className,
}: TestimonialCardProps) {
  const stars = Math.max(0, Math.min(5, rating ?? 0));
  return (
    <figure className={cn('rounded-2xl border border-gray-200 bg-white p-6 shadow-sm', className)}>
      {stars > 0 && (
        <div className="mb-3 flex items-center gap-1 text-accent" aria-label={`${stars} star rating`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-4 h-4', i < stars ? 'fill-current' : 'opacity-30')} />
          ))}
        </div>
      )}
      <blockquote className="text-gray-900 text-lg leading-relaxed">
        “{quote}”
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        {avatarSrc && (
          <Image
            src={avatarSrc}
            alt={`${name} avatar`}
            width={40}
            height={40}
            className="rounded-full border border-gray-200"
          />
        )}
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{name}</div>
          {(role || company) && (
            <div className="text-sm text-gray-600">
              {[role, company].filter(Boolean).join(' • ')}
            </div>
          )}
        </div>
        {companyLogoSrc && (
          <Image src={companyLogoSrc} alt="Company logo" width={64} height={24} className="object-contain" />
        )}
      </figcaption>
    </figure>
  );
}

