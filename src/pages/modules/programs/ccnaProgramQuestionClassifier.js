const PROGRAM_KEYWORDS = {
	"ccna-automation": [
		[/\bnetwork automation\b|\bautomation\b|\bprogrammability\b|\bprogrammable\b/i, 3],
		[/\bnetconf\b|\brestconf\b|\byang\b|\bpyats\b|\bansible\b/i, 3],
		[/\bsoftware[- ]defined networking\b|\bsdn\b|\bnorthbound\b|\bsouthbound\b/i, 3],
		[/\binfrastructure as code\b|\bidempotent\b|\bmodel[- ]driven\b/i, 3],
		[/\bcontainer(?:s|ization)?\b|\bdocker\b|\bdockerfile\b|\bci\/cd\b|\bdevops\b/i, 3],
		[/\bcross[- ]site scripting\b|\bsql injection\b|\bcsrf\b|\breverse proxy\b/i, 3],
		[/\bencryption in transit\b|\bencryption at rest\b|\bdeployment secret/i, 3],
		[/\bjson\b|\byaml\b|\bapi\b|\bsdk\b|\bcontroller\b/i, 1],
		[/\bpython\b|\bgithub\b|\bgit\b|\bversion control\b/i, 2],
		[/\bcisco (?:meraki|catalyst center|aci|sd-wan|nso|intersight|ucs)\b/i, 3],
	],
	"ccna-cybersecurity": [
		[/\bcybersecurity\b|\bcyber security\b|\bsecurity awareness\b|\bsecurity policy\b|\bsecurity procedure\b/i, 3],
		[/\bconfidentiality\b|\bintegrity\b|\bavailability\b|\bcia triad\b/i, 2],
		[/\bvulnerabilit(?:y|ies)\b|\bthreat intelligence\b|\bthreat hunting\b|\bexploit\b/i, 3],
		[/\bsiem\b|\bsoar\b|\bsoc\b|\bids\b|\bips\b|\bintrusion\b/i, 3],
		[/\bmalware\b|\bransomware\b|\bphishing\b|\bsocial engineering\b|\bcommand and control\b/i, 3],
		[/\bcvss\b|\bcve\b|\bioc\b|\bioa\b|\bforensic(?:s)?\b|\bchain of custody\b/i, 3],
		[/\bincident response\b|\bincident handling\b|\bcontainment\b|\beradication\b/i, 3],
		[/\bendpoint\b|\bhost[- ]based\b|\bpacket capture\b|\bnetflow\b|\bfalse positive\b/i, 2],
		[/\bleast privilege\b|\baccess control\b|\bauthentication\b|\bauthorization\b/i, 2],
		[/\bencryption\b/i, 1],
	],
};

function getQuestionText(question) {
	const answerIndexes = Array.isArray(question?.answer) ? question.answer : [question?.answer];
	const correctOptions = answerIndexes
		.map((index) => Number.isInteger(index) ? question?.options?.[index] : null)
		.filter((option) => typeof option === "string");
	const correctMatches = Array.isArray(question?.items) && Array.isArray(question?.choices)
		? question.items.flatMap((item, index) => {
			const choice = question.choices[question.answer?.[index]];
			return typeof item === "string" && typeof choice === "string" ? [`${item} ${choice}`] : [];
		})
		: [];
	return [
		question?.topic,
		question?.prompt,
		question?.explanation,
		...correctOptions,
		...correctMatches,
	].filter((value) => typeof value === "string").join(" ");
}

function scoreProgram(text, programKey) {
	return PROGRAM_KEYWORDS[programKey].reduce(
		(score, [pattern, weight]) => score + (pattern.test(text) ? weight : 0),
		0,
	);
}

export function classifyCcnaProgramQuestion(question) {
	if (!question || typeof question !== "object") return null;
	const text = getQuestionText(question);
	const automationScore = scoreProgram(text, "ccna-automation");
	const cybersecurityScore = scoreProgram(text, "ccna-cybersecurity");
	if (Math.max(automationScore, cybersecurityScore) < 2) return null;
	if (Math.abs(automationScore - cybersecurityScore) < 2) return null;
	return automationScore > cybersecurityScore ? "ccna-automation" : "ccna-cybersecurity";
}
