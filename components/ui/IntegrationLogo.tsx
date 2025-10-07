import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface IntegrationLogoProps {
  src: string;
  alt: string;
  href?: string;
  className?: string;
}

export default function IntegrationLogo({ src, alt, href, className }: IntegrationLogoProps) {
  const img = (
    <Image src={src} alt={alt} width={120} height={40} className={cn('h-10 w-auto object-contain opacity-80', className)} />
  );
  return href ? (
    <Link href={href} aria-label={alt} className="inline-flex items-center justify-center">
      {img}
    </Link>
  ) : (
    img
  );
}

