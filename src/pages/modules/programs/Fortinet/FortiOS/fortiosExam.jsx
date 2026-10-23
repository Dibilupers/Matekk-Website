import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProgramCompositeExam from "../../Cisco/CCNA/programCompositeExam";
import { FORTIOS_EXAM_FORMAT_DEFINITIONS, createFortiOSExamFormats } from "./fortiosExamFormats";
import { loadFortiOSExamQuestions } from "./fortiosExamQuestionBank";

export default function FortiOSExam() {
	const { examKey } = useParams();
	const [loadAttempt, setLoadAttempt] = useState(0);
	const [questionBankState, setQuestionBankState] = useState({ status: "loading", questions: [], error: null });

	useEffect(() => {
		let isActive = true;
		loadFortiOSExamQuestions()
			.then((questions) => {
				if (isActive) setQuestionBankState({ status: "ready", questions, error: null });
			})
			.catch((error) => {
				console.error("Unable to load the FortiOS question bank.", error);
				if (isActive) {
					setQuestionBankState({
						status: "error",
						questions: [],
						error: error instanceof Error ? error.message : "The FortiOS question bank could not be loaded.",
					});
				}
			});
		return () => {
			isActive = false;
		};
	}, [loadAttempt]);

	const examFormats = questionBankState.status === "ready"
		? createFortiOSExamFormats(questionBankState.questions)
		: null;
	const exam = examFormats?.[examKey];

	if (questionBankState.status === "ready" && !FORTIOS_EXAM_FORMAT_DEFINITIONS[examKey]) {
		return <FortiOSExamMessage title="Exam format not found" message="Choose an exam format from the FortiOS dashboard." />;
	}
	if (exam && exam.questionCount !== null && questionBankState.questions.length < exam.questionCount) {
		return (
			<FortiOSExamMessage
				title={`${exam.name} is not available yet`}
				message={`The FortiOS question bank has ${questionBankState.questions.length} questions. This format requires ${exam.questionCount}.`}
			/>
		);
	}
	if (questionBankState.status !== "ready") {
		return (
			<FortiOSExamMessage
				title={questionBankState.status === "loading" ? "Preparing your FortiOS exam" : "Unable to load the FortiOS question bank"}
				message={questionBankState.status === "loading" ? "Loading FortiOS questions…" : questionBankState.error}
				isLoading={questionBankState.status === "loading"}
				onRetry={questionBankState.status === "error" ? () => {
					setQuestionBankState({ status: "loading", questions: [], error: null });
					setLoadAttempt((attempt) => attempt + 1);
				} : undefined}
			/>
		);
	}

	return (
		<ProgramCompositeExam
			key={`fortinet-fortios-${examKey}`}
			programKey="fortinet-fortios"
			examKey={examKey}
			examFormats={examFormats}
			theme="fortinet"
		/>
	);
}

function FortiOSExamMessage({ title, message, isLoading = false, onRetry }) {
	return (
		<main className="flex min-h-screen items-center justify-center bg-[#fff8f7] px-4 py-16 text-[#17233d]">
			<section className="w-full max-w-xl rounded-2xl border border-[#f1d3d0] bg-white p-8 text-center shadow-sm">
				<h1 className="text-2xl font-bold text-[#e2231a]">{title}</h1>
				<p className="mt-3 text-sm leading-6 text-[#64748b]" role={isLoading ? "status" : "alert"}>{message}</p>
				{onRetry && (
					<button type="button" onClick={onRetry} className="mt-6 rounded-full bg-[#e2231a] px-6 py-3 font-semibold text-white transition hover:bg-[#bd2119]">
						Try again
					</button>
				)}
				<Link to="/modules/programs/fortinet-fortios" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#e2231a] transition hover:text-[#bd2119]">
					<ArrowLeft size={17} /> Back to FortiOS
				</Link>
			</section>
		</main>
	);
}
