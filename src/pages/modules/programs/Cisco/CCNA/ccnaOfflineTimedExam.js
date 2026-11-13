import {
	createLongExamQuestions,
	createMediumExamQuestions,
	createShortExamQuestions,
	setDatabaseQuestions,
} from "./ccnaQuestionBank";

export function createOfflineCcnaExamQuestions(examKey, questions) {
	setDatabaseQuestions(questions);

	const examQuestions = {
		short: createShortExamQuestions,
		medium: createMediumExamQuestions,
		long: createLongExamQuestions,
	}[examKey];
	if (!examQuestions) throw new RangeError(`Unsupported offline CCNA exam format: ${examKey}.`);

	const selectedQuestions = examQuestions();
	const questionCount = { short: 50, medium: 100, long: 150 }[examKey];
	if (selectedQuestions.length !== questionCount) {
		throw new RangeError(`The saved CCNA question bank cannot provide ${questionCount} questions for the ${examKey} exam.`);
	}

	return selectedQuestions.map((question) => ({
		...question,
		id: question.bankId ?? question.id,
		offlineBankSource: "database",
	}));
}
