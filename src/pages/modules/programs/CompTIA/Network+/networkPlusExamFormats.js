const EXAM_FORMATS = {
	short: { name: "Short Exam", questionCount: 50, durationSeconds: 45 * 60 },
	medium: { name: "Medium Exam", questionCount: 100, durationSeconds: 90 * 60 },
	long: { name: "Long Exam", questionCount: 150, durationSeconds: 120 * 60 },
};

function shuffle(items) {
	const shuffled = [...items];
	for (let index = shuffled.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
	}
	return shuffled;
}

function shuffleQuestionChoices(question) {
	if (question.type === "study" || question.type === "text") return { ...question };
	if (["match", "drag_drop", "click_boxes", "image"].includes(question.type)) {
		const order = shuffle(question.choices.map((_, index) => index));
		const newIndexByOldIndex = new Map(order.map((oldIndex, newIndex) => [oldIndex, newIndex]));
		return {
			...question,
			choices: order.map((index) => question.choices[index]),
			answer: question.answer.map((index) => newIndexByOldIndex.get(index)),
			...(Array.isArray(question.groupSizes)
				? { groupSizes: order.map((index) => question.groupSizes[index]) }
				: {}),
		};
	}

	const order = shuffle(question.options.map((_, index) => index));
	const newIndexByOldIndex = new Map(order.map((oldIndex, newIndex) => [oldIndex, newIndex]));
	return {
		...question,
		options: order.map((index) => question.options[index]),
		answer: Array.isArray(question.answer)
			? question.answer.map((index) => newIndexByOldIndex.get(index))
			: newIndexByOldIndex.get(question.answer),
	};
}

export function createCompTIAExamFormats(
	questionBank,
	{
		programKey = "comptia-network-plus",
		programName = "CompTIA Network+",
		includeAllQuestions = false,
		examFormatDefinitions = EXAM_FORMATS,
		deduplicateQuestions = true,
	} = {},
) {
	const uniqueQuestions = deduplicateQuestions
		? [...new Map(questionBank.map((question) => [question.prompt.trim().toLowerCase(), question])).values()]
		: [...questionBank];

	const timedFormats = Object.fromEntries(Object.entries(examFormatDefinitions).map(([examKey, format]) => [
		examKey,
		{
			...format,
			subtitle: `${programName} question bank`,
			sessionKey: `matekk-${programKey}-${examKey}-exam-session`,
			path: `/modules/programs/${programKey}/exam/${examKey}`,
			programName,
			createQuestions() {
				if (uniqueQuestions.length < format.questionCount) {
					throw new Error(
						`The ${programName} question bank has ${uniqueQuestions.length} valid questions; ${format.name} requires ${format.questionCount}.`,
					);
				}
				return shuffle(uniqueQuestions)
					.slice(0, format.questionCount)
					.map(shuffleQuestionChoices);
			},
		},
	]));

	if (!includeAllQuestions) return timedFormats;

	return {
		...timedFormats,
		all_questions: {
			name: "All Questions Exam",
			subtitle: `${programName} question bank`,
			questionCount: questionBank.length,
			durationSeconds: null,
			sessionKey: `matekk-${programKey}-all_questions-exam-session`,
			path: `/modules/programs/${programKey}/exam/all_questions`,
			programName,
			createQuestions() {
				return [...questionBank];
			},
		},
	};
}

export function createNetworkPlusExamFormats(questionBank) {
	return createCompTIAExamFormats(questionBank, { includeAllQuestions: true });
}
