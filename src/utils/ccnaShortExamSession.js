const CCNA_SHORT_EXAM_SESSION_KEY = "matekk-ccna-short-exam-session";

export function getCcnaShortExamSessionKey(userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		throw new TypeError("A signed-in user ID is required to access CCNA short exam progress.");
	}
	return `${CCNA_SHORT_EXAM_SESSION_KEY}:${encodeURIComponent(String(userId))}`;
}
