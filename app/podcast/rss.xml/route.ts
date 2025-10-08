// ABOUTME: Podcast RSS feed route generating RSS 2.0 XML
import { NextResponse } from 'next/server';
import { getAllEpisodes } from '@/lib/podcast';

export const dynamic = 'force-dynamic';

/**
 * Generate an RSS 2.0 feed for the CloudFix Podcast using all episodes.
 *
 * The feed includes channel metadata and one <item> per episode (title, link, guid,
 * pubDate, description, and optional enclosure for audio). Site URL is taken from
 * NEXT_PUBLIC_SITE_URL with a fallback to https://cloudfix.com.
 *
 * @returns A NextResponse containing the RSS 2.0 XML for all episodes with
 *          Content-Type `application/rss+xml; charset=utf-8` and a
 *          `Cache-Control: s-maxage=3600, stale-while-revalidate` header.
 */
export async function GET() {
  const eps = await getAllEpisodes();
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudfix.com';
  const rssItems = eps
    .map(
      (e) => `
  <item>
    <title><![CDATA[${e.title}]]></title>
    <link>${site}/podcast/${e.id}</link>
    <guid isPermaLink="true">${site}/podcast/${e.id}</guid>
    <pubDate>${new Date(e.publishDate).toUTCString()}</pubDate>
    <description><![CDATA[${e.description}]]></description>
    ${e.audio ? `<enclosure url="${site}${e.audio}" type="audio/mpeg" />` : ''}
  </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>CloudFix Podcast</title>
    <link>${site}/podcast</link>
    <description>AWS optimization discussions with CloudFix</description>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}