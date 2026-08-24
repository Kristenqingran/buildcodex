import type {ReactNode} from 'react';
import {ArticleShell} from '@/components/article-shell';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import type {Locale} from '@/i18n/routing';

type GuidePageProps = {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  updated: string;
  content: ReactNode;
};

const guideCopy = {
  en: {
    'best-class': {
      eyebrow: 'EDITORIAL · CLASS GUIDE',
      title: 'Mistfall Hunter Best Class',
      description: 'A grounded ranking for learning, solo pressure and coordinated squads.',
      toc: ['How this ranking works','S Tier — Mercenary','S Tier — Seer for coordinated teams','Comparison','Final recommendation']
    },
    'beginner-guide': {
      eyebrow: 'START HERE · BEGINNER GUIDE',
      title: 'Mistfall Hunter Beginner Guide: Survive Your First Runs',
      description: 'Prepare a low-risk loadout, understand extraction and turn your first successful runs into steady progress.',
      toc: ['What Is Mistfall Hunter?','What to Do Before Your First Run','Your First Loadout','How Extraction Works','Early Progression Priorities','Choosing Your First Class','Weapons and Gear Basics','Solo vs Trio for Beginners','Beginner Mistakes to Avoid','What to Learn Next','Mistfall Hunter Beginner FAQ']
    },
    'cipher-guide': {
      eyebrow: 'FIELD GUIDE · CIPHERS',
      title: 'Mistfall Hunter Cipher Guide',
      description: 'Learn how Ciphers work, where to use them, and which NPC matches each Cipher.',
      toc: ['How Ciphers Work','Cipher NPC & Keyword Matches','How to Decipher a Cipher','Rewards & Common Questions']
    }
  },
  'zh-CN': {
    'best-class': {
      eyebrow: '编辑评测 · 职业指南',
      title: 'Mistfall Hunter 最强职业',
      description: '从上手、单人压制与固定队协作角度出发的职业评级。',
      toc: ['评级方法','S 级 — 佣兵','S 级 — 固定队中的先知','对比表','最终推荐']
    },
    'beginner-guide': {
      eyebrow: '从这里开始 · 新手指南',
      title: 'Mistfall Hunter 新手指南：完成你的首次成功撤离',
      description: '准备一套低风险装备，理解撤离机制，并把前几次成功出猎转化为稳定进度。',
      toc: ['Mistfall Hunter 是什么？','第一次出猎前该做什么','你的第一套出猎装备','撤离机制如何运作','前期进度优先级','选择你的第一个职业','武器与装备基础','新手应该单人还是三人组队','新手常见错误','接下来学习什么','Mistfall Hunter 新手常见问题']
    },
    'cipher-guide': {
      eyebrow: '实用指南 · 密文',
      title: 'Mistfall Hunter 密文指南',
      description: '了解密文如何运作、应在哪里使用，以及每个密文对应哪位 NPC。',
      toc: ['密文如何运作','密文 NPC 与关键词对应','如何解读密文','奖励与常见问题']
    }
  }
} as const;

function formatUpdated(locale: Locale, value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const formatted = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'zh-CN', {
    year: 'numeric', month: locale === 'en' ? 'long' : 'numeric', day: 'numeric', timeZone: 'UTC'
  }).format(date);
  return locale === 'en' ? `Updated ${formatted}` : `更新于 ${formatted}`;
}

function headingId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '');
}

export function GuidePage({locale, slug, title, description, updated, content}: GuidePageProps) {
  const en = locale === 'en';
  const localizedCopy = guideCopy[locale];
  const copy = localizedCopy[slug as keyof typeof localizedCopy];
  const toc = copy?.toc ?? [];
  return <><SiteHeader locale={locale} pathname={`/mistfall-hunter/guides/${slug}/`} /><ArticleShell eyebrow={copy?.eyebrow ?? (en ? 'FIELD GUIDE' : '实用指南')} title={copy?.title ?? title} description={copy?.description ?? description} meta={formatUpdated(locale, updated)}>{toc.length > 0 && <nav className="toc" aria-label={en ? 'Table of contents' : '目录'}><span>{en ? 'On this page' : '本页目录'}</span>{toc.map((item) => <a key={item} href={`#${headingId(item)}`}>{item}</a>)}</nav>}{content}<aside className="related-content"><span className="eyebrow">{en ? 'KEEP READING' : '继续阅读'}</span><h2>{en ? 'Related content' : '相关内容'}</h2><a href={locale === 'en' ? '/mistfall-hunter/classes/' : '/zh-CN/mistfall-hunter/classes/'}>{en ? 'All six classes explained →' : '查看六大职业解析 →'}</a></aside></ArticleShell><SiteFooter locale={locale} /></>;
}
