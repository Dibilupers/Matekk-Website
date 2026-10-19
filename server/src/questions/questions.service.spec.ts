import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import { GradebookService } from '../gradebook/gradebook.service.js';

function examQuestionBank(questionCount: number) {
  const matchingCount = questionCount / 10;
  const questionBlocks = questionCount / 50;
  const singleQuestions = Array.from({ length: questionCount - matchingCount }, (_, index) => ({
    id: index + 1,
    module: 'CCNA',
    topic: 'Routing',
    difficulty: 'Easy',
    question_text: `Question ${index + 1}`,
    choices: JSON.stringify(['Correct', 'Wrong A', 'Wrong B']),
    correct_answer: '0',
    explanation: 'Because it is correct.',
    question_type: 'single',
    match_items: null,
  }));
  const generatedQuestions = Array.from({ length: questionBlocks }, (_, blockIndex) => {
    const numberQuestion = {
      ...singleQuestions[0],
      id: singleQuestions.length + blockIndex * 2 + 1,
      question_text: `Number question ${blockIndex + 1}`,
      choices: '',
      correct_answer: 'Group A:\n+ Item A\n+ Item B\nGroup B:\n+ Item C\n+ Item D',
    };
    const dragDropQuestion = {
      ...singleQuestions[0],
      id: singleQuestions.length + blockIndex * 2 + 2,
      question_text: `Drag-and-drop question ${blockIndex + 1}`,
      choices: '',
      correct_answer: 'Item A: Answer A\nItem B: Answer B',
    };
    return [numberQuestion, dragDropQuestion];
  }).flat();
  const explicitMatchCount = matchingCount - generatedQuestions.length;
  const matchQuestions = Array.from({ length: explicitMatchCount }, (_, index) => ({
    id: singleQuestions.length + generatedQuestions.length + index + 1,
    module: 'CCNA',
    topic: 'Addressing',
    difficulty: 'Medium',
    question_text: `Match question ${index + 1}`,
    choices: JSON.stringify(['Answer A', 'Answer B']),
    correct_answer: '[0,1]',
    explanation: 'Each item maps to its corresponding answer.',
    question_type: 'match',
    match_items: ['Item A', 'Item B'],
  }));
  return [...singleQuestions, ...generatedQuestions, ...matchQuestions];
}

describe('QuestionsService', () => {
  let service: QuestionsService;
  let gradebookMock: { recordAssessment: ReturnType<typeof vi.fn> };
  let storageMock: { createSignedQuestionImageUrls: ReturnType<typeof vi.fn> };
  let prismaMock: {
    questions: {
      create: ReturnType<typeof vi.fn>;
      findMany: ReturnType<typeof vi.fn>;
    };
    examAttempt: {
      create: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      updateMany: ReturnType<typeof vi.fn>;
    };
  };

  beforeEach(async () => {
    gradebookMock = { recordAssessment: vi.fn().mockResolvedValue(null) };
    storageMock = {
      createSignedQuestionImageUrls: vi.fn().mockResolvedValue(new Map()),
    };
    prismaMock = {
      questions: {
        create: vi.fn().mockResolvedValue(null),
        findMany: vi.fn().mockResolvedValue([]),
      },
      examAttempt: {
        create: vi.fn(({ data }) => Promise.resolve(data)),
        findUnique: vi.fn(),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: StorageService,
          useValue: storageMock,
        },
        {
          provide: GradebookService,
          useValue: gradebookMock,
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns CCNA questions, including CCNA part labels, in database order', async () => {
    const rows = Array.from({ length: 3 }, (_, index) => ({
      id: index + 1,
      module: 'CCNA',
      topic: 'Routing',
      question_text: `Question ${index + 1}`,
      choices: JSON.stringify({ A: 'Choice A', B: 'Choice B' }),
      correct_answer: 'A',
      explanation: '',
      question_type: 'single',
      match_items: null,
      imageUrl: null,
    }));
    prismaMock.questions.findMany.mockResolvedValue(rows);

    await expect(service.findBank()).resolves.toEqual(rows);
    expect(prismaMock.questions.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: {
        OR: [
          { module: { equals: 'CCNA', mode: 'insensitive' } },
          { module: { startsWith: 'CCNA Part ', mode: 'insensitive' } },
          { module: { startsWith: 'CCNA 200-301 Set ', mode: 'insensitive' } },
        ],
      },
      orderBy: { id: 'asc' },
    }));
  });

  it('includes legacy CCNA 200-301 question sets in the CCNA question bank', async () => {
    await service.findBank();

    expect(prismaMock.questions.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: {
        OR: expect.arrayContaining([
          { module: { startsWith: 'CCNA 200-301 Set ', mode: 'insensitive' } },
        ]),
      },
    }));
  });

  it('returns only renderable CCNA rows with normalized answer keys', async () => {
    prismaMock.questions.findMany.mockResolvedValue([
      {
        id: 1,
        module: 'CCNA',
        topic: 'Routing',
        question_text: 'Which answer is correct?',
        choices: JSON.stringify(['First', 'Second']),
        correct_answer: 'Second',
        explanation: 'The second answer.',
        question_type: 'single',
        match_items: null,
        imageUrl: null,
      },
      {
        id: 2,
        module: 'CCNA',
        topic: 'Routing',
        question_text: 'This row has no matching answer.',
        choices: JSON.stringify(['First', 'Second']),
        correct_answer: 'Not an option',
        explanation: '',
        question_type: 'single',
        match_items: null,
        imageUrl: null,
      },
      {
        id: 3,
        module: 'CCNA',
        topic: 'Routing',
        question_text: 'Match each item.',
        choices: JSON.stringify(['Answer A', 'Answer B']),
        correct_answer: '[1,0]',
        explanation: 'The answers are reversed.',
        question_type: 'match',
        match_items: ['Item A', 'Item B'],
        imageUrl: null,
      },
    ]);

    const { questions, skippedCount } = await service.findUsableBank();

    expect(questions).toHaveLength(2);
    expect(skippedCount).toBe(1);
    expect(questions).toEqual(expect.arrayContaining([
      expect.objectContaining({ bankId: 1, answer: 1, type: 'single' }),
      expect.objectContaining({ bankId: 3, answer: [1, 0], type: 'match' }),
    ]));
  });

  it('includes choose-two and choose-three CCNA questions as graded multi-select questions', async () => {
    prismaMock.questions.findMany.mockResolvedValue([
      {
        id: 10,
        module: 'CCNA Part 5',
        topic: 'QoS',
        question_text: 'Which two QoS tools guarantee minimum bandwidth? (Choose two)',
        choices: JSON.stringify({ A: 'FIFO', B: 'CBWFQ', C: 'LLC', D: 'WFQ', E: 'RSVP' }),
        correct_answer: 'B,D',
        explanation: 'CBWFQ and WFQ provide bandwidth guarantees.',
        question_type: 'single',
        match_items: null,
        imageUrl: null,
      },
      {
        id: 11,
        module: 'CCNA 200-301 Set 1',
        topic: 'Routing',
        question_text: 'Which three protocols are used here? (Select three)',
        choices: JSON.stringify({ A: 'OSPF', B: 'RIP', C: 'EIGRP', D: 'FTP' }),
        correct_answer: 'A,C,B',
        explanation: 'The first three choices are routing protocols.',
        question_type: 'single',
        match_items: null,
        imageUrl: null,
      },
    ]);

    const { questions, skippedCount } = await service.findUsableBank();

    expect(skippedCount).toBe(0);
    expect(questions).toEqual(expect.arrayContaining([
      expect.objectContaining({ bankId: 10, type: 'multi', answer: [1, 3] }),
      expect.objectContaining({ bankId: 11, type: 'multi', answer: [0, 2, 1] }),
    ]));
  });

  it('converts question 481 into a native numbered static-route matching question', async () => {
    prismaMock.questions.findMany.mockResolvedValue([
      {
        id: 481,
        module: 'CCNA',
        topic: 'Routing',
        question_text: 'Configure static routes so host A can communicate with host B.',
        choices: null,
        correct_answer: 'legacy drag-and-drop data',
        explanation: '',
        question_type: 'single',
        match_items: null,
        imageUrl: 'questions/ccna-question-481.png',
      },
    ]);

    const { questions, skippedCount } = await service.findUsableBank();

    expect(skippedCount).toBe(0);
    expect(questions).toHaveLength(1);
    expect(questions[0]).toEqual(expect.objectContaining({
      bankId: 481,
      type: 'match',
      matchStyle: 'numbers',
      prompt: expect.stringContaining('Assign the commands to the routers'),
      items: [
        'ip route 10.10.13.0 255.255.255.128 10.10.10.1',
        'ip route 10.10.13.0 255.255.255.128 10.10.10.5',
        'ip route 10.10.13.10 255.255.255.255 10.10.10.1',
        'ip route 10.10.14.0 255.255.255.0 10.10.10.2',
        'ip route 10.10.14.0 255.255.255.0 10.10.10.6',
        'ip route 10.10.14.10 255.255.255.255 10.10.10.6',
      ],
      choices: ['R1', 'R2', 'R3', 'Not used'],
      groupCounts: { R1: 1, R2: 2, R3: 1, 'Not used': 2 },
      answer: [0, 1, 1, 2, 3, 3],
    }));
    expect(questions[0]).not.toHaveProperty('imageUrl');
  });

  it('converts question 382 into a numbered Ansible feature-matching question', async () => {
    prismaMock.questions.findMany.mockResolvedValue([
      {
        id: 382,
        module: 'CCNA Part 10',
        topic: 'REST API / Automation',
        question_text: 'Drag and drop the Ansible features from the left to the right. Not all features are used.',
        choices: null,
        correct_answer: 'uses the YAML language\nexecutes modules via SSH by default\npushes configurations to the client\noperates without agents',
        explanation: '',
        question_type: 'single',
        match_items: null,
        imageUrl: null,
      },
    ]);

    const { questions, skippedCount } = await service.findUsableBank();

    expect(skippedCount).toBe(0);
    expect(questions).toHaveLength(1);
    expect(questions[0]).toEqual(expect.objectContaining({
      bankId: 382,
      type: 'match',
      matchStyle: 'numbers',
      prompt: 'Classify each statement as an Ansible feature or not an Ansible feature.',
      items: [
        'Uses the YAML language',
        'Executes modules via SSH by default',
        'Pushes configurations to the client',
        'Uses agents to manage hosts',
        'Requires clients to pull configurations from the server',
        'Operates without agents',
      ],
      choices: ['Ansible feature', 'Not an Ansible feature'],
      groupCounts: { 'Ansible feature': 4, 'Not an Ansible feature': 2 },
      answer: [0, 0, 0, 1, 1, 0],
    }));
  });

  it('converts question 289 into drag-and-drop QoS term matching', async () => {
    prismaMock.questions.findMany.mockResolvedValue([
      {
        id: 289,
        module: 'CCNA Part 9',
        topic: 'QoS',
        question_text: 'Drag and drop the QoS terms from the left onto the descriptions on the right.',
        choices: '',
        correct_answer: [
          'Class-based weighted fair queuing: Guarantees minimum bandwidth to specific traffic classes when an interface is congested',
          'Classification: Categorizes packets based on the value of traffic descriptor',
          'Congestion: Outcome of overutilization',
          'Policing: Uses defined criteria to limit the transmission of one or more classes of traffic',
          'Shaping: Prevents congestion by reducing the flow of the outbound traffic',
        ].join(' '),
        explanation: '',
        question_type: 'single',
        match_items: null,
        imageUrl: null,
      },
    ]);

    const { questions, skippedCount } = await service.findUsableBank();

    expect(skippedCount).toBe(0);
    expect(questions).toEqual([
      expect.objectContaining({
        bankId: 289,
        type: 'drag_drop',
        items: [
          'Guarantees minimum bandwidth to specific traffic classes when an interface is congested',
          'Categorizes packets based on the value of traffic descriptor',
          'Outcome of overutilization',
          'Uses defined criteria to limit the transmission of one or more classes of traffic',
          'Prevents congestion by reducing the flow of the outbound traffic',
        ],
        choices: [
          'Class-based weighted fair queuing',
          'Classification',
          'Congestion',
          'Policing',
          'Shaping',
        ],
        answer: [0, 1, 2, 3, 4],
      }),
    ]);
  });

  it('converts question 181 into a numbered Rapid PVST+ action matching question', async () => {
    prismaMock.questions.findMany.mockResolvedValue([
      {
        id: 181,
        module: 'CCNA Part 8',
        topic: 'General',
        question_text: 'Drag and drop the Rapid PVST+ forwarding state actions from the left to the right. Not all actions are used.',
        choices: null,
        correct_answer: [
          'BPDUs received are forwarded to the system module',
          'The port in the forwarding state responds to network management messages',
          'Switched frames received from other ports are advanced',
          'Frames received from the attached segment are processed',
        ].join('\n'),
        explanation: '',
        question_type: 'single',
        match_items: null,
        imageUrl: null,
      },
    ]);

    const { questions, skippedCount } = await service.findUsableBank();

    expect(skippedCount).toBe(0);
    expect(questions).toHaveLength(1);
    expect(questions[0]).toEqual(expect.objectContaining({
      bankId: 181,
      type: 'match',
      matchStyle: 'numbers',
      items: [
        'Frames received from the attached segment are discarded',
        'BPDUs received are forwarded to the system module',
        'The port in the forwarding state responds to network management messages',
        'BPDUs received from the system module are processed and transmitted',
        'Switched frames received from other ports are advanced',
        'Frames received from the attached segment are processed',
      ],
      choices: ['Action', 'Not used'],
      groupCounts: { Action: 4, 'Not used': 2 },
      answer: [0, 0, 1, 1, 0, 0],
    }));
  });

  it('converts question 608 into a numbered northbound API answer-slot question', async () => {
    prismaMock.questions.findMany.mockResolvedValue([
      {
        id: 608,
        module: 'CCNA Part 12',
        topic: 'REST API / Automation',
        question_text: 'Drag and drop the characteristics of northbound APIs from the left onto any position on the right. Not all characteristics are used.',
        choices: null,
        correct_answer: [
          'supports automation',
          'communicates between the SDN controller and the application plane',
          'supports network virtualization protocols',
          'supports REST-based requirements',
        ].join('\n'),
        explanation: '',
        question_type: 'single',
        match_items: null,
        imageUrl: null,
      },
    ]);

    const { questions, skippedCount } = await service.findUsableBank();

    expect(skippedCount).toBe(0);
    expect(questions).toHaveLength(1);
    expect(questions[0]).toEqual(expect.objectContaining({
      bankId: 608,
      type: 'match',
      matchStyle: 'numbers',
      choices: ['1', '2', '3', '4', 'Not used'],
      groupCounts: { '1': 1, '2': 1, '3': 1, '4': 1, 'Not used': 3 },
      answer: [0, 1, 4, 4, 2, 3, 4],
      items: [
        'Supports automation',
        'Communicates between the SDN controller and the application plane',
        'Communicates between the SDN controller and the data plane',
        'Supports data sharing between systems',
        'Supports network virtualization protocols',
        'Supports REST-based requirements',
        'Uses OpenFlow to interface between the data and control planes',
      ],
    }));
  });

  it('includes question 720 with the confirmed answer A', async () => {
    prismaMock.questions.findMany.mockResolvedValue([
      {
        id: 720,
        module: 'CCNA Part 13',
        topic: 'Wireless',
        question_text: 'Which standard is required when more than one distribution system port and only one IP address are configured for a Cisco WLC?',
        choices: JSON.stringify([
          'A. 802.3ad',
          'B. 802.1q',
          'C. 802.1d',
          'D. 802.1af',
        ]),
        correct_answer: null,
        explanation: '',
        question_type: 'single',
        match_items: null,
        imageUrl: null,
      },
    ]);

    const { questions, skippedCount } = await service.findUsableBank();

    expect(skippedCount).toBe(0);
    expect(questions).toEqual([
      expect.objectContaining({
        bankId: 720,
        type: 'single',
        options: ['A. 802.3ad', 'B. 802.1q', 'C. 802.1d', 'D. 802.1af'],
        answer: 0,
      }),
    ]);
  });

  it('converts question 1306 into numbered broadcast-address matching', async () => {
    prismaMock.questions.findMany.mockResolvedValue([
      {
        id: 1306,
        module: 'CCNA 200-301 Set 35',
        topic: 'IP Addressing / Subnetting',
        question_text: 'Drag and drop each broadcast IP address on the left to the Broadcast Address column on the right. Not all options are used.',
        choices: null,
        correct_answer: [
          '10.63.255.255/10',
          '172.16.255.39/29',
          '172.20.255.255/16',
          '192.168.255.127/25',
        ].join('\n'),
        explanation: '',
        question_type: 'single',
        match_items: null,
        imageUrl: null,
      },
    ]);

    const { questions, skippedCount } = await service.findUsableBank();

    expect(skippedCount).toBe(0);
    expect(questions).toHaveLength(1);
    expect(questions[0]).toEqual(expect.objectContaining({
      bankId: 1306,
      type: 'match',
      matchStyle: 'numbers',
      choices: ['Broadcast address', 'Not used'],
      groupCounts: { 'Broadcast address': 4, 'Not used': 2 },
      answer: [1, 0, 0, 0, 1, 0],
      items: [
        '10.1.255.254/24',
        '10.63.255.255/10',
        '172.16.255.39/29',
        '172.20.255.255/16',
        '192.168.1.10/24',
        '192.168.255.127/25',
      ],
    }));
  });

  it('keeps inconsistent multi-select questions out of the usable bank', async () => {
    prismaMock.questions.findMany.mockResolvedValue([
      {
        id: 12,
        module: 'CCNA',
        topic: 'Routing',
        question_text: 'Which two protocols are used? (Choose two)',
        choices: JSON.stringify({ A: 'OSPF', B: 'RIP', C: 'FTP' }),
        correct_answer: 'A,A',
        explanation: '',
        question_type: 'single',
        match_items: null,
        imageUrl: null,
      },
    ]);

    const { questions, skippedCount } = await service.findUsableBank();

    expect(questions).toHaveLength(0);
    expect(skippedCount).toBe(1);
  });

  it('filters usable questions by the requested dedicated course module', async () => {
    await service.findUsableBank('CompTIA Network+');

    expect(prismaMock.questions.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { module: { equals: 'CompTIA Network+', mode: 'insensitive' } },
    }));
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

  it('stores a matching question and its answer key as matching metadata', async () => {
    await service.create({
      module: 'CCNA',
      topic: 'IPv6',
      difficulty: 'Easy',
      question_text: 'Match these prefixes.',
      question_type: 'match',
      choices: ['Global unicast', 'Multicast'],
      match_items: ['2000::/3', 'FF00::/8'],
      match_answer: [0, 1],
      explanation: 'The prefixes identify the address type.',
    });

    expect(prismaMock.questions.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        question_type: 'match',
        choices: JSON.stringify(['Global unicast', 'Multicast']),
        match_items: ['2000::/3', 'FF00::/8'],
        correct_answer: '[0,1]',
      }),
    });
  });

  it('accepts zero-based numeric answer keys when building an exam', async () => {
    const databaseQuestions = examQuestionBank(50);
    prismaMock.questions.findMany.mockResolvedValue(databaseQuestions);

    const attempt = await service.startExam('short', 7);

    expect(attempt.questions).toHaveLength(50);
    expect(prismaMock.examAttempt.create).toHaveBeenCalledOnce();
  });

  it('starts randomized database exams without returning answer keys', async () => {
    const databaseQuestions = examQuestionBank(50);
    prismaMock.questions.findMany.mockResolvedValue(databaseQuestions);

    const attempt = await service.startExam('short', 7);

    expect(attempt.questions).toHaveLength(50);
    expect(attempt.questions.filter((question) => question.type !== 'single')).toHaveLength(5);
    expect(attempt.questions.every((question) =>
      !('correct_answer' in question) && !('answer' in question),
    )).toBe(true);
    expect(attempt.questions.find((question) => question.type === 'single')).toMatchObject({
      id: expect.any(Number),
      prompt: expect.any(String),
      options: expect.arrayContaining(['Correct', 'Wrong A', 'Wrong B']),
    });
    expect(attempt.questions.find((question) => question.prompt === 'Match question 1')).toMatchObject({
      type: expect.stringMatching(/^(match|click_boxes)$/),
      items: ['Item A', 'Item B'],
      choices: expect.arrayContaining(['Answer A', 'Answer B']),
    });
    expect(attempt.questions).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'match', matchStyle: 'numbers' }),
      expect.objectContaining({ type: 'click_boxes' }),
      expect.objectContaining({ type: 'drag_drop' }),
      expect.objectContaining({ type: 'match', matchStyle: 'lines' }),
    ]));
    expect(prismaMock.examAttempt.create).toHaveBeenCalledOnce();
    expect(prismaMock.examAttempt.create.mock.calls[0][0].data.userId).toBe(7);
    const savedAttempt = prismaMock.examAttempt.create.mock.calls[0][0].data;
    prismaMock.examAttempt.findUnique.mockResolvedValue({
      ...savedAttempt,
      userId: 7,
      score: null,
      review: null,
      submittedAt: null,
    });
    const resumedAttempt = await service.resumeExam('short', attempt.attemptId, 7);
    expect(resumedAttempt.questions).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'match', matchStyle: 'numbers' }),
      expect.objectContaining({ type: 'click_boxes' }),
      expect.objectContaining({ type: 'drag_drop' }),
      expect.objectContaining({ type: 'match', matchStyle: 'lines' }),
    ]));
  });

  it('preserves numbered-input metadata for wrapped grouped questions in the exam attempt', async () => {
    const databaseQuestions = examQuestionBank(50);
    const numberQuestionIndex = databaseQuestions.findIndex((question) =>
      question.question_text.startsWith('Number question'),
    );
    databaseQuestions[numberQuestionIndex] = {
      ...databaseQuestions[numberQuestionIndex],
      id: 1307,
      question_text: 'An interface has been configured with the access list shown below.',
      choices: '',
      correct_answer: [
        'Permitted:',
        '+ source IP: 207.16.32.14,',
        'destination application: http',
        '+ source IP: 207.16.15.9,',
        'destination port: 23',
        '+ source IP: 207.16.16.14,',
        'destination port: 53',
        '',
        'Denied:',
        '+ source IP: 207.16.14.7,',
        'destination port: 80',
        '+ source IP: 207.16.13.14,',
        'destination application: http',
      ].join('\n'),
      question_type: 'single',
      match_items: null,
    };
    prismaMock.questions.findMany.mockResolvedValue(databaseQuestions);

    const attempt = await service.startExam('short', 7);
    const question = attempt.questions.find((item) => item.id === 1307);

    expect(question).toMatchObject({
      type: 'match',
      matchStyle: 'numbers',
      items: expect.arrayContaining([
        'source IP: 207.16.32.14, destination application: http',
        'source IP: 207.16.15.9, destination port: 23',
        'source IP: 207.16.16.14, destination port: 53',
        'source IP: 207.16.14.7, destination port: 80',
        'source IP: 207.16.13.14, destination application: http',
      ]),
      choices: expect.arrayContaining(['Permitted', 'Denied']),
    });
    if (question?.type !== 'match' || !('groupSizes' in question)) {
      throw new Error('The grouped question must include numbered-input sizes.');
    }
    expect(question.groupSizes).toHaveLength(2);
    expect(question.groupSizes[question.choices.indexOf('Permitted')]).toBe(3);
    expect(question.groupSizes[question.choices.indexOf('Denied')]).toBe(2);
  });

  it('shows every second one-to-one matching question as circles, with at least one per 50-question block', async () => {
    const bank = examQuestionBank(100);
    const extraMatches = Array.from({ length: 10 }, (_, index) => ({
      ...bank[bank.length - 1],
      id: 1000 + index,
      question_text: `Extra match question ${index + 1}`,
    }));
    prismaMock.questions.findMany.mockResolvedValue([...bank, ...extraMatches]);

    const attempt = await service.startExam('medium', 7);
    const matches = attempt.questions.filter((question) => question.type !== 'single');

    expect(matches).toHaveLength(10);
    for (const block of [attempt.questions.slice(0, 50), attempt.questions.slice(50, 100)]) {
      const blockMatches = block.filter((question) => question.type !== 'single');
      expect(blockMatches.some((question) => question.type === 'match' && question.matchStyle === 'lines')).toBe(true);
      expect(blockMatches.some((question) => question.type === 'click_boxes')).toBe(true);
      expect(blockMatches.some((question) => question.type === 'drag_drop')).toBe(true);
      expect(blockMatches.some((question) => question.type === 'match' && question.matchStyle === 'numbers')).toBe(true);
    }
    // the saved attempt keeps the style, so a resumed exam shows the same question the same way
    const saved = prismaMock.examAttempt.create.mock.calls[0][0].data.questionSet as { matchStyle?: string }[];
    expect(saved.some((question) => question.matchStyle === 'lines')).toBe(true);
  });

  it('returns signed database image URLs with exam questions', async () => {
    const imagePath = 'questions/ccna-exhibit.webp';
    const signedUrl = 'https://storage.example/questions/ccna-exhibit.webp?token=signed';
    const bank = examQuestionBank(50).map((question) =>
      question.id === 1 ? { ...question, imageUrl: imagePath } : question,
    );
    prismaMock.questions.findMany.mockResolvedValue(bank);
    storageMock.createSignedQuestionImageUrls.mockResolvedValue(new Map([[imagePath, signedUrl]]));

    const attempt = await service.startExam('short', 7);

    expect(attempt.questions.find((question) => question.id === 1)?.imageUrl).toBe(signedUrl);
    expect(storageMock.createSignedQuestionImageUrls).toHaveBeenCalledWith([imagePath]);
    expect(prismaMock.examAttempt.create.mock.calls[0][0].data.questionSet)
      .toEqual(expect.arrayContaining([expect.objectContaining({ id: 1, imageUrl: imagePath })]));
  });

  it('grades database exam answers and returns answer review after submission', async () => {
    const databaseQuestions = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      module: 'CCNA',
      topic: 'Routing',
      difficulty: 'Easy',
      question_text: `Question ${index + 1}`,
      choices: JSON.stringify(['Correct', 'Wrong A', 'Wrong B']),
      correct_answer: 'Correct',
      explanation: 'Because it is correct.',
    }));
    const questionSet = databaseQuestions.map((question) => ({
      id: question.id,
      prompt: question.question_text,
      options: ['Wrong A', 'Correct', 'Wrong B'],
      module: question.module,
      topic: question.topic,
    }));
    prismaMock.examAttempt.findUnique.mockResolvedValue({
      id: 'attempt-id',
      userId: 7,
      examKey: 'short',
      questionSet,
      durationSeconds: 2700,
      deadline: new Date(Date.now() + 2700000),
      score: null,
      review: null,
      submittedAt: null,
    });
    prismaMock.questions.findMany.mockResolvedValue(databaseQuestions);

    const result = await service.submitExam(
      'short',
      'attempt-id',
      7,
      [{ questionId: 1, selectedAnswer: 'Correct' }],
    );

    expect(result.score).toBe(1);
    expect(result.isSubmitted).toBe(true);
    expect(result.review).toHaveLength(50);
    expect(result.review[0]).toMatchObject({
      id: 1,
      selectedAnswer: 'Correct',
      correctAnswer: 'Correct',
      isCorrect: true,
    });
    expect(prismaMock.examAttempt.updateMany).toHaveBeenCalledOnce();
    expect(gradebookMock.recordAssessment).toHaveBeenCalledWith(
      7,
      'ccna',
      {
        id: 'attempt-id',
        type: 'exam',
        programKey: 'ccna',
        examFormat: 'short',
        title: 'Short Exam',
        score: 1,
        maxScore: 50,
        submittedAt: expect.any(Number),
      },
    );
  });

  it('uses only the Questions table to create an exam', async () => {
    const databaseQuestions = examQuestionBank(50);
    prismaMock.questions.findMany.mockResolvedValue(databaseQuestions);

    await service.startExam('short', 7);

    expect(prismaMock.questions.findMany).toHaveBeenCalledOnce();
  });

  it.each([
    [50, 'short'],
    [100, 'medium'],
    [150, 'long'],
  ] as const)('includes exactly five matching questions per 50-question block in the %s exam', async (count, examKey) => {
    prismaMock.questions.findMany.mockResolvedValue(examQuestionBank(count));

    const attempt = await service.startExam(examKey, 7);

    expect(attempt.questions).toHaveLength(count);
    for (let offset = 0; offset < count; offset += 50) {
      const block = attempt.questions.slice(offset, offset + 50);
      expect(
        block.filter((question) => question.type !== 'single'),
      ).toHaveLength(5);
      expect(block).toEqual(expect.arrayContaining([
        expect.objectContaining({ type: 'match', matchStyle: 'numbers' }),
        expect.objectContaining({ type: 'click_boxes' }),
        expect.objectContaining({ type: 'drag_drop' }),
        expect.objectContaining({ type: 'match', matchStyle: 'lines' }),
      ]));
    }
  });

  it('grades matching answers against the saved shuffled choices', async () => {
    const questionSet = [{
      id: 1,
      prompt: 'Match each item.',
      type: 'match',
      items: ['Item A', 'Item B'],
      choices: ['Answer B', 'Answer A'],
      module: 'CCNA',
      topic: 'Addressing',
    }];
    prismaMock.examAttempt.findUnique.mockResolvedValue({
      id: 'attempt-id',
      userId: 7,
      examKey: 'short',
      questionSet,
      durationSeconds: 2700,
      deadline: new Date(Date.now() + 2700000),
      score: null,
      review: null,
      submittedAt: null,
    });
    prismaMock.questions.findMany.mockResolvedValue([{
      id: 1,
      module: 'CCNA',
      topic: 'Addressing',
      difficulty: 'Easy',
      question_text: 'Match each item.',
      choices: JSON.stringify(['Answer A', 'Answer B']),
      correct_answer: '[0,1]',
      explanation: 'Match each item to its answer.',
      question_type: 'match',
      match_items: ['Item A', 'Item B'],
    }]);

    const result = await service.submitExam('short', 'attempt-id', 7, [
      { questionId: 1, selectedMatches: [1, 0] },
    ]);

    expect(result.score).toBe(1);
    expect(result.review[0]).toMatchObject({
      type: 'match',
      selectedAnswer: [1, 0],
      correctAnswer: [1, 0],
      isCorrect: true,
    });
  });

  it('rejects an exam attempt owned by a different student', async () => {
    prismaMock.examAttempt.findUnique.mockResolvedValue({
      id: 'attempt-id',
      userId: 8,
      examKey: 'short',
      questionSet: [],
      durationSeconds: 2700,
      deadline: new Date(),
      score: null,
      review: null,
      submittedAt: null,
    });

    await expect(service.resumeExam('short', 'attempt-id', 7)).rejects.toThrow('Exam attempt not found.');
  });

  it('repairs the gradebook when resuming an already submitted attempt', async () => {
    const submittedAt = new Date();
    prismaMock.examAttempt.findUnique.mockResolvedValue({
      id: 'attempt-id',
      userId: 7,
      examKey: 'short',
      questionSet: [{
        id: 1,
        prompt: 'Question',
        options: ['A', 'B'],
        module: 'CCNA',
        topic: 'Routing',
      }],
      durationSeconds: 2700,
      deadline: new Date(Date.now() + 2700000),
      score: 1,
      review: [],
      submittedAt,
    });

    const result = await service.resumeExam('short', 'attempt-id', 7);

    expect(result.isSubmitted).toBe(true);
    expect(gradebookMock.recordAssessment).toHaveBeenCalledWith(7, 'ccna', {
      id: 'attempt-id',
      type: 'exam',
      programKey: 'ccna',
      examFormat: 'short',
      title: 'Short Exam',
      score: 1,
      maxScore: 1,
      submittedAt: submittedAt.getTime(),
    });
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
        {
          provide: GradebookService,
          useValue: { recordAssessment: vi.fn().mockResolvedValue(null) },
        },
      ],
    }).compile();

    const questionsService = module.get<QuestionsService>(QuestionsService);

    await expect(questionsService.findBank()).resolves.toEqual([{ ...row, imageUrl: signedUrl }]);
    expect(storage.createSignedQuestionImageUrls).toHaveBeenCalledWith([row.imageUrl]);
  });
});
