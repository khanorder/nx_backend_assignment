import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { LoggerService } from '@nx-assignment/common';
import { seedEvents } from '../seeds/event.seed';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name, 'event') private eventModel: Model<EventDocument>,
    private readonly logger: LoggerService,
  ) {}

  async isEmptyCollection(): Promise<boolean> {
    try {
      const count = await this.eventModel.estimatedDocumentCount().exec();
      return 1 > count;
    } catch (error: any) {
      this.logger.error(`${EventService.name}(isEmptyCollection): ${error.stack}`);
    }

    return true;
  }

  async initCollectionSeed() {
    try {
      const result = await this.eventModel.create(seedEvents);
    } catch (error: any) {
      this.logger.error(`${EventService.name}(initCollectionSeed): ${error.stack}`);
    }
  }
}
