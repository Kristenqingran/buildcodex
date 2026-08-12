import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {MdxContent} from '@/components/mdx-content';
import {ClassesPage} from '@/components/pages/classes-page';
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
  const document = await loadContent({locale, game, path: 'classes'});
  if (!document) return {};
  return buildLocalizedMetadata({locale, pathname: '/mistfall-hunter/classes/', title: document.frontmatter.title, description: document.frontmatter.description, image: '/assets/mistfall-hunter/mistfall-hunter-classes.webp'});
}

export default async function ClassesRoute({params}: {params: Promise<{locale: string; game: string}>}) {
  const {locale, game} = await params;
  if (!hasLocale(routing.locales, locale) || !getGame(game)) notFound();
  const document = await loadContent({locale, game, path: 'classes'});
  if (!document) notFound();
  setRequestLocale(locale);
  return <ClassesPage locale={locale as Locale} content={<MdxContent source={document.source} />} />;
}
