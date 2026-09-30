import type {Metadata} from 'next';
import {getTutorials} from '@/lib/content';
import {EmptyState} from '@/components/empty-state';
import {TutorialCard} from '@/components/tutorial-card';
import {buildMetadata} from '@/lib/seo';
import {getCopy, sectionSlugs, type Locale} from '@/lib/site-content';

export async function generateMetadata({params}: PageProps<'/[locale]/search'>): Promise<Metadata> { const {locale} = await params; const text = getCopy(locale as Locale); return buildMetadata(locale as Locale, text.searchTitle, text.searchTitle, '/search/'); }
export default async function SearchPage({params, searchParams}: PageProps<'/[locale]/search'>) {
  const {locale} = await params; const query = String((await searchParams).q ?? '').trim().toLowerCase(); const typedLocale = locale as Locale; const text = getCopy(typedLocale); const groups = await Promise.all(sectionSlugs.map(async (section) => ({section, items: await getTutorials(typedLocale, section)}))); const results = groups.flatMap(({section, items}) => items.filter((item) => !query || `${item.title} ${item.description}`.toLowerCase().includes(query)).map((item) => ({item, section})));
  return <main className="content-page"><section className="page-heading"><h1>{text.searchTitle}</h1><form className="search-form"><label htmlFor="q">{text.searchPlaceholder}</label><div><input id="q" name="q" defaultValue={query} placeholder={text.searchPlaceholder}/><button type="submit">{text.search}</button></div></form></section>{results.length ? <div className="tutorial-grid">{results.map(({item, section}) => <TutorialCard key={`${section}-${item.slug}`} tutorial={item} section={section}/>)}</div> : <EmptyState title={query ? text.searchEmpty : text.emptyTitle} body={text.emptyBody}/>}</main>;
}
