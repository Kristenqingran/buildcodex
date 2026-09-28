import {describe, expect, it} from 'vitest';
import {siteContent} from '@/lib/site-content';

describe('empty site scaffold', () => {
  it('exposes the initial site identity', () => {
    expect(siteContent.name).toBe('BuildCodex');
    expect(siteContent.tagline).toBeTruthy();
  });
});
