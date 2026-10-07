import { UnauthorizedException } from '@nestjs/common';
import { vi } from 'vitest';
import { AuthService } from './auth.service.js';
import { PasswordService } from './password.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService, type User } from '../users/users.service.js';

describe('AuthService', () => {
  const user: User = {
    userId: 12,
    username: 'student',
    password: 'plain-password',
    role: 'Student',
    active_status: false,
  };

  function createService(options: {
    foundUser?: User;
    hash?: string;
    verify?: boolean;
    needsRehash?: boolean;
  } = {}) {
    const findOne = vi.fn(async () => options.foundUser ?? user);
    const signAsync = vi.fn(async () => 'access-token');
    const hash = vi.fn(async () => options.hash ?? '$argon2id$hashed-password');
    const verify = vi.fn(async () => options.verify ?? true);
    const needsRehash = vi.fn(() => options.needsRehash ?? false);
    const findFirst = vi.fn(async () => null);
    const create = vi.fn(async () => user);
    const update = vi.fn(async () => user);
    const service = new AuthService(
      { findOne } as unknown as UsersService,
      { signAsync } as unknown as import('@nestjs/jwt').JwtService,
      { hash, verify, needsRehash } as unknown as PasswordService,
      { users: { findFirst, create, update } } as unknown as PrismaService,
    );

    return { service, findOne, signAsync, hash, verify, needsRehash, findFirst, create, update };
  }

  it('stores a hashed password and required enrollment field at registration', async () => {
    const mocks = createService({ hash: '$argon2id$registration-hash' });

    await expect(mocks.service.register({
      username: 'student',
      email: 'student@example.com',
      password: 'plain-password',
      programId: 4,
      firstName: 'Sample',
      lastName: 'Student',
      birthdate: '2000-01-02',
      gender: 'Female',
      city: 'Rizal',
    })).resolves.toEqual({ message: 'Registration submitted. Please wait for approval.' });

    expect(mocks.create).toHaveBeenCalledWith({
      data: {
        username: 'student',
        email: 'student@example.com',
        password: '$argon2id$registration-hash',
        role: 'Student',
        programs_enrolled: '',
        first_name: 'Sample',
        last_name: 'Student',
        birth_date: new Date('2000-01-02'),
        gender: 'Female',
        city_province: 'Rizal',
        enrollments: { create: { programId: 4 } },
      },
    });
  });

  it('verifies Argon2 hashes before issuing a token', async () => {
    const hashedUser = { ...user, password: '$argon2id$stored-hash' };
    const mocks = createService({ foundUser: hashedUser });

    await expect(mocks.service.signIn('student', 'plain-password'))
      .resolves.toEqual({ access_token: 'access-token' });

    expect(mocks.verify).toHaveBeenCalledWith(hashedUser.password, 'plain-password');
    expect(mocks.update).not.toHaveBeenCalled();
  });

  it('rehashes a valid legacy plaintext password after login', async () => {
    const mocks = createService({ hash: '$argon2id$migrated-hash' });

    await expect(mocks.service.signIn('student', 'plain-password'))
      .resolves.toEqual({ access_token: 'access-token' });

    expect(mocks.verify).not.toHaveBeenCalled();
    expect(mocks.update).toHaveBeenCalledWith({
      where: { id: user.userId },
      data: { password: '$argon2id$migrated-hash' },
    });
  });

  it('rejects an incorrect password without changing the saved password', async () => {
    const hashedUser = { ...user, password: '$argon2id$stored-hash' };
    const mocks = createService({ foundUser: hashedUser, verify: false });

    await expect(mocks.service.signIn('student', 'incorrect'))
      .rejects.toBeInstanceOf(UnauthorizedException);

    expect(mocks.update).not.toHaveBeenCalled();
    expect(mocks.signAsync).not.toHaveBeenCalled();
  });
});
