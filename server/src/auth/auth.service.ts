
import { BadRequestException, ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt'
import { PasswordService } from './password.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { EmailService } from '../email/email.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly passwords: PasswordService,
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService,
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
        const normalizedUsername = dto.username.trim();
        const normalizedEmail = dto.email.trim().toLowerCase();
        const normalizedFirstName = dto.firstName.trim();
        const normalizedLastName = dto.lastName.trim();

        if (!normalizedUsername || !normalizedEmail || !normalizedFirstName || !normalizedLastName) {
            throw new BadRequestException('Please complete all required registration fields.');
        }

        const exists = await this.prisma.users.findFirst({
            where: { OR: [{ username: { equals: normalizedUsername, mode: 'insensitive' } }, { email: { equals: normalizedEmail, mode: 'insensitive' } }] }
        });
        if (exists) throw new ConflictException('Username or email already in use');

        const password = await this.passwords.hash(dto.password);

        try {
            await this.prisma.users.create({
                data: {
                    username: normalizedUsername,
                    email: normalizedEmail,
                    password,
                    role: 'Student',
                    programs_enrolled: '',
                    first_name: normalizedFirstName,
                    last_name: normalizedLastName,
                    birth_date: dto.birthdate ? new Date(dto.birthdate) : new Date(),
                    gender: dto.gender ?? null,
                    city_province: dto.city ?? '',
                    active_status: false,
                    pending_status: 'Pending',
                    enrollments: { create: { programId: dto.programId } },
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException('Username or email already in use');
            }
            throw error;
        }

        const applicant = {
            name: `${normalizedFirstName} ${normalizedLastName}`,
            email: normalizedEmail,
        };
        const notifications = await Promise.allSettled([
            this.emailService.sendUserStatusEmail(applicant, 'pending'),
            this.emailService.sendAdminNotification(applicant),
        ]);
        notifications.forEach((result, index) => {
            if (result.status === 'rejected') {
                const notification = index === 0 ? 'applicant pending-status email' : 'admin registration notification';
                this.logger.error(`Unable to send ${notification}.`, String(result.reason));
            }
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
