import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Comment, AccessTokenPayload } from '@project/contracts';
import { CommentEntity } from './entity';
import { Repository } from './service';
import { CreateCommentDto } from './dto';
import { Exception } from '../constants';
import { CommentQuery } from './validations';

@Injectable()
export class CommentService {
  constructor(private readonly repository: Repository) {}

  /**
   * Создание комментария
   * @param payload Объект DTO
   * @param user Данные access-токена
   * @returns Детали созданного комментария
   */
  async create(
    payload: CreateCommentDto,
    user: AccessTokenPayload
  ): Promise<Comment> {
    const entity = new CommentEntity({
      ...payload,
      author: user.id,
    });
    return this.repository.create(entity);
  }

  /**
   * Получение списка комментариев
   */
  async getList(taskId: number, query: CommentQuery): Promise<Comment[]> {
    return this.repository.getList(taskId, query);
  }

  /**
   * Получение детальной информации по комментарию
   * @param id Идентификатор комментария
   */
  async findById(id: number): Promise<Comment> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException(Exception.NotFoundComment);
    }
    return record;
  }

  /**
   * Удаление существующего комментария
   * @param commentId Идентификатор задачи
   * @param user Данные access-токена
   */
  async deleteItem(commentId: number, user: AccessTokenPayload): Promise<void> {
    const record = await this.findById(commentId);
    if (record.author !== user.id) {
      throw new BadRequestException(Exception.BadRequest);
    }
    await this.repository.delete(commentId);
  }

  /**
   * Удаление всех комментариев в разрезе определенной задачи
   * @param taskId Идентификатор задачи
   * @param user Данные access-токена
   */
  async deleteList(taskId: number, user: AccessTokenPayload): Promise<void> {
    await this.repository.deleteCommentsList(taskId, user.id);
  }

  /**
   * Получение общего числа комментариев в разрезе задачи
   * @returns Количество комментариев
   */
  async getQuantity(taskId: number) {
    return this.repository.getQuantity(taskId);
  }
}
