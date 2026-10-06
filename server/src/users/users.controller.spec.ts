import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

describe('UsersController', () => {
  let controller: UsersController;
  const usersService = {
    findAll: vi.fn(),
    findOne: vi.fn(),
    approve: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('allows admins to approve users', async () => {
    usersService.approve.mockResolvedValue({ userId: 42, active_status: true });

    await expect(controller.approve(42)).resolves.toEqual({
      userId: 42,
      active_status: true,
    });
    expect(usersService.approve).toHaveBeenCalledWith(42);
  });
});
