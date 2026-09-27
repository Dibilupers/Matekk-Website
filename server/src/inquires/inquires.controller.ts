import { Body, Controller, Post, HttpCode, HttpStatus, Request, UseGuards, Get } from '@nestjs/common';
import { CreateInquirtDto } from './dto/create-inquirt.dto.js';
import { InquiresService } from './inquires.service.js';

@Controller('inquires')
export class InquiresController {
    constructor(private readonly InquiresService: InquiresService,) { }

    @Post()
    createInquiry(@Body() createInquiryDto: CreateInquirtDto) {
        return this.InquiresService.create(createInquiryDto);
    }

    @Get()
    findAll() {
        return this.InquiresService.findAll();
    }
}
