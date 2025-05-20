import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  EventDatabaseModule,
  EventScheduleService,
  EventService,
} from '@nx-assignment/database';
import { CommonModule } from '@nx-assignment/common';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CommonModule, EventDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(
    private readonly eventService: EventService,
    private readonly eventScheduleService: EventScheduleService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }

  async onModuleInit() {
    if (await this.eventService.isEmptyCollection()) {
      await this.eventService.initCollectionSeed();
    }

    if (await this.eventScheduleService.isEmptyCollection()) {
      await this.eventScheduleService.initCollectionSeed();
    }
  }
}
