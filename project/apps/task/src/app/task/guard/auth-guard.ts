import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Http } from '@project/services';
import { ConfigNamespace } from '@project/services';
import { MetadataKey } from '@project/utils/utils-core';

/**
 * Глобальный guard
 * Применяется к каждому эндпоинту контроллера.
 * В случае, если роут является открытым, следуется применять NoAuth -
 * декоратор. В таком случае проверка токена будет проигнорирована.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly http: Http,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const noAuth = this.reflector.get(MetadataKey.NoAuth, context.getHandler());

    if (noAuth) {
      return true;
    }

    const token = context
      .switchToHttp()
      .getRequest()
      .headers.authorization?.split(' ')[1];

    const { urlServiceAccount } = this.configService.get(
      ConfigNamespace.Common
    );

    const { data } = await this.http.get(urlServiceAccount, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return Boolean(data);
  }
}
