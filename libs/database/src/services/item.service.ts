import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from '../schemas/item.schema';
import { ConfigService, LoggerService } from '@nx-assignment/common';
import { seedItems } from '../seeds/item.seed';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name, 'game') private itemModel: Model<ItemDocument>,
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  async isEmptyCollection(): Promise<boolean> {
    try {
      const count = await this.itemModel.estimatedDocumentCount().exec();
      return 1 > count;
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.logger.error(
          `${ItemService.name}(isEmptyCollection): ${error.stack}`,
        );
      }
    }

    return true;
  }

  async initCollectionSeed() {
    try {
      const result = await this.itemModel.create(seedItems);
      if ('production' !== this.configService.get('service')?.level) {
        if (0 < result.length) {
          this.logger.info(
            `${ItemService.name}(initCollectionSeed): ${result.length} items are created.`,
          );
        }
      }
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.logger.error(
          `${ItemService.name}(initCollectionSeed): ${error.stack}`,
        );
      }
    }
  }
}
