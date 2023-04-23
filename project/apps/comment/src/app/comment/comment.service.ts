import { Injectable, NotFoundException } from '@nestjs/common';
import { Timezone } from '@project/services';
import { Comment } from '@project/contracts';
import { CommentEntity } from './entity';
import { Repository } from './service';
import { CreateCommentDto } from './dto';
import { EXCEPTION } from '../constants';
import { PostQuery } from './validations';

@Injectable()
export class CommentService {
  constructor(
    private readonly repository: Repository,
    private readonly tz: Timezone
  ) {}

  /**
   * Создание комментария
   * @param payload Объект DTO
   * @returns Детали созданного комментария
   */
  async create(payload: CreateCommentDto): Promise<Comment> {
    const entity = new CommentEntity({
      ...payload,
      // TODO: идентификатор авторизованного пользователя
      author: '833a6872-29dd-4869-af2e-7df28a82aa6c',
    });
    return this.repository.create(entity);
  }

  /**
   * Получение списка комментариев
   */
  async getList(taskId: number, query: PostQuery): Promise<Comment[]> {
    return await this.repository.getList(taskId, query);
  }

  /**
   * Получение детальной информации по комментарию
   * @param id Идентификатор комментария
   */
  async findById(id: number): Promise<Comment> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException(EXCEPTION.NotFoundComment);
    }
    return record;
  }

  /**
   * Удаление существующего комментария
   * @param commentId Идентификатор задачи
   */
  async deleteItem(commentId: number): Promise<void> {
    await this.findById(commentId);
    await this.repository.delete(commentId);
  }

  /**
   * Удаление всех комментариев в разрезе определенной задачи
   * @param taskId Идентификатор задачи
   */
  async deleteList(taskId: number): Promise<void> {
    await this.repository.deleteCommentsList(taskId);
  }
}
