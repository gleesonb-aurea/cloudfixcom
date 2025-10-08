// ABOUTME: Blog RSS feed route generating RSS 2.0 XML
import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-dynamic';

/**
 * Serve the CloudFix blog RSS feed as an RSS 2.0 XML HTTP response.
 *
 * @returns A NextResponse containing the RSS 2.0 XML for all blog posts. The response includes the `Content-Type: application/rss+xml; charset=utf-8` header and `Cache-Control: s-maxage=3600, stale-while-revalidate`.
 */
export async function GET() {
  const posts = await getAllPosts();
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudfix.com';
  const rssItems = posts
    .map(
      (p) => `
  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>${site}/blog/${p.slug}</link>
    <guid isPermaLink="true">${site}/blog/${p.slug}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description><![CDATA[${p.description}]]></description>
  </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>CloudFix Blog</title>
    <link>${site}/blog</link>
    <description>AWS cost optimization insights from CloudFix</description>
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