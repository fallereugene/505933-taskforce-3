import { Injectable } from '@nestjs/common';
import { Comment } from '@project/contracts';
import { CommentEntity } from '../entity';
import { RepositoryInMemory } from '@project/services';

@Injectable()
export class RepositoryMemory extends RepositoryInMemory<
  CommentEntity,
  Comment
> {
  /**
   * Получение всей коллекции коллекции
   * @returns
   */
  async getRepository(): Promise<Comment[]> {
    return Object.values(this.repository);
  }

  /**
   * Удаления списка комментариев в разрезе фильма
   * @param taskId Идентификатор задачи
   */
  async deleteCommentsList(taskId: number) {
    Object.entries(this.repository).forEach(([key, item]) => {
      if (item.task === taskId) {
        delete this.repository[key];
      }
    });
  }
}
