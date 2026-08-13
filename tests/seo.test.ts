import {describe, expect, it} from 'vitest';
import {buildLocalizedMetadata} from '@/lib/seo';

describe('localized SEO metadata', () => {
  it('uses a self canonical and English x-default for Chinese content', () => {
    const metadata = buildLocalizedMetadata({
      locale: 'zh-CN',
      pathname: '/mistfall-hunter/classes/',
      title: 'Mistfall Hunter 职业',
      description: '六大职业指南'
    });
    expect(metadata.alternates?.canonical?.toString()).toBe(
      'https://www.buildcodex.net/zh-CN/mistfall-hunter/classes/'
    );
    expect(metadata.alternates?.languages).toEqual({
      en: 'https://www.buildcodex.net/mistfall-hunter/classes/',
      'zh-CN': 'https://www.buildcodex.net/zh-CN/mistfall-hunter/classes/',
      'x-default': 'https://www.buildcodex.net/mistfall-hunter/classes/'
    });
  });

  it('never emits an /en prefix for English canonical URLs', () => {
    const metadata = buildLocalizedMetadata({
      locale: 'en', pathname: '/mistfall-hunter/', title: 'Mistfall Hunter', description: 'Guide'
    });
    expect(metadata.alternates?.canonical?.toString()).toBe(
      'https://www.buildcodex.net/mistfall-hunter/'
    );
  });
});
