import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  DatabaseModule,
  ItemService,
  QuestService,
} from '@nx-assignment/database';
import { CommonModule } from '@nx-assignment/common';
import { AuthModule } from '@nx-assignment/auth';

@Module({
  imports: [CommonModule, AuthModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly itemService: ItemService,
    private readonly questService: QuestService,
  ) {}

  async onModuleInit() {
    if (await this.itemService.isEmptyCollection()) {
      await this.itemService.initCollectionSeed();
    }

    if (await this.questService.isEmptyCollection()) {
      await this.questService.initCollectionSeed();
    }
  }
}
