import { Module } from '@nestjs/common';
import { InquiresController } from './inquires.controller.js';
import { InquiresService } from './inquires.service.js';

@Module({
  controllers: [InquiresController],
  providers: [InquiresService]
})
export class InquiresModule { }
