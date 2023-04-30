import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenPayload } from '@project/contracts';
import { MetadataKey } from '@project/utils/utils-core';

/**
 * Глобальный guard
 * Проверяется доступ в разрезе ролей
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles: string[] = this.reflector.get(
      MetadataKey.Roles,
      context.getHandler()
    );

    if (!roles || !roles?.length) {
      return true;
    }

    const accessTokenUser: AccessTokenPayload | null | undefined = request.user;

    if (!accessTokenUser) {
      return false;
    }

    return roles.includes(accessTokenUser.role);
  }
}
