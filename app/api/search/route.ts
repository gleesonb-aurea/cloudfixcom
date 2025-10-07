import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';
import { getAllResources } from '@/lib/resources';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase().trim();
  const [posts, resources] = await Promise.all([getAllPosts(), getAllResources()]);
  if (!q) {
    return NextResponse.json({ posts: [], resources: [] });
  }
  const postMatches = posts.filter((p) => `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(q));
  const resourceMatches = resources.filter((r) => `${r.title} ${r.description} ${r.tags.join(' ')}`.toLowerCase().includes(q));
  return NextResponse.json({ posts: postMatches, resources: resourceMatches }, { headers: { 'Cache-Control': 's-maxage=60' } });
}

