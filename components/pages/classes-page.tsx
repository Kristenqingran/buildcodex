import type {ReactNode} from 'react';
import {ArticleShell} from '@/components/article-shell';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import type {Locale} from '@/i18n/routing';

export function ClassesPage({locale, content}: {locale: Locale; content: ReactNode}) {
  const en = locale === 'en';
  return <><SiteHeader locale={locale} pathname="/mistfall-hunter/classes/" /><ArticleShell eyebrow={en ? 'CLASSES' : '职业'} title={en ? 'Mistfall Hunter Classes: All 6 Classes Explained' : 'Mistfall Hunter 全六职业详解'} description={en ? 'Six classes, distinct weapon identities and the current class-switching rules — without tier rankings.' : '了解六大职业、不同武器定位及目前已知的职业切换规则，不做强弱排名。'}>{content}</ArticleShell><SiteFooter locale={locale} /></>;
}
