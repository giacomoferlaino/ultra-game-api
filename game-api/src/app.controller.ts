import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { GameService } from './services/game.service';
import { Game } from './models/game';
import { CreateGameDto } from './dtos/createGameDto';
import { PublisherService } from './services/publisher.service';
import { Publisher } from './models/publisher';

@Controller('game')
export class AppController {
  constructor(
    private readonly _gameService: GameService,
    private readonly _publisherService: PublisherService,
  ) {}

  @Get()
  async findAll(): Promise<Game[]> {
    return await this._gameService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Game> {
    return await this._gameService.findById(id);
  }

  @Get(':id/publisher')
  async getPublisher(@Param('id') id: string): Promise<Publisher> {
    const game: Game = await this.findById(id);
    return await this._publisherService.findById(game.publisherId);
  }

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    const newGame: Game = Game.create(
      createGameDto.title,
      createGameDto.price,
      createGameDto.publisherId,
      createGameDto.tags,
      createGameDto.releaseDate,
    );
    await this._gameService.add(newGame);
    return newGame;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() createGameDto: CreateGameDto) {
    const newGame: Game = Game.create(
      createGameDto.title,
      createGameDto.price,
      createGameDto.publisherId,
      createGameDto.tags,
      createGameDto.releaseDate,
    );
    return await this._gameService.update(id, newGame);
  }

  @Delete(':id')
  async removeById(@Param('id') id: string): Promise<Game> {
    return await this._gameService.removeById(id);
  }
}
