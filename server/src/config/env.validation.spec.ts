import { describe, expect, it } from 'vitest';
import { envValidationSchema } from './env.validation.js';

describe('production environment validation', () => {
  it('uses Google test keys by default outside production', () => {
    const { error, value } = envValidationSchema.validate({ NODE_ENV: 'development' });

    expect(error).toBeUndefined();
    expect(value.RECAPTCHA_SECRET_KEY).toBe('6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuZZevZx9c5');
  });

  it('requires a frontend origin allowlist for credentialed cross-origin API requests', () => {
    const { error } = envValidationSchema.validate({
      NODE_ENV: 'production',
      JWT_SECRET: 'a'.repeat(32),
      RECAPTCHA_SECRET_KEY: 'production-recaptcha-secret',
    });

    expect(error?.details[0]?.path).toEqual(['CORS_ORIGINS']);
  });

  it('accepts a configured frontend origin allowlist', () => {
    const { error, value } = envValidationSchema.validate({
      NODE_ENV: 'production',
      JWT_SECRET: 'a'.repeat(32),
      RECAPTCHA_SECRET_KEY: 'production-recaptcha-secret',
      CORS_ORIGINS: 'https://academy.example.com,https://www.example.com',
    });

    expect(error).toBeUndefined();
    expect(value.CORS_ORIGINS).toBe('https://academy.example.com,https://www.example.com');
  });

  it('rejects non-origin values that would never match a browser Origin header', () => {
    const { error } = envValidationSchema.validate({
      NODE_ENV: 'production',
      JWT_SECRET: 'a'.repeat(32),
      RECAPTCHA_SECRET_KEY: 'production-recaptcha-secret',
      CORS_ORIGINS: 'https://academy.example.com/account',
    });

    expect(error?.details[0]?.path).toEqual(['CORS_ORIGINS']);
  });

  it('accepts an optional shared offline module PIN containing four to six digits', () => {
    const { error } = envValidationSchema.validate({
      NODE_ENV: 'production',
      JWT_SECRET: 'a'.repeat(32),
      RECAPTCHA_SECRET_KEY: 'production-recaptcha-secret',
      CORS_ORIGINS: 'https://academy.example.com',
      OFFLINE_MODULE_PIN: '246810',
    });

    expect(error).toBeUndefined();
  });

  it('rejects an invalid shared offline module PIN', () => {
    const { error } = envValidationSchema.validate({
      NODE_ENV: 'production',
      JWT_SECRET: 'a'.repeat(32),
      RECAPTCHA_SECRET_KEY: 'production-recaptcha-secret',
      CORS_ORIGINS: 'https://academy.example.com',
      OFFLINE_MODULE_PIN: 'pin123',
    });

    expect(error?.details[0]?.path).toEqual(['OFFLINE_MODULE_PIN']);
  });

  it('allows the API to start without the production reCAPTCHA secret so other endpoints stay available', () => {
    const { error, value } = envValidationSchema.validate({
      NODE_ENV: 'production',
      JWT_SECRET: 'a'.repeat(32),
      CORS_ORIGINS: 'https://academy.example.com',
    });

    expect(error).toBeUndefined();
    expect(value.RECAPTCHA_SECRET_KEY).toBeUndefined();
  });
});
