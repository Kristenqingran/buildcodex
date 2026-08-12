import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';
import {gameSlugs, getGame} from '@/lib/games';

export function generateStaticParams() {
  return gameSlugs.map((game) => ({game}));
}

export default async function GameLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{game: string}>;
}) {
  const {game} = await params;
  if (!getGame(game)) notFound();
  return children;
}
