import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronRight, Clock3, RotateCcw } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../../../../context/auth-context";
import { isAnswerCorrect, isQuestionAnswered, isValidQuestion } from "../../../../../../utils/ccnaExamGrading";
import { ExhibitImage, ExhibitText } from "../../../Cisco/CCNA/ccnaExhibit";
import { QuestionInput, QuestionPrompt, QuestionReview } from "../../../Cisco/CCNA/ccnaExamQuestionViews";
import { createFortiOSOfflineExam, FORTIOS_OFFLINE_EXAM_FORMATS } from "./fortiosOfflineExamFormats";
import { loadCachedFortiOSQuestionBank } from "./fortiosOfflineQuestionBank";
import FORTIOS_OFFLINE_QUESTIONS from "./fortiosOfflineQuestions.json";
import { getFortiOSBundledImageUrl } from "./fortiosOfflineImages";

const FORTIOS_BUNDLED_IMAGE_URLS = new Map(FORTIOS_OFFLINE_QUESTIONS
	.map((question) => [question.id, getFortiOSBundledImageUrl(question.imagePath)])
	.filter(([, url]) => url));

function shuffle(items) {
	const shuffled = [...items];
	for (let index = shuffled.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(Math.random() * (index + 1));
		[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
	}
	return shuffled;
}

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
		isSubmitted: false,
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
	const userKey = profile?.userId === null || profile?.userId === undefined ? "device" : encodeURIComponent(String(profile.userId));
	const sessionKey = `matekk-fortios-offline:${userKey}:${examKey}`;
	const [bankState, setBankState] = useState({ status: "loading", bank: [], error: null });
	const [session, setSession] = useState(null);
	const [secondsRemaining, setSecondsRemaining] = useState(0);
	const [storageError, setStorageError] = useState("");
	const examName = FORTIOS_OFFLINE_EXAM_FORMATS[examKey]?.name ?? "FortiOS Exam";
	const question = session?.questions[session.currentIndex];
	const score = useMemo(() => session?.questions.reduce(
		(total, item, index) => total + Number(isAnswerCorrect(item, session.answers[index])), 0,
	) ?? 0, [session]);

	useEffect(() => {
		let active = true;
		loadCachedFortiOSQuestionBank()
			.then((bank) => {
				if (!active) return;
				const offlineBank = bank.map((item) => ({
					...item,
					id: Number(item.id ?? item.bankId),
					exhibitImage: FORTIOS_BUNDLED_IMAGE_URLS.get(Number(item.id ?? item.bankId)) || item.exhibitImage,
				}));
				setBankState({ status: "ready", bank: offlineBank, error: null });
				let restoredSession = null;
				try {
					const saved = window.localStorage.getItem(sessionKey);
					if (saved) {
						const parsed = JSON.parse(saved);
						if (isValidSession(parsed, examKey) && parsed.questions.every((item) => offlineBank.some((candidate) => candidate.id === Number(item.id ?? item.bankId)))) {
							restoredSession = {
								...parsed,
								questions: parsed.questions.map((item) => ({
									...item,
									id: Number(item.id ?? item.bankId),
									exhibitImage: FORTIOS_BUNDLED_IMAGE_URLS.get(Number(item.id ?? item.bankId)) || item.exhibitImage,
								})),
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
			})
			.catch((error) => {
				if (active) setBankState({ status: "error", bank: [], error: error instanceof Error ? error.message : "Could not load saved FortiOS questions." });
			});
		return () => { active = false; };
	}, [examKey, sessionKey]);

	useEffect(() => {
		if (!session || session.isSubmitted || session.deadline === null) return undefined;
		const updateTimer = () => {
			const remaining = Math.max(0, Math.ceil((session.deadline - Date.now()) / 1000));
			setSecondsRemaining(remaining);
			if (remaining === 0) setSession((current) => current ? { ...current, isSubmitted: true, currentIndex: 0 } : current);
		};
		updateTimer();
		const timer = window.setInterval(updateTimer, 1000);
		return () => window.clearInterval(timer);
	}, [session?.deadline, session?.isSubmitted]);

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

				<section className="mt-5 rounded-2xl border border-[#f1d3d0] bg-white p-5 shadow-sm sm:p-8">
					{!session.isSubmitted ? (
						<>
							{question.exhibitImage && <ExhibitImage src={question.exhibitImage} className="mb-5" imageClassName="max-h-[32rem]" />}
							{question.exhibit && <ExhibitText text={question.exhibit} className="mb-5" />}
							<QuestionPrompt prompt={question.prompt} hasSeparateExhibit={Boolean(question.exhibit || question.exhibitImage)} offline fortiosOffline />
							<QuestionInput
								key={session.currentIndex}
								question={question}
								value={session.answers[session.currentIndex]}
								onChange={(value) => setSession((current) => ({ ...current, answers: { ...current.answers, [current.currentIndex]: value } }))}
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
					) : (
						<>
							<h2 className="text-xl font-bold">Question {session.currentIndex + 1}</h2>
							{question.exhibitImage && <ExhibitImage src={question.exhibitImage} className="my-5" imageClassName="max-h-[32rem]" />}
							{question.exhibit && <ExhibitText text={question.exhibit} className="my-5" />}
							<QuestionPrompt prompt={question.prompt} hasSeparateExhibit={Boolean(question.exhibit || question.exhibitImage)} offline fortiosOffline />
							<QuestionReview question={question} value={session.answers[session.currentIndex]} />
							{question.explanation && <p className="mt-5 rounded-xl bg-[#fff3f2] px-4 py-3 text-sm leading-6 text-[#596983]"><strong className="text-[#b31d17]">Explanation: </strong>{question.explanation}</p>}
							<div className="mt-7 flex flex-wrap justify-between gap-3">
								<button type="button" onClick={restartExam} className="inline-flex items-center gap-2 rounded-full border border-[#f1beba] px-5 py-3 font-semibold text-[#e2231a] transition hover:bg-[#fff0ef]"><RotateCcw size={17} /> Restart exam</button>
								{session.currentIndex < session.questions.length - 1 && <button type="button" onClick={() => setSession((current) => ({ ...current, currentIndex: current.currentIndex + 1 }))} className="inline-flex items-center gap-2 rounded-full bg-[#e2231a] px-6 py-3 font-semibold text-white transition hover:bg-[#bd2119]">Next review <ChevronRight size={18} /></button>}
							</div>
						</>
					)}
					{storageError && <p className="mt-4 text-sm text-amber-700" role="status">{storageError}</p>}
				</section>
			</div>
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
