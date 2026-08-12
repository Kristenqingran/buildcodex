import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/mistfall-hunter/', request.url), 307);
  }

  if (request.nextUrl.pathname === '/zh-CN/') {
    return NextResponse.redirect(
      new URL('/zh-CN/mistfall-hunter/', request.url),
      307
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
