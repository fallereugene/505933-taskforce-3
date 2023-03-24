import { AccountBase } from '.';

export interface AccountCustomer extends AccountBase {
  published: number;
  newStatus: number;
}
