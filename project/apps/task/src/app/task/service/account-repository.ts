import { Injectable } from '@nestjs/common';
import { Http } from '@project/services';

@Injectable()
export class AccountRepository {
  constructor(private readonly http: Http) {}

  async decodeJwtToken() {}
}
