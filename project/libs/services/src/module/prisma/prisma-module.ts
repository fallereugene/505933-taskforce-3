import { Module, DynamicModule } from '@nestjs/common';
import {
  PrismaServiceComment,
  PrismaServiceReview,
  PrismaServiceTask,
} from '.';

@Module({})
export class PrismaModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: [PrismaServiceComment, PrismaServiceReview, PrismaServiceTask],
      exports: [PrismaServiceComment, PrismaServiceReview, PrismaServiceTask],
    };
  }
}
