import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {MdxContent} from '@/components/mdx-content';
import {GuidePage} from '@/components/pages/guide-page';
import {routing, type Locale} from '@/i18n/routing';
import {listGuideSlugs, loadContent} from '@/lib/content';
import {gameSlugs, getGame} from '@/lib/games';
import {buildLocalizedMetadata} from '@/lib/seo';

export async function generateStaticParams() {
  const params = [];
  for (const locale of routing.locales) for (const game of gameSlugs) {
    for (const slug of await listGuideSlugs(locale, game)) params.push({locale, game, slug});
  }
  return params;
}

export async function generateMetadata({params}: {params: Promise<{locale: string; game: string; slug: string}>}) {
  const {locale, game, slug} = await params;
  if (!hasLocale(routing.locales, locale) || !getGame(game)) return {};
  const document = await loadContent({locale, game, path: `guides/${slug}`});
  if (!document) return {};
  return buildLocalizedMetadata({locale, pathname: `/mistfall-hunter/guides/${slug}/`, title: document.frontmatter.title, description: document.frontmatter.description, image: '/assets/mistfall-hunter/mistfall-hunter-squad.webp'});
}

export default async function GuideRoute({params}: {params: Promise<{locale: string; game: string; slug: string}>}) {
  const {locale, game, slug} = await params;
  if (!hasLocale(routing.locales, locale) || !getGame(game)) notFound();
  const document = await loadContent({locale, game, path: `guides/${slug}`});
  if (!document) notFound();
  setRequestLocale(locale);
  return <GuidePage locale={locale as Locale} slug={slug} title={document.frontmatter.title} description={document.frontmatter.description} updated={document.frontmatter.updated} content={<MdxContent source={document.source} />} />;
}
