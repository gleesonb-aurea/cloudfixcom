import { cn } from '@/lib/utils';

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon?: string;
  className?: string;
}

export default function ProcessStep({ number, title, description, icon, className }: ProcessStepProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl text-white">
        {icon || number}
      </div>
      <div className="mb-2 text-3xl font-bold text-primary">{number}</div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

