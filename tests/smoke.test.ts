import {describe, expect, it} from 'vitest';
import {siteConfig} from '@/lib/site-content';

describe('empty site scaffold', () => {
  it('exposes the initial site identity', () => {
    expect(siteConfig.name).toBe('BuildCodex');
    expect(siteConfig.description).toContain('Codex');
  });
});
