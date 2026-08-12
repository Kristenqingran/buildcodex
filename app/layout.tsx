import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://buildcodex.net'),
  title: 'BuildCodex',
  description: 'Game builds, classes, weapons, and guides.'
};

export default function RootLayout({children}: {children: ReactNode}) {
  return children;
}
