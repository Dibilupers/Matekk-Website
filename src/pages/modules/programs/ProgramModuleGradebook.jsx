import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "../../../context/auth-context";
import { getCcnaModuleQuizAttemptHistory } from "../../../utils/ccnaModuleQuizProgress";
import {
	isCurrentProgramModuleQuizAttempt,
	readProgramModuleQuizProgress,
} from "../../../utils/programModuleQuizProgress";
import { readGradebookAssessments } from "../../../utils/gradebookApi";
import { getProgramExamFormats, LEGACY_PROGRAM_EXAM_NAMES } from "./programExamFormats";

function getGradeTone(score) {
	if (!Number.isFinite(score)) {
		return { text: "text-[#52616e]", fill: "bg-[#9aa7b1]", badge: "bg-[#edf1f3] text-[#52616e]" };
	}
	if (score >= 80) return { text: "text-[#16724e]", fill: "bg-[#21875d]", badge: "bg-[#dff4ec] text-[#16724e]" };
	if (score >= 70) return { text: "text-[#9a6700]", fill: "bg-[#d99b16]", badge: "bg-[#fff3cc] text-[#8a5a00]" };
	return { text: "text-[#b42318]", fill: "bg-[#d04438]", badge: "bg-[#fff0ed] text-[#b42318]" };
}

function getModuleRows(modules, progress, storedAssessments, programKey) {
	return modules.flatMap((module, index) => {
		const attempt = progress.modules[module.number];
		const isCurrentAttempt = isCurrentProgramModuleQuizAttempt(attempt, programKey, module.number);
		const keepsLegacyHistory = programKey === "ccna-cybersecurity" && module.number === "2.0";
		const localHistory = isCurrentAttempt || keepsLegacyHistory
			? getCcnaModuleQuizAttemptHistory(attempt, 20)
				.filter((result) => Number.isInteger(result.attemptNumber) && Number.isFinite(result.score))
			: [];
		const storedHistory = storedAssessments
			.filter((result) => result.type === "quiz" && result.moduleNumber === module.number)
			.map((result) => ({
				attemptNumber: result.attemptNumber,
				status: result.status,
				score: result.score,
				maxScore: result.maxScore,
				submittedAt: result.submittedAt,
			}))
			.filter((result) => Number.isInteger(result.attemptNumber));
		const historyByAttempt = new Map(localHistory.map((result) => [result.attemptNumber, result]));
		for (const result of storedHistory) historyByAttempt.set(result.attemptNumber, result);
		const history = [...historyByAttempt.values()]
			.sort((first, second) => first.attemptNumber - second.attemptNumber);

		if (!isCurrentAttempt && history.length === 0) {
			return [{
				id: `${module.number}-upcoming`,
				name: `${module.number} ${module.title}`,
				status: "upcoming",
				statusLabel: "Not started",
				submittedAt: null,
				attempts: 0,
				points: null,
				grade: null,
				bestPoints: null,
				bestGrade: null,
				order: index * 100,
			}];
		}

		const bestResult = history.reduce((best, result) => {
			const maxScore = Number.isFinite(result.maxScore) && result.maxScore > 0 ? result.maxScore : 20;
			const bestMaxScore = Number.isFinite(best?.maxScore) && best.maxScore > 0 ? best.maxScore : 20;
			return !best || result.score / maxScore > best.score / bestMaxScore
				? { ...result, maxScore }
				: best;
		}, null);
		const bestPoints = bestResult ? { score: bestResult.score, maxScore: bestResult.maxScore } : null;
		const bestGrade = bestPoints ? Math.round((bestPoints.score / bestPoints.maxScore) * 100) : null;
		const rows = history.map((result) => {
			const maxScore = Number.isFinite(result.maxScore) && result.maxScore > 0 ? result.maxScore : 20;
			return {
				id: `${module.number}-attempt-${result.attemptNumber}`,
				name: `${module.number} ${module.title}`,
				status: "graded",
				statusLabel: result.status === "expired" ? `Attempt ${result.attemptNumber} · Time expired` : `Attempt ${result.attemptNumber}`,
				submittedAt: result.submittedAt,
				attempts: result.attemptNumber,
				points: { score: result.score, maxScore },
				grade: Math.round((result.score / maxScore) * 100),
				bestPoints,
				bestGrade,
				order: index * 100 + result.attemptNumber,
			};
		});

		if (isCurrentAttempt && attempt.status === "in-progress") {
			rows.push({
				id: `${module.number}-in-progress`,
				name: `${module.number} ${module.title}`,
				status: "in-progress",
				statusLabel: `Attempt ${attempt.attempts ?? 1} · In progress`,
				submittedAt: null,
				deadline: attempt.deadline,
				attempts: attempt.attempts ?? 1,
				points: null,
				grade: null,
				bestPoints,
				bestGrade,
				order: index * 100 + 99,
			});
		}

		return rows.length > 0 ? rows : [{
			id: `${module.number}-upcoming`,
			name: `${module.number} ${module.title}`,
			status: "upcoming",
			statusLabel: "Not started",
			submittedAt: null,
			attempts: 0,
			points: null,
			grade: null,
			bestPoints,
			bestGrade,
			order: index * 100,
		}];
	});
}

function getExamRows(storedAssessments, programKey) {
	const examFormats = getProgramExamFormats(programKey) ?? {
		short: { name: "Short Exam" },
		medium: { name: "Medium Exam" },
		long: { name: "Long Exam" },
	};
	const examFormatLabels = { short: "Short", medium: "Medium", long: "Long" };
	const gradedExamFormats = Object.entries(examFormats).filter(([examKey]) =>
		programKey !== "fortinet-fortios" || examKey !== "all_questions",
	);
	const validExamAssessments = storedAssessments
		.filter((assessment) =>
			assessment.type === "exam" &&
			typeof assessment.title === "string" &&
			Number.isFinite(assessment.score) &&
			Number.isFinite(assessment.maxScore) &&
			assessment.maxScore > 0 &&
			Number.isFinite(assessment.submittedAt),
		);

	return gradedExamFormats.flatMap(([examKey, exam], examIndex) => {
		const savedTitle = `${exam.name} · ${exam.programName}`;
		const legacyTitles = (LEGACY_PROGRAM_EXAM_NAMES[examKey] ?? []).flatMap((name) =>
			exam.programName ? [`${name} · ${exam.programName}`, name] : [name],
		);
		const attempts = validExamAssessments
			.filter((assessment) =>
				assessment.examFormat === examKey ||
				assessment.title === savedTitle ||
				assessment.title === exam.name ||
				legacyTitles.includes(assessment.title),
			)
			.sort((first, second) => first.submittedAt - second.submittedAt);
		if (!attempts.length) {
			return [{
				id: `exam-${examKey}-upcoming`,
				name: exam.name,
				status: "upcoming",
				statusLabel: "Not started",
				submittedAt: null,
				attempts: 0,
				points: null,
				grade: null,
				bestPoints: null,
				bestGrade: null,
				order: 10000 + examIndex * 100,
			}];
		}
		const bestAssessment = attempts.reduce(
			(best, current) => current.score / current.maxScore > best.score / best.maxScore ? current : best,
			attempts[0],
		);
		return attempts.map((assessment, attemptIndex) => {
			const grade = Math.round((assessment.score / assessment.maxScore) * 100);
			return {
				id: assessment.id,
				name: exam.name,
				formatLabel: examFormatLabels[examKey] ?? null,
				status: "graded",
				statusLabel: attempts.length > 1 ? `Attempt ${attemptIndex + 1}` : null,
				submittedAt: assessment.submittedAt,
				attempts: attemptIndex + 1,
				points: { score: assessment.score, maxScore: assessment.maxScore },
				grade,
				bestPoints: { score: bestAssessment.score, maxScore: bestAssessment.maxScore },
				bestGrade: Math.round((bestAssessment.score / bestAssessment.maxScore) * 100),
				order: 10000 + examIndex * 100 + attemptIndex,
			};
		});
	});
}

function formatDate(timestamp) {
	if (!Number.isFinite(timestamp)) return "--";
	return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(timestamp);
}

function sortRows(rows, sort) {
	return [...rows].sort((first, second) => {
		if (sort === "recent" || sort === "oldest") {
			const difference = (first.submittedAt ?? 0) - (second.submittedAt ?? 0);
			if (difference !== 0) return sort === "recent" ? -difference : difference;
		} else if (sort === "highest" || sort === "lowest") {
			const difference = (first.points?.score ?? -1) - (second.points?.score ?? -1);
			if (difference !== 0) return sort === "highest" ? -difference : difference;
		}
		return first.order - second.order;
	});
}

function SummaryStat({ label, value, detail, progress, gradeScore, compactValue = false }) {
	const hasGrade = progress !== undefined || gradeScore !== undefined;
	const tone = getGradeTone(gradeScore ?? progress);
	const progressValue = progress ?? 0;
	return (
		<div className="gradebook-stat-card min-h-[132px] min-w-0 rounded-md border border-[#e0e6e9] px-5 py-5">
			<div className="gradebook-stat-content">
				<p className="gradebook-stat-label text-sm text-[#687887]">{label}</p>
				<strong className={`gradebook-stat-value mt-1 block font-bold leading-tight ${compactValue ? "break-words text-lg" : "truncate text-2xl"} ${hasGrade ? tone.text : "text-[#152536]"}`}>{value}</strong>
				{progress !== undefined && (
					<div role="progressbar" aria-label="Class grade" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressValue} className="gradebook-stat-progress-track mt-2 h-1.5 overflow-hidden rounded-full bg-[#e0e6e9]">
						<div className={`h-full transition-[width] duration-700 motion-reduce:transition-none ${tone.fill}`} style={{ width: `${progressValue}%` }} />
					</div>
				)}
				<p className="gradebook-stat-detail mt-1 truncate text-sm text-[#6c7a86]">{detail}</p>
			</div>
		</div>
	);
}

function AssessmentTable({ title, rows, filter, sort }) {
	const [isOpen, setIsOpen] = useState(true);
	const visibleRows = sortRows(rows.filter((row) => filter === "all" || row.status === filter), sort);
	const Chevron = isOpen ? ChevronUp : ChevronDown;
	const sectionId = `gradebook-${title.toLowerCase().replaceAll(" ", "-")}`;

	return (
		<section className="overflow-hidden border border-[#dce4e8] bg-white">
			<header className="flex min-h-14 items-center justify-between gap-4 bg-[#f2f5f6] px-5 py-3">
				<h2 id={`${sectionId}-title`} className="text-base font-bold text-[#152536]">{title}</h2>
				<button type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-controls={sectionId} aria-label={`${isOpen ? "Collapse" : "Expand"} ${title}`} className="gradebook-section-toggle flex h-9 w-9 items-center justify-center rounded-md bg-[#087a91] text-white transition hover:bg-[#06677a]">
					<Chevron size={19} />
				</button>
			</header>
			{isOpen && (
				<div id={sectionId} className="overflow-x-auto">
					<table className="w-full min-w-[620px] border-collapse text-left text-base">
						<thead className="border-y border-[#e6ebee] text-sm text-[#687887]">
							<tr>
								<th scope="col" className="px-5 py-3 font-medium">Name</th>
								<th scope="col" className="px-5 py-3 font-medium">Submission date</th>
								<th scope="col" className="px-5 py-3 text-center font-medium">Attempts</th>
								<th scope="col" className="px-5 py-3 text-right font-medium">Score</th>
							</tr>
						</thead>
						<tbody>
							{visibleRows.map((row) => (
								<tr key={row.id} className="border-b border-[#e9edef] last:border-0">
									<th scope="row" className="px-5 py-4 font-semibold text-[#172536]">
										<span>{row.name}</span>
										{row.formatLabel && <span className="gradebook-format-badge ml-2 rounded-full bg-[#e8f3f4] px-2.5 py-1 text-xs font-semibold text-[#005b6b]">{row.formatLabel} format</span>}
										{row.statusLabel && <span className="ml-2 text-sm font-medium text-[#a44b13]">{row.statusLabel}</span>}
									</th>
									<td className="whitespace-nowrap px-5 py-4 text-[#445363]">{formatDate(row.submittedAt)}</td>
									<td className="px-5 py-4 text-center text-[#445363]">{row.attempts || "--"}</td>
									<td className="px-5 py-4 text-right">
										{row.points ? <span className={`inline-flex min-w-[68px] justify-center rounded-full px-3 py-1.5 text-sm font-bold tabular-nums ${getGradeTone(row.grade).badge}`}>{row.points.score}/{row.points.maxScore}</span> : <span className="text-[#8895a0]">--</span>}
									</td>
								</tr>
							))}
							{visibleRows.length === 0 && <tr><td colSpan={4} className="px-4 py-5 text-center text-sm text-[#71808a]">No assessments match this filter.</td></tr>}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}

export default function ProgramModuleGradebook({ programKey, programName, modules, dashboardPath }) {
	const { profile } = useAuth();
	const isCompTIAProgram = ["comptia-network-plus", "comptia-security-plus"].includes(programKey);
	const isFortinetProgram = programKey === "fortinet-fortios";
	const userId = profile?.userId;
	const welcomeText = `Welcome, ${profile?.username ?? "Student"}!`;
	const [prefersReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	const [typedWelcome, setTypedWelcome] = useState(() => prefersReducedMotion ? welcomeText : "");
	const [filter, setFilter] = useState("all");
	const [sort, setSort] = useState("default");
	const [backendGradebook, setBackendGradebook] = useState({ userId: null, assessments: [], error: null });
	useEffect(() => {
		if (!userId) return undefined;
		let isActive = true;
		readGradebookAssessments(programKey, userId)
			.then((assessments) => {
				if (isActive) setBackendGradebook({ userId, assessments, error: null });
			})
			.catch((error) => {
				console.error(`Unable to load the backend ${programKey} gradebook.`, error);
				if (isActive) {
					setBackendGradebook({
						userId,
						assessments: [],
						error: "Backend gradebook results could not be loaded. Showing locally saved results.",
					});
				}
			});
		return () => {
			isActive = false;
		};
	}, [programKey, userId]);
	const progress = userId ? readProgramModuleQuizProgress(programKey, userId) : { activeModule: null, modules: {} };
	const storedAssessments = backendGradebook.userId === userId ? backendGradebook.assessments : [];
	const moduleRows = getModuleRows(modules, progress, storedAssessments, programKey);
	const examRows = getExamRows(storedAssessments, programKey);
	const completedExamCount = new Set(examRows.filter((row) => row.status === "graded").map((row) => row.name)).size;
	const completedRows = moduleRows.filter((row) => row.status === "graded");
	const latestRows = modules.flatMap((module) => {
		const attempts = completedRows.filter((row) => row.name.startsWith(`${module.number} `)).sort((first, second) => first.attempts - second.attempts);
		return attempts.length ? [attempts.at(-1)] : [];
	});
	const latestExamRowsByTitle = new Map();
	for (const row of examRows) {
		if (row.status !== "graded" || !row.points) continue;
		const previous = latestExamRowsByTitle.get(row.name);
		if (!previous || row.submittedAt > previous.submittedAt) latestExamRowsByTitle.set(row.name, row);
	}
	const latestExamRows = [...latestExamRowsByTitle.values()];
	const bestExamRowsByTitle = new Map();
	for (const row of examRows) {
		if (row.status !== "graded" || !row.bestPoints || !Number.isFinite(row.bestGrade)) continue;
		const previous = bestExamRowsByTitle.get(row.name);
		if (!previous || row.bestGrade > previous.bestGrade) bestExamRowsByTitle.set(row.name, row);
	}
	const quizPoints = latestRows.reduce((total, row) => total + row.points.score, 0);
	const quizPossiblePoints = latestRows.reduce((total, row) => total + row.points.maxScore, 0);
	const examPoints = latestExamRows.reduce((total, row) => total + row.points.score, 0);
	const examPossiblePoints = latestExamRows.reduce((total, row) => total + row.points.maxScore, 0);
	const totalPoints = quizPoints + examPoints;
	const totalPossiblePoints = quizPossiblePoints + examPossiblePoints;
	const classGrade = totalPossiblePoints ? Math.round((totalPoints / totalPossiblePoints) * 100) : null;
	const bestAssessment = [...latestRows, ...bestExamRowsByTitle.values()]
		.reduce((best, row) => !best || row.bestGrade > best.bestGrade ? row : best, null);
	const nextAssessment = [...moduleRows, ...examRows].find((row) => row.status !== "graded");

	useEffect(() => {
		if (prefersReducedMotion) return undefined;
		let characterIndex = 0;
		let timeoutId;
		function typeWelcome() {
			characterIndex += 1;
			setTypedWelcome(welcomeText.slice(0, characterIndex));
			if (characterIndex < welcomeText.length) timeoutId = window.setTimeout(typeWelcome, 45);
		}
		timeoutId = window.setTimeout(typeWelcome, 140);
		return () => window.clearTimeout(timeoutId);
	}, [prefersReducedMotion, welcomeText]);

	return (
		<main className={`ccna-page-enter min-h-screen bg-[#f5f7f8] pb-12 text-[#152536] ${isCompTIAProgram ? "comptia-gradebook" : ""} ${isFortinetProgram ? "fortinet-gradebook" : ""}`}>
			<div className="mx-auto max-w-[1680px] px-4 py-6 sm:px-8 lg:px-10 2xl:px-12">
				{backendGradebook.error && backendGradebook.userId === userId && (
					<p role="alert" className="mb-4 rounded-md border border-[#f2c6c3] bg-white px-4 py-3 text-sm font-medium text-[#b42318]">
						{backendGradebook.error}
					</p>
				)}
				<header className="ccna-gradebook-summary">
					<div className="ccna-gradebook-banner relative px-6 py-6 text-white sm:px-10 sm:py-7">
						<Link to={dashboardPath} className="absolute left-6 top-5 inline-flex items-center gap-2 text-base font-semibold text-white/85 transition hover:text-white sm:left-10 sm:top-6">
							<ArrowLeft size={18} /> Back to course
						</Link>
						<div className="mx-auto max-w-[1680px] pt-10">
							<h1 aria-label={welcomeText} className="typewriter-caret text-3xl font-bold sm:text-4xl">{typedWelcome}</h1>
							<p className="mt-1 text-base text-white/85">Your grades and progress on {programName}</p>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 sm:gap-5 sm:p-8 xl:grid-cols-5">
						<SummaryStat label="Class grade" value={classGrade === null ? "--" : `${classGrade}%`} detail={totalPossiblePoints ? `${totalPoints}/${totalPossiblePoints} points` : "No graded assessments"} progress={classGrade ?? undefined} />
						<SummaryStat label="Quizzes completed" value={`${latestRows.length} of ${modules.length}`} detail="module quizzes completed" />
						<SummaryStat label="Exams completed" value={`${completedExamCount} of ${examRows.length}`} detail="exams completed" />
						<SummaryStat label="Best score" value={bestAssessment ? `${bestAssessment.bestPoints.score}/${bestAssessment.bestPoints.maxScore}` : "--"} detail={bestAssessment?.name ?? "No results yet"} gradeScore={bestAssessment?.bestGrade} />
						<SummaryStat label="Up next" value={nextAssessment?.name ?? "All complete"} detail={nextAssessment?.status === "in-progress" ? "In progress" : nextAssessment ? "Not submitted" : "All assessments complete"} compactValue />
					</div>
				</header>

				<div className="mt-6 flex flex-wrap items-center justify-end gap-x-5 gap-y-3 text-base">
					<label className="flex items-center gap-2 font-semibold text-[#334454]">Show
						<select value={filter} onChange={(event) => setFilter(event.target.value)} className="gradebook-filter h-10 min-w-32 rounded-md border border-[#bcc8ce] bg-white px-3 font-normal text-[#233442] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a91]">
							<option value="all">All</option><option value="graded">Completed</option><option value="in-progress">In progress</option><option value="upcoming">Not started</option>
						</select>
					</label>
					<label className="flex items-center gap-2 font-semibold text-[#334454]">Sort
						<select value={sort} onChange={(event) => setSort(event.target.value)} className="gradebook-sort h-10 min-w-40 rounded-md border border-[#bcc8ce] bg-white px-3 font-normal text-[#233442] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a91]">
							<option value="default">Default</option><option value="recent">Newest first</option><option value="oldest">Oldest first</option><option value="highest">Highest score</option><option value="lowest">Lowest score</option>
						</select>
					</label>
				</div>

				<div className="mt-4 space-y-2">
					<div className="flex items-center justify-between bg-[#edf1f3] px-5 py-4 text-base font-bold">
						<span>Class Grades</span><span className={getGradeTone(classGrade).text}>{classGrade === null ? "--" : `${classGrade}%`}</span>
					</div>
					<AssessmentTable title="Module Quizzes" rows={moduleRows} filter={filter} sort={sort} />
					<AssessmentTable title="Program Exams" rows={examRows} filter={filter} sort={sort} />
					<div className="flex items-center justify-between border border-[#dce4e8] bg-[#f2f5f6] px-5 py-4 text-sm text-[#4c5b67]">
						<strong className="font-medium">Module quizzes average</strong>
						<span className={getGradeTone(quizPossiblePoints ? Math.round((quizPoints / quizPossiblePoints) * 100) : null).text}>
							{quizPossiblePoints ? `${quizPoints}/${quizPossiblePoints} (${Math.round((quizPoints / quizPossiblePoints) * 100)}%)` : "--"}
						</span>
					</div>
				</div>
			</div>
		</main>
	);
}
