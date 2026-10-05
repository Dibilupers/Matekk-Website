import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import CcnaLogo from "../../../../assets/CCNA.png";
import {
	ArrowRight,
	BookOpen,
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	CircleAlert,
	ClipboardList,
	Clock3,
	MessageSquare,
	Pencil,
	Settings,
	X,
} from "lucide-react";
import {
	beginCcnaModuleQuiz,
	CCNA_MODULE_QUIZ_DURATION_SECONDS,
	isCurrentCcnaModuleQuizAttempt,
	readCcnaModuleQuizProgress,
} from "../../../../utils/ccnaModuleQuizProgress";
import { CCNA_MODULE_QUIZZES } from "./ccnaModuleQuizData";
import { CCNA_CURRICULUM, slugifyCcnaTutorial } from "./ccnaCurriculum.js";
import { readCcnaTutorialProgress } from "../../../../utils/ccnaTutorialProgress";
import { readCcnaExamProgress, readCcnaShortExamProgress } from "../../../../utils/ccnaShortExamSession";
import { CCNA_EXAMS } from "./ccnaExamFormats";

const modules = CCNA_CURRICULUM.map((section) => ({
	...section,
	lessons: `${section.tutorials.length} lessons`,
}));
const EXAM_FORMATS = [
	{ name: "Short Exam", questions: 50, duration: "45 mins", description: "A quick practice session." },
	{ name: "Medium Exam", questions: CCNA_EXAMS.medium.questionCount, duration: "1 hour & 30 mins", description: "A balanced, longer practice session." },
	{ name: "Long Exam", questions: 150, duration: "2 hours", description: "A full-length practice session." },
];
const SHORT_EXAM_SESSION_KEY = "matekk-ccna-short-exam-session";

function getShortExamSessionKey(userId) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") return null;
	return `${SHORT_EXAM_SESSION_KEY}:${encodeURIComponent(String(userId))}`;
}

function readShortExamProgress(userId) {
	const sessionKey = getShortExamSessionKey(userId);
	if (!sessionKey) return { status: "not-started", deadline: null, answeredCount: 0, score: 0 };
	const savedSession = window.sessionStorage.getItem(sessionKey);
	if (!savedSession) return { status: "not-started", deadline: null, answeredCount: 0, score: 0 };

	try {
		const session = JSON.parse(savedSession);
		if (
			!session ||
			!Array.isArray(session.questions) ||
			!session.answers ||
			typeof session.answers !== "object" ||
			!Number.isFinite(session.deadline) ||
			typeof session.isSubmitted !== "boolean"
		) {
			throw new TypeError("Saved CCNA short exam progress has an invalid structure.");
		}
		const score = session.questions.reduce(
			(total, question, index) => total + Number(session.answers[index] === question.answer),
			0,
		);
		const isExpired = !session.isSubmitted && session.deadline <= Date.now();
		return {
			status: session.isSubmitted ? "completed" : isExpired ? "expired" : "in-progress",
			deadline: session.isSubmitted || isExpired ? null : session.deadline,
			answeredCount: Object.keys(session.answers).length,
			score,
		};
	} catch (error) {
		console.error("Unable to restore the saved CCNA short exam status.", error);
		return { status: "not-started", deadline: null, answeredCount: 0, score: 0 };
	}
}

function formatExamTime(totalSeconds) {
	const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
	const seconds = (totalSeconds % 60).toString().padStart(2, "0");
	return `${minutes}:${seconds}`;
}

const HERO_INTROS = [
	"Cutting-edge ICT training built on real network topologies — from switching fundamentals to security hardening, taught by working engineers.",
	"Build practical networking skills through focused lessons, hands-on concepts, and CCNA module quizzes.",
	"Explore routing, switching, security, and automation with lessons designed to grow your networking confidence.",
	"Strengthen your CCNA foundation one module at a time with practical tutorials and focused quizzes.",
	"Learn the networking concepts behind real-world topologies, from VLANs and routing to security and automation.",
];

function Stat({ value, label }) {
	return (
		<div className="flex items-center gap-2.5 sm:gap-3">
			<strong className="text-[1.65rem] leading-none tracking-tight text-[#071126] sm:text-[2rem]">
				{value}
			</strong>
			<span className="max-w-20 text-xs leading-tight text-[#6f7d99] sm:text-sm">
				{label}
			</span>
		</div>
	);
}

function NetworkIllustration({ quizAverage, shortExamProgress }) {
	const { profile } = useAuth();
	const starsFill = `${Math.max(0, Math.min(100, quizAverage))}%`;
	const hasShortExamResult = shortExamProgress.status === "completed" || shortExamProgress.status === "expired";
	const passedShortExam = shortExamProgress.score / 50 >= 0.8;
	const examActionLabel = hasShortExamResult
		? "View result"
		: shortExamProgress.status === "in-progress"
			? "Continue exam"
			: "Start short exam";

	return (
		<div className="relative mx-auto h-[320px] w-full max-w-[440px] sm:h-[380px] sm:max-w-[470px]">
			<div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e4f0f1] sm:h-[356px] sm:w-[356px]" />
			<img
				src={CcnaLogo}
				alt=""
				aria-hidden="true"
				className="absolute left-1/2 top-1/2 z-10 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 object-contain sm:h-[270px] sm:w-[270px]"
			/>
			<div className="absolute left-0 top-[31%] z-30 flex h-[94px] w-[128px] flex-col justify-center rounded-xl border border-[#e4eaf5] bg-white px-4 shadow-[0_14px_28px_rgba(15,35,75,0.1)] transition-transform duration-200 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:left-[-4px]">
				<strong className="text-xl leading-none text-[#005b6b]">{quizAverage}%</strong>
				<span className="mt-2 text-sm leading-none text-[#15203a]">Quiz score</span>
				<span
					role="img"
					aria-label={`${quizAverage}% quiz score, ${Math.round((quizAverage / 100) * 50) / 10} out of 5 stars`}
					className="ccna-stars-enter mt-2 inline-block text-sm leading-none tracking-[2px]"
				>
					<span aria-hidden="true" className="text-[#d7dee9]">★★★★★</span>
					<span aria-hidden="true" className="ccna-stars-fill" style={{ width: starsFill }}>★★★★★</span>
				</span>
			</div>
			<Link
				to="/modules/programs/ccna/results"
				aria-label="Open CCNA gradebook"
				title="Gradebook"
				className="absolute right-[12%] top-[2%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#005b6b] shadow-[0_8px_20px_rgba(15,35,75,0.1)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
			>
				<ClipboardList size={21} />
			</Link>
			<div className="absolute right-0 top-[17%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#005b6b] text-white shadow-lg transition-transform duration-200 ease-out hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100"><Settings size={21} /></div>
			<div className="absolute right-[-4px] top-[32%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#005b6b] shadow-[0_8px_20px_rgba(15,35,75,0.1)] transition-transform duration-200 ease-out hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100"><Pencil size={18} /></div>
			<div className="absolute right-[2%] top-[70%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#005b6b] text-white shadow-lg transition-transform duration-200 ease-out hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100"><MessageSquare size={19} /></div>
			<div className="absolute bottom-0 right-0 z-30 w-[238px] rounded-2xl border border-[#e4eaf5] bg-white p-4 shadow-[0_14px_28px_rgba(15,35,75,0.1)] transition-transform duration-200 ease-out hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:right-[-2%] sm:w-[275px]">
				<strong className="text-sm text-[#005b6b]">{profile?.username}</strong>
				<p className="mt-0.5 text-sm leading-snug text-[#64708a]">
					{hasShortExamResult
						? passedShortExam
							? "You just passed the short exam!"
							: "You didn't pass the short exam!"
						: shortExamProgress.status === "in-progress"
							? "You're taking the short exam!"
							: "Take the short exam to see your result."}
					{hasShortExamResult && (
						<span className="mt-1 block">
							{passedShortExam ? "Good job! :)" : "Better luck next time! :("}
						</span>
					)}
					{hasShortExamResult && (
						<span className="mt-1 block">Score: {shortExamProgress.score}/50</span>
					)}
				</p>
				<Link to="/modules/programs/ccna/exam/short" className="mt-3 flex h-11 w-full items-center justify-center rounded-full bg-[#005b6b] text-sm font-bold text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-[#004653] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100">{examActionLabel}</Link>
			</div>
		</div>
	);
}

function getQuizActionLabel(progress) {
	if (!isCurrentCcnaModuleQuizAttempt(progress)) return "Start Quiz";
	if (progress?.status === "in-progress") return "Continue Quiz";
	if (progress?.status === "completed" || progress?.status === "expired") return "Retake Quiz";
	return "Start Quiz";
}

function QuizTimeRemaining({ deadline }) {
	const [secondsRemaining, setSecondsRemaining] = useState(() =>
		Math.max(0, Math.ceil((deadline - Date.now()) / 1000)),
	);

	useEffect(() => {
		function updateRemainingTime() {
			setSecondsRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
		}

		updateRemainingTime();
		const intervalId = window.setInterval(updateRemainingTime, 1000);
		return () => window.clearInterval(intervalId);
	}, [deadline]);

	const minutes = Math.floor(secondsRemaining / 60).toString().padStart(2, "0");
	const seconds = (secondsRemaining % 60).toString().padStart(2, "0");

	return (
		<span
			role="timer"
			aria-label={`${minutes} minutes and ${seconds} seconds remaining`}
			className={`inline-flex min-w-[88px] justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold tabular-nums ${
				secondsRemaining <= 60
					? "bg-[#fff0ed] text-[#b42318]"
					: "bg-[#e8f3f4] text-[#005b6b]"
			}`}
		>
			{minutes}:{seconds} left
		</span>
	);
}

function getQuizMetrics(progress) {
	let correctAnswers = 0;
	let questionsCounted = 0;
	let attemptedModules = 0;

	CCNA_MODULE_QUIZZES.forEach((quiz) => {
		const attempt = progress.modules[quiz.number];
		if (!isCurrentCcnaModuleQuizAttempt(attempt)) return;

		const answers = attempt.answers ?? {};
		const answeredIndexes = Object.keys(answers)
			.map(Number)
			.filter((index) => Number.isInteger(index) && index >= 0 && index < quiz.questions.length);
		const isFinished = attempt.status === "completed" || attempt.status === "expired";
		if (!isFinished && answeredIndexes.length === 0) return;

		attemptedModules += 1;
		questionsCounted += isFinished ? quiz.questions.length : answeredIndexes.length;
		correctAnswers += quiz.questions.reduce(
			(total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
			0,
		);
	});

	return {
		quizAverage: questionsCounted === 0 ? 0 : Math.round((correctAnswers / questionsCounted) * 100),
		attemptedModules,
		quizCoverage: Math.round((attemptedModules / CCNA_MODULE_QUIZZES.length) * 100),
	};
}

function ModuleCard({ module, index, openSection, onToggle, quizProgress, tutorialProgress, onStartQuiz }) {
	const isOpen = openSection === index;
	const moduleQuiz = CCNA_MODULE_QUIZZES.find((quiz) => quiz.number === module.number);
	const savedQuizProgress = quizProgress.modules[module.number];
	const currentQuizProgress = isCurrentCcnaModuleQuizAttempt(savedQuizProgress) ? savedQuizProgress : null;
	const completedLessons = module.tutorials.filter((tutorial) => tutorialProgress.has(tutorial.number)).length;
	const lessonProgress = module.tutorials.length
		? (completedLessons / module.tutorials.length) * 100
		: 0;
	const moduleStatus = completedLessons === module.tutorials.length
		? "Completed"
		: completedLessons > 0
			? `${completedLessons} of ${module.tutorials.length} read`
			: "Not started";

	return (
		<div className="overflow-hidden rounded-[18px] border border-[#d6e5e7] bg-white transition-[transform,box-shadow,border-color] duration-200 ease-out hover:z-10 hover:scale-[1.01] hover:border-[#b5d4d9] hover:shadow-[0_10px_24px_rgba(0,91,107,0.1)] motion-reduce:transition-none motion-reduce:hover:scale-100">
			<button
				type="button"
				onClick={() => onToggle(index)}
				className="flex min-h-[92px] w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
			>
				<span
					role="progressbar"
					aria-label={`${module.title} lesson progress`}
					aria-valuemin={0}
					aria-valuemax={module.tutorials.length}
					aria-valuenow={completedLessons}
					className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#c9dfe2] bg-[#edf5f6] text-lg font-semibold"
				>
					<span
						aria-hidden="true"
						className="absolute inset-x-0 bottom-0 bg-[#005b6b] transition-[height] duration-500 ease-out"
						style={{ height: `${lessonProgress}%` }}
					/>
					<span className={`relative z-10 transition-colors duration-300 ${lessonProgress > 50 ? "text-white" : "text-[#005b6b]"}`}>
						{index + 1}
					</span>
				</span>
				<span className="min-w-0 flex-1">
					<strong className="block text-base text-[#111a2d] sm:text-[17px]">{module.title}</strong>
					<span className="mt-1 block text-sm text-[#8a96aa]">{module.lessons} · {moduleStatus}</span>
				</span>
				{isOpen ? <ChevronDown className="text-[#005b6b]" size={19} /> : <ChevronRight className="text-[#91a0b9]" size={19} />}
			</button>
			{isOpen && (
				<div className="space-y-4 border-t border-[#e2ecec] px-6 pb-6 pt-5 sm:pl-[91px]">
					<div className="space-y-4">
						{module.tutorials.map((tutorial) => {
							const isComplete = tutorialProgress.has(tutorial.number);
							return (
								<Link
									key={tutorial.number}
									to={`/modules/programs/ccna/knowledge-hub/${slugifyCcnaTutorial(tutorial.title)}`}
									className="group flex items-center gap-3 text-[15px] text-[#66738d] hover:text-[#005b6b]"
								>
									<span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${isComplete ? "border-[#005b6b] bg-[#005b6b] text-white" : "border-[#dce5f2] bg-white text-transparent group-hover:border-[#8bb8bf]"}`}>
										<Check size={13} strokeWidth={3} />
									</span>
									<span className="min-w-0 flex-1 transition-colors group-hover:text-[#005b6b]">
										<span className="mr-2 text-xs font-semibold text-[#8a96aa]">{tutorial.number}</span>
										{tutorial.title}
									</span>
								</Link>
							);
						})}
					</div>
					<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e2ecec] pt-4">
						<span className="text-sm text-[#71819b]">
							<span className="block">{completedLessons} of {module.tutorials.length} lessons read</span>
							{currentQuizProgress?.status === "completed" || currentQuizProgress?.status === "expired"
								? `${currentQuizProgress.status === "expired" ? "Time expired · " : ""}Last score: ${currentQuizProgress.score}/${moduleQuiz?.questions.length ?? 25}`
								: currentQuizProgress?.status === "in-progress"
									? "Quiz in progress"
									: "25-question quiz · 30-minute limit"}
						</span>
						<span className="inline-flex shrink-0 flex-col items-end gap-1">
							{currentQuizProgress?.status === "completed" && (
								<span className="text-xs font-semibold text-[#287849]">Completed</span>
							)}
							<span className="relative inline-flex">
								<button
									type="button"
									onClick={() => onStartQuiz(module.number)}
									className="rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-[#004653] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100"
								>
									{getQuizActionLabel(currentQuizProgress)}
								</button>
							{currentQuizProgress?.status === "expired" && (
								<span
									role="img"
									title="Quiz time expired"
									aria-label="Quiz time expired"
									className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-sm"
								>
									<CircleAlert size={15} strokeWidth={2.5} />
								</span>
							)}
							</span>
						</span>
					</div>
				</div>
			)}
		</div>
	);
}

export default function CCNA() {
	const { profile } = useAuth();
	const userId = profile?.userId;
	const [typedIntro, setTypedIntro] = useState("");
	const [openSection, setOpenSection] = useState(null);
	const [isQuizPickerOpen, setIsQuizPickerOpen] = useState(false);
	const [isExamPickerOpen, setIsExamPickerOpen] = useState(false);
	const [selectedExamFormat, setSelectedExamFormat] = useState(null);
	const [shortExamProgressState, setShortExamProgressState] = useState(() => ({
		userId,
		progress: readCcnaShortExamProgress(userId),
	}));
	const shortExamProgress = shortExamProgressState.userId === userId
		? shortExamProgressState.progress
		: readCcnaShortExamProgress(userId);
	const [mediumExamProgressState, setMediumExamProgressState] = useState(() => ({
		userId,
		progress: readCcnaExamProgress(CCNA_EXAMS.medium.sessionKey, userId),
	}));
	const mediumExamProgress = mediumExamProgressState.userId === userId
		? mediumExamProgressState.progress
		: readCcnaExamProgress(CCNA_EXAMS.medium.sessionKey, userId);
	const [examClockNow, setExamClockNow] = useState(Date.now);
	const [progressSlide, setProgressSlide] = useState(0);
	const [quizProgressState] = useState(() => ({
		userId,
		progress: userId ? readCcnaModuleQuizProgress(userId) : { activeModule: null, modules: {} },
	}));
	const quizProgress = quizProgressState.userId === userId
		? quizProgressState.progress
		: userId ? readCcnaModuleQuizProgress(userId) : { activeModule: null, modules: {} };
	const tutorialProgress = userId ? readCcnaTutorialProgress(userId) : new Set();
	const navigate = useNavigate();
	const { quizAverage, attemptedModules, quizCoverage } = getQuizMetrics(quizProgress);
	const completedModules = modules.filter(
		(module) => module.tutorials.length > 0 &&
			module.tutorials.every((tutorial) => tutorialProgress.has(tutorial.number)),
	).length;
	const remainingModules = modules.length - completedModules;
	const activeModule = quizProgress.activeModule
		&& isCurrentCcnaModuleQuizAttempt(quizProgress.modules[quizProgress.activeModule])
		&& quizProgress.modules[quizProgress.activeModule]?.status === "in-progress"
		? quizProgress.activeModule
		: modules.find((module) => {
			const attempt = quizProgress.modules[module.number];
			return !isCurrentCcnaModuleQuizAttempt(attempt) || !["completed", "expired"].includes(attempt.status);
		})?.number ?? "1.0";
	const activeModuleDetails = modules.find((module) => module.number === activeModule);
	const allModulesCompleted = modules.every((module) => {
		const attempt = quizProgress.modules[module.number];
		return isCurrentCcnaModuleQuizAttempt(attempt) && ["completed", "expired"].includes(attempt.status);
	});
	const activeQuizProgress = isCurrentCcnaModuleQuizAttempt(quizProgress.modules[activeModule])
		? quizProgress.modules[activeModule]
		: null;
	const heroQuizLabel = getQuizActionLabel(activeQuizProgress);
	const shortExamSecondsRemaining = shortExamProgress.deadline
		? Math.max(0, Math.ceil((shortExamProgress.deadline - examClockNow) / 1000))
		: 0;
	const hasActiveShortExam = shortExamSecondsRemaining > 0;
	const mediumExamSecondsRemaining = mediumExamProgress.deadline
		? Math.max(0, Math.ceil((mediumExamProgress.deadline - examClockNow) / 1000))
		: 0;
	const mediumQuestionCount = CCNA_EXAMS.medium.questionCount;
	// Live status for each exam that can be taken, keyed by its name in EXAM_FORMATS
	const examRuns = {
		"Short Exam": {
			progress: shortExamProgress,
			secondsRemaining: shortExamSecondsRemaining,
			isActive: hasActiveShortExam,
			path: CCNA_EXAMS.short.path,
			summary: `50 questions · 45 minutes · ${hasActiveShortExam ? `${formatExamTime(shortExamSecondsRemaining)} remaining` : "Modules 1.0–6.0"}`,
		},
		"Medium Exam": {
			progress: mediumExamProgress,
			secondsRemaining: mediumExamSecondsRemaining,
			isActive: mediumExamSecondsRemaining > 0,
			path: CCNA_EXAMS.medium.path,
			summary: `${mediumQuestionCount} question${mediumQuestionCount === 1 ? "" : "s"} · 1 hour 30 minutes · ${mediumExamSecondsRemaining > 0 ? `${formatExamTime(mediumExamSecondsRemaining)} remaining` : "CCNA practice questions"}`,
		},
	};

	useEffect(() => {
		if (!shortExamProgress.deadline && !mediumExamProgress.deadline) return undefined;
		const intervalId = window.setInterval(() => {
			setExamClockNow(Date.now());
			setShortExamProgressState({ userId, progress: readCcnaShortExamProgress(userId) });
			setMediumExamProgressState({ userId, progress: readCcnaExamProgress(CCNA_EXAMS.medium.sessionKey, userId) });
		}, 1000);
		return () => window.clearInterval(intervalId);
	}, [shortExamProgress.deadline, mediumExamProgress.deadline, userId]);

	useEffect(() => {
		let timeoutId;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			timeoutId = window.setTimeout(() => setTypedIntro(HERO_INTROS[0]), 0);
			return () => window.clearTimeout(timeoutId);
		}

		let introIndex = 0;
		let characterIndex = 0;

		function typeDescription() {
			const description = HERO_INTROS[introIndex];
			characterIndex += 1;
			setTypedIntro(description.slice(0, characterIndex));
			if (characterIndex < description.length) {
				timeoutId = window.setTimeout(typeDescription, 18);
			} else {
				timeoutId = window.setTimeout(eraseDescription, 10000);
			}
		}

		function eraseDescription() {
			characterIndex -= 1;
			setTypedIntro(HERO_INTROS[introIndex].slice(0, characterIndex));
			if (characterIndex > 0) {
				timeoutId = window.setTimeout(eraseDescription, 8);
			} else {
				introIndex = (introIndex + 1) % HERO_INTROS.length;
				timeoutId = window.setTimeout(typeDescription, 120);
			}
		}

		timeoutId = window.setTimeout(typeDescription, 150);
		return () => window.clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		if (!isQuizPickerOpen && !isExamPickerOpen) return undefined;

		function closeOnEscape(event) {
			if (event.key === "Escape") {
				setIsQuizPickerOpen(false);
				setIsExamPickerOpen(false);
			}
		}

		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, [isExamPickerOpen, isQuizPickerOpen]);

	useEffect(() => {
		if (!shortExamProgress.deadline) return undefined;
		const intervalId = window.setInterval(() => {
			setExamClockNow(Date.now());
			setShortExamProgress(readShortExamProgress(userId));
		}, 1000);
		return () => window.clearInterval(intervalId);
	}, [shortExamProgress.deadline, userId]);

	function toggleModule(index) {
		setOpenSection((currentSection) => currentSection === index ? null : index);
	}

	function openModuleQuiz(moduleNumber) {
		if (!userId) return;
		beginCcnaModuleQuiz(userId, moduleNumber);
		navigate(`/modules/programs/ccna/quiz/${moduleNumber}`);
	}

	return (
		<main className="ccna-page-enter min-h-screen bg-white text-[#071126]">
			<section className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 sm:px-10 lg:px-14 lg:pb-20 lg:pt-16">
				<div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] bg-[#f0f7f7] px-4 py-2 text-sm font-semibold text-[#005b6b]">
							<span className="h-2 w-2 rounded-full bg-[#005b6b]" />
							{allModulesCompleted
								? "All 6 modules completed"
								: `Module ${activeModuleDetails?.number.replace(".0", "") ?? "1"} of ${modules.length} · ${activeModuleDetails?.title ?? "Network Fundamentals"}`}
						</div>
						<h1 className="max-w-[700px] text-[2.65rem] font-bold leading-[1.08] tracking-[-1.5px] sm:text-6xl lg:text-[3.25rem] xl:text-[3.7rem]">
							Continue your path to <span className="text-[#005b6b]">CCNA<br className="hidden sm:block" /> Certification.</span>
						</h1>
						<p className="typewriter-caret mt-6 min-h-[5.4rem] max-w-[555px] text-base leading-[1.8] text-[#66738d] sm:text-lg">
							{typedIntro}
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<button
								type="button"
								onClick={() => {
									setSelectedExamFormat(null);
									setIsExamPickerOpen(true);
								}}
								className="flex h-[58px] items-center gap-2 rounded-full bg-[#005b6b] px-7 text-base font-bold text-white shadow-[0_10px_20px_rgba(0,91,107,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#004653] hover:shadow-[0_14px_26px_rgba(0,91,107,0.24)] active:translate-y-0"
							>
								{hasActiveShortExam ? "Continue Exam" : "Start Exam"} <ArrowRight size={18} />
							</button>
							<button onClick={() => setIsQuizPickerOpen(true)} className="flex h-[58px] items-center gap-2 rounded-full bg-[#005b6b] px-7 text-base font-bold text-white shadow-[0_10px_20px_rgba(0,91,107,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#004653] hover:shadow-[0_14px_26px_rgba(0,91,107,0.24)] active:translate-y-0">{heroQuizLabel} <ArrowRight size={18} /></button>
							<Link to="/modules/programs/ccna/knowledge-hub" className="flex h-[58px] items-center rounded-full border border-[#005b6b] px-7 text-base font-bold text-[#005b6b] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#f0f7f7] hover:shadow-[0_10px_20px_rgba(0,91,107,0.12)] active:translate-y-0">View All Modules</Link>
							<Link to="/modules/programs/ccna/practice-lab" className="flex h-[58px] items-center gap-2 rounded-full border border-[#005b6b] px-7 text-base font-bold text-[#005b6b] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#f0f7f7] hover:shadow-[0_10px_20px_rgba(0,91,107,0.12)] active:translate-y-0">Practice Lab <ArrowRight size={18} /></Link>
						</div>
						<div className="mt-11 flex flex-wrap gap-5 divide-x divide-[#dce5f2]">
							<Stat value={`${attemptedModules}/6`} label="Quizzes attempted" />
							<div className="pl-5 sm:pl-7"><Stat value={`${quizAverage}%`} label="Quiz average" /></div>
							<div className="pl-5 sm:pl-7"><Stat value={remainingModules} label="Modules left" /></div>
						</div>
					</div>
					<NetworkIllustration quizAverage={quizAverage} shortExamProgress={shortExamProgress} />
				</div>
			</section>

			<div className="bg-[#eaf3f4] py-12 text-center sm:py-14">
				<p className="text-2xl font-bold tracking-tight text-[#071126] sm:text-[28px]">Built on real <span className="text-[#005b6b]">network topologies.</span></p>
			</div>

			<section className="bg-[#f5f9f9]">
				<div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_353px] lg:px-14 lg:py-14">
					<div>
						<div className="mb-6 flex items-center justify-between">
							<h2 className="text-xl font-bold sm:text-[21px]">Course modules</h2>
							<span className="text-sm text-[#7c89a1]">{attemptedModules} of 6 quizzes attempted</span>
						</div>
						<div className="space-y-3">
							{modules.map((module, index) => <ModuleCard key={module.number} module={module} index={index} openSection={openSection} onToggle={toggleModule} quizProgress={quizProgress} tutorialProgress={tutorialProgress} onStartQuiz={openModuleQuiz} />)}
						</div>
					</div>

					<aside className="space-y-5">
						<div className="overflow-hidden rounded-[18px] border border-[#d6e5e7] bg-white">
							<div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${progressSlide * 100}%)` }}>
								<div className="flex w-full shrink-0 items-center gap-5 p-6">
									<div
										role="progressbar"
										aria-label="CCNA quiz coverage"
										aria-valuemin={0}
										aria-valuemax={100}
										aria-valuenow={quizCoverage}
										className="relative h-16 w-16 shrink-0 rounded-full"
										style={{ background: `conic-gradient(#005b6b ${quizCoverage}%, #e4eaf4 0)` }}
									>
										<span className="absolute inset-[7px] flex items-center justify-center rounded-full bg-white text-xs font-bold text-[#005b6b]">{quizCoverage}%</span>
									</div>
									<div className="min-w-0"><strong className="text-lg">Quiz coverage</strong><p className="mt-1 text-sm text-[#7c89a1]">{attemptedModules} of 6 quizzes attempted</p></div>
								</div>
								<div className="flex w-full shrink-0 items-center gap-5 p-6">
									<div
										role="progressbar"
										aria-label="Short exam progress"
										aria-valuemin={0}
										aria-valuemax={100}
										aria-valuenow={shortExamProgress.status === "completed" ? 100 : Math.round((shortExamProgress.answeredCount / 50) * 100)}
										className="relative h-16 w-16 shrink-0 rounded-full"
										style={{ background: `conic-gradient(#005b6b ${shortExamProgress.status === "completed" ? 100 : (shortExamProgress.answeredCount / 50) * 100}%, #e4eaf4 0)` }}
									>
										<span className="absolute inset-[7px] flex items-center justify-center rounded-full bg-white text-xs font-bold text-[#005b6b]">{shortExamProgress.status === "completed" ? "100%" : `${Math.round((shortExamProgress.answeredCount / 50) * 100)}%`}</span>
									</div>
									<div className="min-w-0 flex-1">
										<strong className="text-lg">Exam progress</strong>
										<p className="mt-1 text-sm text-[#7c89a1]">
											{shortExamProgress.status === "completed"
												? `Completed · Score ${shortExamProgress.score}/50`
												: shortExamProgress.status === "expired"
													? `Time expired · Score ${shortExamProgress.score}/50`
													: shortExamProgress.status === "in-progress"
														? `${shortExamProgress.answeredCount} of 50 answered`
														: "Short Exam · Not started"}
										</p>
										{hasActiveShortExam && <p className="mt-1 text-xs font-bold tabular-nums text-[#005b6b]">{formatExamTime(shortExamSecondsRemaining)} remaining</p>}
									</div>
								</div>
							</div>
							<div className="flex h-8 items-center justify-center gap-2 pb-2" aria-label="Progress panels">
								<button type="button" onClick={() => setProgressSlide(0)} disabled={progressSlide === 0} aria-label="Show quiz progress" className="rounded-full p-1 text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-default disabled:opacity-30"><ChevronLeft size={16} /></button>
								<div className="flex items-center gap-2" aria-hidden="true">
									<span className={`h-2 rounded-full transition-all ${progressSlide === 0 ? "w-6 bg-[#005b6b]" : "w-2 bg-[#cbd5e1]"}`} />
									<span className={`h-2 rounded-full transition-all ${progressSlide === 1 ? "w-6 bg-[#005b6b]" : "w-2 bg-[#cbd5e1]"}`} />
								</div>
								<button type="button" onClick={() => setProgressSlide(1)} disabled={progressSlide === 1} aria-label="Show exam progress" className="rounded-full p-1 text-[#005b6b] transition hover:bg-[#e8f3f4] disabled:cursor-default disabled:opacity-30"><ChevronRight size={16} /></button>
							</div>
						</div>
						<div className="rounded-[18px] border border-[#d6e5e7] bg-white p-6">
							{progressSlide === 0 ? (
								<>
									<h2 className="mb-5 text-xl font-bold">Practice quizzes</h2>
									{modules.map((module) => {
										const savedModuleProgress = quizProgress.modules[module.number];
										const moduleProgress = isCurrentCcnaModuleQuizAttempt(savedModuleProgress) ? savedModuleProgress : null;
										const moduleQuestionCount = CCNA_MODULE_QUIZZES.find((quiz) => quiz.number === module.number)?.questions.length ?? 25;
										const answeredQuestionCount = Object.keys(moduleProgress?.answers ?? {}).length;
										return (
											<div key={module.number} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[#e2ecec] py-3 text-sm last:border-0">
												<div className="min-w-0">
													<span className="block truncate font-medium">{module.number} {module.title}</span>
													<strong className={`mt-0.5 block ${moduleProgress?.status === "completed" || moduleProgress?.status === "expired" || moduleProgress?.status === "in-progress" ? "text-[#005b6b]" : "text-[#8b96a9]"}`}>
														{moduleProgress?.status === "completed" || moduleProgress?.status === "expired"
															? `${moduleProgress.score}/${moduleQuestionCount}`
															: moduleProgress?.status === "in-progress"
																? `${answeredQuestionCount}/${moduleQuestionCount} answered`
																: getQuizActionLabel(moduleProgress)}
													</strong>
												</div>
												<div className="flex min-h-[58px] min-w-[88px] flex-col items-end justify-between">
													<div className="flex h-6 items-center justify-end">
														{moduleProgress?.status === "completed" ? (
															<span className="text-xs font-semibold text-[#287849]">Completed</span>
														) : moduleProgress?.status === "in-progress" && Number.isFinite(moduleProgress.deadline) ? (
															<QuizTimeRemaining deadline={moduleProgress.deadline} />
														) : null}
													</div>
													<span className="relative inline-flex shrink-0">
														<button type="button" onClick={() => openModuleQuiz(module.number)} className="rounded-full border border-[#c9dfe2] px-3 py-1.5 text-xs font-semibold text-[#005b6b] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#e8f3f4] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100">
															{getQuizActionLabel(moduleProgress)}
														</button>
														{moduleProgress?.status === "expired" && (
															<span className="group/quiz-expired absolute -right-1.5 -top-1.5">
																<span
																	role="img"
																	aria-label="Quiz time expired"
																	className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-sm"
																>
																	<CircleAlert size={15} strokeWidth={2.5} />
																</span>
																<span
																	role="tooltip"
																	className="pointer-events-none absolute right-full top-1/2 z-20 mr-2 w-max -translate-y-1/2 rounded-md bg-[#071126] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover/quiz-expired:opacity-100 group-focus-within/quiz-expired:opacity-100"
																>
																	Time is up — retake the quiz to try again.
																</span>
															</span>
														)}
													</span>
												</div>
											</div>
										);
									})}
								</>
							) : (
								<>
									<h2 className="mb-5 text-xl font-bold">Exam progress</h2>
									{EXAM_FORMATS.map((format) => {
										const run = examRuns[format.name];
										const examProgress = run?.progress;
										const answeredCount = examProgress?.answeredCount ?? 0;
										const progressPercentage = examProgress?.status === "completed"
											? 100
											: Math.round((answeredCount / format.questions) * 100);
										const statusText = examProgress?.status === "completed"
											? `Completed · Score ${examProgress.score}/${format.questions}`
											: examProgress?.status === "expired"
												? `Time expired · Score ${examProgress.score}/${format.questions}`
												: examProgress?.status === "in-progress"
													? `${answeredCount}/${format.questions} answered`
													: "Not started";

										return (
											<div key={format.name} className="border-b border-[#e2ecec] py-3 last:border-0">
												<div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
													<div className="min-w-0">
														<span className="block truncate text-sm font-medium">{format.name}</span>
														<span className="mt-0.5 block text-xs text-[#7c89a1]">{format.questions} questions</span>
														<strong className={`mt-1 block text-sm ${examProgress && examProgress.status !== "not-started" ? "text-[#005b6b]" : "text-[#8b96a9]"}`}>
															{statusText}
															{examProgress?.status === "expired" && (
																<span className="group/exam-expired relative ml-1.5 inline-flex align-middle">
																	<button
																		type="button"
																		aria-label="Exam time expired"
																		className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-sm"
																	>
																		<CircleAlert size={15} strokeWidth={2.5} />
																	</button>
																	<span
																		role="tooltip"
																		className="pointer-events-none absolute bottom-full left-0 z-20 mb-1 w-max max-w-[240px] rounded-md bg-[#071126] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover/exam-expired:opacity-100 group-focus-within/exam-expired:opacity-100"
																	>
																		Time is up — retake the exam to try again.
																	</span>
																</span>
															)}
														</strong>
													</div>
													<div className="flex min-h-[58px] min-w-[112px] flex-col items-end justify-between">
														<div className="flex h-6 items-center justify-end">
															{run?.isActive && (
																<span
																	role="timer"
																	aria-label={`${formatExamTime(run.secondsRemaining)} remaining`}
																	className={`inline-flex min-w-[88px] justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold tabular-nums ${
																		run.secondsRemaining <= 60
																			? "bg-[#fff0ed] text-[#b42318]"
																			: "bg-[#e8f3f4] text-[#005b6b]"
																	}`}
																>
																	{formatExamTime(run.secondsRemaining)} left
																</span>
															)}
														</div>
														{run?.isActive ? (
															<button
																type="button"
																onClick={() => navigate(run.path)}
																className="rounded-full border border-[#c9dfe2] px-3 py-1.5 text-xs font-semibold text-[#005b6b] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#e8f3f4] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100"
															>
																Continue Exam
															</button>
														) : null}
													</div>
												</div>
												{examProgress && examProgress.status !== "not-started" && !run.isActive && (
													<div
														role="progressbar"
														aria-label={`${format.name} completion`}
														aria-valuemin={0}
														aria-valuemax={100}
														aria-valuenow={progressPercentage}
														className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e4eaf4]"
													>
														<div className="h-full rounded-full bg-[#005b6b] transition-[width]" style={{ width: `${progressPercentage}%` }} />
													</div>
												)}
											</div>
										);
									})}
								</>
							)}
						</div>
					</aside>
				</div>
			</section>
			{isQuizPickerOpen && createPortal(
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#071126]/55 p-4 backdrop-blur-sm"
					onMouseDown={(event) => {
						if (event.target === event.currentTarget) setIsQuizPickerOpen(false);
					}}
				>
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="ccna-quiz-picker-title"
						className="ccna-page-enter my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
					>
						<header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#e2ecec] px-5 py-4 sm:px-8 sm:py-5">
							<div>
								<p className="text-sm font-semibold text-[#005b6b]">CCNA practice</p>
								<h2 id="ccna-quiz-picker-title" className="mt-1 text-xl font-bold text-[#071126] sm:text-2xl">Choose a module quiz</h2>
								<p className="mt-2 text-sm text-[#71819b]">Pick a module to see its curriculum and start or continue its quiz.</p>
							</div>
							<button
								type="button"
								onClick={() => setIsQuizPickerOpen(false)}
								aria-label="Close module quiz selection"
								className="rounded-full p-2 text-[#71819b] transition hover:bg-[#f0f7f7] hover:text-[#005b6b]"
							>
								<X size={20} />
							</button>
						</header>
						<div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 sm:p-6">
							{modules.map((module) => {
								const quiz = CCNA_MODULE_QUIZZES.find((item) => item.number === module.number);
								const savedProgress = quizProgress.modules[module.number];
								const moduleProgress = isCurrentCcnaModuleQuizAttempt(savedProgress) ? savedProgress : null;
								const completedLessons = module.tutorials.filter((tutorial) => tutorialProgress.has(tutorial.number)).length;
								const questionCount = quiz?.questions.length ?? 25;
								const actionLabel = userId ? getQuizActionLabel(moduleProgress) : "Sign in required";

								return (
									<article key={module.number} className="relative rounded-2xl border border-[#d6e5e7] bg-white p-4 pt-14 transition-colors hover:border-[#a9cdd2] sm:p-5 sm:pt-14">
										{moduleProgress?.status === "in-progress" && Number.isFinite(moduleProgress.deadline) && (
											<div className="absolute right-4 top-4 sm:right-5 sm:top-5">
												<QuizTimeRemaining deadline={moduleProgress.deadline} />
											</div>
										)}
										<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
											<div className="min-w-0">
												<p className="text-xs font-bold uppercase tracking-[0.12em] text-[#005b6b]">Module {module.number}</p>
												<h3 className="mt-1 text-lg font-bold text-[#111a2d]">{module.title}</h3>
												<p className="mt-1 text-sm leading-6 text-[#71819b]">{module.description}</p>
												<div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#526584]">
													<span className="inline-flex items-center gap-1.5"><BookOpen size={14} /> {completedLessons}/{module.tutorials.length} lessons read</span>
													<span className="inline-flex items-center gap-1.5"><Check size={14} /> {questionCount} questions</span>
													<span className="inline-flex items-center gap-1.5"><Clock3 size={14} /> {Math.floor(CCNA_MODULE_QUIZ_DURATION_SECONDS / 60)} minutes</span>
												</div>
												<p className="mt-2 text-xs font-semibold text-[#71819b]">
													{moduleProgress?.status === "completed" || moduleProgress?.status === "expired"
														? `${moduleProgress.status === "expired" ? "Expired" : "Completed"} · Last score ${moduleProgress.score}/${questionCount}`
														: moduleProgress?.status === "in-progress"
															? "Quiz in progress · Your answers are saved"
															: "Not started"}
												</p>
											</div>
											<button
												type="button"
												disabled={!userId}
												onClick={() => {
													setIsQuizPickerOpen(false);
													openModuleQuiz(module.number);
												}}
												className="shrink-0 rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-[#004653] active:scale-100 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:scale-100"
											>
												{actionLabel}
											</button>
										</div>
									</article>
								);
							})}
						</div>
					</section>
				</div>,
				document.body,
			)}
			{isExamPickerOpen && createPortal(
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#071126]/55 p-4 backdrop-blur-sm"
					onMouseDown={(event) => {
						if (event.target === event.currentTarget) setIsExamPickerOpen(false);
					}}
				>
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="ccna-exam-picker-title"
						className="ccna-page-enter my-auto max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8"
					>
						<header className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm font-semibold text-[#005b6b]">CCNA practice</p>
								<h2 id="ccna-exam-picker-title" className="mt-1 text-2xl font-bold text-[#071126]">Choose an exam format</h2>
							</div>
							<button
								type="button"
								onClick={() => setIsExamPickerOpen(false)}
								aria-label="Close exam selection"
								className="rounded-full p-2 text-[#71819b] transition hover:bg-[#f0f7f7] hover:text-[#005b6b]"
							>
								<X size={20} />
							</button>
						</header>
						<p className="mt-3 text-sm leading-6 text-[#71819b]">
							The Short Exam has 50 random questions from CCNA modules 1.0–6.0, and the Medium Exam has CCNA practice questions. The Long Exam is coming soon.
						</p>
						<div className="mt-6 grid gap-3 md:grid-cols-3">
							{EXAM_FORMATS.map((format) => {
								const isSelected = selectedExamFormat === format.name;
								return (
									<button
										key={format.name}
										type="button"
										aria-pressed={isSelected}
										onClick={() => setSelectedExamFormat(format.name)}
										className={`rounded-2xl border p-5 text-left transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,91,107,0.14)] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${isSelected ? "border-[#005b6b] bg-[#eaf3f4] text-[#005b6b]" : "border-[#d6e5e7] text-[#263654] hover:border-[#a9cdd2]"}`}
									>
										<span className="flex items-center justify-between gap-2">
											<span className="text-lg font-bold">{format.name}</span>
											{examRuns[format.name]?.isActive && (
												<span
													role="timer"
													aria-label={`${formatExamTime(examRuns[format.name].secondsRemaining)} remaining`}
													className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold tabular-nums ${
														examRuns[format.name].secondsRemaining <= 60
															? "bg-[#fff0ed] text-[#b42318]"
															: "bg-[#e8f3f4] text-[#005b6b]"
													}`}
												>
													{formatExamTime(examRuns[format.name].secondsRemaining)} left
												</span>
											)}
										</span>
										<span className="mt-3 block text-3xl font-extrabold">{format.questions}</span>
										<span className="block text-sm font-medium text-[#71819b]">questions</span>
										<span className="mt-4 flex items-center gap-1.5 text-sm font-semibold"><Clock3 size={15} /> {format.duration}</span>
										<span className="mt-2 block text-sm leading-5 text-[#71819b]">{format.description}</span>
									</button>
								);
							})}
						</div>
						{selectedExamFormat && (
							<div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f5f9f9] p-4">
								<p className="text-sm text-[#526584]">
									{examRuns[selectedExamFormat]
										? examRuns[selectedExamFormat].summary
										: `${selectedExamFormat} selected. This exam format is coming soon.`}
								</p>
								{examRuns[selectedExamFormat] && (
									<button
										type="button"
										disabled={!userId}
										onClick={() => {
											setIsExamPickerOpen(false);
											navigate(examRuns[selectedExamFormat].path);
										}}
										className="rounded-full bg-[#005b6b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#004653] disabled:cursor-not-allowed disabled:opacity-50"
									>
										{examRuns[selectedExamFormat].isActive ? "Continue Exam" : `Start ${selectedExamFormat}`}
									</button>
								)}
							</div>
						)}
					</section>
				</div>,
				document.body,
			)}
		</main>
	);
}
