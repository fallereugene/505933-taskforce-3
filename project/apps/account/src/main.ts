/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ConfigNamespace, CommonConfig } from '@project/services';
import { AppModule } from './app/app.module';

const setupOpenApi = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Account service')
    .setDescription('Account service API')
    .setVersion('1.0')
    .addTag('account')
    .addServer('/api/v1/')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/spec', app, document, {
    useGlobalPrefix: true,
  });
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const { port } = app
    .get(ConfigService)
    .get<CommonConfig>(ConfigNamespace.Common);

  setupOpenApi(app);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
};

bootstrap();
