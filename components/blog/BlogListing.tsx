import { BlogPostMeta } from '@/lib/blog';
import { BlogCard } from './BlogCard';
import { FeaturedPost } from './FeaturedPost';

interface BlogListingProps {
  posts: BlogPostMeta[];
  showFeatured?: boolean;
}

export function BlogListing({ posts, showFeatured = true }: BlogListingProps) {
  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <div className="space-y-10">
      {showFeatured && featuredPost && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured</h2>
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {regularPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

