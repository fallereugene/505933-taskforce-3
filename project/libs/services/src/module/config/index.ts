import path from 'path';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule as ConfigModuleRoot } from '@nestjs/config';
import { ConfigModuleOptions } from './contracts';
import { dbConfig } from './db';
import { commonConfig } from './common';

const envFilePath = `apps/${path.basename(__dirname)}/.env.${
  process.env.NODE_ENV
}`;

@Module({})
export class ConfigModule {
  static availableModulesList = {
    dbConfig,
    commonConfig,
  };

  static modulesToActivate: Array<
    keyof typeof ConfigModule.availableModulesList
  > = ['dbConfig', 'commonConfig'];

  static setModulesList(
    updatedModulesList: (typeof ConfigModule.modulesToActivate)[number][]
  ) {
    ConfigModule.modulesToActivate = updatedModulesList;
    return ConfigModule;
  }

  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    const dbConfigRegister = dbConfig(options);
    const commonConfigRegister = commonConfig(options);
    return {
      module: ConfigModule,
      imports: [
        ConfigModuleRoot.forRoot({
          isGlobal: true,
          cache: true,
          load: (() =>
            ConfigModule.modulesToActivate.map((moduleName) =>
              ConfigModule.availableModulesList[moduleName](options)
            ))(),
          envFilePath: envFilePath,
        }),
      ],
      exports: [],
    };
  }
}

export * from './constants';
export * from './db';
export * from './common';
