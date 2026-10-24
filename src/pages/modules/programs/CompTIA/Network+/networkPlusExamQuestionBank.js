import API_URL from "../../../../../config/api";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";

const SECURITY_PLUS_OFFLINE_CACHE = "matekk-comptia-security-plus-offline-question-bank-v1";

function hasCompTIAModule(question, programName) {
	const moduleName = question?.module;
	return typeof moduleName === "string" &&
		moduleName.trim().toLocaleLowerCase() === `comptia ${programName}`.toLocaleLowerCase();
}

function isSingleChoiceQuestion(question) {
	const type = String(question?.type ?? question?.question_type ?? "")
		.trim()
		.toLowerCase()
		.replace(/[_-]+/g, " ");
	return ["single", "single choice", "multiple choice", "mcq", "radio"].includes(type);
}

function normalizeMultipleChoiceQuestion(question, programName) {
	if (!question || typeof question !== "object" || Array.isArray(question)) {
		throw new TypeError(`The CompTIA ${programName} question bank contains a malformed question.`);
	}
	if (
		typeof question.prompt !== "string" ||
		!question.prompt.trim() ||
		!Array.isArray(question.options) ||
		question.options.length < 2 ||
		!question.options.every((option) => typeof option === "string" && option.trim())
	) {
		throw new TypeError(`The CompTIA ${programName} question bank contains a single-choice question with an invalid prompt or options.`);
	}
	if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
		throw new TypeError(`The CompTIA ${programName} question bank contains a single-choice question with an invalid answer index.`);
	}
	if (typeof question.explanation !== "string") {
		throw new TypeError(`The CompTIA ${programName} question bank contains a single-choice question without an explanation.`);
	}

	const normalized = {
		...question,
		type: "single",
		prompt: question.prompt.trim(),
		options: question.options.map((option) => option.trim()),
	};
	if (!isValidQuestion(normalized)) {
		throw new TypeError(`The CompTIA ${programName} question bank contains an invalid multiple-choice question.`);
	}
	return normalized;
}

export async function loadCompTIAExamQuestions(programName, { cacheForOffline = false } = {}) {
	const certificationName = `CompTIA ${programName}`;
	const query = new URLSearchParams({ module: certificationName });
	const url = `${API_URL}/questions/bank/all-usable?${query}`;
	const request = cacheForOffline
		? new Request(new URL(url, window.location.origin), { credentials: "include" })
		: null;
	let response;
	if (cacheForOffline && typeof navigator !== "undefined" && !navigator.onLine) {
		if (typeof caches === "undefined") {
			throw new Error("This browser cannot access saved Security+ exam questions offline.");
		}
		const cache = await caches.open(SECURITY_PLUS_OFFLINE_CACHE);
		response = await cache.match(request, { ignoreVary: true });
		if (!response) {
			throw new Error("No Security+ questions are saved on this device yet. Connect to the internet and open a Security+ exam once before going offline.");
		}
	} else {
		try {
			response = cacheForOffline
				? await fetch(request)
				: await fetch(url, { credentials: "include" });
		} catch (error) {
			if (!cacheForOffline || typeof caches === "undefined") throw error;
			const cache = await caches.open(SECURITY_PLUS_OFFLINE_CACHE);
			response = await cache.match(request, { ignoreVary: true });
			if (!response) throw error;
		}
	}
	if (!response.ok) {
		throw new Error(`${certificationName} question bank request failed (${response.status}).`);
	}
	if (cacheForOffline && !(typeof navigator !== "undefined" && !navigator.onLine) && typeof caches !== "undefined") {
		try {
			const cache = await caches.open(SECURITY_PLUS_OFFLINE_CACHE);
			await cache.put(request, response.clone());
		} catch (error) {
			console.warn("Unable to save the Security+ question bank for offline use.", error);
		}
	}

	const bank = await response.json();
	if (!bank || typeof bank !== "object" || !Array.isArray(bank.questions)) {
		throw new TypeError(`${certificationName} question bank response must contain a questions list.`);
	}

	const certificationQuestions = bank.questions.filter((question) => hasCompTIAModule(question, programName));
	if (certificationQuestions.length === 0) {
		throw new Error(`No questions labeled "${certificationName}" were found in the usable question bank.`);
	}

	const multipleChoiceQuestions = certificationQuestions.filter(isSingleChoiceQuestion);
	const skippedQuestionCount = certificationQuestions.length - multipleChoiceQuestions.length;
	if (skippedQuestionCount > 0) {
		console.info(`${certificationName}: excluded ${skippedQuestionCount} non-multiple-choice question(s).`);
	}
	if (multipleChoiceQuestions.length === 0) {
		throw new Error(`No multiple-choice questions labeled "${certificationName}" were found in the usable question bank.`);
	}

	return multipleChoiceQuestions.map((question) => normalizeMultipleChoiceQuestion(question, programName));
}

export function loadNetworkPlusExamQuestions() {
	return loadCompTIAExamQuestions("Network+");
}
