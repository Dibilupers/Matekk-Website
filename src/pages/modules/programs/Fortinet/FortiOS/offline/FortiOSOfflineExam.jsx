import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowDown, ArrowLeft, ChevronRight, Clock3, RotateCcw, X } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../../../context/auth-context";
import ExplanationWithLinks from "../../../../../../components/ExplanationWithLinks";
import { isAnswerCorrect, isQuestionAnswered, isValidQuestion } from "../../../../../../utils/ccnaExamGrading";
import { ExhibitImage, ExhibitText } from "../../../Cisco/CCNA/ccnaExhibit";
import { QuestionInput, QuestionPrompt, QuestionReview } from "../../../Cisco/CCNA/ccnaExamQuestionViews";
import { createFortiOSOfflineExam, FORTIOS_OFFLINE_EXAM_FORMATS } from "./fortiosOfflineExamFormats";
import { loadCachedFortiOSQuestionBank } from "./fortiosOfflineQuestionBank";
import FortiOSQuestionExplanation from "./FortiOSQuestionExplanation";
import FORTIOS_OFFLINE_QUESTIONS from "./fortiosOfflineQuestions.json";
import { getFortiOSBundledImageUrl } from "./fortiosOfflineImages";

const FORTIOS_BUNDLED_IMAGE_URLS = new Map(FORTIOS_OFFLINE_QUESTIONS
	.map((question) => [question.id, getFortiOSBundledImageUrl(question.imagePath)])
	.filter(([, url]) => url));

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
	return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
}

function createSession(bank, examKey) {
	const exam = createFortiOSOfflineExam(bank, examKey);
	return {
		questions: exam.questions,
		answers: {},
		currentIndex: 0,
		deadline: exam.durationSeconds === null ? null : Date.now() + exam.durationSeconds * 1000,
		startedAt: Date.now(),
		isSubmitted: false,
	};
}

function getBundledFortiOSQuestionBank() {
	return FORTIOS_OFFLINE_QUESTIONS.map((item) => ({
		...item,
		id: Number(item.id),
		exhibitImage: FORTIOS_BUNDLED_IMAGE_URLS.get(Number(item.id)) || undefined,
	})).filter(isValidQuestion);
}

function attachBundledQuestionData(item) {
	const id = Number(item.id ?? item.bankId);
	const bundledQuestion = FORTIOS_OFFLINE_QUESTIONS.find((question) => Number(question.id) === id);
	return {
		...bundledQuestion,
		...item,
		id,
		explanation: bundledQuestion?.explanation || item.explanation || "",
		source: bundledQuestion?.source || item.source || "",
		exhibitImage: FORTIOS_BUNDLED_IMAGE_URLS.get(id) || item.exhibitImage,
	};
}

function isValidSession(session, examKey) {
	const format = FORTIOS_OFFLINE_EXAM_FORMATS[examKey];
	return Boolean(format && session && Array.isArray(session.questions) && session.questions.length > 0 &&
		(format.questionCount === null || session.questions.length === format.questionCount) &&
		session.questions.every(isValidQuestion) && session.answers && typeof session.answers === "object" &&
		!Array.isArray(session.answers) && Number.isInteger(session.currentIndex) &&
		session.currentIndex >= 0 && session.currentIndex < session.questions.length &&
		(format.durationSeconds === null ? session.deadline === null : Number.isFinite(session.deadline)) &&
		typeof session.isSubmitted === "boolean");
}

export default function FortiOSOfflineExam() {
	const { examKey } = useParams();
	const { profile } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const userKey = profile?.userId === null || profile?.userId === undefined ? "device" : encodeURIComponent(String(profile.userId));
	const sessionKey = `matekk-fortios-offline:${userKey}:${examKey}`;
	const [bankState, setBankState] = useState({ status: "loading", bank: [], error: null });
	const [session, setSession] = useState(null);
	const [secondsRemaining, setSecondsRemaining] = useState(0);
	const [storageError, setStorageError] = useState("");
	const [isRetakeConfirmationOpen, setIsRetakeConfirmationOpen] = useState(false);
	const answerReviewRef = useRef(null);
	const requestedRetake = location.state?.retakeExam === true;
	const examName = FORTIOS_OFFLINE_EXAM_FORMATS[examKey]?.name ?? "FortiOS Exam";
	const question = session?.questions[session.currentIndex];
	const score = useMemo(() => session?.questions.reduce(
		(total, item, index) => total + Number(isAnswerCorrect(item, session.answers[index])), 0,
	) ?? 0, [session]);
	const sessionDeadline = session?.deadline;
	const sessionIsSubmitted = session?.isSubmitted;

	useEffect(() => {
		let active = true;
		const bundledBank = getBundledFortiOSQuestionBank();
		loadCachedFortiOSQuestionBank()
			.catch(() => bundledBank)
			.then((bank) => {
				if (!active) return;
				const sourceBank = bank.length > bundledBank.length ? bank : bundledBank;
				const offlineBank = sourceBank.map(attachBundledQuestionData);
				setBankState({ status: "ready", bank: offlineBank, error: null });
				let restoredSession = null;
				try {
					const saved = window.localStorage.getItem(sessionKey);
					if (saved) {
						const parsed = JSON.parse(saved);
						if (isValidSession(parsed, examKey) && parsed.questions.every((item) => offlineBank.some((candidate) => candidate.id === Number(item.id ?? item.bankId)))) {
							const restoredQuestions = parsed.questions.map(attachBundledQuestionData);
							const seenIds = new Set(restoredQuestions.map((item) => item.id));
							const addedQuestions = examKey === "all_questions" && !parsed.isSubmitted
								? offlineBank.filter((item) => !seenIds.has(item.id))
								: [];
							restoredSession = {
								...parsed,
								questions: [...restoredQuestions, ...addedQuestions],
								startedAt: Number.isFinite(parsed.startedAt)
									? parsed.startedAt
									: parsed.deadline === null
										? Date.now()
										: parsed.deadline - FORTIOS_OFFLINE_EXAM_FORMATS[examKey].durationSeconds * 1000,
							};
						}
					}
				} catch (error) {
					console.error("Unable to restore the offline FortiOS exam session.", error);
				}
				try {
					const nextSession = restoredSession ?? createSession(offlineBank, examKey);
					setSession(nextSession);
					setSecondsRemaining(nextSession.deadline === null ? 0 : Math.max(0, Math.ceil((nextSession.deadline - Date.now()) / 1000)));
				} catch (error) {
					setBankState({ status: "error", bank, error: error instanceof Error ? error.message : "Could not start this FortiOS exam." });
				}
			});
		return () => { active = false; };
	}, [examKey, sessionKey]);

	useEffect(() => {
		if (sessionIsSubmitted || sessionDeadline === null || sessionDeadline === undefined) return undefined;
		const updateTimer = () => {
			const remaining = Math.max(0, Math.ceil((sessionDeadline - Date.now()) / 1000));
			setSecondsRemaining(remaining);
			if (remaining === 0) setSession((current) => current ? { ...current, isSubmitted: true, currentIndex: 0 } : current);
		};
		updateTimer();
		const timer = window.setInterval(updateTimer, 1000);
		return () => window.clearInterval(timer);
	}, [sessionDeadline, sessionIsSubmitted]);

	useEffect(() => {
		if (!session) return;
		try {
			window.localStorage.setItem(sessionKey, JSON.stringify(session));
			setStorageError("");
		} catch (error) {
			console.error("Unable to save offline FortiOS exam progress.", error);
			setStorageError("Progress could not be saved in this browser.");
		}
	}, [session, sessionKey]);

	useEffect(() => {
		if (!requestedRetake || !session) return;
		if (session.isSubmitted) setIsRetakeConfirmationOpen(true);
		navigate(location.pathname, { replace: true, state: null });
	}, [location.pathname, navigate, requestedRetake, session]);

	useEffect(() => {
		if (!isRetakeConfirmationOpen) return undefined;
		const closeOnEscape = (event) => {
			if (event.key === "Escape") setIsRetakeConfirmationOpen(false);
		};
		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, [isRetakeConfirmationOpen]);

	const submitExam = useCallback(() => {
		setSession((current) => current && !current.isSubmitted
			? { ...current, isSubmitted: true, currentIndex: 0 }
			: current);
	}, []);

	function restartExam() {
		try {
			const nextSession = createSession(bankState.bank, examKey);
			setSession(nextSession);
			setSecondsRemaining(nextSession.deadline === null ? 0 : Math.ceil((nextSession.deadline - Date.now()) / 1000));
		} catch (error) {
			setBankState((current) => ({ ...current, error: error instanceof Error ? error.message : "Could not restart this exam." }));
		}
	}

	if (!FORTIOS_OFFLINE_EXAM_FORMATS[examKey]) {
		return <OfflineExamMessage title="Exam format not found" message="Choose a FortiOS exam from the program dashboard." />;
	}
	if (bankState.status === "loading" || !session) {
		return <OfflineExamMessage title={bankState.status === "error" ? "FortiOS offline exam unavailable" : "Preparing your offline FortiOS exam"} message={bankState.error ?? "Loading questions saved on this device…"} isLoading={bankState.status !== "error"} />;
	}

	const answeredCount = session.questions.reduce((total, item, index) => total + Number(isQuestionAnswered(item, session.answers[index])), 0);
	const percentage = session.questions.length ? Math.round((score / session.questions.length) * 100) : 0;
	const examPassed = percentage >= 80;
	const progressColor = examPassed ? "#159b73" : "#c47a1a";
	const elapsedSeconds = session.deadline === null
		? Math.max(0, Math.floor((Date.now() - session.startedAt) / 1000))
		: Math.max(0, FORTIOS_OFFLINE_EXAM_FORMATS[examKey].durationSeconds - secondsRemaining);

	return (
		<main data-theme="light" className="fortinet-exam-page min-h-screen bg-[#fff8f7] px-4 py-6 text-[#17233d] sm:px-8 sm:py-8">
			<div className="mx-auto max-w-5xl">
				<Link to="/modules/programs/fortinet-fortios" className="inline-flex items-center gap-2 rounded-full border border-[#f1beba] bg-white px-5 py-3 font-semibold text-[#e2231a] transition hover:bg-[#fff0ef]">
					<ArrowLeft size={18} /> Back to FortiOS
				</Link>
				<header className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#f1d3d0] bg-white p-5 shadow-sm sm:p-7">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#e2231a]">Offline FortiOS</p>
						<h1 className="mt-1 text-2xl font-bold sm:text-3xl">{session.isSubmitted ? "Exam results" : examName}</h1>
						<p className="mt-1 text-sm text-[#71809b]">{session.isSubmitted ? `${score} of ${session.questions.length} correct · ${percentage}%` : `Question ${session.currentIndex + 1} of ${session.questions.length} · ${answeredCount} answered`}</p>
					</div>
					{session.deadline !== null && !session.isSubmitted && (
						<div className="flex items-center gap-2 rounded-full bg-[#fff0ef] px-4 py-2 font-semibold text-[#c51f19]" role="timer" aria-label="Time remaining">
							<Clock3 size={18} /> {formatTime(secondsRemaining)}
						</div>
					)}
				</header>

				{session.isSubmitted && (
					<section className="fade-in-up mt-5 grid items-center gap-8 rounded-[24px] border border-[#f1d3d0] bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10 lg:grid-cols-[1fr_0.8fr] lg:px-14 lg:py-14">
						<div>
							<p className="inline-flex items-center gap-2 rounded-full bg-[#fff0ef] px-3 py-1.5 text-xs font-bold tracking-wide text-[#e2231a]">
								<span className="h-2 w-2 rounded-full bg-[#e2231a]" />
								{examName} · FortiOS
							</p>
							<h2 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#17233d] sm:text-5xl">
								{examPassed ? (
									<>Great work, <span className="text-[#e2231a]">keep it up.</span></>
								) : (
									<>Not there yet, <span className="text-[#e2231a]">keep going.</span></>
								)}
							</h2>
							<p className="mt-4 max-w-xl leading-7 text-[#64748b]">
								You got {score} of {session.questions.length} questions correct.
								{examPassed ? " You passed this exam." : " Review your answers below and aim for 80% to pass."}
							</p>
							<div className="mt-7 flex flex-wrap gap-3">
								<button
									type="button"
									onClick={() => setIsRetakeConfirmationOpen(true)}
									className="inline-flex items-center gap-2 rounded-full bg-[#e2231a] px-6 py-3 font-semibold text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-[#bd2119] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100"
								>
									<RotateCcw size={16} /> Retake Exam
								</button>
								<button
									type="button"
									onClick={() => answerReviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
									className="inline-flex items-center gap-2 rounded-full border border-[#f1beba] px-6 py-3 font-semibold text-[#e2231a] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#fff0ef] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100"
								>
									Review Answers <ArrowDown size={16} />
								</button>
							</div>
							<div className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-[#f1d3d0]">
								<div className="pr-4">
									<strong className="block text-3xl font-extrabold tabular-nums text-[#17233d]">{score}</strong>
									<span className="text-xs leading-4 text-[#71819b]">Your score<br />out of {session.questions.length}</span>
								</div>
								<div className="px-4">
									<strong className="block text-3xl font-extrabold text-[#17233d]">{session.questions.length}</strong>
									<span className="text-xs leading-4 text-[#71819b]">Total<br />questions</span>
								</div>
								<div className="pl-4">
									<strong className="block text-xl font-extrabold text-[#17233d]">{formatTime(elapsedSeconds)}</strong>
									<span className="text-xs leading-4 text-[#71819b]">Time<br />elapsed</span>
								</div>
							</div>
						</div>
						<div className="flex justify-center py-3">
							<div
								role="img"
								aria-label={`${percentage}% correct answers; 80% required to pass`}
								className="relative flex h-64 w-64 items-center justify-center rounded-full bg-[#fff0ef] sm:h-72 sm:w-72"
							>
								<div className="absolute inset-[13px] rounded-full bg-[#fff8f7]" />
								<svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
									<circle cx="50" cy="50" r="46" fill="none" stroke="#f5d9d6" strokeWidth="4.5" />
									<circle
										cx="50"
										cy="50"
										r="46"
										fill="none"
										stroke={progressColor}
										strokeWidth="4.5"
										strokeDasharray={`${2 * Math.PI * 46}`}
										strokeDashoffset={`${2 * Math.PI * 46 * (1 - percentage / 100)}`}
									/>
								</svg>
								<div className="absolute inset-[28px] rounded-full border-[12px] border-white" />
								<div className="relative z-10 text-center">
									<strong className="block text-5xl font-extrabold tracking-tight tabular-nums" style={{ color: progressColor }}>{percentage}%</strong>
									<span className="mt-1 block text-sm font-semibold text-[#64748b]">correct answers</span>
								</div>
								<div className="absolute -left-9 top-[30%] rounded-xl border border-[#f1d3d0] bg-white px-4 py-3 shadow-lg transition-transform duration-200 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100">
									<strong className="block text-2xl font-extrabold text-[#e2231a]">80%</strong>
									<span className="text-xs font-medium text-[#71819b]">Passing score</span>
								</div>
							</div>
						</div>
					</section>
				)}

				{!session.isSubmitted ? (
					<section className="mt-5 rounded-2xl border border-[#f1d3d0] bg-white p-5 shadow-sm sm:p-8">
						<>
							{question.exhibitImage && <ExhibitImage src={question.exhibitImage} className="mb-5" imageClassName="max-h-[32rem]" />}
							{question.exhibit && <ExhibitText text={question.exhibit} className="mb-5" />}
							<QuestionPrompt prompt={question.prompt} hasSeparateExhibit={Boolean(question.exhibit || question.exhibitImage)} offline fortiosOffline />
							<QuestionInput
								key={session.currentIndex}
								question={question}
								value={session.answers[session.currentIndex]}
								onChange={(value) => setSession((current) => ({ ...current, answers: { ...current.answers, [current.currentIndex]: value } }))}
								fortiosOffline
							/>
							<div className="mt-7 flex justify-end">
								{session.currentIndex === session.questions.length - 1 ? (
									<button type="button" onClick={submitExam} className="inline-flex items-center gap-2 rounded-full bg-[#e2231a] px-6 py-3 font-semibold text-white transition hover:bg-[#bd2119]">Finish exam</button>
								) : (
									<button
										type="button"
										disabled={!isQuestionAnswered(question, session.answers[session.currentIndex])}
										onClick={() => setSession((current) => ({ ...current, currentIndex: current.currentIndex + 1 }))}
										className="inline-flex items-center gap-2 rounded-full bg-[#e2231a] px-6 py-3 font-semibold text-white transition hover:bg-[#bd2119] disabled:cursor-not-allowed disabled:opacity-40"
									>Next question <ChevronRight size={18} /></button>
								)}
							</div>
						</>
					</section>
				) : (
					<section ref={answerReviewRef} className="mt-5 scroll-mt-6 rounded-2xl border border-[#f1d3d0] bg-white p-5 shadow-sm sm:p-8">
						<h2 className="mb-5 text-2xl font-bold text-[#17233d]">Review your answers</h2>
							<h2 className="text-xl font-bold">Question {session.currentIndex + 1}</h2>
							{question.exhibitImage && <ExhibitImage src={question.exhibitImage} className="my-5" imageClassName="max-h-[32rem]" />}
							{question.exhibit && <ExhibitText text={question.exhibit} className="my-5" />}
							<QuestionPrompt prompt={question.prompt} hasSeparateExhibit={Boolean(question.exhibit || question.exhibitImage)} offline fortiosOffline />
							<QuestionReview question={question} value={session.answers[session.currentIndex]} fortiosOffline />
							<FortiOSQuestionExplanation question={question} />
						<div className="mt-7 flex flex-wrap justify-between gap-3">
							{session.currentIndex > 0 && (
								<button type="button" onClick={() => setSession((current) => ({ ...current, currentIndex: current.currentIndex - 1 }))} className="inline-flex items-center gap-2 rounded-full border border-[#f1beba] px-5 py-3 font-semibold text-[#e2231a] transition hover:bg-[#fff0ef]">
									<ArrowLeft size={17} /> Previous review
								</button>
							)}
							{session.currentIndex < session.questions.length - 1 && (
								<button type="button" onClick={() => setSession((current) => ({ ...current, currentIndex: current.currentIndex + 1 }))} className="inline-flex items-center gap-2 rounded-full bg-[#e2231a] px-6 py-3 font-semibold text-white transition hover:bg-[#bd2119]">
									Next review <ChevronRight size={18} />
								</button>
							)}
						</div>
					</section>
				)}
					{storageError && <p className="mt-4 text-sm text-amber-700" role="status">{storageError}</p>}
			</div>
			{isRetakeConfirmationOpen && createPortal(
				<div data-theme="light" className="fortinet-exam-dialog fixed inset-0 z-[120] grid place-items-center bg-[#071126]/60 p-4 backdrop-blur-sm">
					<section
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="fortios-offline-retake-title"
						aria-describedby="fortios-offline-retake-description"
						className="w-full max-w-md rounded-2xl border border-[#f1d3d0] bg-white p-5 text-[#17233d] shadow-2xl sm:p-8"
					>
						<div className="flex items-start justify-between gap-4">
							<p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e2231a]">New exam attempt</p>
							<button type="button" onClick={() => setIsRetakeConfirmationOpen(false)} aria-label="Close retake confirmation" className="rounded-full p-1 text-[#7c89a1] transition hover:bg-[#fff0ef] hover:text-[#e2231a]">
								<X size={18} />
							</button>
						</div>
						<h2 id="fortios-offline-retake-title" className="mt-2 text-xl font-bold sm:text-2xl">
							Are you sure you want to retake the {examName.toLowerCase()}?
						</h2>
						<p id="fortios-offline-retake-description" className="mt-3 text-sm leading-6 text-[#64748b]">
							A new attempt will start with a fresh set of randomly selected questions. Your current result will be replaced by the new attempt.
						</p>
						<div className="mt-6 flex flex-wrap justify-end gap-3">
							<button type="button" onClick={() => setIsRetakeConfirmationOpen(false)} className="rounded-full border border-[#f1d3d0] px-5 py-2.5 text-sm font-semibold text-[#42516b] transition hover:bg-[#fff8f7]">
								Cancel
							</button>
							<button
								type="button"
								onClick={() => {
									setIsRetakeConfirmationOpen(false);
									restartExam();
								}}
								className="rounded-full bg-[#e2231a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#bd2119]"
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

function OfflineExamMessage({ title, message, isLoading = false }) {
	return (
		<main className="flex min-h-screen items-center justify-center bg-[#fff8f7] px-4 py-16 text-[#17233d]">
			<section className="w-full max-w-xl rounded-2xl border border-[#f1d3d0] bg-white p-8 text-center shadow-sm">
				<p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#e2231a]">Offline FortiOS</p>
				<h1 className="mt-2 text-2xl font-bold text-[#e2231a]">{title}</h1>
				<p className="mt-3 text-sm leading-6 text-[#64748b]" role={isLoading ? "status" : "alert"}>{message}</p>
				<Link to="/modules/programs/fortinet-fortios" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#e2231a] transition hover:text-[#bd2119]"><ArrowLeft size={17} /> Back to FortiOS</Link>
			</section>
		</main>
	);
}
