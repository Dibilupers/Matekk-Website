import { CCNA_MODULE_QUIZZES } from "./ccnaModuleQuizData";
import { CCNA_MEDIUM_EXAM_QUESTIONS } from "./ccnaMediumExamData";
import { CCNA_COMPOSITE_SET_QUESTIONS, CCNA_COMPOSITE_SET2_QUESTIONS } from "./ccnaCompositeSetQuestions";

export function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

export const CCNA_QUESTION_BANK = [
  ...CCNA_MODULE_QUIZZES.filter((quiz) => /^[1-6]\.0$/.test(quiz.number)).flatMap((quiz) =>
    quiz.questions.map((question) => ({
      ...question,
      moduleNumber: quiz.number,
      moduleTitle: quiz.title,
      source: "module-quiz",
    })),
  ),
  ...CCNA_COMPOSITE_SET_QUESTIONS.map((question) => ({
    ...question,
    source: "composite-set-a",
    moduleNumber: null,
    moduleTitle: "Composite Set A",
  })),
  ...CCNA_COMPOSITE_SET2_QUESTIONS.map((question) => ({
    ...question,
    source: "composite-set-b",
    moduleNumber: null,
    moduleTitle: "Composite Set B",
  })),
  ...CCNA_MEDIUM_EXAM_QUESTIONS.map((question) => ({
    ...question,
    source: "medium-exam",
    moduleNumber: null,
    moduleTitle: "Medium Exam",
  })),
];

export function pickRandomQuestions(sourceQuestions, count) {
  const selected = [];
  const seenPrompts = new Set();

  for (const question of shuffle([...sourceQuestions])) {
    if (selected.length >= count) break;
    const promptKey = typeof question.prompt === "string" ? question.prompt.trim() : "";
    if (promptKey && seenPrompts.has(promptKey)) continue;
    if (promptKey) seenPrompts.add(promptKey);
    selected.push(question);
  }

  return selected;
}

export function createShortExamQuestions() {
  const moduleQuestions = CCNA_QUESTION_BANK.filter((question) => {
    const moduleNumber = question.moduleNumber;
    return typeof moduleNumber === "string" && /^([1-6])\.0$/.test(moduleNumber);
  });

  return pickRandomQuestions(moduleQuestions, 50);
}

export function createMediumExamQuestions() {
  return pickRandomQuestions(CCNA_QUESTION_BANK, 100);
}

export function createLongExamQuestions() {
  return pickRandomQuestions(CCNA_QUESTION_BANK, 150);
}
