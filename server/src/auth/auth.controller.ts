import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Request,
    Get,
    Res,
    HttpException,
    Header,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from './decorators/public.decorator.js';
import { AllowPendingAccount } from './decorators/allow-pending.decorator.js';
import type { Request as ExpressRequest, Response } from 'express';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { LoginRateLimitService } from './login-rate-limit.service.js';
import { accessTokenCookieOptions, ACCESS_TOKEN_COOKIE } from './auth-cookie.js';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly loginRateLimit: LoginRateLimitService,
    ) { }

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
    async signIn(
        @Body() signInDto: LoginDto,
        @Request() request: ExpressRequest,
        @Res({ passthrough: true }) response: Response,
    ) {
        const allowed = await this.loginRateLimit.consume(
            request.ip ?? request.socket.remoteAddress ?? 'unknown',
            signInDto.username,
        );
        if (!allowed) {
            throw new HttpException(
                'Too many login attempts. Please try again later.',
                HttpStatus.TOO_MANY_REQUESTS,
            );
        }

        const { access_token: token } = await this.authService.signIn(
            signInDto.username,
            signInDto.password,
        );
        response.cookie(ACCESS_TOKEN_COOKIE, token, accessTokenCookieOptions());
        return { message: 'Signed in.' };
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie(ACCESS_TOKEN_COOKIE, accessTokenCookieOptions());
        return { message: 'Signed out.' };
    }
    @Header('Cache-Control', 'no-store')
    @Get('profile')
    @AllowPendingAccount()
    getProfile(@Request() req: ExpressRequest & { user: unknown }) {
        const { username } = req.user as { username: string };
        return this.authService.getProfile(username);
    }
}
