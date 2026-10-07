import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { AdminGuard } from '../auth/guards/admin.guard.js';
import { EmailModule } from '../email/email.module.js';

@Module({
    imports: [EmailModule],
    controllers: [UsersController],
    providers: [UsersService, AdminGuard],
    exports: [UsersService, AdminGuard],
})
export class UsersModule {}
