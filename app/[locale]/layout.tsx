import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getCopy, type Locale} from '@/lib/site-content';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';

export function generateStaticParams() { return routing.locales.map((locale) => ({locale})); }
export default async function LocaleLayout({children, params}: LayoutProps<'/[locale]'>) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  const typedLocale = locale as Locale;
  return <NextIntlClientProvider locale={typedLocale} messages={getCopy(typedLocale)}><div className="site-shell"><SiteHeader locale={typedLocale}/>{children}<SiteFooter/></div></NextIntlClientProvider>;
}
