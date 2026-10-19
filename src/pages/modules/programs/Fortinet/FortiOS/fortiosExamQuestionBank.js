import API_URL from "../../../../../config/api";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";

const FORTIOS_MODULE_LABELS = new Set(["fortios", "fortinet fortios", "fortigate administrator"]);
const FORTIOS_MODULE_NAME = "Fortinet FortiOS";

function normalizedQuestionType(question) {
	const type = String(question?.type ?? question?.question_type ?? "")
		.trim()
		.toLowerCase()
		.replace(/[_-]+/g, " ");
	if (["single", "single choice", "multiple choice", "mcq", "radio"].includes(type)) return "single";
	if (["match", "drag drop", "click boxes", "multi"].includes(type)) return type.replaceAll(" ", "_");
	return null;
}

function normalizeQuestion(question) {
	if (!question || typeof question !== "object" || Array.isArray(question)) {
		throw new TypeError("The FortiOS question bank contains a malformed question.");
	}
	const type = normalizedQuestionType(question);
	if (!type) {
		throw new TypeError(`The FortiOS question bank contains an unsupported question type "${question.type ?? question.question_type ?? "unknown"}".`);
	}
	if (
		typeof question.prompt !== "string" ||
		!question.prompt.trim()
	) {
		throw new TypeError("The FortiOS question bank contains a question with an invalid prompt.");
	}
	if (typeof question.explanation !== "string") {
		throw new TypeError("The FortiOS question bank contains a question without an explanation.");
	}

	let normalized;
	if (type === "single" || type === "multi") {
		if (
			!Array.isArray(question.options) ||
			question.options.length < 2 ||
			!question.options.every((option) => typeof option === "string" && option.trim())
		) {
			throw new TypeError("The FortiOS question bank contains a multiple-choice question with invalid options.");
		}
		normalized = {
			...question,
			type,
			prompt: question.prompt.trim(),
			options: question.options.map((option) => option.trim()),
		};
	} else {
		if (
			!Array.isArray(question.items) ||
			!question.items.length ||
			!question.items.every((item) => typeof item === "string" && item.trim()) ||
			!Array.isArray(question.choices) ||
			question.choices.length < 2 ||
			!question.choices.every((choice) => typeof choice === "string" && choice.trim())
		) {
			throw new TypeError("The FortiOS question bank contains a matching question with invalid items or choices.");
		}
		normalized = {
			...question,
			type,
			prompt: question.prompt.trim(),
			items: question.items.map((item) => item.trim()),
			choices: question.choices.map((choice) => choice.trim()),
		};
	}
	if (!isValidQuestion(normalized)) {
		throw new TypeError("The FortiOS question bank contains an invalid question or answer key.");
	}
	return normalized;
}

export async function loadFortiOSExamQuestions() {
	const query = new URLSearchParams({ module: FORTIOS_MODULE_NAME });
	const response = await fetch(`${API_URL}/questions/bank/all-usable?${query}`, { credentials: "include" });
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

	const supportedQuestions = fortiOSQuestions.filter((question) => normalizedQuestionType(question) !== null);
	const skippedQuestionCount = fortiOSQuestions.length - supportedQuestions.length;
	if (skippedQuestionCount > 0) {
		console.info(`FortiOS: excluded ${skippedQuestionCount} question(s) with unsupported question types.`);
	}
	if (supportedQuestions.length === 0) {
		throw new Error("No supported questions were found in the FortiOS question bank.");
	}

	return supportedQuestions.map(normalizeQuestion);
}
