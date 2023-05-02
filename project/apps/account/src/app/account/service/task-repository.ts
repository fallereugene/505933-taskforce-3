import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigNamespace } from '@project/services';
import { Api } from './api';

@Injectable()
export class TaskRepository {
  constructor(
    private readonly api: Api,
    private readonly configService: ConfigService
  ) {}

  /**
   * Получение списка задач в разрезе пользователя
   * @param token Токен авторизации
   */
  async getListByAccount(token: string) {
    // TODO: Передача токена автризации
    const { urlServiceTask } = this.configService.get(ConfigNamespace.Common);
    try {
      const { data } = await this.api.task.getListByAccount(
        `${urlServiceTask}/account`
      );
      return data;
    } catch {
      return [];
    }
  }
}
