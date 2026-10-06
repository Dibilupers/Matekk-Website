import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from '../enum/role.enum.js';
import { UsersService } from '../../users/users.service.js';

interface AuthenticatedRequest {
  user: { username: string };
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    // Resolve the current role from the database so revoked access takes effect immediately.
    const user = await this.usersService.findOne(request.user.username);

    if (user?.role.trim().toLowerCase() !== Role.Admin) {
      throw new ForbiddenException('Admin access required.');
    }

    return true;
  }
}
