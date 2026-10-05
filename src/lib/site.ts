import { getCollection } from 'astro:content';

/** Build a link that works both at "/" and under a GitHub Pages sub-path. */
export const url = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

/** Published poems, newest first. Drafts are shown only in `npm run dev`. */
export async function getPoems() {
  const all = await getCollection('poems', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const unitLabel = (kind: 'siir' | 'metin') => (kind === 'siir' ? 'beyit' : 'paragraf');

/** Link to a poem or text page, depending on its kind. */
export const itemUrl = (item: { id: string; data: { kind: 'siir' | 'metin' } }) =>
  url(`${item.data.kind === 'metin' ? 'metin' : 'siir'}/${item.id}/`);

/** Book a text belongs to: `book`, else the part of `source` before the first comma. */
export const bookOf = (d: { book?: string; source?: string }) =>
  d.book ?? d.source?.split(',')[0].trim() ?? 'Diğer';
