import React from 'react';
import { slugify } from '@/lib/utils';

export interface TocItem {
  depth: 2 | 3;
  text: string;
  id: string;
}

export function extractHeadings(markdown: string): TocItem[] {
  const lines = markdown.split(/\n/);
  const items: TocItem[] = [];
  let inCodeBlock = false;
  const slugCounts = new Map<string, number>();
  for (let raw of lines) {
    const line = raw.trim();
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    // Ignore headings inside inline code
    if (/^`#+/.test(line)) continue;
    if (line.startsWith('## ')) {
      const text = line.replace(/^##\s+/, '').trim();
      let base = slugify(text);
      let slug = base;
      const count = slugCounts.get(base) || 0;
      if (count > 0) slug = `${base}-${count}`;
      slugCounts.set(base, count + 1);
      items.push({ depth: 2, text, id: slug });
    } else if (line.startsWith('### ')) {
      const text = line.replace(/^###\s+/, '').trim();
      let base = slugify(text);
      let slug = base;
      const count = slugCounts.get(base) || 0;
      if (count > 0) slug = `${base}-${count}`;
      slugCounts.set(base, count + 1);
      items.push({ depth: 3, text, id: slug });
    }
  }
  return items;
}

interface TableOfContentsProps {
  content: string;
  stickyTop?: string; // e.g., 'top-24'
}

export default function TableOfContents({ content, stickyTop = 'top-24' }: TableOfContentsProps) {
  const headings = React.useMemo(() => extractHeadings(content), [content]);
  if (headings.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className={`sticky ${stickyTop} rounded-xl border border-gray-200 bg-white p-4 text-sm shadow-sm`}>
      <div className="font-semibold text-gray-900 mb-2">On this page</div>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? 'pl-3' : ''}>
            <a href={`#${h.id}`} className="text-gray-700 hover:text-primary">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
