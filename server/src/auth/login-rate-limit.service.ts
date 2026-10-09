import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { createHash } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service.js';

const WINDOW_MS = 15 * 60 * 1000;
const USER_IP_LIMIT = 10;
const IP_LIMIT = 120;
const CLEANUP_INTERVAL_MS = 30 * 60 * 1000;
const RETENTION_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class LoginRateLimitService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(LoginRateLimitService.name);
  private cleanupTimer: NodeJS.Timeout | undefined;

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit(): void {
    this.cleanupTimer = setInterval(() => {
      void this.removeExpiredAttempts();
    }, CLEANUP_INTERVAL_MS);
    this.cleanupTimer.unref();
  }

  onModuleDestroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
  }

  async consume(ipAddress: string, username: string): Promise<boolean> {
    const windowStart = new Date(Math.floor(Date.now() / WINDOW_MS) * WINDOW_MS);
    const windowId = windowStart.toISOString();
    const normalizedUsername = username.trim().toLowerCase();
    const keys = [
      { key: this.hash(`${windowId}:ip:${ipAddress}`), limit: IP_LIMIT },
      {
        key: this.hash(`${windowId}:credential:${ipAddress}:${normalizedUsername}`),
        limit: USER_IP_LIMIT,
      },
    ];

    try {
      const attempts = [];
      for (const { key } of keys) {
        attempts.push(
          await this.prisma.authLoginAttempt.upsert({
            where: { key },
            create: { key, windowStartedAt: windowStart, attempts: 1 },
            update: { attempts: { increment: 1 } },
            select: { attempts: true },
          }),
        );
      }
      return attempts.every((attempt, index) => attempt.attempts <= keys[index].limit);
    } catch (error) {
      this.logger.error(
        'Unable to enforce login rate limits.',
        error instanceof Error ? error.stack : String(error),
      );
      throw new ServiceUnavailableException('Login is temporarily unavailable.');
    }
  }

  private hash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }

  private async removeExpiredAttempts(): Promise<void> {
    try {
      await this.prisma.authLoginAttempt.deleteMany({
        where: {
          windowStartedAt: {
            lt: new Date(Date.now() - RETENTION_MS),
          },
        },
      });
    } catch (error) {
      this.logger.error(
        'Unable to remove expired login rate-limit records.',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }
}
