import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, Clock3, X } from "lucide-react";
import { useAuth } from "../../../context/auth-context";
import { readCcnaExamProgress } from "../../../utils/ccnaShortExamSession";
import { readGradebookAssessments } from "../../../utils/gradebookApi";
import {
	isCurrentProgramModuleQuizAttempt,
	readProgramModuleQuizProgress,
} from "../../../utils/programModuleQuizProgress";
import { ProgramModuleQuizAction } from "./ProgramModuleQuizPanel";
import { getProgramExamFormats } from "./programExamFormats";

function getExamRuns(examFormats, userId, assessments = []) {
	return Object.fromEntries(Object.entries(examFormats).map(([examKey, exam]) => {
		const progress = readCcnaExamProgress(exam.sessionKey, userId);
		const result = assessments
			.filter((assessment) =>
				assessment.type === "exam" &&
				(assessment.title === `${exam.name} · ${exam.programName}` || assessment.title === exam.name),
			)
			.sort((first, second) => second.submittedAt - first.submittedAt)[0];
		const hasResult = progress.status !== "in-progress" && (
			Boolean(result) ||
			(["completed", "expired"].includes(progress.status) && progress.maxScore > 0)
		);
		return [examKey, {
			exam,
			progress,
			result: result
				? { ...result, hasResult: true }
				: { score: progress.score, maxScore: progress.maxScore, hasResult },
			isActive: progress.status === "in-progress",
		}];
	}));
}

function formatExamTime(totalSeconds) {
	const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
	const seconds = (totalSeconds % 60).toString().padStart(2, "0");
	return `${minutes}:${seconds}`;
}

export default function ProgramQuizControls({ programKey, basePath, modules, learningProgress, gradebookPath }) {
	const { profile } = useAuth();
	const userId = profile?.userId;
	const navigate = useNavigate();
	const [isQuizPickerOpen, setIsQuizPickerOpen] = useState(false);
	const [isExamPickerOpen, setIsExamPickerOpen] = useState(false);
	const [selectedExamFormat, setSelectedExamFormat] = useState("short");
	const [retakeExamFormat, setRetakeExamFormat] = useState(null);
	const [examRuns, setExamRuns] = useState({});
	const [examResultsError, setExamResultsError] = useState("");
	const [examClockNow, setExamClockNow] = useState(Date.now);
	const progress = userId ? readProgramModuleQuizProgress(programKey, userId) : { modules: {} };
	const buttonClass = "flex h-12 items-center gap-2 rounded-full px-5 text-sm font-bold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 sm:h-[58px] sm:px-7 sm:text-base";
	const examFormats = useMemo(() => getProgramExamFormats(programKey), [programKey]);

	useEffect(() => {
		if (!isQuizPickerOpen && !isExamPickerOpen && !retakeExamFormat) return undefined;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		function closeOnEscape(event) {
			if (event.key === "Escape") {
				setIsQuizPickerOpen(false);
				setIsExamPickerOpen(false);
				setRetakeExamFormat(null);
			}
		}
		window.addEventListener("keydown", closeOnEscape);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [isExamPickerOpen, isQuizPickerOpen, retakeExamFormat]);

	useEffect(() => {
		if (!isExamPickerOpen || !examFormats || !userId) return undefined;
		let active = true;
		readGradebookAssessments(programKey, userId)
			.then((assessments) => {
				if (active) setExamRuns(getExamRuns(examFormats, userId, assessments));
			})
			.catch((error) => {
				console.error(`Unable to load ${programKey} exam results.`, error);
				if (active) {
					setExamRuns(getExamRuns(examFormats, userId));
					setExamResultsError(error instanceof Error ? error.message : "Exam results could not be loaded.");
				}
			});
		return () => { active = false; };
	}, [examFormats, isExamPickerOpen, programKey, userId]);

	useEffect(() => {
		if (!isExamPickerOpen) return undefined;
		const interval = window.setInterval(() => setExamClockNow(Date.now()), 1000);
		return () => window.clearInterval(interval);
	}, [isExamPickerOpen]);

	function openExamPicker() {
		setSelectedExamFormat("short");
		setExamResultsError("");
		if (examFormats && userId) setExamRuns(getExamRuns(examFormats, userId));
		setIsExamPickerOpen(true);
	}

	return (
		<>
			<div className="mt-8 flex flex-wrap gap-3">
				<button type="button" onClick={openExamPicker} className={`${buttonClass} bg-[#005b6b] text-white shadow-[0_10px_20px_rgba(0,91,107,0.16)] hover:bg-[#004653] hover:shadow-[0_14px_26px_rgba(0,91,107,0.24)]`}>
					Start Exam <ArrowRight size={18} />
				</button>
				<button type="button" onClick={() => setIsQuizPickerOpen(true)} className={`${buttonClass} bg-[#005b6b] text-white shadow-[0_10px_20px_rgba(0,91,107,0.16)] hover:bg-[#004653] hover:shadow-[0_14px_26px_rgba(0,91,107,0.24)]`}>
					Start Quiz <ArrowRight size={18} />
				</button>
				<Link to={`${basePath}/knowledge-hub`} className={`${buttonClass} border border-[#005b6b] text-[#005b6b] hover:bg-[#f0f7f7] hover:shadow-[0_10px_20px_rgba(0,91,107,0.12)]`}>
					View All Modules
				</Link>
				{gradebookPath && (
					<Link to={gradebookPath} className={`${buttonClass} border border-[#005b6b] text-[#005b6b] hover:bg-[#f0f7f7] hover:shadow-[0_10px_20px_rgba(0,91,107,0.12)] sm:hidden`}>
						Gradebook
					</Link>
				)}
			</div>

			{isExamPickerOpen && examFormats && (
				createPortal(
					<div className="fixed inset-0 z-[110] flex items-center justify-center overflow-x-hidden overflow-y-auto bg-[#071126]/55 p-2 backdrop-blur-sm sm:p-4" onMouseDown={(event) => {
						if (event.target === event.currentTarget) setIsExamPickerOpen(false);
					}}>
						<section role="dialog" aria-modal="true" aria-labelledby={`${programKey}-exam-picker-title`} className="ccna-page-enter my-auto max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-3xl overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:w-full sm:p-8">
							<header className="flex items-start justify-between gap-4">
								<div>
									<p className="text-sm font-semibold text-[#005b6b]">{programKey === "ccna-automation" ? "CCNA Automation" : "CCNA Cybersecurity"} practice</p>
									<h2 id={`${programKey}-exam-picker-title`} className="mt-1 text-xl font-bold text-[#071126] sm:text-2xl">Choose an exam format</h2>
								</div>
								<button type="button" onClick={() => setIsExamPickerOpen(false)} aria-label="Close exam picker" className="rounded-full p-2 text-[#71819b] transition hover:bg-[#f0f7f7] hover:text-[#005b6b]"><X size={20} /></button>
							</header>
							<p className="mt-3 text-sm leading-6 text-[#71819b]">
								Each exam randomly selects questions from the {programKey === "ccna-automation" ? "CCNA Automation" : "CCNA Cybersecurity"} question bank. Choose the number of questions and time limit that suit your practice session.
							</p>
							{examResultsError && (
								<p role="alert" className="mt-3 rounded-xl border border-[#f2c6c3] bg-[#fff8f7] px-4 py-3 text-sm text-[#b42318]">
									Exam results could not be refreshed. {examResultsError}
								</p>
							)}
							<div className="mt-6 grid gap-3 md:grid-cols-3">
								{Object.entries(examFormats).map(([examKey, exam]) => {
									const run = examRuns[examKey];
									const isSelected = selectedExamFormat === examKey;
									const formatName = { short: "Short Exam", medium: "Medium Exam", long: "Long Exam" }[examKey] ?? exam.name;
									const description = {
										short: "A quick practice session.",
										medium: "A balanced, longer practice session.",
										long: "A full-length practice session.",
									}[examKey] ?? exam.subtitle;
									const secondsRemaining = run?.progress.deadline
										? Math.max(0, Math.ceil((run.progress.deadline - examClockNow) / 1000))
										: null;
									return (
									<button
										key={examKey}
										type="button"
										aria-pressed={isSelected}
										onClick={() => setSelectedExamFormat(examKey)}
										className={`min-w-0 rounded-2xl border p-4 text-left transition-colors sm:p-5 ${isSelected ? "border-[#005b6b] bg-[#eaf3f4] text-[#005b6b]" : "border-[#d6e5e7] text-[#263654] hover:border-[#a9cdd2]"}`}
									>
										<span className="flex min-h-7 items-start justify-between gap-2">
											<span className="text-lg font-bold">{formatName}</span>
											{run?.isActive && secondsRemaining !== null && (
												<span role="timer" aria-label={`${exam.name}: ${formatExamTime(secondsRemaining)} remaining`} className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums sm:text-xs ${secondsRemaining <= 60 ? "bg-[#fff0ed] text-[#b42318]" : "bg-[#e8f3f4] text-[#005b6b]"}`}>
													{formatExamTime(secondsRemaining)} left
												</span>
											)}
										</span>
										<span className="mt-3 block text-3xl font-extrabold">{exam.questionCount}</span>
										<span className="block text-sm font-medium text-[#71819b]">questions</span>
										<span className="mt-4 flex items-center gap-1.5 text-sm font-semibold"><Clock3 size={15} /> {Math.round(exam.durationSeconds / 60)} minutes</span>
										<span className="mt-2 block text-sm leading-5 text-[#71819b]">{description}</span>
									</button>
									);
								})}
							</div>
							{selectedExamFormat && examRuns[selectedExamFormat] && (
								<div className="mt-5 grid grid-cols-1 gap-3 rounded-xl bg-[#f5f9f9] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
									<div className="min-w-0 sm:pr-3">
										<p className="text-sm text-[#526584]">
											{examRuns[selectedExamFormat].exam.questionCount} questions · {Math.round(examRuns[selectedExamFormat].exam.durationSeconds / 60)} minutes · {examRuns[selectedExamFormat].exam.programName} practice
										</p>
										{examRuns[selectedExamFormat].result.hasResult && (
											<p className="mt-1 text-sm font-semibold text-[#005b6b]">
												Last result: {examRuns[selectedExamFormat].result.score}/{examRuns[selectedExamFormat].result.maxScore}
												{" · "}
												{Math.round((examRuns[selectedExamFormat].result.score / examRuns[selectedExamFormat].result.maxScore) * 100)}%
											</p>
										)}
									</div>
									{examRuns[selectedExamFormat].isActive ? (
										<button type="button" disabled={!userId} onClick={() => {
											setIsExamPickerOpen(false);
											navigate(`${basePath}/exam/${selectedExamFormat}`);
										}} className="shrink-0 rounded-full bg-[#005b6b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-50">
											Continue Exam
										</button>
									) : examRuns[selectedExamFormat].result.hasResult ? (
										<div className="flex flex-wrap gap-2 sm:justify-self-end">
											<button type="button" disabled={!userId} onClick={() => {
												setIsExamPickerOpen(false);
												const { result } = examRuns[selectedExamFormat];
												navigate(`${basePath}/exam/${selectedExamFormat}`, {
													state: { showExamResult: true, ...(result.id ? { examResult: result } : {}) },
												});
											}} className="rounded-full border border-[#9fc8ce] px-4 py-3 text-sm font-bold text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-not-allowed disabled:opacity-50">
												Review Result
											</button>
											<button type="button" disabled={!userId} onClick={() => setRetakeExamFormat(selectedExamFormat)} className="rounded-full bg-[#005b6b] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-50">
												Retake Exam
											</button>
										</div>
									) : (
										<button type="button" disabled={!userId} onClick={() => {
											setIsExamPickerOpen(false);
											navigate(`${basePath}/exam/${selectedExamFormat}`);
										}} className="justify-self-start rounded-full bg-[#005b6b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-50 sm:justify-self-end">
											Start {examRuns[selectedExamFormat].exam.name}
										</button>
									)}
								</div>
							)}
						</section>
					</div>,
					document.body,
				)
			)}

			{retakeExamFormat && createPortal(
				<div className="fixed inset-0 z-[120] grid place-items-center bg-[#071126]/60 p-4 backdrop-blur-sm">
					<section role="alertdialog" aria-modal="true" aria-labelledby={`${programKey}-retake-exam-title`} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
						<p className="text-sm font-semibold text-[#005b6b]">{programKey === "ccna-automation" ? "CCNA Automation" : "CCNA Cybersecurity"} practice</p>
						<h2 id={`${programKey}-retake-exam-title`} className="mt-2 text-xl font-bold text-[#071126] sm:text-2xl">Are you sure you want to retake the {examFormats[retakeExamFormat].name.toLowerCase()}?</h2>
						<p className="mt-3 text-sm leading-6 text-[#71819b]">A new attempt will start with a fresh set of randomly selected questions. Your previous result will remain saved.</p>
						<div className="mt-6 flex flex-wrap justify-end gap-3">
							<button type="button" onClick={() => setRetakeExamFormat(null)} className="rounded-full border border-[#c9dfe2] px-5 py-3 text-sm font-semibold text-[#526584] transition hover:bg-[#f5f9f9]">Cancel</button>
							<button type="button" disabled={!userId} onClick={() => {
								const examKey = retakeExamFormat;
								setRetakeExamFormat(null);
								setIsExamPickerOpen(false);
								navigate(`${basePath}/exam/${examKey}`, { state: { retakeExam: true } });
							}} className="rounded-full bg-[#005b6b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-50">Yes, retake exam</button>
						</div>
					</section>
				</div>,
				document.body,
			)}

			{isQuizPickerOpen && (
				createPortal(				<div className="fixed inset-0 z-[110] flex items-center justify-center overflow-x-hidden overflow-y-auto bg-[#071126]/55 p-2 backdrop-blur-sm sm:p-5" onMouseDown={(event) => {
					if (event.target === event.currentTarget) setIsQuizPickerOpen(false);
				}}>
					<section role="dialog" aria-modal="true" aria-labelledby={`${programKey}-quiz-picker-title`} className="ccna-page-enter my-auto flex max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:w-full">
						<div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#e2ecec] px-5 py-4 sm:px-8 sm:py-5">
							<div className="min-w-0">
								<p className="text-sm font-semibold text-[#005b6b]">{programKey === "ccna-automation" ? "CCNA Automation" : "CCNA Cybersecurity"} practice</p>
								<h2 id={`${programKey}-quiz-picker-title`} className="mt-1 text-xl font-bold text-[#071126] sm:text-2xl">Choose a module quiz</h2>
								<p className="mt-2 text-sm text-[#71819b]">Pick a module to see its curriculum and start or continue its quiz.</p>
							</div>
							<button type="button" onClick={() => setIsQuizPickerOpen(false)} aria-label="Close quiz picker" className="rounded-full p-2 text-[#71819b] transition hover:bg-[#f0f7f7] hover:text-[#005b6b]"><X size={20} /></button>
						</div>
						<div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-4 sm:p-6">
							{modules.map((module) => {
								const savedAttempt = progress.modules[module.number];
								const attempt = isCurrentProgramModuleQuizAttempt(savedAttempt) ? savedAttempt : null;
								const result = ["completed", "expired"].includes(attempt?.status);
								const answeredCount = Object.keys(attempt?.answers ?? {}).length;
								const lessonCount = module.lessons?.length ?? 0;
								const completedLessons = module.lessons?.filter((lesson) =>
									learningProgress?.completedLessons?.includes(lesson.slug),
								).length ?? 0;
								return (
									<article key={module.number} className="relative rounded-2xl border border-[#d6e5e7] bg-white p-4 transition-colors hover:border-[#a9cdd2] sm:p-5">
										<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
											<div className="min-w-0">
											<p className="text-xs font-bold uppercase tracking-[0.12em] text-[#005b6b]">Module {module.number}</p>
											<h3 className="mt-1 text-2xl font-bold leading-tight text-[#111a2d] sm:text-4xl">{module.title}</h3>
											{module.description && <p className="mt-2 max-w-xl text-sm leading-6 text-[#7c89a1]">{module.description}</p>}
											<div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#71819b]">
												{lessonCount > 0 && <span className="inline-flex items-center gap-1.5"><BookOpen size={14} />{completedLessons}/{lessonCount} lessons read</span>}
												<span className="inline-flex items-center gap-1.5"><Check size={14} />20 questions</span>
												<span className="inline-flex items-center gap-1.5"><Clock3 size={14} />20 minutes</span>
											</div>
											<p className={`mt-2 text-sm font-bold ${result || attempt?.status === "in-progress" ? "text-[#005b6b]" : "text-[#8b96a9]"}`}>
												{result
													? `${attempt.status === "expired" ? "Expired · last score" : "Last score"} ${attempt.score ?? 0}/20`
													: attempt?.status === "in-progress"
														? `${answeredCount}/20 answered`
														: "Not started"}
											</p>
											</div>
											<div className="flex shrink-0 flex-wrap justify-start gap-2 sm:justify-end">
												{result && (
													<button
														type="button"
														disabled={!userId}
														onClick={() => {
															setIsQuizPickerOpen(false);
															navigate(`${basePath}/quiz/${module.number}`);
														}}
														className="rounded-full border border-[#9fc8ce] px-4 py-2.5 text-sm font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-not-allowed disabled:opacity-50"
													>
														View Result
													</button>
												)}
												<ProgramModuleQuizAction programKey={programKey} basePath={basePath} module={module} compact={false} />
											</div>
										</div>
									</article>
								);
							})}
						</div>
					</section>
				</div>, document.body)
			)}
		</>
	);
}
