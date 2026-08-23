import fs from 'node:fs';
import path from 'node:path';
import {describe, expect, it} from 'vitest';

describe('Adsterra placement', () => {
  const read = (locale: 'en' | 'zh-CN', page: 'builds' | 'classes' | 'weapons') =>
    fs.readFileSync(
      path.join(process.cwd(), `content/${locale}/mistfall-hunter/${page}.mdx`),
      'utf8'
    );

  it('appears once at the approved position on each English page', () => {
    const marker = '<AdsterraNativeBanner />';
    const builds = read('en', 'builds');
    const classes = read('en', 'classes');
    const weapons = read('en', 'weapons');

    for (const content of [builds, classes, weapons]) {
      expect(content.split(marker)).toHaveLength(2);
    }

    expect(builds.indexOf(marker)).toBeGreaterThan(
      builds.indexOf('## What defines a build in Mistfall Hunter')
    );
    expect(builds.indexOf(marker)).toBeLessThan(
      builds.indexOf('## Mercenary — Durable Melee All-Rounder')
    );

    expect(classes.indexOf(marker)).toBeGreaterThan(
      classes.indexOf('| Withered Knight | Heavy technical frontline |')
    );
    expect(classes.indexOf(marker)).toBeLessThan(classes.indexOf('### Mercenary'));

    expect(weapons.indexOf(marker)).toBeGreaterThan(
      weapons.indexOf('### Withered Knight Weapons')
    );
    expect(weapons.indexOf(marker)).toBeLessThan(
      weapons.indexOf('## Mistfall Hunter Weapons List')
    );
  });

  it('does not place the native banner in Chinese content', () => {
    const marker = '<AdsterraNativeBanner />';
    for (const page of ['builds', 'classes', 'weapons'] as const) {
      expect(read('zh-CN', page)).not.toContain(marker);
    }
  });
});
