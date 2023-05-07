import { SetMetadata } from '@nestjs/common';
import { MetadataKey } from '../constants';

/**
 * Проверка AuthGuard висит глобально на каждом контроллере
 * Если проверка не требуется, то достаточно применить декоратор
 * NoAuth
 */
export const NoAuth = () => SetMetadata(MetadataKey.NoAuth, true);
