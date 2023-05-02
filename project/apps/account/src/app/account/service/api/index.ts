import { BaseApi } from '@project/services';
import { Task } from './task';

export class Api extends BaseApi {
  task = this.moduleFactory(Task);
}
