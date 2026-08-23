import {describe, expect, it} from 'vitest';
import {getGame, requireGame} from '@/lib/games';

describe('game registry', () => {
  it('resolves Mistfall Hunter and its real routes', () => {
    const game = requireGame('mistfall-hunter');
    expect(game.slug).toBe('mistfall-hunter');
    expect(game.routes.classes).toBe('/mistfall-hunter/classes/');
    expect(game.routes.bestClass).toBe('/mistfall-hunter/guides/best-class/');
  });

  it('uses the Builds page and landing anchors for sections without standalone pages', () => {
    const game = requireGame('mistfall-hunter');
    expect(game.routes.builds).toBe('/mistfall-hunter/builds/');
    expect(game.routes.weapons).toBe('/mistfall-hunter/#weapons');
    expect(game.routes.guides).toBe('/mistfall-hunter/#guides');
  });

  it('rejects unknown games', () => {
    expect(getGame('unknown')).toBeUndefined();
    expect(() => requireGame('unknown')).toThrow('Unknown game: unknown');
  });
});
