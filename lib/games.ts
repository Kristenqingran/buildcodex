export type GameRoutes = {
  home: string;
  classes: string;
  builds: string;
  weapons: string;
  guides: string;
  bestClass: string;
};

export type GameConfig = {
  slug: string;
  names: Record<'en' | 'zh-CN', string>;
  routes: GameRoutes;
};

const games = {
  'mistfall-hunter': {
    slug: 'mistfall-hunter',
    names: {en: 'Mistfall Hunter', 'zh-CN': '雾影猎人'},
    routes: {
      home: '/mistfall-hunter/',
      classes: '/mistfall-hunter/classes/',
      builds: '/mistfall-hunter/#builds',
      weapons: '/mistfall-hunter/#weapons',
      guides: '/mistfall-hunter/#guides',
      bestClass: '/mistfall-hunter/guides/best-class/'
    }
  }
} satisfies Record<string, GameConfig>;

export const gameSlugs = Object.keys(games);

export function getGame(slug: string): GameConfig | undefined {
  return games[slug as keyof typeof games];
}

export function requireGame(slug: string): GameConfig {
  const game = getGame(slug);
  if (!game) throw new Error(`Unknown game: ${slug}`);
  return game;
}
