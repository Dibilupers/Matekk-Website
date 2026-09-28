export const CCNA_EXAM_SESSION_KEY = "matekk-ccna-exam-session";

export function readCcnaExamSession() {
	const savedSession = window.sessionStorage.getItem(CCNA_EXAM_SESSION_KEY);
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

	window.sessionStorage.removeItem(CCNA_EXAM_SESSION_KEY);
	return null;
}

export function saveCcnaExamSession(session) {
	window.sessionStorage.setItem(CCNA_EXAM_SESSION_KEY, JSON.stringify(session));
}
