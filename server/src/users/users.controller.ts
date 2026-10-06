import { Controller, Delete, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { AdminGuard } from '../auth/guards/admin.guard.js';

@Controller('users')
@UseGuards(AdminGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Patch(':id/approve')
    approve(@Param('id', ParseIntPipe) userId: number) {
        return this.usersService.approve(userId);
    }

    @Delete()
    remove(@Param('id') id: string) { }
}