import {NextRequest} from 'next/server';
import {describe, expect, it} from 'vitest';
import proxy from '@/proxy';

describe('public URL normalization', () => {
  it('permanently redirects internal English locale URLs to canonical paths', () => {
    const response = proxy(new NextRequest(
      'https://www.buildcodex.net/en/mistfall-hunter/classes/?source=test'
    ));

    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe(
      'https://www.buildcodex.net/mistfall-hunter/classes/?source=test'
    );
  });

  it('keeps entry redirects temporary', () => {
    const response = proxy(new NextRequest('https://www.buildcodex.net/'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'https://www.buildcodex.net/mistfall-hunter/'
    );
  });
});
