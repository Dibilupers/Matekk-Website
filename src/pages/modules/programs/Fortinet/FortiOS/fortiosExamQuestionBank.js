import API_URL from "../../../../../config/api";
import { isValidQuestion } from "../../../../../utils/ccnaExamGrading";
import { cacheFortiOSImagesForOffline, cacheFortiOSQuestionBankForOffline } from "./offline/fortiosOfflineQuestionBank";

const FORTIOS_MODULE_NAME = "Fortinet FortiOS";
const FORTIOS_MODULE_LABELS = new Set(["fortios", "fortinet fortios", "fortigate administrator"]);
const SUPPORTED_QUESTION_TYPES = new Set(["single", "multi", "match"]);
const ORDERING_QUESTION_IDS = new Set([3497]);

export async function loadFortiOSExamQuestions() {
	const query = new URLSearchParams({ module: FORTIOS_MODULE_NAME });
	const response = await fetch(`${API_URL}/questions/bank/all-usable?${query}`, {
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error(`FortiOS usable question bank request failed (${response.status}).`);
	}

	const bank = await response.json();
	if (!bank || typeof bank !== "object" || !Array.isArray(bank.questions)) {
		throw new TypeError("The FortiOS usable question bank response must contain a questions list.");
	}
	const fortiOSBankQuestions = bank.questions.filter((question) =>
		typeof question?.module === "string" &&
		FORTIOS_MODULE_LABELS.has(question.module.trim().toLocaleLowerCase()),
	);
	try {
		await cacheFortiOSQuestionBankForOffline({ ...bank, questions: fortiOSBankQuestions });
	} catch (error) {
		console.error("Unable to save the FortiOS question bank for offline exams.", error);
	}
	try {
		await cacheFortiOSImagesForOffline(bank);
	} catch (error) {
		console.error("Unable to save FortiOS exhibit images for offline exams.", error);
	}

	const questions = fortiOSBankQuestions.flatMap((question) => {
		if (
			!question ||
			!SUPPORTED_QUESTION_TYPES.has(question.type) ||
			!Number.isInteger(question.bankId) ||
			typeof question.prompt !== "string" ||
			!question.prompt.trim() ||
			!isValidQuestion(question)
		) return [];

		return [{
			...question,
			id: question.bankId,
			type: ORDERING_QUESTION_IDS.has(question.bankId) ? "drag_drop" : question.type,
			prompt: question.prompt.trim(),
			exhibitImage: question.imageUrl || undefined,
		}];
	});

	const skippedCount = fortiOSBankQuestions.length - questions.length;
	if (skippedCount > 0) {
		console.warn(`FortiOS exam bank omitted ${skippedCount} unsupported question(s).`);
	}
	if (questions.length === 0) {
		throw new Error("The FortiOS question bank has no valid questions available for exams.");
	}

	return questions;
}
