import {Link} from '@/i18n/navigation';
import {localeLabels, locales, type Locale} from '@/lib/site-content';

export function LanguageSwitcher({locale, label}: {locale: Locale; label: string}) {
  return <div className="language-switcher" aria-label={label}>{locales.map((target) => <Link key={target} href="/" locale={target} className={target === locale ? 'active' : ''}>{localeLabels[target]}</Link>)}</div>;
}
