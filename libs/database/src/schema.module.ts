import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Event, EventSchema } from './schemas/event.schema';
import { EventSchedule, EventScheduleSchema } from "./schemas/event-schedule.schema";
import { Item, ItemSchema } from "./schemas/item.schema";
import { Quest, QuestSchema } from "./schemas/quest.schema";
import { UserService } from './services/user.service';
import { EventService } from './services/event.service';
import { EventScheduleService } from "./services/event-schedule.service";
import { ItemService } from "./services/item.service";
import { QuestService } from "./services/quest.service";

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

const ItemModels = MongooseModule.forFeature(
    [{ name: Item.name, schema: ItemSchema }],
    'game',
);

const QuestModels = MongooseModule.forFeature(
    [{ name: Quest.name, schema: QuestSchema }],
    'game',
);

@Global()
@Module({
  imports: [
    UserModels,
    EventModels,
    EventScheduleModels,
    ItemModels,
    QuestModels,
  ],
  providers: [
    UserService,
    EventService,
    EventScheduleService,
    ItemService,
    QuestService,
  ],
  exports: [
    UserModels,
    EventModels,
    EventScheduleModels,
    ItemModels,
    QuestModels,
    UserService,
    EventService,
    EventScheduleService,
    ItemService,
    QuestService,
  ],
})
export class SchemaModule {}
