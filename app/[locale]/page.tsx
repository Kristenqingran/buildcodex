import type {Metadata} from 'next';
import {Link} from '@/i18n/navigation';
import {getCopy, type Locale} from '@/lib/site-content';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: PageProps<'/[locale]'>): Promise<Metadata> { const {locale} = await params; const text = getCopy(locale as Locale); return buildMetadata(locale as Locale, 'BuildCodex', text.intro, '/'); }
export default async function LocaleHomePage({params}: PageProps<'/[locale]'>) {
  const {locale} = await params; const text = getCopy(locale as Locale);
  return <main><section className="home-hero" aria-labelledby="home-title"><p className="eyebrow">{text.eyebrow}</p><h1 id="home-title">{text.title}</h1><p className="lede">{text.intro}</p><Link className="primary-button" href="/tutorials/">{text.browse} <span aria-hidden="true">→</span></Link></section><section className="home-note"><p>BuildCodex</p><p>{text.emptyBody}</p></section></main>;
}
