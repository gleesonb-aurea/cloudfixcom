export function cn(
  ...classes: Array<
    | string
    | false
    | null
    | undefined
    | Array<string | false | null | undefined>
  >
): string {
  const out: string[] = [];
  for (const cls of classes) {
    if (!cls) continue;
    if (Array.isArray(cls)) {
      for (const c of cls) {
        if (c) out.push(c);
      }
    } else {
      out.push(cls);
    }
  }
  return out.join(' ');
}

export function slugify(text: string): string {
  // Normalize and remove diacritics
  const normalized = text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  return normalized
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
