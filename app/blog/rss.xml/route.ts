import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const posts = await getAllPosts();
  const site = 'https://cloudfix.com';
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

