// Exams for the CCNA Automation and CCNA Cybersecurity programs (jhonard, d9128cd).
// Their questions come from each program's module quizzes and are graded in the browser;
// the CCNA exam itself uses ccnaCompositeExam.jsx, which is built and graded by the backend.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUp, Clock3, Flag, Moon, RotateCcw, Sun, X } from "lucide-react";
import { Link, Navigate, useBlocker, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../../context/auth-context";
import ExplanationWithLinks from "../../../../../components/ExplanationWithLinks";
import TrainingLogo from "../../../../../assets/MATEKK_training_logo.png";
import { CCNA_EXAMS } from "./ccnaExamFormats";
import { createCcnaMockExamAttemptId, saveCcnaMockExamResult } from "../../../../../utils/ccnaGradebook";
import { getCcnaExamSessionKey } from "../../../../../utils/ccnaShortExamSession";
import { isAnswerCorrect, isQuestionAnswered, isScoredQuestion, isValidQuestion } from "../../../../../utils/ccnaExamGrading";
import { QuestionInput, QuestionPrompt, QuestionReview } from "./ccnaExamQuestionViews";
import { saveGradebookAssessment } from "../../../../../utils/gradebookApi";
import { splitPromptExhibit } from "../../../../../utils/splitPromptExhibit";
import { ExhibitImage, ExhibitText } from "./ccnaExhibit";
import { loadCcnaQuestionBank } from "../../../../../utils/ccnaQuestionBankApi";
import { setDatabaseQuestions } from "./ccnaQuestionBank";
import { getProgramExamFormats } from "../../programExamFormats";



const EXAM_PASS_PERCENTAGE = 80;
function createExamSession(exam) {
	const questions = exam.createQuestions();
	if (!Array.isArray(questions) || questions.length !== exam.questionCount || !questions.every(isValidQuestion)) {
		throw new Error(`${exam.name} could not create its required set of valid questions.`);
	}
	const deadline = exam.durationSeconds === null
		? null
		: Date.now() + exam.durationSeconds * 1000;
	return {
		attemptId: createCcnaMockExamAttemptId(),
		submittedAt: null,
		questions,
		answers: {},
		lockedQuestions: {},
		currentIndex: 0,
		deadline,
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
			(exam.durationSeconds === null ||
				!exam.programName?.startsWith("CompTIA ") ||
				!session.questions.some((question) => question.type === "study")) &&
			(exam.durationSeconds === null ? session.deadline === null : Number.isFinite(session.deadline)) &&
			typeof session.isSubmitted === "boolean";

		if (!isValid) throw new TypeError(`Saved ${exam.name} session has an invalid structure.`);
		const isSubmitted = session.isSubmitted ||
			(exam.durationSeconds !== null && session.deadline <= Date.now());
		const questionBankById = new Map((exam.questionBank ?? []).map((question) => [question.id, question]));
		let answers = session.answers;
		const questions = session.questions.map((question, index) => {
			const currentBankQuestion = questionBankById.get(question.id);
			const questionTypeChanged = currentBankQuestion && currentBankQuestion.type !== question.type;
			const refreshedQuestion = questionTypeChanged
				? currentBankQuestion
				: currentBankQuestion && (currentBankQuestion.imageUrl || currentBankQuestion.exhibitImage)
					? { ...question, imageUrl: currentBankQuestion.imageUrl, exhibitImage: currentBankQuestion.exhibitImage }
					: question;
			if (questionTypeChanged) {
				if (answers === session.answers) answers = { ...session.answers };
				delete answers[index];
			}
			return refreshedQuestion.exhibit || refreshedQuestion.exhibitImage
				? refreshedQuestion
				: { ...refreshedQuestion, ...splitPromptExhibit(refreshedQuestion.prompt) };
		});
		return {
			...session,
			// Attempts saved before router output was split out of the question text get the same clean-up
			questions,
			answers,
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

function CCNACompositeExamPage({ examKey = "short", programKey = null, examFormats = null, theme = "ccna" }) {
	const exam = examFormats?.[examKey] ?? (programKey ? getProgramExamFormats(programKey)?.[examKey] : CCNA_EXAMS[examKey]);
	if (!exam) throw new Error(`No exam is configured for ${programKey ?? "CCNA"} format "${examKey}".`);
	const programName = exam.programName ?? "CCNA";
	const isCompTIAExam = theme === "comptia";
	const plainTextOptions = programKey === "comptia-security-plus";
	const isFortinetExam = theme === "fortinet";
	const isPracticeOnlyExam = isFortinetExam && examKey === "all_questions";
	const dashboardPath = `/modules/programs/${programKey ?? "ccna"}`;
	const location = useLocation();
	const navigate = useNavigate();
	const shouldShowExamResult = location.state?.showExamResult === true;
	const linkedExamResult = location.state?.examResult;
	const shouldStartNewAttempt = location.state?.retakeExam === true;
	const { profile, isLoading: isAuthLoading, isOnline } = useAuth();
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
		initialSession.deadline === null
			? 0
			: Math.max(0, Math.ceil((initialSession.deadline - Date.now()) / 1000)),
	);
	const [flaggedQuestions, setFlaggedQuestions] = useState({});
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
	const questionCardRef = useRef(null);
	const previousIndexRef = useRef(currentIndex);
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
	const unansweredCount = questions.length - answeredCount;
	const answeredPercentage = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;
	const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
	const scoredQuestionCount = questions.filter(isScoredQuestion).length;
	const score = questions.reduce(
		(total, item, index) => total + Number(isAnswerCorrect(item, answers[index])),
		0,
	);
	const animatedScore = animatedResult.attempt === examAttempt ? animatedResult.score : 0;
	const animatedElapsedSeconds = animatedResult.attempt === examAttempt ? animatedResult.elapsedSeconds : 0;
	const resultScore = isViewingSavedResult ? linkedExamResult.score : score;
	const resultMaxScore = isViewingSavedResult ? linkedExamResult.maxScore : scoredQuestionCount;
	const resultPercentage = resultMaxScore > 0 ? Math.round((resultScore / resultMaxScore) * 100) : 0;
	const displayedScore = isViewingSavedResult ? resultScore : animatedScore;
	const displayedPercentage = isViewingSavedResult
		? resultPercentage
		: scoredQuestionCount > 0 ? Math.round((animatedScore / scoredQuestionCount) * 100) : 0;
	const progressHue = displayedPercentage <= 50
		? displayedPercentage * 1.2
		: 60 + (displayedPercentage - 50) * 1.2;
	const progressColor = `hsl(${progressHue} 75% 42%)`;
	const examPassed = (isViewingSavedResult
		? resultPercentage
		: scoredQuestionCount > 0 ? Math.round((score / scoredQuestionCount) * 100) : 0) >= EXAM_PASS_PERCENTAGE;
	const showBackToTop = backToTopVisibility.attempt === examAttempt && backToTopVisibility.visible;
	const reviewQuestions = questions
		.map((item, index) => ({
			...item,
			index,
			selectedAnswer: answers[index],
			isScored: isScoredQuestion(item),
			isCorrect: isAnswerCorrect(item, answers[index]),
		}))
		.filter((item) =>
			answerFilter === "all" ||
			(answerFilter === "correct" && item.isCorrect) ||
			(answerFilter === "incorrect" && item.isScored && !item.isCorrect),
		);
	const [isDark, setIsDark] = useState(false);
	const [gradebookSaveError, setGradebookSaveError] = useState(null);
	const [gradebookSaved, setGradebookSaved] = useState(false);
	const [gradebookSaveAttempt, setGradebookSaveAttempt] = useState(0);

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
		if (programKey || !isSubmitted || isViewingSavedResult || !userId || !Number.isFinite(submittedAt)) return;
		saveCcnaMockExamResult(userId, {
			id: attemptId,
			title: exam.name,
			score,
			maxScore: scoredQuestionCount,
			submittedAt,
		});
	}, [attemptId, exam.name, isSubmitted, isViewingSavedResult, programKey, scoredQuestionCount, score, submittedAt, userId]);

	useEffect(() => {
		if (isAuthLoading || !isSubmitted || isViewingSavedResult || isPracticeOnlyExam || !userId || !Number.isFinite(submittedAt)) return undefined;

		let isActive = true;
		const assessmentProgramKey = programKey ?? "ccna";
		saveGradebookAssessment(assessmentProgramKey, {
			id: `exam:${examKey}:${attemptId}`,
			attemptId,
			type: "exam",
			programKey: assessmentProgramKey,
			examFormat: examKey,
			title: programKey ? `${exam.name} · ${programName}` : exam.name,
			score,
			maxScore: scoredQuestionCount,
			submittedAt,
		}, userId).then(() => {
			if (isActive) {
				setGradebookSaveError(null);
				setGradebookSaved(true);
			}
		}).catch((error) => {
			console.error("Unable to save the exam result to UserGradebook.", error);
			if (isActive) {
				setGradebookSaved(false);
				setGradebookSaveError(error instanceof Error ? error.message : "The gradebook request failed.");
			}
		});

		return () => {
			isActive = false;
		};
	}, [attemptId, exam.name, examKey, gradebookSaveAttempt, isAuthLoading, isPracticeOnlyExam, isSubmitted, isViewingSavedResult, programKey, programName, scoredQuestionCount, score, submittedAt, userId]);

	function submitExam(finishedAt = Date.now()) {
		setSubmittedAt((previousSubmittedAt) => previousSubmittedAt ?? finishedAt);
		setIsSubmitted(true);
	}

	useEffect(() => {
		if (exam.durationSeconds === null || isSubmitted || isViewingSavedResult) return undefined;

		function updateTimer() {
			const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
			setSecondsRemaining(remaining);
			if (remaining === 0) submitExam();
		}

		updateTimer();
		const timer = window.setInterval(updateTimer, 1000);
		return () => window.clearInterval(timer);
	}, [deadline, exam.durationSeconds, isSubmitted, isViewingSavedResult]);

	useEffect(() => {
		if (!isSubmitted) return undefined;

		const duration = 1100;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let animationFrame;
		let startTime;
		const finalElapsedSeconds = exam.durationSeconds === null
			? 0
			: exam.durationSeconds - secondsRemaining;

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
		setFlaggedQuestions({});
		setDeadline(newSession.deadline);
		setAttemptId(newSession.attemptId);
		setSubmittedAt(null);
		setGradebookSaved(false);
		setGradebookSaveError(null);
		setSecondsRemaining(exam.durationSeconds ?? 0);
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

	// When the question changes, bring the start of the new question into view (it may be scrolled
	// far down after reading a long exhibit). Skipped on first load so the page opens at the top.
	useEffect(() => {
		if (previousIndexRef.current === currentIndex) return;
		previousIndexRef.current = currentIndex;
		const card = questionCardRef.current;
		if (!card) return;
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
	}, [currentIndex]);

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
		<main data-theme={isDark ? "dark" : "light"} className={`ccna-page-enter min-h-screen bg-[#f5f9f9] px-4 py-6 text-[#17233d] sm:px-8 sm:py-8 ${isCompTIAExam ? "comptia-exam-page" : ""} ${isFortinetExam ? "fortinet-exam-page" : ""}`}>
						<div className="mx-auto max-w-[1125px]">
				{!isPracticeOnlyExam && gradebookSaveError && isResultView && (
					<p role="alert" className="mb-4 rounded-xl border border-[#f2c6c3] bg-white px-4 py-3 text-sm font-medium text-[#b42318]">
						Your exam result could not be saved to the backend gradebook. {gradebookSaveError}{" "}
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
				{!isPracticeOnlyExam && isSubmitted && !isViewingSavedResult && !gradebookSaveError && !gradebookSaved && (
					<p role="status" className="mb-4 rounded-xl border border-[#d6e5e7] bg-white px-4 py-3 text-sm font-medium text-[#005b6b]">
						Saving your exam result to the backend gradebook…
					</p>
				)}
				{!isPracticeOnlyExam && isSubmitted && !isViewingSavedResult && gradebookSaved && (
					<p role="status" className="mb-4 rounded-xl border border-[#b8dfce] bg-white px-4 py-3 text-sm font-medium text-[#16724e]">
						Your exam result was saved to the backend gradebook.
					</p>
				)}
				<header className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#d6e5e7] pb-5">
					<div className="flex min-w-0 items-center gap-4">
						<Link to={dashboardPath} aria-label={`Back to ${programName} course`} className="ccna-training-logo shrink-0 rounded-lg bg-white px-3 py-2 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 motion-reduce:transition-none">
							<img src={TrainingLogo} alt="MATEKK Cybercore Academy" className="h-auto w-32 sm:w-36" />
						</Link>
						<div className="hidden min-w-0 border-l border-[#cbd5e1] pl-4 sm:block">
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#70809a]">{programName} exam</p>
							<p className="mt-1 truncate text-sm font-bold text-[#17233d]">{exam.name} · {exam.subtitle}</p>
						</div>
					</div>
					<div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
						<button
							type="button"
							onClick={() => setIsDark((value) => !value)}
							aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
							aria-pressed={isDark}
							className="ccna-dark-hover inline-flex shrink-0 items-center gap-2 rounded-full border border-[#c9dfe2] bg-white px-3 py-2 text-xs font-semibold text-[#005b6b] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:bg-[#e8f3f4] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-4 sm:text-sm"
						>
							{isDark ? <Sun size={16} /> : <Moon size={16} />}
							<span className="hidden sm:inline">{isDark ? "Light mode" : "Dark mode"}</span>
						</button>
						<Link to={dashboardPath} className="ccna-dark-hover inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#c9dfe2] px-3 py-2 text-xs font-semibold text-[#005b6b] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#e8f3f4] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:gap-2 sm:px-4 sm:text-sm">
							<X size={16} /> <span>Exit exam</span>
						</Link>
					</div>
				</header>

				{!isResultView ? (
					<>
						<section aria-label="Exam progress" className="mb-5 rounded-2xl border border-[#d6e5e7] bg-white p-5 shadow-sm sm:mb-6 sm:p-8">
							<div className="flex flex-wrap items-center justify-between gap-3">
								<p className="rounded-xl bg-[#e1f5ef] px-4 py-2 text-sm font-semibold text-[#075b4a]">{exam.name}</p>
								{exam.durationSeconds === null ? (
									<div className="shrink-0 rounded-full border border-[#c9dfe2] bg-white px-3 py-2 text-xs font-semibold text-[#005b6b] sm:px-4 sm:text-sm">
										No time limit
									</div>
								) : (
									<div
										role="timer"
										aria-label={`${formatTime(secondsRemaining)} remaining`}
										className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold tabular-nums sm:px-4 sm:text-sm ${secondsRemaining <= 10 ? "border-[#edbd9b] bg-[#fff5ee] text-[#a44b13]" : "border-[#c9dfe2] bg-white text-[#005b6b]"}`}
									>
										{formatTime(secondsRemaining)}
									</div>
								)}
							</div>

							<div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
								<h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#17233d] sm:text-[2.65rem]">
									Question {currentIndex + 1} <span className="text-base font-normal text-[#64748b] sm:text-lg">of {questions.length}</span>
								</h1>
								<p className="text-sm text-[#64748b] sm:text-base">{answeredCount} answered <span aria-hidden="true">·</span> {answeredPercentage}%</p>
							</div>
							<div
								role="progressbar"
								aria-label="Exam progress"
								aria-valuemin={0}
								aria-valuemax={questions.length}
								aria-valuenow={answeredCount}
								aria-valuetext={`${answeredCount} of ${questions.length} answered, ${answeredPercentage}%`}
								className="mt-3 h-2 overflow-hidden rounded-full bg-[#e7e7e7]"
							>
								<div className="h-full rounded-full bg-[#159b73] transition-[width]" style={{ width: `${answeredPercentage}%` }} />
							</div>
							<div className="mt-4 flex flex-wrap gap-2.5 text-sm text-[#526584]">
								<span className="rounded-xl bg-[#f8fafb] px-3 py-2">{answeredCount} answered</span>
								<button
									type="button"
									onClick={() => setFlaggedQuestions((previous) => ({
										...previous,
										[currentIndex]: !previous[currentIndex],
									}))}
									aria-label={`${flaggedQuestions[currentIndex] ? "Unflag" : "Flag"} question ${currentIndex + 1}; ${flaggedCount} flagged`}
									aria-pressed={Boolean(flaggedQuestions[currentIndex])}
									className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 transition ${flaggedQuestions[currentIndex]
										? "bg-[#fff1d6] text-[#8a5200]"
										: "bg-[#f8fafb] hover:bg-[#eef3f5]"
										}`}
								>
									<Flag size={15} fill={flaggedQuestions[currentIndex] ? "currentColor" : "none"} />
									{flaggedCount} flagged
								</button>
								<span className="rounded-xl bg-[#f8fafb] px-3 py-2">{unansweredCount} left</span>
							</div>
						</section>

						<div className="w-full">
							<section ref={questionCardRef} className="scroll-mt-4 rounded-[20px] border border-[#d6e5e7] bg-white p-4 shadow-sm sm:p-7">
								<p className="mb-2 text-sm text-[#70809a]">
									Question {currentIndex + 1} of {questions.length}
									{question.moduleNumber && ` · Module ${question.moduleNumber}: ${question.moduleTitle}`}
								</p>
								<QuestionPrompt
									prompt={question.prompt}
									imageUrl={question.exhibitImage || question.imageUrl}
									hasSeparateExhibit={Boolean(question.exhibit || question.exhibitImage || question.imageUrl)}
									regularWeight={isCompTIAExam && !isOnline}
								/>
								{/* Device output extracted from the question stays separate from its prompt. */}
								{question.exhibit && (
									<ExhibitText text={question.exhibit} className="mb-6" />
								)}
								{question.afterExhibitPrompt && (
									<QuestionPrompt prompt={question.afterExhibitPrompt} regularWeight={isCompTIAExam && !isOnline} />
								)}
								<QuestionInput
									key={question.bankId ?? question.id ?? currentIndex}
									question={question}
									value={answers[currentIndex]}
									onChange={(value) => setAnswers((previous) => ({ ...previous, [currentIndex]: value }))}
									disabled={Boolean(lockedQuestions[currentIndex])}
									plainTextOptions={plainTextOptions}
								/>
								<div className="mt-6 flex justify-end gap-3">
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

						</div>
					</>
				) : (
					<>
						<div ref={resultsTopRef} className="scroll-mt-6" />
						<section className="fade-in-up grid items-center gap-10 rounded-[24px] border border-[#d6e5e7] bg-white px-6 py-10 shadow-sm sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:px-14 lg:py-14">
							<div>
								<p className="inline-flex items-center gap-2 rounded-full bg-[#e8f3f4] px-3 py-1.5 text-xs font-bold tracking-wide text-[#005b6b]">
									<span className="h-2 w-2 rounded-full bg-[#005b6b]" />
									{exam.name} · {programName}
								</p>
								<h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#17233d] sm:text-5xl">
									{examPassed ? (
										<>Great work, <span className="text-[#005b6b]">keep it up.</span></>
									) : (
										<>Not there yet, <span className="text-[#005b6b]">keep going.</span></>
									)}
								</h1>
								<p className="mt-4 max-w-xl leading-7 text-[#64748b]">
									You got {resultScore} of {resultMaxScore} questions correct{examKey === "short" ? ` across the ${exam.subtitle}` : ""}.
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
										<strong className="block text-xl font-extrabold text-[#17233d]">
											{exam.durationSeconds === null ? "No limit" : isViewingSavedResult ? "--:--" : formatTime(Math.round(animatedElapsedSeconds))}
										</strong>
										<span className="text-xs leading-4 text-[#71819b]">
											{exam.durationSeconds === null ? <>Time<br />limit</> : <>Time<br />elapsed</>}
										</span>
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
											{ value: "incorrect", label: `Incorrect (${scoredQuestionCount - score})` },
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
														{item.moduleNumber && ` · Module ${item.moduleNumber}: ${item.moduleTitle}`}
													</span>
													<span className={`rounded-full px-3 py-1 text-xs font-bold ${!item.isScored
														? "bg-[#edf1f5] text-[#526584]"
														: item.isCorrect ? "bg-[#e8f3f4] text-[#005b6b]" : "bg-[#fff0e8] text-[#b4532a]"
														}`}>
														{!item.isScored ? "Ungraded" : item.isCorrect ? "Correct" : "Incorrect"}
													</span>
												</div>
												<h3
													className="ccna-exam-review-question mt-4 text-[#17233d]"
													style={isCompTIAExam && !isOnline ? { fontWeight: 400 } : undefined}
												>
													{item.prompt}
												</h3>
												{item.exhibitImage && (
													<ExhibitImage src={item.exhibitImage} lazy className="mt-4" imageClassName="max-h-[26rem]" />
												)}
												{item.exhibit && (
													<ExhibitText text={item.exhibit} className="mt-4" />
												)}
												{item.afterExhibitPrompt && (
													<p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-[#17233d]">{item.afterExhibitPrompt}</p>
												)}
												<div className="mt-5">
													<QuestionReview question={item} value={item.selectedAnswer} plainTextOptions={plainTextOptions} />
												</div>
												{item.explanation && (programKey === "fortinet-fortios" ? (
													<ExplanationWithLinks
														explanation={item.explanation}
														className="mt-4 rounded-xl bg-[#f5f9f9] px-4 py-3 text-sm leading-6 text-[#596983]"
														labelClassName="font-bold text-[#005b6b]"
													/>
												) : (
													<p className="mt-4 rounded-xl bg-[#f5f9f9] px-4 py-3 text-sm leading-6 text-[#596983]">
														<span className="font-bold text-[#005b6b]">Explanation: </span>{item.explanation}
													</p>
												))}
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
				<div data-theme="light" className={`fixed inset-0 z-[120] grid place-items-center bg-[#071126]/60 p-4 backdrop-blur-sm ${isCompTIAExam ? "comptia-exam-dialog" : ""} ${isFortinetExam ? "fortinet-exam-dialog" : ""}`}>
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
							{exam.durationSeconds === null
								? "A new attempt will include every question in database order. Your previous result will remain saved."
								: "A new attempt will start with a fresh set of randomly selected questions. Your previous result will remain saved."}
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
				<div data-theme="light" className={`fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-[#071126]/55 p-4 backdrop-blur-[2px] sm:p-6 ${isCompTIAExam ? "comptia-exam-dialog" : ""} ${isFortinetExam ? "fortinet-exam-dialog" : ""}`}>
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

// Loads the database question bank first, so a new attempt draws its questions from it.
// (If the bank can't be reached, the exam still works with the questions built into the site.)
export default function CCNACompositeExam({ programKey = null, examFormats = null, theme = "ccna", ...props }) {
	const routeParams = useParams();
	const examKey = props.examKey ?? routeParams.examKey ?? "short";
	const resolvedProgramKey = programKey ?? (
		routeParams.programKey === "ccna-automation" || routeParams.programKey === "ccna-cybersecurity"
			? routeParams.programKey
			: null
	);
	const isProgramExam = Boolean(resolvedProgramKey);
	const [status, setStatus] = useState("loading");
	const isReady = isProgramExam || status === "ready";
	const hasValidExam = resolvedProgramKey
		? Boolean(examFormats?.[examKey] ?? getProgramExamFormats(resolvedProgramKey)?.[examKey])
		: Boolean(CCNA_EXAMS[examKey]);
	useEffect(() => {
		if (isProgramExam) return undefined;
		let active = true;
		loadCcnaQuestionBank()
			.then(({ questions }) => {
				setDatabaseQuestions(questions);
				if (active) setStatus("ready");
			})
			.catch((error) => {
				console.error("Unable to load the CCNA question bank; using the built-in questions instead.", error);
				if (active) setStatus("ready");
			});
		return () => { active = false; };
	}, [isProgramExam]);

	if (!hasValidExam) return <Navigate to={`/modules/programs/${resolvedProgramKey ?? "ccna"}`} replace />;
	if (!isReady) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-[#f5f9f9] px-4 text-[#17233d]">
				<p role="status" className="rounded-2xl border border-[#d6e5e7] bg-white px-6 py-4 text-sm font-semibold text-[#005b6b] shadow-sm">
					Loading the CCNA question bank…
				</p>
			</main>
		);
	}
	return <CCNACompositeExamPage key={`${resolvedProgramKey ?? "ccna"}-${examKey}`} {...props} examKey={examKey} programKey={resolvedProgramKey} examFormats={examFormats} theme={theme} />;
}
