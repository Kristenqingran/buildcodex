import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {default: 'BuildCodex', template: '%s · BuildCodex'},
  description: 'Practical notes on Codex, AI agents, and building with them.'
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
