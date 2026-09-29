import type {Metadata} from 'next';
import {getTutorials} from '@/lib/content';
import {EmptyState} from '@/components/empty-state';
import {TutorialCard} from '@/components/tutorial-card';
import {getCopy, type Locale} from '@/lib/site-content';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: PageProps<'/[locale]/tutorials'>): Promise<Metadata> { const {locale} = await params; const text = getCopy(locale as Locale); return buildMetadata(locale as Locale, text.tutorialsTitle, text.tutorialsIntro, '/tutorials/'); }
export default async function TutorialsPage({params}: PageProps<'/[locale]/tutorials'>) {
  const {locale} = await params; const typedLocale = locale as Locale; const text = getCopy(typedLocale); const tutorials = await getTutorials(typedLocale);
  return <main className="content-page"><section className="page-heading"><p className="eyebrow">BuildCodex</p><h1>{text.tutorialsTitle}</h1><p className="lede">{text.tutorialsIntro}</p></section>{tutorials.length ? <div className="tutorial-grid">{tutorials.map((tutorial) => <TutorialCard key={tutorial.slug} tutorial={tutorial}/>)}</div> : <EmptyState title={text.emptyTitle} body={text.emptyBody}/>}</main>;
}
