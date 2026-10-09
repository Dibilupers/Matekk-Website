import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALLOW_PENDING_KEY } from '../decorators/allow-pending.decorator.js';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';

interface AuthenticatedRequest {
  user?: { active_status: boolean };
}

@Injectable()
export class ActiveAccountGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const controller = context.getClass();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      handler,
      controller,
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request.user) {
      throw new UnauthorizedException();
    }

    const allowPending = this.reflector.getAllAndOverride<boolean>(
      ALLOW_PENDING_KEY,
      [handler, controller],
    );
    if (!request.user.active_status && !allowPending) {
      throw new ForbiddenException('Account approval is required.');
    }

    return true;
  }
}
