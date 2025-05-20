import { HttpStatus, Injectable } from '@nestjs/common';
import {
  ConfigService,
  LoggerService,
  RequestGetUser, RequestIsMatchedRefreshToken,
  RequestSignIn,
  ResponseGetUser, ResponseIsMatchedRefreshToken,
  ResponseSignIn,
  UserDTO,
  UserInterface,
} from '@nx-assignment/common';

@Injectable()
export class AuthApi {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {}

  async getUser(request: RequestGetUser): Promise<ResponseGetUser> {
    const result = new ResponseGetUser();
    if (!this.configService.get('url')?.auth_server) {
      return result;
    }

    const url = this.configService.get('url').auth_server + '/getUser';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (200 === response.status || 201 === response.status) {
        const json = await response.json();
        if (json) {
          result.user = json?.user ?? null;
        }
      }
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.loggerService.error(
          `${AuthApi.name} - ${this.getUser.name}: ${error.stack}`,
        );
      }
    }

    return result;
  }

  async signIn(request: RequestSignIn): Promise<ResponseSignIn> {
    const result = new ResponseSignIn();
    if (!this.configService.get('url')?.auth_server) {
      return result;
    }

    const url = this.configService.get('url').auth_server + '/signIn';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (200 === response.status || 201 === response.status) {
        const json = await response.json();
        result.accessToken = json?.accessToken ?? '';
        result.refreshToken = json?.refreshToken ?? '';
      }
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.loggerService.error(
          `${AuthApi.name} - ${this.signIn.name}: ${error.stack}`,
        );
      }
    }

    return result;
  }

  async isMatchedRefreshToken(request: RequestIsMatchedRefreshToken): Promise<ResponseIsMatchedRefreshToken> {
    const result = new ResponseIsMatchedRefreshToken();
    if (!this.configService.get('url')?.auth_server) {
      return result;
    }

    const url = this.configService.get('url').auth_server + '/isMatchedRefreshToken';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (200 === response.status || 201 === response.status) {
        const json = await response.json();
        result.accessToken = json?.accessToken ?? '';
      }
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.loggerService.error(
            `${AuthApi.name} - ${this.isMatchedRefreshToken.name}: ${error.stack}`,
        );
      }
    }

    return result;
  }
}
