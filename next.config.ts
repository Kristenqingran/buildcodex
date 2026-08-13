import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const localeSegment = '(?!en(?:/|$)|zh-CN(?:/|$)|sitemap\.xml$|robots\.txt$)';

const nextConfig: NextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return {
      afterFiles: [
        {source: `/:game(${localeSegment}[^/]+)`, destination: '/en/:game'},
        {source: `/:game(${localeSegment}[^/]+)/:path*`, destination: '/en/:game/:path*'}
      ],
      beforeFiles: [],
      fallback: []
    };
  }
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
