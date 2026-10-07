
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt'
import { PasswordService } from './password.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly passwords: PasswordService,
        private readonly prisma: PrismaService,
    ) { }

    findRegistrationPrograms() {
        return this.prisma.program.findMany({
            where: { parentId: null },
            select: {
                id: true,
                name: true,
                training: { select: { id: true, name: true } },
                modules: { select: { id: true, name: true }, orderBy: { name: 'asc' } },
            },
            orderBy: [{ training: { name: 'asc' } }, { name: 'asc' }],
        });
    }

    async register(dto: RegisterDto) {
        const exists = await this.prisma.users.findFirst({
            where: { OR: [{ username: dto.username }, { email: dto.email }] }
        });
        if (exists) throw new ConflictException('Username or email already in use');

        const password = await this.passwords.hash(dto.password);

        await this.prisma.users.create({
            data: {
                username: dto.username,
                email: dto.email,
                password,
                role: 'Student',
                programs_enrolled: '',
                first_name: dto.firstName,
                last_name: dto.lastName,
                birth_date: dto.birthdate ? new Date(dto.birthdate) : undefined,
                gender: dto.gender,
                city_province: dto.city,
                enrollments: { create: { programId: dto.programId } },
            },
        });

        return { message: 'Registration submitted. Please wait for approval.' }
    }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username);
        if (!user) {
            throw new UnauthorizedException();
        }

        const hasArgon2Hash = /^\$argon2(?:id|i|d)\$/.test(user.password);
        const isValidPassword = hasArgon2Hash
            ? await this.passwords.verify(user.password, pass)
            : user.password === pass;
        if (!isValidPassword) {
            throw new UnauthorizedException();
        }

        if (!hasArgon2Hash || this.passwords.needsRehash(user.password)) {
            const upgradedPassword = await this.passwords.hash(pass);
            await this.prisma.users.update({
                where: { id: user.userId },
                data: { password: upgradedPassword },
            });
        }

        const payload = { username: user.username, sub: user.userId };

        return { access_token: await this.jwtService.signAsync(payload), };
    }

    async getProfile(username: string) {
        const user = await this.usersService.findOne(username);
        if (!user) {
            throw new UnauthorizedException();
        }

        const { password: _password, ...profile } = user;
        return profile;
    }
}
