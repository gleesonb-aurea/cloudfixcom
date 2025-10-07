// ABOUTME: API route returning all podcast episodes as JSON
// ABOUTME: Implements caching headers for CDN optimization
import { NextResponse } from 'next/server';
import { getAllEpisodes } from '@/lib/podcast';

export async function GET() {
  const episodes = await getAllEpisodes();
  return NextResponse.json(episodes, {
    headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate' },
  });
}
