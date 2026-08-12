import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {MdxContent} from '@/components/mdx-content';
import {GuidePage} from '@/components/pages/guide-page';
import {routing, type Locale} from '@/i18n/routing';
import {listGuideSlugs, loadContent} from '@/lib/content';
import {gameSlugs, getGame} from '@/lib/games';

export async function generateStaticParams() {
  const params = [];
  for (const locale of routing.locales) for (const game of gameSlugs) {
    for (const slug of await listGuideSlugs(locale, game)) params.push({locale, game, slug});
  }
  return params;
}

export default async function GuideRoute({params}: {params: Promise<{locale: string; game: string; slug: string}>}) {
  const {locale, game, slug} = await params;
  if (!hasLocale(routing.locales, locale) || !getGame(game)) notFound();
  const document = await loadContent({locale, game, path: `guides/${slug}`});
  if (!document) notFound();
  setRequestLocale(locale);
  return <GuidePage locale={locale as Locale} content={<MdxContent source={document.source} />} />;
}
