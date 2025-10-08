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

  // Recursively find all MDX files
  function findMdxFiles(dir: string, basePath: string = ''): string[] {
    const files: string[] = [];
    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findMdxFiles(fullPath, basePath ? `${basePath}/${entry}` : entry));
      } else if (entry.endsWith('.mdx')) {
        files.push(basePath ? `${basePath}/${entry}` : entry);
      }
    }

    return files;
  }

  const entries = findMdxFiles(postsDirectory);
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

/**
 * Load a blog post by its slug from the content/blog MDX files.
 *
 * @param slug - The post slug (filename without the `.mdx` extension) to locate.
 * @returns The corresponding `BlogPost` populated from the file's front matter and content, or `null` if no matching MDX file is found. Missing front-matter fields are filled with sensible defaults: `title` defaults to the slug, `description` to an empty string, `author` to "CloudFix Team", `date` to the current ISO string, `category` to "General", `tags` to an empty array, `featured` coerced to a boolean, `readTime` computed from content when absent, and `image`/`seo` preserved if present.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Search recursively for the MDX file with matching slug
  function findMdxFile(dir: string, targetSlug: string): string | null {
    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const found = findMdxFile(fullPath, targetSlug);
        if (found) return found;
      } else if (fullPath.endsWith(`${targetSlug}.mdx`)) {
        return fullPath;
      }
    }

    return null;
  }

  const fullPath = findMdxFile(postsDirectory, slug);
  if (!fullPath) return null;
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  // Sanitize unsafe angle-bracket tokens that MDX would treat as JSX
  // but are intended as plain text in imported WordPress content.
  const sanitizeForMdx = (src: string) => {
    const lines = src.split(/\r?\n/);
    let inFence = false;
    return lines
      .map((line) => {
        const fenceMatch = line.match(/^\s*```/);
        if (fenceMatch) {
          inFence = !inFence;
          return line;
        }
        if (inFence) return line;
        // Broadly escape problematic MDX tokens outside code fences
        let out = line
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\{/g, '&#123;')
          .replace(/\}/g, '&#125;');
        return out;
      })
      .join('\n');
    };
  const safeContent = sanitizeForMdx(content);
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
    content: safeContent,
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
