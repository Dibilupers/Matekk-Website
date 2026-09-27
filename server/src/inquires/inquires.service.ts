import { Injectable } from '@nestjs/common';
import { CreateInquirtDto } from './dto/create-inquirt.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';
@Injectable()
export class InquiresService {
    constructor(private prisma: PrismaService) { }

    create(data: CreateInquirtDto) {
        return this.prisma.inquires.create({ data });
    }

    findAll() {
        return this.prisma.inquires.findMany();
    }
}
