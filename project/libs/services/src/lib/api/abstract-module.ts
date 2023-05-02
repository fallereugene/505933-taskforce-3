import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from '../http';
import { ApiConfig, RequestResult } from './contracts';

@Injectable()
export abstract class BaseModule {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ApiConfig
  ) {}

  /**
   * Метод GET API клиента
   * @param url Часть адреса запроса. Базовая часть (baseUrl) url находится
   * в конфигурации в абстрактном классе API клиента (BaseApi).
   * @returns Результат вызова http сервиса.
   */
  protected async get<TReturn>(url: string): Promise<RequestResult<TReturn>> {
    const xCorrelationID = BaseModule.generateUuid();
    return BaseModule.invoke(
      this.httpService.get(
        BaseModule.sanitizeUrlString(`${this.config.baseUrl}${url}`),
        this.getConfig(xCorrelationID)
      ),
      xCorrelationID
    );
  }

  /**
   * Метод POST API клиента
   * @param url Часть адреса запроса. Базовая часть (baseUrl) url находится
   * в конфигурации в абстрактном классе API клиента (BaseApi).
   * @param data Полезная нагрузка
   * @returns Результат вызова http сервиса.
   */
  protected async post<TReturn, TData>(
    url: string,
    data: TData
  ): Promise<RequestResult<TReturn>> {
    const xCorrelationID = BaseModule.generateUuid();
    return BaseModule.invoke(
      this.httpService.post(
        BaseModule.sanitizeUrlString(`${this.config.baseUrl}${url}`),
        data,
        this.getConfig(xCorrelationID)
      ),
      xCorrelationID
    );
  }

  /**
   * Метод PUT API клиента
   * @param url Часть адреса запроса. Базовая часть (baseUrl) url находится
   * в конфигурации в абстрактном классе API клиента (BaseApi).
   * @param data Полезная нагрузка
   * @returns Результат вызова http сервиса.
   */
  protected async put<TReturn, TData>(
    url: string,
    data: TData
  ): Promise<RequestResult<TReturn>> {
    const xCorrelationID = BaseModule.generateUuid();
    return BaseModule.invoke(
      this.httpService.put(
        BaseModule.sanitizeUrlString(`${this.config.baseUrl}${url}`),
        data,
        this.getConfig(xCorrelationID)
      ),
      xCorrelationID
    );
  }

  /**
   * Метод PATCH API клиента
   * @param url Часть адреса запроса. Базовая часть (baseUrl) url находится
   * в конфигурации в абстрактном классе API клиента (BaseApi).
   * @param data Полезная нагрузка
   * @returns Результат вызова http сервиса.
   */
  protected async patch<TReturn, TData>(
    url: string,
    data: TData
  ): Promise<RequestResult<TReturn>> {
    const xCorrelationID = BaseModule.generateUuid();
    return BaseModule.invoke(
      this.httpService.patch(
        BaseModule.sanitizeUrlString(`${this.config.baseUrl}${url}`),
        data,
        this.getConfig(xCorrelationID)
      ),
      xCorrelationID
    );
  }

  /**
   * Метод DELETE API клиента
   * @param url Часть адреса запроса. Базовая часть (baseUrl) url находится
   * в конфигурации в абстрактном классе API клиента (BaseApi).
   * @returns Результат вызова http сервиса.
   */
  protected async delete<TReturn>(
    url: string
  ): Promise<RequestResult<TReturn>> {
    const xCorrelationID = BaseModule.generateUuid();
    return BaseModule.invoke(
      this.httpService.patch(
        BaseModule.sanitizeUrlString(`${this.config.baseUrl}${url}`),
        this.getConfig(xCorrelationID)
      ),
      xCorrelationID
    );
  }

  /**
   * Получение конфигурации пере отправкой запроса
   * @param xCorrelationID GUID
   */
  protected getConfig(xCorrelationID: string) {
    return {
      headers: {
        ...this.config.headers,
        'X-Correlation-ID': xCorrelationID,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        CustomHeader: 123,
      },
    };
  }

  /**
   * Основной метод, обрабатывающий результат вызова
   * @param pendingMethod Http метод
   * @param xCorrelationID GUID, отправленный в качестве заголовка
   */
  private static async invoke(
    pendingMethod: Promise<RequestResult>,
    xCorrelationID: string
  ) {
    const requestResult = await pendingMethod;
    const { status, headers, error, data } = requestResult;

    if (error) {
      return {
        status,
        xCorrelationID,
        headers,
        data: null,
        error,
      };
    }
    return { status, xCorrelationID, headers, data, error };
  }

  /**
   * Санитизация url-строки
   * Удаление лишних слэшей
   * @param string Переданная строка
   */
  private static sanitizeUrlString(string: string): string {
    return string.replace(/([^:])(\/\/+)/g, '$1/');
  }

  /**
   * Генерация UUID v4
   */
  private static generateUuid() {
    return uuidv4();
  }
}
