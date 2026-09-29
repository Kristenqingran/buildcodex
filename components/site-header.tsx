import {Link} from '@/i18n/navigation';
import {getCopy, sections, type Locale} from '@/lib/site-content';
import {LanguageSwitcher} from './language-switcher';

export function SiteHeader({locale}: {locale: Locale}) {
  const text = getCopy(locale);
  return <header className="site-header"><Link href="/" className="brand">BuildCodex</Link><nav aria-label="Primary navigation" className="site-nav">{Object.entries(sections).map(([slug, section]) => <Link key={slug} href={`/${slug}/`}>{section.label[locale]}</Link>)}<Link href="/search/" className="search-link">⌕ {text.search}</Link><LanguageSwitcher locale={locale} label={text.language}/></nav></header>;
}
