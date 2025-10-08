import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PartnerLogoProps {
  name: string;
  logo: string;
  className?: string;
}

export default function PartnerLogo({ name, logo, className }: PartnerLogoProps) {
  return (
    <div className={cn('flex items-center justify-center rounded-lg border border-gray-200 bg-white p-4', className)}>
      <Image src={logo} alt={name} width={160} height={64} className="h-12 w-auto object-contain opacity-80" />
    </div>
  );
}

