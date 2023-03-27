import { plainToInstance, ClassConstructor } from 'class-transformer';

/**
 * Преобразование переданных ненормализованных данных в требуемый объект DTO.
 * @param dto Объект DTO
 * @param plainObject Ненормализованные данные
 */
export const fillObject = <T, V>(
  someDto: ClassConstructor<T>,
  plainObject: V
) =>
  plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
