import { NextResponse } from 'next/server';
import { getAllResources } from '@/lib/resources';

export async function GET() {
  const res = await getAllResources();
  return NextResponse.json(res, { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate' } });
}

