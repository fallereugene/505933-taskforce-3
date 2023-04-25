import { Module, DynamicModule } from '@nestjs/common';
import {
  PrismaServiceComment,
  PrismaServiceReview,
  PrismaServiceTask,
} from '.';

@Module({})
export class PrismaModule {
  static readonly MODULES_LIST = [
    PrismaServiceComment,
    PrismaServiceReview,
    PrismaServiceTask,
  ];

  static forRoot(): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: PrismaModule.MODULES_LIST,
      exports: PrismaModule.MODULES_LIST,
    };
  }
}
