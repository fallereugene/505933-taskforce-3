import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService, ConfigReviewNamespace } from '@project/services';

@Injectable()
export class TaskRepository {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService
  ) {}

  /**
   * Получение списка задач в разрезе пользователя
   * @param taskId Идентификатор задачи
   * @param token Токен авторизации
   */
  async findById(taskId: number) {
    const { urlServiceTask } = this.configService.get(
      ConfigReviewNamespace.Common
    );
    const { data } = await this.http.get(`${urlServiceTask}/${taskId}`);

    return data;
  }

  /**
   * Поиск задач по исполнителю
   * @param contractorId Идентификатор исполнителя
   * @param token Токен авторизации
   */
  async findByContractor(contractorId: string, token) {
    const { urlServiceTask } = this.configService.get(
      ConfigReviewNamespace.Common
    );
    const { data } = await this.http.get(
      `${urlServiceTask}/account?role=contractor&id=${contractorId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return data;
  }
}
