import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Http, ConfigNamespace } from '@project/services';
import { MetadataKey } from '@project/utils/utils-core';
import { EXCEPTION } from '../../constants';

/**
 * Глобальный guard
 * Применяется к каждому эндпоинту контроллера.
 * В случае, если роут является открытым, следует применять NoAuth -
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
    const request = context.switchToHttp().getRequest();
    const noAuth = this.reflector.get(MetadataKey.NoAuth, context.getHandler());

    request.user = null;

    if (noAuth) {
      return true;
    }

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException(EXCEPTION.Unauthorized);
    }

    const { urlServiceAccount } = this.configService.get(
      ConfigNamespace.Common
    );

    const { data } = await this.http.get(`${urlServiceAccount}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data === null) {
      throw new UnauthorizedException(EXCEPTION.Unauthorized);
    }

    request.user = data;

    return Boolean(data);
  }
}
