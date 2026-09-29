import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link, useBlocker, useParams } from "react-router-dom";
import TrainingLogo from "../../../../assets/MATEKK_training_logo.png";
import { CCNA_MODULE_QUIZZES } from "./ccnaModuleQuizData";
import {
	beginCcnaModuleQuiz,
	readCcnaModuleQuizProgress,
	saveCcnaModuleQuizProgress,
} from "../../../../utils/ccnaModuleQuizProgress";

function getModuleProgress(moduleNumber) {
	const progress = readCcnaModuleQuizProgress();
	const savedAttempt = progress.modules[moduleNumber];
	if (savedAttempt?.status === "in-progress" && !Number.isFinite(savedAttempt.deadline)) {
		const migratedAttempt = {
			...savedAttempt,
			deadline: Date.now() + 60 * 1000,
			lockedQuestions: savedAttempt.lockedQuestions ?? {},
		};
		saveCcnaModuleQuizProgress({
			...progress,
			modules: { ...progress.modules, [moduleNumber]: migratedAttempt },
		});
		return migratedAttempt;
	}
	return savedAttempt ?? {
		status: "not-started",
		currentIndex: 0,
		answers: {},
		lockedQuestions: {},
		attempts: 0,
		bestScore: null,
	};
}

function saveAttemptProgress(moduleNumber, nextAttempt, status) {
	const progress = readCcnaModuleQuizProgress();
	saveCcnaModuleQuizProgress({
		...progress,
		activeModule: status === "in-progress" ? moduleNumber : null,
		modules: {
			...progress.modules,
			[moduleNumber]: nextAttempt,
		},
	});
}

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
	const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
	return `${minutes}:${remainingSeconds}`;
}

export default function CCNAModuleQuiz() {
	const { moduleNumber } = useParams();
	const moduleQuiz = CCNA_MODULE_QUIZZES.find((quiz) => quiz.number === moduleNumber);
	const [attemptState, setAttemptState] = useState({ moduleNumber: null, attempt: null });
	const [selectionState, setSelectionState] = useState({ moduleNumber: null, answer: undefined });
	const attempt = useMemo(
		() => attemptState.moduleNumber === moduleNumber && attemptState.attempt
			? attemptState.attempt
			: getModuleProgress(moduleNumber),
		[attemptState, moduleNumber],
	);
	const [clockState, setClockState] = useState(() => ({
		moduleNumber,
		secondsLeft: attempt.status === "in-progress" && Number.isFinite(attempt.deadline)
			? Math.max(0, Math.ceil((attempt.deadline - Date.now()) / 1000))
			: null,
	}));
	const selectedAnswer = selectionState.moduleNumber === moduleNumber
		? selectionState.answer
		: attempt.answers?.[attempt.currentIndex];
	const currentQuestion = moduleQuiz?.questions[attempt.currentIndex] ?? moduleQuiz?.questions[0];
	const score = moduleQuiz?.questions.reduce(
		(total, question, index) => total + (attempt.answers?.[index] === question.answer ? 1 : 0),
		0,
	) ?? 0;
	const hasStarted = attempt.status === "in-progress";
	const isCompleted = attempt.status === "completed" || attempt.status === "expired";
	const blocker = useBlocker(({ currentLocation, nextLocation }) =>
		hasStarted &&
		(currentLocation.pathname !== nextLocation.pathname ||
			currentLocation.search !== nextLocation.search ||
			currentLocation.hash !== nextLocation.hash),
	);
	const answeredCount = Object.keys(attempt.answers ?? {}).length;
	const attemptDeadline = attempt.deadline;
	const attemptAnswers = attempt.answers;
	const bestScore = attempt.bestScore;
	const secondsLeft = clockState.moduleNumber === moduleNumber && clockState.secondsLeft !== null
		? clockState.secondsLeft
		: 60;

	function updateAttempt(nextAttempt, status = "in-progress") {
		if (!moduleQuiz) return;
		saveAttemptProgress(moduleQuiz.number, nextAttempt, status);
		setAttemptState({ moduleNumber: moduleQuiz.number, attempt: nextAttempt });
	}

	function startQuiz() {
		if (!moduleQuiz) return;
		const newAttempt = beginCcnaModuleQuiz(moduleQuiz.number);
		setSelectionState({ moduleNumber: moduleQuiz.number, answer: undefined });
		setClockState({
			moduleNumber: moduleQuiz.number,
			secondsLeft: 60,
		});
		updateAttempt(newAttempt);
	}

	useEffect(() => {
		if (!hasStarted || !moduleQuiz) return undefined;

		let timer;
		function updateClock() {
			const remainingSeconds = Math.max(0, Math.ceil((attemptDeadline - Date.now()) / 1000));
			setClockState({ moduleNumber: moduleQuiz.number, secondsLeft: remainingSeconds });
			if (remainingSeconds > 0) {
				timer = window.setTimeout(updateClock, 1000);
				return;
			}

			const finalScore = moduleQuiz.questions.reduce(
				(total, question, index) => total + (attemptAnswers?.[index] === question.answer ? 1 : 0),
				0,
			);
			const expiredAttempt = {
				...attempt,
				status: "expired",
				score: finalScore,
				bestScore: Math.max(bestScore ?? 0, finalScore),
			};
			saveAttemptProgress(moduleQuiz.number, expiredAttempt, "expired");
			setAttemptState({ moduleNumber: moduleQuiz.number, attempt: expiredAttempt });
		}
		updateClock();

		return () => window.clearTimeout(timer);
	}, [attempt, attemptAnswers, attemptDeadline, bestScore, hasStarted, moduleQuiz]);

	if (!moduleQuiz) {
		return (
			<main className="min-h-screen bg-[#f5f9f9] px-5 py-12 text-[#111a2d]">
				<div className="mx-auto max-w-2xl rounded-2xl border border-[#d6e5e7] bg-white p-8 text-center">
					<h1 className="text-2xl font-bold">Quiz not found</h1>
					<p className="mt-3 text-[#64748b]">Choose a CCNA module to open its quiz.</p>
					<Link to="/modules/programs/ccna" className="mt-6 inline-flex rounded-full bg-[#005b6b] px-5 py-3 font-semibold text-white hover:bg-[#004653]">
						Back to CCNA
					</Link>
				</div>
			</main>
		);
	}

	if (!currentQuestion) return null;

	function chooseAnswer(optionIndex) {
		if (attempt.lockedQuestions?.[attempt.currentIndex]) return;
		const answers = { ...attempt.answers, [attempt.currentIndex]: optionIndex };
		setSelectionState({ moduleNumber, answer: optionIndex });
		updateAttempt({ ...attempt, answers });
	}

	function goToQuestion(index) {
		if (index < 0 || index >= moduleQuiz.questions.length) return;
		if (
			index < attempt.currentIndex ||
			index > attempt.currentIndex + 1 ||
			(index > attempt.currentIndex && (selectedAnswer === undefined || attempt.lockedQuestions?.[attempt.currentIndex]))
		) return;
		const lockedQuestions = index > attempt.currentIndex
			? { ...attempt.lockedQuestions, [attempt.currentIndex]: true }
			: attempt.lockedQuestions;
		updateAttempt({ ...attempt, currentIndex: index, lockedQuestions });
		setSelectionState({
			moduleNumber,
			answer: attempt.answers?.[index],
		});
	}

	function finishQuiz() {
		if (selectedAnswer === undefined) return;
		const answers = { ...attempt.answers, [attempt.currentIndex]: selectedAnswer };
		const finalScore = moduleQuiz.questions.reduce(
			(total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
			0,
		);
		updateAttempt({
			...attempt,
			answers,
			lockedQuestions: { ...attempt.lockedQuestions, [attempt.currentIndex]: true },
			status: "completed",
			score: finalScore,
			bestScore: Math.max(attempt.bestScore ?? 0, finalScore),
		}, "completed");
	}

	const answeredCurrentQuestion = selectedAnswer !== undefined;

	return (
		<main className="min-h-screen bg-[#f5f9f9] px-4 py-6 text-[#17233d] sm:px-8 sm:py-8">
			<div className="mx-auto max-w-[1125px]">
				<header className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#d6e5e7] pb-5">
					<div className="flex min-w-0 items-center gap-4">
						<Link to="/modules/programs/ccna" aria-label="Back to CCNA course" className="shrink-0 rounded-lg bg-white px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
							<img src={TrainingLogo} alt="MATEKK Cybercore Academy" className="h-auto w-32 sm:w-36" />
						</Link>
						<div className="hidden min-w-0 border-l border-[#cbd5e1] pl-4 sm:block">
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#70809a]">CCNA module quiz</p>
							<p className="mt-1 truncate text-sm font-bold text-[#17233d]">Module {moduleQuiz.number}: {moduleQuiz.title}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						{hasStarted && (
							<div aria-label={`Time left ${formatTime(secondsLeft)}`} className={`rounded-full border px-4 py-2 text-sm font-semibold tabular-nums ${secondsLeft <= 10 ? "border-[#edbd9b] bg-[#fff5ee] text-[#a44b13]" : "border-[#c9dfe2] bg-white text-[#005b6b]"}`}>
								{formatTime(secondsLeft)}
							</div>
						)}
						<Link to="/modules/programs/ccna" className="inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] px-4 py-2 text-sm font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4]">
							<ArrowLeft size={16} />
							<span>Back to course</span>
						</Link>
					</div>
				</header>

				{!hasStarted && !isCompleted && (
					<section className="rounded-[20px] border border-[#d6e5e7] bg-white p-6 shadow-sm sm:p-8">
						<p className="text-sm font-bold uppercase tracking-[0.15em] text-[#005b6b]">Module {moduleQuiz.number}</p>
						<h1 className="mt-2 text-3xl font-bold tracking-tight text-[#17233d] sm:text-4xl">{moduleQuiz.title}</h1>
						<p className="mt-4 text-[#64748b]">This quiz contains 5 questions. Choose an answer for each question, then continue through the quiz to see your score and answer explanations.</p>
						<button type="button" onClick={startQuiz} className="mt-6 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653]">
							Start Quiz
						</button>
					</section>
				)}

				{hasStarted && (
					<>
						<div
							role="progressbar"
							aria-label="Quiz progress"
							aria-valuemin={0}
							aria-valuemax={moduleQuiz.questions.length}
							aria-valuenow={answeredCount}
							aria-valuetext={`${answeredCount} of ${moduleQuiz.questions.length} questions answered`}
							className="mb-6 h-2 overflow-hidden rounded-full bg-[#dfe9eb]"
						>
							<div className="h-full rounded-full bg-[#005b6b] transition-[width] duration-300" style={{ width: `${(answeredCount / moduleQuiz.questions.length) * 100}%` }} />
						</div>

						<div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
							<section className="rounded-[20px] border border-[#d6e5e7] bg-white p-5 shadow-sm sm:p-7">
								<p className="mb-2 text-sm text-[#70809a]">Question {attempt.currentIndex + 1} of {moduleQuiz.questions.length} · {moduleQuiz.title}</p>
								<h1 className="mb-6 text-[1.45rem] font-bold leading-snug tracking-tight text-[#17233d] sm:text-[1.7rem]">
									{currentQuestion.prompt}
								</h1>
								<div className="space-y-2.5">
									{currentQuestion.options.map((option, optionIndex) => {
										const isSelected = selectedAnswer === optionIndex;
										return (
											<button
												key={option}
												type="button"
												onClick={() => chooseAnswer(optionIndex)}
												disabled={Boolean(attempt.lockedQuestions?.[attempt.currentIndex])}
												aria-pressed={isSelected}
												className={`flex min-h-[60px] w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition disabled:cursor-default ${
													isSelected
														? "border-[#005b6b] bg-[#e8f3f4] text-[#263654]"
														: "border-[#d9e1ef] bg-white text-[#263654] hover:border-[#8bb8bf] hover:bg-[#f0f7f7]"
												}`}
											>
												<span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${isSelected ? "bg-[#005b6b] text-white" : "bg-[#e8f3f4] text-[#005b6b]"}`}>
													{String.fromCharCode(65 + optionIndex)}
												</span>
												<span className="text-[15px] sm:text-base">{option}</span>
											</button>
										);
									})}
								</div>
								<div className="mt-5 flex justify-end">
									<button
										type="button"
										onClick={() => attempt.currentIndex === moduleQuiz.questions.length - 1 ? finishQuiz() : goToQuestion(attempt.currentIndex + 1)}
										disabled={!answeredCurrentQuestion}
										className="rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-40"
									>
										{attempt.currentIndex === moduleQuiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
									</button>
								</div>
							</section>

							<aside aria-label="Question navigation" className="rounded-[20px] border border-[#d6e5e7] bg-white p-5 shadow-sm sm:p-6">
								<h2 className="mb-4 text-base font-bold text-[#17233d]">Questions</h2>
								<div className="grid grid-cols-5 gap-2">
									{moduleQuiz.questions.map((_, index) => {
										const hasAnswer = attempt.answers[index] !== undefined;
										const isActive = index === attempt.currentIndex;
										const canNavigate =
											index === attempt.currentIndex ||
											(index === attempt.currentIndex + 1 && answeredCurrentQuestion && !attempt.lockedQuestions?.[attempt.currentIndex]);
										return (
											<button
												key={index}
												type="button"
												onClick={() => goToQuestion(index)}
												disabled={!canNavigate}
												aria-label={`Question ${index + 1}${hasAnswer ? ", answered" : ", unanswered"}`}
												aria-current={isActive ? "step" : undefined}
												className={`h-10 w-full rounded-xl border text-sm font-semibold transition disabled:cursor-not-allowed ${
													hasAnswer
														? "border-[#005b6b] bg-[#e8f3f4] text-[#005b6b]"
														: "border-[#d9e1ef] bg-white text-[#71809a]"
												} ${isActive ? "ring-2 ring-[#005b6b] ring-offset-2" : ""} hover:border-[#005b6b] hover:bg-[#005b6b] hover:text-white disabled:hover:border-inherit disabled:hover:bg-inherit disabled:hover:text-inherit`}
											>
												{index + 1}
											</button>
										);
									})}
								</div>
								<p className="mt-5 text-sm leading-6 text-[#70809a]">{answeredCount} of {moduleQuiz.questions.length} answered</p>
							</aside>
						</div>
					</>
				)}

				{isCompleted && (
					<div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
						<section className="rounded-[20px] border border-[#d6e5e7] bg-white p-6 shadow-sm sm:p-8">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f3f4] text-xl font-bold text-[#005b6b]">
								{score}/5
							</div>
							<p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#005b6b]">Quiz complete</p>
							<h1 className="mt-2 text-3xl font-bold text-[#17233d]">{moduleQuiz.title}</h1>
							<p className="mt-3 text-[#64748b]">
								{attempt.status === "expired" ? "Time is up. " : ""}
								You answered {score} out of {moduleQuiz.questions.length} questions correctly.
							</p>
							{attempt.bestScore > score && <p className="mt-1 text-sm text-[#70809a]">Your best score is {attempt.bestScore}/5.</p>}
							<div className="mt-6 flex flex-wrap gap-3">
								<button type="button" onClick={startQuiz} className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653]">
									<RotateCcw size={16} /> Retake Quiz
								</button>
								<Link to="/modules/programs/ccna" className="inline-flex items-center rounded-full border border-[#c9dfe2] px-6 py-3 font-semibold text-[#005b6b] hover:bg-[#e8f3f4]">
									Back to course
								</Link>
							</div>
						</section>
						<aside className="rounded-[20px] border border-[#d6e5e7] bg-white p-5 shadow-sm sm:p-6">
							<h2 className="mb-4 text-base font-bold text-[#17233d]">Answers and explanations</h2>
							<div className="space-y-3">
								{moduleQuiz.questions.map((question, index) => (
									<div key={question.prompt} className="rounded-xl bg-[#f5f9f9] p-3">
										<p className="text-xs font-semibold text-[#005b6b]">Question {index + 1}</p>
										<p className="mt-1 text-sm font-medium text-[#34435e]">{question.options[question.answer]}</p>
										<p className="mt-1 text-xs leading-5 text-[#71819b]">{question.explanation}</p>
									</div>
								))}
							</div>
						</aside>
					</div>
				)}
			</div>
			{blocker.state === "blocked" && (
				<div
					className="fixed inset-0 z-[120] flex items-center justify-center bg-[#071126]/55 px-4 py-6 backdrop-blur-[2px]"
				>
					<section
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="ccna-module-exit-title"
						aria-describedby="ccna-module-exit-description"
						className="w-full max-w-md rounded-2xl border border-[#d6e5e7] bg-white p-6 text-[#17233d] shadow-2xl sm:p-8"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#005b6b]">Quiz in progress</p>
								<h2 id="ccna-module-exit-title" className="mt-2 text-2xl font-bold">Are you sure you want to exit?</h2>
							</div>
						</div>
						<p id="ccna-module-exit-description" className="mt-3 leading-6 text-[#64748b]">
							Your answers and remaining time will be saved, but the timer will keep running while you are away.
						</p>
						<div className="mt-6 flex justify-end gap-3">
							<button
								type="button"
								onClick={() => blocker.reset()}
								className="rounded-full border border-[#c9dfe2] px-5 py-2.5 text-sm font-semibold text-[#42516b] transition hover:bg-[#f5f9f9]"
							>
								Stay in quiz
							</button>
							<button
								type="button"
								onClick={() => blocker.proceed()}
								className="rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653]"
							>
								Exit quiz
							</button>
						</div>
					</section>
				</div>
			)}
		</main>
	);
}
