import fs from 'fs/promises';
import path from 'path';

export type ResourceType = 'blog' | 'podcast' | 'video' | 'case-study' | 'success-story';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: string;
  tags: string[];
  publishDate: string;
  featured: boolean;
  readTime?: number;
  duration?: number;
  thumbnail: string;
  author?: string;
  url: string; // internal or external
  metadata?: {
    views?: number;
    downloads?: number;
    rating?: number;
  };
}

const resourcesPath = path.join(process.cwd(), 'content', 'resources', 'resources.json');

export async function getAllResources(): Promise<Resource[]> {
  try {
    await fs.stat(resourcesPath);
  } catch {
    return [];
  }
  const raw = await fs.readFile(resourcesPath, 'utf-8');
  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  const arr: any[] = Array.isArray(parsed) ? parsed : Array.isArray(parsed.resources) ? parsed.resources : [];
  const list: Resource[] = arr.map((it) => {
    const id = String(it.id ?? it.slug ?? cryptoRandom());
    const publishDate = it.publishDate || it.date || new Date().toISOString();
    const thumbnail = it.thumbnail || it.featuredImage || '';
    const url = it.url || (it.slug ? `/resources/${it.slug}` : `/resources/${id}`);
    return {
      id,
      title: it.title || '',
      description: it.description || '',
      type: it.type || 'blog',
      category: it.category || 'General',
      tags: Array.isArray(it.tags) ? it.tags : [],
      publishDate,
      featured: !!it.featured,
      readTime: it.readTime,
      duration: it.duration,
      thumbnail,
      author: it.author,
      url,
      metadata: it.metadata,
    } as Resource;
  });
  return list.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

function cryptoRandom() {
  // simple fallback id
  return Math.random().toString(36).slice(2);
}

export async function getResourceById(id: string): Promise<Resource | null> {
  const all = await getAllResources();
  return all.find((r) => r.id === id) ?? null;
}
