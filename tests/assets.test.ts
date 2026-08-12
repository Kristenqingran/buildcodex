import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';
import {describe, expect, it} from 'vitest';

describe('official asset source manifest', () => {
  it('documents every local WebP with an official source and usage', async () => {
    const directory = path.join(process.cwd(), 'public/assets/mistfall-hunter');
    const files = (await readdir(directory)).filter((name) => name.endsWith('.webp'));
    expect(files.length).toBeGreaterThanOrEqual(5);
    const manifest = await readFile(path.join(directory, 'SOURCES.md'), 'utf8');
    for (const file of files) {
      expect(manifest).toContain(`\`${file}\``);
    }
    expect(manifest).toMatch(/https:\/\/(?:store\.steampowered\.com|shared\.[a-z]+\.steamstatic\.com|mistfallhunter\.com)/);
    expect(manifest).toContain('Usage');
  });
});
