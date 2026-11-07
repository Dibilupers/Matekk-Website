const ROUTABLE_PROGRAMS = new Set([
	"ccna",
	"ccna-automation",
	"ccna-cybersecurity",
	"comptia-network-plus",
	"comptia-security-plus",
	"fortinet-fortios",
]);

export const LEGACY_CCNA_ALL_QUESTIONS_ROUTE = "/modules/programs/ccna/exam/all_questions";

export function getExamRoute(programKey, examKey) {
	if (programKey === "fortios-offline" && examKey === "all_questions") {
		return "/modules/programs/fortios/exam/all";
	}
	if (!ROUTABLE_PROGRAMS.has(programKey) || !["short", "medium", "long", "all_questions"].includes(examKey)) {
		return null;
	}
	if (programKey === "ccna" && examKey === "all_questions") {
		return "/modules/programs/ccna/exam/all";
	}
	return `/modules/programs/${programKey}/exam/${examKey}`;
}

export function getExamRoutePattern(programKey) {
	return ROUTABLE_PROGRAMS.has(programKey)
		? `/modules/programs/${programKey}/exam/:examKey`
		: null;
}
