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
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get('database')?.auth?.url ?? '',
        user: cfg.get('database')?.auth?.id ?? '',
        pass: cfg.get('database')?.auth?.pw ?? '',
        authSource: cfg.get('database')?.auth?.auth_source ?? '',
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      connectionName: 'event',
      imports: [CommonModule],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get('database')?.event?.url ?? '',
        user: cfg.get('database')?.auth?.id ?? '',
        pass: cfg.get('database')?.auth?.pw ?? '',
        authSource: cfg.get('database')?.auth?.auth_source ?? '',
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    SchemaModule,
  ],
  exports: [MongooseModule, SchemaModule],
})
export class DatabaseModule {}
