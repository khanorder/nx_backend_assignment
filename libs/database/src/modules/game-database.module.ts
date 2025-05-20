import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { CommonModule } from '@nx-assignment/common';
import { GameSchemaModule } from './game-schema.module';

@Global()
@Module({
  imports: [
    CommonModule,
    MongooseModule.forRootAsync({
      connectionName: 'game',
      imports: [CommonModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('database')?.game?.url ?? '',
        user: config.get('database')?.game?.id ?? '',
        pass: config.get('database')?.game?.pw ?? '',
        authSource: config.get('database')?.game?.auth_source ?? '',
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    GameSchemaModule,
  ],
  exports: [MongooseModule, GameSchemaModule],
})
export class GameDatabaseModule {}
