import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * Guard
 * Работа с jwt-токенами.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
