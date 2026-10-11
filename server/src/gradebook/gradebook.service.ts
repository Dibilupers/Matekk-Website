import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProgramAccessService } from '../users/program-access.service.js';

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

@Injectable()
export class GradebookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly programAccess: ProgramAccessService,
  ) {}

  async findOne(userId: number, programKey: string) {
    await this.programAccess.assertEnrollment(userId, programKey);
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

  async save(userId: number, programKey: string, data: unknown) {
    await this.programAccess.assertEnrollment(userId, programKey);
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

    if (isJsonObject(jsonData.assessments)) {
      return this.mergeAssessments(userId, programKey, jsonData);
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

  async recordAssessment(
    userId: number,
    programKey: string,
    assessment: Record<string, unknown>,
  ) {
    await this.programAccess.assertEnrollment(userId, programKey);
    if (!isJsonObject(assessment)) {
      throw new BadRequestException('A gradebook assessment must be a JSON object.');
    }
    if (typeof assessment.id !== 'string' || !assessment.id) {
      throw new BadRequestException('A gradebook assessment must include an ID.');
    }
    if (
      !Number.isFinite(assessment.score) ||
      !Number.isFinite(assessment.maxScore) ||
      Number(assessment.maxScore) <= 0 ||
      !Number.isFinite(assessment.submittedAt)
    ) {
      throw new BadRequestException(
        'A gradebook assessment must include a valid score, maximum score, and submission time.',
      );
    }

    let jsonAssessment: Prisma.InputJsonObject;
    try {
      jsonAssessment = JSON.parse(JSON.stringify(assessment)) as Prisma.InputJsonObject;
    } catch {
      throw new BadRequestException('Gradebook assessments must contain valid JSON values.');
    }

    return this.mergeAssessments(userId, programKey, {
      assessments: { [assessment.id]: jsonAssessment },
    });
  }

  private async mergeAssessments(
    userId: number,
    programKey: string,
    data: Prisma.InputJsonObject,
  ) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        return await this.prisma.$transaction(
          async (transaction) => {
            const existing = await transaction.userGradebook.findUnique({
              where: { userId_programKey: { userId, programKey } },
              select: { data: true },
            });
            const existingData = isJsonObject(existing?.data) ? existing.data : {};
            const existingAssessments = isJsonObject(existingData.assessments)
              ? existingData.assessments
              : {};
            const jsonData: Prisma.InputJsonObject = {
              ...existingData,
              ...data,
              assessments: {
                ...existingAssessments,
                ...(data.assessments as Prisma.InputJsonObject),
              },
            };

            return transaction.userGradebook.upsert({
              where: { userId_programKey: { userId, programKey } },
              create: { userId, programKey, data: jsonData },
              update: { data: jsonData },
              select: { data: true, updatedAt: true },
            });
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
      } catch (error) {
        const isSerializationConflict = error instanceof Prisma.PrismaClientKnownRequestError
          && error.code === 'P2034';
        if (!isSerializationConflict || attempt === 2) throw error;
        await new Promise((resolve) => setTimeout(resolve, 10 * (attempt + 1)));
      }
    }

    throw new Error('Unable to save gradebook assessments after retrying concurrent updates.');
  }
}
