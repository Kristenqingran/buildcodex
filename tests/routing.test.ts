import {describe, expect, it} from 'vitest';
import {localizePath, routing} from '@/i18n/routing';

describe('localized routing', () => {
  it('keeps English unprefixed and prefixes Simplified Chinese', () => {
    expect(localizePath('en', '/mistfall-hunter/classes/')).toBe(
      '/mistfall-hunter/classes/'
    );
    expect(localizePath('zh-CN', '/mistfall-hunter/classes/')).toBe(
      '/zh-CN/mistfall-hunter/classes/'
    );
  });

  it('declares English as the default locale', () => {
    expect(routing.defaultLocale).toBe('en');
    expect([...routing.locales]).toEqual(['en', 'zh-CN']);
    expect(routing.localePrefix).toBe('as-needed');
  });
});
