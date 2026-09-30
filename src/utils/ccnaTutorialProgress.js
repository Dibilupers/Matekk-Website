import { CCNA_CURRICULUM, slugifyCcnaTutorial } from "../pages/modules/programs/CCNA/ccnaCurriculum.js";

const CCNA_TUTORIAL_PROGRESS_KEY = "matekk-ccna-tutorial-progress";

function getTutorialProgressKey(userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		throw new TypeError("A signed-in user ID is required to access CCNA tutorial progress.");
	}
	return `${CCNA_TUTORIAL_PROGRESS_KEY}:${encodeURIComponent(String(userId))}`;
}

export function readCcnaTutorialProgress(userId) {
	const savedProgress = window.localStorage.getItem(getTutorialProgressKey(userId));
	if (!savedProgress) return new Set();

	try {
		const tutorialNumbers = JSON.parse(savedProgress);
		if (!Array.isArray(tutorialNumbers) || tutorialNumbers.some((number) => typeof number !== "string")) {
			throw new TypeError("Saved CCNA tutorial progress has an invalid structure.");
		}
		return new Set(tutorialNumbers);
	} catch (error) {
		console.error("Unable to restore saved CCNA tutorial progress.", error);
		return new Set();
	}
}

export function markCcnaTutorialOpened(userId, slug) {
	const tutorial = CCNA_CURRICULUM
		.flatMap((section) => section.tutorials)
		.find((item) => slugifyCcnaTutorial(item.title) === slug);
	if (!tutorial) return null;

	const completedTutorials = readCcnaTutorialProgress(userId);
	completedTutorials.add(tutorial.number);
	window.localStorage.setItem(
		getTutorialProgressKey(userId),
		JSON.stringify([...completedTutorials]),
	);
	return completedTutorials;
}
