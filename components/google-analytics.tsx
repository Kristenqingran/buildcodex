'use client';

import Script from 'next/script';
import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function GoogleAnalyticsPageView({ready}: {ready: boolean}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    if (!ready) return;
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [pathname, query, ready]);

  return null;
}

export function GoogleAnalytics({measurementId}: {measurementId: string}) {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {send_page_view: false});
        `}
      </Script>
      <GoogleAnalyticsPageView ready={ready} />
    </>
  );
}
