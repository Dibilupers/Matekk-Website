import {
	CCNA_AUTOMATION_MODULE_QUIZZES,
	CCNA_CYBERSECURITY_MODULE_QUIZZES,
} from "./programModuleQuizData";
import {
	isCurrentProgramModuleQuizAttempt,
	readProgramModuleQuizProgress,
} from "../../../utils/programModuleQuizProgress";

export function getProgramModuleQuizAverage(programKey, userId) {
	if (!userId) return 0;
	const quizzes = programKey === "ccna-automation"
		? CCNA_AUTOMATION_MODULE_QUIZZES
		: programKey === "ccna-cybersecurity"
			? CCNA_CYBERSECURITY_MODULE_QUIZZES
			: [];
	if (quizzes.length === 0) return 0;

	const progress = readProgramModuleQuizProgress(programKey, userId);
	let correctAnswers = 0;
	let questionsCounted = 0;

	for (const quiz of quizzes) {
		const attempt = progress.modules[quiz.number];
		if (!isCurrentProgramModuleQuizAttempt(attempt, programKey, quiz.number)) continue;

		const answers = attempt.answers ?? {};
		const answeredIndexes = Object.keys(answers)
			.map(Number)
			.filter((index) => Number.isInteger(index) && index >= 0 && index < quiz.questions.length);
		const isFinished = ["completed", "expired"].includes(attempt.status);
		if (!isFinished && answeredIndexes.length === 0) continue;

		questionsCounted += isFinished ? quiz.questions.length : answeredIndexes.length;
		correctAnswers += quiz.questions.reduce(
			(total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
			0,
		);
	}

	return questionsCounted === 0 ? 0 : Math.round((correctAnswers / questionsCounted) * 100);
}
