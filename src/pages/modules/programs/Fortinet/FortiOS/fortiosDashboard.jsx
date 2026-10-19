import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, Clock3, FileQuestion, ShieldCheck, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../context/auth-context";
import FortiOSBadge from "../../../../../assets/nse-4-fortios.svg";
import { readCcnaExamProgress } from "../../../../../utils/ccnaShortExamSession";
import { isCurrentProgramModuleQuizAttempt, readProgramModuleQuizProgress } from "../../../../../utils/programModuleQuizProgress";
import ProgramBackgroundParticles from "../../ProgramBackgroundParticles";
import ScoreRotationCard from "../../ScoreRotationCard";
import { FORTIOS_EXAM_FORMAT_DEFINITIONS, FORTIOS_EXAM_PROGRESS_FORMATS } from "./fortiosExamFormats";

export const FORTIOS_MODULES = [
	{
		title: "System and Network Settings",
		description: "Configure FortiGate system settings, interfaces, and core network connectivity.",
	},
	{
		title: "Logging and Monitoring",
		description: "Review system activity and use logs and monitoring tools to understand network events.",
	},
	{
		title: "Firewall Policies and NAT",
		description: "Control traffic with firewall policies, address objects, and network address translation.",
	},
	{
		title: "Routing",
		description: "Configure routing options and verify traffic paths through the FortiGate.",
	},
	{
		title: "Firewall Authentication",
		description: "Apply identity-based access and authentication to network traffic.",
	},
	{
		title: "Fortinet Single Sign-On",
		description: "Connect user identity information to FortiGate firewall policies.",
	},
	{
		title: "Certificate Operations",
		description: "Manage certificates used to inspect and protect encrypted connections.",
	},
	{
		title: "Antivirus",
		description: "Use antivirus profiles to detect and block malicious files and content.",
	},
	{
		title: "Web Filtering",
		description: "Apply web filtering policies to manage access to online content.",
	},
	{
		title: "Intrusion Prevention and Application Control",
		description: "Identify network threats and control application traffic with security profiles.",
	},
	{
		title: "IPsec VPN",
		description: "Build and maintain secure IPsec VPN connections between networks.",
	},
	{
		title: "SD-WAN Configuration and Monitoring",
		description: "Configure SD-WAN members, health checks, rules, and monitoring.",
	},
	{
		title: "High Availability",
		description: "Understand FortiGate HA operation and configure resilient deployments.",
	},
	{
		title: "Diagnostics and Troubleshooting",
		description: "Use diagnostic tools to investigate and resolve common FortiGate issues.",
	},
	{
		title: "FortiGate in the Cloud",
		description: "Explore FortiGate deployment and security considerations in cloud environments.",
	},
	{
		title: "FortiSASE",
		description: "Learn how FortiSASE extends Fortinet security to users and locations.",
	},
].map((module, index) => ({ ...module, number: `${index + 1}.0` }));

const FOCUS_AREAS = [
	"FortiGate system and network administration",
	"Firewall policies and security profiles",
	"VPN, SD-WAN, and high availability",
];

const HERO_INTROS = [
	"Turn FortiGate configurations into reliable protection for the networks you manage.",
	"Work through firewall policies, traffic inspection, VPN tunnels, and SD-WAN operations.",
	"Learn to read FortiOS logs, trace network behavior, and troubleshoot security appliances.",
];

function formatExamTime(totalSeconds) {
	const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
	const seconds = (totalSeconds % 60).toString().padStart(2, "0");
	return `${minutes}:${seconds}`;
}

export default function FortiOSDashboard() {
	const { profile } = useAuth();
	const navigate = useNavigate();
	const [typedIntro, setTypedIntro] = useState("");
	const [hasScrolled, setHasScrolled] = useState(false);
	const [isNoticeOpen, setIsNoticeOpen] = useState(true);
	const [openModule, setOpenModule] = useState(null);
	const [progressSlide, setProgressSlide] = useState(0);
	const [examClockNow, setExamClockNow] = useState(Date.now);
	const [isExamPickerOpen, setIsExamPickerOpen] = useState(false);
	const [selectedExamFormat, setSelectedExamFormat] = useState("short");
	const userId = profile?.userId;
	const quizProgress = userId ? readProgramModuleQuizProgress("fortinet-fortios", userId) : { modules: {} };
	const quizAttempts = FORTIOS_MODULES.map((module) => {
		const savedAttempt = quizProgress.modules[module.number];
		return isCurrentProgramModuleQuizAttempt(savedAttempt, "fortinet-fortios", module.number)
			? savedAttempt
			: null;
	});
	const attemptedQuizCount = quizAttempts.filter((attempt) =>
		["completed", "expired"].includes(attempt?.status) ||
		(attempt?.status === "in-progress" && Object.keys(attempt.answers ?? {}).length > 0),
	).length;
	const examRuns = Object.entries(FORTIOS_EXAM_PROGRESS_FORMATS).map(([examKey, exam]) => ({
		examKey,
		exam,
		progress: readCcnaExamProgress(exam.sessionKey, userId),
	}));
	const attemptedExamCount = examRuns.filter(({ progress }) => progress.status !== "not-started").length;
	const examCoverage = examRuns.length
		? Math.round(examRuns.reduce((total, { exam, progress }) => {
			const questionCount = exam.questionCount ?? progress.maxScore;
			if (!questionCount) return total;
			return total + Math.min(progress.answeredCount, questionCount) / questionCount;
		}, 0) / examRuns.length * 100)
		: 0;
	const activeExamCount = examRuns.filter(({ progress }) => progress.status === "in-progress").length;
	const selectedExam = FORTIOS_EXAM_PROGRESS_FORMATS[selectedExamFormat];

	useEffect(() => {
		if (!activeExamCount) return undefined;
		const intervalId = window.setInterval(() => setExamClockNow(Date.now()), 1000);
		return () => window.clearInterval(intervalId);
	}, [activeExamCount]);

	useEffect(() => {
		if (!isExamPickerOpen) return undefined;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		function closeOnEscape(event) {
			if (event.key === "Escape") setIsExamPickerOpen(false);
		}
		window.addEventListener("keydown", closeOnEscape);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [isExamPickerOpen]);

	function openExamPicker() {
		setSelectedExamFormat("short");
		setIsExamPickerOpen(true);
	}

	function startSelectedExam() {
		if (!selectedExam || !userId) return;
		setIsExamPickerOpen(false);
		navigate(`/modules/programs/fortinet-fortios/exam/${selectedExamFormat}`);
	}

	useEffect(() => {
		const updateBackButtonVisibility = () => setHasScrolled(window.scrollY > 120);
		updateBackButtonVisibility();
		window.addEventListener("scroll", updateBackButtonVisibility, { passive: true });
		return () => window.removeEventListener("scroll", updateBackButtonVisibility);
	}, []);

	useEffect(() => {
		let introIndex = 0;
		let timeoutId;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			timeoutId = window.setTimeout(() => setTypedIntro(HERO_INTROS[0]), 0);
			return () => window.clearTimeout(timeoutId);
		}

		let characterIndex = 0;
		const typeIntro = () => {
			const intro = HERO_INTROS[introIndex];
			characterIndex += 1;
			setTypedIntro(intro.slice(0, characterIndex));
			if (characterIndex < intro.length) {
				timeoutId = window.setTimeout(typeIntro, 18);
			} else {
				timeoutId = window.setTimeout(eraseIntro, 10000);
			}
		};
		const eraseIntro = () => {
			const intro = HERO_INTROS[introIndex];
			characterIndex -= 1;
			setTypedIntro(intro.slice(0, characterIndex));
			if (characterIndex > 0) {
				timeoutId = window.setTimeout(eraseIntro, 8);
			} else {
				introIndex = (introIndex + 1) % HERO_INTROS.length;
				timeoutId = window.setTimeout(typeIntro, 120);
			}
		};
		timeoutId = window.setTimeout(typeIntro, 150);
		return () => window.clearTimeout(timeoutId);
	}, []);

	return (
		<main className="program-faceted-page fortios-program-page ccna-page-enter relative min-h-screen bg-white text-[#071126]">
			{createPortal(
				<Link
					to="/pages/blank"
					className={`fixed left-4 top-20 z-[60] flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-[#d9271e] transition hover:text-[#b71c16] active:scale-95 ${hasScrolled ? "bg-white/90 shadow-md backdrop-blur-sm" : "bg-white/80"}`}
				>
					<ArrowLeft size={20} strokeWidth={2.5} /> Back to Courses
				</Link>,
				document.body,
			)}

			<ProgramBackgroundParticles className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 sm:px-10 lg:px-14 lg:pb-20 lg:pt-16">
				<div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f4c9c6] bg-[#fff4f3] px-4 py-2 text-sm font-semibold text-[#bd2119]">
							<span className="h-2 w-2 rounded-full bg-[#e2231a]" />
							Fortinet · FortiOS Certification
						</div>
						<h1 className="max-w-[700px] text-[2rem] font-bold leading-[1.12] tracking-[-1px] sm:text-6xl sm:leading-[1.08] sm:tracking-[-1.5px] lg:text-[3.25rem] xl:text-[3.7rem]">
							Command the FortiGate. <span className="text-[#e2231a]">Secure every connection.</span>
						</h1>
						<p className="typewriter-caret mt-6 min-h-[5.4rem] max-w-[555px] text-base leading-[1.8] text-[#66738d] sm:text-lg">
							{typedIntro}
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<button
								type="button"
								onClick={openExamPicker}
								className="flex h-12 items-center gap-2 rounded-full bg-[#e2231a] px-5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(226,35,26,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#bd2119] hover:shadow-[0_14px_26px_rgba(226,35,26,0.24)] active:translate-y-0 sm:h-[58px] sm:px-7 sm:text-base"
							>
								Start Exam <ArrowRight size={18} />
							</button>
							<button
								type="button"
								className="flex h-12 items-center gap-2 rounded-full bg-[#e2231a] px-5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(226,35,26,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#bd2119] hover:shadow-[0_14px_26px_rgba(226,35,26,0.24)] active:translate-y-0 sm:h-[58px] sm:px-7 sm:text-base"
							>
								Start Quiz <ArrowRight size={18} />
							</button>
							<button
								type="button"
								className="flex h-12 items-center gap-2 rounded-full border border-[#e2231a] px-5 text-sm font-bold text-[#d9271e] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#fff4f3] hover:shadow-[0_10px_20px_rgba(226,35,26,0.1)] active:translate-y-0 sm:h-[58px] sm:px-7 sm:text-base"
							>
								View All Modules <ArrowRight size={18} />
							</button>
						</div>

						<div className="mt-10 grid max-w-[810px] grid-cols-3 overflow-hidden rounded-2xl border border-[#efd9d7] bg-white shadow-[0_12px_28px_rgba(226,35,26,0.08)] transition-shadow duration-200 hover:shadow-[0_16px_32px_rgba(226,35,26,0.16)]">
							<div className="program-stat-item flex min-w-0 items-center justify-center gap-2 border-r border-[#f3e4e2] px-2 py-4 sm:gap-3 sm:px-4 sm:py-5">
								<strong className="text-2xl leading-none tracking-tight sm:text-[2rem]">{quizAttempts.filter((attempt) => attempt?.status === "completed").length}/{FORTIOS_MODULES.length}</strong>
								<span className="text-[11px] leading-tight text-[#6f7d99] sm:text-sm">Quizzes<br />completed</span>
							</div>
							<div className="program-stat-item flex min-w-0 items-center justify-center gap-2 border-r border-[#f3e4e2] px-2 py-4 sm:gap-3 sm:px-4 sm:py-5">
								<strong className="text-2xl leading-none tracking-tight sm:text-[2rem]">{examRuns.filter(({ progress }) => progress.status === "completed").length}/4</strong>
								<span className="text-[11px] leading-tight text-[#6f7d99] sm:text-sm">Exams<br />completed</span>
							</div>
							<div className="program-stat-item flex min-w-0 items-center justify-center gap-2 px-2 py-4 sm:gap-3 sm:px-4 sm:py-5">
								<strong className="text-2xl leading-none tracking-tight sm:text-[2rem]">{FORTIOS_MODULES.length}</strong>
								<span className="text-[11px] leading-tight text-[#6f7d99] sm:text-sm">Modules<br />left</span>
							</div>
						</div>
					</div>

					<div className="relative mx-auto flex h-[380px] w-full max-w-[440px] items-center justify-center sm:h-[440px] sm:max-w-[470px]">
					<div aria-hidden="true" className="fortios-logo-circle absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff0ef] sm:h-[356px] sm:w-[356px]" />
					<img
						src={FortiOSBadge}
						alt="Fortinet NSE 4 FortiOS certification badge"
						className="relative z-10 h-[150px] w-[150px] object-contain transition-transform duration-300 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:h-[180px] sm:w-[180px]"
					/>
					<ScoreRotationCard quizScore={null} examScore={null} accentClassName="text-[#e2231a]" />
					<Link
						to="/modules/programs/fortinet-fortios/gradebook"
						aria-label="Open FortiOS gradebook"
						title="Gradebook"
						className="absolute right-[12%] top-[2%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#e2231a] shadow-[0_8px_20px_rgba(15,35,75,0.1)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
					>
						<ClipboardList size={21} />
					</Link>
					<button
						type="button"
						onClick={() => setIsNoticeOpen((isOpen) => !isOpen)}
						aria-label={isNoticeOpen ? "Close FortiOS notification" : "Open FortiOS notification"}
						aria-expanded={isNoticeOpen}
						className="absolute bottom-[27%] right-[2%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#e2231a] shadow-[0_8px_20px_rgba(15,35,75,0.1)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
					>
						<FileQuestion size={21} />
					</button>
					{isNoticeOpen && (
						<div className="ccna-notification-boink absolute bottom-0 right-0 z-30 w-[210px] rounded-2xl border border-[#f1e2e0] bg-white p-3 shadow-[0_14px_28px_rgba(15,35,75,0.1)] transition-transform duration-200 ease-out hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:right-[-2%] sm:w-[275px] sm:p-4">
							<button
								type="button"
								onClick={() => setIsNoticeOpen(false)}
								aria-label="Close FortiOS notification"
								className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#64708a] transition hover:bg-[#fff4f3] hover:text-[#e2231a]"
							>
								<X size={16} />
							</button>
							<div className="flex items-center justify-between gap-2">
								<strong className="truncate pr-5 text-sm text-[#e2231a]">{profile?.username ?? "Student"}</strong>
								<span className="text-xs font-semibold text-[#7c89a1]">{profile?.username ? "FortiOS" : "Student"}</span>
							</div>
							<p className="mt-2 text-sm leading-snug text-[#64708a]">
								{profile?.username
									? "Your FortiGate learning path is ready when you are."
									: "Explore FortiGate administration and security."}
							</p>
							</div>
						)}
					</div>
				</div>
			</ProgramBackgroundParticles>

			<div className="bg-[#fff0ef] py-12 text-center sm:py-14">
				<p className="text-2xl font-bold tracking-tight sm:text-[28px]">
					Inspect the traffic. Enforce the policy. <span className="text-[#e2231a]">Keep your network resilient.</span>
				</p>
			</div>

			<section id="course-modules" className="scroll-mt-8 bg-[#fff8f7]">
				<div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_353px] lg:px-14 lg:py-14">
					<div>
						<div className="mb-6 flex items-center justify-between gap-4">
							<h2 className="text-xl font-bold sm:text-[21px]">Course modules</h2>
							<span className="text-sm text-[#7c89a1]">{FORTIOS_MODULES.length} FortiOS modules</span>
						</div>
						<div className="space-y-3">
							{FORTIOS_MODULES.map((module, index) => {
								const isOpen = openModule === index;
								return (
									<article key={module.title} className="overflow-hidden rounded-[18px] border border-[#efd9d7] bg-white transition-[transform,box-shadow,border-color] duration-200 ease-out hover:z-10 hover:scale-[1.01] hover:border-[#e2231a]/40 hover:shadow-[0_10px_24px_rgba(226,35,26,0.1)] motion-reduce:transition-none motion-reduce:hover:scale-100">
										<button
											type="button"
											onClick={() => setOpenModule(isOpen ? null : index)}
											aria-expanded={isOpen}
											aria-controls={`fortios-module-content-${index}`}
											className="flex min-h-[92px] w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
										>
											<span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#f3cfcc] bg-[#fff4f3] text-lg font-semibold text-[#e2231a]">
												<span aria-hidden="true" className="absolute inset-x-0 bottom-0 bg-[#e2231a]/10 transition-[height] duration-500 ease-out" style={{ height: isOpen ? "100%" : "0%" }} />
												<span className="relative z-10">{String(index + 1).padStart(2, "0")}</span>
											</span>
											<span className="min-w-0 flex-1">
												<strong className="block text-base text-[#111a2d] sm:text-[17px]">{module.title}</strong>
												<span className="mt-1 block text-sm text-[#8a96aa]">FortiOS learning module</span>
											</span>
											{isOpen
												? <ChevronDown className="shrink-0 text-[#e2231a]" size={19} />
												: <ChevronRight className="shrink-0 text-[#91a0b9]" size={19} />}
										</button>
										<div
											id={`fortios-module-content-${index}`}
											aria-hidden={!isOpen}
											inert={!isOpen}
											className={`course-module-fold${isOpen ? " is-open" : ""}`}
										>
											<div className="course-module-fold-inner">
												<div className="flex items-start gap-2.5 border-t border-[#f3e4e2] px-6 pb-6 pt-5 text-sm leading-6 text-[#53617a] sm:pl-[91px]">
													<Check className="mt-1 shrink-0 text-[#e2231a]" size={16} strokeWidth={2.5} />
													<p>{module.description}</p>
												</div>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					</div>

					<aside className="min-w-0 space-y-5">
						<div
							className="overflow-hidden rounded-[18px] border border-[#efd9d7] bg-white touch-pan-y"
							onTouchStart={(event) => {
								const touch = event.changedTouches[0];
								event.currentTarget.dataset.touchStartX = String(touch.clientX);
								event.currentTarget.dataset.touchStartY = String(touch.clientY);
							}}
							onTouchEnd={(event) => {
								const startX = Number(event.currentTarget.dataset.touchStartX);
								const startY = Number(event.currentTarget.dataset.touchStartY);
								delete event.currentTarget.dataset.touchStartX;
								delete event.currentTarget.dataset.touchStartY;
								const touch = event.changedTouches[0];
								const deltaX = touch.clientX - startX;
								const deltaY = touch.clientY - startY;
								if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
								setProgressSlide(deltaX < 0 ? 1 : 0);
							}}
						>
							<div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${progressSlide * 100}%)` }}>
								<div className="flex w-full shrink-0 items-center gap-5 p-6">
									<div
										role="progressbar"
										aria-label="FortiOS quiz coverage"
										aria-valuemin={0}
										aria-valuemax={100}
										aria-valuenow={FORTIOS_MODULES.length ? Math.round((attemptedQuizCount / FORTIOS_MODULES.length) * 100) : 0}
										className="relative h-16 w-16 shrink-0 rounded-full"
										style={{ background: `conic-gradient(#e2231a ${FORTIOS_MODULES.length ? (attemptedQuizCount / FORTIOS_MODULES.length) * 100 : 0}%, #f1d7d5 0)` }}
									>
										<span className="absolute inset-[7px] flex items-center justify-center rounded-full bg-white text-xs font-bold text-[#e2231a]">
											{FORTIOS_MODULES.length ? Math.round((attemptedQuizCount / FORTIOS_MODULES.length) * 100) : 0}%
										</span>
									</div>
									<div className="min-w-0">
										<strong className="text-lg">Quiz coverage</strong>
										<p className="mt-1 text-sm text-[#7c89a1]">{attemptedQuizCount} of {FORTIOS_MODULES.length} quizzes attempted</p>
									</div>
								</div>
								<div className="flex w-full shrink-0 items-center gap-5 p-6">
									<div
										role="progressbar"
										aria-label="FortiOS exam progress"
										aria-valuemin={0}
										aria-valuemax={100}
										aria-valuenow={examCoverage}
										className="relative h-16 w-16 shrink-0 rounded-full"
										style={{ background: `conic-gradient(#e2231a ${examCoverage}%, #f1d7d5 0)` }}
									>
										<span className="absolute inset-[7px] flex items-center justify-center rounded-full bg-white text-xs font-bold text-[#e2231a]">{examCoverage}%</span>
									</div>
									<div className="min-w-0">
										<strong className="text-lg">Exam progress</strong>
										<p className="mt-1 text-sm text-[#7c89a1]">{attemptedExamCount} of {examRuns.length} exam formats attempted</p>
									</div>
								</div>
							</div>
							<div className="flex h-8 items-center justify-center gap-2 pb-2" aria-label="Progress panels">
								<button
									type="button"
									onClick={() => setProgressSlide(0)}
									disabled={progressSlide === 0}
									aria-label="Show quiz coverage"
									className="rounded-full p-1 text-[#e2231a] transition hover:bg-[#fff0ef] disabled:cursor-default disabled:opacity-30"
								>
									<ChevronLeft size={16} />
								</button>
								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={() => setProgressSlide(0)}
										aria-label="Show quiz coverage"
										aria-current={progressSlide === 0 ? "true" : undefined}
										className={`h-2 rounded-full transition-all ${progressSlide === 0 ? "w-6 bg-[#e2231a]" : "w-2 bg-[#cbd5e1]"}`}
									/>
									<button
										type="button"
										onClick={() => setProgressSlide(1)}
										aria-label="Show exam progress"
										aria-current={progressSlide === 1 ? "true" : undefined}
										className={`h-2 rounded-full transition-all ${progressSlide === 1 ? "w-6 bg-[#e2231a]" : "w-2 bg-[#cbd5e1]"}`}
									/>
								</div>
								<button
									type="button"
									onClick={() => setProgressSlide(1)}
									disabled={progressSlide === 1}
									aria-label="Show exam progress"
									className="rounded-full p-1 text-[#e2231a] transition hover:bg-[#fff0ef] disabled:cursor-default disabled:opacity-30"
								>
									<ChevronRight size={16} />
								</button>
							</div>
						</div>

						<div className="min-w-0 overflow-hidden rounded-[18px] border border-[#efd9d7] bg-white p-4 sm:p-6">
							{progressSlide === 0 ? (
								<>
									<h2 className="mb-5 text-xl font-bold">Practice quizzes</h2>
									{FORTIOS_MODULES.map((module, index) => {
										const attempt = quizAttempts[index];
										return (
											<div key={module.number} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[#f0e2e0] py-3 text-sm last:border-0">
												<div className="min-w-0">
													<span className="block truncate font-medium">{module.number} {module.title}</span>
													<strong className={`mt-1 block ${attempt?.status === "completed" ? "text-[#bd2119]" : "text-[#8b96a9]"}`}>
														{attempt?.status === "completed" ? `Completed · ${attempt.score ?? 0}/20` : "Quiz coming soon"}
													</strong>
												</div>
												<button
													type="button"
													disabled
													className="rounded-full border border-[#f0dedc] px-3 py-1.5 text-xs font-semibold text-[#a8b0bb] disabled:cursor-not-allowed"
												>
													Coming soon
												</button>
											</div>
										);
									})}
								</>
							) : (
								<>
									<h2 className="mb-5 text-xl font-bold">Exam progress</h2>
									{examRuns.map(({ examKey, exam, progress }) => {
										const questionCount = exam.questionCount ?? progress.maxScore;
										const statusText = progress.status === "completed"
											? `Completed · Score ${progress.score}/${progress.maxScore}`
											: progress.status === "expired"
												? `Time expired · Score ${progress.score}/${progress.maxScore}`
												: progress.status === "in-progress"
													? `${progress.answeredCount}/${questionCount || "—"} answered`
													: "Not started";
										const secondsRemaining = progress.deadline
											? Math.max(0, Math.ceil((progress.deadline - examClockNow) / 1000))
											: null;
										return (
											<div key={examKey} className="border-b border-[#f0e2e0] py-3 last:border-0">
												<div className="flex items-center justify-between gap-3">
													<div className="min-w-0">
														<span className="block truncate text-sm font-medium">{exam.name}</span>
														<strong className={`mt-1 block text-sm ${progress.status === "not-started" ? "text-[#8b96a9]" : "text-[#bd2119]"}`}>
															{statusText}
														</strong>
													</div>
													{secondsRemaining !== null && progress.status === "in-progress" && (
														<span role="timer" className="shrink-0 rounded-full bg-[#fff4f3] px-3 py-1 text-xs font-bold tabular-nums text-[#bd2119]">
															{formatExamTime(secondsRemaining)} left
														</span>
													)}
												</div>
											</div>
										);
									})}
								</>
							)}
						</div>

						<div className="rounded-[18px] border border-[#efd9d7] bg-white p-6">
							<div className="mb-4 flex items-center gap-3">
								<BookOpen className="text-[#e2231a]" size={21} />
								<h2 className="text-xl font-bold text-[#111827]">Program Overview</h2>
							</div>
							<p className="text-sm leading-6 text-[#7c89a1]">
								A guided learning path through FortiOS and FortiGate administration, from network settings and firewall policies to VPN, SD-WAN, and troubleshooting.
							</p>
							<h3 className="mb-3 mt-5 text-xs font-bold uppercase tracking-wide text-[#7c89a1]">Learning focus</h3>
							<ul className="space-y-3">
								{FOCUS_AREAS.map((area) => (
									<li key={area} className="flex items-center gap-3 text-sm font-medium text-[#334454]">
										<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff4f3] text-[#e2231a]">
											<ShieldCheck size={17} />
										</span>
										{area}
									</li>
								))}
							</ul>
							<p className="mt-5 flex items-center gap-2 border-t border-[#f3e4e2] pt-4 text-xs text-[#7c89a1]">
								<ShieldCheck size={15} className="text-[#e2231a]" />
								{FORTIOS_MODULES.length} modules · Self-paced study
							</p>
							<Link
								to="/training/fortinet/fortios"
								className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-[#e2231a] px-5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(226,35,26,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#bd2119] hover:shadow-[0_14px_26px_rgba(226,35,26,0.24)] active:translate-y-0 motion-reduce:transition-none"
							>
								View Course Outline <ArrowRight size={17} />
							</Link>
						</div>
						<div className="overflow-hidden rounded-[18px] border border-[#efd9d7] bg-white p-3">
							<img src={FortiOSBadge} alt="" className="mx-auto h-44 w-full object-contain" />
							<p className="pb-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#7c89a1]">
								Fortinet FortiOS certification
							</p>
						</div>
					</aside>
				</div>
			</section>
			{isExamPickerOpen && createPortal(
				<div
					className="fixed inset-0 z-[110] flex items-center justify-center overflow-x-hidden overflow-y-auto bg-[#071126]/55 p-2 backdrop-blur-sm sm:p-4"
					onMouseDown={(event) => {
						if (event.target === event.currentTarget) setIsExamPickerOpen(false);
					}}
				>
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="fortios-exam-picker-title"
						className="ccna-page-enter my-auto max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-3xl overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:w-full sm:p-8"
					>
						<header className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm font-semibold text-[#e2231a]">Fortinet FortiOS practice</p>
								<h2 id="fortios-exam-picker-title" className="mt-1 text-xl font-bold text-[#071126] sm:text-2xl">
									Choose an exam format
								</h2>
							</div>
							<button
								type="button"
								onClick={() => setIsExamPickerOpen(false)}
								aria-label="Close exam picker"
								className="rounded-full p-2 text-[#71819b] transition hover:bg-[#fff4f3] hover:text-[#e2231a]"
							>
								<X size={20} />
							</button>
						</header>
						<p className="mt-3 text-sm leading-6 text-[#71819b]">
							Choose a FortiOS question set and time limit. All Questions Exam includes every available FortiOS question without a time limit.
						</p>
						<div className="mt-5 grid gap-3 sm:grid-cols-2">
							{Object.entries(FORTIOS_EXAM_FORMAT_DEFINITIONS).map(([examKey, format]) => {
								const isSelected = selectedExamFormat === examKey;
								const questionLabel = format.questionCount ?? "All";
								const durationLabel = format.durationSeconds === null
									? "No time limit"
									: `${Math.round(format.durationSeconds / 60)} minutes`;
								return (
									<button
										key={examKey}
										type="button"
										aria-pressed={isSelected}
										onClick={() => setSelectedExamFormat(examKey)}
										className={`min-w-0 rounded-2xl border p-4 text-left transition-colors sm:p-5 ${isSelected ? "border-[#e2231a] bg-[#fff4f3] text-[#bd2119]" : "border-[#efd9d7] text-[#263654] hover:border-[#e89a95]"}`}
									>
										<span className="flex items-start justify-between gap-2">
											<span className="text-lg font-bold">{format.name}</span>
											{examRuns.find((run) => run.examKey === examKey)?.progress.status === "in-progress" && (
												<span className="shrink-0 rounded-full bg-[#fff0ef] px-2.5 py-1 text-[11px] font-bold text-[#bd2119]">In progress</span>
											)}
										</span>
										<span className="mt-3 block text-3xl font-extrabold">{questionLabel}</span>
										<span className="block text-sm font-medium text-[#71819b]">{format.questionCount === null ? "questions available" : "questions"}</span>
										<span className="mt-4 flex items-center gap-1.5 text-sm font-semibold">
											<Clock3 size={15} /> {durationLabel}
										</span>
										<span className="mt-2 block text-sm leading-5 text-[#71819b]">
											{examKey === "short"
												? "A quick FortiOS practice session."
												: examKey === "medium"
													? "A balanced, longer practice session."
													: examKey === "long"
														? "A full-length FortiOS practice session."
														: "Every FortiOS question, in database order."}
										</span>
									</button>
								);
							})}
						</div>
						{selectedExam && (() => {
							const progress = examRuns.find((run) => run.examKey === selectedExamFormat)?.progress;
							const questionLabel = selectedExam.questionCount ?? "All available";
							const durationLabel = selectedExam.durationSeconds === null
								? "No time limit"
								: `${Math.round(selectedExam.durationSeconds / 60)} minutes`;
							const examPath = `/modules/programs/fortinet-fortios/exam/${selectedExamFormat}`;
							return (
								<div className="mt-5 grid grid-cols-1 gap-3 rounded-xl bg-[#fff8f7] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
									<div className="min-w-0 sm:pr-3">
										<p className="text-sm text-[#526584]">
											{questionLabel} questions · {durationLabel} · FortiOS practice
										</p>
										{progress && progress.status !== "not-started" && (
											<p className="mt-1 text-sm font-semibold text-[#bd2119]">
												{progress.status === "in-progress"
													? `${progress.answeredCount} of ${progress.maxScore} answered`
													: `Last result: ${progress.score}/${progress.maxScore}`}
											</p>
										)}
									</div>
									{progress?.status === "in-progress" ? (
										<button
											type="button"
											onClick={() => {
												setIsExamPickerOpen(false);
												navigate(examPath);
											}}
											className="shrink-0 rounded-full bg-[#e2231a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#bd2119]"
										>
											Continue Exam
										</button>
									) : ["completed", "expired"].includes(progress?.status) ? (
										<div className="flex flex-wrap gap-2 sm:justify-self-end">
											<button
												type="button"
												onClick={() => {
													setIsExamPickerOpen(false);
													navigate(examPath);
												}}
												className="rounded-full border border-[#efc6c3] px-4 py-3 text-sm font-bold text-[#bd2119] transition hover:bg-white"
											>
												Review Result
											</button>
											<button
												type="button"
												onClick={() => {
													setIsExamPickerOpen(false);
													navigate(examPath, { state: { retakeExam: true } });
												}}
												className="rounded-full bg-[#e2231a] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#bd2119]"
											>
												Retake Exam
											</button>
										</div>
									) : (
										<button
											type="button"
											onClick={startSelectedExam}
											className="justify-self-start rounded-full bg-[#e2231a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#bd2119] sm:justify-self-end"
										>
											Start {selectedExam.name}
										</button>
									)}
								</div>
							);
						})()}
					</section>
				</div>,
				document.body,
			)}
		</main>
	);
}
