import { useEffect, useRef, useState } from "react";
import { Link, useBlocker } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUp, Clock3, RotateCcw, X } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import TrainingLogo from "../../../../assets/MATEKK_training_logo.png";
import {
	createCcnaMockExamAttemptId,
	saveCcnaMockExamResult,
} from "../../../../utils/ccnaGradebook";
import { CCNA_MODULE_QUIZZES } from "./ccnaModuleQuizData";

const SHORT_EXAM_QUESTION_COUNT = 50;
const SHORT_EXAM_DURATION_SECONDS = 45 * 60;
const EXAM_PASS_PERCENTAGE = 80;
const SHORT_EXAM_SESSION_KEY = "matekk-ccna-short-exam-session";

function getShortExamSessionKey(userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		return null;
	}
	return `${SHORT_EXAM_SESSION_KEY}:${encodeURIComponent(String(userId))}`;
}

function shuffle(items) {
	const shuffled = [...items];
	for (let index = shuffled.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
	}
	return shuffled;
}

function createShortExamQuestions() {
	const moduleQuizzes = CCNA_MODULE_QUIZZES.filter((quiz) => /^[1-6]\.0$/.test(quiz.number));
	if (moduleQuizzes.length !== 6 || moduleQuizzes.some((quiz) => quiz.questions.length < 8)) {
		throw new Error("The short CCNA exam requires at least 8 questions from each module, 1.0 through 6.0.");
	}

	const modulesWithExtraQuestion = new Set(shuffle(moduleQuizzes.map((quiz) => quiz.number)).slice(0, 2));
	return shuffle(moduleQuizzes.flatMap((quiz) => {
		const questionCount = 8 + Number(modulesWithExtraQuestion.has(quiz.number));
		return shuffle(quiz.questions)
			.slice(0, questionCount)
			.map((question) => ({
				...question,
				moduleNumber: quiz.number,
				moduleTitle: quiz.title,
			}));
	}));
}

function restoreShortExamSession(userId) {
	const sessionKey = getShortExamSessionKey(userId);
	const createSession = () => ({
		attemptId: createCcnaMockExamAttemptId(),
		submittedAt: null,
		questions: createShortExamQuestions(),
		answers: {},
		lockedQuestions: {},
		currentIndex: 0,
		deadline: Date.now() + SHORT_EXAM_DURATION_SECONDS * 1000,
		isSubmitted: false,
	});
	if (!sessionKey) return createSession();
	const savedSession = window.sessionStorage.getItem(sessionKey);
	if (!savedSession) {
		return createSession();
	}

	try {
		const session = JSON.parse(savedSession);
		const isValid =
			session &&
			Array.isArray(session.questions) &&
			session.questions.length === SHORT_EXAM_QUESTION_COUNT &&
			session.questions.every((question) =>
				Array.isArray(question.options) &&
				Number.isInteger(question.answer) &&
				question.answer >= 0 &&
				question.answer < question.options.length
			) &&
			session.answers &&
			typeof session.answers === "object" &&
			session.lockedQuestions &&
			typeof session.lockedQuestions === "object" &&
			Number.isInteger(session.currentIndex) &&
			session.currentIndex >= 0 &&
			session.currentIndex < SHORT_EXAM_QUESTION_COUNT &&
			Number.isFinite(session.deadline) &&
			typeof session.isSubmitted === "boolean";

		if (isValid) {
			const isSubmitted = session.isSubmitted || session.deadline <= Date.now();
			return {
				...session,
				attemptId: typeof session.attemptId === "string" ? session.attemptId : createCcnaMockExamAttemptId(),
				submittedAt: Number.isFinite(session.submittedAt)
					? session.submittedAt
					: isSubmitted ? Date.now() : null,
				isSubmitted,
			};
		}

		throw new TypeError("Saved CCNA short exam session has an invalid structure.");
	} catch (error) {
		console.error("Unable to restore the saved CCNA short exam session.", error);
		window.sessionStorage.removeItem(sessionKey);
		return createSession();
	}
}

function formatTime(totalSeconds) {
	const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
	const seconds = (totalSeconds % 60).toString().padStart(2, "0");
	return `${minutes}:${seconds}`;
}

export default function CCNACompositeExam() {
	const { profile } = useAuth();
	const userId = profile?.userId;
	const [initialSession] = useState(() => restoreShortExamSession(userId));
	const [questions, setQuestions] = useState(initialSession.questions);
	const [answers, setAnswers] = useState(initialSession.answers);
	const [lockedQuestions, setLockedQuestions] = useState(initialSession.lockedQuestions);
	const [currentIndex, setCurrentIndex] = useState(initialSession.currentIndex);
	const [deadline, setDeadline] = useState(initialSession.deadline);
	const [attemptId, setAttemptId] = useState(initialSession.attemptId);
	const [submittedAt, setSubmittedAt] = useState(initialSession.submittedAt);
	const [secondsRemaining, setSecondsRemaining] = useState(() =>
		Math.max(0, Math.ceil((initialSession.deadline - Date.now()) / 1000)),
	);
	const [isSubmitted, setIsSubmitted] = useState(initialSession.isSubmitted);
	const [examAttempt, setExamAttempt] = useState(0);
	const [answerFilter, setAnswerFilter] = useState("all");
	const [isAnswerReviewVisible, setIsAnswerReviewVisible] = useState(false);
	const [animatedResult, setAnimatedResult] = useState({ attempt: -1, score: 0, elapsedSeconds: 0 });
	const [backToTopVisibility, setBackToTopVisibility] = useState({ attempt: -1, visible: false });
	const answerReviewRef = useRef(null);
	const resultsTopRef = useRef(null);
	const blocker = useBlocker(({ currentLocation, nextLocation }) =>
		!isSubmitted &&
		(currentLocation.pathname !== nextLocation.pathname ||
			currentLocation.search !== nextLocation.search ||
			currentLocation.hash !== nextLocation.hash),
	);
	const question = questions[currentIndex];
	const answeredCount = Object.keys(answers).length;
	const score = questions.reduce(
		(total, item, index) => total + Number(answers[index] === item.answer),
		0,
	);
	const animatedScore = animatedResult.attempt === examAttempt ? animatedResult.score : 0;
	const animatedElapsedSeconds = animatedResult.attempt === examAttempt ? animatedResult.elapsedSeconds : 0;
	const animatedPercentage = Math.round((animatedScore / questions.length) * 100);
	const progressHue = animatedPercentage <= 50
		? animatedPercentage * 1.2
		: 60 + (animatedPercentage - 50) * 1.2;
	const progressColor = `hsl(${progressHue} 75% 42%)`;
	const examPassed = Math.round((score / questions.length) * 100) >= EXAM_PASS_PERCENTAGE;
	const showBackToTop = backToTopVisibility.attempt === examAttempt && backToTopVisibility.visible;
	const reviewQuestions = questions
		.map((item, index) => ({
			...item,
			index,
			selectedAnswer: answers[index],
			isCorrect: answers[index] === item.answer,
		}))
		.filter((item) =>
			answerFilter === "all" ||
			(answerFilter === "correct" && item.isCorrect) ||
			(answerFilter === "incorrect" && !item.isCorrect),
		);
	const sessionKey = getShortExamSessionKey(userId);

	function submitExam() {
		setSubmittedAt((previousSubmittedAt) => previousSubmittedAt ?? Date.now());
		setIsSubmitted(true);
	}

	useEffect(() => {
		if (!sessionKey) return;
		window.sessionStorage.setItem(sessionKey, JSON.stringify({
			attemptId,
			submittedAt,
			questions,
			answers,
			lockedQuestions,
			currentIndex,
			deadline,
			isSubmitted,
		}));
	}, [answers, attemptId, currentIndex, deadline, isSubmitted, lockedQuestions, questions, sessionKey, submittedAt]);

	useEffect(() => {
		if (!isSubmitted || !userId || !Number.isFinite(submittedAt)) return;
		saveCcnaMockExamResult(userId, {
			id: attemptId,
			title: "Short Exam",
			score,
			maxScore: questions.length,
			submittedAt,
		});
	}, [attemptId, isSubmitted, questions.length, score, submittedAt, userId]);

	useEffect(() => {
		if (isSubmitted) return undefined;

		function updateTimer() {
			const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
			setSecondsRemaining(remaining);
			if (remaining === 0) submitExam();
		}

		updateTimer();
		const timer = window.setInterval(updateTimer, 1000);
		return () => window.clearInterval(timer);
	}, [deadline, isSubmitted]);

	useEffect(() => {
		if (!isSubmitted) return undefined;

		const duration = 1100;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let animationFrame;
		let startTime;
		const finalElapsedSeconds = SHORT_EXAM_DURATION_SECONDS - secondsRemaining;

		function animateScore(timestamp) {
			if (reducedMotion) {
				setAnimatedResult({ attempt: examAttempt, score, elapsedSeconds: finalElapsedSeconds });
				return;
			}
			if (startTime === undefined) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const easedProgress = progress * progress * (3 - 2 * progress);
			setAnimatedResult({
				attempt: examAttempt,
				score: score * easedProgress,
				elapsedSeconds: finalElapsedSeconds * easedProgress,
			});
			if (progress < 1) animationFrame = window.requestAnimationFrame(animateScore);
		}

		animationFrame = window.requestAnimationFrame(animateScore);
		return () => window.cancelAnimationFrame(animationFrame);
	}, [examAttempt, isSubmitted, score, secondsRemaining]);

	useEffect(() => {
		if (!isSubmitted || !isAnswerReviewVisible) return undefined;

		let animationFrame;
		const updateVisibility = () => {
			const documentHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight,
			);
			const isAtBottom = window.scrollY + window.innerHeight >= documentHeight - 2;
			setBackToTopVisibility((current) =>
				current.attempt === examAttempt && current.visible === isAtBottom
					? current
					: { attempt: examAttempt, visible: isAtBottom },
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
	}, [examAttempt, isAnswerReviewVisible, isSubmitted]);

	useEffect(() => {
		if (!isSubmitted || isAnswerReviewVisible) return undefined;

		let previousScrollY = window.scrollY;
		const revealOnScrollDown = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > previousScrollY) setIsAnswerReviewVisible(true);
			previousScrollY = currentScrollY;
		};
		window.addEventListener("scroll", revealOnScrollDown, { passive: true });
		return () => window.removeEventListener("scroll", revealOnScrollDown);
	}, [isAnswerReviewVisible, isSubmitted]);

	function restartExam() {
		setQuestions(createShortExamQuestions());
		setAnswers({});
		setLockedQuestions({});
		setCurrentIndex(0);
		setDeadline(Date.now() + SHORT_EXAM_DURATION_SECONDS * 1000);
		setAttemptId(createCcnaMockExamAttemptId());
		setSubmittedAt(null);
		setSecondsRemaining(SHORT_EXAM_DURATION_SECONDS);
		setIsSubmitted(false);
		setExamAttempt((attempt) => attempt + 1);
		setAnswerFilter("all");
		setIsAnswerReviewVisible(false);
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

	function goToQuestion(index) {
		if (index < 0 || index >= questions.length) return;
		if (
			index < currentIndex ||
			index > currentIndex + 1 ||
			(index > currentIndex && (
				answers[currentIndex] === undefined ||
				lockedQuestions[currentIndex]
			))
		) return;

		if (index > currentIndex) {
			setLockedQuestions((previous) => ({ ...previous, [currentIndex]: true }));
		}
		setCurrentIndex(index);
	}

	if (!question) return null;

	return (
		<main className="ccna-page-enter min-h-screen bg-[#f5f9f9] px-4 py-6 text-[#17233d] sm:px-8 sm:py-8">
			<div className="mx-auto max-w-[1125px]">
				<header className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#d6e5e7] pb-5">
					<div className="flex min-w-0 items-center gap-4">
						<Link to="/modules/programs/ccna" aria-label="Back to CCNA course" className="shrink-0 rounded-lg bg-white px-3 py-2 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 motion-reduce:transition-none">
							<img src={TrainingLogo} alt="MATEKK Cybercore Academy" className="h-auto w-32 sm:w-36" />
						</Link>
						<div className="hidden min-w-0 border-l border-[#cbd5e1] pl-4 sm:block">
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#70809a]">CCNA composite exam</p>
							<p className="mt-1 truncate text-sm font-bold text-[#17233d]">Short Exam · Modules 1.0–6.0</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						{!isSubmitted && (
							<div role="timer" aria-label={`${formatTime(secondsRemaining)} remaining`} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold tabular-nums ${secondsRemaining <= 300 ? "border-[#f0c6a8] bg-[#fff5ee] text-[#a44b13]" : "border-[#c9dfe2] bg-white text-[#005b6b]"}`}>
								<Clock3 size={16} /> {formatTime(secondsRemaining)}
							</div>
						)}
						<Link to="/modules/programs/ccna" className="inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] px-4 py-2 text-sm font-semibold text-[#005b6b] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#e8f3f4] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100">
							<X size={16} /> <span>Exit exam</span>
						</Link>
					</div>
				</header>

				{!isSubmitted ? (
					<>
						<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
							<div>
								<p className="text-sm font-bold uppercase tracking-[0.12em] text-[#005b6b]">Short Exam</p>
								<p className="mt-1 text-sm text-[#70809a]">{answeredCount} of {questions.length} questions answered</p>
							</div>
							<div role="progressbar" aria-label="Exam progress" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answeredCount} className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-[#dfe9eb]">
								<div className="h-full rounded-full bg-[#005b6b] transition-[width]" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
							</div>
						</div>

						<div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
							<section className="rounded-[20px] border border-[#d6e5e7] bg-white p-5 shadow-sm sm:p-7">
								<p className="mb-2 text-sm text-[#70809a]">
									Question {currentIndex + 1} of {questions.length} · Module {question.moduleNumber}: {question.moduleTitle}
								</p>
								<h1 className="mb-6 text-[1.45rem] font-bold leading-snug tracking-tight sm:text-[1.7rem]">{question.prompt}</h1>
								<div className="space-y-2.5">
									{question.options.map((option, optionIndex) => {
										const isSelected = answers[currentIndex] === optionIndex;
										return (
											<button
												key={option}
												type="button"
												onClick={() => setAnswers((previous) => ({ ...previous, [currentIndex]: optionIndex }))}
												disabled={Boolean(lockedQuestions[currentIndex])}
												aria-pressed={isSelected}
												className={`flex min-h-[60px] w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition disabled:cursor-default ${isSelected ? "border-[#005b6b] bg-[#e8f3f4] text-[#263654]" : "border-[#d9e1ef] bg-white text-[#263654] hover:border-[#8bb8bf] hover:bg-[#f0f7f7]"}`}
											>
												<span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${isSelected ? "bg-[#005b6b] text-white" : "bg-[#e8f3f4] text-[#005b6b]"}`}>
													{String.fromCharCode(65 + optionIndex)}
												</span>
												<span className="text-[15px] sm:text-base">{option}</span>
											</button>
										);
									})}
								</div>
								<div className="mt-6 flex justify-end">
									<button
										type="button"
										onClick={() => currentIndex === questions.length - 1 ? submitExam() : goToQuestion(currentIndex + 1)}
										disabled={answers[currentIndex] === undefined}
										className="rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-40"
									>
										{currentIndex === questions.length - 1 ? "Submit" : "Next Question"}
									</button>
								</div>
							</section>

							<aside aria-label="Exam question navigation" className="rounded-[20px] border border-[#d6e5e7] bg-white p-5 shadow-sm sm:p-6">
								<h2 className="mb-4 text-base font-bold">Questions</h2>
								<div className="grid grid-cols-5 gap-2">
									{questions.map((item, index) => {
										const isAnswered = answers[index] !== undefined;
										const isCurrent = currentIndex === index;
										const canNavigate =
											index === currentIndex ||
											(index === currentIndex + 1 && answers[currentIndex] !== undefined && !lockedQuestions[currentIndex]);
										return (
											<button key={`${item.moduleNumber}-${index}`} type="button" onClick={() => goToQuestion(index)} disabled={!canNavigate} aria-label={`Question ${index + 1}${isAnswered ? ", answered" : ", unanswered"}`} aria-current={isCurrent ? "step" : undefined} className={`h-10 rounded-xl border text-sm font-semibold transition disabled:cursor-not-allowed ${isAnswered ? "border-[#005b6b] bg-[#e8f3f4] text-[#005b6b]" : "border-[#d9e1ef] bg-white text-[#71809a]"} ${isCurrent ? "ring-2 ring-[#005b6b] ring-offset-2" : ""} hover:border-[#005b6b] hover:bg-[#005b6b] hover:text-white disabled:hover:border-inherit disabled:hover:bg-inherit disabled:hover:text-inherit`}>
												{index + 1}
											</button>
										);
									})}
								</div>
								<p className="mt-5 text-sm leading-6 text-[#70809a]">{answeredCount} of {questions.length} answered</p>
							</aside>
						</div>
					</>
				) : (
					<>
						<div ref={resultsTopRef} className="scroll-mt-6" />
						<section className="fade-in-up grid items-center gap-10 rounded-[24px] border border-[#d6e5e7] bg-white px-6 py-10 shadow-sm sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:px-14 lg:py-14">
							<div>
								<p className="inline-flex items-center gap-2 rounded-full bg-[#e8f3f4] px-3 py-1.5 text-xs font-bold tracking-wide text-[#005b6b]">
									<span className="h-2 w-2 rounded-full bg-[#005b6b]" />
									Short Exam · CCNA
								</p>
								<h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#17233d] sm:text-5xl">
									{examPassed ? (
										<>Great work, <span className="text-[#005b6b]">keep it up.</span></>
									) : (
										<>Not there yet, <span className="text-[#005b6b]">keep going.</span></>
									)}
								</h1>
								<p className="mt-4 max-w-xl leading-7 text-[#64748b]">
									You got {score} of {questions.length} questions correct across CCNA modules 1.0–6.0.
									{examPassed
										? " You passed this exam."
										: ` Review your answers below and aim for ${EXAM_PASS_PERCENTAGE}% to pass.`}
								</p>
								<div className="mt-7 flex flex-wrap gap-3">
									<button type="button" onClick={restartExam} className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-[#004653] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100">
										<RotateCcw size={16} /> Retake Exam
									</button>
									<button type="button" onClick={reviewAnswers} className="inline-flex items-center gap-2 rounded-full border border-[#9fc8ce] px-6 py-3 font-semibold text-[#005b6b] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#e8f3f4] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100">
										Review Answers <ArrowLeft className="rotate-[-90deg]" size={16} />
									</button>
								</div>
								<div className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-[#dce5f2]">
									<div className="pr-4">
										<strong className="block text-3xl font-extrabold tabular-nums text-[#17233d]">{Math.round(animatedScore)}</strong>
										<span className="text-xs leading-4 text-[#71819b]">Your score<br />out of {questions.length}</span>
									</div>
									<div className="px-4">
										<strong className="block text-3xl font-extrabold text-[#17233d]">{questions.length}</strong>
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
									aria-label={`${animatedPercentage}% correct answers; ${EXAM_PASS_PERCENTAGE}% required to pass`}
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
										<strong className="block text-2xl font-extrabold text-[#005b6b]">{EXAM_PASS_PERCENTAGE}%</strong>
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
											{ value: "all", label: `All (${questions.length})` },
											{ value: "incorrect", label: `Incorrect (${questions.length - score})` },
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
										{reviewQuestions.map((item) => (
											<article key={`${item.moduleNumber}-${item.index}`} className="rounded-[20px] border border-[#dce9ea] bg-white p-5 shadow-sm sm:p-7">
												<div className="flex flex-wrap items-center gap-2">
													<span className="text-sm font-semibold text-[#64748b]">
														Question {item.index + 1} of {questions.length} · Module {item.moduleNumber}: {item.moduleTitle}
													</span>
													<span className={`rounded-full px-3 py-1 text-xs font-bold ${
														item.isCorrect ? "bg-[#e8f3f4] text-[#005b6b]" : "bg-[#fff0e8] text-[#b4532a]"
													}`}>
														{item.isCorrect ? "Correct" : "Incorrect"}
													</span>
												</div>
												<h3 className="mt-4 text-lg font-bold leading-snug text-[#17233d] sm:text-xl">{item.prompt}</h3>
												<div className="mt-5 space-y-2.5">
													{item.options.map((option, optionIndex) => {
														const isCorrectAnswer = optionIndex === item.answer;
														const isSelectedAnswer = optionIndex === item.selectedAnswer;
														const optionStyle = isCorrectAnswer
															? "border-[#54a879] bg-[#eff9f2] text-[#236a43]"
															: isSelectedAnswer
																? "border-[#e77945] bg-[#fff5ef] text-[#a44b13]"
																: "border-[#e1e8ef] bg-white text-[#42516b]";
														return (
															<div key={option} className={`flex min-h-[54px] items-center gap-3 rounded-xl border px-4 py-3 ${optionStyle}`}>
																<span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
																	isCorrectAnswer ? "bg-[#2d8a56] text-white" : isSelectedAnswer ? "bg-[#c7541a] text-white" : "bg-[#edf3fb] text-[#4764a8]"
																}`}>
																	{String.fromCharCode(65 + optionIndex)}
																</span>
																<span className="flex-1 text-sm font-medium sm:text-base">{option}</span>
																{isSelectedAnswer && !isCorrectAnswer && (
																	<span className="text-xs font-bold text-[#a44b13]">Your answer</span>
																)}
																{isCorrectAnswer && (
																	<span className="text-xs font-bold text-[#287849]">Correct answer</span>
																)}
															</div>
														);
													})}
												</div>
												<p className="mt-4 rounded-xl bg-[#f5f9f9] px-4 py-3 text-sm leading-6 text-[#596983]">
													<span className="font-bold text-[#005b6b]">Explanation: </span>{item.explanation}
												</p>
											</article>
										))}
										{reviewQuestions.length === 0 && (
											<p className="rounded-2xl bg-white p-6 text-center text-[#64748b]">No {answerFilter} answers in this attempt.</p>
										)}
									</div>
								</div>
							</section>
						)}
						{isAnswerReviewVisible && showBackToTop && (
							<button
								type="button"
								onClick={backToTop}
								className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#004653] sm:bottom-7 sm:right-7"
							>
								<ArrowUp size={17} />
								Back to top
							</button>
						)}
					</>
				)}
			</div>
			{blocker.state === "blocked" && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#071126]/55 px-4 py-6 backdrop-blur-[2px]">
					<section
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="ccna-short-exam-exit-title"
						aria-describedby="ccna-short-exam-exit-description"
						className="w-full max-w-md rounded-2xl border border-[#d6e5e7] bg-white p-6 text-[#17233d] shadow-2xl sm:p-8"
					>
						<p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#005b6b]">Exam in progress</p>
						<h2 id="ccna-short-exam-exit-title" className="mt-2 text-2xl font-bold">Are you sure you want to exit the exam?</h2>
						<p id="ccna-short-exam-exit-description" className="mt-3 leading-6 text-[#64748b]">
							Your answers and time remaining will be saved. The timer will keep running while you are away.
						</p>
						<div className="mt-6 flex justify-end gap-3">
							<button type="button" onClick={() => blocker.reset()} className="rounded-full border border-[#c9dfe2] px-5 py-2.5 text-sm font-semibold text-[#42516b] transition hover:bg-[#f5f9f9]">
								Stay in exam
							</button>
							<button type="button" onClick={() => blocker.proceed()} className="rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653]">
								Exit exam
							</button>
						</div>
					</section>
				</div>
			)}
		</main>
	);
}
