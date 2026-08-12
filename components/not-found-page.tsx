import type {Metadata} from 'next';
import {SiteFooter} from './site-footer';
import {SiteHeader} from './site-header';
import {localizePath, type Locale} from '@/i18n/routing';
import {requireGame} from '@/lib/games';

export const notFoundMetadata: Metadata = {title: 'Page not found · BuildCodex', robots: {index: false, follow: false}};

export function NotFoundPage({locale}: {locale: Locale}) {
  const en = locale === 'en'; const routes = requireGame('mistfall-hunter').routes;
  const links = en ? [['Classes',routes.classes],['Builds',routes.builds],['Weapons',routes.weapons],['Guides',routes.guides]] : [['职业',routes.classes],['配装',routes.builds],['武器',routes.weapons],['攻略',routes.guides]];
  return <><SiteHeader locale={locale} pathname={routes.home} /><main className="not-found"><span className="not-found-code">404</span><span className="eyebrow">{en ? 'LOST IN THE GYLDENMIST' : '迷失在金雾之中'}</span><h1>{en ? 'This path vanishes into the mist.' : '迷雾中没有这条路。'}</h1><p>{en ? 'The page may have moved, or this route has not yet been charted.' : '页面可能已经移动，或者这条路线尚未被 BuildCodex 记录。'}</p><a className="button" href={localizePath(locale,routes.home)}>{en ? 'Return to game home' : '返回游戏首页'}</a><nav aria-label={en ? 'Related destinations' : '相关入口'}>{links.map(([label,href]) => <a key={label} href={localizePath(locale,href)}>{label} →</a>)}</nav></main><SiteFooter locale={locale} /></>;
}
