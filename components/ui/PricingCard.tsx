import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface PricingCardProps {
  title: string;
  price?: string;
  period?: string;
  description?: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  highlight?: boolean;
  className?: string;
}

export default function PricingCard({
  title,
  price,
  period = '/mo',
  description,
  features,
  ctaText,
  ctaLink,
  highlight,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-white p-6 shadow-sm',
        highlight ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200',
        className
      )}
    >
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      {description && <p className="mt-1 text-gray-600">{description}</p>}
      {price && (
        <div className="mt-4 flex items-baseline gap-1">
          <div className="text-4xl font-bold text-gray-900">{price}</div>
          <div className="text-gray-500">{period}</div>
        </div>
      )}
      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaLink}
        className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-gray-900 hover:bg-accent-dark"
      >
        {ctaText}
      </Link>
    </div>
  );
}

