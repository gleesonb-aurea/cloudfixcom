// ABOUTME: Test blog post page to verify routing works
// ABOUTME: Demo page used for validating blog post layout and SEO
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Test Blog Post — CloudFix',
  description: 'Test post to verify individual blog post routing and layout for CloudFix.',
};
export default function TestBlogPost() {
  return (
    <div className="min-h-screen">
      <article className="max-w-4xl mx-auto py-12 px-4">
        <header className="mb-8">
          <div className="mb-4">
            <Link href="/blog" className="text-primary hover:underline text-sm">
              ← Back to Blog
            </Link>
          </div>

          <div className="text-primary font-semibold mb-2">
            AWS
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Test Blog Post
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            This is a test to verify individual blog post routing works.
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-3">
              <span>CloudFix Team</span>
              <span>•</span>
              <time>October 7, 2025</time>
              <span>•</span>
              <span>2 min read</span>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p>This is a test blog post to verify the routing system is working properly.</p>
          <p>If you can see this page, the individual blog post routing is functional.</p>
        </div>
      </article>
    </div>
  );
}
