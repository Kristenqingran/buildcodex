import fs from 'node:fs';
import path from 'node:path';
import {describe, expect, it} from 'vitest';

describe('Adsterra placement', () => {
  it('appears once in the English Builds body and nowhere in Chinese content', () => {
    const english = fs.readFileSync(
      path.join(process.cwd(), 'content/en/mistfall-hunter/builds.mdx'),
      'utf8'
    );
    const chinese = fs.readFileSync(
      path.join(process.cwd(), 'content/zh-CN/mistfall-hunter/builds.mdx'),
      'utf8'
    );
    const marker = '<AdsterraNativeBanner />';

    expect(english.split(marker)).toHaveLength(2);
    expect(english.indexOf(marker)).toBeGreaterThan(
      english.indexOf('## What defines a build in Mistfall Hunter')
    );
    expect(english.indexOf(marker)).toBeLessThan(
      english.indexOf('## Mercenary — Durable Melee All-Rounder')
    );
    expect(chinese).not.toContain(marker);
  });
});
