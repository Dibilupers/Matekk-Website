import { PrismaService } from '../prisma/prisma.service.js';
import { GradebookService } from './gradebook.service.js';
import { vi } from 'vitest';

describe('GradebookService', () => {
  it('merges assessment updates without replacing previously saved results', async () => {
    let savedData: Record<string, unknown> | null = null;
    const findUnique = vi.fn(async () => savedData ? { data: savedData } : null);
    const upsert = vi.fn(async ({ update }: {
      update: { data: Record<string, unknown> };
    }) => {
      savedData = update.data;
      return { data: savedData, updatedAt: new Date() };
    });
    const prisma = {
      userGradebook: { findUnique, upsert },
    } as unknown as PrismaService;
    const service = new GradebookService(prisma);

    await service.save(12, 'ccna', {
      assessments: {
        'quiz:1.0:1': { id: 'quiz:1.0:1', score: 8 },
      },
    });
    await service.save(12, 'ccna', {
      assessments: {
        'exam:attempt-1': { id: 'exam:attempt-1', score: 40 },
      },
    });

    expect(savedData).toEqual({
      assessments: {
        'quiz:1.0:1': { id: 'quiz:1.0:1', score: 8 },
        'exam:attempt-1': { id: 'exam:attempt-1', score: 40 },
      },
    });
    expect(findUnique).toHaveBeenCalledTimes(2);
    expect(upsert).toHaveBeenCalledTimes(2);
  });
});
