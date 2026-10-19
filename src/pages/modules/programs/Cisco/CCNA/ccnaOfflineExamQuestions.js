import ccna1306BroadcastAddressesImg from "../../../../../assets/ccna-exam/ccna-1306-broadcast-addresses.png";
import ccna181RapidPvstActionsImg from "../../../../../assets/ccna-exam/ccna-181-rapid-pvst-actions.png";
import ccna382AnsibleFeaturesImg from "../../../../../assets/ccna-exam/ccna-382-ansible-features.png";
import ccna608NorthboundApiImg from "../../../../../assets/ccna-exam/ccna-608-northbound-api.png";
import subinterfaceR1Sw1Sw2Img from "../../../../../assets/ccna-exam/subinterface-r1-sw1-sw2.webp";
import wlcMyWlanLayer2Img from "../../../../../assets/ccna-exam/wlc-my-wlan-layer2.webp";
import wlcPskLayer2Img from "../../../../../assets/ccna-exam/wlc-psk-layer2.webp";
import { CCNA_LEGACY_QUESTIONS } from "./ccnaLegacyQuestions";
import { findCcnaQuestionExplanation } from "../../../../../utils/ccnaQuestionExplanations";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";
import { splitPromptExhibit } from "../../../../../utils/splitPromptExhibit";

const NUMBERED_QUESTION_EXHIBIT_IMAGES = import.meta.glob(
  "../../../../../assets/ccna-offline-exams-images/ccna-question-*.png",
  { eager: true, import: "default", query: "?url" },
);

const NUMBERED_QUESTION_EXHIBITS = Object.entries(NUMBERED_QUESTION_EXHIBIT_IMAGES)
  .reduce((exhibits, [path, image]) => {
    const match = path.match(/ccna-question-(\d+)(-corrected)?\.png$/);
    if (!match) return exhibits;

    const questionNumber = Number(match[1]);
    if (!exhibits.has(questionNumber) || match[2]) {
      exhibits.set(questionNumber, image);
    }
    return exhibits;
  }, new Map());

const LEGACY_QUESTION_EXHIBITS = new Map([
  [50, subinterfaceR1Sw1Sw2Img],
  [217, wlcMyWlanLayer2Img],
  [227, wlcPskLayer2Img],
  [267, ccna1306BroadcastAddressesImg],
  [498, ccna181RapidPvstActionsImg],
  [700, ccna382AnsibleFeaturesImg],
  [926, ccna608NorthboundApiImg],
]);

const OFFLINE_LEGACY_QUESTIONS = CCNA_LEGACY_QUESTIONS
  .map((question) => ({
    ...question,
    ...(!question.exhibit ? splitPromptExhibit(question.prompt) : {}),
    ...(NUMBERED_QUESTION_EXHIBITS.has(question.legacyIndex) ||
    LEGACY_QUESTION_EXHIBITS.has(question.legacyIndex)
      ? {
          exhibitImage: NUMBERED_QUESTION_EXHIBITS.get(question.legacyIndex)
            || LEGACY_QUESTION_EXHIBITS.get(question.legacyIndex),
        }
      : {}),
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