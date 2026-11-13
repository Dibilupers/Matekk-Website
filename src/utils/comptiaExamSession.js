export function getCompTIAExamSessionKey(programKey, examKey) {
	const version = examKey !== "all_questions" ? "-v2" : "";
	const questionFormatVersion = programKey === "comptia-security-plus" ? "-organized-logs-v1" : "";
	return `matekk-${programKey}-${examKey}-exam-session${version}${questionFormatVersion}`;
}
