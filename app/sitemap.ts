import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { getAllResources } from '@/lib/resources'
import { getAllEpisodes } from '@/lib/podcast'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudfix.com'
  const now = new Date()
  const staticRoutes = ['', '/features', '/pricing', '/contact', '/assessment', '/blog', '/resources', '/podcast', '/videos', '/livestream', '/success-stories']
  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path || '/'}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))

  const [posts, resources, episodes] = await Promise.all([
    getAllPosts(),
    getAllResources(),
    getAllEpisodes(),
  ])

  posts.forEach((p) => entries.push({ url: `${baseUrl}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: 'weekly', priority: 0.8 }))
  resources.forEach((r) => entries.push({ url: `${baseUrl}/resources/${r.id}`, lastModified: new Date((r as any).publishDate || (r as any).date || now), changeFrequency: 'monthly', priority: 0.6 }))
  episodes.forEach((e) => entries.push({ url: `${baseUrl}/podcast/${e.id}`, lastModified: new Date(e.publishDate), changeFrequency: 'monthly', priority: 0.6 }))

  return entries
}
