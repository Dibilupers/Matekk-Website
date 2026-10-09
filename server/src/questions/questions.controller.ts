import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service.js';
import { CreateQuestionDto } from './dto/questions.dto.js';
import { AdminGuard } from '../auth/guards/admin.guard.js';

@Controller('questions')
@UseGuards(AdminGuard)
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }
}