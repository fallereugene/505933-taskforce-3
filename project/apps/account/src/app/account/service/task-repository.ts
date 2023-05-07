import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigAccountNamespace } from '@project/services';
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
    const { urlServiceTask } = this.configService.get(
      ConfigAccountNamespace.Common
    );
    try {
      this.api.configure({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await this.api.task.getListByAccount(
        `${urlServiceTask}/account`
      );
      return data;
    } catch {
      return [];
    }
  }
}
