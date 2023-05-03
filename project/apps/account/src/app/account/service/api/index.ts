import { BaseApi } from '@project/services';
import { Task } from './task';
import { Review } from './review';

export class Api extends BaseApi {
  task = this.moduleFactory(Task);
  review = this.moduleFactory(Review);
}
