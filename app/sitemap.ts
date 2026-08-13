import type {MetadataRoute} from 'next';
import {localizePath, type Locale} from '@/i18n/routing';
import {absoluteUrl} from '@/lib/seo';

const indexablePaths = [
  '/mistfall-hunter/',
  '/mistfall-hunter/classes/',
  '/mistfall-hunter/guides/best-class/'
] as const;

const indexedLocales = ['en', 'zh-CN'] as const satisfies readonly Locale[];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.flatMap((pathname) =>
    indexedLocales.map((locale) => ({
      url: absoluteUrl(localizePath(locale, pathname))
    }))
  );
}
