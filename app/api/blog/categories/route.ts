import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category))).sort();
  return NextResponse.json(categories, { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate' } });
}

