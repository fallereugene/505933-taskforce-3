import { BaseModule } from '@project/services';

export class Comment extends BaseModule {
  async removeCommentsList(url: string) {
    return this.delete<void>(url);
  }
}
