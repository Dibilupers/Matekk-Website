import { Body, Controller, Post, HttpCode, HttpStatus, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';
import { Public } from './decorators/public.decorator.js';
import type { Request as ExpressRequest } from 'express';
import { Public } from './decorators/public.decorator.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Get('profile')
    getProfile(@Request() req: ExpressRequest & { user: unknown }) {
        const { username } = req.user as { username: string };
        return this.authService.getProfile(username);
    }
}
