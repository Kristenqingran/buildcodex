import {describe, expect, it} from 'vitest';
import {siteConfig, sectionSlugs} from '@/lib/site-content';

describe('BuildCodex content site', () => {
  it('exposes the site identity and four content sections', () => {
    expect(siteConfig.name).toBe('BuildCodex');
    expect(siteConfig.description).toContain('Codex');
    expect(sectionSlugs).toHaveLength(4);
  });
});
