import { Body, Controller, Post, HttpCode, HttpStatus, Request, Get, Patch, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from './decorators/public.decorator.js';
import type { Request as ExpressRequest } from 'express';
import { RegisterDto } from './dto/register.dto.js';
import { UpdateProfileDto } from './dto/profile.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { ProfilePhotoDto } from './dto/profile-photo.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Get('programs')
    findRegistrationPrograms() {
        return this.authService.findRegistrationPrograms();
    }

    @Public()
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Get('profile')
    getProfile(@Request() req: ExpressRequest & { user: unknown }) {
        const { userId } = req.user as { userId: number };
        return this.authService.getProfileById(userId);
    }

    @Patch('profile')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    updateProfile(
        @Request() req: ExpressRequest & { user: unknown },
        @Body() profileDto: UpdateProfileDto,
    ) {
        const { userId } = req.user as { userId: number };
        return this.authService.updateProfile(userId, profileDto);
    }

    @Get('profile/photo')
    getProfilePhoto(@Request() req: ExpressRequest & { user: unknown }) {
        const { userId } = req.user as { userId: number };
        return this.authService.getProfilePhoto(userId);
    }

    @Post('profile/photo')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    updateProfilePhoto(
        @Request() req: ExpressRequest & { user: unknown },
        @Body() photoDto: ProfilePhotoDto,
    ) {
        const { userId } = req.user as { userId: number };
        return this.authService.updateProfilePhoto(userId, photoDto);
    }

    @Delete('profile/photo')
    removeProfilePhoto(@Request() req: ExpressRequest & { user: unknown }) {
        const { userId } = req.user as { userId: number };
        return this.authService.removeProfilePhoto(userId);
    }

    @Patch('password')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    changePassword(
        @Request() req: ExpressRequest & { user: unknown },
        @Body() passwordDto: ChangePasswordDto,
    ) {
        const { userId } = req.user as { userId: number };
        return this.authService.changePassword(userId, passwordDto);
    }

    @Get('learning-history')
    getLearningHistory(@Request() req: ExpressRequest & { user: unknown }) {
        const { userId } = req.user as { userId: number };
        return this.authService.getLearningHistory(userId);
    }
}
