import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CaptchaService } from '../captcha/captcha.service.js';
import { InquiresService } from './inquires.service.js';

describe('InquiresService', () => {
  let service: InquiresService;
  const findUnique = vi.fn();
  const updateMany = vi.fn();
  const userFindUnique = vi.fn();
  const programFindUnique = vi.fn();
  const findEnrollments = vi.fn();
  const upsertEnrollment = vi.fn();
  const updateInquiry = vi.fn();
  const transaction = vi.fn();
  const createInquiry = vi.fn();
  const verifyCaptcha = vi.fn();

  beforeEach(async () => {
    findUnique.mockReset();
    updateMany.mockReset();
    userFindUnique.mockReset();
    programFindUnique.mockReset();
    findEnrollments.mockReset();
    upsertEnrollment.mockReset();
    updateInquiry.mockReset();
    transaction.mockReset();
    createInquiry.mockReset();
    verifyCaptcha.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InquiresService,
        { provide: CaptchaService, useValue: { verify: verifyCaptcha } },
        {
          provide: PrismaService,
          useValue: {
            inquires: { create: createInquiry, findUnique, updateMany, update: updateInquiry },
            users: { findUnique: userFindUnique },
            program: { findUnique: programFindUnique },
            enrollment: { findMany: findEnrollments, upsert: upsertEnrollment },
            $transaction: transaction,
          },
        },
      ],
    }).compile();

    service = module.get<InquiresService>(InquiresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('verifies the CAPTCHA before creating an inquiry and does not store its token', async () => {
    const inquiry = {
      inquiry_type: 'Training Inquiry' as const,
      captchaToken: 'verified-token',
      name: 'A learner',
      email: 'learner@example.com',
      phone: '09171234567',
      subject: 'Training',
      message: 'Please send details.',
    };
    createInquiry.mockResolvedValue({ id: 1 });

    await expect(service.create(inquiry)).resolves.toEqual({ id: 1 });

    expect(verifyCaptcha).toHaveBeenCalledWith('verified-token', 'training_inquiry');
    expect(createInquiry).toHaveBeenCalledWith({
      data: {
        inquiry_type: 'Training Inquiry',
        name: 'A learner',
        email: 'learner@example.com',
        phone: '09171234567',
        subject: 'Training',
        message: 'Please send details.',
      },
    });
  });

  it('does not create an inquiry when CAPTCHA verification fails', async () => {
    verifyCaptcha.mockRejectedValue(new Error('CAPTCHA rejected'));

    await expect(service.create({
      captchaToken: 'invalid-token',
      inquiry_type: 'Training Inquiry',
      name: 'A learner',
      email: 'learner@example.com',
      phone: '09171234567',
      subject: 'Training',
      message: 'Please send details.',
    })).rejects.toThrow('CAPTCHA rejected');
    expect(createInquiry).not.toHaveBeenCalled();
  });

  it('verifies ICT solutions inquiries with their own CAPTCHA action', async () => {
    createInquiry.mockResolvedValue({ id: 2 });
    await service.create({
      captchaToken: 'verified-token',
      inquiry_type: 'ICT Solutions Inquiry',
      name: 'A client',
      email: 'client@example.com',
      phone: '09171234567',
      subject: 'Solutions',
      message: 'Please send details.',
    });

    expect(verifyCaptcha).toHaveBeenCalledWith('verified-token', 'solutions_inquiry');
  });

  it('accepts an inquiry by marking it resolved', async () => {
    findUnique.mockResolvedValue({ status: true, inquiry_type: 'Training Inquiry' });
    updateMany.mockResolvedValue({ count: 1 });

    await expect(service.accept(42)).resolves.toEqual({
      inquiryId: 42,
      status: false,
    });
    expect(updateMany).toHaveBeenCalledWith({
      where: { id: 42, status: true },
      data: { status: false },
    });
  });

  it('reports when the inquiry does not exist', async () => {
    findUnique.mockResolvedValue(null);

    await expect(service.accept(404)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('approves an enrollment request by creating the enrollment and resolving the request', async () => {
    findUnique.mockResolvedValue({
      status: true,
      inquiry_type: 'Enrollment Request',
      project_desc: 'Account ID: 12; Program ID: 4',
    });
    userFindUnique.mockResolvedValue({ id: 12 });
    programFindUnique.mockResolvedValue({ id: 4, parentId: null });
    findEnrollments.mockResolvedValue([]);
    upsertEnrollment.mockResolvedValue({});
    updateInquiry.mockResolvedValue({});
    transaction.mockImplementation(async (operations: Promise<unknown>[]) => Promise.all(operations));

    await expect(service.accept(42)).resolves.toEqual({
      inquiryId: 42,
      status: false,
    });
    expect(upsertEnrollment).toHaveBeenCalledWith({
      where: { userId_programId: { userId: 12, programId: 4 } },
      create: { userId: 12, programId: 4 },
      update: {},
    });
    expect(updateInquiry).toHaveBeenCalledWith({
      where: { id: 42 },
      data: { status: false },
    });
    expect(transaction).toHaveBeenCalled();
  });
});
