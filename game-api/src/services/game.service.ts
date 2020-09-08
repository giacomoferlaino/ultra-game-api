import { Injectable } from '@nestjs/common';
import { Game } from 'src/models/game';
import { games } from 'src/data-mock/games';
import { GameListingManager } from 'src/models/game-listing-manager';

@Injectable()
export class GameService {
  private _games: Game[] = [...games];
  private gameListingManager: GameListingManager;

  constructor() {
    this.gameListingManager = new GameListingManager(18, 12);
  }

  get games(): Game[] {
    return [...this._games];
  }

  async findAll(): Promise<Game[]> {
    return this._games;
  }

  async findById(id: string): Promise<Game> {
    for (const game of this._games) {
      if (game.id === id) {
        return game;
      }
    }
  }

  async add(game: Game): Promise<void> {
    this._games.push(game);
  }

  async update(id: string, newGame: Game): Promise<Game> {
    for (const index of this._games.keys()) {
      const game: Game = this._games[index];
      if (game.id === id) {
        const updatedGame: Game = game.copyWith(newGame);
        this._games.splice(index, 1);
        this._games.push(updatedGame);
        return updatedGame;
      }
    }
  }

  async removeById(id: string): Promise<Game> {
    for (const index of this._games.keys()) {
      const game: Game = this._games[index];
      if (game.id === id) {
        this._games.splice(index, 1);
        return game;
      }
    }
  }

  async updateListing(discountPercentage: number): Promise<Game[]> {
    const updatedListing: Game[] = [];
    for (const game of this._games) {
      if (this.gameListingManager.toBeDiscounted(game)) {
        const discountedGame: Game = this.gameListingManager.applyDiscount(
          game,
          discountPercentage,
        );
        updatedListing.push(discountedGame);
      } else if (!this.gameListingManager.toBeDeleted(game)) {
        updatedListing.push(game);
      }
    }
    this._games = updatedListing;
    return this._games;
  }
}
