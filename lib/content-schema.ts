import {z} from 'zod';

export const tutorialFrontmatterSchema = z.object({
  title: z.string().min(1), description: z.string().min(1), category: z.string().min(1), slug: z.string().min(1), publishedAt: z.string().optional(), updatedAt: z.string().optional()
});
export type TutorialFrontmatter = z.infer<typeof tutorialFrontmatterSchema>;
