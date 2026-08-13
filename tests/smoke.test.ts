import {describe, expect, it} from 'vitest';
import {siteConfig} from '@/lib/site';

describe('siteConfig', () => {
  it('builds absolute production URLs from the BuildCodex origin', () => {
    expect(new URL('/mistfall-hunter/', siteConfig.origin).href).toBe(
      'https://www.buildcodex.net/mistfall-hunter/'
    );
    expect(siteConfig.name).toBe('BuildCodex');
  });
});
