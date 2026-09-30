import type {Metadata} from 'next';
import {Link} from '@/i18n/navigation';
import {getTutorial} from '@/lib/content';
import {MdxContent} from '@/components/mdx-content';
import {buildMetadata} from '@/lib/seo';
import {getCopy, sections, sectionSlugs, type Locale, type SectionSlug} from '@/lib/site-content';
import {notFound} from 'next/navigation';

function getSection(value: string): SectionSlug { if (!sectionSlugs.includes(value as SectionSlug)) notFound(); return value as SectionSlug; }
export async function generateMetadata({params}: PageProps<'/[locale]/[section]/[slug]'>): Promise<Metadata> { const {locale, section, slug} = await params; const typedSection = getSection(section); const tutorial = await getTutorial(locale as Locale, slug, typedSection); return buildMetadata(locale as Locale, tutorial.frontmatter.title, tutorial.frontmatter.description, `/${typedSection}/${slug}/`); }
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
  return <main className="content-page article-page"><Link className="back-link" href={`/${typedSection}/`}>← {sections[typedSection].label[typedLocale]}</Link><div className="article-language"><span>{getCopy(typedLocale).language}:</span><Link href={`/${typedSection}/${slug}/`} locale={typedLocale}>{typedLocale === 'en' ? 'English' : '中文'}</Link><Link href={`/${typedSection}/${slug}/`} locale={otherLocale}>{otherLocale === 'en' ? 'English' : '中文'}</Link></div><article><p className="eyebrow">{tutorial.frontmatter.category}</p><h1>{tutorial.frontmatter.title}</h1><p className="article-intro">{tutorial.frontmatter.description}</p>{headings.length > 0 && <details className="article-toc"><summary>{typedLocale === 'en' ? 'On this page' : '本文目录'}</summary><nav aria-label={typedLocale === 'en' ? 'Table of contents' : '文章目录'}><ul>{headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ul></nav></details>}<MdxContent source={tutorial.content}/></article></main>;
}
