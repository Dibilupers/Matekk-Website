import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProgramCompositeExam from "../../../Cisco/CCNA/programCompositeExam";
import QUESTIONS from "./networkPlusOfflineQuestions.json";
import { createNetworkPlusOfflineExamFormats } from "../networkPlusExamFormats";

const EXHIBITS = import.meta.glob("./network-exhibits/*.png", {
	eager: true,
	import: "default",
	query: "?url",
});
const EXHIBITS_BY_NAME = new Map(Object.entries(EXHIBITS).map(([path, url]) => [path.split("/").at(-1), url]));
const QUESTION_BANK = QUESTIONS.map((question) => ({
	...question,
	exhibitImage: question.imagePath ? EXHIBITS_BY_NAME.get(question.imagePath.split("/").at(-1)) : undefined,
}));

export default function NetworkPlusOfflineExam() {
	const { examKey } = useParams();
	const examFormats = useMemo(() => createNetworkPlusOfflineExamFormats(QUESTION_BANK), []);
	const exam = examFormats[examKey];

	if (!exam) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-[#fff9fa] px-4 py-16 text-[#17233d]">
				<section className="w-full max-w-xl rounded-2xl border border-[#f1cbd2] bg-white p-8 text-center shadow-sm">
					<p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#c8102e]">Offline Network+</p>
					<h1 className="mt-2 text-2xl font-bold">Exam format not found</h1>
					<p className="mt-3 text-sm leading-6 text-[#64748b]">Choose an exam format from the Network+ dashboard.</p>
					<Link to="/modules/programs" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#c8102e]">
						<ArrowLeft size={17} /> Back to offline modules
					</Link>
				</section>
			</main>
		);
	}

	return (
		<ProgramCompositeExam
			key={`comptia-network-plus-offline-${examKey}`}
			programKey="comptia-network-plus"
			examKey={examKey}
			examFormats={examFormats}
			theme="comptia"
		/>
	);
}
