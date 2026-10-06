import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { InquiresService } from './inquires.service.js';

describe('InquiresService', () => {
  let service: InquiresService;
  const updateMany = vi.fn();

  beforeEach(async () => {
    updateMany.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InquiresService,
        {
          provide: PrismaService,
          useValue: { inquires: { updateMany } },
        },
      ],
    }).compile();

    service = module.get<InquiresService>(InquiresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('accepts an inquiry by marking it resolved', async () => {
    updateMany.mockResolvedValue({ count: 1 });

    await expect(service.accept(42)).resolves.toEqual({
      inquiryId: 42,
      status: false,
    });
    expect(updateMany).toHaveBeenCalledWith({
      where: { id: 42 },
      data: { status: false },
    });
  });

  it('reports when the inquiry does not exist', async () => {
    updateMany.mockResolvedValue({ count: 0 });

    await expect(service.accept(404)).rejects.toBeInstanceOf(NotFoundException);
  });
});
