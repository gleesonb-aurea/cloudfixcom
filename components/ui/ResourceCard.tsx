import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ResourceCardProps {
  title: string;
  href: string;
  thumbnailSrc?: string;
  category?: string;
  date?: string;
  authorName?: string;
  authorAvatarSrc?: string;
  badge?: string;
  className?: string;
}

export default function ResourceCard({
  title,
  href,
  thumbnailSrc,
  category,
  date,
  authorName,
  authorAvatarSrc,
  badge,
  className,
}: ResourceCardProps) {
  return (
    <article className={cn('group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm', className)}>
      <Link href={href} aria-label={title} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {thumbnailSrc && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image src={thumbnailSrc} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
            {badge && (
              <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-white">
                {badge}
              </span>
            )}
          </div>
        )}
        <div className="p-5">
          <div className="mb-2 flex items-center gap-2 text-sm">
            {category && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-primary">{category}</span>
            )}
            {date && <time className="text-gray-500">{date}</time>}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">{title}</h3>
          {(authorName || authorAvatarSrc) && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
              {authorAvatarSrc && (
                <Image src={authorAvatarSrc} alt="" width={24} height={24} className="rounded-full border border-gray-200" />
              )}
              {authorName && <span>By {authorName}</span>}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
