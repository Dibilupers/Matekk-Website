export const ACCESS_TOKEN_COOKIE = 'access_token';

// The website reaches the backend through its own address (/api, forwarded by Vercel),
// so the login cookie is first-party and can stay SameSite=Strict.
export function accessTokenCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' as const : 'strict' as const,
    path: '/',
  };
}