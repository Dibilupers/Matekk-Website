import { Test, TestingModule } from '@nestjs/testing';
import { InquiresService } from './inquires.service.js';
import { InquiresController } from './inquires.controller.js';
import { AdminGuard } from '../auth/guards/admin.guard.js';

describe('InquiresController', () => {
  let controller: InquiresController;
  const inquiresService = {
    create: vi.fn(),
    findAll: vi.fn(),
    accept: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InquiresController],
      providers: [{ provide: InquiresService, useValue: inquiresService }],
    })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<InquiresController>(InquiresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('accepts an inquiry', async () => {
    inquiresService.accept.mockResolvedValue({ inquiryId: 42, status: false });

    await expect(controller.accept(42)).resolves.toEqual({
      inquiryId: 42,
      status: false,
    });
    expect(inquiresService.accept).toHaveBeenCalledWith(42);
  });
});
