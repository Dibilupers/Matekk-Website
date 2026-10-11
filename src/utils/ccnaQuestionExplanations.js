import { CCNA_MODULE_QUIZZES } from "../pages/modules/programs/Cisco/CCNA/ccnaModuleQuizData";
import { CCNA_MEDIUM_EXAM_QUESTIONS } from "../pages/modules/programs/Cisco/CCNA/ccnaMediumExamData";
import {
	CCNA_COMPOSITE_SET_QUESTIONS,
	CCNA_COMPOSITE_SET2_QUESTIONS,
} from "../pages/modules/programs/Cisco/CCNA/ccnaCompositeSetQuestions";
import { CCNA_LEGACY_QUESTIONS } from "../pages/modules/programs/Cisco/CCNA/ccnaLegacyQuestions";
import { CCNA_LEGACY_200_301_QUESTIONS } from "../pages/modules/programs/Cisco/CCNA/ccnaLegacyQuestionBank";
import { splitPromptExhibit } from "./splitPromptExhibit";

function normalizePrompt(prompt) {
	return splitPromptExhibit(prompt).prompt.replace(/\s+/g, " ").trim().toLowerCase();
}

const explanationSources = [
	...CCNA_MODULE_QUIZZES.flatMap((quiz) => quiz.questions),
	...CCNA_COMPOSITE_SET_QUESTIONS,
	...CCNA_COMPOSITE_SET2_QUESTIONS,
	...CCNA_MEDIUM_EXAM_QUESTIONS,
	...CCNA_LEGACY_QUESTIONS,
	...CCNA_LEGACY_200_301_QUESTIONS,
];
const explanationByPrompt = new Map(
	explanationSources
		.filter((question) => typeof question.explanation === "string" && question.explanation.trim())
		.map((question) => [normalizePrompt(question.prompt), question.explanation.trim()]),
);

export function findCcnaQuestionExplanation(prompt) {
	return explanationByPrompt.get(normalizePrompt(prompt)) ?? "";
}

export function getCcnaQuestionExplanation(question) {
	const existingExplanation = typeof question?.explanation === "string"
		? question.explanation.trim()
		: "";
	if (existingExplanation) return existingExplanation;

	const bankExplanation = findCcnaQuestionExplanation(question?.prompt);
	if (bankExplanation) return bankExplanation;

	if (
		/\b(spanning.tree|root bridge)\b/i.test(question?.prompt ?? "") &&
		/\b(root|spanning.tree)\b/i.test(question?.prompt ?? "")
	) {
		const exhibit = `${question.exhibit ?? ""}\n${question.exhibitText ?? ""}`;
		const bridges = [...exhibit.matchAll(/([\w.-]+)\s*=\s*(\d+)\s+([0-9a-f.:-]+)/gi)]
			.map((match) => ({
				name: match[1],
				priority: Number(match[2]),
				mac: match[3].replace(/[.:-]/g, "").toLowerCase(),
			}))
			.filter((bridge) => Number.isFinite(bridge.priority));
		if (bridges.length > 1) {
			const root = bridges.sort((first, second) =>
				first.priority - second.priority || first.mac.localeCompare(second.mac),
			)[0];
			const vlan = /\bVLAN\s+(\d+)\b/i.exec(question.prompt)?.[1];
			return `STP elects the root bridge with the lowest bridge ID: priority first, then MAC address if priorities tie. ${root.name} has the lowest priority (${root.priority}), so it becomes the root bridge${vlan ? ` for VLAN ${vlan}` : ""}.`;
		}
	}

	return "";
}
