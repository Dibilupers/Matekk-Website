export const ACCESS_TOKEN_COOKIE = 'matekk_access_token';

export function accessTokenCookieOptions() {
  // On Vercel the website and the backend live on different domains, so the login cookie
  // has to be sent cross-site there ('none', which browsers only allow on HTTPS).
  // CORS still limits which website may use it. Locally it stays 'strict'.
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ('none' as const) : ('strict' as const),
    path: '/',
  };
}
