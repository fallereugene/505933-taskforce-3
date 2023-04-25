import dayjs from 'dayjs';
import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Кастомный валидатор, позволяющий валидировать возраст
 * @param property Минимальное валидное значение
 * @param validationOptions Опции валидации
 */
export const MinimumValidAge = (
  property: number,
  validationOptions?: ValidationOptions
) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'MinimumValidAge',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return dayjs().diff(value, 'year') > property;
        },
      },
    });
  };
};
