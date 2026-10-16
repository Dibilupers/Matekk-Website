import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProgramCompositeExam from "../../Cisco/CCNA/programCompositeExam";
import { createCompTIAExamFormats } from "../Network+/networkPlusExamFormats";
import { loadCompTIAExamQuestions } from "../Network+/networkPlusExamQuestionBank";

export default function SecurityPlusExam() {
	const { examKey } = useParams();
	const [loadAttempt, setLoadAttempt] = useState(0);
	const [questionBankState, setQuestionBankState] = useState({ status: "loading", questions: [], error: null });

	useEffect(() => {
		let isActive = true;
		loadCompTIAExamQuestions("Security+")
			.then((questions) => {
				if (isActive) setQuestionBankState({ status: "ready", questions, error: null });
			})
			.catch((error) => {
				console.error("Unable to load the CompTIA Security+ question bank.", error);
				if (isActive) {
					setQuestionBankState({
						status: "error",
						questions: [],
						error: error instanceof Error ? error.message : "The Security+ question bank could not be loaded.",
					});
				}
			});
		return () => {
			isActive = false;
		};
	}, [loadAttempt]);

	const examFormats = questionBankState.status === "ready"
		? createCompTIAExamFormats(questionBankState.questions, {
			programKey: "comptia-security-plus",
			programName: "CompTIA Security+",
		})
		: null;
	const exam = examFormats?.[examKey];
	if (questionBankState.status === "ready" && !exam) {
		return <SecurityPlusExamMessage title="Exam format not found" message="Choose an exam format from the Security+ dashboard." />;
	}
	if (exam && questionBankState.questions.length < exam.questionCount) {
		return (
			<SecurityPlusExamMessage
				title={`${exam.name} is not available yet`}
				message={`The CompTIA Security+ question bank has ${questionBankState.questions.length} valid questions. This format requires ${exam.questionCount}.`}
			/>
		);
	}
	if (questionBankState.status !== "ready") {
		return (
			<SecurityPlusExamMessage
				title={questionBankState.status === "loading" ? "Preparing your Security+ exam" : "Unable to load the Security+ question bank"}
				message={questionBankState.status === "loading" ? "Loading questions labeled CompTIA Security+…" : questionBankState.error}
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
			key={`comptia-security-plus-${examKey}`}
			programKey="comptia-security-plus"
			examKey={examKey}
			examFormats={examFormats}
			theme="comptia"
		/>
	);
}

function SecurityPlusExamMessage({ title, message, isLoading = false, onRetry }) {
	return (
		<main className="flex min-h-screen items-center justify-center bg-[#fff9fa] px-4 py-16 text-[#17233d]">
			<section className="w-full max-w-xl rounded-2xl border border-[#f1cbd2] bg-white p-8 text-center shadow-sm">
				<h1 className="text-2xl font-bold text-[#c8102e]">{title}</h1>
				<p className="mt-3 text-sm leading-6 text-[#64748b]" role={isLoading ? "status" : "alert"}>{message}</p>
				{onRetry && (
					<button type="button" onClick={onRetry} className="mt-6 rounded-full bg-[#c8102e] px-6 py-3 font-semibold text-white transition hover:bg-[#a80e27]">
						Try again
					</button>
				)}
				<Link to="/modules/programs/comptia-security-plus" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#c8102e] transition hover:text-[#a80e27]">
					<ArrowLeft size={17} /> Back to Security+
				</Link>
			</section>
		</main>
	);
}
