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
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: PUBLIC_KEY,
    });
  }

  async validate(payload: any): Promise<UserInterface> {
    if (TypeToken.Access !== payload.type) {
      throw new UnauthorizedException(
        `JwtStrategy: the token type is not access token. type: ${payload.type}`,
      );
    }
    return { uid: payload.uid, roles: payload.roles, nick: payload.nick };
  }
}
