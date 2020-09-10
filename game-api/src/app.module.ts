import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { GameService } from './services/game.service';
import { PublisherService } from './services/publisher.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GameService, PublisherService],
})
export class AppModule {}
