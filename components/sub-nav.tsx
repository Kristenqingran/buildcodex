import {localizePath, type Locale} from '@/i18n/routing';
import {requireGame} from '@/lib/games';

const labels = {
  en: {classes: 'Classes', builds: 'Builds', weapons: 'Weapons', guides: 'Guides'},
  'zh-CN': {classes: '职业', builds: '配装', weapons: '武器', guides: '攻略'}
} as const;

export function SubNav({locale}: {locale: Locale}) {
  const {routes} = requireGame('mistfall-hunter');
  return (
    <nav className="sub-nav" aria-label={locale === 'en' ? 'Game sections' : '游戏栏目'}>
      <div className="nav-inner sub-nav-inner">
        {(Object.keys(labels[locale]) as Array<keyof typeof labels.en>).map((key) => (
          <a key={key} href={localizePath(locale, routes[key])}>{labels[locale][key]}</a>
        ))}
      </div>
    </nav>
  );
}
