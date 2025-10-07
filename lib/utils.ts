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
