import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from '../src/app.module.js';

const server = express();
let ready: Promise<void> | null = null;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.enableCors({
        origin: process.env.FRONTEND_URL, // your Vercel frontend URL
        credentials: true,
    });
    await app.init();
}

export default async function handler(req: any, res: any) {
    ready ??= bootstrap();
    await ready;
    server(req, res);
}