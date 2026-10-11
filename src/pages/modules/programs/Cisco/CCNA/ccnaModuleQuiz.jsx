import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowUp, Check, Moon, RotateCcw, Sun, X } from "lucide-react";
import { Link, useBlocker, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../../../context/auth-context";
import TrainingLogo from "../../../../../assets/MATEKK_training_logo.png";
import { CCNA_MODULE_QUIZZES } from "./ccnaModuleQuizData";
import {
	CCNA_AUTOMATION_MODULE_QUIZZES,
	CCNA_CYBERSECURITY_MODULE_QUIZZES,
} from "../../programModuleQuizData";
import {
	beginCcnaModuleQuiz,
	CCNA_MODULE_QUIZ_DURATION_SECONDS,
	isCurrentCcnaModuleQuizAttempt,
	recordCcnaModuleQuizAttempt,
	readCcnaModuleQuizProgress,
	saveCcnaModuleQuizProgress,
} from "../../../../../utils/ccnaModuleQuizProgress";
import {
	beginProgramModuleQuiz,
	isCurrentProgramModuleQuizAttempt,
	readProgramModuleQuizProgress,
	recordProgramModuleQuizAttempt,
	saveProgramModuleQuizProgress,
} from "../../../../../utils/programModuleQuizProgress";
import { saveGradebookAssessment } from "../../../../../utils/gradebookApi";
import { QuestionInput, QuestionPrompt, QuestionReview } from "./ccnaExamQuestionViews";

const CCNA_SOURCE_URL = "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html";

const PROGRAM_QUIZ_CONFIG = {
	"ccna-automation": {
		title: "CCNA Automation",
		basePath: "/modules/programs/ccna-automation",
		durationSeconds: 20 * 60,
		quizzes: CCNA_AUTOMATION_MODULE_QUIZZES,
	},
	"ccna-cybersecurity": {
		title: "CCNA Cybersecurity",
		basePath: "/modules/programs/ccna-cybersecurity",
		durationSeconds: 20 * 60,
		quizzes: CCNA_CYBERSECURITY_MODULE_QUIZZES,
	},
};

function isCurrentQuizAttempt(attempt, programKey) {
	return programKey
		? isCurrentProgramModuleQuizAttempt(attempt)
		: isCurrentCcnaModuleQuizAttempt(attempt);
}

function readQuizProgress(userId, programKey) {
	return programKey
		? readProgramModuleQuizProgress(programKey, userId)
		: readCcnaModuleQuizProgress(userId);
}

function saveQuizProgress(userId, programKey, progress) {
	if (programKey) saveProgramModuleQuizProgress(programKey, userId, progress);
	else saveCcnaModuleQuizProgress(userId, progress);
}

function startQuizAttempt(userId, moduleNumber, programKey, durationSeconds) {
	return programKey
		? beginProgramModuleQuiz(programKey, userId, moduleNumber, durationSeconds)
		: beginCcnaModuleQuiz(userId, moduleNumber);
}

function recordQuizAttempt(attempt, maxScore, programKey) {
	return programKey
		? recordProgramModuleQuizAttempt(attempt, maxScore)
		: recordCcnaModuleQuizAttempt(attempt, maxScore);
}

function getModuleProgress(userId, moduleNumber, programKey, durationSeconds) {
	if (!userId) {
		return {
			status: "not-started",
			currentIndex: 0,
			answers: {},
			lockedQuestions: {},
			attempts: 0,
			bestScore: null,
		};
	}
	const progress = readQuizProgress(userId, programKey);
	const savedAttempt = progress.modules[moduleNumber];
	if (savedAttempt && !isCurrentQuizAttempt(savedAttempt, programKey)) {
		return {
			status: "not-started",
			currentIndex: 0,
			answers: {},
			lockedQuestions: {},
			attempts: savedAttempt.attempts ?? 0,
			bestScore: null,
		};
	}
	if (savedAttempt?.status === "in-progress" && !Number.isFinite(savedAttempt.deadline)) {
		const migratedAttempt = {
			...savedAttempt,
			deadline: Date.now() + durationSeconds * 1000,
			lockedQuestions: savedAttempt.lockedQuestions ?? {},
		};
		saveQuizProgress(userId, programKey, {
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

function saveAttemptProgress(userId, moduleNumber, nextAttempt, status, programKey) {
	const progress = readQuizProgress(userId, programKey);
	saveQuizProgress(userId, programKey, {
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

const QUIZ_PASS_PERCENTAGE = 80;

export default function CCNAModuleQuiz() {
	const { profile } = useAuth();
	const userId = profile?.userId;
	const { moduleNumber } = useParams();
	const location = useLocation();
	const programKey = Object.keys(PROGRAM_QUIZ_CONFIG).find((key) => location.pathname.startsWith(`/modules/programs/${key}/quiz/`));
	const programConfig = programKey ? PROGRAM_QUIZ_CONFIG[programKey] : null;
	const courseTitle = programConfig?.title ?? "CCNA";
	const coursePath = programConfig?.basePath ?? "/modules/programs/ccna";
	const quizDurationSeconds = programConfig?.durationSeconds ?? CCNA_MODULE_QUIZ_DURATION_SECONDS;
	const moduleQuiz = (programConfig?.quizzes ?? CCNA_MODULE_QUIZZES).find((quiz) => quiz.number === moduleNumber);
	const [attemptState, setAttemptState] = useState({ userId: null, moduleNumber: null, attempt: null });
	const [selectionState, setSelectionState] = useState({ userId: null, moduleNumber: null, answer: undefined });
	const [isDark, setIsDark] = useState(false);
	const [answerFilter, setAnswerFilter] = useState("all");
	const [isAnswerReviewVisible, setIsAnswerReviewVisible] = useState(false);
	const [animatedResult, setAnimatedResult] = useState({ key: null, score: 0, elapsedSeconds: 0 });
	const [backToTopVisibility, setBackToTopVisibility] = useState({ key: null, visible: false });
	const [gradebookSaveError, setGradebookSaveError] = useState(null);
	const [gradebookSaveAttempt, setGradebookSaveAttempt] = useState(0);
	const answerReviewRef = useRef(null);
	const resultsTopRef = useRef(null);
	const attempt = useMemo(
		() => attemptState.userId === userId && attemptState.moduleNumber === moduleNumber && attemptState.attempt
			? attemptState.attempt
			: getModuleProgress(userId, moduleNumber, programKey, quizDurationSeconds),
		[attemptState, moduleNumber, programKey, quizDurationSeconds, userId],
	);
	const [clockState, setClockState] = useState(() => ({
		userId,
		moduleNumber,
		secondsLeft: attempt.status === "in-progress" && Number.isFinite(attempt.deadline)
			? Math.max(0, Math.ceil((attempt.deadline - Date.now()) / 1000))
			: null,
	}));
	const selectedAnswer = selectionState.userId === userId && selectionState.moduleNumber === moduleNumber
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
	const secondsLeft = clockState.userId === userId && clockState.moduleNumber === moduleNumber && clockState.secondsLeft !== null
		? clockState.secondsLeft
		: quizDurationSeconds;
	const scorePercentage = moduleQuiz
		? Math.round((score / moduleQuiz.questions.length) * 100)
		: 0;
	const animationKey = `${moduleNumber}:${attempt.attempts}:${attempt.status}`;
	const showBackToTop = backToTopVisibility.key === animationKey && backToTopVisibility.visible;
	const animatedScore = animatedResult.key === animationKey ? animatedResult.score : 0;
	const animatedElapsedSeconds = animatedResult.key === animationKey
		? animatedResult.elapsedSeconds
		: 0;
	const animatedPercentage = moduleQuiz
		? Math.round((animatedScore / moduleQuiz.questions.length) * 100)
		: 0;
	const progressHue = animatedPercentage <= 50
		? animatedPercentage * 1.2
		: 60 + (animatedPercentage - 50) * 1.2;
	const progressColor = `hsl(${progressHue} 75% 42%)`;
	const quizPassed = scorePercentage >= QUIZ_PASS_PERCENTAGE;
	const elapsedSeconds = attempt.elapsedSeconds ?? Math.min(
		quizDurationSeconds,
		Math.max(0, quizDurationSeconds - secondsLeft),
	);
	const reviewQuestions = moduleQuiz?.questions
		.map((question, index) => ({
			...question,
			index,
			selectedAnswer: attempt.answers?.[index],
			isCorrect: attempt.answers?.[index] === question.answer,
		}))
		.filter((question) =>
			answerFilter === "all" ||
			(answerFilter === "correct" && question.isCorrect) ||
			(answerFilter === "incorrect" && !question.isCorrect),
		) ?? [];

	useEffect(() => {
		if (!isCompleted || !moduleQuiz) return undefined;

		const duration = 1100;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let animationFrame;
		let startTime;

		function animateScore(timestamp) {
			if (reducedMotion) {
				setAnimatedResult({ key: animationKey, score, elapsedSeconds });
				return;
			}
			if (startTime === undefined) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const easedProgress = progress * progress * (3 - 2 * progress);
			setAnimatedResult({
				key: animationKey,
				score: score * easedProgress,
				elapsedSeconds: elapsedSeconds * easedProgress,
			});

			if (progress < 1) {
				animationFrame = window.requestAnimationFrame(animateScore);
			}
		}

		animationFrame = window.requestAnimationFrame(animateScore);
		return () => window.cancelAnimationFrame(animationFrame);
	}, [animationKey, elapsedSeconds, isCompleted, moduleQuiz, score]);

	useEffect(() => {
		if (
			!userId ||
			!isCompleted ||
			!moduleQuiz ||
			!Number.isFinite(attempt.submittedAt)
		) return undefined;

		let isActive = true;
		const gradebookProgramKey = programKey ?? "ccna";
		saveGradebookAssessment(gradebookProgramKey, {
			id: `quiz:${moduleQuiz.number}:${attempt.attempts ?? 1}`,
			type: "quiz",
			programKey: gradebookProgramKey,
			moduleNumber: moduleQuiz.number,
			title: `${moduleQuiz.number} ${moduleQuiz.title}`,
			courseTitle,
			status: attempt.status,
			attemptNumber: attempt.attempts ?? 1,
			score: attempt.score,
			maxScore: moduleQuiz.questions.length,
			submittedAt: attempt.submittedAt,
		}).then(() => {
			if (isActive) setGradebookSaveError(null);
		}).catch((error) => {
			console.error("Unable to save the quiz result to the gradebook.", error);
			if (isActive) {
				setGradebookSaveError(error instanceof Error ? error.message : "The gradebook request failed.");
			}
		});

		return () => {
			isActive = false;
		};
	}, [attempt.attempts, attempt.score, attempt.status, attempt.submittedAt, courseTitle, gradebookSaveAttempt, isCompleted, moduleQuiz, programKey, userId]);

	useEffect(() => {
		if (!isCompleted || !isAnswerReviewVisible) return undefined;

		let animationFrame;
		const updateVisibility = () => {
			const documentHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight,
			);
			const isAtBottom = window.scrollY + window.innerHeight >= documentHeight - 2;

			setBackToTopVisibility((current) =>
				current.key === animationKey && current.visible === isAtBottom
					? current
					: { key: animationKey, visible: isAtBottom },
			);
		};
		const scheduleVisibilityUpdate = () => {
			window.cancelAnimationFrame(animationFrame);
			animationFrame = window.requestAnimationFrame(updateVisibility);
		};

		scheduleVisibilityUpdate();
		window.addEventListener("scroll", scheduleVisibilityUpdate, { passive: true });
		window.addEventListener("resize", scheduleVisibilityUpdate);

		return () => {
			window.cancelAnimationFrame(animationFrame);
			window.removeEventListener("scroll", scheduleVisibilityUpdate);
			window.removeEventListener("resize", scheduleVisibilityUpdate);
		};
	}, [animationKey, isAnswerReviewVisible, isCompleted]);

	useEffect(() => {
		if (!isCompleted || isAnswerReviewVisible) return undefined;

		let previousScrollY = window.scrollY;
		const revealOnScrollDown = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > previousScrollY) {
				setIsAnswerReviewVisible(true);
			}
			previousScrollY = currentScrollY;
		};

		window.addEventListener("scroll", revealOnScrollDown, { passive: true });
		return () => window.removeEventListener("scroll", revealOnScrollDown);
	}, [isAnswerReviewVisible, isCompleted]);

	function updateAttempt(nextAttempt, status = "in-progress") {
		if (!userId || !moduleQuiz) return;
		saveAttemptProgress(userId, moduleQuiz.number, nextAttempt, status, programKey);
		setAttemptState({ userId, moduleNumber: moduleQuiz.number, attempt: nextAttempt });
	}

	function startQuiz() {
		if (!userId || !moduleQuiz) return;
		const newAttempt = startQuizAttempt(userId, moduleQuiz.number, programKey, quizDurationSeconds);
		setAnswerFilter("all");
		setSelectionState({ userId, moduleNumber: moduleQuiz.number, answer: undefined });
		setClockState({
			userId,
			moduleNumber: moduleQuiz.number,
			secondsLeft: quizDurationSeconds,
		});
		updateAttempt(newAttempt);
	}

	function reviewAnswers() {
		setAnswerFilter("all");
		setIsAnswerReviewVisible(true);
		window.requestAnimationFrame(() => {
			answerReviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
		});
	}

	function backToTop() {
		resultsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	useEffect(() => {
		if (!userId || !hasStarted || !moduleQuiz) return undefined;

		let timer;
		function updateClock() {
			const remainingSeconds = Math.max(0, Math.ceil((attemptDeadline - Date.now()) / 1000));
			setClockState({ userId, moduleNumber: moduleQuiz.number, secondsLeft: remainingSeconds });
			if (remainingSeconds > 0) {
				timer = window.setTimeout(updateClock, 1000);
				return;
			}

			const finalScore = moduleQuiz.questions.reduce(
				(total, question, index) => total + (attemptAnswers?.[index] === question.answer ? 1 : 0),
				0,
			);
			const expiredAttempt = recordQuizAttempt({
				...attempt,
				status: "expired",
				score: finalScore,
				maxScore: moduleQuiz.questions.length,
				elapsedSeconds: quizDurationSeconds,
				submittedAt: Date.now(),
				bestScore: Math.max(bestScore ?? 0, finalScore),
			}, moduleQuiz.questions.length, programKey);
			saveAttemptProgress(userId, moduleQuiz.number, expiredAttempt, "expired", programKey);
			setAttemptState({ userId, moduleNumber: moduleQuiz.number, attempt: expiredAttempt });
		}
		updateClock();

		return () => window.clearTimeout(timer);
	}, [attempt, attemptAnswers, attemptDeadline, bestScore, hasStarted, moduleQuiz, programKey, quizDurationSeconds, userId]);

	if (!moduleQuiz) {
		return (
			<main className="ccna-page-enter min-h-screen bg-[#f5f9f9] px-5 py-12 text-[#111a2d]">
				<div className="mx-auto max-w-2xl rounded-2xl border border-[#d6e5e7] bg-white p-8 text-center">
					<h1 className="text-2xl font-bold">Quiz not found</h1>
					<p className="mt-3 text-[#64748b]">Choose a {courseTitle} module to open its quiz.</p>
					<Link to={coursePath} className="mt-6 inline-flex rounded-full bg-[#005b6b] px-5 py-3 font-semibold text-white hover:bg-[#004653]">
						Back to {courseTitle}
					</Link>
				</div>
			</main>
		);
	}

	if (!currentQuestion) return null;

	function chooseAnswer(optionIndex) {
		if (attempt.lockedQuestions?.[attempt.currentIndex]) return;
		const answers = { ...attempt.answers, [attempt.currentIndex]: optionIndex };
		setSelectionState({ userId, moduleNumber, answer: optionIndex });
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
			userId,
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
		updateAttempt(recordQuizAttempt({
			...attempt,
			answers,
			lockedQuestions: { ...attempt.lockedQuestions, [attempt.currentIndex]: true },
			status: "completed",
			score: finalScore,
			maxScore: moduleQuiz.questions.length,
			submittedAt: Date.now(),
			elapsedSeconds: Math.min(
				quizDurationSeconds,
				Math.max(0, quizDurationSeconds - secondsLeft),
			),
			bestScore: Math.max(attempt.bestScore ?? 0, finalScore),
		}, moduleQuiz.questions.length, programKey), "completed");
	}

	const answeredCurrentQuestion = selectedAnswer !== undefined;

	return (
		<main data-theme={isDark ? "dark" : "light"} className="ccna-page-enter min-h-screen bg-[#f5f9f9] px-4 py-6 text-[#17233d] sm:px-8 sm:py-8">
			<div className="mx-auto min-w-0 max-w-[1125px]">
				{gradebookSaveError && isCompleted && (
					<p role="alert" className="mb-4 rounded-xl border border-[#f2c6c3] bg-white px-4 py-3 text-sm font-medium text-[#b42318]">
						Your quiz result could not be saved to the backend gradebook. {gradebookSaveError}{" "}
						<button
							type="button"
							onClick={() => {
								setGradebookSaveError(null);
								setGradebookSaveAttempt((attempt) => attempt + 1);
							}}
							className="font-bold underline underline-offset-2 hover:no-underline"
						>
							Retry save
						</button>
					</p>
				)}
				<header className="mb-7 flex flex-col gap-4 border-b border-[#d6e5e7] pb-5 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex min-w-0 items-center gap-4">
						<Link to={coursePath} aria-label={`Back to ${courseTitle} course`} className="ccna-training-logo shrink-0 rounded-lg bg-white px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
							<img src={TrainingLogo} alt="MATEKK Cybercore Academy" className="h-auto w-32 sm:w-36" />
						</Link>
						<div className="hidden min-w-0 border-l border-[#cbd5e1] pl-4 sm:block">
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#70809a]">{courseTitle} module quiz</p>
							<p className="mt-1 truncate text-sm font-bold text-[#17233d]">Module {moduleQuiz.number}: {moduleQuiz.title}</p>
						</div>
					</div>
					<div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
						<button
							type="button"
							onClick={() => setIsDark((current) => !current)}
							aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
							aria-pressed={isDark}
							className="ccna-dark-hover inline-flex shrink-0 items-center gap-2 rounded-full border border-[#c9dfe2] bg-white px-3 py-2 text-xs font-semibold text-[#005b6b] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:bg-[#e8f3f4] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-4 sm:text-sm"
						>
							{isDark ? <Sun size={16} /> : <Moon size={16} />}
							<span className="hidden sm:inline">{isDark ? "Light mode" : "Dark mode"}</span>
						</button>
						{hasStarted && (
							<div aria-label={`Time left ${formatTime(secondsLeft)}`} className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold tabular-nums sm:px-4 sm:text-sm ${secondsLeft <= 10 ? "border-[#edbd9b] bg-[#fff5ee] text-[#a44b13]" : "border-[#c9dfe2] bg-white text-[#005b6b]"}`}>
								{formatTime(secondsLeft)}
							</div>
						)}
						<Link to={coursePath} className="ccna-dark-hover inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#c9dfe2] px-3 py-2 text-xs font-semibold text-[#005b6b] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#e8f3f4] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:gap-2 sm:px-4 sm:text-sm">
							<ArrowLeft size={16} />
							<span>Back to course</span>
						</Link>
					</div>
				</header>

				{!hasStarted && !isCompleted && (
					<section className="min-w-0 rounded-[20px] border border-[#d6e5e7] bg-white p-4 shadow-sm sm:p-8">
						<p className="text-sm font-bold uppercase tracking-[0.15em] text-[#005b6b]">Module {moduleQuiz.number}</p>
						<h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17233d] sm:text-4xl">{moduleQuiz.title}</h1>
						<p className="mt-4 text-sm leading-6 text-[#64748b] sm:text-base">This quiz contains {moduleQuiz.questions.length} questions and has a {quizDurationSeconds / 60}-minute time limit. Choose an answer for each question, then continue through the quiz to see your score and answer explanations.</p>
						<button type="button" onClick={startQuiz} className="mt-6 w-full rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653] sm:w-auto">
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
							<div className="ccna-progress-fill h-full rounded-full bg-[#005b6b] transition-[width] duration-300" style={{ width: `${(answeredCount / moduleQuiz.questions.length) * 100}%` }} />
						</div>

						<div className="mx-auto max-w-3xl">
							<section className="rounded-[20px] border border-[#d6e5e7] bg-white p-4 shadow-sm sm:p-7">
								<p className="mb-2 text-sm font-semibold text-[#70809a]">Question {attempt.currentIndex + 1} of {moduleQuiz.questions.length} · {moduleQuiz.title}</p>
								<QuestionPrompt
									prompt={currentQuestion.prompt}
									imageUrl={currentQuestion.imageUrl}
									hasSeparateExhibit={Boolean(currentQuestion.exhibit || currentQuestion.imageUrl)}
								/>
								<QuestionInput
									key={attempt.currentIndex}
									question={currentQuestion}
									value={selectedAnswer}
									onChange={chooseAnswer}
									disabled={Boolean(attempt.lockedQuestions?.[attempt.currentIndex])}
								/>
								<div className="mt-5 flex justify-end">
									<button
										type="button"
										onClick={() => attempt.currentIndex === moduleQuiz.questions.length - 1 ? finishQuiz() : goToQuestion(attempt.currentIndex + 1)}
										disabled={!answeredCurrentQuestion}
										className="rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-40"
									>
										{attempt.currentIndex === moduleQuiz.questions.length - 1 ? "Submit" : "Next Question"}
									</button>
								</div>
							</section>

						</div>
					</>
				)}

				{isCompleted && (
					<>
						<div ref={resultsTopRef} className="scroll-mt-6" />
						<section className="fade-in-up grid items-center gap-10 rounded-[24px] border border-[#d6e5e7] bg-white px-6 py-10 shadow-sm sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:px-14 lg:py-14">
							<div>
								<p className="inline-flex items-center gap-2 rounded-full bg-[#e8f3f4] px-3 py-1.5 text-xs font-bold tracking-wide text-[#005b6b]">
									<span className="h-2 w-2 rounded-full bg-[#005b6b]" />
									Module {moduleQuiz.number} Quiz · {courseTitle}
								</p>
								<h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#17233d] sm:text-5xl">
									{quizPassed ? (
										<>Great work, <span className="text-[#005b6b]">keep it up.</span></>
									) : (
										<>Not there yet, <span className="text-[#005b6b]">keep going.</span></>
									)}
								</h1>
								<p className="mt-4 max-w-xl leading-7 text-[#64748b]">
									{attempt.status === "expired" ? "Time is up. " : ""}
									You got {score} of {moduleQuiz.questions.length} questions correct in the {moduleQuiz.title} module.
									{quizPassed ? " You passed this quiz." : ` Review your answers below and aim for ${QUIZ_PASS_PERCENTAGE}% to pass.`}
								</p>
								{attempt.bestScore > score && (
									<p className="mt-2 text-sm font-medium text-[#005b6b]">Your best score is {attempt.bestScore}/{moduleQuiz.questions.length}.</p>
								)}
								<div className="mt-7 flex flex-wrap gap-3">
									<button type="button" onClick={startQuiz} className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-[#004653] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100">
										<RotateCcw size={16} /> Retake Quiz
									</button>
									<button type="button" onClick={reviewAnswers} className="inline-flex items-center gap-2 rounded-full border border-[#9fc8ce] px-6 py-3 font-semibold text-[#005b6b] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#e8f3f4] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100">
										Review Answers <ArrowLeft className="rotate-[-90deg]" size={16} />
									</button>
								</div>
								<div className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-[#dce5f2]">
									<div className="pr-4">
										<strong className="block text-3xl font-extrabold tabular-nums text-[#17233d]">{Math.round(animatedScore)}</strong>
										<span className="text-xs leading-4 text-[#71819b]">Your score<br />out of {moduleQuiz.questions.length}</span>
									</div>
									<div className="px-4">
										<strong className="block text-3xl font-extrabold text-[#17233d]">{moduleQuiz.questions.length}</strong>
										<span className="text-xs leading-4 text-[#71819b]">Total<br />questions</span>
									</div>
									<div className="pl-4">
										<strong className="block text-3xl font-extrabold tabular-nums text-[#17233d]">{formatTime(Math.round(animatedElapsedSeconds))}</strong>
										<span className="text-xs leading-4 text-[#71819b]">Time<br />elapsed</span>
									</div>
								</div>
							</div>

							<div className="flex justify-center py-3">
								<div
									role="img"
									aria-label={`${scorePercentage}% correct answers; ${QUIZ_PASS_PERCENTAGE}% required to pass`}
									className="relative flex h-64 w-64 items-center justify-center rounded-full bg-[#dceff1] sm:h-72 sm:w-72"
								>
									<div className="absolute inset-[13px] rounded-full bg-[#eef7f8]" />
									<svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
										<circle cx="50" cy="50" r="46" fill="none" stroke="#dceff1" strokeWidth="4.5" />
										<circle
											cx="50"
											cy="50"
											r="46"
											fill="none"
											stroke={progressColor}
											strokeWidth="4.5"
											strokeDasharray={`${2 * Math.PI * 46}`}
											strokeDashoffset={`${2 * Math.PI * 46 * (1 - animatedPercentage / 100)}`}
										/>
									</svg>
									<div className="absolute inset-[28px] rounded-full border-[12px] border-white" />
									<div className="relative z-10 text-center">
										<strong className="block text-5xl font-extrabold tracking-tight tabular-nums" style={{ color: progressColor }}>{animatedPercentage}%</strong>
										<span className="mt-1 block text-sm font-semibold text-[#64748b]">correct answers</span>
									</div>
									<div className="absolute -left-9 top-[30%] rounded-xl border border-[#e2ecec] bg-white px-4 py-3 shadow-lg transition-transform duration-200 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100">
										<strong className="block text-2xl font-extrabold text-[#005b6b]">{QUIZ_PASS_PERCENTAGE}%</strong>
										<span className="text-xs font-medium text-[#71819b]">Passing score</span>
									</div>
								</div>
							</div>
						</section>

						{isAnswerReviewVisible && (
							<section ref={answerReviewRef} className="fade-in-up-stagger mt-8 scroll-mt-6 rounded-[24px] bg-[#eaf3f4] px-4 py-10 sm:px-8 sm:py-12" style={{ "--fade-delay": 120 }}>
							<div className="mx-auto max-w-4xl">
								<h2 className="text-center text-3xl font-extrabold tracking-tight text-[#17233d] sm:text-4xl">
									Review your <span className="text-[#005b6b]">answers</span>
								</h2>
								<div className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Filter answer review">
									{[
										{ value: "all", label: `All (${moduleQuiz.questions.length})` },
										{ value: "incorrect", label: `Incorrect (${moduleQuiz.questions.length - score})` },
										{ value: "correct", label: `Correct (${score})` },
									].map((filter) => (
										<button
											key={filter.value}
											type="button"
											onClick={() => setAnswerFilter(filter.value)}
											aria-pressed={answerFilter === filter.value}
											className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
												answerFilter === filter.value
													? "border-[#005b6b] bg-[#005b6b] text-white"
													: "border-[#9fc8ce] bg-white text-[#005b6b] hover:bg-[#f2f8f8]"
											}`}
										>
											{filter.label}
										</button>
									))}
								</div>
								<div className="mt-8 space-y-5">
									{reviewQuestions.map((question) => (
										<article key={question.prompt} className="rounded-[20px] border border-[#dce9ea] bg-white p-5 shadow-sm sm:p-7">
											<div className="flex flex-wrap items-center gap-2">
												<span className="text-sm font-semibold text-[#64748b]">
													Question {question.index + 1} of {moduleQuiz.questions.length}
												</span>
												<span className={`rounded-full px-3 py-1 text-xs font-bold ${
													question.isCorrect ? "bg-[#e8f3f4] text-[#005b6b]" : "bg-[#fff0e8] text-[#b4532a]"
												}`}>
													{question.isCorrect ? "Correct" : "Incorrect"}
												</span>
											</div>
											<QuestionPrompt
												prompt={question.prompt}
												imageUrl={question.imageUrl}
												hasSeparateExhibit={Boolean(question.exhibit || question.imageUrl)}
											/>
											<div className="mt-5">
												<QuestionReview question={question} value={question.selectedAnswer} />
											</div>
											{question.explanation?.trim() && (
												<p className="mt-4 rounded-xl bg-[#f5f9f9] px-4 py-3 text-sm leading-6 text-[#596983]">
													<span className="font-bold text-[#005b6b]">Explanation: </span>{question.explanation}
												</p>
											)}
										</article>
									))}
									{reviewQuestions.length === 0 && (
										<p className="rounded-2xl bg-white p-6 text-center text-[#64748b]">
											No {answerFilter} answers in this attempt.
										</p>
									)}
								</div>
							</div>
							</section>
						)}
						{isAnswerReviewVisible && showBackToTop && (
							<button
								type="button"
								onClick={backToTop}
								className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#004653] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005b6b] sm:bottom-7 sm:right-7"
							>
								<ArrowUp size={17} />
								Back to top
							</button>
						)}
					</>
				)}
			</div>
			{blocker.state === "blocked" && createPortal(
				<div
					data-theme={isDark ? "dark" : "light"}
					className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[#071126]/55 px-3 py-3 backdrop-blur-[2px] sm:px-4 sm:py-6"
				>
					<section
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="ccna-module-exit-title"
						aria-describedby="ccna-module-exit-description"
						className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-[#d6e5e7] bg-white p-4 text-[#17233d] shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:p-8"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#005b6b]">Quiz in progress</p>
								<h2 id="ccna-module-exit-title" className="mt-2 text-xl font-bold sm:text-2xl">Are you sure you want to exit?</h2>
							</div>
						</div>
						<p id="ccna-module-exit-description" className="mt-3 text-sm leading-6 text-[#64748b] sm:text-base">
							Your answers and remaining time will be saved, but the timer will keep running while you are away.
						</p>
						<div className="mt-5 flex flex-wrap justify-end gap-2 sm:mt-6 sm:gap-3">
							<button
								type="button"
								onClick={() => blocker.reset()}
								className="ccna-modal-stay rounded-full border border-[#c9dfe2] px-4 py-2.5 text-sm font-semibold text-[#42516b] transition hover:bg-[#f5f9f9] sm:px-5"
							>
								Stay in quiz
							</button>
							<button
								type="button"
								onClick={() => blocker.proceed()}
								className="rounded-full bg-[#005b6b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653] sm:px-5"
							>
								Exit quiz
							</button>
						</div>
					</section>
				</div>,
				document.body,
			)}
		</main>
	);
}
