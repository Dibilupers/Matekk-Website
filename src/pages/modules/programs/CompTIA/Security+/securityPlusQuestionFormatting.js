export function organizeSecurityLogPrompt(prompt, { offline = false } = {}) {
	if (offline && typeof prompt === "string") {
		const tracerouteCommands = [...prompt.matchAll(/[A-Z]:\\[^\s>]*>\s*tracert\s+\S+/gi)];
		if (tracerouteCommands.length > 1) {
			const trailingQuestion = prompt.match(/\s+((?:Which|What|How|Why|When|Where)\b[\s\S]*\?)\s*$/i);
			const endOfOutput = trailingQuestion ? trailingQuestion.index : prompt.length;
			const context = prompt.slice(0, tracerouteCommands[0].index).trim().replace(/[:\s]+$/, "");
			const output = prompt.slice(tracerouteCommands[0].index, endOfOutput).trim();
			const organizedOutput = output
				.replace(/^/, "Affected endpoint:\n")
				.replace(/\s+The engineer performs a traceroute from a device[\s\S]*?receives the following output:\s*/i, "\n\nUnaffected endpoint:\n")
				.replace(/\s+(Tracing route to\b)/gi, "\n$1")
				.replace(/\s+(\d{1,2})\s+(?=(?:\d+\s*ms|\*)\s*(?:\d+\s*ms|\*)?\s*(?:\d+\s*ms|\*)?\s)/g, "\n$1 ");
			return {
				prompt: context ? `${context}:` : "",
				exhibit: organizedOutput,
				afterExhibitPrompt: trailingQuestion?.[1]?.trim() ?? "",
			};
		}
	}
	if (typeof prompt !== "string" || !/\b(?:web\s+server\s+)?(?:logs?|entries)\s*:/i.test(prompt)) return { prompt };
	const logStartPattern = /(?:\d{1,3}\.){3}\d{1,3}(?=\s+(?:\[|--\s*\d{1,2}\/[A-Za-z]+\/\d{4}))/g;
	const starts = [...prompt.matchAll(logStartPattern)].map((match) => match.index);
	if (starts.length < 2) return { prompt };

	const context = prompt.slice(0, starts[0]).trim().replace(/[:\s]+$/, "");
	const trailingQuestion = prompt.match(/\s+((?:Which|What|How|Why|When|Where)\b[\s\S]*\?)\s*$/i);
	const endOfLogs = trailingQuestion ? trailingQuestion.index : prompt.length;
	const logEntries = starts
		.map((start, index) => prompt.slice(start, starts[index + 1] ?? endOfLogs).trim())
		.filter(Boolean);
	if (logEntries.length < 2) return { prompt };

	return {
		prompt: context ? `${context}.` : "",
		exhibit: logEntries.join("\n"),
		afterExhibitPrompt: trailingQuestion?.[1]?.trim() ?? "",
	};
}
