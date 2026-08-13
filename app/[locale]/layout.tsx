import type {Metadata} from 'next';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Suspense, type ReactNode} from 'react';
import {GoogleAnalytics} from '@/components/google-analytics';
import {routing} from '@/i18n/routing';
import {siteConfig} from '@/lib/site';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: 'BuildCodex',
  description: 'Game builds, classes, weapons, and guides.'
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const gaId = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_GA_ID
    : undefined;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        {gaId ? (
          <Suspense fallback={null}>
            <GoogleAnalytics measurementId={gaId} />
          </Suspense>
        ) : null}
      </body>
    </html>
  );
}
