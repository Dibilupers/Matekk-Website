const CCNA_SHORT_EXAM_SESSION_KEY = "matekk-ccna-short-exam-session";

export function getCcnaShortExamSessionKey(userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		throw new TypeError("A signed-in user ID is required to access CCNA short exam progress.");
	}
	return `${CCNA_SHORT_EXAM_SESSION_KEY}:${encodeURIComponent(String(userId))}`;
}

export function readCcnaShortExamProgress(userId) {
	if (userId === null || userId === undefined || String(userId).trim() === "") {
		return { status: "not-started", deadline: null, answeredCount: 0, score: 0, maxScore: 0 };
	}

	const savedSession = window.sessionStorage.getItem(getCcnaShortExamSessionKey(userId));
	if (!savedSession) {
		return { status: "not-started", deadline: null, answeredCount: 0, score: 0, maxScore: 0 };
	}

	try {
		const session = JSON.parse(savedSession);
		if (
			!session ||
			!Array.isArray(session.questions) ||
			!session.answers ||
			typeof session.answers !== "object" ||
			!Number.isFinite(session.deadline) ||
			typeof session.isSubmitted !== "boolean"
		) {
			throw new TypeError("Saved CCNA short exam progress has an invalid structure.");
		}
		const score = session.questions.reduce(
			(total, question, index) => total + Number(session.answers[index] === question.answer),
			0,
		);
		const isExpired = !session.isSubmitted && session.deadline <= Date.now();
		return {
			status: session.isSubmitted ? "completed" : isExpired ? "expired" : "in-progress",
			deadline: session.isSubmitted || isExpired ? null : session.deadline,
			answeredCount: Object.keys(session.answers).length,
			score,
			maxScore: session.questions.length,
		};
	} catch (error) {
		console.error("Unable to restore the saved CCNA short exam status.", error);
		return { status: "not-started", deadline: null, answeredCount: 0, score: 0, maxScore: 0 };
	}
}
