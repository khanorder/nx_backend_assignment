import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoggerService } from '@nx-assignment/common';
import { seedEventSchedules } from '../seeds/event-schedule.seed';
import { EventSchedule, EventScheduleDocument } from "../schemas/event-schedule.schema";

@Injectable()
export class EventScheduleService {
  constructor(
    @InjectModel(EventSchedule.name, 'event') private eventScheduleModel: Model<EventScheduleDocument>,
    private readonly logger: LoggerService,
  ) {}

  async isEmptyCollectionEventSchedules(): Promise<boolean> {
    try {
      const count = await this.eventScheduleModel.estimatedDocumentCount().exec();
      return 1 > count;
    } catch (error: any) {
      this.logger.error(`${EventScheduleService.name}(isEmptyCollectionEventSchedules): ${error.stack}`);
    }

    return true;
  }

  async initCollectionSeedEventSchedules() {
    try {
      const result = await this.eventScheduleModel.create(seedEventSchedules);
    } catch (error: any) {
      this.logger.error(`${EventScheduleService.name}(initCollectionSeedEventSchedules): ${error.stack}`);
    }
  }
}
