import {hasLocale} from 'next-intl';
import {notFound, redirect} from 'next/navigation';
import {localizePath, routing} from '@/i18n/routing';

export default async function LocaleEntry({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  redirect(localizePath(locale, '/mistfall-hunter/'));
}
