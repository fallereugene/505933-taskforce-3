import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, HttpModule } from '@project/services';
import { AuthGuard, RoleGuard } from '@project/utils/utils-core';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './comment/prisma.module';

@Module({
  imports: [
    PrismaModule.forRoot(),
    CommentModule,
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
