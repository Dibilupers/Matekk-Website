import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, Moon, RotateCcw, Sun, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../../context/auth-context";
import TrainingLogo from "../../../../../assets/MATEKK_training_logo.png";
import { isAnswerCorrect, isQuestionAnswered } from "../../../../../utils/ccnaExamGrading";
import { isCcnaQuestionModule } from "../../../../../utils/ccnaQuestionModule";
import { loadCcnaAllQuestionsBank } from "../../../../../utils/ccnaQuestionBankApi";
import { ExhibitDiagram, ExhibitImage, ExhibitText } from "./ccnaExhibit";
import { QuestionInput, QuestionPrompt, QuestionReview } from "./ccnaExamQuestionViews";
import { applyNativeExhibit } from "./ccnaCompositeSetQuestions";
import { getOfflineLegacyQuestionBank } from "./ccnaOfflineExamQuestions";

function isValidSavedAnswer(question, answer) {
	if (["match", "drag_drop", "click_boxes", "image"].includes(question.type)) {
		const validMatchingAnswer = Array.isArray(answer) &&
			answer.length === question.items.length &&
			answer.every((index) => Number.isInteger(index) && index >= 0 && index < question.choices.length);
		return validMatchingAnswer &&
			(question.type !== "click_boxes" ||
				(question.items.length === question.choices.length && new Set(answer).size === answer.length));
	}
	if (question.type === "multi") {
		return Array.isArray(answer) &&
			answer.length === question.answer.length &&
			answer.every((index) => Number.isInteger(index) && index >= 0 && index < question.options.length);
	}
	return Number.isInteger(answer) && answer >= 0 && answer < question.options.length;
}

export default function CCNAAllQuestionsExam() {
	const { profile, isOnline } = useAuth();
	const storageKey = profile?.userId === null || profile?.userId === undefined
		? null
		: `matekk-ccna-all-questions:${encodeURIComponent(String(profile.userId))}`;
	const [loadState, setLoadState] = useState({ status: "loading", error: null });
	const [loadAttempt, setLoadAttempt] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const [furthestOpenedIndex, setFurthestOpenedIndex] = useState(0);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const [score, setScore] = useState(0);
	const [storageError, setStorageError] = useState(null);
	const [skippedQuestionCount, setSkippedQuestionCount] = useState(0);
	const [questionNumberInput, setQuestionNumberInput] = useState("1");
	const [isRetakeConfirmationOpen, setIsRetakeConfirmationOpen] = useState(false);
	// Results page: show only correct / incorrect / unanswered questions when stepping through the review
	const [reviewFilter, setReviewFilter] = useState("all");
	const questionCardRef = useRef(null);
	const question = questions[currentIndex];
	const answeredCount = useMemo(
		() => questions.reduce((count, item, index) => count + Number(isQuestionAnswered(item, answers[index])), 0),
		[answers, questions],
	);
	const percentage = questions.length ? Math.round((score / questions.length) * 100) : 0;
	const reviewStatuses = useMemo(
		() => (isSubmitted
			? questions.map((item, index) => (isAnswerCorrect(item, answers[index])
				? "correct"
				: isQuestionAnswered(item, answers[index]) ? "incorrect" : "unanswered"))
			: []),
		[answers, isSubmitted, questions],
	);
	const reviewCounts = useMemo(() => reviewStatuses.reduce(
		(counts, status) => ({ ...counts, [status]: counts[status] + 1 }),
		{ all: reviewStatuses.length, correct: 0, incorrect: 0, unanswered: 0 },
	), [reviewStatuses]);
	const matchesReviewFilter = (index) => reviewFilter === "all" || reviewStatuses[index] === reviewFilter;
	// The nearest question before / after the current one that fits the chosen filter (-1 if none)
	const findReviewIndex = (from, step) => {
		for (let index = from + step; index >= 0 && index < questions.length; index += step) {
			if (matchesReviewFilter(index)) return index;
		}
		return -1;
	};
	const previousReviewIndex = isSubmitted ? findReviewIndex(currentIndex, -1) : -1;
	const nextReviewIndex = isSubmitted ? findReviewIndex(currentIndex, 1) : -1;

	useEffect(() => {
		let isActive = true;
		setLoadState({ status: "loading", error: null });
		const bankRequest = isOnline
			? loadCcnaAllQuestionsBank()
			: Promise.resolve({
				questions: getOfflineLegacyQuestionBank(),
				skippedCount: 0,
			});
		bankRequest
			.then(({ questions: validQuestions, skippedCount }) => {
				const orderedQuestions = [...validQuestions]
					.filter((item) => !isOnline || isCcnaQuestionModule(item.module))
					.map(applyNativeExhibit)
					.sort((left, right) => left.bankId - right.bankId);
				if (!orderedQuestions.length) {
					throw new TypeError("The Questions table has no questions that can be rendered and graded.");
				}
				if (!isActive) return;

				setSkippedQuestionCount(skippedCount);
				setQuestions(orderedQuestions);
				if (storageKey) {
					try {
						const saved = window.localStorage.getItem(storageKey);
						if (saved) {
							const parsed = JSON.parse(saved);
							const matchesBank = parsed?.version === 1 &&
								Array.isArray(parsed.questionIds) &&
								parsed.questionIds.length === orderedQuestions.length &&
								parsed.questionIds.every((id, index) => id === orderedQuestions[index].bankId);
							if (matchesBank) {
								const restoredAnswers = {};
								if (parsed.answers && typeof parsed.answers === "object" && !Array.isArray(parsed.answers)) {
									for (const [indexText, answer] of Object.entries(parsed.answers)) {
										const index = Number(indexText);
										if (Number.isInteger(index) && orderedQuestions[index] && isValidSavedAnswer(orderedQuestions[index], answer)) {
											restoredAnswers[index] = answer;
										}
									}
								}
								setAnswers(restoredAnswers);
								const restoredIndex = Number.isInteger(parsed.currentIndex)
									? Math.max(0, Math.min(parsed.currentIndex, orderedQuestions.length - 1))
									: 0;
								const restoredFurthestIndex = Number.isInteger(parsed.furthestOpenedIndex)
									? Math.max(restoredIndex, Math.min(parsed.furthestOpenedIndex, orderedQuestions.length - 1))
									: restoredIndex;
								setCurrentIndex(restoredIndex);
								setFurthestOpenedIndex(restoredFurthestIndex);
								if (parsed.isSubmitted === true) {
									setIsSubmitted(true);
									setScore(orderedQuestions.reduce(
										(total, item, index) => total + Number(isAnswerCorrect(item, restoredAnswers[index])),
										0,
									));
								}
							} else {
								window.localStorage.removeItem(storageKey);
							}
						}
					} catch (error) {
						console.error("Unable to restore all-questions exam progress.", error);
						setStorageError("Saved progress could not be restored. You can still continue this exam.");
					}
				}
				setLoadState({ status: "ready", error: null });
			})
			.catch((error) => {
				console.error("Unable to load the full CCNA question bank.", error);
				if (isActive) setLoadState({
					status: "error",
					error: error instanceof Error ? error.message : "The online question bank could not be loaded.",
				});
			});
		return () => {
			isActive = false;
		};
	}, [isOnline, loadAttempt, storageKey]);

	useEffect(() => {
		if (loadState.status !== "ready" || !storageKey || questions.length === 0) return;
		try {
			window.localStorage.setItem(storageKey, JSON.stringify({
				version: 1,
				questionIds: questions.map((item) => item.bankId),
				answers,
				currentIndex,
				furthestOpenedIndex,
				isSubmitted,
			}));
			setStorageError(null);
		} catch (error) {
			console.error("Unable to save all-questions exam progress.", error);
			setStorageError("Your latest progress could not be saved in this browser.");
		}
	}, [answers, currentIndex, furthestOpenedIndex, isSubmitted, loadState.status, questions, storageKey]);

	useEffect(() => {
		setQuestionNumberInput(String(currentIndex + 1));
	}, [currentIndex]);

	useEffect(() => {
		if (!question) return;
		const animationFrame = window.requestAnimationFrame(() => {
			const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			questionCardRef.current?.scrollIntoView({
				behavior: reduceMotion ? "auto" : "smooth",
				block: "start",
			});
		});
		return () => window.cancelAnimationFrame(animationFrame);
	}, [currentIndex, isSubmitted, question]);

	function goToQuestion(index) {
		if (!Number.isInteger(index) || index < 0 || index >= questions.length) return;
		if (!isSubmitted) {
			if (index > currentIndex && !isQuestionAnswered(question, answers[currentIndex])) return;
			if (index > furthestOpenedIndex + 1) return;
			setFurthestOpenedIndex((furthest) => Math.max(furthest, index));
		}
		setCurrentIndex(index);
	}

	function jumpToQuestion(event) {
		event.preventDefault();
		const questionNumber = Number(questionNumberInput);
		const lastAllowed = isSubmitted ? questions.length : furthestOpenedIndex + 1;
		if (Number.isInteger(questionNumber) && questionNumber >= 1 && questionNumber <= lastAllowed) {
			goToQuestion(questionNumber - 1);
		} else {
			setQuestionNumberInput(String(currentIndex + 1));
		}
	}

	function chooseReviewFilter(filter) {
		setReviewFilter(filter);
		if (filter === "all" || reviewStatuses[currentIndex] === filter) return;
		const first = reviewStatuses.findIndex((status) => status === filter);
		if (first >= 0) goToQuestion(first);
	}

	function submitExam() {
		const finalScore = questions.reduce(
			(total, item, index) => total + Number(isAnswerCorrect(item, answers[index])),
			0,
		);
		setScore(finalScore);
		setIsSubmitted(true);
		goToQuestion(0);
	}

	function restartExam() {
		setAnswers({});
		setCurrentIndex(0);
		setFurthestOpenedIndex(0);
		setIsSubmitted(false);
		setScore(0);
		setReviewFilter("all");
		setQuestionNumberInput("1");
		setIsRetakeConfirmationOpen(false);
	}

	if (loadState.status !== "ready") {
		return (
			<main className="flex min-h-screen items-center justify-center bg-[#f5f9f9] px-4 py-16 text-[#17233d] sm:px-8">
				<section className="w-full max-w-xl rounded-2xl border border-[#d6e5e7] bg-white p-8 text-center shadow-sm">
					<h1 className="text-2xl font-bold">
						{loadState.status === "loading" ? "Loading the full question bank" : "Unable to load the question bank"}
					</h1>
					<p role={loadState.status === "error" ? "alert" : undefined} className="mt-3 text-sm leading-6 text-[#64748b]">
						{loadState.status === "loading"
							? "Preparing every usable question in database order. This may take a moment."
							: loadState.error}
					</p>
					{loadState.status === "error" && (
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
				<header className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#d6e5e7] pb-5">
					<div className="flex min-w-0 items-center gap-4">
						<Link to="/modules/programs/ccna" aria-label="Back to CCNA course" className="ccna-training-logo shrink-0 rounded-lg bg-white px-3 py-2 shadow-sm">
							<img src={TrainingLogo} alt="MATEKK Cybercore Academy" className="h-auto w-32 sm:w-36" />
						</Link>
						<div className="min-w-0 border-l border-[#cbd5e1] pl-4">
							<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#70809a]">CCNA practice</p>
							<p className="mt-1 truncate text-sm font-bold text-[#17233d]">All Questions Exam · Online Question Bank</p>
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
						<Link to="/modules/programs/ccna" className="ccna-dark-hover inline-flex shrink-0 items-center gap-2 rounded-full border border-[#c9dfe2] bg-white px-3 py-2 text-xs font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4] sm:px-4 sm:text-sm">
							<X size={16} /> Exit exam
						</Link>
					</div>
				</header>

				{storageError && (
					<p role="status" className="mb-4 rounded-xl border border-[#f0d79e] bg-[#fffaf0] px-4 py-3 text-sm text-[#805b12]">
						{storageError}
					</p>
				)}
				{skippedQuestionCount > 0 && (
					<p role="status" className="mb-4 rounded-xl border border-[#f0d79e] bg-[#fffaf0] px-4 py-3 text-sm text-[#805b12]">
						{skippedQuestionCount.toLocaleString()} invalid or unsupported database question{skippedQuestionCount === 1 ? " was" : "s were"} skipped.
					</p>
				)}

				{!isSubmitted ? (
					<>
						<section aria-label="Exam progress" className="mb-5 rounded-2xl border border-[#d6e5e7] bg-white p-5 shadow-sm sm:mb-6 sm:p-8">
							<div className="flex flex-wrap items-center justify-between gap-3">
								<div className="flex flex-wrap items-center gap-2">
									<p className="inline-flex items-center gap-2 rounded-xl bg-[#e8f3f4] px-4 py-2 text-sm font-semibold text-[#005b6b]">
										<BookOpen size={16} /> Untimed · Database order
									</p>
									<span className="shrink-0 rounded-full border border-[#c9dfe2] bg-white px-3 py-2 text-xs font-semibold text-[#005b6b] sm:px-4 sm:text-sm">
										No time limit
									</span>
								</div>
								<span className="rounded-xl bg-[#f8fafb] px-3 py-2 text-sm text-[#526584]">
									{answeredCount.toLocaleString()} of {questions.length.toLocaleString()} answered
								</span>
							</div>
							<div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
								<h1 className="text-xl font-semibold text-[#17233d] sm:text-2xl">
									Question {currentIndex + 1} <span className="text-base font-normal text-[#64748b] sm:text-lg">of {questions.length.toLocaleString()}</span>
								</h1>
								<form onSubmit={jumpToQuestion} className="flex items-center gap-2 text-sm text-[#64748b]">
									<label htmlFor="ccna-all-question-number">Go to</label>
									<input
										id="ccna-all-question-number"
										type="number"
										min="1"
										max={Math.min(questions.length, furthestOpenedIndex + 1)}
										value={questionNumberInput}
										onChange={(event) => setQuestionNumberInput(event.target.value)}
										className="w-24 rounded-lg border border-[#c9dfe2] bg-white px-3 py-2 text-[#17233d]"
									/>
									<button type="submit" className="rounded-lg bg-[#e8f3f4] px-3 py-2 font-semibold text-[#005b6b] hover:bg-[#d8ebed]">
										Go
									</button>
								</form>
							</div>
							<p className="mt-2 text-sm text-[#64748b]">
								Answer each question to unlock the next one. You can return to any question you’ve already opened.
							</p>
							<div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e7e7e7]">
								<div className="h-full rounded-full bg-[#159b73] transition-[width]" style={{ width: `${questions.length ? (answeredCount / questions.length) * 100 : 0}%` }} />
							</div>
						</section>

						<section key={`question-${currentIndex}`} ref={questionCardRef} className="ccna-question-transition scroll-mt-4 rounded-[20px] border border-[#d6e5e7] bg-white p-4 shadow-sm sm:p-7">
							{!question.hidePrompt && (
								<QuestionPrompt
									prompt={question.prompt}
									hasSeparateExhibit={Boolean(question.exhibit || question.exhibitImage || question.exhibitDiagram)}
								/>
							)}
							{question.exhibitDiagram && <ExhibitDiagram type={question.exhibitDiagram} className="mb-6" />}
							{question.exhibitImage && !question.hideExhibitImage && <ExhibitImage src={question.exhibitImage} className="mb-6" imageClassName="max-h-[32rem]" cropTop={question.exhibitImageCropTop} />}
							{question.exhibit && <ExhibitText text={question.exhibit} className="mb-6" />}
							{question.exhibitUnavailable && !question.exhibit && !question.exhibitImage && !question.exhibitDiagram && (
								<p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
									The source question refers to an exhibit that is not available.
								</p>
							)}
							<QuestionInput
								key={currentIndex}
								question={question}
								value={answers[currentIndex]}
								onChange={(value) => setAnswers((previous) => ({ ...previous, [currentIndex]: value }))}
							/>
							<div className={`mt-7 flex flex-wrap gap-3 ${isOnline ? "justify-between" : "justify-end"}`}>
								{isOnline && (
									<button
										type="button"
										onClick={() => goToQuestion(currentIndex - 1)}
										disabled={currentIndex === 0}
										className="inline-flex items-center gap-2 rounded-full border border-[#9fc8ce] px-5 py-3 font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-not-allowed disabled:opacity-40"
									>
										<ChevronLeft size={18} /> Previous
									</button>
								)}
								{currentIndex === questions.length - 1 ? (
									<button type="button" onClick={submitExam} className="rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653]">
										Finish and review
									</button>
								) : (
									<button
										type="button"
										onClick={() => goToQuestion(currentIndex + 1)}
										disabled={!isQuestionAnswered(question, answers[currentIndex])}
										className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-40"
									>
										Next <ChevronRight size={18} />
									</button>
								)}
							</div>
							{currentIndex < questions.length - 1 && (
								<button type="button" onClick={submitExam} className="mt-5 text-sm font-semibold text-[#71819b] underline decoration-[#c9dfe2] underline-offset-4 transition hover:text-[#005b6b]">
									Finish exam and see score
								</button>
							)}
						</section>
					</>
				) : (
					<>
						<section className="mb-6 flex flex-wrap items-end justify-between gap-5 rounded-[24px] border border-[#d6e5e7] bg-white px-6 py-8 shadow-sm sm:px-10">
							<div>
								<p className="inline-flex items-center gap-2 rounded-full bg-[#e8f3f4] px-3 py-1.5 text-xs font-bold tracking-wide text-[#005b6b]">
									<CheckCircle2 size={15} /> Exam complete
								</p>
								<h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#17233d] sm:text-4xl">Your score</h1>
								<p className="mt-3 text-lg font-semibold text-[#005b6b]">
									{score.toLocaleString()} / {questions.length.toLocaleString()} · {percentage}%
								</p>
								<p className="mt-2 text-sm text-[#64748b]">
									{answeredCount.toLocaleString()} answered · {questions.length - answeredCount} unanswered. Browse the numbered questions below to review your answers.
								</p>
							</div>
							<button
								type="button"
								onClick={() => setIsRetakeConfirmationOpen(true)}
								className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653]"
							>
								<RotateCcw size={16} /> Retake exam
							</button>
						</section>
						<section aria-label="Find a question" className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d6e5e7] bg-white p-4 shadow-sm sm:p-5">
							<div role="group" aria-label="Show questions" className="flex flex-wrap gap-2">
								{[
									["all", "All"],
									["incorrect", "Incorrect"],
									["unanswered", "Unanswered"],
									["correct", "Correct"],
								].map(([filter, label]) => (
									<button
										key={filter}
										type="button"
										onClick={() => chooseReviewFilter(filter)}
										disabled={reviewCounts[filter] === 0}
										aria-pressed={reviewFilter === filter}
										className={`rounded-full border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${reviewFilter === filter ? "border-[#005b6b] bg-[#005b6b] text-white" : "border-[#c9dfe2] bg-white text-[#005b6b] hover:bg-[#e8f3f4]"}`}
									>
										{label} <span className="tabular-nums opacity-80">({reviewCounts[filter].toLocaleString()})</span>
									</button>
								))}
							</div>
							<form onSubmit={jumpToQuestion} className="flex items-center gap-2 text-sm text-[#64748b]">
								<label htmlFor="ccna-all-review-number">Go to</label>
								<input
									id="ccna-all-review-number"
									type="number"
									min="1"
									max={questions.length}
									value={questionNumberInput}
									onChange={(event) => setQuestionNumberInput(event.target.value)}
									className="w-24 rounded-lg border border-[#c9dfe2] bg-white px-3 py-2 text-[#17233d]"
								/>
								<button type="submit" className="rounded-lg bg-[#e8f3f4] px-3 py-2 font-semibold text-[#005b6b] hover:bg-[#d8ebed]">
									Go
								</button>
							</form>
						</section>
						<section key={`review-${currentIndex}`} ref={questionCardRef} className="ccna-question-transition scroll-mt-4 rounded-[20px] border border-[#d6e5e7] bg-white p-4 shadow-sm sm:p-7">
							<div className="flex flex-wrap items-center justify-between gap-3">
								<h2 className="text-lg font-bold text-[#17233d]">
									Question {currentIndex + 1} of {questions.length.toLocaleString()}
								</h2>
								<span className={`rounded-full px-3 py-1 text-xs font-bold ${isAnswerCorrect(question, answers[currentIndex]) ? "bg-[#e8f3f4] text-[#005b6b]" : "bg-[#fff0e8] text-[#b4532a]"}`}>
									{isAnswerCorrect(question, answers[currentIndex]) ? "Correct" : isQuestionAnswered(question, answers[currentIndex]) ? "Incorrect" : "Unanswered"}
								</span>
							</div>
							{!question.hidePrompt && (
								<QuestionPrompt
									prompt={question.prompt}
									hasSeparateExhibit={Boolean(question.exhibit || question.exhibitImage || question.exhibitDiagram)}
								/>
							)}
							{question.exhibitDiagram && <ExhibitDiagram type={question.exhibitDiagram} className="mt-4" />}
							{question.exhibitImage && !question.hideExhibitImage && <ExhibitImage src={question.exhibitImage} className="mb-6" imageClassName="max-h-[32rem]" cropTop={question.exhibitImageCropTop} />}
							{question.exhibit && <ExhibitText text={question.exhibit} className="mb-6" />}
							<QuestionReview question={question} value={answers[currentIndex]} />
							{question.explanation && <p className="mt-5 rounded-xl bg-[#f5f9f9] px-4 py-3 text-sm leading-6 text-[#596983]"><strong className="text-[#005b6b]">Explanation: </strong>{question.explanation}</p>}
							<div className={`mt-7 flex flex-wrap gap-3 ${isOnline ? "justify-between" : "justify-end"}`}>
								{isOnline && (
									<button
										type="button"
										onClick={() => goToQuestion(previousReviewIndex)}
										disabled={previousReviewIndex < 0}
										className="inline-flex items-center gap-2 rounded-full border border-[#9fc8ce] px-5 py-3 font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-not-allowed disabled:opacity-40"
									>
										<ChevronLeft size={18} /> Previous
									</button>
								)}
								<button
									type="button"
									onClick={() => goToQuestion(nextReviewIndex)}
									disabled={nextReviewIndex < 0}
									className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-6 py-3 font-semibold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-40"
								>
									Next <ChevronRight size={18} />
								</button>
							</div>
						</section>
					</>
				)}
			</div>
			{isRetakeConfirmationOpen && createPortal(
				<div data-theme="light" className="fixed inset-0 z-[120] grid place-items-center bg-[#071126]/60 p-4 backdrop-blur-sm">
					<section
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="ccna-all-retake-title"
						aria-describedby="ccna-all-retake-description"
						className="w-full max-w-md rounded-2xl border border-[#d6e5e7] bg-white p-5 text-[#17233d] shadow-2xl sm:p-8"
					>
						<p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#005b6b]">New exam attempt</p>
						<h2 id="ccna-all-retake-title" className="mt-2 text-xl font-bold sm:text-2xl">
							Are you sure you want to retake the all-questions exam?
						</h2>
						<p id="ccna-all-retake-description" className="mt-3 text-sm leading-6 text-[#64748b]">
							This will clear your answers and review state and restart from question 1.
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
								onClick={restartExam}
								className="rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653]"
							>
								Yes, retake exam
							</button>
						</div>
					</section>
				</div>,
				document.body,
			)}
		</main>
	);
}
