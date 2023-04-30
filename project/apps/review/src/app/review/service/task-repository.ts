import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Http, ConfigNamespace } from '@project/services';

@Injectable()
export class TaskRepository {
  constructor(
    private readonly http: Http,
    private readonly configService: ConfigService
  ) {}

  /**
   * Получение списка задач в разрезе пользователя
   * @param taskId Идентификатор задачи
   * @param token Токен авторизации
   */
  async findById(taskId: number, token: string) {
    const { urlServiceTask } = this.configService.get(ConfigNamespace.Common);
    const { data } = await this.http.get(`${urlServiceTask}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}
