import { GameService } from './game.service';
import { games, assassinsCreed } from 'src/data-mock/games';
import { Game } from 'src/models/game';
import { ubisoft } from 'src/data-mock/publishers';

describe('class: GameService', () => {
  let gameService: GameService;

  beforeEach(() => {
    gameService = new GameService();
  });

  describe('method: findAll', () => {
    it('should resolve with an array containing all the games', async () => {
      await expect(gameService.findAll()).resolves.toEqual(games);
    });
  });

  describe('method: findById', () => {
    it('should resolve with the game that is associated with the given id', async () => {
      await expect(gameService.findById(assassinsCreed.id)).resolves.toEqual(
        assassinsCreed,
      );
    });

    it('should resolve with undefined if no game has the given id', async () => {
      await expect(gameService.findById('invalidId')).resolves.toBeUndefined();
    });
  });

  describe('method: add', () => {
    const newGame: Game = Game.create(
      'newGame',
      12.99,
      ubisoft.id,
      [],
      new Date(),
    );

    it('should add the given game to the existing games list', async () => {
      await gameService.add(newGame);
      expect(gameService.games).toEqual([...games, newGame]);
    });
  });

  describe('method: update', () => {
    let newGame: Game = Game.create(
      'newGame',
      12.99,
      ubisoft.id,
      ['newTag'],
      new Date(),
    );

    it('should resolve the updated game that has the given id', async () => {
      await expect(
        gameService.update(assassinsCreed.id, newGame),
      ).resolves.toEqual({ ...newGame, id: assassinsCreed.id });
    });

    it('should update only the changed field (zero values or iterable with length ==0 count as not changed)', async () => {
      newGame = Game.create('newGame', 12.99, ubisoft.id, [], new Date());
      await expect(
        gameService.update(assassinsCreed.id, newGame),
      ).resolves.toEqual({
        ...newGame,
        id: assassinsCreed.id,
        tags: assassinsCreed.tags,
      });
    });

    it('should resolve with undefined if no game has the given id', async () => {
      await expect(
        gameService.update('invalidId', newGame),
      ).resolves.toBeUndefined();
    });
  });

  describe('method: deleteById', () => {
    let gamesCopy: Game[];
    let deletedGame: Game;

    beforeEach(async () => {
      deletedGame = await gameService.removeById(assassinsCreed.id);
      gamesCopy = [...games];
      gamesCopy.shift();
    });

    it('should delete from the existing games list the one associated with the given id', () => {
      expect(gameService.games).toEqual(gamesCopy);
    });

    it('should resolve the deleted game', () => {
      expect(deletedGame).toEqual(assassinsCreed);
    });

    it('should resolve with undefined if no game has the given id', async () => {
      deletedGame = await gameService.removeById('invalidId');
      expect(deletedGame).toBeUndefined();
    });
  });
});
