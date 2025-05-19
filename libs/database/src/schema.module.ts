import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Event, EventSchema } from './schemas/event.schema';
import { EventSchedule, EventScheduleSchema } from "./schemas/event-schedule.schema";
import { UserService } from './services/user.service';
import { EventService } from './services/event.service';
import { EventScheduleService } from "./services/event-schedule.service";

const UserModels = MongooseModule.forFeature(
  [{ name: User.name, schema: UserSchema }],
  'auth',
);

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
  imports: [
    UserModels,
    EventModels,
    EventScheduleModels
  ],
  providers: [
    UserService,
    EventService,
    EventScheduleService
  ],
  exports: [
    UserModels,
    EventModels,
    UserService,
    EventService,
    EventScheduleService
  ],
})
export class SchemaModule {}
