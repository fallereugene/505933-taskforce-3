/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  Logger,
  INestApplication,
  VersioningType,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ConfigReviewNamespace, CommonConfig } from '@project/services';
import { AppModule } from './app/app.module';

const setupOpenApi = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Review service')
    .setDescription('Review service API')
    .setVersion('1.0')
    .addTag('Review service')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/spec', app, document, {
    useGlobalPrefix: true,
  });
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const { port } = app
    .get(ConfigService)
    .get<CommonConfig>(ConfigReviewNamespace.Common);

  setupOpenApi(app);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
};

bootstrap();
