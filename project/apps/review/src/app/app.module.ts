import { Module } from '@nestjs/common';
import { ConfigModule } from '@project/services';
import { ReviewModule } from './review/review.module';
import { PrismaModule } from './review/prisma.module';

@Module({
  imports: [
    PrismaModule.forRoot(),
    ReviewModule,
    ConfigModule.setModulesList(['commonConfig']).forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
