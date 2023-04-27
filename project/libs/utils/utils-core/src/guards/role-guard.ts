import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { MetadataKey } from '@project/utils/utils-core';
import { AccessTokenPayload } from '@project/contracts';

/**
 * Проверяет доступность тех или иных эндпоинтов в разрезе
 * доступных ролей.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context
      .switchToHttp()
      .getRequest()
      .headers.authorization?.split(' ')[1];
    const rolesList = this.reflector.get<string[]>(
      MetadataKey.Roles,
      context.getHandler()
    );
    const payload = this.jwtService.decode(token) as AccessTokenPayload;

    if (!rolesList.includes(payload.role)) {
      throw new BadRequestException('Not available for this role');
    }

    return true;
  }
}
