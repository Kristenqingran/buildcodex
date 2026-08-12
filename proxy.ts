import {NextRequest, NextResponse} from 'next/server';

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

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
