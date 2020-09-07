import { v4 as uuidv4 } from 'uuid';

export class Game {
  constructor(
    readonly id: string = '',
    readonly title: string = '',
    readonly price: number = 0.0,
    readonly publisherId: string = '',
    readonly tags: string[] = [],
    readonly releaseDate: Date = null,
  ) {}

  // Game factory method
  static create(
    title: string,
    price: number,
    publisherId: string,
    tags: string[],
    releaseDate: Date,
  ): Game {
    const newId: string = uuidv4();
    return new Game(newId, title, price, publisherId, tags, releaseDate);
  }

  copyWith(game: Game): Game {
    return new Game(
      this.id,
      game.title || this.title,
      game.price || this.price,
      game.publisherId || this.publisherId,
      game.tags && game.tags.length ? game.tags : this.tags,
      game.releaseDate || this.releaseDate,
    );
  }
}
