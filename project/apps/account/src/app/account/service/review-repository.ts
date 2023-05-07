import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AvailableRole } from '@project/contracts';
import { ConfigAccountNamespace } from '@project/services';
import { Api } from './api';

@Injectable()
export class ReviewRepository {
  constructor(
    private readonly api: Api,
    private readonly configService: ConfigService
  ) {}

  /**
   * Получение списка отзывов в разрезе роли
   * @param id Идентификатор роли
   * @param role Роль пользователя
   * @returns Список отзывов
   */
  async getList(id: string, role: AvailableRole) {
    const { urlServiceReview } = this.configService.get(
      ConfigAccountNamespace.Common
    );
    try {
      const { data } = await this.api.review.getList(
        `${urlServiceReview}/${id}`,
        role
      );
      return data;
    } catch {
      return [];
    }
  }

  /**
   * Получение списка рейтинга исполнителей
   * @param token Токен авторизации
   */
  async getRatingList(token: string) {
    const { urlServiceReview } = this.configService.get(
      ConfigAccountNamespace.Common
    );
    try {
      this.api.configure({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await this.api.review.getRatingList(
        `${urlServiceReview}/rating`
      );
      return data;
    } catch {
      return [];
    }
  }
}
