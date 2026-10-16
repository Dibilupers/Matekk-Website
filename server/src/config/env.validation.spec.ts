import { describe, expect, it } from 'vitest';
import { envValidationSchema } from './env.validation.js';

describe('production environment validation', () => {
  it('requires a frontend origin allowlist for credentialed cross-origin API requests', () => {
    const { error } = envValidationSchema.validate({
      NODE_ENV: 'production',
      JWT_SECRET: 'a'.repeat(32),
    });

    expect(error?.details[0]?.path).toEqual(['CORS_ORIGINS']);
  });

  it('accepts a configured frontend origin allowlist', () => {
    const { error, value } = envValidationSchema.validate({
      NODE_ENV: 'production',
      JWT_SECRET: 'a'.repeat(32),
      CORS_ORIGINS: 'https://academy.example.com,https://www.example.com',
    });

    expect(error).toBeUndefined();
    expect(value.CORS_ORIGINS).toBe('https://academy.example.com,https://www.example.com');
  });

  it('rejects non-origin values that would never match a browser Origin header', () => {
    const { error } = envValidationSchema.validate({
      NODE_ENV: 'production',
      JWT_SECRET: 'a'.repeat(32),
      CORS_ORIGINS: 'https://academy.example.com/account',
    });

    expect(error?.details[0]?.path).toEqual(['CORS_ORIGINS']);
  });
});
