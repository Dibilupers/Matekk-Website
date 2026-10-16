import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

function toProgramSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

@Injectable()
export class ProgramAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async assertEnrollment(userId: number, programKey: string): Promise<void> {
    const requestedName = programKey.replace(/-/g, ' ');
    const program = await this.prisma.program.findFirst({
      where: { name: { equals: requestedName, mode: 'insensitive' } },
      select: {
        id: true,
        name: true,
        parentId: true,
        parent: { select: { name: true } },
      },
    });
    if (!program || toProgramSlug(program.name) !== programKey) {
      throw new NotFoundException('Program not found.');
    }

    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { role: true, programs_enrolled: true },
    });
    if (user?.role.trim().toLowerCase() === 'admin') {
      return;
    }

    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        userId,
        OR: [
          { programId: program.id },
          ...(program.parentId === null ? [] : [{ programId: program.parentId }]),
        ],
      },
      select: { programId: true },
    });

    const legacyEnrollments = (user?.programs_enrolled ?? '')
      .split(',')
      .map((name) => name.trim().toLowerCase());
    const hasLegacyEnrollment = [program.name, program.parent?.name]
      .filter((name): name is string => Boolean(name))
      .some((name) => legacyEnrollments.includes(name.trim().toLowerCase()));

    if (!enrollment && !hasLegacyEnrollment) {
      throw new ForbiddenException('Enrollment in this program is required.');
    }
  }
}
