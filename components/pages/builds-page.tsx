import type {ReactNode} from 'react';
import {ArticleShell} from '@/components/article-shell';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import type {Locale} from '@/i18n/routing';

export function BuildsPage({locale, content}: {locale: Locale; content: ReactNode}) {
  const en = locale === 'en';
  return <><SiteHeader locale={locale} pathname="/mistfall-hunter/builds/" /><ArticleShell eyebrow={en ? 'BUILDS' : '配装'} title={en ? 'Mistfall Hunter Builds' : 'Mistfall Hunter 配装总览'} description={en ? 'Practical loadout directions for every class — compiled from current research.' : '基于现有资料整理的各职业实用配装方向。'}>{content}</ArticleShell><SiteFooter locale={locale} /></>;
}
