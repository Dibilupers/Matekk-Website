export const ACCESS_TOKEN_COOKIE = 'matekk_access_token';

// The website reaches the backend through its own address (/api, forwarded by Vercel),
// so the login cookie is first-party and can stay SameSite=Strict.
export function accessTokenCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
  };
}
