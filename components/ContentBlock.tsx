import { ReactNode } from 'react';

interface ContentBlockProps {
  title?: string;
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  centered?: boolean;
}

export default function ContentBlock({
  title,
  children,
  className = '',
  columns = 1,
  centered = false
}: ContentBlockProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={`section-padding ${className}`}>
      <div className="container-custom">
        {title && (
          <h2 className={`text-4xl md:text-5xl font-bold mb-12 ${centered ? 'text-center' : ''}`}>
            {title}
          </h2>
        )}

        <div className={`grid ${gridCols[columns]} gap-8`}>
          {children}
        </div>
      </div>
    </section>
  );
}

// Feature Card Component
interface FeatureCardProps {
  icon?: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
      {icon && (
        <div className="text-4xl mb-4">{icon}</div>
      )}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

export function StatCard({ value, label, description }: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary-dark/5 p-8 rounded-xl text-center">
      <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{value}</div>
      <div className="text-xl font-semibold mb-2">{label}</div>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}
