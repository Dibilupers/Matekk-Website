import { Controller, Get, Header, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service.js';

// Course-scoped question banks from the "Questions" table for student exams.
// No AdminGuard here: the app-wide guards already require a signed-in, approved account.
@Controller('questions/bank')
export class QuestionBankController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @Header('Cache-Control', 'private, max-age=300')
  findBank(@Query('module') module?: string) {
    return this.questionsService.findBank(module ?? 'CCNA');
  }

  @Get('all-usable')
  @Header('Cache-Control', 'private, max-age=300')
  findUsableBank(@Query('module') module?: string) {
    return this.questionsService.findUsableBank(module);
  }
}
