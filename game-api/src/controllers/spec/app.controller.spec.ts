import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { GameService } from '../../services/game.service';
import { PublisherService } from '../../services/publisher.service';
import { games, assassinsCreed } from '../../data-mock/games';
import { ubisoft } from '../../data-mock/publishers';
import { Game } from '../../models/game';
import { CreateGameDto } from '../../dtos/createGameDto';

describe('class: AppController', () => {
  let appController: AppController;
  let gameService: GameService;
  let publisherService: PublisherService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [GameService, PublisherService],
    }).compile();

    appController = app.get<AppController>(AppController);
    gameService = app.get<GameService>(GameService);
    publisherService = app.get<PublisherService>(PublisherService);
  });

  describe('method: findAll', () => {
    beforeEach(() => {
      jest.spyOn(gameService, 'findAll').mockResolvedValue(games);
    });

    it('should resolve with all the existing games', async () => {
      await expect(appController.findAll()).resolves.toEqual(games);
    });
  });

  describe('method: findById', () => {
    beforeEach(() => {
      jest.spyOn(gameService, 'findById').mockResolvedValue(assassinsCreed);
    });

    it('should resolve with the game associated with the given id', async () => {
      await expect(appController.findById(assassinsCreed.id)).resolves.toEqual(
        assassinsCreed,
      );
    });
  });

  describe('method: getPublisher', () => {
    beforeEach(() => {
      jest.spyOn(gameService, 'findById').mockResolvedValue(assassinsCreed);
      jest.spyOn(publisherService, 'findById').mockResolvedValue(ubisoft);
    });

    it('should resolve with the publisher associated with the game that has the given id', async () => {
      await expect(appController.getPublisher(ubisoft.id)).resolves.toEqual(
        ubisoft,
      );
    });
  });

  describe('method: update', () => {
    let createGameDto: CreateGameDto;
    let expectedGame: Game;
    let releaseDate: Date;

    beforeEach(() => {
      releaseDate = new Date();
      createGameDto = {
        title: 'newTitle',
        price: 25.99,
        tags: ['newTag'],
        publisherId: ubisoft.id,
        releaseDate: releaseDate.toString(),
      };
      expectedGame = {
        ...assassinsCreed,
        ...createGameDto,
        releaseDate: releaseDate,
      } as Game;
      jest.spyOn(gameService, 'update').mockResolvedValue(expectedGame);
    });

    it('should resolve with the updated game', async () => {
      await expect(
        appController.update(assassinsCreed.id, createGameDto),
      ).resolves.toEqual(expectedGame);
    });
  });

  describe('method: removeById', () => {
    beforeEach(() => {
      jest.spyOn(gameService, 'removeById').mockResolvedValue(assassinsCreed);
    });

    it('should resolve with game associated with the given id', async () => {
      await expect(
        appController.removeById(assassinsCreed.id),
      ).resolves.toEqual(assassinsCreed);
    });
  });
});
