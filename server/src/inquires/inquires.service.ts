import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInquirtDto } from './dto/create-inquirt.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CaptchaService } from '../captcha/captcha.service.js';

@Injectable()
export class InquiresService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly captchaService: CaptchaService,
    ) { }

    async create(data: CreateInquirtDto) {
        const { captchaToken, ...inquiry } = data;
        const action = data.inquiry_type === 'Training Inquiry'
            ? 'training_inquiry'
            : 'solutions_inquiry';
        await this.captchaService.verify(captchaToken, action);
        return this.prisma.inquires.create({ data: inquiry });
    }

    findAll() {
        return this.prisma.inquires.findMany();
    }

    async accept(inquiryId: number): Promise<{ inquiryId: number; status: false }> {
        const inquiry = await this.prisma.inquires.findUnique({
            where: { id: inquiryId },
        });
        if (!inquiry || !inquiry.status) {
            throw new NotFoundException('Inquiry not found.');
        }

        if (inquiry.inquiry_type === 'Enrollment Request') {
            const metadata = /^Account ID: (\d+); Program ID: (\d+)$/.exec(inquiry.project_desc ?? '');
            if (!metadata) {
                throw new BadRequestException('The enrollment request is missing valid account or program details.');
            }
            const userId = Number(metadata[1]);
            const programId = Number(metadata[2]);
            const [user, program] = await Promise.all([
                this.prisma.users.findUnique({ where: { id: userId }, select: { id: true } }),
                this.prisma.program.findUnique({
                    where: { id: programId },
                    select: { id: true, parentId: true },
                }),
            ]);
            if (!user || !program) {
                throw new NotFoundException('The requested student or program no longer exists.');
            }

            const enrollments = await this.prisma.enrollment.findMany({
                where: { userId },
                include: { program: { select: { id: true, parentId: true } } },
            });
            const rootProgramId = program.parentId ?? program.id;
            const alreadyEnrolled = enrollments.some(({ program: enrolledProgram }) =>
                enrolledProgram.id === program.id
                || (program.parentId === null && enrolledProgram.parentId === program.id)
                || (program.parentId !== null && enrolledProgram.id === rootProgramId),
            );
            if (alreadyEnrolled) {
                throw new ConflictException('The student is already enrolled in this program.');
            }

            const enrollment = this.prisma.enrollment.upsert({
                where: { userId_programId: { userId, programId } },
                create: { userId, programId },
                update: {},
            });
            const resolveInquiry = this.prisma.inquires.update({
                where: { id: inquiryId },
                data: { status: false },
            });
            await this.prisma.$transaction([enrollment, resolveInquiry]);
            return { inquiryId, status: false };
        }

        const result = await this.prisma.inquires.updateMany({
            where: { id: inquiryId, status: true },
            data: { status: false },
        });
        if (result.count === 0) {
            throw new NotFoundException('Inquiry not found.');
        }

        return { inquiryId, status: false };
    }
}
