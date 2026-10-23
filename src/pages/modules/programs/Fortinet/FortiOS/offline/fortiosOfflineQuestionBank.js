import API_URL from "../../../../../../config/api";
import { isValidQuestion } from "../../../../../../utils/ccnaExamGrading";

const FORTIOS_MODULE_LABELS = new Set(["fortios", "fortinet fortios", "fortigate administrator"]);
const FORTIOS_OFFLINE_CACHE_NAME = "matekk-fortios-offline-question-bank-v1";

function isSingleChoiceQuestion(question) {
	const type = String(question?.type ?? question?.question_type ?? "")
		.trim()
		.toLowerCase()
		.replace(/[_-]+/g, " ");
	return ["single", "single choice", "multiple choice", "mcq", "radio"].includes(type);
}

function normalizeQuestion(question) {
	if (!question || typeof question !== "object" || Array.isArray(question)) return null;
	const moduleName = typeof question.module === "string" ? question.module.trim().toLowerCase() : "";
	if (!FORTIOS_MODULE_LABELS.has(moduleName) || !isSingleChoiceQuestion(question)) return null;
	if (
		typeof question.prompt !== "string" ||
		!question.prompt.trim() ||
		!Array.isArray(question.options) ||
		question.options.length < 2 ||
		!question.options.every((option) => typeof option === "string" && option.trim()) ||
		!Number.isInteger(question.answer) ||
		question.answer < 0 ||
		question.answer >= question.options.length ||
		typeof question.explanation !== "string"
	) return null;

	const normalized = {
		...question,
		type: "single",
		prompt: question.prompt.trim(),
		options: question.options.map((option) => option.trim()),
	};
	return isValidQuestion(normalized) ? normalized : null;
}

function createQuestionBankRequest() {
	const query = new URLSearchParams({ module: "Fortinet FortiOS" });
	const url = new URL(`${API_URL}/questions/bank/all-usable?${query}`, window.location.origin);
	return new Request(url.href, { credentials: "include" });
}

export async function cacheFortiOSQuestionBankForOffline(bank) {
	if (typeof caches === "undefined") return;
	if (!bank || typeof bank !== "object" || !Array.isArray(bank.questions)) return;
	const cache = await caches.open(FORTIOS_OFFLINE_CACHE_NAME);
	const response = new Response(JSON.stringify(bank), {
		headers: { "Content-Type": "application/json; charset=utf-8" },
	});
	await cache.put(createQuestionBankRequest(), response);
}

export async function loadCachedFortiOSQuestionBank() {
	if (typeof caches === "undefined") {
		throw new Error("This browser does not support saved FortiOS offline questions.");
	}
	const request = createQuestionBankRequest();
	const offlineCache = await caches.open(FORTIOS_OFFLINE_CACHE_NAME);
	const cachedResponse = await offlineCache.match(request, { ignoreVary: true }) ??
		await caches.match(request, { ignoreVary: true });
	if (!cachedResponse) {
		throw new Error("No FortiOS questions are saved on this device yet. Connect to the internet, open a FortiOS exam once, then try offline again.");
	}
	const bank = await cachedResponse.json();
	if (!bank || typeof bank !== "object" || !Array.isArray(bank.questions)) {
		throw new TypeError("The saved FortiOS question bank is incomplete or invalid.");
	}
	const questions = bank.questions.map(normalizeQuestion).filter(Boolean);
	const uniqueQuestions = [...new Map(questions.map((question) => [question.prompt.toLowerCase(), question])).values()];
	if (uniqueQuestions.length === 0) {
		throw new Error("The saved FortiOS question bank contains no usable multiple-choice questions.");
	}
	return uniqueQuestions;
}
