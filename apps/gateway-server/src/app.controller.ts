import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public, RefreshTokenAuthGuard } from '@nx-assignment/auth';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  RequestRefreshToken,
  RequestSignIn,
  ResponseRefreshToken,
  ResponseSignIn,
} from '@nx-assignment/common';
import { AuthApi } from '@nx-assignment/api';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authApi: AuthApi,
  ) {}

  @Get()
  getHello(@Req() req: any): string {
    console.log(req.user);
    return this.appService.getHello();
  }

  @Public()
  @Post('/signIn')
  @ApiBody({ type: RequestSignIn })
  @ApiOkResponse({ type: ResponseSignIn })
  async signIn(@Body() body: RequestSignIn) {
    const result = new ResponseSignIn();
    if (body.userId) {
      const response = await this.authApi.signIn({ userId: body.userId });
      result.accessToken = response.accessToken ?? '';
      result.refreshToken = response.refreshToken ?? '';
    }
    return result;
  }

  @Public()
  @UseGuards(RefreshTokenAuthGuard)
  @Post('refreshToken')
  @ApiBody({ type: RequestRefreshToken })
  async refreshToken(@Body() body: RequestRefreshToken, @Req() req: any) {
    const result = new ResponseRefreshToken();
    if (!body.refreshToken) {
      throw new UnauthorizedException(
        `${AppController.name}(${this.refreshToken.name}): refreshToken is empty.`,
      );
    }

    if (req.user && req.user?.uid && req.user?.refreshTokenId) {
      const resultIsMatchedRefreshToken =
        await this.authApi.isMatchedRefreshToken({
          userId: req.user.uid,
          refreshTokenId: req.user.refreshTokenId,
        });
      result.accessToken = resultIsMatchedRefreshToken.accessToken ?? '';
    }

    return result;
  }
}
