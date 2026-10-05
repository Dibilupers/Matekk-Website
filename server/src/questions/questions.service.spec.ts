import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: PrismaService,
          useValue: {
            questions: {
              create: () => Promise.resolve(null),
              findMany: () => Promise.resolve([]),
            },
          },
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
