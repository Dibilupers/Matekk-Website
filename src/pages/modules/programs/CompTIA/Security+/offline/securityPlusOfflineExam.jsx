import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProgramCompositeExam from "../../../Cisco/CCNA/programCompositeExam";
import QUESTIONS from "./securityPlusOfflineQuestions.json";
import SIMULATIONS from "./securityPlusSimulations.json";
import { createSecurityPlusExamFormats } from "../securityPlusExamFormats";

const EXHIBITS = import.meta.glob("./sy0-exhibits/*.png", {
	eager: true,
	import: "default",
	query: "?inline",
});
const EXHIBITS_BY_NAME = new Map(Object.entries(EXHIBITS).map(([path, url]) => [path.split("/").at(-1), url]));

function organizeSecurityLogPrompt(prompt) {
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
		prompt: [context ? `${context}.` : "", trailingQuestion?.[1]?.trim() ?? ""].filter(Boolean).join("\n\n"),
		exhibit: logEntries.join("\n"),
	};
}

const QUESTION_BANK = [...QUESTIONS, ...SIMULATIONS].map((question) => ({
	...question,
	...organizeSecurityLogPrompt(question.prompt),
	exhibitImage: question.imagePath ? EXHIBITS_BY_NAME.get(question.imagePath.split("/").at(-1)) : undefined,
}));

export default function SecurityPlusOfflineExam() {
	const { examKey } = useParams();
	const examFormats = useMemo(() => createSecurityPlusExamFormats(QUESTION_BANK, { offline: true }), []);
	const exam = examFormats[examKey];
	if (!exam) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-[#fff9fa] px-4 py-16 text-[#17233d]">
				<section className="w-full max-w-xl rounded-2xl border border-[#f1cbd2] bg-white p-8 text-center shadow-sm">
					<p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#c8102e]">Offline Security+</p>
					<h1 className="mt-2 text-2xl font-bold">Exam format not found</h1>
					<p className="mt-3 text-sm leading-6 text-[#64748b]">Choose an exam format from the Security+ dashboard.</p>
					<Link to="/modules/programs/comptia-security-plus" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#c8102e]"><ArrowLeft size={17} /> Back to Security+</Link>
				</section>
			</main>
		);
	}
	return (
		<ProgramCompositeExam
			key={`comptia-security-plus-offline-${examKey}`}
			programKey="comptia-security-plus"
			examKey={examKey}
			examFormats={examFormats}
			theme="comptia"
		/>
	);
}
