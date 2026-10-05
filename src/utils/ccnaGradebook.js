const CCNA_MOCK_EXAM_RESULTS_KEY = "matekk-ccna-mock-exam-results";

function getMockExamResultsKey(userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		return null;
	}
	return `${CCNA_MOCK_EXAM_RESULTS_KEY}:${encodeURIComponent(String(userId))}`;
}

export function createCcnaMockExamAttemptId() {
	return globalThis.crypto?.randomUUID?.()
		?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function readCcnaMockExamResults(userId) {
	const key = getMockExamResultsKey(userId);
	if (!key) return [];

	const savedResults = window.localStorage.getItem(key);
	if (!savedResults) return [];

	try {
		const results = JSON.parse(savedResults);
		if (!Array.isArray(results)) throw new TypeError("Saved CCNA mock exam results must be an array.");
		return results.filter((result) =>
			typeof result?.id === "string" &&
			Number.isFinite(result.score) &&
			Number.isFinite(result.maxScore) &&
			result.maxScore > 0 &&
			Number.isFinite(result.submittedAt),
		);
	} catch (error) {
		console.error("Unable to restore saved CCNA mock exam results.", error);
		return [];
	}
}

export function saveCcnaMockExamResult(userId, result) {
	const key = getMockExamResultsKey(userId);
	if (!key || typeof result?.id !== "string") return;

	const results = readCcnaMockExamResults(userId);
	const existingIndex = results.findIndex((savedResult) => savedResult.id === result.id);
	if (existingIndex === -1) {
		results.push(result);
	} else {
		results[existingIndex] = result;
	}
	window.localStorage.setItem(key, JSON.stringify(results));
}