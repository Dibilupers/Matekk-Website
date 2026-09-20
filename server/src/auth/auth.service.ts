
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.username, sub: user.userId };

        return { access_token: await this.jwtService.signAsync(payload), };
    }

    async getProfile(username: string) {
        const user = await this.usersService.findOne(username);
        if (!user) {
            throw new UnauthorizedException();
        }

        const { password, ...profile } = user;
        return profile;
    }
}
