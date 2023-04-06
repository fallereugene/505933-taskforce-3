/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { DEFAULT_PORT } from './app/constants';

const setupOpenApi = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Task service')
    .setDescription('Task service API')
    .setVersion('1.0')
    .addTag('Task service')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/spec', app, document, {
    useGlobalPrefix: true,
  });
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || DEFAULT_PORT;

  setupOpenApi(app);
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
};

bootstrap();
