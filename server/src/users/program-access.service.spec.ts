import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProgramAccessService } from './program-access.service.js';

describe('ProgramAccessService', () => {
  const findFirst = vi.fn();
  const programFindFirst = vi.fn();
  const userFindUnique = vi.fn();
  const service = new ProgramAccessService({
    enrollment: { findFirst },
    program: { findFirst: programFindFirst },
    users: { findUnique: userFindUnique },
  } as unknown as PrismaService);

  beforeEach(() => {
    findFirst.mockReset();
    programFindFirst.mockReset();
    userFindUnique.mockReset().mockResolvedValue({ role: 'Student' });
  });

  it('allows an enrolled module and a learner enrolled in its parent program', async () => {
    programFindFirst.mockResolvedValue({ id: 22, name: 'CCNA Automation', parentId: 10 });
    findFirst.mockResolvedValue({ programId: 10 });

    await expect(service.assertEnrollment(7, 'ccna-automation')).resolves.toBeUndefined();
    expect(findFirst).toHaveBeenCalledWith({
      where: { userId: 7, OR: [{ programId: 22 }, { programId: 10 }] },
      select: { programId: true },
    });
  });

  it('allows a direct enrollment in the requested program', async () => {
    programFindFirst.mockResolvedValue({ id: 10, name: 'CCNA', parentId: null });
    findFirst.mockResolvedValue({ programId: 10 });

    await expect(service.assertEnrollment(7, 'ccna')).resolves.toBeUndefined();
  });

  it('allows legacy enrollment in a parent program when its module has no enrollment row', async () => {
    programFindFirst.mockResolvedValue({
      id: 22,
      name: 'CCNA Automation',
      parentId: 10,
      parent: { name: 'CCNA' },
    });
    findFirst.mockResolvedValue(null);
    userFindUnique.mockResolvedValue({
      role: 'Student',
      programs_enrolled: 'CompTIA, CCNA',
    });

    await expect(service.assertEnrollment(7, 'ccna-automation')).resolves.toBeUndefined();
  });

  it('allows admins to access a program gradebook without learner enrollment', async () => {
    programFindFirst.mockResolvedValue({ id: 10, name: 'CCNA', parentId: null });
    userFindUnique.mockResolvedValue({ role: ' Admin ' });

    await expect(service.assertEnrollment(7, 'ccna')).resolves.toBeUndefined();
    expect(findFirst).not.toHaveBeenCalled();
  });

  it('rejects users without enrollment in the requested program', async () => {
    programFindFirst.mockResolvedValue({ id: 22, name: 'CCNA Automation', parentId: 10 });
    findFirst.mockResolvedValue(null);

    await expect(service.assertEnrollment(7, 'ccna-automation'))
      .rejects.toBeInstanceOf(ForbiddenException);
  });

  it('rejects keys that do not resolve to a program', async () => {
    programFindFirst.mockResolvedValue(null);

    await expect(service.assertEnrollment(7, 'ccna-automation'))
      .rejects.toBeInstanceOf(NotFoundException);
    expect(findFirst).not.toHaveBeenCalled();
  });
});
