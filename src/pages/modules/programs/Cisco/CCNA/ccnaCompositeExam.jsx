import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUp, Clock3, Moon, RotateCcw, Sun, X } from "lucide-react";
import { Link, useBlocker, useLocation, useNavigate } from "react-router-dom";
import API_URL from "../../../../../config/api";
import { useAuth } from "../../../../../context/AuthContext";
import TrainingLogo from "../../../../../assets/MATEKK_training_logo.png";
import { CCNA_EXAMS } from "./ccnaExamFormats";
import { createCcnaMockExamAttemptId, saveCcnaMockExamResult } from "../../../../../utils/ccnaGradebook";
import { getCcnaExamSessionKey } from "../../../../../utils/ccnaShortExamSession";
import { isAnswerCorrect, isQuestionAnswered, isValidQuestion } from "../../../../../utils/ccnaExamGrading";
import { QuestionInput, QuestionReview } from "./ccnaExamQuestionViews";
import { saveGradebookAssessment } from "../../../../../utils/gradebookApi";



const EXAM_PASS_PERCENTAGE = 80;
function createExamSession(exam) {
	const questions = exam.createQuestions();
	if (!Array.isArray(questions) || questions.length !== exam.questionCount || !questions.every(isValidQuestion)) {
		throw new Error(`${exam.name} could not create its required set of valid questions.`);
	}
	return {
		attemptId: createCcnaMockExamAttemptId(),
		submittedAt: null,
		questions,
		answers: {},
		lockedQuestions: {},
		currentIndex: 0,
		deadline: Date.now() + exam.durationSeconds * 1000,
		isSubmitted: false,
	};
}

function restoreExamSession(exam, sessionStorageKey) {
	const createSession = () => createExamSession(exam);
	if (!sessionStorageKey || typeof window === "undefined") return createSession();
	const savedSession = window.sessionStorage.getItem(sessionStorageKey);
	if (!savedSession) return createSession();

	try {
		const session = JSON.parse(savedSession);
		const isValid = session &&
			Array.isArray(session.questions) &&
			session.questions.length === exam.questionCount &&
			session.questions.every(isValidQuestion) &&
			session.answers &&
			typeof session.answers === "object" &&
			!Array.isArray(session.answers) &&
			session.lockedQuestions &&
			typeof session.lockedQuestions === "object" &&
			!Array.isArray(session.lockedQuestions) &&
			Number.isInteger(session.currentIndex) &&
			session.currentIndex >= 0 &&
			session.currentIndex < exam.questionCount &&
			Number.isFinite(session.deadline) &&
			typeof session.isSubmitted === "boolean";

		if (!isValid) throw new TypeError(`Saved ${exam.name} session has an invalid structure.`);
		const isSubmitted = session.isSubmitted || session.deadline <= Date.now();
		return {
			...session,
			attemptId: typeof session.attemptId === "string" ? session.attemptId : createCcnaMockExamAttemptId(),
			submittedAt: Number.isFinite(session.submittedAt)
				? session.submittedAt
				: isSubmitted ? Date.now() : null,
			isSubmitted,
		};
	} catch (error) {
		console.error(`Unable to restore the saved ${exam.name} session.`, error);
		window.sessionStorage.removeItem(sessionStorageKey);
		return createSession();
	}
}

function formatTime(totalSeconds) {
	const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
	const seconds = (totalSeconds % 60).toString().padStart(2, "0");
	return `${minutes}:${seconds}`;
}

export default function CCNACompositeExam({ examKey = "short" }) {
	const exam = CCNA_EXAMS[examKey];
	const location = useLocation();
	const navigate = useNavigate();
	const shouldShowExamResult = location.state?.showExamResult === true;
	const linkedExamResult = location.state?.examResult;
	const shouldStartNewAttempt = location.state?.retakeExam === true;
	const { profile } = useAuth();
	const userId = profile?.userId;
	// Each student's exam progress is saved separately (per signed-in user)
	const sessionStorageKey = userId === null || userId === undefined
		? null
		: getCcnaExamSessionKey(exam.sessionKey, userId);
	const [initialSession] = useState(() =>
		shouldStartNewAttempt ? createExamSession(exam) : restoreExamSession(exam, sessionStorageKey),
	);
	const hasLinkedExamResult = shouldShowExamResult &&
		Number.isFinite(linkedExamResult?.score) &&
		Number.isFinite(linkedExamResult?.maxScore) &&
		linkedExamResult.maxScore > 0;
	const isViewingSavedResult = hasLinkedExamResult &&
		(!initialSession.isSubmitted ||
			(typeof linkedExamResult.id === "string" && initialSession.attemptId !== linkedExamResult.id));
	const [attemptId, setAttemptId] = useState(initialSession.attemptId);
	const [submittedAt, setSubmittedAt] = useState(initialSession.submittedAt);
	const [questions, setQuestions] = useState(initialSession.questions);
	const [answers, setAnswers] = useState(initialSession.answers);
	const [lockedQuestions, setLockedQuestions] = useState(initialSession.lockedQuestions);
	const [currentIndex, setCurrentIndex] = useState(initialSession.currentIndex);
	const [deadline, setDeadline] = useState(initialSession.deadline);
	const [secondsRemaining, setSecondsRemaining] = useState(() =>
		Math.max(0, Math.ceil((initialSession.deadline - Date.now()) / 1000)),
	);
	const [isSubmitted, setIsSubmitted] = useState(initialSession.isSubmitted);
	const isResultView = isSubmitted || isViewingSavedResult;
	const [isRetakeConfirmationOpen, setIsRetakeConfirmationOpen] = useState(false);
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
	const answeredCount = questions.filter((item, index) =>
		isQuestionAnswered(item, answers[index]),
	).length;
	const score = questions.reduce(
		(total, item, index) => total + Number(isAnswerCorrect(item, answers[index])),
		0,
	);
	const animatedScore = animatedResult.attempt === examAttempt ? animatedResult.score : 0;
	const animatedElapsedSeconds = animatedResult.attempt === examAttempt ? animatedResult.elapsedSeconds : 0;
	const resultScore = isViewingSavedResult ? linkedExamResult.score : score;
	const resultMaxScore = isViewingSavedResult ? linkedExamResult.maxScore : questions.length;
	const resultPercentage = Math.round((resultScore / resultMaxScore) * 100);
	const displayedScore = isViewingSavedResult ? resultScore : animatedScore;
	const displayedPercentage = isViewingSavedResult ? resultPercentage : Math.round((animatedScore / questions.length) * 100);
	const progressHue = displayedPercentage <= 50
		? displayedPercentage * 1.2
		: 60 + (displayedPercentage - 50) * 1.2;
	const progressColor = `hsl(${progressHue} 75% 42%)`;
	const examPassed = (isViewingSavedResult ? resultPercentage : Math.round((score / questions.length) * 100)) >= EXAM_PASS_PERCENTAGE;
	const showBackToTop = backToTopVisibility.attempt === examAttempt && backToTopVisibility.visible;
	const reviewQuestions = questions
		.map((item, index) => ({
			...item,
			index,
			selectedAnswer: answers[index],
			isCorrect: isAnswerCorrect(item, answers[index]),
		}))
		.filter((item) =>
			answerFilter === "all" ||
			(answerFilter === "correct" && item.isCorrect) ||
			(answerFilter === "incorrect" && !item.isCorrect),
		);
	const [isDark, setIsDark] = useState(false);
	const [gradebookSaveError, setGradebookSaveError] = useState(null);
	const [questionsLoading, setQuestionsLoading] = useState(false);
	const [questionsError, setQuestionsError] = useState("");

	useEffect(() => {
		if (isViewingSavedResult || shouldStartNewAttempt) return undefined;

		const hasSavedSession = Boolean(
			sessionStorageKey &&
			typeof window !== "undefined" &&
			window.sessionStorage.getItem(sessionStorageKey),
		);
		if (hasSavedSession) return undefined;

		let isActive = true;
		const loadQuestions = async () => {
			const token = localStorage.getItem("accessToken");
			if (!token) {
				if (isActive) setQuestionsLoading(false);
				return;
			}

			setQuestionsLoading(true);
			setQuestionsError("");

			try {
				const response = await fetch(`${API_URL}/questions`, {
					headers: { Authorization: "Bearer " + token },
				});
				if (!response.ok) {
					throw new Error("Failed to load questions.");
				}
				const data = await response.json();
				if (!Array.isArray(data)) {
					throw new Error("The question response was not a list.");
				}

				const validQuestions = data.filter(isValidQuestion).slice(0, exam.questionCount);
				if (validQuestions.length === 0) {
					throw new Error("The question response did not include any valid questions.");
				}

				if (!isActive) return;
				setQuestions(validQuestions);
				setAnswers({});
				setLockedQuestions({});
				setCurrentIndex(0);
				setDeadline(Date.now() + exam.durationSeconds * 1000);
				setAttemptId(createCcnaMockExamAttemptId());
				setSubmittedAt(null);
				setSecondsRemaining(exam.durationSeconds);
				setIsSubmitted(false);
				setExamAttempt((attempt) => attempt + 1);
			} catch (error) {
				if (isActive) {
					setQuestionsError(error.message || "Unable to load questions.");
				}
			} finally {
				if (isActive) {
					setQuestionsLoading(false);
				}
			}
		};

		loadQuestions();
		return () => {
			isActive = false;
		};
	}, [exam.durationSeconds, exam.name, exam.questionCount, isViewingSavedResult, sessionStorageKey, shouldStartNewAttempt]);

	useEffect(() => {
		if (!shouldStartNewAttempt) return;
		navigate(location.pathname, { replace: true, state: null });
	}, [location.pathname, navigate, shouldStartNewAttempt]);

	useEffect(() => {
		if (isViewingSavedResult || !sessionStorageKey) return;
		window.sessionStorage.setItem(sessionStorageKey, JSON.stringify({
			attemptId,
			submittedAt,
			questions,
			answers,
			lockedQuestions,
			currentIndex,
			deadline,
			isSubmitted,
		}));
	}, [answers, attemptId, currentIndex, deadline, isSubmitted, isViewingSavedResult, lockedQuestions, questions, sessionStorageKey, submittedAt]);

	useEffect(() => {
		if (!isSubmitted || isViewingSavedResult || !userId || !Number.isFinite(submittedAt)) return;
		saveCcnaMockExamResult(userId, {
			id: attemptId,
			title: exam.name,
			score,
			maxScore: questions.length,
			submittedAt,
		});
	}, [attemptId, exam.name, isSubmitted, isViewingSavedResult, questions.length, score, submittedAt, userId]);

	useEffect(() => {
		if (!isSubmitted || isViewingSavedResult || !userId || !Number.isFinite(submittedAt)) return undefined;

		let isActive = true;
		saveGradebookAssessment("ccna", {
			id: attemptId,
			type: "exam",
			programKey: "ccna",
			title: exam.name,
			score,
			maxScore: questions.length,
			submittedAt,
		}).catch((error) => {
			console.error("Unable to save the exam result to the gradebook.", error);
			if (isActive) {
				setGradebookSaveError("Your exam result could not be saved to the backend gradebook.");
			}
		});

		return () => {
			isActive = false;
		};
	}, [attemptId, exam.name, isSubmitted, isViewingSavedResult, questions.length, score, submittedAt, userId]);

	function submitExam(finishedAt = Date.now()) {
		setSubmittedAt((previousSubmittedAt) => previousSubmittedAt ?? finishedAt);
		setIsSubmitted(true);
	}

	useEffect(() => {
		if (isSubmitted || isViewingSavedResult) return undefined;

		function updateTimer() {
			const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
			setSecondsRemaining(remaining);
			if (remaining === 0) submitExam();
		}

		updateTimer();
		const timer = window.setInterval(updateTimer, 1000);
		return () => window.clearInterval(timer);
	}, [deadline, isSubmitted, isViewingSavedResult]);

	useEffect(() => {
		if (!isSubmitted) return undefined;

		const duration = 1100;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let animationFrame;
		let startTime;
		const finalElapsedSeconds = exam.durationSeconds - secondsRemaining;

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
	}, [exam.durationSeconds, examAttempt, isSubmitted, score, secondsRemaining]);

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

	useEffect(() => {
		if (!isResultView || !shouldShowExamResult) return undefined;
		const animationFrame = window.requestAnimationFrame(() => {
			resultsTopRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
		});
		return () => window.cancelAnimationFrame(animationFrame);
	}, [isResultView, shouldShowExamResult]);

	function restartExam() {
		const newSession = createExamSession(exam);
		setQuestions(newSession.questions);
		setAnswers({});
		setLockedQuestions({});
		setCurrentIndex(0);
		setDeadline(newSession.deadline);
		setAttemptId(newSession.attemptId);
		setSubmittedAt(null);
		setSecondsRemaining(exam.durationSeconds);
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
				!isQuestionAnswered(questions[currentIndex], answers[currentIndex]) ||
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
		<main data-theme={isDark ? "dark" : "light"} className="ccna-page-enter min-h-screen bg-[#f5f9f9] px-4 py-6 text-[#17233d] sm:px-8 sm:py-8">
						<div className="mx-auto max-w-[1125px]">
				{gradebookSaveError && isResultView && (
					<p role="alert" className="mb-4 rounded-xl border border-[#f2c6c3] bg-white px-4 py-3 text-sm font-medium text-[#b42318]">
						{gradebookSaveError} Reload this page to retry.
					</p>
				)}
				{questionsLoading && (
					<p role="status" className="mb-4 rounded-xl border border-[#d6e5e7] bg-white px-4 py-3 text-sm font-medium text-[#005b6b]">
						Loading the CCNA question set...
					</p>
				)}
				{questionsError && (
					<p role="alert" className="mb-4 rounded-xl border border-[#f2c6c3] bg-white px-4 py-3 text-sm font-medium text-[#b42318]">
						{questionsError} Continuing with the local exam question bank.
					</p>
				)}
				<header className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#d6e5e7] pb-5">
					<div className="flex min-w-0 items-center gap-4">
						<Link to="/modules/programs/ccna" aria-label="Back to CCNA course" className="group shrink-0 rounded-full bg-white/80 p-2 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 motion-reduce:transition-none">
							<div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#cfe4ea] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.12)]">
								<div className="absolute inset-0 animate-[spin_30s_linear_infinite]">
									{[
										{ label: "CCNA", angle: 0 },
										{ label: "NET", angle: 45 },
										{ label: "LAB", angle: 90 },
										{ label: "SEC", angle: 135 },
										{ label: "OPS", angle: 180 },
										{ label: "IT", angle: 225 },
										{ label: "CIS", angle: 270 },
										{ label: "AI", angle: 315 },
									].map((chip) => (
										<div
											key={chip.label}
											style={{ "--angle": `${chip.angle}deg` }}
											className="absolute left-1/2 top-1/2 -ml-[1.35rem] -mt-[1.35rem] flex h-[2.7rem] w-[2.7rem] items-center justify-center rounded-full border border-[#dbeaf0] bg-[#f5fbff] text-[7px] font-bold uppercase tracking-[0.12em] text-[#005b6b] shadow-sm [transform:rotate(var(--angle))_translateY(-4.8rem)]"
										>
											{chip.label}
										</div>
									))}
								</div>
								<div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white">
									<img src={TrainingLogo} alt="MATEKK Cybercore Academy" className="h-10 w-auto object-contain" />
								</div>
							</div>
						</Link>
						<div className="hidden min-w-0 border-l border-[#cbd5e1] pl-4 sm:block">
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#70809a]">CCNA composite exam</p>
							<p className="mt-1 truncate text-sm font-bold text-[#17233d]">{exam.name} Â· {exam.subtitle}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => setIsDark((value) => !value)}
							aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
							className="inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] bg-white p-2.5 text-[#005b6b] transition hover:bg-[#e8f3f4]"
						>
							{isDark ? <Sun size={16} /> : <Moon size={16} />}
						</button>
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

				{!isResultView ? (
					<>
						<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
							<div>
								<p className="text-sm font-bold uppercase tracking-[0.12em] text-[#005b6b]">{exam.name}</p>
								<p className="mt-1 text-sm text-[#70809a]">{answeredCount} of {questions.length} questions answered</p>
							</div>
							<div role="progressbar" aria-label="Exam progress" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answeredCount} className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-[#dfe9eb]">
								<div className="h-full rounded-full bg-[#005b6b] transition-[width]" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
							</div>
						</div>

						<div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
							<section className="rounded-[20px] border border-[#d6e5e7] bg-white p-5 shadow-sm sm:p-7">
								<p className="mb-2 text-sm text-[#70809a]">
									Question {currentIndex + 1} of {questions.length}
									{question.moduleNumber && ` Â· Module ${question.moduleNumber}: ${question.moduleTitle}`}
								</p>
								<h1 className="mb-6 text-[1.45rem] font-bold leading-snug tracking-tight sm:text-[1.7rem]">{question.prompt}</h1>
								<QuestionInput
									question={question}
									value={answers[currentIndex]}
									onChange={(value) => setAnswers((previous) => ({ ...previous, [currentIndex]: value }))}
									disabled={Boolean(lockedQuestions[currentIndex])}
								/>
								<div className="mt-6 flex justify-end">
									<button
										type="button"
										onClick={() => currentIndex === questions.length - 1 ? submitExam() : goToQuestion(currentIndex + 1)}
										disabled={!isQuestionAnswered(question, answers[currentIndex])}
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
										const isAnswered = isQuestionAnswered(item, answers[index]);
										const isCurrent = currentIndex === index;
										const canNavigate =
											index === currentIndex ||
											(index === currentIndex + 1 && isQuestionAnswered(questions[currentIndex], answers[currentIndex]) && !lockedQuestions[currentIndex]);
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
									{exam.name} Â· CCNA
								</p>
								<h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#17233d] sm:text-5xl">
									{examPassed ? (
										<>Great work, <span className="text-[#005b6b]">keep it up.</span></>
									) : (
										<>Not there yet, <span className="text-[#005b6b]">keep going.</span></>
									)}
								</h1>
								<p className="mt-4 max-w-xl leading-7 text-[#64748b]">
									You got {resultScore} of {resultMaxScore} questions correct{examKey === "short" ? " across CCNA modules 1.0â€“6.0" : ""}.
									{examPassed
										? " You passed this exam."
										: isViewingSavedResult
											? ` The passing score is ${EXAM_PASS_PERCENTAGE}%.`
											: ` Review your answers below and aim for ${EXAM_PASS_PERCENTAGE}% to pass.`}
								</p>
								<div className="mt-7 flex flex-wrap gap-3">
									<button type="button" onClick={() => setIsRetakeConfirmationOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-[#004653] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100">
										<RotateCcw size={16} /> Retake Exam
									</button>
									{!isViewingSavedResult && (
										<button type="button" onClick={reviewAnswers} className="inline-flex items-center gap-2 rounded-full border border-[#9fc8ce] px-6 py-3 font-semibold text-[#005b6b] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#e8f3f4] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100">
											Review Answers <ArrowLeft className="rotate-[-90deg]" size={16} />
										</button>
									)}
								</div>
								<div className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-[#dce5f2]">
									<div className="pr-4">
										<strong className="block text-3xl font-extrabold tabular-nums text-[#17233d]">{Math.round(displayedScore)}</strong>
										<span className="text-xs leading-4 text-[#71819b]">Your score<br />out of {resultMaxScore}</span>
									</div>
									<div className="px-4">
										<strong className="block text-3xl font-extrabold text-[#17233d]">{resultMaxScore}</strong>
										<span className="text-xs leading-4 text-[#71819b]">Total<br />questions</span>
									</div>
									<div className="pl-4">
										<strong className="block text-3xl font-extrabold tabular-nums text-[#17233d]">{isViewingSavedResult ? "--:--" : formatTime(Math.round(animatedElapsedSeconds))}</strong>
										<span className="text-xs leading-4 text-[#71819b]">Time<br />elapsed</span>
									</div>
								</div>
							</div>

							<div className="flex justify-center py-3">
								<div
									role="img"
									aria-label={`${displayedPercentage}% correct answers; ${EXAM_PASS_PERCENTAGE}% required to pass`}
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
											strokeDashoffset={`${2 * Math.PI * 46 * (1 - displayedPercentage / 100)}`}
										/>
									</svg>
									<div className="absolute inset-[28px] rounded-full border-[12px] border-white" />
									<div className="relative z-10 text-center">
										<strong className="block text-5xl font-extrabold tracking-tight tabular-nums" style={{ color: progressColor }}>{displayedPercentage}%</strong>
										<span className="mt-1 block text-sm font-semibold text-[#64748b]">correct answers</span>
									</div>
									<div className="absolute -left-9 top-[30%] rounded-xl border border-[#e2ecec] bg-white px-4 py-3 shadow-lg transition-transform duration-200 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100">
										<strong className="block text-2xl font-extrabold text-[#005b6b]">{EXAM_PASS_PERCENTAGE}%</strong>
										<span className="text-xs font-medium text-[#71819b]">Passing score</span>
									</div>
								</div>
							</div>
						</section>

						{isAnswerReviewVisible && !isViewingSavedResult && (
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
												className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${answerFilter === filter.value
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
														Question {item.index + 1} of {questions.length}
														{item.moduleNumber && ` Â· Module ${item.moduleNumber}: ${item.moduleTitle}`}
													</span>
													<span className={`rounded-full px-3 py-1 text-xs font-bold ${item.isCorrect ? "bg-[#e8f3f4] text-[#005b6b]" : "bg-[#fff0e8] text-[#b4532a]"
														}`}>
														{item.isCorrect ? "Correct" : "Incorrect"}
													</span>
												</div>
												<h3 className="mt-4 text-lg font-bold leading-snug text-[#17233d] sm:text-xl">{item.prompt}</h3>
												<div className="mt-5">
													<QuestionReview question={item} value={item.selectedAnswer} />
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
			{isRetakeConfirmationOpen && createPortal(
				<div data-theme="light" className="fixed inset-0 z-[120] grid place-items-center bg-[#071126]/60 p-4 backdrop-blur-sm">
					<section
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="ccna-exam-retake-title"
						aria-describedby="ccna-exam-retake-description"
						className="w-full max-w-md rounded-2xl border border-[#d6e5e7] bg-white p-5 text-[#17233d] shadow-2xl sm:p-8"
					>
						<p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#005b6b]">New exam attempt</p>
						<h2 id="ccna-exam-retake-title" className="mt-2 text-xl font-bold sm:text-2xl">
							Are you sure you want to retake the {exam.name.toLowerCase()}?
						</h2>
						<p id="ccna-exam-retake-description" className="mt-3 text-sm leading-6 text-[#64748b]">
							A new attempt will start with a fresh set of randomly selected questions. Your previous result will remain saved.
						</p>
						<div className="mt-6 flex flex-wrap justify-end gap-3">
							<button
								type="button"
								onClick={() => setIsRetakeConfirmationOpen(false)}
								className="rounded-full border border-[#c9dfe2] px-5 py-2.5 text-sm font-semibold text-[#42516b] transition hover:bg-[#f5f9f9]"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={() => {
									setIsRetakeConfirmationOpen(false);
									restartExam();
								}}
								className="rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653]"
							>
								Yes, retake exam
							</button>
						</div>
					</section>
				</div>,
				document.body,
			)}
			{blocker.state === "blocked" && createPortal(
				<div data-theme="light" className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-[#071126]/55 p-4 backdrop-blur-[2px] sm:p-6">
					<section
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="ccna-short-exam-exit-title"
						aria-describedby="ccna-short-exam-exit-description"
						className="w-full max-w-md rounded-2xl border border-[#d6e5e7] bg-white p-5 text-[#17233d] shadow-2xl sm:p-8"
					>
						<p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#005b6b]">Exam in progress</p>
						<h2 id="ccna-short-exam-exit-title" className="mt-2 text-xl font-bold sm:text-2xl">Are you sure you want to exit the exam?</h2>
						<p id="ccna-short-exam-exit-description" className="mt-3 text-sm leading-6 text-[#64748b] sm:text-base">
							Your answers and time remaining will be saved. The timer will keep running while you are away.
						</p>
						<div className="mt-6 flex flex-wrap justify-end gap-3">
							<button type="button" onClick={() => blocker.reset()} className="ccna-modal-stay rounded-full border border-[#c9dfe2] px-4 py-2.5 text-sm font-semibold text-[#42516b] transition hover:bg-[#f5f9f9] sm:px-5">
								Stay in exam
							</button>
							<button type="button" onClick={() => blocker.proceed()} className="rounded-full bg-[#005b6b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653] sm:px-5">
								Exit exam
							</button>
						</div>
					</section>
				</div>,
				document.body,
			)}
		</main>
	);
}



