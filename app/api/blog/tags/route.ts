import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const posts = await getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags || []))).sort();
  return NextResponse.json(tags, { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate' } });
}

