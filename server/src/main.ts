import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  const allowedOrigins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const isDevelopment = process.env.NODE_ENV !== 'production';

  app.enableCors({
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
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
await bootstrap();
