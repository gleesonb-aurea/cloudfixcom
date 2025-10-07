import { NextResponse } from 'next/server';
import { getAllEpisodes } from '@/lib/podcast';

export async function GET() {
  const episodes = await getAllEpisodes();
  return NextResponse.json(episodes, {
    headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate' },
  });
}

