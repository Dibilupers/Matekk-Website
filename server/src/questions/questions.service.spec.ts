import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

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
});
