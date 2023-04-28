import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from '@project/contracts';
import { Http, ConfigNamespace } from '@project/services';
import { MetadataKey } from '@project/utils/utils-core';

/**
 * Глобальный guard
 * Проверяется доступ в разрезе ролей
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly http: Http,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get(
      MetadataKey.Roles,
      context.getHandler()
    );

    if (!roles || !roles?.length) {
      return true;
    }

    const token = context
      .switchToHttp()
      .getRequest()
      .headers.authorization?.split(' ')[1];

    const { urlServiceAccount } = this.configService.get(
      ConfigNamespace.Common
    );

    const response = await this.http.get<AccessTokenPayload>(
      urlServiceAccount,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return roles.includes(response.data.role);
  }
}
