import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Event, EventSchema } from './schemas/event.schema';
import {UserService} from "./services/user.service";
import {EventService} from "./services/event.service";

const UserModels = MongooseModule.forFeature(
  [{ name: User.name, schema: UserSchema }],
  'auth',
);

const EventModels = MongooseModule.forFeature(
  [{ name: Event.name, schema: EventSchema }],
  'event',
);

@Module({
  imports: [
    UserModels,
    EventModels
  ],
  providers: [
    UserService,
    EventService
  ],
  exports: [
    UserModels,
    EventModels,
    UserService,
    EventService
  ]
})
export class SchemaModule {}
