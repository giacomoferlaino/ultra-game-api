import { GameListingManager } from '../game-listing-manager';
import { Game } from '../game';
import { DateBuilder } from '@giacomoferlaino/date-time-utils';

describe('class: GameListingManager', () => {
  let gameListingManager: GameListingManager;
  let deleteOlderThanMonths: number;
  let discountOlderThenMonths: number;
  let game: Game;

  beforeEach(() => {
    deleteOlderThanMonths = 18;
    discountOlderThenMonths = 12;
    gameListingManager = new GameListingManager(
      deleteOlderThanMonths,
      discountOlderThenMonths,
    );
    jest.spyOn(Date, 'now').mockReturnValue(
      DateBuilder.today()
        .getDate()
        .getTime(),
    );
  });

  describe('method: toBeDeleted', () => {
    it('should return true if the game is older than the deleteOlderThanMonths', () => {
      const releaseDate: Date = DateBuilder.today()
        .subtractMonths(deleteOlderThanMonths)
        .subtractDays(1)
        .getDate();
      game = Game.create('newGame', 0.0, '', [], releaseDate);
      expect(gameListingManager.toBeDeleted(game)).toBe(true);
    });

    it('should return false if the game is as old as the deleteOlderThanMonths', () => {
      const releaseDate: Date = DateBuilder.today()
        .subtractMonths(deleteOlderThanMonths)
        .getDate();
      game = Game.create('newGame', 0.0, '', [], releaseDate);
      expect(gameListingManager.toBeDeleted(game)).toBe(false);
    });

    it('should return false if the game is newer than the deleteOlderThanMonths', () => {
      const releaseDate: Date = DateBuilder.today()
        .subtractMonths(deleteOlderThanMonths)
        .addDays(1)
        .getDate();
      game = Game.create('newGame', 0.0, '', [], releaseDate);
      expect(gameListingManager.toBeDeleted(game)).toBe(false);
    });
  });

  describe('method: toBeDiscounted', () => {
    it(`should return true if the game is newer than the deleteOlderThanMonths
    and older than the discountOlderThenMonths`, () => {
      let releaseDate: Date = DateBuilder.today()
        .subtractMonths(deleteOlderThanMonths)
        .addDays(1)
        .getDate();
      game = Game.create('newGame', 0.0, '', [], releaseDate);
      expect(gameListingManager.toBeDiscounted(game)).toBe(true);
      releaseDate = DateBuilder.today()
        .subtractMonths(discountOlderThenMonths)
        .subtractDays(1)
        .getDate();
      game = Game.create('newGame', 0.0, '', [], releaseDate);
      expect(gameListingManager.toBeDiscounted(game)).toBe(true);
    });

    it('should return false if the game is as old as the deleteOlderThanMonths', () => {
      const releaseDate: Date = DateBuilder.today()
        .subtractMonths(deleteOlderThanMonths)
        .getDate();
      game = Game.create('newGame', 0.0, '', [], releaseDate);
      expect(gameListingManager.toBeDiscounted(game)).toBe(false);
    });

    it('should return false if the game is as old as the discountOlderThenMonths', () => {
      const releaseDate: Date = DateBuilder.today()
        .subtractMonths(discountOlderThenMonths)
        .getDate();
      game = Game.create('newGame', 0.0, '', [], releaseDate);
      expect(gameListingManager.toBeDiscounted(game)).toBe(false);
    });

    it('should return false if the game is older than the deleteOlderThanMonths', () => {
      const releaseDate: Date = DateBuilder.today()
        .subtractMonths(deleteOlderThanMonths)
        .subtractDays(1)
        .getDate();
      game = Game.create('newGame', 0.0, '', [], releaseDate);
      expect(gameListingManager.toBeDiscounted(game)).toBe(false);
    });

    it('should return false if the game is newer than the discountOlderThenMonths', () => {
      const releaseDate: Date = DateBuilder.today()
        .subtractMonths(discountOlderThenMonths)
        .addDays(1)
        .getDate();
      game = Game.create('newGame', 0.0, '', [], releaseDate);
      expect(gameListingManager.toBeDiscounted(game)).toBe(false);
    });
  });

  describe('method: applyDiscount', () => {
    let discountPercentage: number;
    let initialPrice: number;
    let expectedPrice: number;

    beforeEach(() => {
      discountPercentage = 10;
      initialPrice = 10;
      expectedPrice = 9;
      game = Game.create('newGame', initialPrice, '', [], new Date());
    });

    it('should return a new game object', () => {
      expect(
        gameListingManager.applyDiscount(game, discountPercentage),
      ).not.toBe(game);
    });

    it('should return a new game discounted by the specified percentage', () => {
      expect(
        gameListingManager.applyDiscount(game, discountPercentage).price,
      ).toBe(expectedPrice);
    });
  });
});
