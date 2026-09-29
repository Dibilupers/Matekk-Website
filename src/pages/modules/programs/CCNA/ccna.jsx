import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import {
	ArrowRight,
	Check,
	ChevronDown,
	ChevronRight,
	MessageSquare,
	Pencil,
	Settings,
} from "lucide-react";
import {
	beginCcnaModuleQuiz,
	readCcnaModuleQuizProgress,
} from "../../../../utils/ccnaModuleQuizProgress";
import { CCNA_MODULE_QUIZZES } from "./ccnaModuleQuizData";

const modules = [
	{
		number: "1.0",
		title: "Network fundamentals",
		lessons: "6 lessons",
		status: "Completed",
	},
	{
		number: "2.0",
		title: "Network access",
		lessons: "8 lessons",
		status: "4 of 8 read",
		lessonsList: [
			{ title: "VLANs & trunking", complete: true },
			{ title: "What is SDN?", complete: true },
			{ title: "DHCP snooping", tag: "Rogue DHCP" },
			{ title: "Dynamic ARP inspection" },
		],
	},
	{ number: "3.0", title: "IP connectivity", lessons: "7 lessons", status: "Not started" },
	{ number: "4.0", title: "IP services", lessons: "7 lessons", status: "Not started" },
	{
		number: "5.0",
		title: "Security fundamentals",
		lessons: "6 lessons",
		status: "Not started",
	},
	{ number: "6.0", title: "Automation and programmability", lessons: "7 lessons", status: "Not started" },
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
				<span className="mt-2 text-sm leading-none tracking-[2px] text-[#f6a623]">★★★★★</span>
			</div>
			<div className="absolute right-0 top-[10%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#005b6b] text-white shadow-lg"><Settings size={21} /></div>
			<div className="absolute right-[-4px] top-[44%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#005b6b] shadow-[0_8px_20px_rgba(15,35,75,0.1)]"><Pencil size={18} /></div>
			<div className="absolute right-[2%] top-[70%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#005b6b] text-white shadow-lg"><MessageSquare size={19} /></div>
			<div className="absolute bottom-0 right-0 z-30 w-[238px] rounded-2xl border border-[#e4eaf5] bg-white p-4 shadow-[0_14px_28px_rgba(15,35,75,0.1)] sm:right-[-2%] sm:w-[275px]">
				<strong className="text-sm text-[#005b6b]">{profile?.username}</strong>
				<p className="mt-0.5 text-sm leading-snug text-[#64708a]">just passed the CCNA<br />mock exam!</p>
				<button className="mt-3 flex h-11 w-full items-center justify-center rounded-full bg-[#005b6b] text-sm font-bold text-white transition-colors hover:bg-[#004653]">View result</button>
			</div>
		</div>
	);
}

function getQuizActionLabel(progress) {
	if (progress?.status === "in-progress") return "Continue Quiz";
	if (progress?.status === "completed" || progress?.status === "expired") return "Retake Quiz";
	return "Start Quiz";
}

function getQuizMetrics(progress) {
	let correctAnswers = 0;
	let questionsCounted = 0;
	let attemptedModules = 0;

	CCNA_MODULE_QUIZZES.forEach((quiz) => {
		const attempt = progress.modules[quiz.number];
		if (!attempt) return;

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

function ModuleCard({ module, index, openSection, onToggle, quizProgress, onStartQuiz }) {
	const isOpen = openSection === index;
	const currentQuizProgress = quizProgress.modules[module.number];

	return (
		<div className="overflow-hidden rounded-[18px] border border-[#d6e5e7] bg-white">
			<button
				type="button"
				onClick={() => onToggle(index)}
				className="flex min-h-[92px] w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
			>
				<span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-lg font-semibold ${index === 0 ? "bg-[#005b6b] text-white" : "border border-[#c9dfe2] bg-[#edf5f6] text-[#005b6b]"}`}>
					{index + 1}
				</span>
				<span className="min-w-0 flex-1">
					<strong className="block text-base text-[#111a2d] sm:text-[17px]">{module.title}</strong>
					<span className="mt-1 block text-sm text-[#8a96aa]">{module.lessons} · {module.status}</span>
				</span>
				{isOpen ? <ChevronDown className="text-[#005b6b]" size={19} /> : <ChevronRight className="text-[#91a0b9]" size={19} />}
			</button>
			{isOpen && (
				<div className="space-y-4 border-t border-[#e2ecec] px-6 pb-6 pt-5 sm:pl-[91px]">
					{module.lessonsList?.map((lesson) => (
						<div key={lesson.title} className="flex items-center gap-3 text-[15px] text-[#66738d]">
							<span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${lesson.complete ? "border-[#005b6b] bg-[#005b6b] text-white" : "border-[#dce5f2] text-transparent"}`}>
								<Check size={13} strokeWidth={3} />
							</span>
							<span>{lesson.title}</span>
							{lesson.tag && <span className="ml-auto rounded-full bg-[#fff0df] px-2.5 py-1 text-xs font-semibold text-[#ed9b33]">{lesson.tag}</span>}
						</div>
					))}
					<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e2ecec] pt-4">
						<span className="text-sm text-[#71819b]">
							{currentQuizProgress?.status === "completed" || currentQuizProgress?.status === "expired"
								? `${currentQuizProgress.status === "expired" ? "Time expired · " : ""}Last score: ${currentQuizProgress.score}/5`
								: currentQuizProgress?.status === "in-progress"
									? "Quiz in progress"
									: "5-question module quiz"}
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
	const [openSection, setOpenSection] = useState(1);
	const [quizProgress] = useState(readCcnaModuleQuizProgress);
	const navigate = useNavigate();
	const { quizAverage, attemptedModules, quizCoverage } = getQuizMetrics(quizProgress);
	const activeModule = quizProgress.activeModule
		&& quizProgress.modules[quizProgress.activeModule]?.status === "in-progress"
		? quizProgress.activeModule
		: modules.find((module) => !["completed", "expired"].includes(quizProgress.modules[module.number]?.status))?.number ?? "1.0";
	const activeQuizProgress = quizProgress.modules[activeModule];
	const heroQuizLabel = getQuizActionLabel(activeQuizProgress);

	function toggleModule(index) {
		setOpenSection((currentSection) => currentSection === index ? null : index);
	}

	function openModuleQuiz(moduleNumber) {
		beginCcnaModuleQuiz(moduleNumber);
		navigate(`/modules/programs/ccna/quiz/${moduleNumber}`);
	}

	return (
		<main className="min-h-screen bg-white text-[#071126]">
			<section className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 sm:px-10 lg:px-14 lg:pb-20 lg:pt-16">
				<div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9dfe2] bg-[#f0f7f7] px-4 py-2 text-sm font-semibold text-[#005b6b]">
							<span className="h-2 w-2 rounded-full bg-[#005b6b]" /> Module 2 of 6 · Network Access
						</div>
						<h1 className="max-w-[700px] text-[2.65rem] font-bold leading-[1.08] tracking-[-1.5px] sm:text-6xl lg:text-[3.25rem] xl:text-[3.7rem]">
							Continue your path to <span className="text-[#005b6b]">CCNA<br className="hidden sm:block" /> Certification.</span>
						</h1>
						<p className="mt-6 max-w-[555px] text-base leading-[1.8] text-[#66738d] sm:text-lg">
							Cutting-edge ICT training built on real network topologies — from switching fundamentals to security hardening, taught by working engineers.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<button onClick={() => openModuleQuiz(activeModule)} className="flex h-[58px] items-center gap-2 rounded-full bg-[#005b6b] px-7 text-base font-bold text-white shadow-[0_10px_20px_rgba(0,91,107,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#004653] hover:shadow-[0_14px_26px_rgba(0,91,107,0.24)] active:translate-y-0">{heroQuizLabel} <ArrowRight size={18} /></button>
							<Link to="/modules/programs/ccna/knowledge-hub" className="flex h-[58px] items-center rounded-full border border-[#005b6b] px-7 text-base font-bold text-[#005b6b] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#f0f7f7] hover:shadow-[0_10px_20px_rgba(0,91,107,0.12)] active:translate-y-0">View All Modules</Link>
						</div>
						<div className="mt-11 flex flex-wrap gap-5 divide-x divide-[#dce5f2]">
							<Stat value={`${attemptedModules}/6`} label="Quizzes attempted" />
							<div className="pl-5 sm:pl-7"><Stat value={`${quizAverage}%`} label="Quiz average" /></div>
							<div className="pl-5 sm:pl-7"><Stat value="6" label="Lessons left" /></div>
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
							{modules.map((module, index) => <ModuleCard key={module.title} module={module} index={index} openSection={openSection} onToggle={toggleModule} quizProgress={quizProgress} onStartQuiz={openModuleQuiz} />)}
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
		</main>
	);
}
