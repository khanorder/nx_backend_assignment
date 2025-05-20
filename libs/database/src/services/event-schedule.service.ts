import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EventSchedule,
  EventScheduleDocument,
} from '../schemas/event-schedule.schema';
import { ConfigService, LoggerService } from '@nx-assignment/common';
import { seedEventSchedules } from '../seeds/event-schedule.seed';

@Injectable()
export class EventScheduleService {
  constructor(
    @InjectModel(EventSchedule.name, 'event')
    private eventScheduleModel: Model<EventScheduleDocument>,
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  async isEmptyCollection(): Promise<boolean> {
    try {
      const count = await this.eventScheduleModel
        .estimatedDocumentCount()
        .exec();
      return 1 > count;
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.logger.error(
          `${EventScheduleService.name}(isEmptyCollection): ${error.stack}`,
        );
      }
    }

    return true;
  }

  async initCollectionSeed() {
    try {
      const result = await this.eventScheduleModel.create(seedEventSchedules);
      if ('production' !== this.configService.get('service')?.level) {
        if (0 < result.length) {
          this.logger.info(
            `${EventScheduleService.name}(initCollectionSeed): ${result.length} event-schedules are created.`,
          );
        }
      }
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.logger.error(
          `${EventScheduleService.name}(initCollectionSeed): ${error.stack}`,
        );
      }
    }
  }
}
