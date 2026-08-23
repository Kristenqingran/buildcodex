import type {ReactNode} from 'react';
import {ArticleShell} from '@/components/article-shell';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import type {Locale} from '@/i18n/routing';

export function WeaponsPage({locale, content}: {locale: Locale; content: ReactNode}) {
  const en = locale === 'en';
  return <><SiteHeader locale={locale} pathname="/mistfall-hunter/weapons/" /><ArticleShell eyebrow={en ? 'WEAPONS' : '武器'} title={en ? 'Mistfall Hunter Weapons: All Class Weapon Types' : 'Mistfall Hunter 武器：全职业武器类型详解'} description={en ? 'A source-checked guide to class weapon types, rarity, switching, forging, Affix Gems and Holy Weapons.' : '基于已核验资料整理全职业武器类型、稀有度、切换、锻造、词缀宝石与 Holy Weapons。'}>{content}</ArticleShell><SiteFooter locale={locale} /></>;
}
