import { BaseModule } from '@project/services';
import { Comment as CommentType } from '@project/contracts';

export class Comment extends BaseModule {
  async removeCommentsList(url: string) {
    return this.delete<void>(url);
  }

  async getCommentsList(url: string) {
    return this.get<CommentType[]>(url);
  }
}
