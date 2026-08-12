import {localizePath, type Locale} from '@/i18n/routing';
import {requireGame} from '@/lib/games';

const copy = {
  en: {tagline: 'Choose your path through the Gyldenmist.', classes: 'Classes', builds: 'Builds', weapons: 'Weapons', guides: 'Guides', note: 'Independent game guide. Not affiliated with Bellring Games or Skystone Games.'},
  'zh-CN': {tagline: '在金雾中选择你的道路。', classes: '职业', builds: '配装', weapons: '武器', guides: '攻略', note: '独立游戏攻略站，与 Bellring Games 或 Skystone Games 无隶属关系。'}
} as const;

export function SiteFooter({locale}: {locale: Locale}) {
  const game = requireGame('mistfall-hunter');
  const text = copy[locale];
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand"><strong>BuildCodex</strong><span>MISTFALL HUNTER</span><p>{text.tagline}</p></div>
        <div className="footer-links">
          <a href={localizePath(locale, game.routes.classes)}>{text.classes}</a>
          <a href={localizePath(locale, game.routes.builds)}>{text.builds}</a>
          <a href={localizePath(locale, game.routes.weapons)}>{text.weapons}</a>
          <a href={localizePath(locale, game.routes.guides)}>{text.guides}</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 BUILDCODEX</span><span>{text.note}</span></div>
    </footer>
  );
}
