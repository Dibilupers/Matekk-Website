import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, CircleAlert } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import {
	beginProgramModuleQuiz,
	isCurrentProgramModuleQuizAttempt,
	readProgramModuleQuizProgress,
} from "../../../utils/programModuleQuizProgress";

export const PROGRAM_MODULE_QUIZ_DURATION_SECONDS = 20 * 60;

function QuizCoverageCard({ attemptedCount, totalModules, coverage }) {
	const [slide, setSlide] = useState(0);

	return (
		<div className="overflow-hidden rounded-[18px] border border-[#d6e5e7] bg-white">
			<div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${slide * 100}%)` }}>
				<div className="flex w-full shrink-0 items-center gap-5 p-6">
					<div
						role="progressbar"
						aria-label="Quiz coverage"
						aria-valuemin={0}
						aria-valuemax={100}
						aria-valuenow={coverage}
						className="relative h-16 w-16 shrink-0 rounded-full"
						style={{ background: `conic-gradient(#005b6b ${coverage}%, #e4eaf4 0)` }}
					>
						<span className="absolute inset-[7px] flex items-center justify-center rounded-full bg-white text-xs font-bold text-[#005b6b]">{coverage}%</span>
					</div>
					<div className="min-w-0">
						<strong className="text-lg">Quiz coverage</strong>
						<p className="mt-1 text-sm text-[#7c89a1]">{attemptedCount} of {totalModules} quizzes attempted</p>
					</div>
				</div>
				<div className="flex w-full shrink-0 items-center gap-5 p-6">
					<div
						role="progressbar"
						aria-label="Exam progress"
						aria-valuemin={0}
						aria-valuemax={100}
						aria-valuenow={0}
						className="relative h-16 w-16 shrink-0 rounded-full"
						style={{ background: "conic-gradient(#005b6b 0%, #e4eaf4 0)" }}
					>
						<span className="absolute inset-[7px] flex items-center justify-center rounded-full bg-white text-xs font-bold text-[#005b6b]">0%</span>
					</div>
					<div className="min-w-0">
						<strong className="text-lg">Exam progress</strong>
						<p className="mt-1 text-sm text-[#7c89a1]">Exams are not available yet</p>
					</div>
				</div>
			</div>
			<div className="flex h-8 items-center justify-center gap-2 pb-2" aria-label="Progress panels">
				<button type="button" onClick={() => setSlide(0)} disabled={slide === 0} aria-label="Show quiz progress" className="rounded-full p-1 text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-default disabled:opacity-30"><ChevronLeft size={16} /></button>
				<div className="flex items-center gap-2" aria-hidden="true">
					<span className={`h-2 rounded-full transition-all ${slide === 0 ? "w-6 bg-[#005b6b]" : "w-2 bg-[#cbd5e1]"}`} />
					<span className={`h-2 rounded-full transition-all ${slide === 1 ? "w-6 bg-[#005b6b]" : "w-2 bg-[#cbd5e1]"}`} />
				</div>
				<button type="button" onClick={() => setSlide(1)} disabled={slide === 1} aria-label="Show exam progress" className="rounded-full p-1 text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-default disabled:opacity-30"><ChevronRight size={16} /></button>
			</div>
		</div>
	);
}

function QuizTimeRemaining({ deadline }) {
	const [secondsRemaining, setSecondsRemaining] = useState(() =>
		Math.max(0, Math.ceil((deadline - Date.now()) / 1000)),
	);

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setSecondsRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
		}, 1000);
		return () => window.clearInterval(intervalId);
	}, [deadline]);

	const minutes = Math.floor(secondsRemaining / 60).toString().padStart(2, "0");
	const seconds = (secondsRemaining % 60).toString().padStart(2, "0");
	return <span role="timer" className="whitespace-nowrap text-[11px] font-bold tabular-nums text-[#005b6b]">{minutes}:{seconds} left</span>;
}

function getQuizPath(basePath, moduleNumber) {
	return `${basePath}/quiz/${moduleNumber}`;
}

export function ProgramModuleQuizAction({ programKey, basePath, module, compact = false }) {
	const { profile } = useAuth();
	const navigate = useNavigate();
	const userId = profile?.userId;
	const [isConfirmingRetake, setIsConfirmingRetake] = useState(false);
	const progress = userId ? readProgramModuleQuizProgress(programKey, userId) : { modules: {} };
	const attempt = progress.modules[module.number];
	const currentAttempt = isCurrentProgramModuleQuizAttempt(attempt) ? attempt : null;
	const label = currentAttempt?.status === "in-progress"
		? "Continue Quiz"
		: ["completed", "expired"].includes(currentAttempt?.status)
			? "Retake Quiz"
			: "Start Quiz";

	function openQuiz() {
		if (!userId) return;
		beginProgramModuleQuiz(programKey, userId, module.number, PROGRAM_MODULE_QUIZ_DURATION_SECONDS);
		navigate(getQuizPath(basePath, module.number));
	}

	return (
		<>
			<span className="relative inline-flex">
				<button
					type="button"
					onClick={() => currentAttempt && ["completed", "expired"].includes(currentAttempt.status)
						? setIsConfirmingRetake(true)
						: openQuiz()}
					disabled={!userId}
					className={compact
						? "shrink-0 rounded-full border border-[#c9dfe2] px-3 py-1.5 text-xs font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-not-allowed disabled:opacity-50"
						: "rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-50"}
				>
					{label}
				</button>
				{currentAttempt?.status === "expired" && (
					<span className="group/quiz-expired absolute -right-1.5 -top-1.5">
						<span role="img" aria-label="Quiz time expired" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-sm">
							<CircleAlert size={15} strokeWidth={2.5} />
						</span>
						<span role="tooltip" className="pointer-events-none absolute right-full top-1/2 z-20 mr-2 w-max -translate-y-1/2 rounded-md bg-[#071126] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover/quiz-expired:opacity-100">
							Time is up — retake the quiz to try again.
						</span>
					</span>
				)}
			</span>
			{isConfirmingRetake && (
				<div className="fixed inset-0 z-[120] grid place-items-center bg-[#071126]/60 p-4 backdrop-blur-sm">
					<section
						role="alertdialog"
						aria-modal="true"
						aria-labelledby={`quiz-retake-title-${programKey}-${module.number}`}
						className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
					>
						<p className="text-sm font-semibold text-[#005b6b]">{module.number} module quiz</p>
						<h2 id={`quiz-retake-title-${programKey}-${module.number}`} className="mt-2 text-xl font-bold text-[#071126] sm:text-2xl">
							Retake this quiz?
						</h2>
						<p className="mt-3 text-sm leading-6 text-[#71819b]">
							Your previous result will stay saved. A new 20-question attempt will begin with a 20-minute time limit.
						</p>
						<div className="mt-6 flex flex-wrap justify-end gap-3">
							<button type="button" onClick={() => setIsConfirmingRetake(false)} className="rounded-full border border-[#c9dfe2] px-5 py-3 text-sm font-semibold text-[#526584] transition hover:bg-[#f5f9f9]">
								Cancel
							</button>
							<button type="button" onClick={openQuiz} className="rounded-full bg-[#005b6b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#004653]">
								Yes, retake quiz
							</button>
						</div>
					</section>
				</div>
			)}
		</>
	);
}

function getModuleResults(modules, attempts) {
	return modules.map((module) => {
		const saved = attempts[module.number];
		const attempt = isCurrentProgramModuleQuizAttempt(saved) ? saved : null;
		return { module, attempt };
	});
}

export default function ProgramModuleQuizPanel({ programKey, basePath, modules }) {
	const { profile } = useAuth();
	const userId = profile?.userId;
	const progress = userId ? readProgramModuleQuizProgress(programKey, userId) : { modules: {} };
	const moduleResults = getModuleResults(modules, progress.modules);
	const attemptedCount = moduleResults.filter(({ attempt }) =>
		["completed", "expired"].includes(attempt?.status) ||
		(attempt?.status === "in-progress" && Object.keys(attempt.answers ?? {}).length > 0),
	).length;
	const coverage = modules.length ? Math.round((attemptedCount / modules.length) * 100) : 0;

	return (
		<div className="space-y-5">
			<QuizCoverageCard attemptedCount={attemptedCount} totalModules={modules.length} coverage={coverage} />
			<div className="rounded-[18px] border border-[#d6e5e7] bg-white p-6">
				<h2 className="mb-5 text-xl font-bold">Practice quizzes</h2>
				{moduleResults.map(({ module, attempt }) => (
					<div key={module.number} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[#e2ecec] py-3 text-sm last:border-0">
						<div className="min-w-0">
							<span className="block truncate font-medium">{module.number} {module.title}</span>
							<strong className={`mt-1 block ${["completed", "expired"].includes(attempt?.status) || attempt?.status === "in-progress" ? "text-[#005b6b]" : "text-[#8b96a9]"}`}>
								{["completed", "expired"].includes(attempt?.status)
									? `${attempt.score ?? 0}/20`
									: attempt?.status === "in-progress"
										? `${Object.keys(attempt.answers ?? {}).length}/20 answered`
										: "Start Quiz"}
							</strong>
						</div>
						<div className="flex min-h-[58px] min-w-[88px] flex-col items-end justify-between">
							<div className="flex h-6 items-center justify-end">
								{attempt?.status === "completed" ? (
									<span className="text-xs font-semibold text-[#287849]">Completed</span>
								) : attempt?.status === "in-progress" && Number.isFinite(attempt.deadline) ? (
									<QuizTimeRemaining deadline={attempt.deadline} />
								) : null}
							</div>
							<ProgramModuleQuizAction
								programKey={programKey}
								basePath={basePath}
								module={module}
								compact
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
