import { getAllPosts } from '@/lib/blog';
import { BlogListing } from '@/components/blog/BlogListing';

export const metadata = { title: 'CloudFix Blog' };

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <BlogListing posts={posts} />
      </section>
    </div>
  );
}
