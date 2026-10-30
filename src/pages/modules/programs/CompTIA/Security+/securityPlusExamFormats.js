import { createCompTIAExamFormats } from "../Network+/networkPlusExamFormats";
import SIMULATIONS from "./offline/securityPlusSimulations.json";

const SIMULATION_EXHIBITS = import.meta.glob("./offline/sy0-exhibits/*.png", {
	eager: true,
	import: "default",
	query: "?inline",
});
const SIMULATION_EXHIBITS_BY_NAME = new Map(Object.entries(SIMULATION_EXHIBITS).map(([path, url]) => [path.split("/").at(-1), url]));
const SIMULATION_QUESTIONS = SIMULATIONS.map((question) => ({
	...question,
	exhibitImage: question.imagePath ? SIMULATION_EXHIBITS_BY_NAME.get(question.imagePath.split("/").at(-1)) : undefined,
}));

function shuffle(items) {
	const shuffled = [...items];
	for (let index = shuffled.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(Math.random() * (index + 1));
		[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
	}
	return shuffled;
}

function hasExhibit(question) {
	return Boolean(question?.exhibitImage || question?.imagePath || question?.imageUrl);
}

export function createSecurityPlusExamFormats(questionBank, { includeOfflineSimulations = false } = {}) {
	const regularQuestionBank = questionBank.filter((question) => question.type !== "study");
	const simulations = includeOfflineSimulations ? SIMULATION_QUESTIONS : [];
	const formats = createCompTIAExamFormats(regularQuestionBank, {
		programKey: "comptia-security-plus",
		programName: "CompTIA Security+",
		includeAllQuestions: true,
	});
	const imageQuestions = [...new Map(regularQuestionBank
		.filter(hasExhibit)
		.map((question) => [question.prompt.trim().toLocaleLowerCase(), question])).values()];

	return Object.fromEntries(Object.entries(formats).map(([examKey, format]) => [
		examKey,
		{
			...format,
			questionCount: format.questionCount + (includeOfflineSimulations && examKey === "all_questions" ? SIMULATION_QUESTIONS.length : 0),
			scoredQuestionCount: format.questionCount,
			sessionKey: includeOfflineSimulations ? `${format.sessionKey}-offline-simulations-v1` : format.sessionKey,
			createQuestions() {
				const questions = format.createQuestions();
				const examSimulations = includeOfflineSimulations && examKey === "all_questions" ? simulations : [];
				const targetExhibitCount = Math.min(imageQuestions.length, Math.ceil(questions.length / 50) * 5);
				const selectedExhibits = [...questions.filter(hasExhibit).slice(0, targetExhibitCount)];
				const selectedPrompts = new Set(selectedExhibits.map((question) => question.prompt.trim().toLocaleLowerCase()));
				const remainingExhibits = shuffle(imageQuestions.filter((question) => !selectedPrompts.has(question.prompt.trim().toLocaleLowerCase())));
				selectedExhibits.push(...remainingExhibits.slice(0, targetExhibitCount - selectedExhibits.length));
				const selectedRegularQuestions = questions.filter((question) => !hasExhibit(question));
				const regularPrompts = new Set(selectedRegularQuestions.map((question) => question.prompt.trim().toLocaleLowerCase()));
				const regularPool = [
					...selectedRegularQuestions,
					...questionBank.filter((question) => !hasExhibit(question) && !regularPrompts.has(question.prompt.trim().toLocaleLowerCase())),
				];
				const regularQuestions = shuffle(regularPool).slice(0, questions.length - selectedExhibits.length);
				const balancedQuestions = [];
				let exhibitIndex = 0;
				let regularIndex = 0;
				for (let start = 0; start < questions.length; start += 50) {
					const segmentSize = Math.min(50, questions.length - start);
					const segmentExhibits = selectedExhibits.slice(exhibitIndex, exhibitIndex + Math.min(5, selectedExhibits.length - exhibitIndex));
					exhibitIndex += segmentExhibits.length;
					const segmentRegular = regularQuestions.slice(regularIndex, regularIndex + segmentSize - segmentExhibits.length);
					regularIndex += segmentRegular.length;
					balancedQuestions.push(...shuffle([...segmentExhibits, ...segmentRegular]));
				}
				return [...balancedQuestions, ...examSimulations];
			},
		},
	]));
}
