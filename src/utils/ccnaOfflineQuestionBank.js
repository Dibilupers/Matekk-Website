import { isValidQuestion } from "./ccnaExamGrading";
import { isCcnaQuestionModule } from "./ccnaQuestionModule";

const CACHE_NAME = "matekk-ccna-all-questions-offline-v1";
const CACHE_PATH = "/__offline__/ccna-all-questions-v1";

function createCacheRequest() {
	if (typeof window === "undefined") {
		throw new Error("CCNA offline question storage is only available in a browser.");
	}
	return new Request(new URL(CACHE_PATH, window.location.origin));
}

export async function cacheCcnaAllQuestionsBank(questions) {
	if (typeof caches === "undefined") {
		throw new Error("This browser does not support saving CCNA questions for offline use.");
	}
	if (
		!Array.isArray(questions) ||
		!questions.length ||
		!questions.every((question) => Number.isSafeInteger(question?.bankId) && question.bankId > 0 && isValidQuestion(question))
	) {
		throw new TypeError("Only a complete, valid CCNA question bank can be saved for offline use.");
	}

	const cache = await caches.open(CACHE_NAME);
	await cache.put(createCacheRequest(), new Response(JSON.stringify({
		version: 1,
		questions,
	}), {
		headers: { "Content-Type": "application/json; charset=utf-8" },
	}));
}

export async function loadCachedCcnaAllQuestionsBank() {
	if (typeof caches === "undefined") return null;
	const cache = await caches.open(CACHE_NAME);
	const response = await cache.match(createCacheRequest());
	if (!response) return null;

	const savedBank = await response.json();
	if (
		!savedBank ||
		savedBank.version !== 1 ||
		!Array.isArray(savedBank.questions) ||
		savedBank.questions.length === 0
	) {
		throw new TypeError("The saved CCNA offline question bank is incomplete or invalid.");
	}

	const questions = savedBank.questions
		.filter((question) => isCcnaQuestionModule(question.moduleTitle ?? question.module))
		.filter((question) => Number.isSafeInteger(question?.bankId) && question.bankId > 0 && isValidQuestion(question));
	if (questions.length !== savedBank.questions.length) {
		throw new TypeError("The saved CCNA offline question bank contains invalid or non-CCNA questions.");
	}

	const uniqueQuestions = [...new Map(questions.map((question) => [question.bankId, question])).values()];
	if (uniqueQuestions.length !== questions.length) {
		throw new TypeError("The saved CCNA offline question bank contains duplicate question IDs.");
	}

	return uniqueQuestions;
}
