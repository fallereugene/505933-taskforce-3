import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, HttpModule } from '@project/services';
import { AuthGuard, RoleGuard } from '@project/utils/utils-core';
import { ReviewModule } from './review/review.module';
import { PrismaModule } from './review/prisma.module';

@Module({
  imports: [
    PrismaModule.forRoot(),
    ReviewModule,
    ConfigModule.setModulesList(['commonConfig']).forRoot(),
    HttpModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
