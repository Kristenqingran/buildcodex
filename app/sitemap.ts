import type {MetadataRoute} from 'next';
import {getTutorials} from '@/lib/content';
import {siteConfig, locales, sectionSlugs, type Locale, type SectionSlug} from '@/lib/site-content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = locales.flatMap((locale) => [
    {url: `${siteConfig.origin}/${locale}/`, changeFrequency: 'weekly' as const, priority: 1},
    ...sectionSlugs.map((section) => ({
      url: `${siteConfig.origin}/${locale}/${section}/`,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  ]);

  const articleRoutes = (await Promise.all(
    locales.flatMap((locale) =>
      sectionSlugs.map(async (section) => {
        const tutorials = await getTutorials(locale as Locale, section as SectionSlug);
        return tutorials.map((tutorial) => ({
          url: `${siteConfig.origin}/${locale}/${section}/${tutorial.slug}/`,
          lastModified: tutorial.updatedAt ?? tutorial.publishedAt,
          changeFrequency: 'monthly' as const,
          priority: 0.7
        }));
      })
    )
  )).flat();

  return [...staticRoutes, ...articleRoutes];
}
