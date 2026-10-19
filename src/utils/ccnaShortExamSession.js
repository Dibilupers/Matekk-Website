import { isAnswerCorrect, isQuestionAnswered } from "./ccnaExamGrading";

const CCNA_SHORT_EXAM_SESSION_KEY = "matekk-ccna-short-exam-session";

const EMPTY_EXAM_PROGRESS = { status: "not-started", deadline: null, answeredCount: 0, score: 0, maxScore: 0 };

// Session keys are per signed-in user, e.g. "matekk-ccna-medium-exam-session:42".
export function getCcnaExamSessionKey(baseKey, userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		throw new TypeError("A signed-in user ID is required to access CCNA exam progress.");
	}
	return `${baseKey}:${encodeURIComponent(String(userId))}`;
}

export function readCcnaExamProgress(baseKey, userId) {
	if (userId === null || userId === undefined || String(userId).trim() === "") {
		return EMPTY_EXAM_PROGRESS;
	}

	const savedSession = window.sessionStorage.getItem(getCcnaExamSessionKey(baseKey, userId));
	if (!savedSession) {
		return EMPTY_EXAM_PROGRESS;
	}

	try {
		const session = JSON.parse(savedSession);
		if (
			!session ||
			!Array.isArray(session.questions) ||
			!session.answers ||
			typeof session.answers !== "object" ||
			(session.deadline !== null && !Number.isFinite(session.deadline)) ||
			typeof session.isSubmitted !== "boolean"
		) {
			throw new TypeError("Saved CCNA exam progress has an invalid structure.");
		}
		const score = Number.isFinite(session.score)
			? session.score
			: session.questions.reduce(
				(total, question, index) => total + Number(isAnswerCorrect(question, session.answers[index])),
				0,
			);
		const expiredAtDeadline = session.deadline !== null &&
			Number.isFinite(session.submittedAt) &&
			session.submittedAt >= session.deadline;
		const isExpired = expiredAtDeadline || (!session.isSubmitted && session.deadline !== null && session.deadline <= Date.now());
		return {
			status: isExpired ? "expired" : session.isSubmitted ? "completed" : "in-progress",
			deadline: session.isSubmitted || isExpired ? null : session.deadline,
			answeredCount: session.questions.filter((question, index) => isQuestionAnswered(question, session.answers[index])).length,
			score,
			maxScore: session.questions.length,
		};
	} catch (error) {
		console.error("Unable to restore the saved CCNA exam status.", error);
		return EMPTY_EXAM_PROGRESS;
	}
}

export function getCcnaShortExamSessionKey(userId) {
	return getCcnaExamSessionKey(CCNA_SHORT_EXAM_SESSION_KEY, userId);
}

export function readCcnaShortExamProgress(userId) {
	return readCcnaExamProgress(CCNA_SHORT_EXAM_SESSION_KEY, userId);
}
