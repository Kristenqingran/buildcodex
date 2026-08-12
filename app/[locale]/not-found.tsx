import {getLocale} from 'next-intl/server';
import {NotFoundPage, notFoundMetadata} from '@/components/not-found-page';
import {routing, type Locale} from '@/i18n/routing';

export const metadata = notFoundMetadata;

export default async function NotFound() {
  const requested = await getLocale();
  const locale = routing.locales.includes(requested as Locale) ? requested as Locale : 'en';
  return <NotFoundPage locale={locale} />;
}
