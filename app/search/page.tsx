// ABOUTME: Site-wide search page for posts and resources
// ABOUTME: Renders results and adds SearchAction structured data for SEO
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { getAllResources } from '@/lib/resources';

export const metadata = { title: 'Search | CloudFix', description: 'Search CloudFix blog posts and resources.', alternates: { canonical: '/search' } };

export default async function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
  const q = (searchParams?.q || '').toLowerCase().trim();
  const [posts, resources] = await Promise.all([getAllPosts(), getAllResources()]);
  const postMatches = q ? posts.filter((p) => `${p.title} ${p.description} ${(p.tags||[]).join(' ')}`.toLowerCase().includes(q)) : [];
  const resourceMatches = q ? resources.filter((r) => `${r.title} ${r.description} ${r.tags.join(' ')}`.toLowerCase().includes(q)) : [];
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6">Search</h1>
        {/* JSON-LD: SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: process.env.NEXT_PUBLIC_SITE_URL,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <form method="get" className="mb-8 flex gap-2 items-center">
          <input aria-label="Search blog posts and resources" name="q" defaultValue={q} placeholder="Search blog and resources" className="rounded-lg border border-gray-300 px-3 py-2 w-full md:w-96" />
          <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-white">Search</button>
        </form>
        {q && (
          <>
            <h2 className="text-2xl font-bold mb-3">Blog Posts</h2>
            {postMatches.length === 0 ? (
              <div className="text-gray-600 mb-8">No posts found.</div>
            ) : (
              <ul className="mb-8 list-disc pl-5">
                {postMatches.map((p) => (
                  <li key={p.slug}><Link href={`/blog/${p.slug}`} className="text-primary hover:underline">{p.title}</Link></li>
                ))}
              </ul>
            )}
            <h2 className="text-2xl font-bold mb-3">Resources</h2>
            {resourceMatches.length === 0 ? (
              <div className="text-gray-600">No resources found.</div>
            ) : (
              <ul className="list-disc pl-5">
                {resourceMatches.map((r) => (
                  <li key={r.id}><Link href={`/resources/${r.id}`} className="text-primary hover:underline">{r.title}</Link></li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </div>
  );
}
