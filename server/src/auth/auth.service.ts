
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt'
import { PasswordService } from './password.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { UpdateProfileDto } from './dto/profile.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { ProfilePhotoDto } from './dto/profile-photo.dto.js';

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

    async getProfileById(userId: number) {
        const user = await this.usersService.findById(userId);
        if (!user) throw new UnauthorizedException();

        const { password: _password, ...profile } = user;
        return profile;
    }

    async getProfilePhoto(userId: number) {
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
            select: { profile_photo: true },
        });
        if (!user) throw new UnauthorizedException();
        return { photoDataUrl: user.profile_photo };
    }

    async updateProfile(userId: number, dto: UpdateProfileDto) {
        const normalize = (value: string | null | undefined) =>
            typeof value === 'string' ? value.trim() : value;
        const username = normalize(dto.username);
        const email = normalize(dto.email);
        if (username) {
            const existingUser = await this.prisma.users.findFirst({
                where: { username: { equals: username, mode: 'insensitive' }, NOT: { id: userId } },
                select: { id: true },
            });
            if (existingUser) throw new ConflictException('Username is already in use.');
        }
        if (email) {
            const existingUser = await this.prisma.users.findFirst({
                where: { email: { equals: email, mode: 'insensitive' }, NOT: { id: userId } },
                select: { id: true },
            });
            if (existingUser) throw new ConflictException('Email address is already in use.');
        }

        const data = {
            ...(dto.username !== undefined ? { username: dto.username.trim() } : {}),
            ...(dto.first_name !== undefined ? { first_name: normalize(dto.first_name) ?? '' } : {}),
            ...(dto.last_name !== undefined ? { last_name: normalize(dto.last_name) ?? '' } : {}),
            ...(dto.email !== undefined ? { email } : {}),
            ...(dto.birth_date !== undefined ? { birth_date: new Date(dto.birth_date) } : {}),
            ...(dto.gender !== undefined ? { gender: normalize(dto.gender) || null } : {}),
            ...(dto.city_province !== undefined ? { city_province: normalize(dto.city_province) ?? '' } : {}),
            ...(dto.phone_number !== undefined ? { phone_number: normalize(dto.phone_number) || null } : {}),
        };

        await this.prisma.users.update({
            where: { id: userId },
            data,
        });
        return this.getProfileById(userId);
    }

    async updateProfilePhoto(userId: number, dto: ProfilePhotoDto) {
        const commaIndex = dto.photoDataUrl.indexOf(',');
        const mediaType = dto.photoDataUrl.slice(0, commaIndex);
        const encodedImage = dto.photoDataUrl.slice(commaIndex + 1);
        const image = Buffer.from(encodedImage, 'base64');
        const isJpeg = mediaType === 'data:image/jpeg;base64'
            && image[0] === 0xff && image[1] === 0xd8 && image[2] === 0xff;
        const isPng = mediaType === 'data:image/png;base64'
            && image.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
        if (
            image.length === 0
            || image.length > 2 * 1024 * 1024
            || image.toString('base64') !== encodedImage
            || (!isJpeg && !isPng)
        ) {
            throw new BadRequestException('Profile photo must be a valid JPG or PNG no larger than 2 MB.');
        }

        try {
            await this.prisma.users.update({
                where: { id: userId },
                data: { profile_photo: dto.photoDataUrl },
                select: { id: true },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new UnauthorizedException();
            }
            throw error;
        }

        return { message: 'Profile photo updated successfully.' };
    }

    async removeProfilePhoto(userId: number) {
        try {
            await this.prisma.users.update({
                where: { id: userId },
                data: { profile_photo: null },
                select: { id: true },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new UnauthorizedException();
            }
            throw error;
        }

        return { message: 'Profile photo removed successfully.' };
    }

    async changePassword(userId: number, dto: ChangePasswordDto) {
        const user = await this.prisma.users.findUnique({ where: { id: userId } });
        if (!user) throw new UnauthorizedException();

        const hasArgon2Hash = /^\$argon2(?:id|i|d)\$/.test(user.password);
        const isValidPassword = hasArgon2Hash
            ? await this.passwords.verify(user.password, dto.currentPassword)
            : user.password === dto.currentPassword;
        if (!isValidPassword) throw new UnauthorizedException('Current password is incorrect.');

        await this.prisma.users.update({
            where: { id: userId },
            data: { password: await this.passwords.hash(dto.newPassword) },
        });

        return { message: 'Password updated successfully.' };
    }

    getLearningHistory(userId: number) {
        return this.prisma.enrollment.findMany({
            where: { userId },
            include: {
                program: {
                    include: {
                        training: { select: { name: true } },
                        parent: {
                            select: {
                                id: true,
                                name: true,
                                training: { select: { name: true } },
                            },
                        },
                    },
                },
            },
            orderBy: { enrolledAt: 'desc' },
        });
    }
}
