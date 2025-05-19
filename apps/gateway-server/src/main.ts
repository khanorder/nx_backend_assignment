import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nx-assignment/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  if ('production' !== configService.get('service')?.level) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('게이트웨이 서버')
      .setDescription('Gateway Server')
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
  const port = configService.get('server')?.port ?? 3000;
  await app.listen(port);
}
bootstrap();
