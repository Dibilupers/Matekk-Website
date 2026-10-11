import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, CircleAlert } from "lucide-react";
import { useAuth } from "../../../context/auth-context";
import { readCcnaExamProgress } from "../../../utils/ccnaShortExamSession";
import {
	beginProgramModuleQuiz,
	expireProgramModuleQuizAttempt,
	isCurrentProgramModuleQuizAttempt,
	readProgramModuleQuizProgress,
} from "../../../utils/programModuleQuizProgress";
import {
	CCNA_AUTOMATION_MODULE_QUIZZES,
	CCNA_CYBERSECURITY_MODULE_QUIZZES,
} from "./programModuleQuizData";
import { getProgramExamFormats } from "./programExamFormats";

export const PROGRAM_MODULE_QUIZ_DURATION_SECONDS = 20 * 60;
const PROGRAM_QUIZZES = {
	"ccna-automation": CCNA_AUTOMATION_MODULE_QUIZZES,
	"ccna-cybersecurity": CCNA_CYBERSECURITY_MODULE_QUIZZES,
};

function getProgramQuizQuestions(programKey, moduleNumber) {
	return PROGRAM_QUIZZES[programKey]?.find((quiz) => quiz.number === moduleNumber)?.questions;
}

function formatExamTime(totalSeconds) {
	const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
	const seconds = (totalSeconds % 60).toString().padStart(2, "0");
	return `${minutes}:${seconds}`;
}

function QuizCoverageCard({ attemptedCount, totalModules, coverage, examProgress, examCoverage, progressSlide, setProgressSlide }) {
	return (
		<div className="overflow-hidden rounded-[18px] border border-[#d6e5e7] bg-white">
			<div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${progressSlide * 100}%)` }}>
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
						aria-label="Exam coverage"
						aria-valuemin={0}
						aria-valuemax={100}
						aria-valuenow={examCoverage}
						className="relative h-16 w-16 shrink-0 rounded-full"
						style={{ background: `conic-gradient(#005b6b ${examCoverage}%, #e4eaf4 0)` }}
					>
						<span className="absolute inset-[7px] flex items-center justify-center rounded-full bg-white text-xs font-bold text-[#005b6b]">{examCoverage}%</span>
					</div>
					<div className="min-w-0">
						<strong className="text-lg">Exam progress</strong>
						<p className="mt-1 text-sm text-[#7c89a1]">{examProgress.attemptedCount} of {examProgress.totalCount} exam formats attempted</p>
					</div>
				</div>
			</div>
			<div className="flex h-8 items-center justify-center gap-2 pb-2" aria-label="Progress panels">
				<button type="button" onClick={() => setProgressSlide(0)} disabled={progressSlide === 0} aria-label="Show quiz progress" className="rounded-full p-1 text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-default disabled:opacity-30"><ChevronLeft size={16} /></button>
				<div className="flex items-center gap-2">
					<button type="button" onClick={() => setProgressSlide(0)} aria-label="Show quiz coverage" aria-current={progressSlide === 0 ? "true" : undefined} className={`h-2 rounded-full transition-all ${progressSlide === 0 ? "w-6 bg-[#005b6b]" : "w-2 bg-[#cbd5e1]"}`} />
					<button type="button" onClick={() => setProgressSlide(1)} aria-label="Show exam progress" aria-current={progressSlide === 1 ? "true" : undefined} className={`h-2 rounded-full transition-all ${progressSlide === 1 ? "w-6 bg-[#005b6b]" : "w-2 bg-[#cbd5e1]"}`} />
				</div>
				<button type="button" onClick={() => setProgressSlide(1)} disabled={progressSlide === 1} aria-label="Show exam progress" className="rounded-full p-1 text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-default disabled:opacity-30"><ChevronRight size={16} /></button>
			</div>
		</div>
	);
}

function QuizTimeRemaining({ deadline, onExpire }) {
	const [secondsRemaining, setSecondsRemaining] = useState(() =>
		Math.max(0, Math.ceil((deadline - Date.now()) / 1000)),
	);

	useEffect(() => {
		let hasExpired = false;
		function updateRemaining() {
			const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
			setSecondsRemaining(remaining);
			if (remaining === 0 && !hasExpired) {
				hasExpired = true;
				onExpire();
			}
		}
		updateRemaining();
		const intervalId = window.setInterval(() => {
			updateRemaining();
		}, 1000);
		return () => window.clearInterval(intervalId);
	}, [deadline, onExpire]);

	const minutes = Math.floor(secondsRemaining / 60).toString().padStart(2, "0");
	const seconds = (secondsRemaining % 60).toString().padStart(2, "0");
	if (secondsRemaining === 0) {
		return <span role="status" className="whitespace-nowrap rounded-full bg-[#fff0ed] px-3 py-1 text-[11px] font-bold text-[#b42318]">Time expired</span>;
	}
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
	const [clockNow, setClockNow] = useState(Date.now);
	const [, setProgressRevision] = useState(0);
	const progress = userId ? readProgramModuleQuizProgress(programKey, userId) : { modules: {} };
	const attempt = progress.modules[module.number];
	const currentAttempt = isCurrentProgramModuleQuizAttempt(attempt) ? attempt : null;
	const questions = getProgramQuizQuestions(programKey, module.number);
	const deadlineHasPassed = currentAttempt?.status === "in-progress" &&
		Number.isFinite(currentAttempt.deadline) &&
		currentAttempt.deadline <= clockNow;
	const isFinished = ["completed", "expired"].includes(currentAttempt?.status) || deadlineHasPassed;
	const label = currentAttempt?.status === "in-progress" && !deadlineHasPassed
		? "Continue Quiz"
		: isFinished
			? "Retake Quiz"
			: "Start Quiz";

	useEffect(() => {
		if (
			!userId ||
			currentAttempt?.status !== "in-progress" ||
			!Number.isFinite(currentAttempt.deadline)
		) return undefined;
		const deadline = currentAttempt.deadline;

		function expireIfTimeIsUp() {
			const now = Date.now();
			setClockNow(now);
			if (now < deadline) return;
			if (!questions) {
				throw new Error(`Quiz questions were not found for ${programKey} module ${module.number}.`);
			}
			if (expireProgramModuleQuizAttempt(programKey, userId, module.number, questions)) {
				setProgressRevision((revision) => revision + 1);
			}
		}

		expireIfTimeIsUp();
		const intervalId = window.setInterval(expireIfTimeIsUp, 1000);
		return () => window.clearInterval(intervalId);
	}, [currentAttempt?.deadline, currentAttempt?.status, module.number, programKey, questions, userId]);

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
					onClick={() => isFinished
						? setIsConfirmingRetake(true)
						: openQuiz()}
					disabled={!userId}
					className={compact
						? "shrink-0 rounded-full border border-[#c9dfe2] px-3 py-1.5 text-xs font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-not-allowed disabled:opacity-50"
						: "rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-50"}
				>
					{label}
				</button>
				{(currentAttempt?.status === "expired" || deadlineHasPassed) && (
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
	const navigate = useNavigate();
	const [, setProgressRevision] = useState(0);
	const [progressSlide, setProgressSlide] = useState(0);
	const [examClockNow, setExamClockNow] = useState(Date.now);
	const progress = userId ? readProgramModuleQuizProgress(programKey, userId) : { modules: {} };
	const moduleResults = getModuleResults(modules, progress.modules);
	const attemptedCount = moduleResults.filter(({ attempt }) =>
		["completed", "expired"].includes(attempt?.status) ||
		(attempt?.status === "in-progress" && Object.keys(attempt.answers ?? {}).length > 0),
	).length;
	const coverage = modules.length ? Math.round((attemptedCount / modules.length) * 100) : 0;
	const examFormats = getProgramExamFormats(programKey) ?? {};
	const examRuns = Object.entries(examFormats).map(([examKey, exam]) => ({
		examKey,
		exam,
		progress: readCcnaExamProgress(exam.sessionKey, userId),
	}));
	const hasActiveExam = examRuns.some(({ progress: examProgress }) => examProgress.status === "in-progress");
	const attemptedExamCount = examRuns.filter(({ progress: examProgress }) =>
		examProgress.status !== "not-started",
	).length;
	const examCoverage = examRuns.length
		? Math.round(examRuns.reduce((total, { exam, progress: examProgress }) =>
			total + Math.min(examProgress.answeredCount, exam.questionCount) / exam.questionCount, 0,
		) / examRuns.length * 100)
		: 0;

	useEffect(() => {
		if (!hasActiveExam) return undefined;
		const intervalId = window.setInterval(() => setExamClockNow(Date.now()), 1000);
		return () => window.clearInterval(intervalId);
	}, [hasActiveExam]);

	return (
		<div className="min-w-0 space-y-5">
			<div
				className="touch-pan-y"
				onTouchStart={(event) => {
					const touch = event.changedTouches[0];
					event.currentTarget.dataset.touchStartX = String(touch.clientX);
					event.currentTarget.dataset.touchStartY = String(touch.clientY);
				}}
				onTouchEnd={(event) => {
					const startX = Number(event.currentTarget.dataset.touchStartX);
					const startY = Number(event.currentTarget.dataset.touchStartY);
					delete event.currentTarget.dataset.touchStartX;
					delete event.currentTarget.dataset.touchStartY;
					const touch = event.changedTouches[0];
					const deltaX = touch.clientX - startX;
					const deltaY = touch.clientY - startY;
					if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
					setProgressSlide(deltaX < 0 ? 1 : 0);
				}}
			>
				<QuizCoverageCard
					attemptedCount={attemptedCount}
					totalModules={modules.length}
					coverage={coverage}
					examProgress={{ attemptedCount: attemptedExamCount, totalCount: examRuns.length }}
					examCoverage={examCoverage}
					progressSlide={progressSlide}
					setProgressSlide={setProgressSlide}
				/>
			</div>
			<div className="min-w-0 overflow-hidden rounded-[18px] border border-[#d6e5e7] bg-white p-4 sm:p-6">
				{progressSlide === 0 ? (
					<>
						<h2 className="mb-5 text-xl font-bold">Practice quizzes</h2>
						{moduleResults.map(({ module, attempt }) => (
					<div key={module.number} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[#e2ecec] py-3 text-sm last:border-0">
						<div className="min-w-0">
							<span className="block truncate font-medium">{module.number} {module.title}</span>
							<strong className={`mt-1 block ${attempt?.status === "expired" ? "text-[#b42318]" : ["completed", "in-progress"].includes(attempt?.status) ? "text-[#005b6b]" : "text-[#8b96a9]"}`}>
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
									<QuizTimeRemaining
										deadline={attempt.deadline}
										onExpire={() => {
											const questions = getProgramQuizQuestions(programKey, module.number);
											if (!userId || !questions) {
												throw new Error(`Unable to record the expired ${programKey} module ${module.number} quiz.`);
											}
											if (expireProgramModuleQuizAttempt(programKey, userId, module.number, questions)) {
												setProgressRevision((revision) => revision + 1);
											}
										}}
									/>
								) : attempt?.status === "expired" ? (
									<span className="whitespace-nowrap rounded-full bg-[#fff0ed] px-3 py-1 text-[11px] font-bold text-[#b42318]">Time expired</span>
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
					</>
				) : (
					<>
						<h2 className="mb-5 text-xl font-bold">Exam progress</h2>
						{examRuns.map(({ examKey, exam, progress: examProgress }) => {
							const answeredCount = examProgress.answeredCount;
							const statusText = examProgress.status === "completed"
								? `Completed · Score ${examProgress.score}/${exam.questionCount}`
								: examProgress.status === "expired"
									? `Time expired · Score ${examProgress.score}/${exam.questionCount}`
									: examProgress.status === "in-progress"
										? `${answeredCount}/${exam.questionCount} answered`
										: "Not started";
							const secondsRemaining = examProgress.deadline
								? Math.max(0, Math.ceil((examProgress.deadline - examClockNow) / 1000))
								: null;

							return (
								<div key={examKey} className="border-b border-[#e2ecec] py-3 last:border-0">
									<div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
										<div className="min-w-0">
											<span className="block truncate text-sm font-medium">{exam.name}</span>
											<span className="mt-0.5 block text-xs text-[#7c89a1]">{exam.questionCount} questions</span>
											<strong className={`mt-1 block text-sm ${examProgress.status !== "not-started" ? "text-[#005b6b]" : "text-[#8b96a9]"}`}>
												{statusText}
											</strong>
										</div>
										<div className="flex min-h-[58px] min-w-[112px] flex-col items-end justify-between">
											<div className="flex h-6 items-center justify-end">
												{examProgress.status === "in-progress" && secondsRemaining !== null && (
													<span role="timer" aria-label={`${exam.name}: ${formatExamTime(secondsRemaining)} remaining`} className={`inline-flex min-w-[88px] justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold tabular-nums ${secondsRemaining <= 60 ? "bg-[#fff0ed] text-[#b42318]" : "bg-[#e8f3f4] text-[#005b6b]"}`}>
														{formatExamTime(secondsRemaining)} left
													</span>
												)}
											</div>
											{examProgress.status === "in-progress" && (
												<button type="button" onClick={() => navigate(`${basePath}/exam/${examKey}`)} className="rounded-full border border-[#c9dfe2] px-3 py-1.5 text-xs font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4]">
													Continue Exam
												</button>
											)}
										</div>
									</div>
									{examProgress.status !== "not-started" && examProgress.status !== "in-progress" && (
										<div role="progressbar" aria-label={`${exam.name} completion`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={examProgress.status === "completed" ? 100 : Math.round((answeredCount / exam.questionCount) * 100)} className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e4eaf4]">
											<div className={`h-full ${examProgress.status === "expired" ? "bg-[#dc2626]" : "bg-[#005b6b]"}`} style={{ width: `${examProgress.status === "completed" ? 100 : Math.round((answeredCount / exam.questionCount) * 100)}%` }} />
										</div>
									)}
								</div>
							);
						})}
					</>
				)}
			</div>
		</div>
	);
}
