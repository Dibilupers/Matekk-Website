import { CCNA_LEGACY_QUESTIONS } from "./ccnaLegacyQuestions";
import { findCcnaQuestionExplanation } from "../../../../../utils/ccnaQuestionExplanations";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";
import { splitPromptExhibit } from "../../../../../utils/splitPromptExhibit";

const OFFLINE_LEGACY_QUESTIONS = CCNA_LEGACY_QUESTIONS
  .map((question) => ({
    ...question,
    ...(!question.exhibit ? splitPromptExhibit(question.prompt) : {}),
    ...(question.type === "match" &&
    question.items?.length === question.choices?.length &&
    question.answer?.length === question.items.length &&
    new Set(question.answer).size === question.answer.length
      ? { type: /\bdrag\b/i.test(question.prompt) ? "drag_drop" : "click_boxes" }
      : {}),
    id: question.legacyIndex,
    bankId: question.legacyIndex,
    source: "legacy-ccna-200-301",
    moduleNumber: null,
    moduleTitle: "Legacy CCNA 200-301",
    explanation: question.explanation?.trim() || findCcnaQuestionExplanation(question.prompt),
  }))
  .filter((question) =>
    isValidQuestion(question) &&
    (!/\bexhibit\b/i.test(question.prompt) || question.exhibit || question.exhibitImage),
  );

export function getOfflineLegacyQuestionBank() {
  return OFFLINE_LEGACY_QUESTIONS.map((question) => ({ ...question }));
}

export function createOfflineLegacyExamQuestions(count) {
  if (!Number.isInteger(count) || count < 1 || count > OFFLINE_LEGACY_QUESTIONS.length) {
    throw new RangeError(`The offline legacy question bank cannot provide ${count} questions.`);
  }

  const questions = getOfflineLegacyQuestionBank();
  const blockCount = Math.ceil(count / 50);
  const dragDropCount = Math.min(blockCount * 3, count - 1, questions.filter((question) => question.type === "drag_drop").length);
  const clickBoxesCount = Math.min(blockCount, count - dragDropCount, questions.filter((question) => question.type === "click_boxes").length);
  const shuffle = (items) => {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled;
  };
  const dragDropQuestions = shuffle(questions.filter((question) => question.type === "drag_drop"))
    .slice(0, dragDropCount);
  const clickBoxesQuestions = shuffle(questions.filter((question) => question.type === "click_boxes"))
    .slice(0, clickBoxesCount);
  const selectedIds = new Set([...dragDropQuestions, ...clickBoxesQuestions].map((question) => question.id));
  const remainingQuestions = shuffle(questions.filter((question) => !selectedIds.has(question.id)))
    .slice(0, count - selectedIds.size);

  return shuffle([...dragDropQuestions, ...clickBoxesQuestions, ...remainingQuestions]);
}