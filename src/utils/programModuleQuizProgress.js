import {
	CCNA_MODULE_QUIZ_VERSION,
	getCcnaModuleQuizAttemptHistory,
	recordCcnaModuleQuizAttempt,
} from "./ccnaModuleQuizProgress";

const PROGRAM_QUIZ_PROGRESS_KEY = "matekk-program-module-quiz-progress";

function getProgressKey(programKey, userId) {
	if (!["ccna-automation", "ccna-cybersecurity"].includes(programKey)) {
		throw new TypeError(`Unsupported program quiz key: ${programKey}`);
	}
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		throw new TypeError("A signed-in user ID is required to access program module quiz progress.");
	}
	return `${PROGRAM_QUIZ_PROGRESS_KEY}:${programKey}:${encodeURIComponent(String(userId))}`;
}

function createEmptyProgress() {
	return { activeModule: null, modules: {} };
}

export function isCurrentProgramModuleQuizAttempt(attempt) {
	return attempt?.quizVersion === CCNA_MODULE_QUIZ_VERSION;
}

export function readProgramModuleQuizProgress(programKey, userId) {
	const savedProgress = window.localStorage.getItem(getProgressKey(programKey, userId));
	if (!savedProgress) return createEmptyProgress();
	try {
		const progress = JSON.parse(savedProgress);
		if (!progress || typeof progress !== "object" || !progress.modules || typeof progress.modules !== "object") {
			throw new TypeError("Saved program module quiz progress has an invalid structure.");
		}
		return {
			activeModule: typeof progress.activeModule === "string" ? progress.activeModule : null,
			modules: progress.modules,
		};
	} catch (error) {
		console.error(`Unable to restore saved ${programKey} quiz progress.`, error);
		return createEmptyProgress();
	}
}

export function saveProgramModuleQuizProgress(programKey, userId, progress) {
	window.localStorage.setItem(getProgressKey(programKey, userId), JSON.stringify(progress));
}

export function beginProgramModuleQuiz(programKey, userId, moduleNumber, durationSeconds) {
	const progress = readProgramModuleQuizProgress(programKey, userId);
	const previousAttempt = progress.modules[moduleNumber];
	if (isCurrentProgramModuleQuizAttempt(previousAttempt) && previousAttempt.status === "in-progress") {
		saveProgramModuleQuizProgress(programKey, userId, { ...progress, activeModule: moduleNumber });
		return previousAttempt;
	}

	const attempt = {
		status: "in-progress",
		currentIndex: 0,
		answers: {},
		lockedQuestions: {},
		checked: false,
		deadline: Date.now() + durationSeconds * 1000,
		quizVersion: CCNA_MODULE_QUIZ_VERSION,
		attempts: (previousAttempt?.attempts ?? 0) + 1,
		bestScore: isCurrentProgramModuleQuizAttempt(previousAttempt) ? previousAttempt.bestScore ?? null : null,
		attemptHistory: isCurrentProgramModuleQuizAttempt(previousAttempt)
			? getCcnaModuleQuizAttemptHistory(previousAttempt, previousAttempt.maxScore)
			: [],
	};
	saveProgramModuleQuizProgress(programKey, userId, {
		...progress,
		activeModule: moduleNumber,
		modules: { ...progress.modules, [moduleNumber]: attempt },
	});
	return attempt;
}

export function recordProgramModuleQuizAttempt(attempt, maxScore) {
	return recordCcnaModuleQuizAttempt(attempt, maxScore);
}
