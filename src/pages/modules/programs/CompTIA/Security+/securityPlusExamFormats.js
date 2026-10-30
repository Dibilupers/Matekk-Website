import { createCompTIAExamFormats } from "../Network+/networkPlusExamFormats";

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

export function createSecurityPlusExamFormats(questionBank) {
	const formats = createCompTIAExamFormats(questionBank, {
		programKey: "comptia-security-plus",
		programName: "CompTIA Security+",
		includeAllQuestions: true,
	});
	const imageQuestions = [...new Map(questionBank
		.filter(hasExhibit)
		.map((question) => [question.prompt.trim().toLocaleLowerCase(), question])).values()];

	return Object.fromEntries(Object.entries(formats).map(([examKey, format]) => [
		examKey,
		{
			...format,
			createQuestions() {
				const questions = format.createQuestions();
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
				return balancedQuestions;
			},
		},
	]));
}
