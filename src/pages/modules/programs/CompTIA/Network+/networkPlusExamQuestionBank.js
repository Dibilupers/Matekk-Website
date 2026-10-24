import API_URL from "../../../../../config/api";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";

function hasCompTIAModule(question, programName) {
	const moduleName = question?.module;
	return typeof moduleName === "string" &&
		moduleName.trim().toLocaleLowerCase() === `comptia ${programName}`.toLocaleLowerCase();
}

function normalizeCompTIAQuestion(question, programName) {
	if (!question || typeof question !== "object" || Array.isArray(question)) {
		throw new TypeError(`The CompTIA ${programName} question bank contains a malformed question.`);
	}
	if (question.type === "study") {
		if (typeof question.prompt !== "string" || !question.prompt.trim() || typeof question.studyNote !== "string" || !question.studyNote.trim()) {
			throw new TypeError(`The CompTIA ${programName} question bank contains an invalid study item.`);
		}
		return { ...question, prompt: question.prompt.trim(), type: "study" };
	}
	if (question.type === "text") {
		if (typeof question.prompt !== "string" || !question.prompt.trim() || typeof question.answer !== "string" || !question.answer.trim()) {
			throw new TypeError(`The CompTIA ${programName} question bank contains a fill-in-the-blank question with an invalid prompt or answer.`);
		}
		const normalized = { ...question, prompt: question.prompt.trim(), answer: question.answer.trim(), type: "text" };
		if (!isValidQuestion(normalized)) {
			throw new TypeError(`The CompTIA ${programName} question bank contains an invalid fill-in-the-blank question.`);
		}
		return normalized;
	}
	if (question.type === "multi") {
		if (
			typeof question.prompt !== "string" ||
			!question.prompt.trim() ||
			!Array.isArray(question.options) ||
			question.options.length < 2 ||
			!question.options.every((option) => typeof option === "string" && option.trim())
		) {
			throw new TypeError(`The CompTIA ${programName} question bank contains a multiple-select question with an invalid prompt or options.`);
		}
		const normalized = {
			...question,
			type: "multi",
			prompt: question.prompt.trim(),
			options: question.options.map((option) => option.trim()),
		};
		if (!isValidQuestion(normalized)) {
			throw new TypeError(`The CompTIA ${programName} question bank contains an invalid multiple-select question.`);
		}
		return normalized;
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
	if (!["single", "single choice", "multiple choice", "mcq", "radio"].includes(
		String(question.type ?? question.question_type ?? "single").trim().toLowerCase().replace(/[_-]+/g, " "),
	)) {
		throw new TypeError(`The CompTIA ${programName} question bank contains an unsupported question type.`);
	}
	if (!isValidQuestion(normalized)) {
		throw new TypeError(`The CompTIA ${programName} question bank contains an invalid multiple-choice question.`);
	}
	return normalized;
}

export async function loadCompTIAExamQuestions(programName) {
	const certificationName = `CompTIA ${programName}`;
	const query = new URLSearchParams({ module: certificationName });
	const response = await fetch(`${API_URL}/questions/bank/all-usable?${query}`, { credentials: "include" });
	if (!response.ok) {
		throw new Error(`${certificationName} question bank request failed (${response.status}).`);
	}

	const bank = await response.json();
	if (!bank || typeof bank !== "object" || !Array.isArray(bank.questions)) {
		throw new TypeError(`${certificationName} question bank response must contain a questions list.`);
	}

	const certificationQuestions = bank.questions.filter((question) => hasCompTIAModule(question, programName));
	if (certificationQuestions.length === 0) {
		throw new Error(`No questions labeled "${certificationName}" were found in the usable question bank.`);
	}

	return certificationQuestions.map((question) => normalizeCompTIAQuestion(question, programName));
}

export function loadNetworkPlusExamQuestions() {
	return loadCompTIAExamQuestions("Network+");
}
