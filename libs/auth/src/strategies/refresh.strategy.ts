import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { configuration, TypeToken, UserInterface } from '@nx-assignment/common';
import { readFileSync } from 'fs';
import { join } from 'path';
const config = configuration();
let PUBLIC_KEY = '';
try {
  PUBLIC_KEY = readFileSync(
    join(process.cwd(), config.security?.jwt?.public ?? ''),
    { encoding: 'utf8' },
  );
} catch (error: any) {
  console.error(`RefreshTokenStrategy: ${error.stack}`);
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: PUBLIC_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any): Promise<UserInterface> {
    if (TypeToken.Refresh !== payload.type) {
      throw new UnauthorizedException(
        `RefreshTokenStrategy: the token type is not refresh token. type: ${payload.type}`,
      );
    }
    return { uid: payload.uid, roles: payload.roles, nick: payload.nick, refreshTokenId: payload.jti };
  }
}
