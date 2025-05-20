import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { CommonModule } from '@nx-assignment/common';
import { EventSchemaModule } from './event-schema.module';

@Global()
@Module({
  imports: [
    CommonModule,
    MongooseModule.forRootAsync({
      connectionName: 'event',
      imports: [CommonModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('database')?.event?.url ?? '',
        user: config.get('database')?.event?.id ?? '',
        pass: config.get('database')?.event?.pw ?? '',
        authSource: config.get('database')?.event?.auth_source ?? '',
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    EventSchemaModule,
  ],
  exports: [MongooseModule, EventSchemaModule],
})
export class EventDatabaseModule {}
