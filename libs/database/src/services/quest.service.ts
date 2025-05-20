import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quest, QuestDocument } from '../schemas/quest.schema';
import { ConfigService, LoggerService } from '@nx-assignment/common';
import { seedQuests } from '../seeds/quest.seed';

@Injectable()
export class QuestService {
  constructor(
    @InjectModel(Quest.name, 'game') private questModel: Model<QuestDocument>,
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  async isEmptyCollection(): Promise<boolean> {
    try {
      const count = await this.questModel.estimatedDocumentCount().exec();
      return 1 > count;
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.logger.error(
          `${QuestService.name}(isEmptyCollection): ${error.stack}`,
        );
      }
    }

    return true;
  }

  async initCollectionSeed() {
    try {
      const result = await this.questModel.create(seedQuests);
      if ('production' !== this.configService.get('service')?.level) {
        if (0 < result.length) {
          this.logger.info(
            `${QuestService.name}(initCollectionSeed): ${result.length} quests are created.`,
          );
        }
      }
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.logger.error(
          `${QuestService.name}(initCollectionSeed): ${error.stack}`,
        );
      }
    }
  }
}
