import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  DatabaseModule,
  EventScheduleService,
  EventService,
} from '@nx-assignment/database';
import { CommonModule } from '@nx-assignment/common';

@Module({
  imports: [CommonModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly eventService: EventService,
    private readonly eventScheduleService: EventScheduleService,
  ) {}

  async onModuleInit() {
    if (await this.eventService.isEmptyCollection()) {
      await this.eventService.initCollectionSeed();
    }

    if (await this.eventScheduleService.isEmptyCollection()) {
      await this.eventScheduleService.initCollectionSeed();
    }
  }
}
