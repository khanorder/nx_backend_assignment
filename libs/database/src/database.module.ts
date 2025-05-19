import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { CommonModule } from '@nx-assignment/common';
import { SchemaModule } from './schema.module';

@Global()
@Module({
  imports: [
    CommonModule,
    MongooseModule.forRootAsync({
      connectionName: 'auth',
      imports: [CommonModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('database')?.auth?.url ?? '',
        user: config.get('database')?.auth?.id ?? '',
        pass: config.get('database')?.auth?.pw ?? '',
        authSource: config.get('database')?.auth?.auth_source ?? '',
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      connectionName: 'event',
      imports: [CommonModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('database')?.event?.url ?? '',
        user: config.get('database')?.auth?.id ?? '',
        pass: config.get('database')?.auth?.pw ?? '',
        authSource: config.get('database')?.auth?.auth_source ?? '',
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    SchemaModule,
  ],
  exports: [MongooseModule, SchemaModule],
})
export class DatabaseModule {}
