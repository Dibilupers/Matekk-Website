import { CCNA_CURRICULUM, slugifyCcnaTutorial } from "../pages/modules/programs/Cisco/CCNA/ccnaCurriculum.js";

const CCNA_TUTORIAL_PROGRESS_KEY = "matekk-ccna-tutorial-progress";
const CCNA_OPENED_MODULES_KEY = "matekk-ccna-opened-modules";

function getTutorialProgressKey(userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		throw new TypeError("A signed-in user ID is required to access CCNA tutorial progress.");
	}
	return `${CCNA_TUTORIAL_PROGRESS_KEY}:${encodeURIComponent(String(userId))}`;
}

function getOpenedModulesKey(userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		throw new TypeError("A signed-in user ID is required to access CCNA module progress.");
	}
	return `${CCNA_OPENED_MODULES_KEY}:${encodeURIComponent(String(userId))}`;
}

export function readCcnaOpenedModules(userId) {
	const savedModules = window.localStorage.getItem(getOpenedModulesKey(userId));
	if (!savedModules) return new Set();

	try {
		const moduleNumbers = JSON.parse(savedModules);
		if (!Array.isArray(moduleNumbers) || moduleNumbers.some((number) => typeof number !== "string")) {
			throw new TypeError("Saved CCNA opened-module progress has an invalid structure.");
		}
		const validModuleNumbers = moduleNumbers.filter((number) =>
			CCNA_CURRICULUM.some((section) => section.number === number),
		);
		return new Set(validModuleNumbers);
	} catch (error) {
		console.error("Unable to restore saved CCNA opened-module progress.", error);
		return new Set();
	}
}

export function markCcnaModuleOpened(userId, moduleNumber) {
	if (!CCNA_CURRICULUM.some((section) => section.number === moduleNumber)) return new Set();

	const openedModules = readCcnaOpenedModules(userId);
	openedModules.delete(moduleNumber);
	openedModules.add(moduleNumber);
	window.localStorage.setItem(getOpenedModulesKey(userId), JSON.stringify([...openedModules]));
	return openedModules;
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
	const module = CCNA_CURRICULUM.find((section) =>
		section.tutorials.some((item) => item.number === tutorial.number),
	);
	if (module) markCcnaModuleOpened(userId, module.number);
	window.localStorage.setItem(
		getTutorialProgressKey(userId),
		JSON.stringify([...completedTutorials]),
	);
	return completedTutorials;
}
