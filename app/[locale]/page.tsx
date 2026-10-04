import type {Metadata} from 'next';
import {Link} from '@/i18n/navigation';
import {getCopy, sections, type Locale} from '@/lib/site-content';
import {buildMetadata} from '@/lib/seo';
import {AdsterraArticleAd} from '@/components/adsterra-ad';

export async function generateMetadata({params}: PageProps<'/[locale]'>): Promise<Metadata> { const {locale} = await params; const text = getCopy(locale as Locale); return buildMetadata(locale as Locale, 'BuildCodex', text.intro, '/'); }
export default async function LocaleHomePage({params}: PageProps<'/[locale]'>) {
  const {locale} = await params; const text = getCopy(locale as Locale);
  return <main><section className="home-hero" aria-labelledby="home-title"><p className="eyebrow">{text.eyebrow}</p><h1 id="home-title">{text.title}</h1><p className="lede">{text.intro}</p></section><section className="section-grid" aria-label="Content sections">{Object.entries(sections).map(([slug, section]) => <Link className="section-card" key={slug} href={`/${slug}/`}><span className="card-kicker">{section.label[locale as Locale]}</span><h2>{section.label[locale as Locale]}</h2><p>{section.description[locale as Locale]}</p><span className="card-arrow" aria-hidden="true">↗</span></Link>)}</section><section className="home-note"><p>{text.latest}</p><p>{text.emptyBody}</p></section><AdsterraArticleAd/></main>;
}
