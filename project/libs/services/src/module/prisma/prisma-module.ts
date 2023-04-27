import { Module, DynamicModule } from '@nestjs/common';
import { PrismaServiceTask } from './prisma-service-task';
import { PrismaServiceComment } from './prisma-service-comment';
import { PrismaServiceReview } from './prisma-service-review';

@Module({})
export class PrismaModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: [PrismaServiceComment, PrismaServiceTask, PrismaServiceReview],
      exports: [PrismaServiceComment, PrismaServiceTask, PrismaServiceReview],
    };
  }
}
