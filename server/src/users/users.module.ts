import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { AdminGuard } from '../auth/guards/admin.guard.js';
import { EmailModule } from '../email/email.module.js';
import { ProgramAccessService } from './program-access.service.js';

@Module({
    imports: [EmailModule],
    controllers: [UsersController],
    providers: [UsersService, AdminGuard, ProgramAccessService],
    exports: [UsersService, AdminGuard, ProgramAccessService],
})
export class UsersModule {}
