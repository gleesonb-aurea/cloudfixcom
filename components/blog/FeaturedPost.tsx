import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/blog';

interface FeaturedPostProps {
  post: BlogPostMeta;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {post.image && (
          <div className="relative h-64">
            <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <div className="p-6">
          <div className="text-primary font-semibold mb-2">{post.category}</div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          {post.description && <p className="text-gray-600 mt-2">{post.description}</p>}
        </div>
      </article>
    </Link>
  );
}

