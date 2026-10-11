import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUp, Clock3, Flag, Moon, RotateCcw, Sun, X } from "lucide-react";
import { Link, useBlocker, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../context/AuthContext";
import TrainingLogo from "../../../../../assets/MATEKK_training_logo.png";
import { CCNA_EXAMS } from "./ccnaExamFormats";
import { saveCcnaMockExamResult } from "../../../../../utils/ccnaGradebook";
import { getCcnaExamSessionKey } from "../../../../../utils/ccnaShortExamSession";
import { isQuestionAnswered } from "../../../../../utils/ccnaExamGrading";
import { QuestionInput, QuestionPrompt, QuestionReview } from "./ccnaExamQuestionViews";
import { splitPromptExhibit } from "../../../../../utils/splitPromptExhibit";
import { cleanText } from "../../../../../utils/ccnaBankConverter";
import { ExhibitDiagram, ExhibitImage, ExhibitText } from "./ccnaExhibit";
import { loadCcnaQuestionBank } from "../../../../../utils/ccnaQuestionBankApi";
import { getDatabaseQuestionById, setDatabaseQuestions } from "./ccnaQuestionBank";
import { resumeCcnaExam, startCcnaExam, submitCcnaExam } from "../../../../../utils/ccnaExamApi";
const EXAM_PASS_PERCENTAGE = 80;

function formatTime(totalSeconds) {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
	const seconds = (totalSeconds % 60).toString().padStart(2, "0");
	return hours > 0 ? `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
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
	const hasLinkedExamResult = shouldShowExamResult &&
		Number.isFinite(linkedExamResult?.score) &&
		Number.isFinite(linkedExamResult?.maxScore) &&
		linkedExamResult.maxScore > 0;
	const [examLoadState, setExamLoadState] = useState({ status: "loading", error: null });
	const [loadAttempt, setLoadAttempt] = useState(0);
	const [attemptId, setAttemptId] = useState(null);
	const [submittedAt, setSubmittedAt] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [lockedQuestions, setLockedQuestions] = useState({});
	const [flaggedQuestions, setFlaggedQuestions] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const [deadline, setDeadline] = useState(null);
	const [secondsRemaining, setSecondsRemaining] = useState(exam.durationSeconds);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [serverResult, setServerResult] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const shouldStartNewAttemptRef = useRef(shouldStartNewAttempt);
	const submitInFlightRef = useRef(false);
	const submitExamRef = useRef(null);
	const isViewingSavedResult = hasLinkedExamResult &&
		(!isSubmitted || (typeof linkedExamResult.id === "string" && attemptId !== linkedExamResult.id));
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
	const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
	const answeredPercentage = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;
	const score = serverResult?.score ?? 0;
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
	const reviewQuestions = (Array.isArray(serverResult?.review) ? serverResult.review : [])
		.map((item, index) => {
			const question = questions[index];
			const isMatch = question?.type === "match";
			return {
				...question,
				index,
				answer: isMatch ? item.correctAnswer : question?.options.indexOf(typeof item.correctAnswer === "string" ? cleanText(item.correctAnswer) : item.correctAnswer),
				selectedAnswer: isMatch
					? item.selectedAnswer
					: question?.options.indexOf(typeof item.selectedAnswer === "string" ? cleanText(item.selectedAnswer) : item.selectedAnswer),
				isCorrect: item.isCorrect,
				explanation: item.explanation,
			};
		})
		.filter((item) =>
			answerFilter === "all" ||
			(answerFilter === "correct" && item.isCorrect) ||
			(answerFilter === "incorrect" && !item.isCorrect),
		);
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		let isActive = true;

		async function loadExamAttempt() {
			setExamLoadState({ status: "loading", error: null });
			// The question bank supplies each question's picture / printout; load it alongside the exam questions
			const bankReady = loadCcnaQuestionBank()
				.then(({ questions: bankQuestions }) => setDatabaseQuestions(bankQuestions))
				.catch((error) => console.error("Unable to load the CCNA question bank; exam pictures may be missing.", error));
			try {
				let savedSession = null;
				const isRetake = shouldStartNewAttemptRef.current;
				if (!isRetake && sessionStorageKey) {
					const savedValue = window.sessionStorage.getItem(sessionStorageKey);
					if (savedValue) {
						try {
							const parsed = JSON.parse(savedValue);
							if (
								parsed &&
								typeof parsed.attemptId === "string" &&
								Array.isArray(parsed.questions) &&
								parsed.questions.every((question) =>
									Number.isInteger(question?.id) &&
									typeof question.prompt === "string" &&
									(question.type === "match"
										? Array.isArray(question.items) && Array.isArray(question.choices)
										: Array.isArray(question.options)),
								)
							) savedSession = parsed;
							else window.sessionStorage.removeItem(sessionStorageKey);
						} catch (error) {
							console.error(`Unable to restore the saved ${exam.name} attempt.`, error);
							window.sessionStorage.removeItem(sessionStorageKey);
						}
					}
				}

				let apiAttempt;
				if (savedSession) {
					try {
						apiAttempt = await resumeCcnaExam(examKey, savedSession.attemptId);
					} catch (error) {
						if (error?.status !== 404) throw error;
						console.warn(`The saved ${exam.name} attempt no longer exists; starting a new attempt.`);
						window.sessionStorage.removeItem(sessionStorageKey);
						apiAttempt = await startCcnaExam(examKey);
					}
				} else {
					apiAttempt = await startCcnaExam(examKey);
				}
				if (!isActive) return;
				if (apiAttempt.questions.length !== exam.questionCount) {
					throw new TypeError(`The backend did not return ${exam.questionCount} questions for this exam.`);
				}
				await bankReady;
				if (!isActive) return;
				const loadedQuestions = apiAttempt.questions.map((apiQuestion) => {
					const bankQuestion = getDatabaseQuestionById(apiQuestion.id);
					// Fix text saved with the wrong encoding ("â€œwarningâ€" -> “warning”) for display.
					// The original option text is kept for submitting, since the backend grades by exact text.
					const cleanList = (list) => (Array.isArray(list) ? list.map((value) => (typeof value === "string" ? cleanText(value) : value)) : list);
					// "Option A / Option B …" questions: the options are described in a table inside the question text.
					// Keep that text whole (the question view lays the table out itself) and list the answers A, B, C, D in order.
					const isOptionTable = Array.isArray(apiQuestion.options) &&
						apiQuestion.options.every((option) => /^\s*Option [A-H]\s*$/i.test(String(option)));
					const { prompt, exhibit } = isOptionTable
						? { prompt: cleanText(apiQuestion.prompt) }
						: splitPromptExhibit(cleanText(apiQuestion.prompt));
					const orderedOptions = isOptionTable
						? [...apiQuestion.options].sort((left, right) => String(left).trim().localeCompare(String(right).trim()))
						: apiQuestion.options;
					return {
						...apiQuestion,
						prompt,
						...(Array.isArray(orderedOptions) ? { options: cleanList(orderedOptions), rawOptions: orderedOptions } : {}),
						...(Array.isArray(apiQuestion.items) ? { items: cleanList(apiQuestion.items) } : {}),
						...(Array.isArray(apiQuestion.choices) ? { choices: cleanList(apiQuestion.choices) } : {}),
						...(typeof apiQuestion.explanation === "string" ? { explanation: cleanText(apiQuestion.explanation) } : {}),
						...(exhibit ? { exhibit } : {}),
						...(bankQuestion?.exhibit && !isOptionTable ? { exhibit: bankQuestion.exhibit } : {}),
						// The picture: from the question bank, or the signed link the exam itself sends
						...((bankQuestion?.exhibitImage || apiQuestion.imageUrl) ? { exhibitImage: bankQuestion?.exhibitImage || apiQuestion.imageUrl } : {}),
					};
				});

				const cachedQuestionsMatch = savedSession?.questions?.length === loadedQuestions.length &&
					savedSession.questions.every((savedQuestion, index) =>
						savedQuestion.id === loadedQuestions[index].id &&
						(savedQuestion.type ?? "single") === loadedQuestions[index].type &&
						JSON.stringify(savedQuestion.options) === JSON.stringify(loadedQuestions[index].options) &&
						JSON.stringify(savedQuestion.items) === JSON.stringify(loadedQuestions[index].items) &&
						JSON.stringify(savedQuestion.choices) === JSON.stringify(loadedQuestions[index].choices),
					);
				const restoredAnswers = cachedQuestionsMatch && savedSession.answers &&
					typeof savedSession.answers === "object" && !Array.isArray(savedSession.answers)
					? savedSession.answers
					: {};
				const restoredIndex = cachedQuestionsMatch && Number.isInteger(savedSession.currentIndex) &&
					savedSession.currentIndex >= 0 && savedSession.currentIndex < loadedQuestions.length
					? savedSession.currentIndex
					: 0;
				const restoredLocks = cachedQuestionsMatch && savedSession.lockedQuestions &&
					typeof savedSession.lockedQuestions === "object" && !Array.isArray(savedSession.lockedQuestions)
					? savedSession.lockedQuestions
					: {};
				const restoredFlags = cachedQuestionsMatch && savedSession.flaggedQuestions &&
					typeof savedSession.flaggedQuestions === "object" && !Array.isArray(savedSession.flaggedQuestions)
					? savedSession.flaggedQuestions
					: {};
				const result = apiAttempt.isSubmitted
					? {
						score: apiAttempt.score,
						maxScore: apiAttempt.questions.length,
						review: apiAttempt.review,
					}
					: null;

				setAttemptId(apiAttempt.attemptId);
				setQuestions(loadedQuestions);
				setAnswers(restoredAnswers);
				setLockedQuestions(restoredLocks);
				setFlaggedQuestions(restoredFlags);
				setCurrentIndex(restoredIndex);
				setDeadline(apiAttempt.deadline);
				setSecondsRemaining(Math.max(0, Math.ceil((apiAttempt.deadline - Date.now()) / 1000)));
				setSubmittedAt(apiAttempt.submittedAt);
				setServerResult(result);
				setIsSubmitted(apiAttempt.isSubmitted);
				setExamLoadState({ status: "ready", error: null });
				shouldStartNewAttemptRef.current = false;
				if (isRetake) navigate(location.pathname, { replace: true, state: null });
			} catch (error) {
				console.error(`Unable to load the ${exam.name} questions from the backend.`, error);
				if (isActive) setExamLoadState({
					status: "error",
					error: error instanceof Error ? error.message : "The exam could not be loaded.",
				});
			}
		}

		loadExamAttempt();
		return () => {
			isActive = false;
		};
	}, [exam.durationSeconds, exam.name, exam.questionCount, examKey, loadAttempt, location.pathname, navigate, sessionStorageKey]);

	useEffect(() => {
		if (!attemptId || examLoadState.status !== "ready" || isViewingSavedResult || !sessionStorageKey) return;
		window.sessionStorage.setItem(sessionStorageKey, JSON.stringify({
			attemptId,
			submittedAt,
			questions,
			answers,
			lockedQuestions,
			flaggedQuestions,
			currentIndex,
			deadline,
			isSubmitted,
			serverResult,
			score: serverResult?.score ?? null,
		}));
	}, [answers, attemptId, currentIndex, deadline, examLoadState.status, flaggedQuestions, isSubmitted, isViewingSavedResult, lockedQuestions, questions, serverResult, sessionStorageKey, submittedAt]);

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

	async function submitExam() {
		if (submitInFlightRef.current || isSubmitted || !attemptId) return;
		submitInFlightRef.current = true;
		setIsSubmitting(true);
		setSubmitError(null);
		try {
			const submittedAnswers = questions.map((item, index) => ({
				questionId: item.id,
				...(item.type === "match"
					? { selectedMatches: Array.isArray(answers[index]) ? answers[index] : null }
					: { selectedAnswer: Number.isInteger(answers[index]) ? (item.rawOptions ?? item.options)[answers[index]] : null }),
			}));
			const result = await submitCcnaExam(examKey, attemptId, submittedAnswers);
			if (
				!Number.isInteger(result?.score) ||
				result.score < 0 ||
				result.score > questions.length ||
				!Array.isArray(result.review) ||
				result.review.length !== questions.length
			) {
				throw new TypeError("The backend returned an invalid exam result.");
			}
			setServerResult({ score: result.score, maxScore: questions.length, review: result.review });
			setSubmittedAt(result.submittedAt ?? Date.now());
			setIsSubmitted(true);
		} catch (error) {
			console.error("Unable to submit the exam for backend grading.", error);
			setSubmitError(error instanceof Error ? error.message : "Your answers could not be submitted.");
		} finally {
			submitInFlightRef.current = false;
			setIsSubmitting(false);
		}
	}
	submitExamRef.current = submitExam;

	useEffect(() => {
		if (examLoadState.status !== "ready" || isSubmitted || isViewingSavedResult || !deadline) return undefined;

		function updateTimer() {
			const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
			setSecondsRemaining(remaining);
			if (remaining === 0) submitExamRef.current?.();
		}

		updateTimer();
		const timer = window.setInterval(updateTimer, 1000);
		return () => window.clearInterval(timer);
	}, [deadline, examLoadState.status, isSubmitted, isViewingSavedResult]);

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
		setExamLoadState({ status: "loading", error: null });
		shouldStartNewAttemptRef.current = true;
		startCcnaExam(examKey).then((newAttempt) => {
			if (newAttempt.questions.length !== exam.questionCount) {
				throw new TypeError(`The backend did not return ${exam.questionCount} questions for this exam.`);
			}
			setAttemptId(newAttempt.attemptId);
			setQuestions(newAttempt.questions);
			setAnswers({});
			setLockedQuestions({});
			setFlaggedQuestions({});
			setCurrentIndex(0);
			setDeadline(newAttempt.deadline);
			setSubmittedAt(null);
			setSecondsRemaining(Math.max(0, Math.ceil((newAttempt.deadline - Date.now()) / 1000)));
			setServerResult(null);
			setIsSubmitted(false);
			setExamAttempt((attempt) => attempt + 1);
			setAnswerFilter("all");
			setIsAnswerReviewVisible(false);
			shouldStartNewAttemptRef.current = false;
			setExamLoadState({ status: "ready", error: null });
		}).catch((error) => {
			console.error(`Unable to start a new ${exam.name} attempt.`, error);
			setExamLoadState({
				status: "error",
				error: error instanceof Error ? error.message : "A new exam attempt could not be started.",
			});
		});
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
			(index > currentIndex && !isQuestionAnswered(questions[currentIndex], answers[currentIndex]))
		) return;

		if (index > currentIndex && isQuestionAnswered(questions[currentIndex], answers[currentIndex])) {
			setLockedQuestions((previous) => ({ ...previous, [currentIndex]: true }));
		}
		setCurrentIndex(index);
	}

	if (examLoadState.status !== "ready") {
		return (
			<main className="flex min-h-screen items-center justify-center bg-[#f5f9f9] px-4 py-16 text-[#17233d] sm:px-8">
				<section className="w-full max-w-xl rounded-2xl border border-[#d6e5e7] bg-white p-8 text-center shadow-sm">
					<h1 className="text-2xl font-bold">{examLoadState.status === "loading" ? "Preparing your exam" : "Unable to load your exam"}</h1>
					<p role={examLoadState.status === "error" ? "alert" : undefined} className="mt-3 text-sm leading-6 text-[#64748b]">
						{examLoadState.status === "loading"
							? "Loading a randomized set of questions from the question database…"
							: examLoadState.error}
					</p>
					{examLoadState.status === "error" && (
						<button
							type="button"
							onClick={() => setLoadAttempt((attempt) => attempt + 1)}
							className="mt-6 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653]"
						>
							Try again
						</button>
					)}
				</section>
			</main>
		);
	}
	if (!question) return null;

	return (
		<main data-theme={isDark ? "dark" : "light"} className="ccna-page-enter min-h-screen bg-[#f5f9f9] px-4 py-6 text-[#17233d] sm:px-8 sm:py-8">
						<div className="mx-auto max-w-[1125px]">
				{submitError && !isResultView && (
					<p role="alert" className="mb-4 rounded-xl border border-[#f2c6c3] bg-white px-4 py-3 text-sm font-medium text-[#b42318]">
						{submitError} Your answers are still saved in this browser; try submitting again.
					</p>
				)}
				<header className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#d6e5e7] pb-5">
					<div className="flex min-w-0 items-center gap-4">
						<Link to="/modules/programs/ccna" aria-label="Back to CCNA course" className="group shrink-0 rounded-full bg-white/80 p-2 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 motion-reduce:transition-none">
							<div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#cfe4ea] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.12)]">
								<div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
									<img src={TrainingLogo} alt="MATEKK Cybercore Academy" className="h-10 w-auto object-contain" />
								</div>
							</div>
						</Link>
						<div className="hidden min-w-0 border-l border-[#cbd5e1] pl-4 sm:block">
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#70809a]">CCNA composite exam</p>
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
						<Link to="/modules/programs/ccna" className="ccna-dark-hover inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#c9dfe2] px-3 py-2 text-xs font-semibold text-[#005b6b] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#e8f3f4] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:gap-2 sm:px-4 sm:text-sm">
							<X size={16} /> <span>Exit exam</span>
						</Link>
					</div>
				</header>

				{!isResultView ? (
					<>
						<section aria-label="Exam progress" className="mb-5 rounded-2xl border border-[#d6e5e7] bg-white p-5 shadow-sm sm:mb-6 sm:p-8">
							<div className="flex flex-wrap items-center justify-between gap-3">
								<p className="rounded-xl bg-[#e1f5ef] px-4 py-2 text-sm font-semibold text-[#075b4a]">{exam.name}</p>
								<div
									role="timer"
									aria-label={`${formatTime(secondsRemaining)} remaining`}
									className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm tabular-nums ${secondsRemaining <= 300
										? "bg-[#fff5ee] text-[#a44b13]"
										: "bg-[#f7f9fc] text-[#526584]"
										}`}
								>
									<Clock3 size={17} /> {formatTime(secondsRemaining)}
								</div>
							</div>

							<div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
								<h1 className="text-xl font-semibold text-[#17233d] sm:text-2xl">
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
								<QuestionPrompt prompt={question.prompt} />
								{question.exhibitDiagram && <ExhibitDiagram type={question.exhibitDiagram} />}
								{question.exhibitImage && (
									<ExhibitImage src={question.exhibitImage} className="mb-6" imageClassName="max-h-[32rem]" />
								)}
								{question.exhibit && (
									<ExhibitText text={question.exhibit} className="mb-6" />
								)}
								{/* key: a fresh answer box per question, so text typed on one question never carries over */}
								<QuestionInput
									key={currentIndex}
									question={question}
									value={answers[currentIndex]}
									onChange={(value) => setAnswers((previous) => ({ ...previous, [currentIndex]: value }))}
									disabled={Boolean(lockedQuestions[currentIndex])}
								/>
								<div className="mt-6 flex justify-end gap-3">
									<button
										type="button"
										onClick={() => currentIndex === questions.length - 1 ? submitExam() : goToQuestion(currentIndex + 1)}
										disabled={isSubmitting || (currentIndex < questions.length - 1 && !isQuestionAnswered(question, answers[currentIndex]))}
										className="rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-40"
									>
										{isSubmitting ? "Submitting…" : currentIndex === questions.length - 1 ? "Submit exam" : "Next Question"}
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
									{exam.name} · CCNA
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
													</span>
													<span className={`rounded-full px-3 py-1 text-xs font-bold ${item.isCorrect ? "bg-[#e8f3f4] text-[#005b6b]" : "bg-[#fff0e8] text-[#b4532a]"
														}`}>
														{item.isCorrect ? "Correct" : "Incorrect"}
													</span>
												</div>
												<QuestionPrompt prompt={item.prompt} />
												{item.exhibitDiagram && <ExhibitDiagram type={item.exhibitDiagram} className="mt-4" />}
												{item.exhibitImage && (
													<ExhibitImage src={item.exhibitImage} lazy className="mt-4" imageClassName="max-h-[26rem]" />
												)}
												{item.exhibit && (
													<ExhibitText text={item.exhibit} className="mt-4" />
												)}
												<div className="mt-5">
													<QuestionReview question={item} value={item.selectedAnswer} />
												</div>
												{typeof item.explanation === "string" && item.explanation.trim() && (
													<p className="mt-4 rounded-xl bg-[#f5f9f9] px-4 py-3 text-sm leading-6 text-[#596983]">
														<span className="font-semibold text-[#005b6b]">Explanation: </span>{item.explanation}
													</p>
												)}
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
