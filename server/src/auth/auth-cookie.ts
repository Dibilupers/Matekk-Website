export const ACCESS_TOKEN_COOKIE = 'access_token';

export function accessTokenCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' as const : 'strict' as const,
    path: '/',
  };
}