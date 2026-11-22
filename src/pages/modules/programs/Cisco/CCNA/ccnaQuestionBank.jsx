import { CCNA_MODULE_QUIZZES } from "./ccnaModuleQuizData";
import { CCNA_MEDIUM_EXAM_QUESTIONS } from "./ccnaMediumExamData";
import {
  CCNA_COMPOSITE_SET_QUESTIONS,
  CCNA_COMPOSITE_SET2_QUESTIONS,
  applyNativeExhibit,
} from "./ccnaCompositeSetQuestions";
import { CCNA_LEGACY_QUESTIONS } from "./ccnaLegacyQuestions";
import { CCNA_LEGACY_200_301_QUESTIONS } from "./ccnaLegacyQuestionBank";
import { splitPromptExhibit } from "../../../../../utils/splitPromptExhibit";
import { findCcnaQuestionExplanation } from "../../../../../utils/ccnaQuestionExplanations";
import { getCcnaExhibitImageByLegacyIndex } from "../../../../../utils/ccnaExhibitImages";
import { shuffleMatchingChoices } from "./ccnaMatchingChoices";

// Both legacy files come from the same CCNA 200-301 PDF. CCNA_LEGACY_QUESTIONS is the fuller set
// (with explanations), so only questions it is missing are taken from the other file.
const legacyPromptKey = (prompt) => prompt.replace(/\s+/g, " ").trim().toLowerCase();
const LEGACY_PROMPTS = new Set(CCNA_LEGACY_QUESTIONS.map((question) => legacyPromptKey(question.prompt)));
const CCNA_LEGACY_ALL_QUESTIONS = [
  ...CCNA_LEGACY_QUESTIONS,
  ...CCNA_LEGACY_200_301_QUESTIONS.filter((question) => !LEGACY_PROMPTS.has(legacyPromptKey(question.prompt))),
];

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
  // Kept tagged so older CCNA 200-301 questions remain identifiable in the shared bank.
  ...CCNA_LEGACY_ALL_QUESTIONS.map((question) => {
    const nativeExhibit = applyNativeExhibit(question);
    const questionWithExhibit = {
      ...question,
      // Router output pasted into the question text moves into the exhibit box
      ...(question.exhibit ? {} : splitPromptExhibit(question.prompt)),
      ...nativeExhibit,
    };
    const exhibitImage =
      /\bexhibit\b/i.test(questionWithExhibit.prompt) &&
      !questionWithExhibit.hideExhibitImage &&
      !questionWithExhibit.exhibitDiagram
      ? getCcnaExhibitImageByLegacyIndex(question.legacyIndex)
      : null;

    return {
      ...questionWithExhibit,
      ...(!questionWithExhibit.exhibitImage && exhibitImage ? { exhibitImage } : {}),
      source: "legacy-ccna-200-301",
      moduleNumber: null,
      moduleTitle: "Legacy CCNA 200-301",
    };
  })
    // Skip questions whose exhibit picture was lost when they were taken from the PDF (they can't be answered)
    .filter((question) =>
      !/\bexhibit\b/i.test(question.prompt) ||
      question.exhibit ||
      question.exhibitImage ||
      question.exhibitDiagram ||
      question.hideExhibitImage,
    ),
// Questions without their own explanation borrow one from the same question elsewhere in the site
].map((question) => ({
  ...question,
  explanation: question.explanation?.trim() || findCcnaQuestionExplanation(question.prompt),
}));

const SHORT_EXAM_SOURCES = new Set(["legacy-ccna-200-301"]);

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

function getUniqueQuestions(sourceQuestions) {
  const seenPrompts = new Set();
  return sourceQuestions.filter((question) => {
    const promptKey = typeof question.prompt === "string" ? question.prompt.trim().toLowerCase() : "";
    if (!promptKey || seenPrompts.has(promptKey)) return false;
    seenPrompts.add(promptKey);
    return true;
  });
}

function createExamQuestions(sourceQuestions, count, { jumbleMatchingAnswers = false } = {}) {
  const matchingPerBlock = 5;
  const dragDropPerBlock = 3;
  const clickBoxesPerBlock = 1;
  const imagePerBlock = 1;
  const blockSize = 50;
  const blockCount = Math.ceil(count / blockSize);
  const uniqueSource = getUniqueQuestions(sourceQuestions);
  const sourceMatching = uniqueSource.filter((question) => question.type === "match");
  const sourceDragDrop = uniqueSource.filter((question) => question.type === "drag_drop");
  const sourceClickBoxes = uniqueSource.filter((question) => question.type === "click_boxes");
  const sourceImages = uniqueSource.filter((question) => question.type === "image");
  const sourceOther = uniqueSource.filter((question) =>
    !["match", "drag_drop", "click_boxes", "image"].includes(question.type),
  );
  const builtInMatching = CCNA_QUESTION_BANK.filter((question) => question.type === "match");
  const builtInDragDrop = CCNA_QUESTION_BANK.filter((question) => question.type === "drag_drop");
  const builtInClickBoxes = CCNA_QUESTION_BANK.filter((question) => question.type === "click_boxes");
  const builtInImages = CCNA_QUESTION_BANK.filter((question) => question.type === "image");
  const builtInOther = CCNA_QUESTION_BANK.filter((question) =>
    !["match", "drag_drop", "click_boxes", "image"].includes(question.type),
  );
  const matchingPool = getUniqueQuestions([...sourceMatching, ...builtInMatching]);
  const matchingQuota = Math.min(matchingPerBlock, Math.floor(matchingPool.length / blockCount));
  const requiredMatchingCount = blockCount * matchingQuota;
  const dragDropPool = getUniqueQuestions([...sourceDragDrop, ...builtInDragDrop]);
  const clickBoxesPool = getUniqueQuestions([...sourceClickBoxes, ...builtInClickBoxes]);
  const imagePool = getUniqueQuestions([...sourceImages, ...builtInImages]);
  const otherPool = getUniqueQuestions([...sourceOther, ...builtInOther]);
  const matchingQuestions = shuffle(matchingPool).slice(0, requiredMatchingCount);
  const questionKey = (question) =>
    question.bankId ?? question.id ?? question.legacyIndex ??
      (typeof question.prompt === "string" ? question.prompt.trim().toLowerCase() : "");
  const requiredDragDropCount = blockCount * dragDropPerBlock;
  const requiredClickBoxesCount = blockCount * clickBoxesPerBlock;
  const clickBoxesShortage = Math.max(0, requiredClickBoxesCount - clickBoxesPool.length);
  const randomizedDragDropPool = shuffle(dragDropPool);
  const dragDropQuota = randomizedDragDropPool.length >= requiredDragDropCount ? dragDropPerBlock : 0;
  const dragDropQuestions = randomizedDragDropPool.slice(0, blockCount * dragDropQuota);
  const dragDropQuestionKeys = new Set(dragDropQuestions.map(questionKey));
  const clickBoxesCompatibleDragDrop = randomizedDragDropPool.filter((question) =>
    Array.isArray(question.items) &&
    Array.isArray(question.choices) &&
    Array.isArray(question.answer) &&
    question.items.length === question.choices.length &&
    question.answer.length === question.items.length &&
    new Set(question.answer).size === question.answer.length &&
    !dragDropQuestionKeys.has(questionKey(question)),
  );
  const canBorrowClickBoxes = clickBoxesCompatibleDragDrop.length >= clickBoxesShortage;
  const borrowedClickBoxes = canBorrowClickBoxes
    ? clickBoxesCompatibleDragDrop.slice(0, clickBoxesShortage)
      .map((question) => ({ ...question, type: "click_boxes" }))
    : [];
  const clickBoxesQuota = clickBoxesPool.length + borrowedClickBoxes.length >= requiredClickBoxesCount
    ? clickBoxesPerBlock
    : 0;
  const imageQuota = imagePool.length >= blockCount * imagePerBlock ? imagePerBlock : 0;
  const clickBoxesQuestions = shuffle([...clickBoxesPool, ...borrowedClickBoxes])
    .slice(0, blockCount * clickBoxesQuota);
  const imageQuestions = shuffle(imagePool).slice(0, blockCount * imageQuota);
  const reservedQuestions = [
    ...matchingQuestions,
    ...dragDropQuestions,
    ...clickBoxesQuestions,
    ...imageQuestions,
  ];
  const reservedQuestionCount = reservedQuestions.length;
  const reservedPrompts = new Set(reservedQuestions.map((question) => question.prompt.trim().toLowerCase()));
  const fallbackQuestions = getUniqueQuestions([
    ...matchingPool,
    ...dragDropPool,
    ...clickBoxesPool,
    ...imagePool,
  ]).filter((question) => !reservedPrompts.has(question.prompt.trim().toLowerCase()));
  const otherQuestions = shuffle(getUniqueQuestions([...otherPool, ...fallbackQuestions]))
    .slice(0, count - reservedQuestionCount);
  const questions = [];

  for (let blockIndex = 0; blockIndex < blockCount; blockIndex += 1) {
    const blockLength = Math.min(blockSize, count - blockIndex * blockSize);
    const matchingStart = blockIndex * matchingQuota;
    const dragDropStart = blockIndex * dragDropQuota;
    const clickBoxesStart = blockIndex * clickBoxesQuota;
    const imageStart = blockIndex * imageQuota;
    const otherPerBlock = blockSize - matchingQuota - dragDropQuota - clickBoxesQuota - imageQuota;
    const otherStart = blockIndex * otherPerBlock;
    const blockQuestions = [
      ...matchingQuestions.slice(matchingStart, matchingStart + matchingQuota),
      ...dragDropQuestions.slice(dragDropStart, dragDropStart + dragDropQuota),
      ...clickBoxesQuestions.slice(clickBoxesStart, clickBoxesStart + clickBoxesQuota),
      ...imageQuestions.slice(imageStart, imageStart + imageQuota),
      ...otherQuestions.slice(otherStart, otherStart + Math.min(otherPerBlock, blockLength - matchingQuota - dragDropQuota - clickBoxesQuota - imageQuota)),
    ];
    questions.push(...shuffle(blockQuestions).map((question) =>
      jumbleMatchingAnswers ? shuffleMatchingChoices(question, shuffle) : question,
    ));
  }

  return questions;
}

// The exams draw from the database question bank once it has loaded (see ccnaQuestionBankApi.js);
// until then, or if it can't be reached, they use the questions built into the site.
let databaseQuestions = null;
export function setDatabaseQuestions(questions) {
  databaseQuestions = Array.isArray(questions) && questions.length
    ? questions.map(applyNativeExhibit)
    : null;
}

export function getDatabaseQuestionById(id) {
  return databaseQuestions?.find((question) => question.bankId === id) ?? null;
}


export function createShortExamQuestions(options) {
  if (databaseQuestions) return createExamQuestions(databaseQuestions, 50, options);
  const moduleQuestions = CCNA_QUESTION_BANK.filter((question) => {
    const moduleNumber = question.moduleNumber;
    return (typeof moduleNumber === "string" && /^([1-6])\.0$/.test(moduleNumber)) ||
      SHORT_EXAM_SOURCES.has(question.source);
  });

  return createExamQuestions(moduleQuestions, 50, options);
}

export function createMediumExamQuestions(options) {
  return createExamQuestions(databaseQuestions ?? CCNA_QUESTION_BANK, 100, options);
}

export function createLongExamQuestions(options) {
  return createExamQuestions(databaseQuestions ?? CCNA_QUESTION_BANK, 150, options);
}
