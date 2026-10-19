import API_URL from "../../../../../config/api";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";

const FORTIOS_MODULE_LABELS = new Set(["fortios", "fortinet fortios", "fortigate administrator"]);
const FORTIOS_MODULE_NAME = "Fortinet FortiOS";

function isSingleChoiceQuestion(question) {
	const type = String(question?.type ?? question?.question_type ?? "")
		.trim()
		.toLowerCase()
		.replace(/[_-]+/g, " ");
	return ["single", "single choice", "multiple choice", "mcq", "radio"].includes(type);
}

function parseRawChoices(value) {
	if (typeof value !== "string" || !value.trim()) return [];
	try {
		const parsed = JSON.parse(value);
		if (Array.isArray(parsed)) {
			return parsed.map((option, index) => [String.fromCharCode(65 + index), option]);
		}
		if (parsed && typeof parsed === "object") return Object.entries(parsed);
	} catch {
		return value.split(/\r?\n/).map((option, index) => [String.fromCharCode(65 + index), option]);
	}
	return [];
}

function createRawFallbackQuestion(row) {
	const choiceEntries = parseRawChoices(row.choices)
		.filter(([, option]) => typeof option === "string" && option.trim())
		.map(([label, option]) => [String(label), option.trim()]);
	if (choiceEntries.length === 1) choiceEntries.push(["B", "No second answer choice in source row"]);
	if (choiceEntries.length === 0) {
		choiceEntries.push(["A", "No answer choices in source row"], ["B", "Fallback choice for testing"]);
	}
	const options = choiceEntries.map(([, option]) => option);
	const answerText = String(row.correct_answer ?? "").trim();
	const matchedChoice = choiceEntries.findIndex(([label, option], index) =>
		label.toLocaleLowerCase() === answerText.toLocaleLowerCase() ||
		option.toLocaleLowerCase() === answerText.toLocaleLowerCase() ||
		new RegExp(`^\\(?${String.fromCharCode(65 + index)}\\)?(?:[.)])?$`, "i").test(answerText),
	);
	const numericAnswer = Number(answerText);
	const answer = matchedChoice >= 0
		? matchedChoice
		: Number.isInteger(numericAnswer) && numericAnswer >= 0 && numericAnswer < options.length
			? numericAnswer
			: 0;
	const prompt = typeof row.question_text === "string" && row.question_text.trim()
		? row.question_text.trim()
		: `FortiOS question ${row.id} (source prompt is empty)`;

	return {
		id: row.id,
		bankId: row.id,
		prompt,
		type: "single",
		options,
		answer,
		explanation: typeof row.explanation === "string" ? row.explanation : "",
		module: row.module,
		topic: row.topic,
		imageUrl: row.imageUrl ?? null,
		testFallback: true,
	};
}

export async function loadFortiOSExamQuestions() {
	const query = new URLSearchParams({ module: FORTIOS_MODULE_NAME });
	const [rawResponse, usableResponse] = await Promise.all([
		fetch(`${API_URL}/questions/bank?${query}`, { credentials: "include" }),
		fetch(`${API_URL}/questions/bank/all-usable?${query}`, { credentials: "include" }),
	]);
	if (!rawResponse.ok) {
		throw new Error(`FortiOS raw question bank request failed (${rawResponse.status}).`);
	}
	if (!usableResponse.ok) {
		throw new Error(`FortiOS usable question bank request failed (${usableResponse.status}).`);
	}
	const [rawBank, usableBank] = await Promise.all([rawResponse.json(), usableResponse.json()]);
	if (!Array.isArray(rawBank)) {
		throw new TypeError("The FortiOS raw question bank response must be a list.");
	}
	if (!usableBank || typeof usableBank !== "object" || !Array.isArray(usableBank.questions)) {
		throw new TypeError("The FortiOS usable question bank response must contain a questions list.");
	}

	const fortiOSRows = rawBank.filter((question) =>
		typeof question?.module === "string" &&
		FORTIOS_MODULE_LABELS.has(question.module.trim().toLocaleLowerCase()),
	);
	if (fortiOSRows.length === 0) {
		throw new Error("No questions labeled FortiOS or FortiGate Administrator were found in the usable question bank.");
	}

	const usableByBankId = new Map(usableBank.questions.map((question) => [question.bankId, question]));
	const fallbackIds = [];
	const questions = fortiOSRows.map((row) => {
		const usableQuestion = usableByBankId.get(row.id);
		if (usableQuestion && isSingleChoiceQuestion(usableQuestion) && isValidQuestion(usableQuestion)) {
			return {
				...usableQuestion,
				id: row.id,
				prompt: usableQuestion.prompt.trim(),
			};
		}
		fallbackIds.push(row.id);
		return createRawFallbackQuestion(row);
	});
	if (fallbackIds.length > 0) {
		console.warn(`FortiOS test mode: included ${fallbackIds.length} raw question(s) using fallback rendering.`, fallbackIds);
	}
	return questions;
}
