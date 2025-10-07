import React from 'react';

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export interface TocItem {
  depth: 2 | 3;
  text: string;
  id: string;
}

export function extractHeadings(markdown: string): TocItem[] {
  const lines = markdown.split(/\n/);
  const items: TocItem[] = [];
  for (const line of lines) {
    if (line.startsWith('## ')) {
      const text = line.replace(/^##\s+/, '').trim();
      items.push({ depth: 2, text, id: slugify(text) });
    } else if (line.startsWith('### ')) {
      const text = line.replace(/^###\s+/, '').trim();
      items.push({ depth: 3, text, id: slugify(text) });
    }
  }
  return items;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const headings = React.useMemo(() => extractHeadings(content), [content]);
  if (headings.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className="sticky top-24 rounded-xl border border-gray-200 bg-white p-4 text-sm shadow-sm">
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

