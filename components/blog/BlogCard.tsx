import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPostMeta;
  variant?: 'default' | 'compact';
}

function formatDate(date: string) {
  try {
    return new Date(date).toLocaleDateString();
  } catch {
    return date;
  }
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`} className="group">
        <article className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
          {post.image && (
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image src={post.image} alt={post.title} fill className="object-cover rounded-lg" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <span>{post.author}</span>
              <span>•</span>
              <time>{formatDate(post.date)}</time>
              {post.readTime ? (
                <>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </>
              ) : null}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {post.image && (
          <div className="relative h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          {post.description && (
            <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
          )}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <span>{post.author}</span>
              <span>•</span>
              <time>{formatDate(post.date)}</time>
            </div>
            {post.readTime ? <span>{post.readTime} min read</span> : <span />}
          </div>
        </div>
      </article>
    </Link>
  );
}

