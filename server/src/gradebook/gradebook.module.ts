import { Module } from '@nestjs/common';
import { GradebookController } from './gradebook.controller.js';
import { GradebookService } from './gradebook.service.js';

@Module({
  controllers: [GradebookController],
  providers: [GradebookService],
})
export class GradebookModule {}
