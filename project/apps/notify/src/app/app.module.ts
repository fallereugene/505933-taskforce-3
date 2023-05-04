import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigNotifyModule } from '@project/services';
import { ConfigModule } from '@project/services';
import { getMongooseOptions } from '@project/services';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    ConfigNotifyModule.forRoot(),
    ConfigModule.setModulesList(['dbConfig', 'commonConfig']).forRoot(),
    MongooseModule.forRootAsync(getMongooseOptions()),
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
