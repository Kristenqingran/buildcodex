import type {Metadata} from 'next';
import {siteConfig, type Locale} from './site-content';

export function localizedUrl(locale: Locale, pathname = '') { return new URL(`/${locale}${pathname}`, siteConfig.origin).toString(); }
export function buildMetadata(locale: Locale, title: string, description: string, pathname = ''): Metadata {
  const canonical = localizedUrl(locale, pathname);
  return {title, description, alternates: {canonical, languages: {en: localizedUrl('en', pathname), 'zh-CN': localizedUrl('zh-CN', pathname), 'x-default': localizedUrl('en', pathname)}}, openGraph: {title, description, url: canonical, siteName: siteConfig.name, type: 'website'}};
}
