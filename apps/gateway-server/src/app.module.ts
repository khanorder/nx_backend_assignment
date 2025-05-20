import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  GameDatabaseModule,
  ItemService,
  QuestService,
} from '@nx-assignment/database';
import { CommonModule } from '@nx-assignment/common';
import { AuthModule } from '@nx-assignment/auth';
import { ApiModule } from '@nx-assignment/api';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CommonModule, AuthModule, GameDatabaseModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(
    private readonly itemService: ItemService,
    private readonly questService: QuestService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }

  async onModuleInit() {
    if (await this.itemService.isEmptyCollection()) {
      await this.itemService.initCollectionSeed();
    }

    if (await this.questService.isEmptyCollection()) {
      await this.questService.initCollectionSeed();
    }
  }
}
