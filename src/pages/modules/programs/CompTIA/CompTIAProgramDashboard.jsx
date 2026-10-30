import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {
	ArrowLeft,
	ArrowRight,
	BookOpen,
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	CircleAlert,
	ClipboardList,
	Clock3,
	FileQuestion,
	ShieldCheck,
	X,
} from "lucide-react";
import { useAuth } from "../../../../context/auth-context";
import ProgramBackgroundParticles from "../ProgramBackgroundParticles";
import ScoreRotationCard from "../ScoreRotationCard";
import useGradebookQuizStats from "../useGradebookQuizStats";
import { isAnswerCorrect, isQuestionAnswered } from "../../../../utils/ccnaExamGrading";
import { getCcnaExamSessionKey } from "../../../../utils/ccnaShortExamSession";
import { readGradebookAssessments } from "../../../../utils/gradebookApi";

const STANDARD_EXAM_FORMATS = [
	{ key: "short", name: "Short Exam", questionCount: 50, durationSeconds: 45 * 60 },
	{ key: "medium", name: "Medium Exam", questionCount: 100, durationSeconds: 90 * 60 },
	{ key: "long", name: "Long Exam", questionCount: 150, durationSeconds: 120 * 60 },
];

function formatExamTime(totalSeconds) {
	const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
	const seconds = (totalSeconds % 60).toString().padStart(2, "0");
	return `${minutes}:${seconds}`;
}

function readCompTIAExamProgress(programKey, format, userId, now) {
	const emptyProgress = { status: "not-started", deadline: null, answeredCount: 0, score: 0, maxScore: 0 };
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		return emptyProgress;
	}

	let savedSession;
	try {
		const sessionKey = getCcnaExamSessionKey(`matekk-${programKey}-${format.key}-exam-session`, userId);
		savedSession = window.sessionStorage.getItem(sessionKey);
	} catch (error) {
		console.error(`Unable to read ${format.name} progress for ${programKey}.`, error);
		return { ...emptyProgress, status: "unavailable" };
	}
	if (!savedSession) return emptyProgress;

	try {
		const session = JSON.parse(savedSession);
		if (
			!session ||
			!Array.isArray(session.questions) ||
			!session.answers ||
			typeof session.answers !== "object" ||
			Array.isArray(session.answers) ||
			typeof session.isSubmitted !== "boolean" ||
			(format.durationSeconds === null ? session.deadline !== null : !Number.isFinite(session.deadline))
		) {
			throw new TypeError(`Saved ${format.name} progress has an invalid structure.`);
		}

		const isExpired = format.durationSeconds !== null && session.deadline <= now;
		return {
			status: isExpired ? "expired" : session.isSubmitted ? "completed" : "in-progress",
			deadline: isExpired || session.isSubmitted ? null : session.deadline,
			answeredCount: session.questions.filter((question, index) =>
				isQuestionAnswered(question, session.answers[index]),
			).length,
			score: session.questions.reduce(
				(total, question, index) => total + Number(isAnswerCorrect(question, session.answers[index])),
				0,
			),
			maxScore: session.questions.length,
		};
	} catch (error) {
		console.error(`Unable to restore ${format.name} progress for ${programKey}.`, error);
		return { ...emptyProgress, status: "unavailable" };
	}
}

function ModuleCard({ module, index, isOpen, onToggle }) {
	return (
		<article className="overflow-hidden rounded-[18px] border border-[#ead7dc] bg-white transition-[transform,box-shadow,border-color] duration-200 ease-out hover:z-10 hover:scale-[1.01] hover:border-[#c8102e]/40 hover:shadow-[0_10px_24px_rgba(200,16,46,0.1)] motion-reduce:transition-none motion-reduce:hover:scale-100">
			<button
				type="button"
				onClick={onToggle}
				aria-expanded={isOpen}
				aria-controls={`comptia-module-content-${index}`}
				className="flex min-h-[92px] w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
			>
				<span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#f0cbd3] bg-[#fff1f3] text-lg font-semibold text-[#c8102e]">
					<span
						aria-hidden="true"
						className="absolute inset-x-0 bottom-0 bg-[#c8102e]/10 transition-[height] duration-500 ease-out"
						style={{ height: isOpen ? "100%" : "0%" }}
					/>
					<span className="relative z-10">{String(index + 1).padStart(2, "0")}</span>
				</span>
				<span className="min-w-0 flex-1">
					<strong className="block text-base text-[#111a2d] sm:text-[17px]">{module.title}</strong>
					<span className="mt-1 block text-sm text-[#8a96aa]">{module.weight} of exam objectives</span>
				</span>
				{isOpen
					? <ChevronDown className="shrink-0 text-[#c8102e]" size={19} />
					: <ChevronRight className="shrink-0 text-[#91a0b9]" size={19} />}
			</button>
			<div
				id={`comptia-module-content-${index}`}
				aria-hidden={!isOpen}
				inert={!isOpen}
				className={`course-module-fold${isOpen ? " is-open" : ""}`}
			>
				<div className="course-module-fold-inner">
					<div className="space-y-5 border-t border-[#f2e3e6] px-6 pb-6 pt-5 sm:pl-[91px]">
						<p className="text-sm leading-6 text-[#66738d]">{module.description}</p>
						<ul className="grid gap-3 sm:grid-cols-2">
							{module.topics.map((topic) => (
								<li key={topic} className="flex items-start gap-2.5 text-sm leading-6 text-[#53617a]">
									<Check className="mt-1 shrink-0 text-[#c8102e]" size={16} strokeWidth={2.5} />
									<span>{topic}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</article>
	);
}

export default function CompTIAProgramDashboard({ program }) {
	const { profile } = useAuth();
	const navigate = useNavigate();
	const isNetworkPlus = program.programKey === "comptia-network-plus";
	const includesAllQuestionsExam = isNetworkPlus || program.includeAllQuestionsExam === true;
	const { stats: gradebookScoreStats } = useGradebookQuizStats(
		program.programKey,
		profile?.userId,
		program.modules,
		0,
		0,
	);
	const [typedIntro, setTypedIntro] = useState("");
	const [openModule, setOpenModule] = useState(null);
	const [hasScrolled, setHasScrolled] = useState(false);
	const [isExamPickerOpen, setIsExamPickerOpen] = useState(false);
	const [selectedExamFormat, setSelectedExamFormat] = useState(null);
	const [retakeExamFormat, setRetakeExamFormat] = useState(null);
	const [examResultsState, setExamResultsState] = useState({ userId: null, assessments: [], error: null, loading: false });
	const [examCardIndex, setExamCardIndex] = useState(0);
	const [isExamCardOpen, setIsExamCardOpen] = useState(true);
	const [progressSlide, setProgressSlide] = useState(0);
	const [examClockNow, setExamClockNow] = useState(Date.now);
	const progressTouchStart = useRef(null);
	const examFormats = useMemo(() => {
		const hasSimulations = ["comptia-network-plus", "comptia-security-plus"].includes(program.programKey);
		const allQuestionsSimulationDescription = hasSimulations
			? " Unscored simulation review questions from the question bank are appended at the end."
			: "";
		return [
		{ name: "Short Exam", key: "short", length: "Short", questions: 50, duration: "45 mins", description: "A quick practice session." },
		{ name: "Medium Exam", key: "medium", length: "Medium", questions: 100, duration: "1 hour & 30 mins", description: "A balanced, longer practice session." },
		{ name: "Long Exam", key: "long", length: "Long", questions: 150, duration: "2 hours", description: "A full-length practice session." },
		...(includesAllQuestionsExam
			? [{ name: "All Questions Exam", key: "all_questions", length: "All questions", questions: "All", duration: "No time limit", description: `Every question from the ${program.title} question bank, in random order.${allQuestionsSimulationDescription}` }]
			: []),
		];
	}, [includesAllQuestionsExam, program.programKey, program.title]);
	const progressExamFormats = [
		...STANDARD_EXAM_FORMATS,
		...(includesAllQuestionsExam
			? [{ key: "all_questions", name: "All Questions Exam", questionCount: null, durationSeconds: null }]
			: []),
	];
	const examProgress = progressExamFormats.map((format) => ({
		format,
		progress: readCompTIAExamProgress(program.programKey, format, profile?.userId, examClockNow),
	}));
	const examCardFormat = examFormats[examCardIndex % examFormats.length];
	const examCardProgress = examProgress.find(({ format }) => format.key === examCardFormat.key)?.progress;
	const hasActiveTimedExam = examProgress.some(({ format, progress }) =>
		format.durationSeconds !== null && progress.status === "in-progress",
	);
	const examResults = useMemo(() => {
		const assessments = examResultsState.userId === profile?.userId ? examResultsState.assessments : [];
		return Object.fromEntries(examFormats.map((format) => {
			const result = assessments
				.filter((assessment) =>
					assessment.type === "exam" &&
					(assessment.examFormat === format.key ||
						assessment.title === `${format.name} · CompTIA ${program.title}` ||
						assessment.title === format.name),
				)
				.sort((first, second) => second.submittedAt - first.submittedAt)[0];
			return [format.key, result ?? null];
		}));
	}, [examFormats, examResultsState.assessments, examResultsState.userId, profile?.userId, program.title]);

	useEffect(() => {
		if (!isExamPickerOpen || !profile?.userId) return undefined;
		let isActive = true;
		readGradebookAssessments(program.programKey, profile.userId)
			.then((assessments) => {
				if (isActive) setExamResultsState({ userId: profile.userId, assessments, error: null, loading: false });
			})
			.catch((error) => {
				console.error(`Unable to load ${program.programKey} exam results.`, error);
				if (isActive) {
					setExamResultsState((current) => ({
						userId: profile.userId,
						assessments: current.userId === profile.userId ? current.assessments : [],
						error: error instanceof Error ? error.message : "Exam results could not be loaded.",
						loading: false,
					}));
				}
			});
		return () => {
			isActive = false;
		};
	}, [isExamPickerOpen, profile?.userId, program.programKey]);

	useEffect(() => {
		const updateBackButtonVisibility = () => setHasScrolled(window.scrollY > 120);
		updateBackButtonVisibility();
		window.addEventListener("scroll", updateBackButtonVisibility, { passive: true });
		return () => window.removeEventListener("scroll", updateBackButtonVisibility);
	}, []);

	useEffect(() => {
		if (!hasActiveTimedExam) return undefined;
		const intervalId = window.setInterval(() => setExamClockNow(Date.now()), 1000);
		return () => window.clearInterval(intervalId);
	}, [hasActiveTimedExam]);

	useEffect(() => {
		let timeoutId;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			timeoutId = window.setTimeout(() => setTypedIntro(program.intros[0]), 0);
			return () => window.clearTimeout(timeoutId);
		}

		let introIndex = 0;
		let characterIndex = 0;

		function typeDescription() {
			const description = program.intros[introIndex];
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
			setTypedIntro(program.intros[introIndex].slice(0, characterIndex));
			if (characterIndex > 0) {
				timeoutId = window.setTimeout(eraseDescription, 8);
			} else {
				introIndex = (introIndex + 1) % program.intros.length;
				timeoutId = window.setTimeout(typeDescription, 120);
			}
		}

		timeoutId = window.setTimeout(typeDescription, 150);
		return () => window.clearTimeout(timeoutId);
	}, [program]);

	useEffect(() => {
		if (!isExamPickerOpen) return undefined;

		function closeOnEscape(event) {
			if (event.key === "Escape") setIsExamPickerOpen(false);
		}

		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, [isExamPickerOpen]);

	function openExamPicker() {
		setSelectedExamFormat(null);
		setExamResultsState((current) => ({
			userId: profile?.userId ?? null,
			assessments: current.userId === profile?.userId ? current.assessments : [],
			error: null,
			loading: Boolean(profile?.userId),
		}));
		setIsExamPickerOpen(true);
	}

	return (
		<main className="program-faceted-page ccna-page-enter comptia-program-page relative min-h-screen w-full min-w-0 overflow-x-clip bg-white text-[#071126]">
			{createPortal(
				<Link
					to="/pages/blank"
					className={`fixed left-4 top-24 z-40 flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-[#c8102e] transition hover:text-[#a80e27] active:scale-95 ${hasScrolled ? "bg-white/90 shadow-md backdrop-blur-sm" : "bg-white/80"}`}
				>
					<ArrowLeft size={20} strokeWidth={2.5} /> Back to Courses
				</Link>,
				document.body,
			)}

			<ProgramBackgroundParticles className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 sm:px-10 lg:px-14 lg:pb-20 lg:pt-16">
				<div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-4">
					<div className="contents sm:block">
						<div className="order-1 min-w-0 sm:order-none">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f0cbd3] bg-[#fff5f6] px-4 py-2 text-sm font-semibold text-[#b20d29]">
								<span className="h-2 w-2 rounded-full bg-[#c8102e]" />
								CompTIA · {program.title} Certification
							</div>
							<h1 className="max-w-[700px] text-[2rem] font-bold leading-[1.12] tracking-[-1px] sm:text-6xl sm:leading-[1.08] sm:tracking-[-1.5px] lg:text-[3.25rem] xl:text-[3.7rem]">
								{program.headline} <span className="text-[#c8102e]">{program.highlight}</span>
							</h1>
							<p className="typewriter-caret mt-6 min-h-[5.4rem] max-w-[555px] text-base leading-[1.8] text-[#66738d] sm:text-lg">
								{typedIntro}
							</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<button
									type="button"
									onClick={openExamPicker}
									className="flex h-12 items-center gap-2 rounded-full bg-[#c8102e] px-5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(200,16,46,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#a80e27] hover:shadow-[0_14px_26px_rgba(200,16,46,0.24)] active:translate-y-0 sm:h-[58px] sm:px-7 sm:text-base"
								>
									Start Exam <ArrowRight size={18} />
								</button>
								<button
									type="button"
									disabled
									aria-label="Start Quiz (coming soon)"
									className="flex h-12 cursor-not-allowed items-center gap-2 rounded-full bg-[#c8102e] px-5 text-sm font-bold text-white opacity-40 sm:h-[58px] sm:px-7 sm:text-base"
								>
									Start Quiz <ArrowRight size={18} />
								</button>
								<button
									type="button"
									disabled
									aria-label="View All Modules (coming soon)"
									className="flex h-12 cursor-not-allowed items-center gap-2 rounded-full border border-[#c8102e] px-5 text-sm font-bold text-[#c8102e] opacity-40 sm:h-[58px] sm:px-7 sm:text-base"
								>
									View All Modules <ArrowRight size={18} />
								</button>
							</div>
						</div>
						<div className="order-3 mt-8 grid w-full min-w-0 max-w-[810px] grid-cols-3 overflow-hidden rounded-2xl border border-[#ead7dc] bg-white shadow-[0_12px_28px_rgba(200,16,46,0.08)] sm:mt-11">
							<div className="program-stat-item flex min-w-0 flex-col items-center justify-center gap-1 border-r border-[#f0dfe3] px-1 py-4 text-center sm:flex-row sm:gap-3 sm:px-4 sm:py-5 sm:text-left">
								<strong className="text-xl leading-none tracking-tight text-[#071126] sm:text-[2rem]">0/{program.modules.length}</strong>
								<span className="text-[11px] leading-tight text-[#6f7d99] sm:text-sm">Quizzes<br />completed</span>
							</div>
							<div className="program-stat-item flex min-w-0 flex-col items-center justify-center gap-1 border-r border-[#f0dfe3] px-1 py-4 text-center sm:flex-row sm:gap-3 sm:px-4 sm:py-5 sm:text-left">
								<strong className="text-xl leading-none tracking-tight text-[#071126] sm:text-[2rem]">0/3</strong>
								<span className="text-[11px] leading-tight text-[#6f7d99] sm:text-sm">Exams<br />completed</span>
							</div>
							<div className="program-stat-item flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-4 text-center sm:flex-row sm:gap-3 sm:px-4 sm:py-5 sm:text-left">
								<strong className="text-xl leading-none tracking-tight text-[#071126] sm:text-[2rem]">{program.modules.length}</strong>
								<span className="text-[11px] leading-tight text-[#6f7d99] sm:text-sm">Modules<br />left</span>
							</div>
						</div>
					</div>

					<div className="relative order-2 mx-auto flex h-[320px] w-full min-w-0 max-w-[440px] items-center justify-center sm:order-none sm:h-[380px] sm:max-w-[470px]">
						<div
							aria-hidden="true"
							className="comptia-logo-circle absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff0f2] sm:h-[356px] sm:w-[356px]"
						/>
						<img
							src={program.badge}
							alt={`${program.title} certification badge`}
							className="relative z-10 h-[210px] w-[210px] object-contain transition-transform duration-300 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:h-[270px] sm:w-[270px]"
						/>
						<ScoreRotationCard
							quizScore={gradebookScoreStats.average}
							examScore={gradebookScoreStats.examAverage}
							accentClassName="text-[#c8102e]"
						/>
						<Link
							to={program.gradebookPath}
							aria-label={`Open ${program.title} gradebook`}
							title="Gradebook"
							className="absolute right-[12%] top-[2%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#c8102e] shadow-[0_8px_20px_rgba(15,35,75,0.1)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
						>
							<ClipboardList size={21} />
						</Link>
						<button
							type="button"
							onClick={() => setIsExamCardOpen((isOpen) => !isOpen)}
							aria-label={isExamCardOpen ? "Close exam notification" : `Open ${examFormats[examCardIndex].name} notification`}
							aria-expanded={isExamCardOpen}
							className="absolute bottom-2 right-2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#c8102e] shadow-[0_8px_20px_rgba(15,35,75,0.1)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
						>
							<FileQuestion size={21} />
						</button>
						<div
							key={examCardIndex}
							className={`ccna-notification-boink absolute bottom-0 right-0 z-30 w-[210px] flex-col rounded-2xl border border-[#f1e2e5] bg-white p-3 shadow-[0_14px_28px_rgba(15,35,75,0.1)] transition-transform duration-200 ease-out hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:right-[-2%] sm:w-[275px] sm:p-4 ${isExamCardOpen ? "flex" : "hidden"}`}
						>
							<button
								type="button"
								onClick={() => setIsExamCardOpen(false)}
								aria-label="Close exam notification"
								className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#64708a] transition hover:bg-[#fff1f3] hover:text-[#c8102e]"
							>
								<X size={16} />
							</button>
							<button
								type="button"
								onClick={() => setExamCardIndex((index) => (index + 1) % examFormats.length)}
								aria-label={`Show next exam notification. Showing ${examFormats[examCardIndex].name}, ${examCardIndex + 1} of ${examFormats.length}.`}
								className="block w-full rounded-lg pr-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8102e]"
							>
								<div className="flex items-center justify-between gap-2">
									<strong className="truncate text-sm text-[#c8102e]">{profile?.username ?? "Student"}</strong>
									<span className="text-xs font-semibold text-[#7c89a1]">{examCardIndex + 1}/{examFormats.length}</span>
								</div>
								<p className="mt-0.5 text-sm leading-snug text-[#64708a]">
									{examCardProgress?.status === "expired"
										? `Time expired for the ${examCardFormat.name.toLowerCase()}.`
										: examCardProgress?.status === "in-progress"
											? `You're taking the ${examCardFormat.name.toLowerCase()}.`
											: `You haven't taken the ${examCardFormat.name.toLowerCase()} yet.`}
									{examCardProgress?.status === "expired" && (
										<span role="status" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#fff0ed] px-2.5 py-1 text-xs font-bold text-[#b42318]">
											<CircleAlert size={14} /> Time expired
										</span>
									)}
									<span className="mt-1 block text-xs text-[#7c89a1]">Click to see the next exam update</span>
								</p>
							</button>
							<button
								type="button"
								onClick={() => {
									if (examCardProgress?.status === "expired") {
										setSelectedExamFormat(examCardFormat.name);
										setIsExamPickerOpen(true);
										return;
									}
									openExamPicker();
								}}
								className="mt-3 flex h-10 w-full items-center justify-center rounded-full bg-[#c8102e] text-sm font-bold text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-[#a80e27] active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:h-11"
							>
								{examCardProgress?.status === "expired" ? "View Result" : `Start ${examCardFormat.length.toLowerCase()} exam`}
							</button>
						</div>
					</div>
				</div>
			</ProgramBackgroundParticles>

			<div className="bg-[#fff1f3] py-10 text-center sm:py-12">
				<p className="mx-auto max-w-4xl px-6 text-xl font-bold tracking-tight text-[#111827] sm:text-2xl">
					{program.banner.before}
					<span className="text-[#c8102e]"> {program.banner.highlight}</span>
				</p>
			</div>

			<section id="program-modules" className="scroll-mt-8 bg-[#fff9fa]">
				<div className="mx-auto grid w-full min-w-0 max-w-[1440px] grid-cols-1 gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-14 lg:py-14">
					<div className="min-w-0">
						<div className="mb-6 flex flex-wrap items-center justify-between gap-2">
							<h2 className="text-xl font-bold text-[#111827] sm:text-[21px]">Course modules</h2>
							<span className="text-sm text-[#7c89a1]">0 of {program.modules.length} quizzes completed</span>
						</div>
						<div className="space-y-3">
							{program.modules.map((module, index) => (
								<ModuleCard
									key={module.title}
									module={module}
									index={index}
									isOpen={openModule === index}
									onToggle={() => setOpenModule((current) => current === index ? null : index)}
								/>
							))}
						</div>
					</div>

					<aside className="min-w-0 space-y-5">
						<div
							className="overflow-hidden rounded-[18px] border border-[#ead7dc] bg-white touch-pan-y"
							onTouchStart={(event) => {
								const touch = event.changedTouches[0];
								progressTouchStart.current = { x: touch.clientX, y: touch.clientY };
							}}
							onTouchEnd={(event) => {
								const start = progressTouchStart.current;
								progressTouchStart.current = null;
								if (!start) return;
								const touch = event.changedTouches[0];
								const deltaX = touch.clientX - start.x;
								const deltaY = touch.clientY - start.y;
								if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
								setProgressSlide(deltaX < 0 ? 1 : 0);
							}}
						>
							<div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${progressSlide * 100}%)` }}>
								<div className="flex w-full shrink-0 items-center gap-5 p-6">
									<div
										role="progressbar"
										aria-label={`${program.title} quiz coverage`}
										aria-valuemin={0}
										aria-valuemax={100}
										aria-valuenow={0}
										className="relative h-16 w-16 shrink-0 rounded-full"
										style={{ background: "conic-gradient(#c8102e 0%, #f1cbd2 0)" }}
									>
										<span className="absolute inset-[7px] flex items-center justify-center rounded-full bg-white text-xs font-bold text-[#c8102e]">0%</span>
									</div>
									<div className="min-w-0">
										<strong className="text-lg">Quiz coverage</strong>
										<p className="mt-1 text-sm text-[#7c89a1]">0 of {program.modules.length} quizzes attempted</p>
									</div>
								</div>
								{(() => {
									const shortExam = examProgress[0].progress;
									const percent = shortExam.status === "completed"
										? 100
										: shortExam.maxScore > 0
											? Math.round((shortExam.answeredCount / shortExam.maxScore) * 100)
											: 0;
									return (
										<div className="flex w-full shrink-0 items-center gap-5 p-6">
											<div
												role="progressbar"
												aria-label={`${program.title} short exam progress`}
												aria-valuemin={0}
												aria-valuemax={100}
												aria-valuenow={percent}
												className="relative h-16 w-16 shrink-0 rounded-full"
												style={{ background: `conic-gradient(#c8102e ${percent}%, #f1cbd2 0)` }}
											>
												<span className="absolute inset-[7px] flex items-center justify-center rounded-full bg-white text-xs font-bold text-[#c8102e]">{percent}%</span>
											</div>
											<div className="min-w-0">
												<strong className="text-lg">Exam progress</strong>
												<p className={`mt-1 text-sm ${shortExam.status === "expired" ? "font-semibold text-[#b42318]" : "text-[#7c89a1]"}`}>
													{shortExam.status === "completed"
														? `Completed · Score ${shortExam.score}/${shortExam.maxScore}`
														: shortExam.status === "expired"
															? `Time expired · Score ${shortExam.score}/${shortExam.maxScore}`
															: shortExam.status === "in-progress"
																? `${shortExam.answeredCount} of ${shortExam.maxScore} answered`
																: shortExam.status === "unavailable"
																	? "Progress unavailable"
																	: "Short Exam · Not started"}
													{shortExam.status === "expired" && (
														<span role="img" aria-label="Exam time expired" className="ml-1.5 inline-flex h-5 w-5 align-middle items-center justify-center rounded-full bg-[#dc2626] text-white shadow-sm">
															<CircleAlert size={15} strokeWidth={2.5} />
														</span>
													)}
												</p>
												{shortExam.status === "in-progress" && Number.isFinite(shortExam.deadline) && (
													<p className={`mt-1 text-xs font-bold tabular-nums ${shortExam.deadline - examClockNow <= 60000 ? "text-[#b42318]" : "text-[#c8102e]"}`}>
														{formatExamTime(Math.max(0, Math.ceil((shortExam.deadline - examClockNow) / 1000)))} remaining
													</p>
												)}
											</div>
										</div>
									);
								})()}
							</div>
							<div className="flex h-8 items-center justify-center gap-2 pb-2" aria-label="Progress panels">
								<button type="button" onClick={() => setProgressSlide(0)} disabled={progressSlide === 0} aria-label="Show quiz coverage" className="hidden rounded-full p-1 text-[#c8102e] transition hover:bg-[#fff1f3] disabled:cursor-default disabled:opacity-30 sm:inline-flex"><ChevronLeft size={16} /></button>
								<div className="flex items-center gap-2">
									<button type="button" onClick={() => setProgressSlide(0)} aria-label="Show quiz coverage" aria-current={progressSlide === 0 ? "true" : undefined} className={`h-2 rounded-full transition-all ${progressSlide === 0 ? "w-6 bg-[#c8102e]" : "w-2 bg-[#cbd5e1]"}`} />
									<button type="button" onClick={() => setProgressSlide(1)} aria-label="Show exam progress" aria-current={progressSlide === 1 ? "true" : undefined} className={`h-2 rounded-full transition-all ${progressSlide === 1 ? "w-6 bg-[#c8102e]" : "w-2 bg-[#cbd5e1]"}`} />
								</div>
								<button type="button" onClick={() => setProgressSlide(1)} disabled={progressSlide === 1} aria-label="Show exam progress" className="hidden rounded-full p-1 text-[#c8102e] transition hover:bg-[#fff1f3] disabled:cursor-default disabled:opacity-30 sm:inline-flex"><ChevronRight size={16} /></button>
							</div>
						</div>
						<div className="min-w-0 overflow-hidden rounded-[18px] border border-[#ead7dc] bg-white p-4 sm:p-6">
							{progressSlide === 0 ? (
								<>
									<h2 className="mb-5 text-xl font-bold">Practice quizzes</h2>
									{program.modules.map((module) => (
										<div key={module.number} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[#e2ecec] py-3 text-sm last:border-0">
											<div className="min-w-0">
												<span className="block truncate font-medium">{module.number} {module.title}</span>
												<strong className="mt-0.5 block text-[#8b96a9]">Quiz coming soon</strong>
											</div>
											<button
												type="button"
												disabled
												aria-label={`${module.title} quiz coming soon`}
												className="rounded-full border border-[#ead7dc] px-3 py-1.5 text-xs font-semibold text-[#8b96a9] disabled:cursor-not-allowed disabled:opacity-70"
											>
												Coming soon
											</button>
										</div>
									))}
								</>
							) : (
								<>
									<h2 className="mb-5 text-xl font-bold">Exam progress</h2>
									{examProgress.map(({ format, progress }) => {
										const progressPercent = progress.status === "completed"
											? 100
											: progress.maxScore > 0
												? Math.round((progress.answeredCount / progress.maxScore) * 100)
												: 0;
										const questionLabel = format.questionCount === null
											? `${progress.maxScore || "All"} questions`
											: `${format.questionCount} questions`;
										const statusText = progress.status === "completed"
											? `Completed · Score ${progress.score}/${progress.maxScore}`
											: progress.status === "expired"
												? `Time expired · Score ${progress.score}/${progress.maxScore}`
												: progress.status === "in-progress"
													? `${progress.answeredCount}/${progress.maxScore} answered`
													: progress.status === "unavailable"
														? "Progress unavailable"
														: "Not started";
										return (
											<div key={format.key} className="border-b border-[#e2ecec] py-3 last:border-0">
												<div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
													<div className="min-w-0">
														<span className="block truncate text-sm font-medium">{format.name}</span>
														<span className="mt-0.5 block text-xs text-[#7c89a1]">{questionLabel}</span>
														<strong className={`mt-1 block text-sm ${progress.status === "expired" ? "text-[#b42318]" : progress.status === "not-started" || progress.status === "unavailable" ? "text-[#8b96a9]" : "text-[#c8102e]"}`}>
															{statusText}
															{progress.status === "expired" && (
																<span className="group/exam-expired relative ml-1.5 inline-flex align-middle">
																	<span role="img" aria-label="Exam time expired" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-sm">
																		<CircleAlert size={15} strokeWidth={2.5} />
																	</span>
																	<span role="tooltip" className="pointer-events-none absolute bottom-full left-0 z-20 mb-1 w-max max-w-[240px] rounded-md bg-[#071126] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover/exam-expired:opacity-100">
																		Time is up — retake the exam to try again.
																	</span>
																</span>
															)}
														</strong>
													</div>
													<div className="flex min-h-[58px] min-w-[112px] flex-col items-end justify-between">
														<div className="flex h-6 items-center justify-end">
															{progress.status === "in-progress" && Number.isFinite(progress.deadline) && (
																<span role="timer" aria-label={`${formatExamTime(Math.max(0, Math.ceil((progress.deadline - examClockNow) / 1000)))} remaining`} className={`inline-flex min-w-[88px] justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold tabular-nums ${progress.deadline - examClockNow <= 60000 ? "bg-[#fff0ed] text-[#b42318]" : "bg-[#fff1f3] text-[#c8102e]"}`}>
																	{formatExamTime(Math.max(0, Math.ceil((progress.deadline - examClockNow) / 1000)))} left
																</span>
															)}
														</div>
														{progress.status === "in-progress" && (
															<button
																type="button"
																onClick={() => navigate(`/modules/programs/${program.programKey}/exam/${format.key}`)}
																className="rounded-full border border-[#f1cbd2] px-3 py-1.5 text-xs font-semibold text-[#c8102e] transition hover:bg-[#fff1f3]"
															>
																Continue Exam
															</button>
														)}
													</div>
												</div>
												{progress.status !== "not-started" && progress.status !== "unavailable" && (
													<div role="progressbar" aria-label={`${format.name} completion`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent} className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f1cbd2]">
														<div className="h-full rounded-full bg-[#c8102e] transition-[width]" style={{ width: `${progressPercent}%` }} />
													</div>
												)}
											</div>
										);
									})}
								</>
							)}
						</div>
						<div className="rounded-[18px] border border-[#ead7dc] bg-white p-6">
							<div className="mb-4 flex items-center gap-3">
								<BookOpen className="text-[#c8102e]" size={21} />
								<h2 className="text-xl font-bold text-[#111827]">Program Overview</h2>
							</div>
							<p className="text-sm leading-6 text-[#7c89a1]">{program.overview}</p>
							<h3 className="mb-3 mt-5 text-xs font-bold uppercase tracking-wide text-[#7c89a1]">Learning focus</h3>
							<ul className="space-y-3">
								{program.focusAreas.map((area) => (
									<li key={area} className="flex items-center gap-3 text-sm font-medium text-[#334454]">
										<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff1f3] text-[#c8102e]">
											<ShieldCheck size={17} />
										</span>
										{area}
									</li>
								))}
							</ul>
							<p className="mt-5 flex items-center gap-2 border-t border-[#f2e3e6] pt-4 text-xs text-[#7c89a1]">
								<Clock3 size={15} className="text-[#c8102e]" />
								{program.modules.length} domains · Self-paced study
							</p>
							<Link
								to={program.coursePath}
								className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-[#c8102e] px-5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(200,16,46,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#a80e27] hover:shadow-[0_14px_26px_rgba(200,16,46,0.24)] active:translate-y-0 motion-reduce:transition-none"
							>
								View Course Outline <ArrowRight size={17} />
							</Link>
						</div>
						<div className="overflow-hidden rounded-[18px] border border-[#ead7dc] bg-white p-3">
							<img src={program.badge} alt="" className="mx-auto h-44 w-full object-contain" />
							<p className="pb-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#7c89a1]">
								Official CompTIA certification
							</p>
						</div>
					</aside>
				</div>
			</section>
			{isExamPickerOpen && createPortal(
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center overflow-x-hidden overflow-y-auto bg-[#071126]/55 p-2 backdrop-blur-sm sm:p-4"
					onMouseDown={(event) => {
						if (event.target === event.currentTarget) setIsExamPickerOpen(false);
					}}
				>
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="comptia-exam-picker-title"
						className="ccna-page-enter my-auto max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-3xl overflow-y-auto rounded-3xl bg-white p-3 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:w-full sm:overflow-y-visible sm:p-6"
					>
						<header className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm font-semibold text-[#c8102e]">CompTIA {program.title} practice</p>
								<h2 id="comptia-exam-picker-title" className="mt-1 text-xl font-bold text-[#071126] sm:text-2xl">
									Choose an exam format
								</h2>
							</div>
							<button
								type="button"
								onClick={() => setIsExamPickerOpen(false)}
								aria-label="Close exam selection"
								className="rounded-full p-2 text-[#71819b] transition hover:bg-[#fff1f3] hover:text-[#c8102e]"
							>
								<X size={20} />
							</button>
						</header>
						<p className="mt-3 text-sm leading-6 text-[#71819b]">
							{includesAllQuestionsExam
								? `The first three formats randomly select questions. All Questions Exam goes through every question from the ${program.title} question bank in random order, with no time limit.`
								: `Each exam randomly selects a set of questions from the CompTIA ${program.title} question bank. Choose the question count and time limit for your practice session.`}
						</p>
						{examResultsState.error && examResultsState.userId === profile?.userId && (
							<p role="alert" className="mt-3 rounded-xl border border-[#f2c6c3] bg-[#fff8f7] px-4 py-3 text-sm text-[#b42318]">
								Exam results could not be refreshed. {examResultsState.error}
							</p>
						)}
						<div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
							{examFormats.map((format) => {
								const isSelected = selectedExamFormat === format.name;
								const activeProgress = examProgress.find(({ format: progressFormat }) => progressFormat.key === format.key)?.progress;
								const remainingSeconds = activeProgress?.status === "in-progress" && Number.isFinite(activeProgress.deadline)
									? Math.max(0, Math.ceil((activeProgress.deadline - examClockNow) / 1000))
									: null;
								return (
									<button
										key={format.name}
										type="button"
										aria-pressed={isSelected}
										onClick={() => setSelectedExamFormat(format.name)}
										className={`min-w-0 rounded-2xl border p-3 text-left transition-colors sm:p-4 ${isSelected ? "border-[#c8102e] bg-[#fff1f3] text-[#c8102e]" : "border-[#ead7dc] text-[#263654] hover:border-[#e29aa8]"}`}
									>
										<span className="flex min-h-7 items-start justify-between gap-1">
											<span className="text-sm font-bold leading-5 sm:text-base">{format.name}</span>
											{remainingSeconds !== null && (
												<span
													role="timer"
													aria-label={`${formatExamTime(remainingSeconds)} remaining`}
													className={`inline-flex shrink-0 justify-center whitespace-nowrap rounded-full px-1.5 py-1 text-[9px] font-bold tabular-nums sm:px-2.5 sm:text-[11px] ${remainingSeconds <= 60 ? "bg-[#fff0ed] text-[#b42318]" : "bg-[#fff1f3] text-[#c8102e]"}`}
												>
													{formatExamTime(remainingSeconds)} left
												</span>
											)}
										</span>
										<span className="mt-1 block text-2xl font-extrabold sm:mt-2 sm:text-3xl">{format.questions}</span>
										<span className="block text-xs font-medium text-[#71819b] sm:text-sm">questions</span>
										<span className="mt-2 flex items-center gap-1 text-[11px] font-semibold sm:mt-3 sm:gap-1.5 sm:text-sm">
											<Clock3 size={15} /> {format.duration}
										</span>
										<span className="mt-1 block text-[11px] leading-4 text-[#71819b] sm:text-xs">{format.description}</span>
									</button>
								);
							})}
						</div>
						<div className="mt-3 flex flex-col gap-2 rounded-xl bg-[#fff9fa] p-3 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:p-4">
							<div className="min-w-0 sm:pr-3" aria-live="polite">
								{selectedExamFormat ? (() => {
									const selectedFormat = examFormats.find((format) => format.name === selectedExamFormat);
									const selectedProgress = examProgress.find(({ format }) => format.key === selectedFormat?.key)?.progress;
									const latestResult = selectedFormat ? examResults[selectedFormat.key] : null;
									const result = latestResult ?? (
										["completed", "expired"].includes(selectedProgress?.status) && selectedProgress.maxScore > 0
											? { score: selectedProgress.score, maxScore: selectedProgress.maxScore, submittedAt: null }
											: null
									);
									return (
										<>
											<p className="text-sm text-[#526584]">
												{selectedFormat.questions === "All" ? "All" : selectedFormat.questions} {selectedFormat.questions === "All" ? "" : "scored "}
												{selectedFormat.questions === 1 ? "question" : "questions"}
												{selectedFormat.key === "all_questions" && ["comptia-network-plus", "comptia-security-plus"].includes(program.programKey) && ", including unscored simulations"}
												{" · "}{selectedFormat.duration} · CompTIA {program.title} practice questions
											</p>
											{result && (
												<p className="mt-1 text-sm font-semibold text-[#c8102e]">
													Last result: {result.score}/{result.maxScore}
													{" · "}
													{Math.round((result.score / result.maxScore) * 100)}%
												</p>
											)}
											{examResultsState.loading && !latestResult && !result && (
												<p className="mt-1 text-xs text-[#71819b]">Loading previous results…</p>
											)}
										</>
									);
								})() : (
									<p className="text-sm text-[#71819b]">Select an exam format to continue.</p>
								)}
							</div>
							{selectedExamFormat && (
								(() => {
									const selectedFormat = examFormats.find((format) => format.name === selectedExamFormat);
									const selectedProgress = examProgress.find(({ format }) => format.key === selectedFormat?.key)?.progress;
									const latestResult = selectedFormat ? examResults[selectedFormat.key] : null;
									const hasResult = Boolean(latestResult) ||
										(["completed", "expired"].includes(selectedProgress?.status) && selectedProgress.maxScore > 0);
									if (!selectedFormat || !selectedProgress) return null;
									const examPath = `/modules/programs/${program.programKey}/exam/${selectedFormat.key}`;
									if (selectedProgress.status === "in-progress") {
										return (
											<button
												type="button"
												onClick={() => {
													setIsExamPickerOpen(false);
													navigate(examPath);
												}}
												className="shrink-0 rounded-full bg-[#c8102e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a80e27]"
											>
												Continue Exam
											</button>
										);
									}
									if (hasResult) {
										return (
											<div className="flex flex-wrap gap-2 sm:justify-end">
												<button
													type="button"
													onClick={() => {
														setIsExamPickerOpen(false);
														navigate(examPath, {
															state: {
																showExamResult: true,
																...(latestResult ? { examResult: latestResult } : {}),
															},
														});
													}}
													className="rounded-full border border-[#f1cbd2] px-4 py-3 text-sm font-bold text-[#c8102e] transition hover:bg-[#fff1f3]"
												>
													View Result
												</button>
												<button
													type="button"
													onClick={() => setRetakeExamFormat(selectedFormat)}
													className="rounded-full bg-[#c8102e] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#a80e27]"
												>
													Retake Exam
												</button>
											</div>
										);
									}
									return (
										<button
											type="button"
											onClick={() => {
												setIsExamPickerOpen(false);
												navigate(examPath);
											}}
											className="shrink-0 rounded-full bg-[#c8102e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a80e27]"
										>
											Start {selectedExamFormat}
										</button>
									);
								})()
							)}
						</div>
					</section>
				</div>,
				document.body,
			)}
			{retakeExamFormat && createPortal(
				<div className="fixed inset-0 z-[110] grid place-items-center bg-[#071126]/60 p-4 backdrop-blur-sm">
					<section
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="comptia-retake-confirm-title"
						aria-describedby="comptia-retake-confirm-description"
						className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
					>
						<p className="text-sm font-semibold text-[#c8102e]">CompTIA {program.title} practice</p>
						<h2 id="comptia-retake-confirm-title" className="mt-2 text-xl font-bold text-[#071126] sm:text-2xl">
							Retake the {retakeExamFormat.name}?
						</h2>
						<p id="comptia-retake-confirm-description" className="mt-3 text-sm leading-6 text-[#71819b]">
							A new attempt will start with a fresh set of questions. Your previous result remains available in your exam history.
						</p>
						<div className="mt-6 flex flex-wrap justify-end gap-3">
							<button
								type="button"
								onClick={() => setRetakeExamFormat(null)}
								className="rounded-full border border-[#ead7dc] px-5 py-3 text-sm font-semibold text-[#526584] transition hover:bg-[#fff9fa]"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={() => {
									const examPath = `/modules/programs/${program.programKey}/exam/${retakeExamFormat.key}`;
									setRetakeExamFormat(null);
									setIsExamPickerOpen(false);
									navigate(examPath, { state: { retakeExam: true } });
								}}
								className="rounded-full bg-[#c8102e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a80e27]"
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
