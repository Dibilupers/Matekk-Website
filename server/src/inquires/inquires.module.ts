import { Module } from '@nestjs/common';
import { InquiresController } from './inquires.controller.js';
import { InquiresService } from './inquires.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [UsersModule],
  controllers: [InquiresController],
  providers: [InquiresService]
})
export class InquiresModule { }
