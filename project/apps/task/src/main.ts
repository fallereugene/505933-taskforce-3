/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import fs from 'fs';
import { join } from 'path';
import { Logger, INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3333;
  setupOpenApi(app);
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

const setupOpenApi = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Task service')
    .setDescription('Task service API')
    .setVersion('1.0')
    .addTag('Task service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const specificationPath = join(__dirname, '/spec.json');

  SwaggerModule.setup('/spec', app, document, {
    useGlobalPrefix: true,
  });
  fs.writeFileSync(specificationPath, JSON.stringify(document));
};

bootstrap();
