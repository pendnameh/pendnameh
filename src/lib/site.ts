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
