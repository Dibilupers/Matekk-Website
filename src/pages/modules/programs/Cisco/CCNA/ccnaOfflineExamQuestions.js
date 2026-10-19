import { CCNA_LEGACY_QUESTIONS } from "./ccnaLegacyQuestions";
import { findCcnaQuestionExplanation } from "../../../../../utils/ccnaQuestionExplanations";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";
import { splitPromptExhibit } from "../../../../../utils/splitPromptExhibit";

const OFFLINE_LEGACY_QUESTIONS = CCNA_LEGACY_QUESTIONS
  .map((question) => ({
    ...question,
    ...(!question.exhibit ? splitPromptExhibit(question.prompt) : {}),
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

  const shuffled = getOfflineLegacyQuestionBank();
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled.slice(0, count);
}