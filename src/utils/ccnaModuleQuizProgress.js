const CCNA_MODULE_QUIZ_PROGRESS_KEY = "matekk-ccna-module-quiz-progress";
export const CCNA_MODULE_QUIZ_VERSION = 2;
export const CCNA_MODULE_QUIZ_DURATION_SECONDS = 30 * 60;

function getModuleQuizProgressKey(userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		throw new TypeError("A signed-in user ID is required to access CCNA module quiz progress.");
	}
	return `${CCNA_MODULE_QUIZ_PROGRESS_KEY}:${encodeURIComponent(String(userId))}`;
}

export function isCurrentCcnaModuleQuizAttempt(attempt) {
	return attempt?.quizVersion === CCNA_MODULE_QUIZ_VERSION;
}

export function getCcnaModuleQuizAttemptHistory(attempt, maxScore) {
	const history = Array.isArray(attempt?.attemptHistory) ? attempt.attemptHistory : [];
	if (!attempt || !["completed", "expired"].includes(attempt.status)) return history;

	const attemptNumber = Number.isInteger(attempt.attempts) && attempt.attempts > 0 ? attempt.attempts : 1;
	if (history.some((result) => result.attemptNumber === attemptNumber)) return history;
	return [
		...history,
		{
			attemptNumber,
			status: attempt.status,
			score: Number.isFinite(attempt.score) ? attempt.score : 0,
			maxScore: Number.isFinite(attempt.maxScore) ? attempt.maxScore : maxScore,
			submittedAt: Number.isFinite(attempt.submittedAt) ? attempt.submittedAt : null,
		},
	];
}

export function recordCcnaModuleQuizAttempt(attempt, maxScore) {
	const attemptNumber = Number.isInteger(attempt.attempts) && attempt.attempts > 0 ? attempt.attempts : 1;
	const result = {
		attemptNumber,
		status: attempt.status,
		score: Number.isFinite(attempt.score) ? attempt.score : 0,
		maxScore: Number.isFinite(maxScore) ? maxScore : attempt.maxScore ?? null,
		submittedAt: Number.isFinite(attempt.submittedAt) ? attempt.submittedAt : null,
	};
	const history = getCcnaModuleQuizAttemptHistory(attempt, result.maxScore)
		.filter((previousResult) => previousResult.attemptNumber !== attemptNumber);

	return {
		...attempt,
		maxScore: result.maxScore,
		attemptHistory: [...history, result],
	};
}

function createEmptyProgress() {
	return {
		activeModule: null,
		modules: {},
	};
}

export function readCcnaModuleQuizProgress(userId) {
	const savedProgress = window.localStorage.getItem(getModuleQuizProgressKey(userId));
	if (!savedProgress) return createEmptyProgress();

	try {
		const progress = JSON.parse(savedProgress);
		if (!progress || typeof progress !== "object" || !progress.modules || typeof progress.modules !== "object") {
			throw new TypeError("Saved CCNA module quiz progress has an invalid structure.");
		}
		return {
			activeModule: typeof progress.activeModule === "string" ? progress.activeModule : null,
			modules: progress.modules,
		};
	} catch (error) {
		console.error("Unable to restore saved CCNA module quiz progress.", error);
		return createEmptyProgress();
	}
}

export function saveCcnaModuleQuizProgress(userId, progress) {
	window.localStorage.setItem(getModuleQuizProgressKey(userId), JSON.stringify(progress));
}

export function beginCcnaModuleQuiz(userId, moduleNumber) {
	const progress = readCcnaModuleQuizProgress(userId);
	const previousAttempt = progress.modules[moduleNumber];
	if (isCurrentCcnaModuleQuizAttempt(previousAttempt) && previousAttempt.status === "in-progress") {
		const resumedProgress = { ...progress, activeModule: moduleNumber };
		saveCcnaModuleQuizProgress(userId, resumedProgress);
		return previousAttempt;
	}

	const attempt = {
		status: "in-progress",
		currentIndex: 0,
		answers: {},
		lockedQuestions: {},
		checked: false,
		deadline: Date.now() + CCNA_MODULE_QUIZ_DURATION_SECONDS * 1000,
		quizVersion: CCNA_MODULE_QUIZ_VERSION,
		attempts: (previousAttempt?.attempts ?? 0) + 1,
		bestScore: isCurrentCcnaModuleQuizAttempt(previousAttempt) ? previousAttempt.bestScore ?? null : null,
		attemptHistory: isCurrentCcnaModuleQuizAttempt(previousAttempt)
			? getCcnaModuleQuizAttemptHistory(previousAttempt, previousAttempt.maxScore)
			: [],
	};
	saveCcnaModuleQuizProgress(userId, {
		...progress,
		activeModule: moduleNumber,
		modules: {
			...progress.modules,
			[moduleNumber]: attempt,
		},
	});
	return attempt;
}
