import { Game } from './game';
import { DateBuilder, DateHelpers } from '@giacomoferlaino/date-time-utils';

export class GameListingManager {
  private deletionDate: Date;
  private discountingDate: Date;

  constructor(deleteOlderThanMonths: number, discountOlderThenMonths: number) {
    this.deletionDate = DateBuilder.now()
      .subtractMonths(deleteOlderThanMonths)
      .getDate();
    this.discountingDate = DateBuilder.now()
      .subtractMonths(discountOlderThenMonths)
      .getDate();
  }

  toBeDeleted(game: Game): boolean {
    return DateHelpers.isBefore(game.releaseDate, this.deletionDate);
  }

  toBeDiscounted(game: Game): boolean {
    return (
      DateHelpers.isAfter(game.releaseDate, this.deletionDate) &&
      DateHelpers.isBefore(game.releaseDate, this.discountingDate)
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
