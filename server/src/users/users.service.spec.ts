import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService } from './users.service.js';

describe('UsersService', () => {
  let service: UsersService;
  const updateMany = vi.fn();
  const findMany = vi.fn();
  const findFirst = vi.fn();

  beforeEach(async () => {
    updateMany.mockReset();
    findMany.mockReset();
    findFirst.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: { users: { updateMany, findMany, findFirst } },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns the persisted pending status in the admin user list', async () => {
    findMany.mockResolvedValue([
      {
        id: 42,
        username: 'waiting-user',
        email: 'waiting@example.com',
        role: 'Student',
        active_status: false,
        pending_status: 'Pending',
        programs_enrolled: null,
      },
    ]);

    await expect(service.findAll()).resolves.toEqual([
      {
        userId: 42,
        username: 'waiting-user',
        email: 'waiting@example.com',
        role: 'Student',
        active_status: false,
        pending_status: 'Pending',
        module_enrolled: undefined,
      },
    ]);
    expect(findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        active_status: true,
        pending_status: true,
        programs_enrolled: true,
      },
    });
  });

  it('returns an empty list when the database has no users', async () => {
    findMany.mockResolvedValue([]);

    await expect(service.findAll()).resolves.toEqual([]);
  });

  it('only finds users persisted in the database', async () => {
    findFirst.mockResolvedValue(null);

    await expect(service.findOne('test')).resolves.toBeUndefined();
    expect(findFirst).toHaveBeenCalledWith({
      where: { username: { equals: 'test', mode: 'insensitive' } },
    });
  });

  it('approves an existing user', async () => {
    updateMany.mockResolvedValue({ count: 1 });

    await expect(service.approve(42)).resolves.toEqual({
      userId: 42,
      active_status: true,
    });
    expect(updateMany).toHaveBeenCalledWith({
      where: { id: 42 },
      data: { active_status: true, pending_status: 'Active' },
    });
  });

  it('reports when the user does not exist', async () => {
    updateMany.mockResolvedValue({ count: 0 });

    await expect(service.approve(404)).rejects.toThrow('User not found.');
  });
});
