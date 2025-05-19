import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from '../schemas/item.schema';
import { LoggerService } from '@nx-assignment/common';
import { seedItems } from '../seeds/item.seed';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name, 'game') private itemModel: Model<ItemDocument>,
    private readonly logger: LoggerService,
  ) {}

  async isEmptyCollection(): Promise<boolean> {
    try {
      const count = await this.itemModel.estimatedDocumentCount().exec();
      return 1 > count;
    } catch (error: any) {
      this.logger.error(`${ItemService.name}(isEmptyCollection): ${error.stack}`);
    }

    return true;
  }

  async initCollectionSeed() {
    try {
      const result = await this.itemModel.create(seedItems);
    } catch (error: any) {
      this.logger.error(`${ItemService.name}(initCollectionSeed): ${error.stack}`);
    }
  }
}
