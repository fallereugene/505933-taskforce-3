import { SetMetadata } from '@nestjs/common';
import { MetadataKey } from '../constants';
import { AvailableRole } from '@project/contracts';

/**
 * Декоратор
 * Используется для разграничения доступа по доступным ролям
 * @param roles переданный список ролей, для которых доступен
 * тот или иной эндпоинт
 */
export const Roles = (...roles: AvailableRole[]) =>
  SetMetadata(MetadataKey.Roles, roles);
