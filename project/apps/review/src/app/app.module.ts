import { Module } from '@nestjs/common';
import { PrismaModule, ConfigModule } from '@project/services';
import { ReviewModule } from './review/review.module';

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
