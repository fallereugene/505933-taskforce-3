import { plainToInstance, ClassConstructor } from 'class-transformer';

export const fillObject = <T, V>(
  someDto: ClassConstructor<T>,
  plainObject: V
) => {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
};
