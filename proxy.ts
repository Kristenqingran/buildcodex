import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const host = request.headers.get('host')?.split(':')[0].toLowerCase();
  if (host === 'buildcodex.net') {
    if (url.pathname !== '/' && !url.pathname.endsWith('/') && !/\/[^/]*\.[^/]+$/.test(url.pathname)) url.pathname += '/';
    url.hostname = 'www.buildcodex.net';
    return NextResponse.redirect(url, 308);
  }
  if (url.pathname.startsWith('/_next/') || /\/[^/]*\.[^/]+$/.test(url.pathname)) return NextResponse.next();
  return intlMiddleware(request);
}

export const config = {matcher: ['/:path*']};
