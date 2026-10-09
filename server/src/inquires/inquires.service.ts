import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInquirtDto } from './dto/create-inquirt.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class InquiresService {
    constructor(private readonly prisma: PrismaService) { }

    create(data: CreateInquirtDto) {
        return this.prisma.inquires.create({ data });
    }

    findAll() {
        return this.prisma.inquires.findMany();
    }

    async accept(inquiryId: number): Promise<{ inquiryId: number; status: false }> {
        const result = await this.prisma.inquires.updateMany({
            where: { id: inquiryId },
            data: { status: false },
        });
        if (result.count === 0) {
            throw new NotFoundException('Inquiry not found.');
        }

        return { inquiryId, status: false };
    }
}
