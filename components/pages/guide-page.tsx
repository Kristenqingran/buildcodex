import type {ReactNode} from 'react';
import {ArticleShell} from '@/components/article-shell';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import type {Locale} from '@/i18n/routing';

export function GuidePage({locale, content}: {locale: Locale; content: ReactNode}) {
  const en = locale === 'en';
  const toc = en ? ['How this ranking works','S Tier — Mercenary','S Tier — Seer for coordinated teams','Comparison','Final recommendation'] : ['评级方法','S 级 — 佣兵','S 级 — 固定队中的先知','对比表','最终推荐'];
  return <><SiteHeader locale={locale} pathname="/mistfall-hunter/guides/best-class/" /><ArticleShell eyebrow={en ? 'EDITORIAL · CLASS GUIDE' : '编辑评测 · 职业指南'} title={en ? 'Mistfall Hunter Best Class' : 'Mistfall Hunter 最强职业'} description={en ? 'A grounded ranking for learning, solo pressure and coordinated squads.' : '从上手、单人压制与固定队协作角度出发的职业评级。'} meta={en ? 'Updated August 12, 2026' : '更新于 2026 年 8 月 12 日'}><nav className="toc" aria-label={en ? 'Table of contents' : '目录'}><span>{en ? 'On this page' : '本页目录'}</span>{toc.map((item) => <a key={item} href={`#${item.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g,'-')}`}>{item}</a>)}</nav>{content}<aside className="related-content"><span className="eyebrow">{en ? 'KEEP READING' : '继续阅读'}</span><h2>{en ? 'Related content' : '相关内容'}</h2><a href={locale === 'en' ? '/mistfall-hunter/classes/' : '/zh-CN/mistfall-hunter/classes/'}>{en ? 'All six classes explained →' : '查看六大职业解析 →'}</a></aside></ArticleShell><SiteFooter locale={locale} /></>;
}
