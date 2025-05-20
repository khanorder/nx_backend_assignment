import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../schemas/event.schema';
import {
  EventSchedule,
  EventScheduleSchema,
} from '../schemas/event-schedule.schema';
import { EventService } from '../services/event.service';
import { EventScheduleService } from '../services/event-schedule.service';

const EventModels = MongooseModule.forFeature(
  [{ name: Event.name, schema: EventSchema }],
  'event',
);

const EventScheduleModels = MongooseModule.forFeature(
  [{ name: EventSchedule.name, schema: EventScheduleSchema }],
  'event',
);

@Global()
@Module({
  imports: [EventModels, EventScheduleModels],
  providers: [EventService, EventScheduleService],
  exports: [EventService, EventScheduleService],
})
export class EventSchemaModule {}
