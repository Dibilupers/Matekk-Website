import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, Clock3, X } from "lucide-react";
import { useAuth } from "../../../context/auth-context";
import {
	isCurrentProgramModuleQuizAttempt,
	readProgramModuleQuizProgress,
} from "../../../utils/programModuleQuizProgress";
import { ProgramModuleQuizAction } from "./ProgramModuleQuizPanel";
import { getProgramExamFormats } from "./programExamFormats";

export default function ProgramQuizControls({ programKey, basePath, modules, learningProgress, gradebookPath }) {
	const { profile } = useAuth();
	const userId = profile?.userId;
	const navigate = useNavigate();
	const [isQuizPickerOpen, setIsQuizPickerOpen] = useState(false);
	const [isExamPickerOpen, setIsExamPickerOpen] = useState(false);
	const progress = userId ? readProgramModuleQuizProgress(programKey, userId) : { modules: {} };
	const buttonClass = "flex h-12 items-center gap-2 rounded-full px-5 text-sm font-bold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 sm:h-[58px] sm:px-7 sm:text-base";
	const examFormats = getProgramExamFormats(programKey);

	useEffect(() => {
		if (!isQuizPickerOpen && !isExamPickerOpen) return undefined;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		function closeOnEscape(event) {
			if (event.key === "Escape") {
				setIsQuizPickerOpen(false);
				setIsExamPickerOpen(false);
			}
		}
		window.addEventListener("keydown", closeOnEscape);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [isExamPickerOpen, isQuizPickerOpen]);

	return (
		<>
			<div className="mt-8 flex flex-wrap gap-3">
				<button type="button" onClick={() => setIsExamPickerOpen(true)} className={`${buttonClass} bg-[#005b6b] text-white shadow-[0_10px_20px_rgba(0,91,107,0.16)] hover:bg-[#004653] hover:shadow-[0_14px_26px_rgba(0,91,107,0.24)]`}>
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
					<div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-[#071126]/55 p-4 backdrop-blur-sm" onMouseDown={(event) => {
						if (event.target === event.currentTarget) setIsExamPickerOpen(false);
					}}>
						<section role="dialog" aria-modal="true" aria-labelledby={`${programKey}-exam-picker-title`} className="ccna-page-enter w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="text-sm font-semibold text-[#005b6b]">{programKey === "ccna-automation" ? "CCNA Automation" : "CCNA Cybersecurity"}</p>
									<h2 id={`${programKey}-exam-picker-title`} className="mt-1 text-2xl font-bold text-[#071126]">Choose an exam</h2>
									<p className="mt-2 text-sm text-[#71819b]">Your exam progress is saved for this program and signed-in account.</p>
								</div>
								<button type="button" onClick={() => setIsExamPickerOpen(false)} aria-label="Close exam picker" className="rounded-full p-2 text-[#71819b] transition hover:bg-[#f0f7f7] hover:text-[#005b6b]"><X size={20} /></button>
							</div>
							<div className="mt-6 space-y-3">
								{Object.entries(examFormats).map(([examKey, exam]) => (
									<button
										key={examKey}
										type="button"
										onClick={() => {
											setIsExamPickerOpen(false);
											navigate(`${basePath}/exam/${examKey}`);
										}}
										className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[#d6e5e7] p-4 text-left transition hover:border-[#005b6b] hover:bg-[#f3f9f9]"
									>
										<span>
											<strong className="block text-base text-[#17233d]">{exam.name}</strong>
											<span className="mt-1 block text-sm text-[#71819b]">{exam.subtitle} · {Math.round(exam.durationSeconds / 60)} minutes</span>
										</span>
										<ArrowRight size={18} className="shrink-0 text-[#005b6b]" />
									</button>
								))}
							</div>
						</section>
					</div>,
					document.body,
				)
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
