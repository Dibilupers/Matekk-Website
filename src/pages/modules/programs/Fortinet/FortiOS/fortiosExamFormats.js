import { createCompTIAExamFormats } from "../../CompTIA/Network+/networkPlusExamFormats";

export const FORTIOS_EXAM_FORMAT_DEFINITIONS = {
	short: { name: "Short Exam", questionCount: 25, durationSeconds: 25 * 60 },
	medium: { name: "Medium Exam", questionCount: 50, durationSeconds: 60 * 60 },
	long: { name: "Long Exam", questionCount: 75, durationSeconds: 80 * 60 },
	all_questions: { name: "All Questions Exam", questionCount: null, durationSeconds: null },
};

export const FORTIOS_EXAM_PROGRESS_FORMATS = Object.fromEntries(
	Object.entries(FORTIOS_EXAM_FORMAT_DEFINITIONS).map(([examKey, format]) => [
		examKey,
		{
			...format,
			programName: "FortiOS",
			sessionKey: `matekk-fortinet-fortios-${examKey}-exam-session`,
		},
	]),
);

export function createFortiOSExamFormats(questionBank) {
	if (!Array.isArray(questionBank) || questionBank.length === 0) {
		throw new TypeError("The FortiOS question bank must contain at least one valid question.");
	}
	const formats = createCompTIAExamFormats(questionBank, {
		programKey: "fortinet-fortios",
		programName: "FortiOS",
		includeAllQuestions: true,
		deduplicateQuestions: false,
		examFormatDefinitions: Object.fromEntries(
			Object.entries(FORTIOS_EXAM_FORMAT_DEFINITIONS)
				.filter(([examKey]) => examKey !== "all_questions"),
		),
	});
	return {
		...formats,
		all_questions: {
			...formats.all_questions,
			name: FORTIOS_EXAM_FORMAT_DEFINITIONS.all_questions.name,
		},
	};
}
