/**
 * Sweep MDX blog posts to fix common content issues:
 * - Replace legacy WordPress [caption] shortcodes with semantic <figure><img/><figcaption></figcaption></figure>
 * - Normalize simple (#FAQ) anchors to lowercase (#faq)
 *
 * Run with: npx ts-node scripts/sweep-content-fixes.ts
 */

import fs from 'fs/promises';
import path from 'path';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'content', 'blog');

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && (p.endsWith('.mdx') || p.endsWith('.md'))) yield p;
  }
}

function replaceCaptions(input: string): string {
  // Matches: [caption ...]![alt](src) CAPTION[/caption]
  const re = /\[caption[^\]]*\]\s*!\[([^\]]*)\]\(([^)]+)\)\s*([^\[]*?)\s*\[\/caption\]/g;
  return input.replace(re, (_, alt, src, caption) => {
    const safeAlt = (alt || '').trim();
    const safeCaption = (caption || '').trim();
    const fig = [
      '<figure>',
      `  <img src="${src}" alt="${safeAlt}" />`,
      safeCaption ? `  <figcaption>${safeCaption}</figcaption>` : '',
      '</figure>',
    ]
      .filter(Boolean)
      .join('\n');
    return fig;
  });
}

function replaceEscapedCaptions(input: string): string {
  // Matches: \[caption ...]\ ![alt](src) CAPTION \[/caption]
  const re = /\\\[caption[^\]]*\\\]\s*!\[([^\]]*)\]\(([^)]+)\)\s*([^\\\[]*?)\\\[\/caption\\\]/g;
  return input.replace(re, (_, alt, src, caption) => {
    const safeAlt = (alt || '').trim();
    const safeCaption = (caption || '').trim();
    const fig = [
      '<figure>',
      `  <img src="${src}" alt="${safeAlt}" />`,
      safeCaption ? `  <figcaption>${safeCaption}</figcaption>` : '',
      '</figure>',
    ]
      .filter(Boolean)
      .join('\\n');
    return fig;
  });
}

function normalizeAnchors(input: string): string {
  // Standardize (#FAQ) to (#faq)
  return input.replace(/\(#FAQ\)/g, '(#faq)');
}

async function main() {
  let changed = 0;
  for await (const file of walk(BLOG_DIR)) {
    const orig = await fs.readFile(file, 'utf-8');
    let out = orig;
    out = replaceCaptions(out);
    out = replaceEscapedCaptions(out);
    out = normalizeAnchors(out);
    if (out !== orig) {
      await fs.writeFile(file, out, 'utf-8');
      console.log('Updated', path.relative(ROOT, file));
      changed++;
    }
  }
  console.log(`Done. Updated ${changed} file(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
