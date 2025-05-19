import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule, ConfigService } from '@nx-assignment/common';
import { AuthJwtService } from './auth-jwt.service';
import { readFileSync } from 'fs';

@Global()
@Module({
  imports: [
    CommonModule,
    JwtModule.registerAsync({
      imports: [CommonModule],
      global: true,
      useFactory: (config) => {
        let PRIVATE_KEY = '';
        let PUBLIC_KEY = '';
        try {
          PRIVATE_KEY = readFileSync(
            config.get('security')?.jwt?.private ?? '',
            { encoding: 'utf8' },
          );
          PUBLIC_KEY = readFileSync(config.get('security')?.jwt?.public ?? '', {
            encoding: 'utf8',
          });
        } catch (error: any) {
          console.error(
            `AuthJwtModule(JwtModule.registerAsync): ${error.stack}`,
          );
        }
        return {
          privateKey: PRIVATE_KEY,
          publicKey: PUBLIC_KEY,
          signOptions: {
            algorithm: 'RS256',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthJwtService],
  exports: [AuthJwtService],
})
export class AuthJwtModule {}
