import type {Metadata} from 'next';
import {Link} from '@/i18n/navigation';
import {getTutorial} from '@/lib/content';
import {MdxContent} from '@/components/mdx-content';
import {buildMetadata} from '@/lib/seo';
import {sections, sectionSlugs, type Locale, type SectionSlug} from '@/lib/site-content';
import {notFound} from 'next/navigation';

function getSection(value: string): SectionSlug { if (!sectionSlugs.includes(value as SectionSlug)) notFound(); return value as SectionSlug; }
export async function generateMetadata({params}: PageProps<'/[locale]/[section]/[slug]'>): Promise<Metadata> { const {locale, section, slug} = await params; const typedSection = getSection(section); const tutorial = await getTutorial(locale as Locale, slug, typedSection); return buildMetadata(locale as Locale, tutorial.frontmatter.title, tutorial.frontmatter.description, `/${typedSection}/${slug}/`); }
export default async function ArticlePage({params}: PageProps<'/[locale]/[section]/[slug]'>) {
  const {locale, section, slug} = await params; const typedSection = getSection(section); const typedLocale = locale as Locale; const tutorial = await getTutorial(typedLocale, slug, typedSection);
  return <main className="content-page article-page"><Link className="back-link" href={`/${typedSection}/`}>← {sections[typedSection].label[typedLocale]}</Link><article><p className="eyebrow">{tutorial.frontmatter.category}</p><h1>{tutorial.frontmatter.title}</h1><p className="article-intro">{tutorial.frontmatter.description}</p><MdxContent source={tutorial.content}/></article></main>;
}
