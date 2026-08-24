import {describe, expect, it} from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import manifest from '@/app/manifest';

const expectedUrls = [
  'https://www.buildcodex.net/mistfall-hunter/',
  'https://www.buildcodex.net/zh-CN/mistfall-hunter/',
  'https://www.buildcodex.net/mistfall-hunter/classes/',
  'https://www.buildcodex.net/zh-CN/mistfall-hunter/classes/',
  'https://www.buildcodex.net/mistfall-hunter/builds/',
  'https://www.buildcodex.net/zh-CN/mistfall-hunter/builds/',
  'https://www.buildcodex.net/mistfall-hunter/weapons/',
  'https://www.buildcodex.net/zh-CN/mistfall-hunter/weapons/',
  'https://www.buildcodex.net/mistfall-hunter/guides/beginner-guide/',
  'https://www.buildcodex.net/zh-CN/mistfall-hunter/guides/beginner-guide/',
  'https://www.buildcodex.net/mistfall-hunter/guides/cipher-guide/',
  'https://www.buildcodex.net/zh-CN/mistfall-hunter/guides/cipher-guide/',
  'https://www.buildcodex.net/mistfall-hunter/guides/best-class/',
  'https://www.buildcodex.net/zh-CN/mistfall-hunter/guides/best-class/'
];

describe('metadata routes', () => {
  it('lists only canonical pages that currently exist', () => {
    expect(sitemap().map(({url}) => url)).toEqual(expectedUrls);
  });

  it('advertises the absolute sitemap URL to crawlers', () => {
    expect(robots()).toEqual({
      rules: {userAgent: '*', allow: '/'},
      sitemap: 'https://www.buildcodex.net/sitemap.xml'
    });
  });

  it('publishes installable BuildCodex icon metadata', () => {
    expect(manifest()).toMatchObject({
      name: 'BuildCodex',
      short_name: 'BuildCodex',
      start_url: '/',
      icons: [
        {src: '/icons/buildcodex-icon-192.png', sizes: '192x192', type: 'image/png'},
        {src: '/icons/buildcodex-icon-512.png', sizes: '512x512', type: 'image/png'}
      ]
    });
  });
});
