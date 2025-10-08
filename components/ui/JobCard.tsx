import { cn } from '@/lib/utils';

interface JobCardProps {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  className?: string;
}

export default function JobCard({ title, department, location, type, description, className }: JobCardProps) {
  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg', className)}>
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="rounded-full bg-primary px-3 py-1 text-sm text-white">{type}</span>
      </div>
      <div className="mb-3 flex gap-4 text-sm text-gray-500">
        <span>📍 {location}</span>
        <span>🏢 {department}</span>
      </div>
      <p className="mb-4 text-gray-600">{description}</p>
      <button className="font-semibold text-primary hover:underline" aria-label={`Learn more about ${title}`}>
        Learn More →
      </button>
    </div>
  );
}

