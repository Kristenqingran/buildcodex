import type {Metadata} from 'next';
import {localizePath, type Locale} from '@/i18n/routing';
import {siteConfig} from './site';

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.origin).toString();
}

export function buildLocalizedMetadata({locale, pathname, title, description, image}: {
  locale: Locale; pathname: string; title: string; description: string; image?: string;
}): Metadata {
  const english = absoluteUrl(localizePath('en', pathname));
  const chinese = absoluteUrl(localizePath('zh-CN', pathname));
  const canonical = locale === 'en' ? english : chinese;
  return {
    title: `${title} · BuildCodex`,
    description,
    alternates: {canonical, languages: {en: english, 'zh-CN': chinese, 'x-default': english}},
    openGraph: {
      type: 'website', title, description, url: canonical, siteName: siteConfig.name,
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      images: image ? [{url: absoluteUrl(image)}] : undefined
    }
  };
}
