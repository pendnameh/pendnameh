import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// Multi-line text: one line per verse line. Empty lines are ignored.
const lines = z
  .string()
  .transform((s) => s.split('\n').map((l) => l.trim()).filter(Boolean));

const poets = defineCollection({
  loader: file('src/data/poets.yaml'),
  schema: z.object({
    name: z.string(),          // Türkçe ad
    fa: z.string(),            // Farsça ad
    years: z.string(),
    place: z.string(),
    bio: z.string(),
  }),
});

const topics = defineCollection({
  loader: file('src/data/topics.yaml'),
  schema: z.object({ name: z.string() }),
});

const poems = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/poems' }),
  schema: z.object({
    title: z.string(),                         // Türkçe başlık
    faTitle: z.string().optional(),            // Farsça başlık
    poet: reference('poets'),
    kind: z.enum(['siir', 'metin']).default('siir'),
    source: z.string().optional(),
    date: z.coerce.date(),
    topics: z.array(reference('topics')).default([]),
    draft: z.boolean().default(false),
    stanzas: z
      .array(
        z.object({
          fa: lines,
          tr: lines,
          en: lines.optional(),
        }),
      )
      .min(1),
  }),
});

export const collections = { poets, topics, poems };
