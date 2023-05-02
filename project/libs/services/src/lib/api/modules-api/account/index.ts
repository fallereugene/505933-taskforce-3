import { BaseModule } from '../../abstract-module';

export class Account extends BaseModule {
  getAccount() {
    return this.get<{}>('');
  }
}
