import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Role } from '../auth/enum/role.enum.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Delete()
    @Roles(Role.Admin)
    remove(@Param('id') id: string) { }
}