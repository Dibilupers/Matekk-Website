import { CCNA_MODULE_QUIZZES } from "./ccnaModuleQuizData";
import { CCNA_MEDIUM_EXAM_QUESTIONS } from "./ccnaMediumExamData";

// Settings for each CCNA practice exam, shared by the exam page and the CCNA dashboard.

export function shuffle(items) {
	const shuffled = [...items];
	for (let index = shuffled.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
	}
	return shuffled;
}

// 50 random questions from the module quizzes: 8 from each of modules 1.0–6.0, plus 1 extra from two of them.
function createShortExamQuestions() {
	const moduleQuizzes = CCNA_MODULE_QUIZZES.filter((quiz) => /^[1-6]\.0$/.test(quiz.number));
	if (moduleQuizzes.length !== 6 || moduleQuizzes.some((quiz) => quiz.questions.length < 8)) {
		throw new Error("The short CCNA exam requires at least 8 questions from each module, 1.0 through 6.0.");
	}

	const modulesWithExtraQuestion = new Set(shuffle(moduleQuizzes.map((quiz) => quiz.number)).slice(0, 2));
	return shuffle(moduleQuizzes.flatMap((quiz) => {
		const questionCount = 8 + Number(modulesWithExtraQuestion.has(quiz.number));
		return shuffle(quiz.questions)
			.slice(0, questionCount)
			.map((question) => ({
				...question,
				moduleNumber: quiz.number,
				moduleTitle: quiz.title,
			}));
	}));
}

export const CCNA_EXAMS = {
	short: {
		name: "Short Exam",
		subtitle: "Modules 1.0–6.0",
		questionCount: 50,
		durationSeconds: 45 * 60,
		sessionKey: "matekk-ccna-short-exam-session",
		path: "/modules/programs/ccna/exam/short",
		createQuestions: createShortExamQuestions,
	},
	medium: {
		name: "Medium Exam",
		subtitle: "CCNA practice questions",
		questionCount: CCNA_MEDIUM_EXAM_QUESTIONS.length,
		durationSeconds: 90 * 60,
		sessionKey: "matekk-ccna-medium-exam-session",
		path: "/modules/programs/ccna/exam/medium",
		createQuestions: () => shuffle(CCNA_MEDIUM_EXAM_QUESTIONS),
	},
};
