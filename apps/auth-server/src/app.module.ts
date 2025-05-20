import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthDatabaseModule, UserService } from '@nx-assignment/database';
import { CommonModule } from '@nx-assignment/common';
import { AuthJwtModule } from '@nx-assignment/auth-jwt';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CommonModule, AuthDatabaseModule, AuthJwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(private readonly userService: UserService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }

  async onModuleInit() {
    if (await this.userService.isEmptyCollection()) {
      await this.userService.initCollectionSeed();
    }
  }
}
