'use client';

import {Link} from '@/i18n/navigation';
import {usePathname} from '@/i18n/navigation';
import {getCopy, sections, type Locale} from '@/lib/site-content';
import {LanguageSwitcher} from './language-switcher';

export function SiteHeader({locale}: {locale: Locale}) {
  const text = getCopy(locale); const pathname = usePathname();
  return <header className="site-header"><Link href="/" className="brand">BuildCodex</Link><nav aria-label="Primary navigation" className="site-nav">{Object.entries(sections).map(([slug, section]) => { const active = pathname.split('/').includes(slug); return <Link key={slug} href={`/${slug}/`} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined}>{section.label[locale]}</Link>; })}<Link href="/search/" className="search-link" aria-label={text.search}><span aria-hidden="true">⌕</span></Link><LanguageSwitcher locale={locale} label={text.language}/></nav></header>;
}
