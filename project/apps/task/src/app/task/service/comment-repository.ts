import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Http, ConfigNamespace } from '@project/services';

@Injectable()
export class CommentRepository {
  constructor(
    private readonly http: Http,
    private readonly configService: ConfigService
  ) {}

  /**
   * Удаление задания приводит к удалению всех оставленных к нему комментариев.
   * @param token Токен авторизации
   */
  async removeCommentsList(token: string, taskId: number) {
    const { urlServiceComment } = this.configService.get(
      ConfigNamespace.Common
    );
    await this.http.delete(`${urlServiceComment}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
