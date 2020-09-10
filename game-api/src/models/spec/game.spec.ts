import { Game } from '../game';

describe('class: Game', () => {
  describe('method: create', () => {
    const game: Game = Game.create(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    );

    it('should return a new game with a random uuid(v4) id', () => {
      expect(game.id.length).toBe(36);
    });
  });

  describe('method: copyWith', () => {
    let firstGame: Game;
    let secondGame: Game;
    let newGame: Game;

    beforeEach(() => {
      firstGame = Game.create(
        'firstGame',
        19.99,
        'firstGamePublisherId',
        ['tag1'],
        new Date(),
      );
      secondGame = Game.create(
        'secondGame',
        19.99,
        'secondGamePublisherId',
        ['tag2'],
        new Date(),
      );
      newGame = firstGame.copyWith(secondGame);
    });

    it('should return a copy of the firstGame merged with the second one', () => {
      expect(newGame.title).toEqual(secondGame.title);
      expect(newGame.price).toEqual(secondGame.price);
      expect(newGame.publisherId).toEqual(secondGame.publisherId);
      expect(newGame.tags).toEqual(secondGame.tags);
      expect(newGame.releaseDate).toEqual(secondGame.releaseDate);
    });

    it('should not merge the game id', () => {
      expect(newGame.id).toEqual(firstGame.id);
    });

    it('should keep the existing property values if the passed ones are not truthy', () => {
      secondGame = Game.create(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      expect(firstGame.copyWith(secondGame)).toEqual(firstGame);
    });
  });
});
