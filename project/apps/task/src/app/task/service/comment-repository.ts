import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigTaskNamespace } from '@project/services';
import { Api } from './api';

@Injectable()
export class CommentRepository {
  constructor(
    private readonly api: Api,
    private readonly configService: ConfigService
  ) {}

  /**
   * Удаление задания приводит к удалению всех оставленных к нему комментариев.
   * @param token Токен авторизации
   */
  async removeCommentsList(token: string, taskId: number) {
    try {
      const { urlServiceComment } = this.configService.get(
        ConfigTaskNamespace.Common
      );
      this.api.configure({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.api.comment.removeCommentsList(`${urlServiceComment}/${taskId}`);
    } catch {
      console.log(`Service is not available.`);
    }
  }
}
