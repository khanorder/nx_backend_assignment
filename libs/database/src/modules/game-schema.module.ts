import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from '../schemas/item.schema';
import { Quest, QuestSchema } from '../schemas/quest.schema';
import { ItemService } from '../services/item.service';
import { QuestService } from '../services/quest.service';

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
  imports: [ItemModels, QuestModels],
  providers: [ItemService, QuestService],
  exports: [ItemService, QuestService],
})
export class GameSchemaModule {}
