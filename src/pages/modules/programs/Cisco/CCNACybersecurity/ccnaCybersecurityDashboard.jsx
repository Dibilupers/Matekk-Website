import CybersecurityBadge from "../../../../../assets/CCNAcybersecurity.webp";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../../context/AuthContext";
import { CCNA_CYBERSECURITY_CURRICULUM } from "./ccnaCybersecurityCurriculum";
import {
	markCcnaCybersecurityModuleOpened,
	readCcnaCybersecurityProgress,
} from "./ccnaCybersecurityProgress";
import ProgramModuleQuizPanel, {
	ProgramModuleQuizAction,
} from "../../ProgramModuleQuizPanel";
import { getProgramModuleQuizAverage } from "../../programModuleQuizMetrics";
import ProgramQuizControls from "../../ProgramQuizControls";
import CCNAProgramDashboard from "../../ccnaProgramDashboard";
import {
	isCurrentProgramModuleQuizAttempt,
	readProgramModuleQuizProgress,
} from "../../../../../utils/programModuleQuizProgress";

const PROGRAM_KEY = "ccna-cybersecurity";
const PROGRAM_PATH = "/modules/programs/ccna-cybersecurity";
const HERO_INTROS = [
	"Strengthen your security foundations and learn to recognize, investigate, and respond to network threats.",
	"Build practical skills in security monitoring, host analysis, and network intrusion detection.",
	"Learn how security policies and procedures help protect connected systems and sensitive data.",
	"Explore the tools and techniques used to identify suspicious activity and improve network defense.",
];
const programModules = CCNA_CYBERSECURITY_CURRICULUM.map((module) => ({
	...module,
	items: module.lessons.map((lesson) => lesson.title),
}));

function CybersecurityModuleCard({ module, index, isOpen, progress, quizAttempt, onToggle }) {
	const completedLessons = module.lessons.filter((lesson) => progress.completedLessons.includes(lesson.slug)).length;
	const lessonProgress = module.lessons.length ? (completedLessons / module.lessons.length) * 100 : 0;
	const moduleStatus = completedLessons === module.lessons.length
		? "Completed"
		: completedLessons > 0
			? `${completedLessons} of ${module.lessons.length} read`
			: "Not started";
	const nextLesson = module.lessons.find((lesson) => !progress.completedLessons.includes(lesson.slug));

	return (
		<article className="overflow-hidden rounded-[18px] border border-[#d6e5e7] bg-white transition-[transform,box-shadow,border-color] duration-200 ease-out hover:border-[#b5d4d9] hover:shadow-[0_10px_24px_rgba(0,91,107,0.1)]">
			<button type="button" onClick={onToggle} aria-expanded={isOpen} className="flex min-h-[92px] w-full items-center gap-4 px-5 py-4 text-left sm:px-6">
				<span
					role="progressbar"
					aria-label={`${module.title} lesson progress`}
					aria-valuemin={0}
					aria-valuemax={module.lessons.length}
					aria-valuenow={completedLessons}
					className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#c9dfe2] bg-[#edf5f6] text-lg font-semibold"
				>
					<span aria-hidden="true" className="absolute inset-x-0 bottom-0 bg-[#005b6b] transition-[height] duration-500 ease-out" style={{ height: `${lessonProgress}%` }} />
					<span className={`relative z-10 transition-colors duration-300 ${lessonProgress > 50 ? "text-white" : "text-[#005b6b]"}`}>{index + 1}</span>
				</span>
				<span className="min-w-0 flex-1">
					<strong className="block text-base text-[#111a2d] sm:text-[17px]">{module.number} {module.title}</strong>
					<span className="mt-1 block text-sm text-[#8a96aa]">{module.lessons.length} lessons · {moduleStatus}</span>
				</span>
				{isOpen ? <ChevronDown className="shrink-0 text-[#005b6b]" size={19} /> : <ChevronRight className="shrink-0 text-[#91a0b9]" size={19} />}
			</button>
			{isOpen && (
				<div className="space-y-4 border-t border-[#e2ecec] px-6 pb-6 pt-5 sm:pl-[91px]">
					<div className="space-y-4">
						{module.lessons.map((lesson) => {
							const isComplete = progress.completedLessons.includes(lesson.slug);
							return (
								<Link key={lesson.slug} to={`/modules/programs/ccna-cybersecurity/knowledge-hub/${lesson.slug}`} className="group flex items-center gap-3 text-[15px] text-[#66738d] hover:text-[#005b6b]">
									<span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${isComplete ? "border-[#005b6b] bg-[#005b6b] text-white" : "border-[#dce5f2] bg-white text-transparent group-hover:border-[#8bb8bf]"}`}>
										<Check size={13} strokeWidth={3} />
									</span>
									<span className="min-w-0 flex-1"><span className="mr-2 text-xs font-semibold text-[#8a96aa]">{lesson.number}</span>{lesson.title}</span>
									<ArrowRight size={15} className="shrink-0 text-[#91a0b9] transition group-hover:translate-x-1 group-hover:text-[#005b6b]" />
								</Link>
							);
						})}
					</div>
					<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e2ecec] pt-4">
						<span className="text-sm text-[#71819b]">
							<span className="block">{completedLessons} of {module.lessons.length} lessons read</span>
							<span className={`block ${quizAttempt?.status === "completed" || quizAttempt?.status === "expired" ? "font-semibold text-[#005b6b]" : ""}`}>
								{quizAttempt?.status === "completed" || quizAttempt?.status === "expired"
									? `${quizAttempt.status === "expired" ? "Time expired · " : ""}Last score: ${quizAttempt.score ?? 0}/${quizAttempt.maxScore ?? 20}`
									: quizAttempt?.status === "in-progress"
										? "Quiz in progress"
										: "20-question quiz · 20-minute limit"}
							</span>
						</span>
						<div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
							{nextLesson && (
								<Link to={`/modules/programs/ccna-cybersecurity/knowledge-hub/${nextLesson.slug}`} className="rounded-full border border-[#9fc8ce] px-5 py-2.5 text-sm font-semibold text-[#005b6b] transition hover:bg-[#e8f3f4]">
									{completedLessons === 0 ? "Start Learning" : "Continue Learning"}
								</Link>
							)}
							<ProgramModuleQuizAction programKey={PROGRAM_KEY} basePath={PROGRAM_PATH} module={module} />
						</div>
					</div>
				</div>
			)}
		</article>
	);
}

export default function CCNACybersecurityDashboard() {
	const { profile } = useAuth();
	const userId = profile?.userId;
	const [openModuleIndex, setOpenModuleIndex] = useState(null);
	const [progressState, setProgressState] = useState(() => ({
		userId,
		progress: userId ? readCcnaCybersecurityProgress(userId) : { openedModules: [], openedLessons: [], completedLessons: [], recentLesson: null },
	}));
	const progress = progressState.userId === userId
		? progressState.progress
		: userId ? readCcnaCybersecurityProgress(userId) : { openedModules: [], openedLessons: [], completedLessons: [], recentLesson: null };
	const activeModule = CCNA_CYBERSECURITY_CURRICULUM.find((module) => module.number === [...progress.openedModules].at(-1));
	const completedModules = CCNA_CYBERSECURITY_CURRICULUM.filter((module) =>
		module.lessons.length > 0 &&
		module.lessons.every((lesson) => progress.completedLessons.includes(lesson.slug)),
	).length;
	const modulesLeft = CCNA_CYBERSECURITY_CURRICULUM.length - completedModules;
	const quizProgress = userId ? readProgramModuleQuizProgress(PROGRAM_KEY, userId) : { modules: {} };
	const quizScore = getProgramModuleQuizAverage(PROGRAM_KEY, userId);
	const attemptedQuizzes = CCNA_CYBERSECURITY_CURRICULUM.filter((module) => {
		const attempt = quizProgress.modules[module.number];
		return isCurrentProgramModuleQuizAttempt(attempt) && (
			["completed", "expired"].includes(attempt.status) ||
			Object.keys(attempt.answers ?? {}).length > 0
		);
	}).length;

	function toggleModule(index) {
		const opening = openModuleIndex !== index;
		setOpenModuleIndex(opening ? index : null);
		const module = CCNA_CYBERSECURITY_CURRICULUM[index];
		if (opening && userId && module) {
			setProgressState({ userId, progress: markCcnaCybersecurityModuleOpened(userId, module.number) });
		}
	}

	return (
		<CCNAProgramDashboard
			programName="CCNA Cybersecurity"
			badge={CybersecurityBadge}
			modules={programModules}
			activeModule={activeModule ?? CCNA_CYBERSECURITY_CURRICULUM[0]}
			modulesLeft={modulesLeft}
			modulesSummary={`${attemptedQuizzes} of ${CCNA_CYBERSECURITY_CURRICULUM.length} quizzes attempted`}
			quizScore={quizScore}
			gradebookPath={`${PROGRAM_PATH}/gradebook`}
			heroIntros={HERO_INTROS}
			quote={HERO_INTROS[0]}
			heroActions={<ProgramQuizControls programKey={PROGRAM_KEY} basePath={PROGRAM_PATH} modules={CCNA_CYBERSECURITY_CURRICULUM} learningProgress={progress} />}
			topStats={(
				<>
					<div className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
						<strong className="text-xl leading-none tracking-tight text-[#071126] sm:text-[2rem]">{attemptedQuizzes}/{CCNA_CYBERSECURITY_CURRICULUM.length}</strong>
						<span className="text-[11px] leading-tight text-[#6f7d99] sm:max-w-20 sm:text-sm">Quizzes attempted</span>
					</div>
					<div className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3 sm:pl-7">
						<strong className="text-xl leading-none tracking-tight text-[#071126] sm:text-[2rem]">{quizScore}%</strong>
						<span className="text-[11px] leading-tight text-[#6f7d99] sm:max-w-20 sm:text-sm">Quiz average</span>
					</div>
					<div className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3 sm:pl-7">
						<strong className="text-xl leading-none tracking-tight text-[#071126] sm:text-[2rem]">{modulesLeft}</strong>
						<span className="text-[11px] leading-tight text-[#6f7d99] sm:max-w-20 sm:text-sm">Modules left</span>
					</div>
				</>
			)}
			renderModules={() => (
				<div className="space-y-3">
					{CCNA_CYBERSECURITY_CURRICULUM.map((module, index) => (
						<CybersecurityModuleCard
							key={module.number}
							module={module}
							index={index}
							isOpen={openModuleIndex === index}
							progress={progress}
							quizAttempt={isCurrentProgramModuleQuizAttempt(quizProgress.modules[module.number]) ? quizProgress.modules[module.number] : null}
							onToggle={() => toggleModule(index)}
						/>
					))}
				</div>
			)}
			practiceQuizzes={(
				<ProgramModuleQuizPanel
					programKey={PROGRAM_KEY}
					basePath={PROGRAM_PATH}
					modules={CCNA_CYBERSECURITY_CURRICULUM}
				/>
			)}
			description="Strengthen your security foundations and learn to recognize, investigate, and respond to network threats."
			descriptionAccent="network threats."
			overviewDescription="A guided path from security fundamentals to monitoring, analysis, and response."
			focusAreas="Explore security fundamentals, security monitoring, host-based analysis, network intrusion analysis, and security policies and procedures."
		/>
	);
}
