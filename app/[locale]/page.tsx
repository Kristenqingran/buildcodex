import type {Metadata} from 'next';
import {Link} from '@/i18n/navigation';
import {getLatestTutorials} from '@/lib/content';
import {TutorialCard} from '@/components/tutorial-card';
import {getCopy, sections, type Locale} from '@/lib/site-content';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: PageProps<'/[locale]'>): Promise<Metadata> { const {locale} = await params; const text = getCopy(locale as Locale); return buildMetadata(locale as Locale, 'BuildCodex', text.intro, '/'); }
export default async function LocaleHomePage({params}: PageProps<'/[locale]'>) {
  const {locale} = await params; const typedLocale = locale as Locale; const text = getCopy(typedLocale); const latest = await getLatestTutorials(typedLocale);
  return <main><section className="section-grid" aria-label="Content sections">{Object.entries(sections).map(([slug, section]) => <Link className="section-card" key={slug} href={`/${slug}/`}><span className="card-kicker">{section.label[typedLocale]}</span><h2>{section.label[typedLocale]}</h2><p>{section.description[typedLocale]}</p><span className="card-arrow" aria-hidden="true">↗</span></Link>)}</section><section className="home-latest" aria-labelledby="latest-title"><div className="home-section-heading"><p id="latest-title">{text.latest}</p></div>{latest.length ? <div className="tutorial-grid">{latest.map(({tutorial, section}) => <TutorialCard key={`${section}-${tutorial.slug}`} tutorial={tutorial} section={section}/>)}</div> : <p className="home-note">{text.emptyBody}</p>}</section></main>;
}
