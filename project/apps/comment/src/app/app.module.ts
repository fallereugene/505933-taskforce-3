import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigCommentModule, HttpModule } from '@project/services';
import { AuthGuard, RoleGuard } from '@project/utils/utils-core';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './comment/prisma.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    PrismaModule.forRoot(),
    CommentModule,
    ConfigCommentModule.forRoot(),
    HttpModule,
    NotifyModule,
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
