import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomInt, randomUUID } from 'node:crypto';
import { isGroupMatch, parseDragDropAnswer, pickLineMatchIds } from './drag-drop-answer.js';
import { CreateQuestionDto, ExamAnswerDto } from './dto/questions.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import type { Prisma } from '../generated/prisma/client.js';
import { GradebookService } from '../gradebook/gradebook.service.js';

const EXAM_CONFIG = {
  short: { questionCount: 50, durationSeconds: 45 * 60, title: 'Short Exam' },
  medium: { questionCount: 100, durationSeconds: 90 * 60, title: 'Medium Exam' },
  long: { questionCount: 150, durationSeconds: 120 * 60, title: 'Long Exam' },
} as const;

type ExamKey = keyof typeof EXAM_CONFIG;
type ExamQuestionBase = {
  id: number;
  prompt: string;
  imageUrl?: string | null;
  options: string[];
  module: string | null;
  topic: string | null;
};
type SingleExamQuestion = ExamQuestionBase & { type: 'single' };
type MatchExamQuestion = Omit<ExamQuestionBase, 'options'> & {
  type: 'match' | 'drag_drop' | 'click_boxes';
  items: string[];
  choices: string[];
  // "Type the numbers" questions: how many items go in each box (keyed by box name). Only the counts,
  // never which item goes where, so the exam can show the right number of slots like the real exam.
  groupCounts?: Record<string, number>;
  // 'lines': shown as "connect the circles" instead of click-to-place boxes (see pickLineMatchIds)
  matchStyle?: 'lines' | 'numbers';
};
type ExamQuestion = SingleExamQuestion | MatchExamQuestion;

@Injectable()
export class QuestionsService {
  constructor(
    private prisma: PrismaService,
    private storage: StorageService,
    private gradebook: GradebookService,
  ) {}

  create(data: CreateQuestionDto) {
    const questionType = data.question_type ?? 'single';
    let correctAnswer: string;
    if (questionType === 'match') {
      if (
        !data.match_items ||
        !data.match_answer ||
        data.match_items.length !== data.match_answer.length ||
        data.choices.some((choice) => !choice.trim()) ||
        new Set(data.choices).size !== data.choices.length ||
        data.match_items.some((item) => !item.trim()) ||
        data.match_answer.some((answer) =>
          !Number.isInteger(answer) || answer < 0 || answer >= data.choices.length,
        )
      ) {
        throw new BadRequestException('Each matching item must have a valid answer choice.');
      }
      correctAnswer = JSON.stringify(data.match_answer);
    } else if (!data.correct_answer || !data.choices.includes(data.correct_answer)) {
      throw new BadRequestException('The correct answer must be one of the question choices.');
    } else {
      correctAnswer = data.correct_answer;
    }

    return this.prisma.questions.create({
      data: {
        module: data.module,
        topic: data.topic,
        difficulty: data.difficulty,
        question_text: data.question_text,
        choices: JSON.stringify(data.choices),
        correct_answer: correctAnswer,
        explanation: data.explanation,
        question_type: questionType,
        ...(questionType === 'match' ? { match_items: data.match_items } : {}),
      },
    });
  }

  findAll() {
    return this.prisma.questions.findMany();
  }

  async startExam(examKey: string, userId: number) {
    const config = this.getExamConfig(examKey);
    const bank = await this.prisma.questions.findMany();
    const seenPrompts = new Set<string>();
    const readableQuestions = bank.flatMap((record) => {
      const question = this.readQuestion(record);
      return question ? [question] : [];
    }).filter((question) => {
      const promptKey = question.prompt.replace(/\s+/g, ' ').trim().toLowerCase();
      if (seenPrompts.has(promptKey)) return false;
      seenPrompts.add(promptKey);
      return true;
    });
    const lineMatchIds = pickLineMatchIds(
      readableQuestions.filter((question): question is MatchExamQuestion => question.type === 'match'),
    );
    const usableQuestions: ExamQuestion[] = readableQuestions.map((question) => {
      if (question.type !== 'match' || question.matchStyle === 'numbers') return question;
      if (lineMatchIds.has(question.id) || question.choices.length > question.items.length) {
        return { ...question, matchStyle: 'lines' as const };
      }
      if (question.items.length === question.choices.length) {
        return { ...question, type: 'click_boxes' as const };
      }
      return question;
    });

    if (usableQuestions.length < config.questionCount) {
      throw new BadRequestException(
        bank.length === 0
          ? `This exam requires ${config.questionCount} questions, but the Questions table is empty.`
          : `This exam requires ${config.questionCount} valid questions. The Questions table has ${bank.length} rows, but only ${usableQuestions.length} have a readable prompt, choices, and matching correct answer.`,
      );
    }

    // Persist each randomized set so a resumed attempt keeps the same questions and option order.
    const questionBlocks = config.questionCount / 50;
    const matchingCount = questionBlocks * 5;
    const matchingQuestions = usableQuestions.filter((question) => question.type !== 'single');
    const singleQuestions = usableQuestions.filter((question) => question.type === 'single');
    if (matchingQuestions.length < matchingCount || singleQuestions.length < config.questionCount - matchingCount) {
      throw new BadRequestException(
        `This exam requires ${matchingCount} matching questions and ${config.questionCount - matchingCount} multiple-choice questions. ` +
        `The Questions table has ${matchingQuestions.length} valid matching questions and ${singleQuestions.length} valid multiple-choice questions.`,
      );
    }

    const numberQuestions = matchingQuestions.filter((question) =>
      question.type === 'match' && (question.matchStyle === 'numbers' || isGroupMatch(question)),
    );
    const boxQuestions = matchingQuestions.filter((question) => question.type === 'click_boxes');
    const dragDropQuestions = matchingQuestions.filter((question) => question.type === 'drag_drop');
    const lineQuestions = matchingQuestions.filter((question) =>
      question.type === 'match' && question.matchStyle === 'lines',
    );
    const requiredQuestionTypes = [
      ['number', numberQuestions],
      ['box', boxQuestions],
      ['drag-and-drop', dragDropQuestions],
      ['matching', lineQuestions],
    ] as const;
    const shortage = requiredQuestionTypes.find(([, questions]) => questions.length < questionBlocks);
    if (shortage) {
      throw new BadRequestException(
        `Every 50-question exam block requires at least one ${shortage[0]} question. ` +
        `The Questions table has ${shortage[1].length} valid ${shortage[0]} question(s), but ${questionBlocks} are required.`,
      );
    }
    const guaranteedTypes = requiredQuestionTypes.map(([, questions]) =>
      this.shuffle(questions).slice(0, questionBlocks),
    );
    const reservedIds = new Set(guaranteedTypes.flatMap((questions) => questions.map(({ id }) => id)));
    const remainingMatches = this.shuffle(matchingQuestions.filter((question) => !reservedIds.has(question.id)));
    const randomizedMatches = Array.from({ length: questionBlocks }, (_, blockIndex) => {
      const guaranteed = guaranteedTypes.map((questions) => questions[blockIndex]);
      return [...guaranteed, ...remainingMatches.splice(0, 5 - guaranteed.length)];
    }).flat();
    const randomizedSingles = this.shuffle(singleQuestions);
    const selectedQuestions = Array.from({ length: questionBlocks }, (_, blockIndex) => [
      ...randomizedMatches.slice(blockIndex * 5, (blockIndex + 1) * 5),
      ...randomizedSingles.slice(blockIndex * 45, (blockIndex + 1) * 45),
    ]).flatMap((block) => this.shuffle(block));
    const questionSet = selectedQuestions.map((question) =>
      question.type !== 'single'
        ? { ...question, choices: this.shuffle(question.choices) }
        : { ...question, options: this.shuffle(question.options) },
    );
    const startedAt = new Date();
    const deadline = new Date(startedAt.getTime() + config.durationSeconds * 1000);
    const attempt = await this.prisma.examAttempt.create({
      data: {
        id: randomUUID(),
        userId,
        examKey,
        questionSet: questionSet satisfies Prisma.InputJsonValue,
        durationSeconds: config.durationSeconds,
        deadline,
      },
    });

    return this.toAttemptResponse(attempt, questionSet);
  }

  async resumeExam(examKey: string, attemptId: string, userId: number) {
    this.getExamConfig(examKey);
    const attempt = await this.prisma.examAttempt.findUnique({ where: { id: attemptId } });
    if (!attempt || attempt.userId !== userId || attempt.examKey !== examKey) {
      throw new NotFoundException('Exam attempt not found.');
    }

    const questionSet = this.parseQuestionSet(attempt.questionSet);
    if (attempt.submittedAt) {
      await this.recordGradebookResult(attempt, examKey, userId);
    }
    return this.toAttemptResponse(attempt, questionSet);
  }

  async submitExam(
    examKey: string,
    attemptId: string,
    userId: number,
    answers: ExamAnswerDto[],
  ) {
    this.getExamConfig(examKey);
    const attempt = await this.prisma.examAttempt.findUnique({ where: { id: attemptId } });
    if (!attempt || attempt.userId !== userId || attempt.examKey !== examKey) {
      throw new NotFoundException('Exam attempt not found.');
    }
    // Return the original result for retries instead of grading or recording a second submission.
    if (attempt.submittedAt) {
      await this.recordGradebookResult(attempt, examKey, userId);
      return this.toAttemptResponse(attempt, this.parseQuestionSet(attempt.questionSet));
    }

    const questionSet = this.parseQuestionSet(attempt.questionSet);
    const questionIds = new Set(questionSet.map(({ id }) => id));
    const submittedIds = new Set(answers.map(({ questionId }) => questionId));
    if (
      submittedIds.size !== answers.length ||
      answers.some(({ questionId }) => !questionIds.has(questionId))
    ) {
      throw new BadRequestException('Submitted answers do not match this exam attempt.');
    }

    const answerById = new Map(answers.map(({ questionId, selectedAnswer, selectedMatches }) => [
      questionId,
      selectedMatches ?? selectedAnswer ?? null,
    ]));
    const databaseQuestions = await this.prisma.questions.findMany({
      where: { id: { in: questionSet.map(({ id }) => id) } },
    });
    const sourceById = new Map(databaseQuestions.map((question) => [question.id, question]));
    const review = questionSet.map((question) => {
      const source = sourceById.get(question.id);
      const selectedAnswer = answerById.get(question.id) ?? null;
      if (!source || !source.correct_answer) {
        throw new InternalServerErrorException('A question in this exam is no longer available for grading.');
      }

      if (question.type !== 'single') {
        // PDF drag-and-drop rows: the choices and answer come from the answer text itself
        const dragDrop = source.choices?.trim() ? null : parseDragDropAnswer(source.correct_answer, source.id);
        const originalChoices = dragDrop ? dragDrop.choices : this.parseChoices(source.choices);
        if (!originalChoices) {
          throw new InternalServerErrorException('A matching question has invalid choices.');
        }
        const correctIndexes = dragDrop
          ? dragDrop.answer
          : this.parseMatchAnswer(source.correct_answer, question.items.length, originalChoices.length);
        const correctAnswer = correctIndexes.map((index) => question.choices.indexOf(originalChoices[index]));
        if (correctAnswer.some((index) => index < 0)) {
          throw new InternalServerErrorException('A matching answer is no longer available for grading.');
        }
        if (
          selectedAnswer !== null &&
          (!Array.isArray(selectedAnswer) ||
            selectedAnswer.length !== question.items.length ||
            selectedAnswer.some((index) =>
              index !== null &&
              (!Number.isInteger(index) || index < 0 || index >= question.choices.length),
            ))
        ) {
          throw new BadRequestException('A matching answer is not one of the choices for this exam.');
        }
        const selectedMatches = Array.isArray(selectedAnswer) ? selectedAnswer : null;
        const isCorrect = selectedMatches !== null &&
          correctAnswer.every((answer, index) => selectedMatches[index] === answer);
        return {
          id: question.id,
          prompt: question.prompt,
          imageUrl: question.imageUrl,
          type: question.type,
          items: question.items,
          choices: question.choices,
          selectedAnswer: selectedMatches,
          correctAnswer,
          module: question.module,
          topic: question.topic,
          explanation: source.explanation ?? '',
          isCorrect,
        };
      }

      const correctAnswer = this.findCorrectOption(question.options, source.correct_answer);
      if (!correctAnswer) {
        throw new InternalServerErrorException('A question in this exam is no longer available for grading.');
      }
      if (selectedAnswer !== null && (typeof selectedAnswer !== 'string' || !question.options.includes(selectedAnswer))) {
        throw new BadRequestException('An answer is not one of the choices for this exam.');
      }
      const selectedOption = typeof selectedAnswer === 'string' ? selectedAnswer : null;
      return {
        id: question.id,
        prompt: question.prompt,
        imageUrl: question.imageUrl,
        type: question.type,
        options: question.options,
        module: question.module,
        topic: question.topic,
        selectedAnswer: selectedOption,
        correctAnswer: correctAnswer,
        explanation: source.explanation ?? '',
        isCorrect: selectedOption === correctAnswer,
      };
    });
    const score = review.reduce((total, question) => total + Number(question.isCorrect), 0);
    const submittedAt = new Date();
    // Conditional update ensures only one concurrent request can finalize this attempt.
    const saved = await this.prisma.examAttempt.updateMany({
      where: { id: attemptId, userId, submittedAt: null },
      data: { score, review, submittedAt },
    });

    if (saved.count === 0) {
      const alreadySubmitted = await this.prisma.examAttempt.findUnique({ where: { id: attemptId } });
      if (!alreadySubmitted) throw new NotFoundException('Exam attempt not found.');
      await this.recordGradebookResult(alreadySubmitted, examKey, userId);
      return this.toAttemptResponse(alreadySubmitted, this.parseQuestionSet(alreadySubmitted.questionSet));
    }

    const submittedAttempt = { ...attempt, score, review, submittedAt };
    await this.recordGradebookResult(submittedAttempt, examKey, userId);
    return this.toAttemptResponse(
      submittedAttempt,
      questionSet,
    );
  }

  private async recordGradebookResult(
    attempt: {
      id: string;
      score: number | null;
      submittedAt: Date | null;
      questionSet: Prisma.JsonValue;
    },
    examKey: string,
    userId: number,
  ) {
    if (attempt.score === null || !attempt.submittedAt) {
      throw new InternalServerErrorException('The submitted exam result is incomplete.');
    }
    const config = this.getExamConfig(examKey);
    const questionSet = this.parseQuestionSet(attempt.questionSet);
    await this.gradebook.recordAssessment(userId, 'ccna', {
      id: attempt.id,
      type: 'exam',
      programKey: 'ccna',
      examFormat: examKey,
      title: config.title,
      score: attempt.score,
      maxScore: questionSet.length,
      submittedAt: attempt.submittedAt.getTime(),
    });
  }

  private getExamConfig(examKey: string) {
    if (!Object.hasOwn(EXAM_CONFIG, examKey)) {
      throw new BadRequestException('Choose a valid exam format.');
    }
    return EXAM_CONFIG[examKey as ExamKey];
  }

  private readQuestion(record: {
    id: number;
    question_text: string | null;
    choices: string | null;
    question_type?: string | null;
    match_items?: Prisma.JsonValue | null;
    module: string | null;
    topic: string | null;
    correct_answer: string | null;
    imageUrl?: string | null;
  }): ExamQuestion | null {
    if (record.id === 1306 && record.question_text?.trim()) {
      return {
        id: record.id,
        prompt: record.question_text.trim(),
        type: 'match',
        items: [
          '10.1.255.254/24',
          '10.63.255.255/10',
          '172.16.255.39/29',
          '172.20.255.255/16',
          '192.168.1.10/24',
          '192.168.255.127/25',
        ],
        choices: ['Broadcast address', 'Not used'],
        groupCounts: { 'Broadcast address': 4, 'Not used': 2 },
        matchStyle: 'numbers',
        module: record.module,
        topic: record.topic,
      };
    }
    if (record.id === 720 && record.question_text?.trim() && record.choices) {
      const options = this.parseChoices(record.choices);
      if (
        !options ||
        options.length < 2 ||
        options.length > 8 ||
        !options.every((option) => option.trim().length > 0)
      ) {
        return null;
      }
      return {
        id: record.id,
        prompt: record.question_text.trim(),
        imageUrl: record.imageUrl ?? null,
        type: 'single',
        options,
        module: record.module,
        topic: record.topic,
      };
    }

    if (record.id === 181 && record.question_text?.trim()) {
      return {
        id: record.id,
        prompt: record.question_text.trim(),
        type: 'match',
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
        matchStyle: 'numbers',
        module: record.module,
        topic: record.topic,
      };
    }

    if (record.id === 382 && record.question_text?.trim()) {
      const choices = ['Ansible feature', 'Not an Ansible feature'];
      return {
        id: record.id,
        prompt: 'Classify each statement as an Ansible feature or not an Ansible feature.',
        type: 'match',
        items: [
          'Uses the YAML language',
          'Executes modules via SSH by default',
          'Pushes configurations to the client',
          'Uses agents to manage hosts',
          'Requires clients to pull configurations from the server',
          'Operates without agents',
        ],
        choices,
        groupCounts: { 'Ansible feature': 4, 'Not an Ansible feature': 2 },
        matchStyle: 'numbers',
        module: record.module,
        topic: record.topic,
      };
    }

    if (record.id === 608 && record.question_text?.trim()) {
      return {
        id: record.id,
        prompt: record.question_text.trim(),
        type: 'match',
        items: [
          'Supports automation',
          'Communicates between the SDN controller and the application plane',
          'Communicates between the SDN controller and the data plane',
          'Supports data sharing between systems',
          'Supports network virtualization protocols',
          'Supports REST-based requirements',
          'Uses OpenFlow to interface between the data and control planes',
        ],
        choices: ['1', '2', '3', '4', 'Not used'],
        groupCounts: { '1': 1, '2': 1, '3': 1, '4': 1, 'Not used': 3 },
        matchStyle: 'numbers',
        module: record.module,
        topic: record.topic,
      };
    }

    if (record.id === 481 && record.question_text?.trim()) {
      const choices = ['R1', 'R2', 'R3', 'Not used'];
      return {
        id: record.id,
        prompt: 'An engineer must configure a static network route between two networks so that host A communicates with host B. Assign the commands to the routers where they must be configured. Not all commands are used.',
        type: 'match',
        items: [
          'ip route 10.10.13.0 255.255.255.128 10.10.10.1',
          'ip route 10.10.13.0 255.255.255.128 10.10.10.5',
          'ip route 10.10.13.10 255.255.255.255 10.10.10.1',
          'ip route 10.10.14.0 255.255.255.0 10.10.10.2',
          'ip route 10.10.14.0 255.255.255.0 10.10.10.6',
          'ip route 10.10.14.10 255.255.255.255 10.10.10.6',
        ],
        choices,
        groupCounts: { R1: 1, R2: 2, R3: 1, 'Not used': 2 },
        matchStyle: 'numbers',
        module: record.module,
        topic: record.topic,
      };
    }

    // Drag-and-drop questions imported from the PDFs keep their answer as text and have no choices.
    if (record.question_text?.trim() && !record.choices?.trim() && (!record.question_type || record.question_type === 'single')) {
      const dragDrop = parseDragDropAnswer(record.correct_answer, record.id);
      return dragDrop
        ? {
          id: record.id,
          prompt: record.question_text.trim(),
          imageUrl: record.imageUrl ?? null,
          type: dragDrop.matchStyle === 'numbers' ? 'match' : 'drag_drop',
          items: dragDrop.items,
          choices: dragDrop.choices,
          ...(dragDrop.matchStyle === 'numbers'
            ? {
                groupCounts: Object.fromEntries(
                  dragDrop.choices.map((choice, index) => [
                    choice,
                    dragDrop.answer.filter((answer) => answer === index).length,
                  ]),
                ),
                matchStyle: 'numbers' as const,
              }
            : {}),
          module: record.module,
          topic: record.topic,
        }
        : null;
    }

    // Ignore malformed bank rows so only questions that can be safely rendered and graded are selected.
    if (!record.question_text?.trim() || !record.choices || !record.correct_answer) return null;

    const options = this.parseChoices(record.choices);
    if (record.question_type === 'match') {
      const items = record.match_items;
      const matchItems = Array.isArray(items)
        ? items.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
        : [];
      if (
        !options ||
        options.length < 2 ||
        options.length > 8 ||
        !options.every((option) => option.trim().length > 0) ||
        new Set(options).size !== options.length ||
        !Array.isArray(items) ||
        matchItems.length !== items.length ||
        matchItems.length < 2 ||
        matchItems.length > 8 ||
        new Set(matchItems).size !== matchItems.length
      ) {
        return null;
      }
      try {
        this.parseMatchAnswer(record.correct_answer, matchItems.length, options.length);
      } catch {
        return null;
      }
      return {
        id: record.id,
        prompt: record.question_text.trim(),
        imageUrl: record.imageUrl ?? null,
        type: 'match',
        items: matchItems,
        choices: options,
        module: record.module,
        topic: record.topic,
      };
    }
    if (record.question_type && record.question_type !== 'single') return null;
    if (
      !Array.isArray(options) ||
      options.length < 2 ||
      options.length > 8 ||
      !options.every((option): option is string => typeof option === 'string' && option.trim().length > 0) ||
      !this.findCorrectOption(options, record.correct_answer)
    ) {
      return null;
    }

    return {
      id: record.id,
      prompt: record.question_text.trim(),
      imageUrl: record.imageUrl ?? null,
      type: 'single',
      options,
      module: record.module,
      topic: record.topic,
    };
  }

  private parseChoices(value: string | null): string[] | null {
    if (!value) return null;
    try {
      const parsed: unknown = JSON.parse(value);
      const choices = Array.isArray(parsed)
        ? parsed
        : parsed && typeof parsed === 'object'
          ? Object.values(parsed)
          : null;
      return Array.isArray(choices) &&
        choices.every((choice): choice is string => typeof choice === 'string')
        ? choices
        : null;
    } catch {
      return null;
    }
  }

  private parseMatchAnswer(answer: string, itemCount: number, choiceCount: number): number[] {
    let parsed: unknown;
    try {
      parsed = JSON.parse(answer);
    } catch {
      throw new Error('The matching answer key is invalid.');
    }
    if (
      !Array.isArray(parsed) ||
      parsed.length !== itemCount ||
      !parsed.every((index) => Number.isInteger(index) && index >= 0 && index < choiceCount)
    ) {
      throw new Error('The matching answer key is invalid.');
    }
    return parsed;
  }

  private findCorrectOption(options: string[], answer: string): string | null {
    const normalizedAnswer = answer.trim();
    const exactMatch = options.find((option) => option.trim().toLocaleLowerCase() === normalizedAnswer.toLocaleLowerCase());
    if (exactMatch) return exactMatch;

    const letterMatch = normalizedAnswer.match(/^\(?([a-h])\)?(?:[.)])?$/i);
    if (letterMatch) {
      const letter = letterMatch[1].toLocaleUpperCase();
      const labeledOption = options.find((option) =>
        new RegExp(`^\\s*\\(?${letter}\\)?[.)\\s:-]+`, 'i').test(option),
      );
      if (labeledOption) return labeledOption;
      const index = letter.charCodeAt(0) - 'A'.charCodeAt(0);
      if (index >= 0 && index < options.length) return options[index];
    }

    const indexMatch = normalizedAnswer.match(/^\(?(-?\d+)\)?(?:[.)])?$/);
    if (indexMatch) {
      const numericIndex = Number(indexMatch[1]);
      if (Number.isInteger(numericIndex)) {
        if (numericIndex >= 1 && numericIndex <= options.length) return options[numericIndex - 1];
        if (numericIndex >= 0 && numericIndex < options.length) return options[numericIndex];
      }
    }

    return null;
  }

  private parseQuestionSet(value: Prisma.JsonValue): ExamQuestion[] {
    if (!Array.isArray(value)) {
      throw new InternalServerErrorException('The saved exam attempt has invalid questions.');
    }
    return value.map((item) => {
      if (
        !item ||
        typeof item !== 'object' ||
        !('id' in item) ||
        !('prompt' in item) ||
        typeof item.id !== 'number' ||
        typeof item.prompt !== 'string' ||
        !('module' in item) ||
        !(typeof item.module === 'string' || item.module === null) ||
        !('topic' in item) ||
        !(typeof item.topic === 'string' || item.topic === null)
      ) {
        throw new InternalServerErrorException('The saved exam attempt has invalid questions.');
      }
      const type = 'type' in item &&
        (item.type === 'match' || item.type === 'drag_drop' || item.type === 'click_boxes')
        ? item.type
        : 'single';
      if (type !== 'single') {
        if (
          !('items' in item) ||
          !Array.isArray(item.items) ||
          !item.items.every((matchItem): matchItem is string => typeof matchItem === 'string') ||
          !item.items.length ||
          item.items.length > 8 ||
          !('choices' in item) ||
          !Array.isArray(item.choices) ||
          item.choices.length < 2 ||
          item.choices.length > 8 ||
          !item.choices.every((choice): choice is string => typeof choice === 'string')
        ) {
          throw new InternalServerErrorException('The saved exam attempt has invalid questions.');
        }
        const groupCounts = 'groupCounts' in item && item.groupCounts && typeof item.groupCounts === 'object' && !Array.isArray(item.groupCounts)
          ? Object.fromEntries(Object.entries(item.groupCounts).filter((entry): entry is [string, number] => typeof entry[1] === 'number'))
          : undefined;
        return {
          id: item.id,
          prompt: item.prompt,
          imageUrl: 'imageUrl' in item && (typeof item.imageUrl === 'string' || item.imageUrl === null)
            ? item.imageUrl
            : null,
          type,
          items: item.items,
          choices: item.choices,
          ...(groupCounts ? { groupCounts } : {}),
          ...('matchStyle' in item && (item.matchStyle === 'lines' || item.matchStyle === 'numbers')
            ? { matchStyle: item.matchStyle }
            : {}),
          module: item.module,
          topic: item.topic,
        };
      }
      if (
        !('options' in item) ||
        !Array.isArray(item.options) ||
        item.options.length < 2 ||
        item.options.length > 8 ||
        !item.options.every((option): option is string => typeof option === 'string')
      ) {
        throw new InternalServerErrorException('The saved exam attempt has invalid questions.');
      }
      return {
        id: item.id,
        prompt: item.prompt,
        imageUrl: 'imageUrl' in item && (typeof item.imageUrl === 'string' || item.imageUrl === null)
          ? item.imageUrl
          : null,
        type: 'single',
        options: item.options,
        module: item.module,
        topic: item.topic,
      };
    });
  }

  private async toAttemptResponse(
    attempt: {
      id: string;
      examKey: string;
      durationSeconds: number;
      deadline: Date;
      score: number | null;
      review: Prisma.JsonValue | null;
      submittedAt: Date | null;
    },
    questions: ExamQuestion[],
  ) {
    const imagePaths = [...new Set(questions.flatMap((question) =>
      question.imageUrl && !/^https?:\/\//i.test(question.imageUrl) ? [question.imageUrl] : [],
    ))];
    const signedImageUrls = await this.storage.createSignedQuestionImageUrls(imagePaths);
    const signedQuestions = questions.map((question) => ({
      ...question,
      imageUrl: question.imageUrl && !/^https?:\/\//i.test(question.imageUrl)
        ? signedImageUrls.get(question.imageUrl) ?? question.imageUrl
        : question.imageUrl ?? null,
    }));
    const signedImageByQuestionId = new Map(
      signedQuestions.map((question) => [question.id, question.imageUrl]),
    );
    const review = Array.isArray(attempt.review)
      ? attempt.review.map((entry) => {
        if (entry === null || Array.isArray(entry) || typeof entry !== 'object') return entry;
        const questionId = entry.id;
        if (typeof questionId !== 'number') return entry;
        const imageUrl = signedImageByQuestionId.get(questionId);
        return imageUrl ? { ...entry, imageUrl } : entry;
      })
      : attempt.review;

    // Keep correct answers out of start/resume responses; include them only in the post-submit review.
    return {
      attemptId: attempt.id,
      examKey: attempt.examKey,
      durationSeconds: attempt.durationSeconds,
      deadline: attempt.deadline.getTime(),
      score: attempt.score,
      review,
      submittedAt: attempt.submittedAt?.getTime() ?? null,
      isSubmitted: attempt.submittedAt !== null,
      questions: signedQuestions.map((question) =>
        question.type !== 'single'
          ? {
              id: question.id,
              prompt: question.prompt,
              imageUrl: question.imageUrl,
              type: question.type,
              items: question.items,
              choices: question.choices,
              ...(question.groupCounts
                ? { groupSizes: question.choices.map((choice) => question.groupCounts?.[choice] ?? 0) }
                : {}),
              ...(question.matchStyle ? { matchStyle: question.matchStyle } : {}),
              module: question.module,
              topic: question.topic,
            }
          : {
              id: question.id,
              prompt: question.prompt,
              imageUrl: question.imageUrl,
              type: question.type,
              options: question.options,
              module: question.module,
              topic: question.topic,
            },
      ),
    };
  }

  private shuffle<T>(items: T[]): T[] {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const nextIndex = randomInt(index + 1);
      [shuffled[index], shuffled[nextIndex]] = [shuffled[nextIndex], shuffled[index]];
    }
    return shuffled;
  }

  // The full CCNA question bank used by the exams
  async findBank(module = 'CCNA') {
    const rows = await this.prisma.questions.findMany({
      where: this.getQuestionModuleFilter(module),
      select: {
        id: true,
        module: true,
        topic: true,
        question_text: true,
        choices: true,
        correct_answer: true,
        explanation: true,
        question_type: true,
        match_items: true,
        imageUrl: true,
      },
      orderBy: { id: 'asc' },
    });
    const imagePaths = [...new Set(rows.flatMap((row) => {
      const imageUrl = row.imageUrl;
      return imageUrl && !/^https?:\/\//i.test(imageUrl) ? [imageUrl] : [];
    }))];
    const signedUrls = await this.storage.createSignedQuestionImageUrls(imagePaths);

    return rows.map((row) => ({
      ...row,
      imageUrl: row.imageUrl ? signedUrls.get(row.imageUrl) ?? row.imageUrl : null,
    }));
  }

  async findUsableBank(module = 'CCNA') {
    const rows = await this.findBank(module);
    const questions = rows.flatMap((row) => {
      const question = this.readMultiSelectQuestion(row) ?? this.readQuestion(row);
      if (!question) return [];

      const answer = row.id === 1306
        ? [1, 0, 0, 0, 1, 0]
        : row.id === 720
        ? 0
        : row.id === 181
        ? [0, 0, 1, 1, 0, 0]
        : row.id === 382
        ? [0, 0, 0, 1, 1, 0]
        : row.id === 608
        ? [0, 1, 4, 4, 2, 3, 4]
        : row.id === 481
        ? [0, 1, 1, 2, 3, 3]
        : question.type !== 'single'
        ? question.type === 'multi'
          ? question.answer
          : row.question_type === 'match'
          ? this.parseMatchAnswer(row.correct_answer, question.items.length, question.choices.length)
          : parseDragDropAnswer(row.correct_answer, row.id)?.answer
        : question.type === 'single'
          ? question.options.indexOf(this.findCorrectOption(question.options, row.correct_answer) ?? '')
          : -1;
      if (answer === undefined || answer === -1 || (Array.isArray(answer) && answer.length === 0)) return [];

      return [{
        ...question,
        bankId: row.id,
        answer,
        explanation: row.explanation,
        source: 'question-bank',
      }];
    });
    return { questions, skippedCount: rows.length - questions.length };
  }

  private readMultiSelectQuestion(record: {
    id: number;
    module: string | null;
    topic: string | null;
    question_text: string | null;
    choices: string | null;
    correct_answer: string | null;
    question_type?: string | null;
    explanation?: string | null;
  }) {
    if (
      record.module?.toLocaleLowerCase() !== 'ccna' &&
      !record.module?.toLocaleLowerCase().startsWith('ccna part ') &&
      !record.module?.toLocaleLowerCase().startsWith('ccna 200-301 set ')
    ) {
      return null;
    }
    if (
      (record.question_type && record.question_type !== 'single') ||
      !record.question_text?.trim() ||
      !record.choices?.trim() ||
      !record.correct_answer?.trim()
    ) {
      return null;
    }

    const selectionCount = record.question_text.match(/\b(?:choose|select)\s+(two|three|\d+)\b/i)?.[1];
    const requiredSelections = selectionCount === 'two'
      ? 2
      : selectionCount === 'three'
        ? 3
        : Number(selectionCount);
    if (!Number.isInteger(requiredSelections) || requiredSelections < 2) return null;

    let parsedChoices: unknown;
    try {
      parsedChoices = JSON.parse(record.choices);
    } catch {
      return null;
    }
    if (!parsedChoices || typeof parsedChoices !== 'object' || Array.isArray(parsedChoices)) return null;

    const entries = Object.entries(parsedChoices);
    const options = entries.map(([, option]) => option);
    if (
      options.length < requiredSelections ||
      options.length > 8 ||
      !options.every((option): option is string => typeof option === 'string' && option.trim().length > 0)
    ) {
      return null;
    }

    const answerKeys = record.correct_answer.split(/\s*[,;/+&]\s*/).map((key) => key.trim().toUpperCase());
    if (
      answerKeys.length !== requiredSelections ||
      new Set(answerKeys).size !== answerKeys.length ||
      !answerKeys.every((key) => /^[A-H]$/.test(key))
    ) {
      return null;
    }
    const answer = answerKeys.map((key) => entries.findIndex(([choiceKey]) => choiceKey.toUpperCase() === key));
    if (answer.some((index) => index < 0)) return null;

    return {
      id: record.id,
      prompt: record.question_text.trim(),
      type: 'multi' as const,
      options,
      answer,
      module: record.module,
      topic: record.topic,
    };
  }

  private getQuestionModuleFilter(module: string): Prisma.QuestionsWhereInput {
    const normalizedModule = module.trim();
    if (!normalizedModule) {
      throw new BadRequestException('Choose a course question bank.');
    }
    if (normalizedModule.toLocaleLowerCase() === 'ccna') {
      return {
        OR: [
          { module: { equals: 'CCNA', mode: 'insensitive' } },
          { module: { startsWith: 'CCNA Part ', mode: 'insensitive' } },
          { module: { startsWith: 'CCNA 200-301 Set ', mode: 'insensitive' } },
        ],
      };
    }
    return { module: { equals: normalizedModule, mode: 'insensitive' } };
  }
}
