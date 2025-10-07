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

