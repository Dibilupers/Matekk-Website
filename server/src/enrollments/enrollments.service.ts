import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

const DEFAULT_PROGRAMS = [
  { name: 'CCNA', moduleCount: 9 },
  { name: 'Network+', moduleCount: 7 },
  { name: 'Security+', moduleCount: 8 },
] as const;

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
    const programs = await this.prisma.program.findMany();

    for (const defaultProgram of DEFAULT_PROGRAMS) {
      if (!programs.some((program) => program.name === defaultProgram.name)) {
        programs.push(await this.prisma.program.create({ data: { name: defaultProgram.name } }));
      }
    }

    return programs.map((program) => ({
      ...program,
      moduleCount: DEFAULT_PROGRAMS.find((item) => item.name === program.name)?.moduleCount ?? 0,
    }));
  }

  findAll() {
    return this.prisma.enrollment.findMany({
      include: {
        user: { select: { id: true, username: true, email: true } },
        program: true,
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
        program: true,
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
