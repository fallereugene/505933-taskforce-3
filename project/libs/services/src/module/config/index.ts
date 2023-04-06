import path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './db';
import { commonConfig } from './common';

const envFilePath = `apps/${path.basename(__dirname)}/.env.${
  process.env.NODE_ENV
}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [dbConfig, commonConfig],
      envFilePath: envFilePath,
    }),
  ],
})
export class ConfigModuleRoot {}

export * from './constants';
export * from './db';
export * from './common';
