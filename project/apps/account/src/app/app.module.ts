import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { ConfigAccountModule } from '@project/services';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/services';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    NotifyModule,
    AccountModule,
    ConfigAccountModule.forRoot(),
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
