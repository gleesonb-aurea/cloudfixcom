import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  readTime?: number;
  image?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

function calcReadTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  if (!fs.existsSync(postsDirectory)) return [];
  const entries = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx'));
  const posts: BlogPostMeta[] = entries.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      author: data.author || 'CloudFix Team',
      date: data.date || new Date().toISOString(),
      category: data.category || 'General',
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: !!data.featured,
      readTime: data.readTime || calcReadTime(content),
      image: data.image,
      seo: data.seo,
    } as BlogPostMeta;
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    author: data.author || 'CloudFix Team',
    date: data.date || new Date().toISOString(),
    category: data.category || 'General',
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: !!data.featured,
    readTime: data.readTime || calcReadTime(content),
    image: data.image,
    seo: data.seo,
    content,
  } as BlogPost;
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set(posts.map((p) => p.category).filter(Boolean));
  return Array.from(set).sort();
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export interface BlogQuery {
  category?: string;
  tag?: string;
  q?: string;
}

export async function queryPosts(params: BlogQuery): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts();
  const ql = params.q?.toLowerCase().trim();
  return posts.filter((p) => {
    if (params.category && p.category !== params.category) return false;
    if (params.tag && !p.tags?.includes(params.tag)) return false;
    if (ql && !(
      p.title.toLowerCase().includes(ql) ||
      p.description.toLowerCase().includes(ql) ||
      p.tags.some((t) => t.toLowerCase().includes(ql))
    )) return false;
    return true;
  });
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * perPage;
  const slice = items.slice(start, start + perPage);
  return { total, pages, current, perPage, items: slice };
}
