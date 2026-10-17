import { createCompTIAExamFormats } from "../Network+/networkPlusExamFormats";

export function createSecurityPlusExamFormats(questionBank) {
	return createCompTIAExamFormats(questionBank, {
		programKey: "comptia-security-plus",
		programName: "CompTIA Security+",
		includeAllQuestions: true,
	});
}
