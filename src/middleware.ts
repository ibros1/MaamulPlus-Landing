import { NextResponse, type NextRequest } from 'next/server';

/**
 * One canonical host. [[DECIDE]] apex (maamulplus.com) is the default; set CANONICAL_HOST to
 * "www.maamulplus.com" to flip it. http → https is handled by Vercel / HSTS; trailing slashes
 * are stripped by Next (trailingSlash: false) with a 308.
 */
const CANONICAL_HOST = process.env.CANONICAL_HOST ?? new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maamulplus.com').host;

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const isProdDomain = host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}` || `www.${host}` === CANONICAL_HOST;
  if (isProdDomain && host !== CANONICAL_HOST) {
    const url = req.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = 'https';
    url.port = '';
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Skip static assets and image optimisation.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\.(?:png|svg|ico|webmanifest|ttf|txt|xml)$).*)'],
};
