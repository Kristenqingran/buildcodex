import type {Metadata} from 'next';
import {Link} from '@/i18n/navigation';
import {getTutorial, hasTutorial} from '@/lib/content';
import {MdxContent} from '@/components/mdx-content';
import {buildMetadata} from '@/lib/seo';
import {getCopy, sections, sectionSlugs, type Locale, type SectionSlug} from '@/lib/site-content';
import {notFound} from 'next/navigation';
import {siteConfig} from '@/lib/site-content';
import {StructuredData} from '@/components/structured-data';
import {AdsterraArticleAd} from '@/components/adsterra-ad';
import {CalendarAgentProject} from '@/components/calendar-agent-project';

function getSection(value: string): SectionSlug { if (!sectionSlugs.includes(value as SectionSlug)) notFound(); return value as SectionSlug; }
export async function generateMetadata({params}: PageProps<'/[locale]/[section]/[slug]'>): Promise<Metadata> { const {locale, section, slug} = await params; const typedSection = getSection(section); const tutorial = await getTutorial(locale as Locale, slug, typedSection); return buildMetadata(locale as Locale, tutorial.frontmatter.title, tutorial.frontmatter.description, `/${typedSection}/${slug}/`, 'article'); }
export default async function ArticlePage({params}: PageProps<'/[locale]/[section]/[slug]'>) {
  const {locale, section, slug} = await params; const typedSection = getSection(section); const typedLocale = locale as Locale; const tutorial = await getTutorial(typedLocale, slug, typedSection);
  const headingIds = new Map<string, number>();
  const headings = [...tutorial.content.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => {
    const text = match[1].replace(/[`*_]/g, '');
    const baseId = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '') || 'section';
    const count = headingIds.get(baseId) ?? 0;
    headingIds.set(baseId, count + 1);
    return {text, id: count === 0 ? baseId : `${baseId}-${count + 1}`};
  });
  const otherLocale = typedLocale === 'en' ? 'zh-CN' : 'en';
  const hasOtherLocale = await hasTutorial(otherLocale, slug, typedSection);
  const articleUrl = `${siteConfig.origin}/${typedLocale}/${typedSection}/${slug}/`;
  const sectionUrl = `${siteConfig.origin}/${typedLocale}/${typedSection}/`;
  const articleData = {'@context': 'https://schema.org', '@type': 'Article', headline: tutorial.frontmatter.title, description: tutorial.frontmatter.description, url: articleUrl, mainEntityOfPage: {'@type': 'WebPage', '@id': articleUrl}, publisher: {'@type': 'Organization', name: siteConfig.name, url: siteConfig.origin}, inLanguage: typedLocale, datePublished: tutorial.frontmatter.publishedAt, dateModified: tutorial.frontmatter.updatedAt ?? tutorial.frontmatter.publishedAt};
  const breadcrumbData = {'@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: typedLocale === 'en' ? 'Home' : '首页', item: `${siteConfig.origin}/${typedLocale}/` }, { '@type': 'ListItem', position: 2, name: sections[typedSection].label[typedLocale], item: sectionUrl }, { '@type': 'ListItem', position: 3, name: tutorial.frontmatter.title, item: articleUrl }]};
  if (typedSection === 'agent-building' && slug === 'calendar-agent') {
    return <main className="content-page project-shell"><StructuredData data={articleData}/><StructuredData data={breadcrumbData}/><Link className="back-link" href={`/${typedSection}/`}>← {sections[typedSection].label[typedLocale]}</Link><CalendarAgentProject locale={typedLocale}/></main>;
  }
  return <main className="content-page article-page"><StructuredData data={articleData}/><StructuredData data={breadcrumbData}/><Link className="back-link" href={`/${typedSection}/`}>← {sections[typedSection].label[typedLocale]}</Link><div className="article-language"><span>{getCopy(typedLocale).language}:</span><Link href={`/${typedSection}/${slug}/`} locale={typedLocale}>{typedLocale === 'en' ? 'English' : '中文'}</Link>{hasOtherLocale && <Link href={`/${typedSection}/${slug}/`} locale={otherLocale}>{otherLocale === 'en' ? 'English' : '中文'}</Link>}</div><article><p className="eyebrow">{tutorial.frontmatter.category}</p><h1>{tutorial.frontmatter.title}</h1><p className="article-intro">{tutorial.frontmatter.description}</p>{headings.length > 0 && <details className="article-toc"><summary>{typedLocale === 'en' ? 'On this page' : '本文目录'}</summary><nav aria-label={typedLocale === 'en' ? 'Table of contents' : '文章目录'}><ul>{headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ul></nav></details>}<MdxContent source={tutorial.content}/><AdsterraArticleAd/></article></main>;
}
