import { Game } from './game';
import { DateCalculator } from './date-calculator';

export class GameListingManager {
  constructor(
    private readonly deleteOlderThanMonths: number,
    private readonly discountOlderThenMonths: number,
  ) {}

  toBeDeleted(game: Game): boolean {
    const monthsAgo: number = DateCalculator.monthsSince(game.releaseDate);
    return monthsAgo > this.deleteOlderThanMonths;
  }

  toBeDiscounted(game: Game): boolean {
    const monthsAgo: number = DateCalculator.monthsSince(game.releaseDate);
    return (
      monthsAgo < this.deleteOlderThanMonths &&
      monthsAgo > this.discountOlderThenMonths
    );
  }

  applyDiscount(game: Game, discountPercentage: number): Game {
    const discountedPrice: number = game.price * (1 - discountPercentage / 100);
    const discountedGame: Game = Game.create(
      game.title,
      discountedPrice,
      game.publisherId,
      game.tags,
      game.releaseDate,
    );
    return game.copyWith(discountedGame);
  }
}
