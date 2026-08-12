import {access, readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {contentFrontmatterSchema, type ContentFrontmatter} from './content-schema';

export type ContentRequest = {
  locale: 'en' | 'zh-CN';
  game: string;
  path: string;
};

export type LoadedContent = {
  frontmatter: ContentFrontmatter;
  source: string;
  filePath: string;
};

function safeSegments(value: string) {
  return value.split('/').every((segment) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(segment));
}

export async function loadContentFromRoot(
  root: string,
  request: ContentRequest
): Promise<LoadedContent | null> {
  if (!safeSegments(request.game) || !safeSegments(request.path)) {
    throw new Error('Invalid content path');
  }

  const filePath = path.join(
    root, 'content', request.locale, request.game, `${request.path}.mdx`
  );
  let raw: string;
  try {
    raw = await readFile(filePath, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }

  const parsed = matter(raw);
  const result = contentFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${filePath}: ${result.error.message}`);
  }
  const frontmatter = result.data;
  if (frontmatter.locale !== request.locale) {
    throw new Error(`Frontmatter locale does not match path in ${filePath}`);
  }
  if (frontmatter.game !== request.game) {
    throw new Error(`Frontmatter game does not match path in ${filePath}`);
  }
  const expectedSlug = request.path.split('/').at(-1);
  if (frontmatter.slug !== expectedSlug) {
    throw new Error(`Frontmatter slug does not match path in ${filePath}`);
  }

  for (const image of frontmatter.images) {
    const assetPath = path.join(root, 'public', image.replace(/^\//, ''));
    try {
      await access(assetPath);
    } catch {
      throw new Error(`Missing local asset ${image} declared by ${filePath}`);
    }
  }

  return {frontmatter, source: parsed.content.trim(), filePath};
}

export function loadContent(request: ContentRequest) {
  return loadContentFromRoot(process.cwd(), request);
}

export async function listGuideSlugs(locale: ContentRequest['locale'], game: string) {
  const directory = path.join(process.cwd(), 'content', locale, game, 'guides');
  try {
    return (await readdir(directory))
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => name.slice(0, -4));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
}
