export const CCNA_EXAM_SESSION_KEY = "matekk-ccna-exam-session";

function getCcnaExamSessionKey(userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		return null;
	}
	return `${CCNA_EXAM_SESSION_KEY}:${encodeURIComponent(String(userId))}`;
}

export function readCcnaExamSession(userId) {
	const key = getCcnaExamSessionKey(userId);
	if (!key) return null;
	const savedSession = window.sessionStorage.getItem(key);
	if (!savedSession) return null;

	try {
		const session = JSON.parse(savedSession);
		const isValid =
			session &&
			Array.isArray(session.quizQuestions) &&
			session.quizQuestions.length > 0 &&
			Number.isInteger(session.currentIndex) &&
			session.currentIndex >= 0 &&
			session.currentIndex < session.quizQuestions.length &&
			Number.isFinite(session.deadline) &&
			session.answers &&
			typeof session.answers === "object" &&
			["active", "completed", "expired"].includes(session.status);

		if (isValid) return session;
	} catch (error) {
		console.error("Unable to restore the saved CCNA exam session.", error);
	}

	window.sessionStorage.removeItem(key);
	return null;
}

export function saveCcnaExamSession(userId, session) {
	const key = getCcnaExamSessionKey(userId);
	if (!key) return;
	window.sessionStorage.setItem(key, JSON.stringify(session));
}
