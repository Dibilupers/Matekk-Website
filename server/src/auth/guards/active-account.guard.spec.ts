import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALLOW_PENDING_KEY } from '../decorators/allow-pending.decorator.js';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';
import { ActiveAccountGuard } from './active-account.guard.js';

describe('ActiveAccountGuard', () => {
  let isPublic = false;
  let allowPending = false;
  const reflector = {
    getAllAndOverride: vi.fn((key: string) =>
      key === IS_PUBLIC_KEY ? isPublic : key === ALLOW_PENDING_KEY && allowPending,
    ),
  };
  const guard = new ActiveAccountGuard(reflector as unknown as Reflector);

  function createContext(user?: { active_status: boolean }) {
    return {
      getHandler: () => () => undefined,
      getClass: () => class Controller {},
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    } as unknown as ExecutionContext;
  }

  beforeEach(() => {
    isPublic = false;
    allowPending = false;
    reflector.getAllAndOverride.mockClear();
  });

  it('allows authenticated active users', () => {
    expect(guard.canActivate(createContext({ active_status: true }))).toBe(true);
  });

  it('blocks pending users from protected endpoints', () => {
    expect(() => guard.canActivate(createContext({ active_status: false })))
      .toThrow(ForbiddenException);
  });

  it('allows pending users only on explicitly permitted endpoints', () => {
    allowPending = true;

    expect(guard.canActivate(createContext({ active_status: false }))).toBe(true);
  });

  it('allows public endpoints without an authenticated user', () => {
    isPublic = true;

    expect(guard.canActivate(createContext())).toBe(true);
  });

  it('rejects protected requests without an authenticated user', () => {
    expect(() => guard.canActivate(createContext())).toThrow(UnauthorizedException);
  });
});
