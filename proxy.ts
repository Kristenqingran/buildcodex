import {NextRequest, NextResponse} from 'next/server';

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/en' || request.nextUrl.pathname.startsWith('/en/')) {
    const pathname = request.nextUrl.pathname.slice(3) || '/';
    const destination = new URL(request.url);
    destination.pathname = pathname;
    return NextResponse.redirect(destination, 308);
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/mistfall-hunter/', request.url), 307);
  }

  if (request.nextUrl.pathname === '/zh-CN/') {
    return NextResponse.redirect(
      new URL('/zh-CN/mistfall-hunter/', request.url),
      307
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
