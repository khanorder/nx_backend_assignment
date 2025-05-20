import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  LoggerService,
  RequestGetUser,
  RequestIsMatchedRefreshToken,
  RequestSignIn,
  ResponseGetUser,
  ResponseIsMatchedRefreshToken,
  ResponseSignIn,
} from '@nx-assignment/common';
import { UserService } from '@nx-assignment/database';
import { ApiBody } from '@nestjs/swagger';
import { AuthJwtService } from '@nx-assignment/auth-jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authJwtService: AuthJwtService,
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/getUser')
  @ApiBody({ type: RequestGetUser })
  async getUser(@Body() body: RequestGetUser): Promise<ResponseGetUser> {
    const result: ResponseGetUser = new ResponseGetUser();
    if (body.userId) {
      const user = await this.userService.getUser(body.userId);
      if (user) {
        result.user = user;
      }
    }
    return result;
  }

  @Post('/signIn')
  @ApiBody({ type: RequestSignIn })
  async signIn(@Body() body: RequestSignIn): Promise<ResponseSignIn> {
    const result = new ResponseSignIn();
    if (body.userId) {
      const user = await this.userService.getUser(body.userId);
      if (user) {
        const signInResult = await this.authJwtService.signIn({
          uid: user.uid,
          nick: user.nick,
          roles: user.roles,
        });
        const resultUpdateRefreshToken =
          await this.userService.updateRefreshToken(
            user.uid,
            signInResult.refreshTokenId,
          );
        if (resultUpdateRefreshToken) {
          result.accessToken = signInResult.accessToken;
          result.refreshToken = signInResult.refreshToken;
        }
      }
    }
    return result;
  }

  @Post('/isMatchedRefreshToken')
  @ApiBody({ type: RequestIsMatchedRefreshToken })
  async isMatchedRefreshToken(
    @Body() body: RequestIsMatchedRefreshToken,
  ): Promise<ResponseIsMatchedRefreshToken> {
    const result = new ResponseIsMatchedRefreshToken();
    if (body.userId && body.refreshTokenId) {
      const user = await this.userService.isMatchRefreshToken(
        body.userId,
        body.refreshTokenId,
      );

      if (user) {
        const resultAccessToken = await this.authJwtService.generateAccessToken(
          {
            uid: user.uid,
            nick: user.nick,
            roles: user.roles,
          },
        );
        result.accessToken = resultAccessToken.token;
      }
    }
    return result;
  }
}
