import { ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginRateLimitService } from './login-rate-limit.service.js';

describe('LoginRateLimitService', () => {
  const counts = new Map<string, number>();
  const upsert = vi.fn(async ({ where }: { where: { key: string } }) => {
    const attempts = (counts.get(where.key) ?? 0) + 1;
    counts.set(where.key, attempts);
    return { attempts };
  });
  const service = new LoginRateLimitService({
    authLoginAttempt: { upsert },
  } as unknown as PrismaService);

  beforeEach(() => {
    counts.clear();
    upsert.mockClear();
  });

  it('limits repeated attempts for a username and IP with shared database state', async () => {
    for (let attempt = 0; attempt < 10; attempt += 1) {
      await expect(service.consume('192.0.2.10', 'Student')).resolves.toBe(true);
    }

    await expect(service.consume('192.0.2.10', 'student')).resolves.toBe(false);
  });

  it('counts attempts in both a per-IP and username/IP bucket', async () => {
    await service.consume('192.0.2.10', 'one-user');
    await service.consume('192.0.2.10', 'another-user');

    expect(upsert).toHaveBeenCalledTimes(4);
    expect(new Set(counts.keys()).size).toBe(3);
  });

  it('fails closed when the rate-limit store is unavailable', async () => {
    const unavailable = new LoginRateLimitService({
      authLoginAttempt: {
        upsert: vi.fn().mockRejectedValue(new Error('database unavailable')),
      },
    } as unknown as PrismaService);

    await expect(unavailable.consume('192.0.2.10', 'student'))
      .rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});
