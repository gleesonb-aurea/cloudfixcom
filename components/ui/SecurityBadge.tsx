import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SecurityBadgeProps {
  name: string;
  logo: string;
  className?: string;
}

export default function SecurityBadge({ name, logo, className }: SecurityBadgeProps) {
  return (
    <div className={cn('rounded-lg bg-white p-4 shadow-sm', className)}>
      <Image src={logo} alt={`${name} certification`} width={128} height={64} className="mb-2 h-16 w-full object-contain" />
      <p className="text-sm font-medium text-gray-600">{name}</p>
    </div>
  );
}

