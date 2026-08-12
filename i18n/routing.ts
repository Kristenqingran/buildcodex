import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh-CN'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false
});

export type Locale = (typeof routing.locales)[number];

export function localizePath(locale: Locale, pathname: string) {
  return locale === routing.defaultLocale ? pathname : `/${locale}${pathname}`;
}
