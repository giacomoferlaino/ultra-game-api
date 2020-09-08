import { Injectable } from '@nestjs/common';
import { Game } from 'src/models/game';
import { games } from 'src/data-mock/games';

@Injectable()
export class GameService {
  private _games: Game[] = [...games];

  get games(): Game[] {
    return this._games;
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
}
