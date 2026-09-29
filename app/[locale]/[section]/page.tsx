import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {getTutorials} from '@/lib/content';
import {EmptyState} from '@/components/empty-state';
import {TutorialCard} from '@/components/tutorial-card';
import {buildMetadata} from '@/lib/seo';
import {getCopy, sections, sectionSlugs, type Locale, type SectionSlug} from '@/lib/site-content';

export function generateStaticParams() { return sectionSlugs.flatMap((section) => ['en', 'zh-CN'].map((locale) => ({locale, section}))); }
function getSection(value: string): SectionSlug { if (!sectionSlugs.includes(value as SectionSlug)) notFound(); return value as SectionSlug; }

export async function generateMetadata({params}: PageProps<'/[locale]/[section]'>): Promise<Metadata> {
  const {locale, section} = await params; const typedSection = getSection(section); const typedLocale = locale as Locale; return buildMetadata(typedLocale, sections[typedSection].label[typedLocale], sections[typedSection].description[typedLocale], `/${typedSection}/`);
}

export default async function SectionPage({params}: PageProps<'/[locale]/[section]'>) {
  const {locale, section} = await params; const typedSection = getSection(section); const typedLocale = locale as Locale; const text = getCopy(typedLocale); const tutorials = await getTutorials(typedLocale, typedSection);
  return <main className="content-page"><Link className="back-link" href="/">← {typedLocale === 'en' ? 'Home' : '首页'}</Link><section className="page-heading"><p className="lede">{sections[typedSection].description[typedLocale]}</p></section>{tutorials.length ? <div className="tutorial-grid">{tutorials.map((tutorial) => <TutorialCard key={tutorial.slug} tutorial={tutorial} section={typedSection}/>)}</div> : <EmptyState title={text.emptyTitle} body={text.emptyBody}/>}</main>;
}
