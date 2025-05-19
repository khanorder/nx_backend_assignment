import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nx-assignment/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  if ('production' !== configService.get('service')?.level) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('인증 서버')
      .setDescription('Auth Server')
      .setVersion('0.0.1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'Bearer',
          name: 'Authorization',
          in: 'header',
          bearerFormat: 'Bearer',
        },
        'access-token',
      )
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    swaggerDocument.security = [{ 'access-token': [] }];
    SwaggerModule.setup('swagger', app, swaggerDocument);
  }
  const port = configService.get('server')?.port ?? 3200;
  await app.listen(port);
}
bootstrap();
