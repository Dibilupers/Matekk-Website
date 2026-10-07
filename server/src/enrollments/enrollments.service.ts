import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

interface CreateEnrollmentData {
  userId: number;
  programIds: number[];
  enrolledAt: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findEligibleUsers() {
    const users = await this.prisma.users.findMany({
      select: { id: true, username: true, email: true, role: true },
      orderBy: { username: 'asc' },
    });

    return users.filter((user) => user.role.trim().toLowerCase() !== 'admin');
  }

  async findPrograms() {
    const rootPrograms = await this.prisma.program.findMany({
      where: { parentId: null },
      include: {
        training: { select: { id: true, name: true } },
        modules: { orderBy: { name: 'asc' } },
      },
      orderBy: [{ training: { name: 'asc' } }, { name: 'asc' }],
    });

    return rootPrograms.map((program) => ({
      ...program,
      moduleCount: program.modules.length,
    }));
  }

  findAll() {
    return this.prisma.enrollment.findMany({
      include: {
        user: { select: { id: true, username: true, email: true } },
        program: {
          include: {
            training: { select: { id: true, name: true } },
            parent: {
              select: {
                id: true,
                name: true,
                training: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });
  }

  async create(data: CreateEnrollmentData) {
    const enrolledAt = new Date(data.enrolledAt);
    if (
      !Number.isInteger(data.userId)
      || data.userId < 1
      || !Array.isArray(data.programIds)
      || data.programIds.length === 0
      || data.programIds.some((programId) => !Number.isInteger(programId) || programId < 1)
      || Number.isNaN(enrolledAt.getTime())
    ) {
      throw new BadRequestException('Select a student, at least one program, and a valid enrollment date.');
    }

    const user = await this.prisma.users.findUnique({ where: { id: data.userId } });
    if (!user || user.role.trim().toLowerCase() === 'admin') {
      throw new NotFoundException('The selected student was not found.');
    }

    const programIds = [...new Set(data.programIds)];
    const programs = await this.prisma.program.findMany({ where: { id: { in: programIds } } });
    if (programs.length !== programIds.length) {
      throw new NotFoundException('One or more selected programs were not found.');
    }

    const selectedIds = new Set(programIds);
    const selectedRootIds = programs
      .filter((program) => program.parentId === null)
      .map((program) => program.id);
    const selectedModuleParentIds = programs
      .map((program) => program.parentId)
      .filter((parentId): parentId is number => parentId !== null);
    if (selectedModuleParentIds.some((parentId) => selectedIds.has(parentId))) {
      throw new BadRequestException('Enroll a student in either a whole program or its modules, not both.');
    }

    const overlappingEnrollments = await this.prisma.enrollment.findMany({
      where: {
        userId: data.userId,
        OR: [
          { programId: { in: selectedModuleParentIds } },
          ...(selectedRootIds.length
            ? [{ program: { parentId: { in: selectedRootIds } } }]
            : []),
        ],
      },
      select: { programId: true },
    });
    if (overlappingEnrollments.length > 0) {
      throw new BadRequestException('The student is already enrolled in the whole program or one of its modules.');
    }

    await this.prisma.$transaction(
      programIds.map((programId) =>
        this.prisma.enrollment.upsert({
          where: { userId_programId: { userId: data.userId, programId } },
          create: { userId: data.userId, programId, enrolledAt },
          update: { enrolledAt },
        }),
      ),
    );

    return this.prisma.enrollment.findMany({
      where: { userId: data.userId, programId: { in: programIds } },
      include: {
        user: { select: { id: true, username: true, email: true } },
        program: {
          include: {
            training: { select: { id: true, name: true } },
            parent: {
              select: {
                id: true,
                name: true,
                training: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });
  }

  async remove(userId: number, programId: number) {
    const result = await this.prisma.enrollment.deleteMany({
      where: { userId, programId },
    });

    if (result.count === 0) {
      throw new NotFoundException('The enrollment was not found.');
    }

    return { success: true };
  }
}
