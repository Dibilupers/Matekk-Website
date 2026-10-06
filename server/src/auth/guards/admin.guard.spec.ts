import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../../users/users.service.js';
import { AdminGuard } from './admin.guard.js';

describe('AdminGuard', () => {
  const findOne = vi.fn();
  const guard = new AdminGuard({ findOne } as unknown as UsersService);
  const context = {
    switchToHttp: () => ({
      getRequest: () => ({ user: { username: 'current-user' } }),
    }),
  } as ExecutionContext;

  beforeEach(() => {
    findOne.mockReset();
  });

  it('allows an account with the current admin role', async () => {
    findOne.mockResolvedValue({ role: ' Admin ' });

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(findOne).toHaveBeenCalledWith('current-user');
  });

  it('denies an account without the admin role', async () => {
    findOne.mockResolvedValue({ role: 'student' });

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(ForbiddenException);
  });
});
