import GithubSlugger from 'github-slugger';

export type TocItem = { id: string; text: string; depth: 2 | 3 };

export function extractTocFromMdx(content: string): TocItem[] {
  const lines = content.split(/\r?\n/);
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];
  for (const line of lines) {
    // match ## or ### headings but ignore code fences
    const m = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (m) {
      const depth = m[1].length as 2 | 3;
      if (depth === 2 || depth === 3) {
        const raw = m[2].replace(/`/g, '').trim();
        const id = slugger.slug(raw);
        toc.push({ id, text: raw, depth });
      }
    }
  }
  return toc;
}

