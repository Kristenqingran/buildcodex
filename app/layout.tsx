import type {Metadata} from 'next';
import './globals.css';
import {GoogleAnalytics} from '@/components/google-analytics';

export const metadata: Metadata = {
  title: {default: 'BuildCodex', template: '%s · BuildCodex'},
  description: 'Practical notes on Codex, AI agents, evaluation, and building with them.',
  metadataBase: new URL('https://www.buildcodex.net'),
  icons: {icon: '/icon.svg', shortcut: '/icon.svg'}
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}<GoogleAnalytics /></body></html>;
}
