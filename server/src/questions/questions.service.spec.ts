import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: PrismaService,
          useValue: {
            questionsRls: {
              create: () => Promise.resolve(null),
              findMany: () => Promise.resolve([]),
            },
            questions: {
              findMany: vi.fn(),
            },
          },
        },
        {
          provide: StorageService,
          useValue: {
            createSignedQuestionImageUrls: vi.fn().mockResolvedValue(new Map()),
          },
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('rejects a correct answer that is not one of the available choices', () => {
    expect(() => service.create({
      module: 'CCNA',
      topic: 'Routing',
      difficulty: 'Easy',
      question_text: 'Which protocol is used?',
      choices: ['A', 'B'],
      correct_answer: 'C',
      explanation: 'Explanation',
    })).toThrow('The correct answer must be one of the question choices.');
  });

  it('returns signed URLs for private question images', async () => {
    const row = {
      id: 1,
      module: 'CCNA Part 5',
      topic: 'Security',
      question_text: 'Refer to the exhibit.',
      choices: '{}',
      correct_answer: 'A',
      explanation: '',
      imageUrl: 'questions/ccna-question-1.png',
    };
    const signedUrl = 'https://example.supabase.co/storage/v1/object/sign/question-images/questions/ccna-question-1.png?token=test';
    const prisma = {
      questions: { findMany: vi.fn().mockResolvedValue([row]) },
    };
    const storage = {
      createSignedQuestionImageUrls: vi.fn().mockResolvedValue(new Map([[row.imageUrl, signedUrl]])),
    };
    const module = await Test.createTestingModule({
      providers: [
        QuestionsService,
        { provide: PrismaService, useValue: prisma },
        { provide: StorageService, useValue: storage },
      ],
    }).compile();

    const questionsService = module.get<QuestionsService>(QuestionsService);

    await expect(questionsService.findBank()).resolves.toEqual([{ ...row, imageUrl: signedUrl }]);
    expect(storage.createSignedQuestionImageUrls).toHaveBeenCalledWith([row.imageUrl]);
  });
});
