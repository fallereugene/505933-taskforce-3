import { BaseApi } from './abstract-api';
import { Account } from './modules-api';

export class Api extends BaseApi {
  account = this.moduleFactory(Account);
}
