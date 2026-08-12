import type {ReactNode} from 'react';
import {ArticleShell} from '@/components/article-shell';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import type {Locale} from '@/i18n/routing';

export function ClassesPage({locale, content}: {locale: Locale; content: ReactNode}) {
  const en = locale === 'en';
  return <><SiteHeader locale={locale} pathname="/mistfall-hunter/classes/" /><ArticleShell eyebrow={en ? 'CLASSES' : '职业'} title={en ? 'Mistfall Hunter Classes' : 'Mistfall Hunter 职业'} description={en ? 'Six classes, twelve weapon identities — compare every path through the Gyldenmist.' : '六大职业、十二种武器定位——对比每一条穿越金雾的道路。'}>{content}</ArticleShell><SiteFooter locale={locale} /></>;
}
