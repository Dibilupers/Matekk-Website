import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service.js';
import { ExtractJwt } from 'passport-jwt';
import { JwtStrategy, extractAccessTokenFromCookie } from './jwt.strategy.js';

describe('JwtStrategy', () => {
  const activeUser = {
    userId: 12,
    username: 'student',
    active_status: true,
  };
  const findAuthUserById = vi.fn();

  function createStrategy() {
    return new JwtStrategy(
      { getOrThrow: () => 'test-secret-with-at-least-32-characters' } as unknown as ConfigService,
      { findAuthUserById } as unknown as UsersService,
    );
  }

  beforeEach(() => {
    findAuthUserById.mockReset();
  });

  it('extracts a JWT from the session cookie when present', () => {
    expect(
      extractAccessTokenFromCookie({ headers: { cookie: 'other=1; access_token=abc.def.ghi; theme=dark' } } as never),
    ).toBe('abc.def.ghi');
  });

  it('falls back to bearer tokens when the session cookie is absent', () => {
    const extractor = ExtractJwt.fromAuthHeaderAsBearerToken();

    expect(
      extractor({ headers: { authorization: 'Bearer abc.def.ghi' } } as never),
    ).toBe('abc.def.ghi');
  });

  it('resolves the current account and returns its current approval status', async () => {
    findAuthUserById.mockResolvedValue({ ...activeUser, active_status: false });
    const strategy = createStrategy();

    await expect(strategy.validate({ sub: 12, username: 'student' })).resolves.toEqual({
      ...activeUser,
      active_status: false,
    });
    expect(findAuthUserById).toHaveBeenCalledWith(12);
  });

  it('rejects tokens whose subject no longer identifies the same user', async () => {
    findAuthUserById.mockResolvedValue({ ...activeUser, username: 'renamed-user' });
    const strategy = createStrategy();

    await expect(strategy.validate({ sub: 12, username: 'student' }))
      .rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rejects tokens for deleted accounts', async () => {
    findAuthUserById.mockResolvedValue(undefined);
    const strategy = createStrategy();

    await expect(strategy.validate({ sub: 12, username: 'student' }))
      .rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rejects malformed token claims', async () => {
    const strategy = createStrategy();

    await expect(strategy.validate(null)).rejects.toBeInstanceOf(UnauthorizedException);
    expect(findAuthUserById).not.toHaveBeenCalled();
  });
});
