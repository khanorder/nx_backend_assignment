import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule, UserService } from '@nx-assignment/database';
import { CommonModule } from '@nx-assignment/common';

@Module({
  imports: [CommonModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    if (await this.userService.isEmptyCollection()) {
      await this.userService.initCollectionSeed();
    }
  }
}
