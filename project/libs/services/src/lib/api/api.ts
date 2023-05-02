import { Inject, Injectable } from '@nestjs/common';
import { BaseApi } from './abstract-api';
import { Account } from './modules-api';

@Injectable()
export class Api extends BaseApi {
  account = this.moduleFactory(Account);
}
