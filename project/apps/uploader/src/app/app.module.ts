import { Module } from '@nestjs/common';

import { ConfigUploadModule } from '@project/services';

@Module({
  imports: [ConfigUploadModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
