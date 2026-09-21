import { Injectable } from '@nestjs/common';

export type User = {
    userId: number;
    username: string;
    password: string;
    role: string;
    module_enrolled?: string;
    course_enrolled?: string[];
};

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            userId: 1,
            username: 'test',
            password: 'testpass',
            role: 'student',
            module_enrolled: 'CCNA, CCNP Security, Network+',
            course_enrolled: ['Cisco'],
        },
        {
            userId: 2,
            username: 'brian',
            password: 'sabrido',
            role: 'student',
            course_enrolled: ['Cisco', 'Microsoft', 'CompTIA', 'Fortinet'],
        },
        {
            userId: 3,
            username: 'rene',
            password: 'renebaterbonia',
            role: 'admin',
        },
        {
            userId: 4,
            username: 'junard',
            password: 'bacarroo',
            role: 'student',
            course_enrolled: ['Cisco', 'Microsoft', 'CompTIA', 'Fortinet'],
        }
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
