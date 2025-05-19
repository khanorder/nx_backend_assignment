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
    if (await this.eventService.isEmptyCollectionEvents()) {
      await this.eventService.initCollectionSeedEvents();
    }

    if (await this.eventScheduleService.isEmptyCollectionEventSchedules()) {
      await this.eventScheduleService.initCollectionSeedEventSchedules();
    }
  }
}
