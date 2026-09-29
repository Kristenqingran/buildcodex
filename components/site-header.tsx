import {Link} from '@/i18n/navigation';
import {getCopy, type Locale} from '@/lib/site-content';
import {LanguageSwitcher} from './language-switcher';

export function SiteHeader({locale}: {locale: Locale}) {
  const text = getCopy(locale);
  return <header className="site-header"><Link href="/" className="brand">BuildCodex</Link><nav aria-label="Primary navigation" className="site-nav"><Link href="/tutorials/">{text.navTutorials}</Link><span className="nav-muted">{text.navAbout}</span><LanguageSwitcher locale={locale} label={text.language}/></nav></header>;
}
