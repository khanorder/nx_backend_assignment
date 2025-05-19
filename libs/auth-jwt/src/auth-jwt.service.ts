import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConfigService,
  LoggerService,
  UserInterface,
  SignInResult,
  TypeRole,
  TypeToken,
} from '@nx-assignment/common';
import { readFileSync } from 'fs';
import { v4 as uuid } from 'uuid';
import { join } from 'path';
// import bcrypt from "bcrypt";

@Injectable()
export class AuthJwtService {
  private readonly _issuer: string;
  private readonly _audience: string;
  private readonly _privateKey: string;
  private readonly _publicKey: string;
  private readonly _expireAccess: number;
  private readonly _expireRefresh: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {
    const serviceLevel =
      this.configService.get('service')?.level ?? 'development';
    this._issuer = this.configService.get('security')?.jwt?.issuer ?? '';
    this._audience = this.configService.get('security')?.jwt?.audience ?? '';

    let privateKey = '';
    let publicKey = '';
    try {
      privateKey = readFileSync(
        join(
          process.cwd(),
          this.configService.get('security')?.jwt?.private ?? '',
        ),
        { encoding: 'utf8' },
      );
      publicKey = readFileSync(
        join(
          process.cwd(),
          this.configService.get('security')?.jwt?.public ?? '',
        ),
        { encoding: 'utf8' },
      );
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.loggerService.error(
          `${AuthJwtService.name} - constructor(read private, public Key): ${error.stack}`,
        );
      }
    }
    this._privateKey = privateKey;
    this._publicKey = publicKey;

    let expireAccess = 1;
    let expireRefresh = 1;

    try {
      expireAccess = parseInt(
        this.configService.get('security')?.jwt?.access_expire ?? '1',
      );
    } catch (error: any) {
      this.loggerService.error(
        `${AuthJwtService.name} - constructor(parse expireAccess): ${error.stack}`,
      );
    }

    try {
      expireRefresh = parseInt(
        this.configService.get('security')?.jwt?.refresh_expire ?? '1',
      );
    } catch (error: any) {
      this.loggerService.error(
        `${AuthJwtService.name} - constructor(parse expireRefresh): ${error.stack}`,
      );
    }

    this._expireAccess = expireAccess;
    this._expireRefresh = expireRefresh;
  }

  public async generateAccessToken(user: UserInterface): Promise<string> {
    if (!this._privateKey) {
      this.loggerService.error(
        `${AuthJwtService.name} - ${this.generateAccessToken.name}: JWT private key is empty.`,
      );
      return '';
    }

    if (1 > user.roles.length) {
      this.loggerService.error(
        `${AuthJwtService.name} - ${this.generateAccessToken.name}: the user role is empty.`,
      );
      return '';
    }

    let accessToken = '';
    const jwtid = uuid();

    try {
      accessToken = this.jwtService.sign(
        {
          type: TypeToken.Access,
          uid: user.uid,
          roles: user.roles,
          nick: user.nick,
        },
        {
          privateKey: this._privateKey,
          issuer: this._issuer,
          audience: this._audience,
          jwtid: jwtid,
          expiresIn: 60 * this._expireAccess,
          algorithm: 'RS256',
        },
      );
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.loggerService.error(
          `${AuthJwtService.name} - ${this.generateAccessToken.name}: failed to generate access token.`,
        );
        this.loggerService.error(
          `${AuthJwtService.name} - ${this.generateRefreshToken.name}: ${error.stack}`,
        );
      }
    }

    return accessToken;
  }

  public async generateRefreshToken(user: UserInterface): Promise<string> {
    if (!this._privateKey) {
      this.loggerService.error(
        `${AuthJwtService.name} - ${this.generateRefreshToken.name}: JWT private key is empty.`,
      );
      return '';
    }

    if (1 > user.roles.length) {
      this.loggerService.error(
        `${AuthJwtService.name} - ${this.generateRefreshToken.name}: the user role is empty.`,
      );
      return '';
    }

    let refreshToken = '';

    try {
      refreshToken = this.jwtService.sign(
        {
          type: TypeToken.Refresh,
          uid: user.uid,
          roles: user.roles,
          nick: user.nick,
        },
        {
          privateKey: this._privateKey,
          issuer: this._issuer,
          audience: this._audience,
          jwtid: uuid(),
          expiresIn: 60 * this._expireRefresh,
          algorithm: 'RS256',
        },
      );
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.loggerService.error(
          `${AuthJwtService.name} - ${this.generateRefreshToken.name}: failed to generate refresh token.`,
        );
        this.loggerService.error(
          `${AuthJwtService.name} - ${this.generateRefreshToken.name}: ${error.stack}`,
        );
      }
    }

    return refreshToken;
  }

  public async signIn(user: UserInterface): Promise<SignInResult> {
    const result = new SignInResult('', '');

    try {
      result.accessToken = await this.generateAccessToken(user);
      result.refreshToken = await this.generateRefreshToken(user);
      return result;
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.loggerService.error(
          `${AuthJwtService.name} - ${this.signIn.name}: ${error.stack}`,
        );
      }
    }
    return result;
  }
}
