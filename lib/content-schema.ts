import {z} from 'zod';

export const contentFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  locale: z.enum(['en', 'zh-CN']),
  game: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  slug: z.string().min(1),
  updated: z.coerce.string().min(1),
  sourceNature: z.enum([
    'official',
    'editorial',
    'tested',
    'community-consensus',
    'official-and-editorial'
  ]),
  images: z.array(z.string().regex(/^\/assets\//)).default([])
});

export type ContentFrontmatter = z.infer<typeof contentFrontmatterSchema>;
