import { Injectable } from '@nestjs/common';
import { Comment } from '@project/contracts';
import { CommentEntity } from '../entity';
import { RepositoryInMemory } from '@project/services';

@Injectable()
export class Repository extends RepositoryInMemory<CommentEntity, Comment> {
  /**
   * Получение всей коллекции коллекции
   * @returns
   */
  async getRepository(): Promise<Comment[]> {
    // TODO: в целевой реализации будет поиск по идентификатору авторизованного пользователя
    return Object.values(this.repository);
  }

  /**
   * Удаления списка комментариев в разрезе фильма
   * @param taskId Идентификатор задачи
   */
  async deleteCommentsList(taskId: string) {
    Object.entries(this.repository).forEach(([key, item]) => {
      if (item.task === taskId) {
        delete this.repository[key];
      }
    });
  }
}
