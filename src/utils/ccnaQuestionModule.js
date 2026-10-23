export function isCcnaQuestionModule(module) {
	if (typeof module !== "string") return false;
	const normalizedModule = module.trim().toLocaleLowerCase();
	return normalizedModule === "ccna" ||
		normalizedModule.startsWith("ccna part ") ||
		normalizedModule.startsWith("ccna 200-301 set ");
}
