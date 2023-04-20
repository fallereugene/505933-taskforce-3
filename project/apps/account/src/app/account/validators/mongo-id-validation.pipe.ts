import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Exception } from '../../constants';

/**
 * Pipe
 * Валидация идентификатора монги
 */
export class MongoIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(Exception.InvalidMongoId);
    }
    return value;
  }
}
