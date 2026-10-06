import { CCNA_AUTOMATION_CURRICULUM } from "./ccnaAutomationCurriculum";

const PROGRESS_KEY = "matekk-ccna-automation-learning-progress";

function getProgressKey(userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		throw new TypeError("A signed-in user ID is required to access CCNA Automation progress.");
	}
	return `${PROGRESS_KEY}:${encodeURIComponent(String(userId))}`;
}

export function readCcnaAutomationProgress(userId) {
	const savedProgress = window.localStorage.getItem(getProgressKey(userId));
	if (!savedProgress) return { openedModules: [], openedLessons: [], completedLessons: [], recentLesson: null };

	try {
		const progress = JSON.parse(savedProgress);
		if (!progress || typeof progress !== "object") {
			throw new TypeError("Saved CCNA Automation progress has an invalid structure.");
		}
		const lessonSlugs = new Set(
			CCNA_AUTOMATION_CURRICULUM.flatMap((module) => module.lessons.map((lesson) => lesson.slug)),
		);
		const validModuleNumbers = new Set(CCNA_AUTOMATION_CURRICULUM.map((module) => module.number));
		const completedLessons = Array.isArray(progress.completedLessons)
			? progress.completedLessons.filter((slug) => typeof slug === "string" && lessonSlugs.has(slug))
			: [];
		const recentLesson = typeof progress.recentLesson === "string" && lessonSlugs.has(progress.recentLesson)
			? progress.recentLesson
			: completedLessons.at(-1) ?? null;
		const openedLessons = Array.isArray(progress.openedLessons)
			? progress.openedLessons.filter((slug) => typeof slug === "string" && lessonSlugs.has(slug))
			: [];
		const openedModules = Array.isArray(progress.openedModules)
			? progress.openedModules.filter((number) => typeof number === "string" && validModuleNumbers.has(number))
			: [];
		return {
			openedModules,
			openedLessons: [...new Set([...openedLessons, ...completedLessons, ...(recentLesson ? [recentLesson] : [])])],
			completedLessons,
			recentLesson,
		};
	} catch (error) {
		console.error("Unable to restore saved CCNA Automation progress.", error);
		return { openedModules: [], openedLessons: [], completedLessons: [], recentLesson: null };
	}
}

function updateProgress(userId, update) {
	const progress = readCcnaAutomationProgress(userId);
	const nextProgress = update(progress);
	window.localStorage.setItem(getProgressKey(userId), JSON.stringify(nextProgress));
	return nextProgress;
}

export function markCcnaAutomationModuleOpened(userId, moduleNumber) {
	if (!CCNA_AUTOMATION_CURRICULUM.some((module) => module.number === moduleNumber)) return null;
	return updateProgress(userId, (progress) => ({
		...progress,
		openedModules: [...progress.openedModules.filter((number) => number !== moduleNumber), moduleNumber],
	}));
}

export function markCcnaAutomationLessonOpened(userId, lessonSlug) {
	const module = CCNA_AUTOMATION_CURRICULUM.find((item) =>
		item.lessons.some((lesson) => lesson.slug === lessonSlug),
	);
	if (!module) return null;
	return updateProgress(userId, (progress) => ({
		...progress,
		openedModules: [...progress.openedModules.filter((number) => number !== module.number), module.number],
		openedLessons: [...new Set([...(progress.openedLessons ?? []), lessonSlug])],
		recentLesson: lessonSlug,
	}));
}

export function markCcnaAutomationLessonCompleted(userId, lessonSlug) {
	const lessonExists = CCNA_AUTOMATION_CURRICULUM.some((module) =>
		module.lessons.some((lesson) => lesson.slug === lessonSlug),
	);
	if (!lessonExists) return null;
	const module = CCNA_AUTOMATION_CURRICULUM.find((item) =>
		item.lessons.some((lesson) => lesson.slug === lessonSlug),
	);
	return updateProgress(userId, (progress) => ({
		...progress,
		openedModules: [...progress.openedModules.filter((number) => number !== module.number), module.number],
		openedLessons: [...new Set([...(progress.openedLessons ?? []), lessonSlug])],
		completedLessons: [...new Set([...progress.completedLessons, lessonSlug])],
		recentLesson: lessonSlug,
	}));
}
