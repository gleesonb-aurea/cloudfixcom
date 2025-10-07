import fs from 'fs';
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
  if (!fs.existsSync(resourcesPath)) return [];
  const raw = fs.readFileSync(resourcesPath, 'utf8');
  const list: Resource[] = JSON.parse(raw);
  return list.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export async function getResourceById(id: string): Promise<Resource | null> {
  const all = await getAllResources();
  return all.find((r) => r.id === id) ?? null;
}

