import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

@Injectable()
export class GradebookService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(userId: number, programKey: string) {
    return this.prisma.userGradebook.findUnique({
      where: {
        userId_programKey: {
          userId,
          programKey,
        },
      },
      select: {
        data: true,
        updatedAt: true,
      },
    });
  }

  save(userId: number, programKey: string, data: unknown) {
    if (!isJsonObject(data)) {
      throw new BadRequestException('Gradebook data must be a JSON object.');
    }

    let jsonData: Prisma.InputJsonObject;
    try {
      const serialized = JSON.stringify(data);
      jsonData = JSON.parse(serialized) as Prisma.InputJsonObject;
    } catch {
      throw new BadRequestException('Gradebook data must contain valid JSON values.');
    }

    return this.prisma.userGradebook.upsert({
      where: {
        userId_programKey: {
          userId,
          programKey,
        },
      },
      create: {
        userId,
        programKey,
        data: jsonData,
      },
      update: { data: jsonData },
      select: {
        data: true,
        updatedAt: true,
      },
    });
  }
}
