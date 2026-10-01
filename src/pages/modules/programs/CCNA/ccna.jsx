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
	ChevronRight,
	CircleAlert,
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
import { CCNA_CURRICULUM } from "./ccnaCurriculum.js";
import { readCcnaTutorialProgress } from "../../../../utils/ccnaTutorialProgress";

const modules = CCNA_CURRICULUM.map((section) => ({
	...section,
	lessons: `${section.tutorials.length} lessons`,
}));

const HERO_INTROS = [
	"Practical ICT training built on real network topologies, from switching fundamentals to security hardening.",
	"Build networking skills through focused lessons, practical concepts, and CCNA module quizzes.",
	"Explore routing, switching, security, and automation with lessons designed to grow your confidence.",
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

function NetworkIllustration({ quizAverage }) {
	const { profile } = useAuth();
	const starsFill = `${Math.max(0, Math.min(100, quizAverage))}%`;

	return (
		<div className="relative mx-auto h-[320px] w-full max-w-[440px] sm:h-[380px] sm:max-w-[470px]">
			<div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e4f0f1] sm:h-[356px] sm:w-[356px]" />
			<div className="absolute left-1/2 top-1/2 z-10 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#005b6b] shadow-[0_18px_45px_rgba(0,91,107,0.2)] sm:h-[262px] sm:w-[262px]" />
			<div className="absolute left-1/2 top-[30%] z-20 h-14 w-14 -translate-x-1/2 rounded-full bg-[#ffd8b0] sm:h-16 sm:w-16" />
			<div className="absolute left-1/2 top-[51%] z-20 flex h-16 w-24 -translate-x-1/2 items-end justify-center border-b-[14px] border-[#edf2ff] sm:h-20 sm:w-28">
				<div className="mb-2 h-11 w-16 rounded-md border-[6px] border-[#101b33] bg-[#167789] shadow-[0_0_0_3px_#f1f7f7] sm:h-12 sm:w-20">
					<div className="ml-2 mt-2 h-2 w-2 rounded-full bg-[#62e5a5]" />
					<div className="ml-6 -mt-2 h-1 w-7 bg-white/80" />
					<div className="ml-6 mt-1 h-1 w-5 bg-white/60" />
				</div>
			</div>
			<div className="absolute left-0 top-[31%] z-30 flex h-[94px] w-[128px] flex-col justify-center rounded-xl border border-[#e4eaf5] bg-white px-4 shadow-[0_14px_28px_rgba(15,35,75,0.1)] sm:left-[-4px]">
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
			<div className="absolute right-0 top-[10%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#005b6b] text-white shadow-lg transition-transform duration-200 ease-out hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100"><Settings size={21} /></div>
			<div className="absolute right-[-4px] top-[44%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#005b6b] shadow-[0_8px_20px_rgba(15,35,75,0.1)] transition-transform duration-200 ease-out hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100"><Pencil size={18} /></div>
			<div className="absolute right-[2%] top-[70%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#005b6b] text-white shadow-lg transition-transform duration-200 ease-out hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100"><MessageSquare size={19} /></div>
			<div className="absolute bottom-0 right-0 z-30 w-[238px] rounded-2xl border border-[#e4eaf5] bg-white p-4 shadow-[0_14px_28px_rgba(15,35,75,0.1)] transition-transform duration-200 ease-out hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:right-[-2%] sm:w-[275px]">
				<strong className="text-sm text-[#005b6b]">{profile?.username}</strong>
				<p className="mt-0.5 text-sm leading-snug text-[#64708a]">just passed the CCNA<br />mock exam!</p>
				<button className="mt-3 flex h-11 w-full items-center justify-center rounded-full bg-[#005b6b] text-sm font-bold text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-[#004653] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100">View result</button>
			</div>
		</div>
	);
}

function getQuizActionLabel(progress) {
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
			className={`inline-flex min-w-[88px] justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold tabular-nums ${secondsRemaining <= 60
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
					{module.tutorials.map((tutorial) => (
						<div key={tutorial.number} className="flex items-center gap-3 text-[15px] text-[#66738d]">
							<span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${tutorialProgress.has(tutorial.number) ? "border-[#005b6b] bg-[#005b6b] text-white" : "border-[#dce5f2] text-transparent"}`}>
								<Check size={13} strokeWidth={3} />
							</span>
							<span>{tutorial.number} {tutorial.title}</span>
						</div>
					))}
					<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e2ecec] pt-4">
						<span className="text-sm text-[#71819b]">
							{currentQuizProgress?.status === "completed" || currentQuizProgress?.status === "expired"
								? `${currentQuizProgress.status === "expired" ? "Time expired · " : ""}Last score: ${currentQuizProgress.score}/${moduleQuiz?.questions.length ?? 0}`
								: currentQuizProgress?.status === "in-progress"
									? "Quiz in progress"
									: `${moduleQuiz?.questions.length ?? 0}-question module quiz`}
						</span>
						<button
							type="button"
							onClick={() => onStartQuiz(module.number)}
							className="rounded-full bg-[#005b6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653]"
						>
							{getQuizActionLabel(currentQuizProgress)}
						</button>
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
	const [quizProgress] = useState(readCcnaModuleQuizProgress);
	const tutorialProgress = userId ? readCcnaTutorialProgress(userId) : new Set();
	const navigate = useNavigate();
	const { quizAverage, attemptedModules, quizCoverage } = getQuizMetrics(quizProgress);
	const activeModule = quizProgress.activeModule
		&& quizProgress.modules[quizProgress.activeModule]?.status === "in-progress"
		? quizProgress.activeModule
		: modules.find((module) => !["completed", "expired"].includes(quizProgress.modules[module.number]?.status))?.number ?? "1.0";
	const activeQuizProgress = quizProgress.modules[activeModule];
	const heroQuizLabel = getQuizActionLabel(activeQuizProgress);
	const completedModules = modules.filter((module) =>
		module.tutorials.length > 0 && module.tutorials.every((tutorial) => tutorialProgress.has(tutorial.number)),
	).length;
	const remainingModules = modules.length - completedModules;

	useEffect(() => {
		let timeoutId;
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

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			timeoutId = window.setTimeout(() => setTypedIntro(HERO_INTROS[0]), 0);
		} else {
			timeoutId = window.setTimeout(typeDescription, 150);
		}
		return () => window.clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		if (!isQuizPickerOpen) return undefined;

		function closeOnEscape(event) {
			if (event.key === "Escape") setIsQuizPickerOpen(false);
		}

		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, [isQuizPickerOpen]);

	function toggleModule(index) {
		setOpenSection((currentSection) => currentSection === index ? null : index);
	}

	function openModuleQuiz(moduleNumber) {
		if (!userId) return;
		beginCcnaModuleQuiz(moduleNumber);
		navigate(`/modules/programs/ccna/quiz/${moduleNumber}`);
	}

	return (
		<main className="ccna-page-enter min-h-screen bg-white text-[#071126]">
			<section className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 sm:px-10 lg:px-14 lg:pb-20 lg:pt-16">
				<div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] bg-[#f0f7f7] px-4 py-2 text-sm font-semibold text-[#005b6b]">
							<span className="h-2 w-2 rounded-full bg-[#005b6b]" /> Module {activeModule} · {modules.find((module) => module.number === activeModule)?.title}
						</div>
						<h1 className="max-w-[700px] text-[2.65rem] font-bold leading-[1.08] tracking-[-1.5px] sm:text-6xl lg:text-[3.25rem] xl:text-[3.7rem]">
							Continue your path to <span className="text-[#005b6b]">CCNA<br className="hidden sm:block" /> Certification.</span>
						</h1>
						<p className="typewriter-caret mt-6 min-h-[5.4rem] max-w-[555px] text-base leading-[1.8] text-[#66738d] sm:text-lg">
							{typedIntro}
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<button onClick={() => setIsQuizPickerOpen(true)} className="flex h-[58px] items-center gap-2 rounded-full bg-[#005b6b] px-7 text-base font-bold text-white shadow-[0_10px_20px_rgba(0,91,107,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#004653] hover:shadow-[0_14px_26px_rgba(0,91,107,0.24)] active:translate-y-0">{heroQuizLabel} <ArrowRight size={18} /></button>
							<Link to="/modules/programs/ccna/knowledge-hub" className="flex h-[58px] items-center rounded-full border border-[#005b6b] px-7 text-base font-bold text-[#005b6b] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#f0f7f7] hover:shadow-[0_10px_20px_rgba(0,91,107,0.12)] active:translate-y-0">View All Modules</Link>
						</div>
						<div className="mt-11 flex flex-wrap gap-5 divide-x divide-[#dce5f2]">
							<Stat value={`${attemptedModules}/6`} label="Quizzes attempted" />
							<div className="pl-5 sm:pl-7"><Stat value={`${quizAverage}%`} label="Quiz average" /></div>
							<div className="pl-5 sm:pl-7"><Stat value={remainingModules} label="Modules remaining" /></div>
						</div>
					</div>
					<NetworkIllustration quizAverage={quizAverage} />
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
							{modules.map((module, index) => <ModuleCard key={module.title} module={module} index={index} openSection={openSection} onToggle={toggleModule} quizProgress={quizProgress} tutorialProgress={tutorialProgress} onStartQuiz={openModuleQuiz} />)}
						</div>
					</div>

					<aside className="space-y-5">
						<div className="flex items-center gap-5 rounded-[18px] border border-[#d6e5e7] bg-white p-6">
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
							<div><strong className="text-lg">Quiz coverage</strong><p className="mt-1 text-sm text-[#7c89a1]">{attemptedModules} of 6 quizzes attempted</p></div>
						</div>
						<div className="rounded-[18px] border border-[#d6e5e7] bg-white p-6">
							<h2 className="mb-5 text-xl font-bold">Practice quizzes</h2>
							{modules.map((module) => {
								const moduleProgress = quizProgress.modules[module.number];
								return (
									<div key={module.number} className="flex items-center justify-between gap-3 border-b border-[#e2ecec] py-3 text-sm last:border-0">
										<div className="min-w-0">
											<span className="block truncate font-medium">{module.number} {module.title}</span>
											<strong className={moduleProgress?.status === "completed" || moduleProgress?.status === "expired" ? "text-[#005b6b]" : "text-[#8b96a9]"}>
												{moduleProgress?.status === "completed" || moduleProgress?.status === "expired" ? `${moduleProgress.score}/5` : getQuizActionLabel(moduleProgress)}
											</strong>
										</div>
										<button type="button" onClick={() => openModuleQuiz(module.number)} className="shrink-0 rounded-full border border-[#c9dfe2] px-3 py-1.5 text-xs font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4]">
											{getQuizActionLabel(moduleProgress)}
										</button>
									</div>
								);
							})}
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
		</main>
	);
}
