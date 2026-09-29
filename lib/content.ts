import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {notFound} from 'next/navigation';
import {tutorialFrontmatterSchema, type TutorialFrontmatter} from './content-schema';
import type {Locale, SectionSlug} from './site-content';

const contentRoot = path.join(process.cwd(), 'content');
export type TutorialSummary = TutorialFrontmatter;

async function tutorialDirectory(locale: Locale, section: SectionSlug | 'tutorials' = 'tutorials') { return path.join(contentRoot, locale, section); }

export async function getTutorials(locale: Locale, section: SectionSlug | 'tutorials' = 'tutorials'): Promise<TutorialSummary[]> {
  const directory = await tutorialDirectory(locale, section);
  let files: string[];
  try { files = await fs.readdir(directory); } catch { return []; }
  const tutorials = await Promise.all(files.filter((file) => /\.(md|mdx)$/.test(file)).map(async (file) => {
    const source = await fs.readFile(path.join(directory, file), 'utf8');
    const parsed = matter(source);
    return tutorialFrontmatterSchema.parse({...parsed.data, slug: parsed.data.slug ?? file.replace(/\.(md|mdx)$/, '')});
  }));
  return tutorials.sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''));
}

export async function getTutorial(locale: Locale, slug: string, section: SectionSlug | 'tutorials' = 'tutorials') {
  const directory = await tutorialDirectory(locale, section);
  for (const extension of ['.mdx', '.md']) {
    try {
      const source = await fs.readFile(path.join(directory, `${slug}${extension}`), 'utf8');
      const parsed = matter(source);
      const frontmatter = tutorialFrontmatterSchema.parse({...parsed.data, slug: parsed.data.slug ?? slug});
      return {frontmatter, content: parsed.content};
    } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
  }
  notFound();
}
