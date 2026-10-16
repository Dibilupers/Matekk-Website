import { UnauthorizedException } from '@nestjs/common';
import { vi } from 'vitest';
import { AuthService } from './auth.service.js';
import { PasswordService } from './password.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService, type User } from '../users/users.service.js';
import { EmailService } from '../email/email.service.js';

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
    matchingEmail?: boolean;
  } = {}) {
    const findOne = vi.fn(async () => options.foundUser ?? user);
    const findById = vi.fn(async () => options.foundUser ?? user);
    const signAsync = vi.fn(async () => 'access-token');
    const hash = vi.fn(async () => options.hash ?? '$argon2id$hashed-password');
    const verify = vi.fn(async () => options.verify ?? true);
    const needsRehash = vi.fn(() => options.needsRehash ?? false);
    const findFirst = vi.fn(async () => options.matchingEmail ? { id: 99 } : null);
    const findUnique = vi.fn(async () => ({
      ...(options.foundUser ?? user),
      first_name: '',
      last_name: '',
    }));
    const findMany = vi.fn(async () => []);
    const create = vi.fn(async () => user);
    const update = vi.fn(async () => user);
    const findPrograms = vi.fn(async () => []);
    const findProgram = vi.fn(async () => ({
      id: 4,
      name: 'CCNA',
      parentId: null,
      training: { name: 'Cisco' },
      parent: null,
    }));
    const findExistingRequest = vi.fn(async () => null);
    const createInquiry = vi.fn(async () => ({ id: 21 }));
    const sendUserStatusEmail = vi.fn(async () => undefined);
    const sendAdminNotification = vi.fn(async () => undefined);
    const service = new AuthService(
      { findOne, findById } as unknown as UsersService,
      { signAsync } as unknown as import('@nestjs/jwt').JwtService,
      { hash, verify, needsRehash } as unknown as PasswordService,
      {
        users: { findFirst, findUnique, create, update },
        program: { findMany: findPrograms, findUnique: findProgram },
        enrollment: { findMany },
        inquires: { findFirst: findExistingRequest, create: createInquiry },
      } as unknown as PrismaService,
      { sendUserStatusEmail, sendAdminNotification } as unknown as EmailService,
    );

    return {
      service, findOne, findById, signAsync, hash, verify, needsRehash, findFirst, findUnique, findMany, create, update,
      findProgram, findPrograms, findExistingRequest, createInquiry,
      sendUserStatusEmail, sendAdminNotification,
    };
  }

  it('submits a selected program as an enrollment request for administrator review', async () => {
    const mocks = createService();

    await expect(mocks.service.createEnrollmentRequest(12, {
      programId: 4,
      email: ' Student@Example.com ',
      phone: ' 09171234567 ',
    })).resolves.toEqual({
      message: 'Your enrollment request has been submitted for review.',
    });

    expect(mocks.findProgram).toHaveBeenCalledWith({
      where: { id: 4 },
      include: {
        training: { select: { name: true } },
        parent: { include: { training: { select: { name: true } } } },
      },
    });
    expect(mocks.createInquiry).toHaveBeenCalledWith({
      data: {
        inquiry_type: 'Enrollment Request',
        name: 'student',
        email: 'student@example.com',
        phone: '09171234567',
        subject: 'Enrollment request: CCNA',
        message: 'Enrollment request for CCNA. Please review and approve before granting program access.',
        course: 'Cisco - CCNA',
        project_desc: 'Account ID: 12; Program ID: 4',
      },
    });
  });

  it('stores a hashed password and selected full-program enrollment at registration', async () => {
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
        active_status: false,
        pending_status: 'Pending',
        enrollments: { create: { programId: 4 } },
      },
    });
    expect(mocks.create.mock.calls[0][0].data.enrollments).toEqual({
      create: { programId: 4 },
    });
    expect(mocks.sendUserStatusEmail).toHaveBeenCalledWith(
      { name: 'Sample Student', email: 'student@example.com' },
      'pending',
    );
    expect(mocks.sendAdminNotification).toHaveBeenCalledWith({
      name: 'Sample Student',
      email: 'student@example.com',
    });
  });

  it('stores the selected module id rather than its parent when registering for one module', async () => {
    const mocks = createService();

    await mocks.service.register({
      username: 'module-student',
      email: 'module@example.com',
      password: 'plain-password',
      programId: 9,
      firstName: 'Module',
      lastName: 'Student',
    });

    expect(mocks.create.mock.calls[0][0].data.enrollments).toEqual({
      create: { programId: 9 },
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

  it('updates only editable profile fields and rejects duplicate email addresses', async () => {
    const mocks = createService();
    await mocks.service.updateProfile(12, {
      first_name: '  Updated  ',
      email: 'student@example.com',
    });
    expect(mocks.update).toHaveBeenCalledWith({
      where: { id: 12 },
      data: { first_name: 'Updated', email: 'student@example.com' },
    });

    const duplicateEmailMocks = createService({ matchingEmail: true });
    await expect(duplicateEmailMocks.service.updateProfile(12, {
      email: 'taken@example.com',
    })).rejects.toThrow('Email address is already in use.');
    expect(duplicateEmailMocks.update).not.toHaveBeenCalled();
  });

  it('allows a user to change username and rejects case-insensitive duplicates', async () => {
    const mocks = createService();
    await mocks.service.updateProfile(12, { username: '  new.name  ' });
    expect(mocks.findFirst).toHaveBeenCalledWith({
      where: {
        username: { equals: 'new.name', mode: 'insensitive' },
        NOT: { id: 12 },
      },
      select: { id: true },
    });
    expect(mocks.update).toHaveBeenCalledWith({
      where: { id: 12 },
      data: { username: 'new.name' },
    });

    const duplicateUsernameMocks = createService({ matchingEmail: true });
    await expect(duplicateUsernameMocks.service.updateProfile(12, {
      username: 'existing',
    })).rejects.toThrow('Username is already in use.');
    expect(duplicateUsernameMocks.update).not.toHaveBeenCalled();
  });

  it('loads profile by stable user ID rather than the mutable username', async () => {
    const mocks = createService();
    await mocks.service.getProfileById(12);
    expect(mocks.findById).toHaveBeenCalledWith(12);
  });

  it('persists supported profile photos and rejects invalid image contents', async () => {
    const mocks = createService();
    const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).toString('base64');
    const photoDataUrl = `data:image/png;base64,${pngHeader}`;

    await expect(mocks.service.updateProfilePhoto(12, { photoDataUrl }))
      .resolves.toEqual({ message: 'Profile photo updated successfully.' });
    expect(mocks.update).toHaveBeenCalledWith({
      where: { id: 12 },
      data: { profile_photo: photoDataUrl },
      select: { id: true },
    });

    await expect(mocks.service.updateProfilePhoto(12, {
      photoDataUrl: 'data:image/png;base64,ZmFrZQ==',
    })).rejects.toThrow('Profile photo must be a valid JPG or PNG no larger than 2 MB.');
  });

  it('removes the saved profile photo', async () => {
    const mocks = createService();
    await mocks.service.removeProfilePhoto(12);
    expect(mocks.update).toHaveBeenCalledWith({
      where: { id: 12 },
      data: { profile_photo: null },
      select: { id: true },
    });
  });

  it('changes a password only after verifying the current password', async () => {
    const hashedUser = { ...user, password: '$argon2id$stored-hash' };
    const mocks = createService({ foundUser: hashedUser, hash: '$argon2id$new-hash' });
    await mocks.service.changePassword(12, {
      currentPassword: 'current-password',
      newPassword: 'new-password-value',
    });

    expect(mocks.verify).toHaveBeenCalledWith(hashedUser.password, 'current-password');
    expect(mocks.update).toHaveBeenCalledWith({
      where: { id: 12 },
      data: { password: '$argon2id$new-hash' },
    });

    const invalidPasswordMocks = createService({ foundUser: hashedUser, verify: false });
    await expect(invalidPasswordMocks.service.changePassword(12, {
      currentPassword: 'incorrect',
      newPassword: 'new-password-value',
    })).rejects.toBeInstanceOf(UnauthorizedException);
    expect(invalidPasswordMocks.update).not.toHaveBeenCalled();
  });

  it('scopes learning history to the authenticated user', async () => {
    const mocks = createService();
    await mocks.service.getLearningHistory(12);
    expect(mocks.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId: 12 },
    }));
  });
});
