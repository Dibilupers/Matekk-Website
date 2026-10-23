import {
	CCNA_AUTOMATION_MODULE_QUIZZES,
	CCNA_CYBERSECURITY_MODULE_QUIZZES,
} from "./programModuleQuizData";
import { FORTIOS_EXAM_PROGRESS_FORMATS } from "./Fortinet/FortiOS/fortiosExamFormats";

const QUESTION_COUNTS = {
	short: 20,
	medium: 50,
	long: 100,
};

const EXAM_DETAILS = {
	short: { name: "Short Exam", subtitle: "20 questions", durationSeconds: 20 * 60 },
	medium: { name: "Medium Exam", subtitle: "50 questions", durationSeconds: 50 * 60 },
	long: { name: "Long Exam", subtitle: "100 questions", durationSeconds: 100 * 60 },
};

export const LEGACY_PROGRAM_EXAM_NAMES = {
	short: ["Quick Exam"],
	medium: ["Standard Exam"],
	long: ["Comprehensive Exam"],
};

const PROGRAM_QUIZZES = {
	"ccna-automation": CCNA_AUTOMATION_MODULE_QUIZZES,
	"ccna-cybersecurity": CCNA_CYBERSECURITY_MODULE_QUIZZES,
};

const PROGRAM_NAMES = {
	"ccna-automation": "CCNA Automation",
	"ccna-cybersecurity": "CCNA Cybersecurity",
};

function shuffle(items) {
	const shuffled = [...items];
	for (let index = shuffled.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
	}
	return shuffled;
}

export function getProgramExamFormats(programKey) {
	if (programKey === "fortinet-fortios") return FORTIOS_EXAM_PROGRESS_FORMATS;

	const moduleQuizzes = PROGRAM_QUIZZES[programKey];
	const programName = PROGRAM_NAMES[programKey];
	if (!moduleQuizzes || !programName) return null;

	const questionPool = moduleQuizzes.flatMap((module) =>
		module.questions.map((question) => ({
			...question,
			moduleNumber: module.number,
			moduleTitle: module.title,
		})),
	);
	const uniqueQuestionPool = [...new Map(questionPool.map((question) => [question.prompt, question])).values()];

	return Object.fromEntries(Object.entries(EXAM_DETAILS).map(([examKey, details]) => {
		const questionCount = QUESTION_COUNTS[examKey];
		if (questionCount > uniqueQuestionPool.length) {
			throw new Error(`${programName} does not have enough unique questions for the ${details.name}.`);
		}
		return [examKey, {
			...details,
			questionCount,
			sessionKey: `${programKey}-${examKey}-exam`,
			createQuestions: () => shuffle(uniqueQuestionPool).slice(0, questionCount),
			programName,
		}];
	}));
}
