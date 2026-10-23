import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { createRequire } from 'node:module';
import { AppModule, isObserveEnabled, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

const require = createRequire(import.meta.url);
const helmet: typeof import('helmet').default = require('helmet');

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      bodyParser: false,
      ...(isObserveEnabled ? { instrument: ObserveInstrument } : {}),
    },
  );
  app.use(json({ limit: '4mb' }));
  app.use(urlencoded({ extended: true, limit: '4mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const allowedOrigins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const isDevelopment = process.env.NODE_ENV !== 'production';

  app.enableCors({
    credentials: true,
    origin: (
      requestOrigin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) => {
      if (
        !requestOrigin ||
        allowedOrigins.includes(requestOrigin) ||
        (isDevelopment &&
          /^https?:\/\/(localhost|127\.0\.0\.1|\d{1,3}(?:\.\d{1,3}){3}):\d+$/.test(requestOrigin))
      ) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin is not allowed by CORS'), false);
    },
  });
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          scriptSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'https:'],
          fontSrc: [`'self'`, 'https:', 'data:'],
          connectSrc: [`'self'`],
          objectSrc: [`'none'`],
          frameAncestors: [`'self'`],
          upgradeInsecureRequests: [],
        },
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
await bootstrap();
