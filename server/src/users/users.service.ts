import { Injectable } from '@nestjs/common';

export type User = {
    userId: number;
    username: string;
    password: string;
    role: string;
    module_enrolled?: string;
};

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            userId: 1,
            username: 'test',
            password: 'testpass',
            role: 'student',
            module_enrolled: 'CCNA',
        },
        {
            userId: 2,
            username: 'brian',
            password: 'sabrido',
            role: 'student',
        },
        {
            userId: 3,
            username: 'rene',
            password: 'renebaterbonia',
            role: 'admin',
        },
    ];

    async findAll(): Promise<Omit<User, 'password'>[]> {
        return this.users.map(({ password, ...user }) => user);
    }

    async findOne(username: string): Promise<User | undefined> {
        const normalizedUsername = this.normalizeUsername(username);

        return this.users.find((user) => this.normalizeUsername(user.username) === normalizedUsername);
    }

    private normalizeUsername(username: string): string {
        return username.trim().toLowerCase();
    }
}
