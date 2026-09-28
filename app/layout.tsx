import type {Metadata} from 'next';
import './globals.css';
import {siteContent} from '@/lib/site-content';

export const metadata: Metadata = {
  title: siteContent.name,
  description: siteContent.tagline
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
