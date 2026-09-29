const CCNA_MODULE_QUIZ_PROGRESS_KEY = "matekk-ccna-module-quiz-progress";

function createEmptyProgress() {
	return {
		activeModule: null,
		modules: {},
	};
}

export function readCcnaModuleQuizProgress() {
	const savedProgress = window.localStorage.getItem(CCNA_MODULE_QUIZ_PROGRESS_KEY);
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

export function saveCcnaModuleQuizProgress(progress) {
	window.localStorage.setItem(CCNA_MODULE_QUIZ_PROGRESS_KEY, JSON.stringify(progress));
}

export function beginCcnaModuleQuiz(moduleNumber) {
	const progress = readCcnaModuleQuizProgress();
	const previousAttempt = progress.modules[moduleNumber];
	if (previousAttempt?.status === "in-progress") {
		const resumedProgress = { ...progress, activeModule: moduleNumber };
		saveCcnaModuleQuizProgress(resumedProgress);
		return previousAttempt;
	}

	const attempt = {
		status: "in-progress",
		currentIndex: 0,
		answers: {},
		lockedQuestions: {},
		checked: false,
		deadline: Date.now() + 60 * 1000,
		attempts: (previousAttempt?.attempts ?? 0) + 1,
		bestScore: previousAttempt?.bestScore ?? null,
	};
	saveCcnaModuleQuizProgress({
		...progress,
		activeModule: moduleNumber,
		modules: {
			...progress.modules,
			[moduleNumber]: attempt,
		},
	});
	return attempt;
}
