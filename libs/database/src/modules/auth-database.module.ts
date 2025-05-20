import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { CommonModule } from '@nx-assignment/common';
import { AuthSchemaModule } from './auth-schema.module';

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
    AuthSchemaModule,
  ],
  exports: [MongooseModule, AuthSchemaModule],
})
export class AuthDatabaseModule {}
