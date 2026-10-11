import { afterEach, describe, expect, it, vi } from 'vitest';
import { accessTokenCookieOptions } from './auth-cookie.js';

describe('accessTokenCookieOptions', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('uses a secure cross-site cookie in production for separate frontend and API origins', () => {
    vi.stubEnv('NODE_ENV', 'production');

    expect(accessTokenCookieOptions()).toMatchObject({
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
  });

  it('keeps strict cookies for local development', () => {
    vi.stubEnv('NODE_ENV', 'development');

    expect(accessTokenCookieOptions()).toMatchObject({
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
    });
  });
});
