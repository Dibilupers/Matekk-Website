import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export type User = {
    userId: number;
    username: string;
    password: string;
    role: string;
    active_status: boolean;
    pending_status?: string;
    email?: string;
    module_enrolled?: string;
    course_enrolled?: string[];
    first_name?: string;
    last_name?: string;
    birth_date?: Date;
    gender?: string | null;
    city_province?: string;
    phone_number?: string | null;
    profile_photo?: string | null;
};

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Omit<User, 'password'>[]> {
        const databaseUsers = await this.prisma.users.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                active_status: true,
                programs_enrolled: true,
            },
        });

        return databaseUsers.map((user) => ({
            userId: user.id,
            username: user.username,
            email: user.email ?? undefined,
            role: user.role,
            active_status: user.active_status,
            pending_status: user.active_status ? 'Active' : 'Pending',
            module_enrolled: user.programs_enrolled ?? undefined,
        }));
    }

    async approve(userId: number): Promise<{ userId: number; active_status: true }> {
        // The profile endpoint reads this persisted flag to release the user from the pending screen.
        const result = await this.prisma.users.updateMany({
            where: { id: userId },
            data: { active_status: true },
        });
        if (result.count === 0) {
            throw new NotFoundException('User not found.');
        }

        return { userId, active_status: true };
    }

    async findOne(username: string): Promise<User | undefined> {
        const databaseUser = await this.prisma.users.findFirst({
            where: { username: { equals: username.trim(), mode: 'insensitive' } },
        });

        if (!databaseUser) {
            return undefined;
        }

        return {
            userId: databaseUser.id,
            username: databaseUser.username,
            password: databaseUser.password,
            role: databaseUser.role,
            active_status: databaseUser.active_status,
            pending_status: databaseUser.active_status ? 'Active' : 'Pending',
            email: databaseUser.email ?? undefined,
            module_enrolled: databaseUser.programs_enrolled ?? undefined,
            first_name: databaseUser.first_name,
            last_name: databaseUser.last_name,
            birth_date: databaseUser.birth_date,
            gender: databaseUser.gender,
            city_province: databaseUser.city_province,
            phone_number: databaseUser.phone_number,
        };
    }

    async findById(userId: number): Promise<User | undefined> {
        const user = await this.prisma.users.findUnique({ where: { id: userId } });
        if (!user) return undefined;

        return {
            userId: user.id,
            username: user.username,
            password: user.password,
            role: user.role,
            active_status: user.active_status,
            pending_status: user.active_status ? 'Active' : 'Pending',
            email: user.email ?? undefined,
            module_enrolled: user.programs_enrolled ?? undefined,
            first_name: user.first_name,
            last_name: user.last_name,
            birth_date: user.birth_date,
            gender: user.gender,
            city_province: user.city_province,
            phone_number: user.phone_number,
            profile_photo: user.profile_photo,
        };
    }
}
