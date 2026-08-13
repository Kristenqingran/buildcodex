import {describe, expect, it} from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

const expectedUrls = [
  'https://www.buildcodex.net/mistfall-hunter/',
  'https://www.buildcodex.net/zh-CN/mistfall-hunter/',
  'https://www.buildcodex.net/mistfall-hunter/classes/',
  'https://www.buildcodex.net/zh-CN/mistfall-hunter/classes/',
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
});
