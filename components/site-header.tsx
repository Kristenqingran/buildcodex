import {localizePath, type Locale} from '@/i18n/routing';
import {requireGame} from '@/lib/games';
import {LanguageSwitcher} from './language-switcher';
import {SubNav} from './sub-nav';

const copy = {
  en: {builds: 'Best Builds', class: 'Best Class', weapons: 'Best Weapons', cta: 'View on Steam'},
  'zh-CN': {builds: '最佳配装', class: '最强职业', weapons: '最佳武器', cta: '前往 Steam'}
} as const;

export function SiteHeader({locale, pathname}: {locale: Locale; pathname: string}) {
  const game = requireGame('mistfall-hunter');
  const text = copy[locale];
  return (
    <header className="site-header">
      <nav className="primary-nav" aria-label={locale === 'en' ? 'Primary' : '主导航'}>
        <div className="nav-inner primary-nav-inner">
          <a className="brand" href={localizePath(locale, game.routes.home)}>
            <span className="brand-mark">BC</span>
            <span><strong>BuildCodex</strong><small>MISTFALL HUNTER · FIELD GUIDE</small></span>
          </a>
          <div className="primary-links">
            <a href={localizePath(locale, game.routes.builds)}>{text.builds}</a>
            <a href={localizePath(locale, game.routes.bestClass)}>{text.class}</a>
            <a href={localizePath(locale, game.routes.weapons)}>{text.weapons}</a>
          </div>
          <div className="nav-actions">
            <LanguageSwitcher locale={locale} pathname={pathname} />
            <a className="button button-small" href="https://store.steampowered.com/app/3282300/Mistfall_Hunter/">{text.cta}</a>
          </div>
        </div>
      </nav>
      <SubNav locale={locale} />
    </header>
  );
}
