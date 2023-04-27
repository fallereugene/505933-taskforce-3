import { Module, Global } from '@nestjs/common';
import { Http } from './http';

@Global()
@Module({
  providers: [Http],
  exports: [Http],
})
export class HttpModule {}

export * from './http';
