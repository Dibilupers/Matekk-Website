import API_URL from "../../../../../config/api";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";

const FORTIOS_MODULE_LABELS = new Set(["fortios", "fortinet fortios", "fortigate administrator"]);

function isSingleChoiceQuestion(question) {
	const type = String(question?.type ?? question?.question_type ?? "")
		.trim()
		.toLowerCase()
		.replace(/[_-]+/g, " ");
	return ["single", "single choice", "multiple choice", "mcq", "radio"].includes(type);
}

function normalizeQuestion(question) {
	if (!question || typeof question !== "object" || Array.isArray(question)) {
		throw new TypeError("The FortiOS question bank contains a malformed question.");
	}
	if (
		typeof question.prompt !== "string" ||
		!question.prompt.trim() ||
		!Array.isArray(question.options) ||
		question.options.length < 2 ||
		!question.options.every((option) => typeof option === "string" && option.trim())
	) {
		throw new TypeError("The FortiOS question bank contains a single-choice question with an invalid prompt or options.");
	}
	if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
		throw new TypeError("The FortiOS question bank contains a single-choice question with an invalid answer index.");
	}
	if (typeof question.explanation !== "string") {
		throw new TypeError("The FortiOS question bank contains a single-choice question without an explanation.");
	}

	const normalized = {
		...question,
		type: "single",
		prompt: question.prompt.trim(),
		options: question.options.map((option) => option.trim()),
	};
	if (!isValidQuestion(normalized)) {
		throw new TypeError("The FortiOS question bank contains an invalid multiple-choice question.");
	}
	return normalized;
}

export async function loadFortiOSExamQuestions() {
	const response = await fetch(`${API_URL}/questions/bank/all-usable`, { credentials: "include" });
	if (!response.ok) {
		throw new Error(`FortiOS question bank request failed (${response.status}).`);
	}
	const bank = await response.json();
	if (!bank || typeof bank !== "object" || !Array.isArray(bank.questions)) {
		throw new TypeError("The FortiOS question bank response must contain a questions list.");
	}

	const fortiOSQuestions = bank.questions.filter((question) =>
		typeof question?.module === "string" &&
		FORTIOS_MODULE_LABELS.has(question.module.trim().toLocaleLowerCase()),
	);
	if (fortiOSQuestions.length === 0) {
		throw new Error("No questions labeled FortiOS or FortiGate Administrator were found in the usable question bank.");
	}

	const multipleChoiceQuestions = fortiOSQuestions.filter(isSingleChoiceQuestion);
	const skippedQuestionCount = fortiOSQuestions.length - multipleChoiceQuestions.length;
	if (skippedQuestionCount > 0) {
		console.info(`FortiOS: excluded ${skippedQuestionCount} non-multiple-choice question(s).`);
	}
	if (multipleChoiceQuestions.length === 0) {
		throw new Error("No multiple-choice questions were found in the FortiOS question bank.");
	}

	return multipleChoiceQuestions.map(normalizeQuestion);
}
