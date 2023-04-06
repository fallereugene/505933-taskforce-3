import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/**
 * Базовый класс сервиса конфигурации.
 */
export class Configuration<T extends Record<string, string | number>> {
  constructor(private readonly configuration: T) {}

  /**
   * Валидация конфигурации в разрезе переданной модели
   * @param model Модель
   * @returns Объект конфигурации
   */
  validate(model: new (...args: any[]) => any): T {
    const environment = plainToInstance(model, this.configuration, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(environment, {
      skipMissingProperties: false,
    });

    if (errors.length) {
      const errorsMessages = [];
      errors.forEach((e) => {
        Object.values(e.constraints).forEach((message) =>
          errorsMessages.push(message)
        );
      });
      throw new Error(errorsMessages.toString());
    }

    return this.configuration;
  }
}
