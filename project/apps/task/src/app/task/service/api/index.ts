import { BaseApi } from '@project/services';
import { Comment } from './comment';

export class Api extends BaseApi {
  comment = this.moduleFactory(Comment);
}
