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

  it('appears once at the matching approved position on each Chinese page', () => {
    const marker = '<AdsterraNativeBanner />';
    const builds = read('zh-CN', 'builds');
    const classes = read('zh-CN', 'classes');
    const weapons = read('zh-CN', 'weapons');

    for (const content of [builds, classes, weapons]) {
      expect(content.split(marker)).toHaveLength(2);
    }

    expect(builds.indexOf(marker)).toBeGreaterThan(
      builds.indexOf('## Mistfall Hunter 中"配装"的构成')
    );
    expect(builds.indexOf(marker)).toBeLessThan(
      builds.indexOf('## 佣兵 Mercenary — 均衡耐打的近战')
    );

    expect(classes.indexOf(marker)).toBeGreaterThan(
      classes.indexOf('| 凋零骑士 Withered Knight | 重装技术前排 |')
    );
    expect(classes.indexOf(marker)).toBeLessThan(classes.indexOf('### 佣兵 Mercenary'));

    expect(weapons.indexOf(marker)).toBeGreaterThan(
      weapons.indexOf('### 凋零骑士 Withered Knight 武器')
    );
    expect(weapons.indexOf(marker)).toBeLessThan(
      weapons.indexOf('## Mistfall Hunter 武器列表')
    );
  });
});
