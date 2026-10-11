import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller.js';
import { QuestionBankController } from './question-bank.controller.js';
import { QuestionsService } from './questions.service.js';
import { UsersModule } from '../users/users.module.js';
import { StorageModule } from '../storage/storage.module.js';

@Module({
  imports: [UsersModule, StorageModule],
  controllers: [QuestionBankController, QuestionsController],
  providers: [QuestionsService]
})
export class QuestionsModule {}
