import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service.js';
import { AdminGuard } from '../auth/guards/admin.guard.js';
import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsDateString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

class CreateEnrollmentDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  programIds: number[];

  @IsDateString()
  enrolledAt: string;
}

@Controller('enrollments')
@UseGuards(AdminGuard)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get('users')
  findEligibleUsers() {
    return this.enrollmentsService.findEligibleUsers();
  }

  @Get('programs')
  findPrograms() {
    return this.enrollmentsService.findPrograms();
  }

  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Post()
  create(@Body() data: CreateEnrollmentDto) {
    return this.enrollmentsService.create(data);
  }

  @Delete(':userId/:programId')
  remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('programId', ParseIntPipe) programId: number,
  ) {
    return this.enrollmentsService.remove(userId, programId);
  }
}
