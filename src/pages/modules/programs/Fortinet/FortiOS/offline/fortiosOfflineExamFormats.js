import { isValidQuestion } from "../../../../../../utils/ccnaExamGrading";

export const FORTIOS_OFFLINE_EXAM_FORMATS = {
	short: { name: "Short Exam", questionCount: 25, durationSeconds: 25 * 60 },
	medium: { name: "Medium Exam", questionCount: 50, durationSeconds: 60 * 60 },
	long: { name: "Long Exam", questionCount: 75, durationSeconds: 80 * 60 },
	all_questions: { name: "All Questions Exam", questionCount: null, durationSeconds: null },
};

function shuffle(items) {
	const shuffled = [...items];
	for (let index = shuffled.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(Math.random() * (index + 1));
		[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
	}
	return shuffled;
}

export function createFortiOSOfflineExam(questionBank, examKey) {
	const format = FORTIOS_OFFLINE_EXAM_FORMATS[examKey];
	if (!format) throw new Error("Choose a valid FortiOS exam format.");
	if (!Array.isArray(questionBank) || questionBank.length === 0 || !questionBank.every(isValidQuestion)) {
		throw new TypeError("The saved FortiOS question bank is invalid.");
	}
	if (format.questionCount !== null && questionBank.length < format.questionCount) {
		throw new Error(`${format.name} needs ${format.questionCount} questions, but only ${questionBank.length} are saved on this device.`);
	}
	const questions = format.questionCount === null
		? [...questionBank]
		: shuffle(questionBank).slice(0, format.questionCount);
	return {
		...format,
		questionCount: questions.length,
		questions: shuffle(questions),
	};
}
