import { Body, Controller, Post, Get, UseGuards, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { CreateInquirtDto } from './dto/create-inquirt.dto.js';
import { InquiresService } from './inquires.service.js';
import { AdminGuard } from '../auth/guards/admin.guard.js';

@Controller('inquires')
export class InquiresController {
    constructor(private readonly InquiresService: InquiresService,) { }

    @Post()
    createInquiry(@Body() createInquiryDto: CreateInquirtDto) {
        return this.InquiresService.create(createInquiryDto);
    }

    @Get()
    @UseGuards(AdminGuard)
    findAll() {
        return this.InquiresService.findAll();
    }

    @Patch(':id/accept')
    @UseGuards(AdminGuard)
    accept(@Param('id', ParseIntPipe) inquiryId: number) {
        return this.InquiresService.accept(inquiryId);
    }
}
