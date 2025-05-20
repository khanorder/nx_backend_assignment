import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService, LoggerService } from '@nx-assignment/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    if ('production' !== this.configService.get('service')?.level) {
      this.loggerService.info(
        `${LoggerMiddleware.name} - ${this.use.name} : ${req.originalUrl}`,
      );
    }
    next();
  }
}
