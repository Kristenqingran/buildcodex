import {mkdtemp, mkdir, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {afterEach, describe, expect, it} from 'vitest';
import {rm} from 'node:fs/promises';
import {listGuideSlugs, loadContent, loadContentFromRoot} from '@/lib/content';

const roots: string[] = [];

async function fixture(source: string, asset?: string) {
  const root = await mkdtemp(path.join(tmpdir(), 'buildcodex-content-'));
  roots.push(root);
  const contentDir = path.join(root, 'content/en/mistfall-hunter');
  await mkdir(contentDir, {recursive: true});
  await writeFile(path.join(contentDir, 'landing.mdx'), source);
  if (asset) {
    const assetPath = path.join(root, 'public', asset.replace(/^\//, ''));
    await mkdir(path.dirname(assetPath), {recursive: true});
    await writeFile(assetPath, 'image');
  }
  return root;
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, {recursive: true})));
});

describe('localized MDX loader', () => {
  it('loads every approved localized document from the project', async () => {
    for (const locale of ['en', 'zh-CN'] as const) {
      await expect(loadContent({locale, game: 'mistfall-hunter', path: 'landing'}))
        .resolves.not.toBeNull();
      await expect(loadContent({locale, game: 'mistfall-hunter', path: 'classes'}))
        .resolves.not.toBeNull();
      await expect(loadContent({locale, game: 'mistfall-hunter', path: 'guides/best-class'}))
        .resolves.not.toBeNull();
      await expect(listGuideSlugs(locale, 'mistfall-hunter'))
        .resolves.toEqual(['best-class']);
    }
  });

  it('returns validated frontmatter and source for a matching document', async () => {
    const root = await fixture(`---
title: Mistfall Hunter
description: A field guide.
locale: en
game: mistfall-hunter
slug: landing
updated: 2026-08-12
sourceNature: official-and-editorial
images:
  - /assets/mistfall-hunter/hero.webp
---
# Begin the hunt
`, '/assets/mistfall-hunter/hero.webp');

    const loaded = await loadContentFromRoot(root, {
      locale: 'en', game: 'mistfall-hunter', path: 'landing'
    });

    expect(loaded?.frontmatter.title).toBe('Mistfall Hunter');
    expect(loaded?.source).toContain('# Begin the hunt');
  });

  it('does not fall back when localized content is missing', async () => {
    const root = await fixture('---\ntitle: invalid\n---');
    await expect(loadContentFromRoot(root, {
      locale: 'zh-CN', game: 'mistfall-hunter', path: 'landing'
    })).resolves.toBeNull();
  });

  it('rejects frontmatter whose locale disagrees with its path', async () => {
    const root = await fixture(`---
title: Mistfall Hunter
description: A field guide.
locale: zh-CN
game: mistfall-hunter
slug: landing
updated: 2026-08-12
sourceNature: official
---`);
    await expect(loadContentFromRoot(root, {
      locale: 'en', game: 'mistfall-hunter', path: 'landing'
    })).rejects.toThrow('locale does not match');
  });

  it('rejects declared local images that do not exist', async () => {
    const root = await fixture(`---
title: Mistfall Hunter
description: A field guide.
locale: en
game: mistfall-hunter
slug: landing
updated: 2026-08-12
sourceNature: official
images:
  - /assets/mistfall-hunter/missing.webp
---`);
    await expect(loadContentFromRoot(root, {
      locale: 'en', game: 'mistfall-hunter', path: 'landing'
    })).rejects.toThrow('Missing local asset');
  });
});
