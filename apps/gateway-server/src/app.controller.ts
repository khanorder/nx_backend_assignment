import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthJwtService } from '@nx-assignment/auth-jwt';
import { Public, RefreshTokenAuthGuard } from '@nx-assignment/auth';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('/signIn')
  async signIn() {
    return await this.authJwtService.signIn({
      uid: '1000000',
      nick: '테스트',
      roles: ['USER'],
    });
  }

  @Public()
  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh')
  @ApiBody({ type: Object })
  async refresh(@Req() req: any) {
    return this.authJwtService.generateAccessToken({
      uid: req.user?.uid ?? '',
      nick: req.user?.nick ?? '',
      roles: req.user?.roles ?? [],
    });
  }
}
