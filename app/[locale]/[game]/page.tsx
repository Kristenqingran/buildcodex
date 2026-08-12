import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {MistfallLanding} from '@/components/pages/mistfall-landing';
import {routing, type Locale} from '@/i18n/routing';
import {loadContent} from '@/lib/content';
import {gameSlugs, getGame} from '@/lib/games';
import {buildLocalizedMetadata} from '@/lib/seo';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => gameSlugs.map((game) => ({locale, game})));
}

export async function generateMetadata({params}: {params: Promise<{locale: string; game: string}>}) {
  const {locale, game} = await params;
  if (!hasLocale(routing.locales, locale) || !getGame(game)) return {};
  const document = await loadContent({locale, game, path: 'landing'});
  if (!document) return {};
  return buildLocalizedMetadata({locale, pathname: '/mistfall-hunter/', title: document.frontmatter.title, description: document.frontmatter.description, image: '/assets/mistfall-hunter/mistfall-hunter-hero.webp'});
}

export default async function GamePage({params}: {params: Promise<{locale: string; game: string}>}) {
  const {locale, game} = await params;
  if (!hasLocale(routing.locales, locale) || !getGame(game)) notFound();
  const content = await loadContent({locale, game, path: 'landing'});
  if (!content) notFound();
  setRequestLocale(locale);
  return <MistfallLanding locale={locale as Locale} />;
}
