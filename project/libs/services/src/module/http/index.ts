import { Module, Global } from '@nestjs/common';
import { HttpService } from '@project/services';

@Global()
@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
