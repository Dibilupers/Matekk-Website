import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "../../../../../context/auth-context";
import {
	getCcnaModuleQuizAttemptHistory,
	isCurrentCcnaModuleQuizAttempt,
	readCcnaModuleQuizProgress,
} from "../../../../../utils/ccnaModuleQuizProgress";
import { readCcnaExamProgress, readCcnaShortExamProgress } from "../../../../../utils/ccnaShortExamSession";
import { readCcnaMockExamResults } from "../../../../../utils/ccnaGradebook";
import { readGradebookAssessments } from "../../../../../utils/gradebookApi";
import { CCNA_MODULE_QUIZZES } from "./ccnaModuleQuizData";
import { CCNA_EXAMS } from "./ccnaExamFormats";

const EMPTY_PROGRESS = { activeModule: null, modules: {} };

function getGradeTone(score) {
	if (!Number.isFinite(score)) {
		return {
			text: "text-[#52616e]",
			fill: "bg-[#9aa7b1]",
			badge: "bg-[#edf1f3] text-[#52616e]",
		};
	}
	if (score >= 80) {
		return {
			text: "text-[#16724e]",
			fill: "bg-[#21875d]",
			badge: "bg-[#dff4ec] text-[#16724e]",
		};
	}
	if (score >= 70) {
		return {
			text: "text-[#9a6700]",
			fill: "bg-[#d99b16]",
			badge: "bg-[#fff3cc] text-[#8a5a00]",
		};
	}
	return {
		text: "text-[#b42318]",
		fill: "bg-[#d04438]",
		badge: "bg-[#fff0ed] text-[#b42318]",
	};
}

function getModuleRows(progress, storedAssessments) {
	return CCNA_MODULE_QUIZZES.flatMap((quiz, index) => {
		const attempt = progress.modules[quiz.number];
		const isCurrentAttempt = isCurrentCcnaModuleQuizAttempt(attempt);
		const localHistory = isCurrentAttempt
			? getCcnaModuleQuizAttemptHistory(attempt, quiz.questions.length)
				.filter((result) => Number.isInteger(result.attemptNumber) && Number.isFinite(result.score))
			: [];
		const storedHistory = storedAssessments
			.filter((result) => result.type === "quiz" && result.moduleNumber === quiz.number)
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
				id: `${quiz.number}-upcoming`,
				name: `${quiz.number} ${quiz.title}`,
				status: "upcoming",
				statusLabel: "Not started",
				submittedAt: null,
				attempts: 0,
				points: null,
				bestPoints: null,
				order: index * 100,
			}];
		}
		const bestCandidates = history.map((result) => ({
			score: result.score,
			maxScore: Number.isFinite(result.maxScore) && result.maxScore > 0
				? result.maxScore
				: quiz.questions.length,
		}));
		if (isCurrentAttempt && Number.isFinite(attempt.bestScore)) {
			bestCandidates.push({ score: attempt.bestScore, maxScore: quiz.questions.length });
		}
		const bestPoints = bestCandidates.reduce(
			(best, candidate) => !best || candidate.score / candidate.maxScore > best.score / best.maxScore
				? candidate
				: best,
			null,
		);
		const historyRows = history.map((result) => {
			const resultMaxScore = Number.isFinite(result.maxScore) && result.maxScore > 0
				? result.maxScore
				: quiz.questions.length;
			return {
				id: `${quiz.number}-attempt-${result.attemptNumber}`,
				name: `${quiz.number} ${quiz.title}`,
				status: "graded",
				statusLabel: result.status === "expired" ? "Time expired" : null,
				submittedAt: result.submittedAt,
				attempts: result.attemptNumber,
				points: { score: result.score, maxScore: resultMaxScore },
				bestPoints,
				order: index * 100 + result.attemptNumber,
			};
		});

		if (isCurrentAttempt && attempt.status === "in-progress") {
			return [
				...historyRows,
				{
					id: `${quiz.number}-in-progress`,
					name: `${quiz.number} ${quiz.title}`,
					status: "in-progress",
					submittedAt: null,
					attempts: attempt.attempts ?? 0,
					points: null,
					bestPoints,
					order: index * 100 + 99,
				},
			];
		}

		if (historyRows.length > 0) return historyRows;
		return [{
			id: quiz.number,
			name: `${quiz.number} ${quiz.title}`,
			status: "upcoming",
			submittedAt: null,
			attempts: 0,
			points: null,
			bestPoints: null,
			order: index * 100,
		}];
	});
}

function getExamRows(examProgressByKey, examResults, storedAssessments) {
	return Object.values(CCNA_EXAMS).map((exam, index) => {
		const progress = examProgressByKey[exam.name];
		const resultById = new Map(
			examResults.filter((result) => result.title === exam.name).map((result) => [result.id, result]),
		);
		for (const result of storedAssessments) {
			if (result.type === "exam" && result.title === exam.name) {
				resultById.set(result.id, result);
			}
		}
		const results = [...resultById.values()]
			.sort((first, second) => first.submittedAt - second.submittedAt);
		const latestResult = results.at(-1);
		const bestResult = results.reduce(
			(best, result) => !best || result.score / result.maxScore > best.score / best.maxScore ? result : best,
			null,
		);
		const hasLegacyShortResult = exam.name === "Short Exam" &&
			!latestResult &&
			["completed", "expired"].includes(progress.status) &&
			progress.maxScore > 0;
		const points = latestResult
			? { score: latestResult.score, maxScore: latestResult.maxScore }
			: hasLegacyShortResult
				? { score: progress.score, maxScore: progress.maxScore }
				: null;
		const grade = points ? Math.round((points.score / points.maxScore) * 100) : null;
		const bestPoints = bestResult
			? { score: bestResult.score, maxScore: bestResult.maxScore }
			: points;
		const bestGrade = bestPoints ? Math.round((bestPoints.score / bestPoints.maxScore) * 100) : null;
		const isInProgress = progress.status === "in-progress";
		const isExpired = progress.status === "expired" && !latestResult;

		return {
			id: exam.name.toLowerCase().replaceAll(" ", "-"),
			name: exam.name,
			status: isInProgress ? "in-progress" : points ? "graded" : "upcoming",
			statusLabel: isExpired ? "Time expired" : null,
			submittedAt: latestResult?.submittedAt ?? null,
			deadline: isInProgress ? progress.deadline : null,
			attempts: Math.max(results.length, hasLegacyShortResult ? 1 : 0) + Number(isInProgress),
			points,
			grade,
			bestPoints,
			bestGrade,
			order: index,
		};
	});
}

function formatDate(timestamp) {
	if (!Number.isFinite(timestamp)) return "--";
	return new Intl.DateTimeFormat(undefined, {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(timestamp);
}

function sortRows(rows, sort) {
	return [...rows].sort((first, second) => {
		if (sort === "recent" || sort === "oldest") {
			const difference = (first.submittedAt ?? 0) - (second.submittedAt ?? 0);
			if (difference !== 0) return sort === "recent" ? -difference : difference;
		} else if (sort === "highest" || sort === "lowest") {
			const firstGrade = first.points ? first.points.score / first.points.maxScore : -1;
			const secondGrade = second.points ? second.points.score / second.points.maxScore : -1;
			const difference = firstGrade - secondGrade;
			if (difference !== 0) return sort === "highest" ? -difference : difference;
		}
		return first.order - second.order;
	});
}

function AssessmentTable({ title, rows, filter, sort }) {
	const [isOpen, setIsOpen] = useState(true);
	const visibleRows = sortRows(
		rows.filter((row) => filter === "all" || row.status === filter),
		sort,
	);
	const Chevron = isOpen ? ChevronUp : ChevronDown;
	const sectionId = `gradebook-${title.toLowerCase().replaceAll(" ", "-")}`;

	return (
		<section className="overflow-hidden border border-[#dce4e8] bg-white">
			<header className="flex min-h-14 items-center justify-between gap-4 bg-[#f2f5f6] px-5 py-3">
				<h2 id={`${sectionId}-title`} className="text-base font-bold text-[#152536]">{title}</h2>
				<button
					type="button"
					onClick={() => setIsOpen((open) => !open)}
					aria-expanded={isOpen}
					aria-controls={sectionId}
					aria-label={`${isOpen ? "Collapse" : "Expand"} ${title}`}
					className="flex h-9 w-9 items-center justify-center rounded-md bg-[#087a91] text-white transition hover:bg-[#06677a]"
				>
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
										{row.statusLabel && <span className="ml-2 text-sm font-medium text-[#a44b13]">{row.statusLabel}</span>}
									</th>
									<td className="whitespace-nowrap px-5 py-4 text-[#445363]">{formatDate(row.submittedAt)}</td>
									<td className="px-5 py-4 text-center text-[#445363]">{row.attempts || "--"}</td>
									<td className="px-5 py-4 text-right">
										{row.points ? (
											<span className={`inline-flex min-w-[68px] justify-center rounded-full px-3 py-1.5 text-sm font-bold tabular-nums ${getGradeTone(Math.round((row.points.score / row.points.maxScore) * 100)).badge}`}>
												{row.points.score}/{row.points.maxScore}
											</span>
										) : <span className="text-[#8895a0]">--</span>}
									</td>
								</tr>
							))}
							{visibleRows.length === 0 && (
								<tr><td colSpan={4} className="px-4 py-5 text-center text-sm text-[#71808a]">No assessments match this filter.</td></tr>
							)}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}

export default function CCNAGradebook() {
	const { profile } = useAuth();
	const userId = profile?.userId;
	const welcomeText = `Welcome, ${profile?.username ?? "Student"}!`;
	const [prefersReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	const [typedWelcome, setTypedWelcome] = useState(() => prefersReducedMotion ? welcomeText : "");
	const [backendGradebook, setBackendGradebook] = useState({ userId: null, assessments: [], error: null });
	useEffect(() => {
		if (!userId) return undefined;
		let isActive = true;
		readGradebookAssessments("ccna", userId)
			.then((assessments) => {
				if (isActive) setBackendGradebook({ userId, assessments, error: null });
			})
			.catch((error) => {
				console.error("Unable to load the backend CCNA gradebook.", error);
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
	}, [userId]);
	const progress = userId ? readCcnaModuleQuizProgress(userId) : EMPTY_PROGRESS;
	const shortExamProgress = readCcnaShortExamProgress(userId);
	const examProgressByKey = Object.fromEntries(Object.values(CCNA_EXAMS).map((exam) => [
		exam.name,
		exam.name === "Short Exam"
			? shortExamProgress
			: readCcnaExamProgress(exam.sessionKey, userId),
	]));
	const examResults = readCcnaMockExamResults(userId);
	const storedAssessments = backendGradebook.userId === userId ? backendGradebook.assessments : [];
	const moduleRows = getModuleRows(progress, storedAssessments);
	const examRows = getExamRows(examProgressByKey, examResults, storedAssessments);
	const allRows = [...moduleRows, ...examRows];
	const [filter, setFilter] = useState("all");
	const [sort, setSort] = useState("default");
	const latestModuleRows = CCNA_MODULE_QUIZZES.flatMap((quiz) => {
		const attempts = moduleRows
			.filter((row) => row.id.startsWith(`${quiz.number}-attempt-`) && row.status === "graded")
			.sort((first, second) => first.attempts - second.attempts);
		return attempts.length ? [attempts.at(-1)] : [];
	});
	const gradedExamRows = examRows.filter((row) => row.points);
	const completedExamCount = gradedExamRows.length;
	const bestAssessment = allRows.filter((row) => row.status === "graded").reduce(
		(best, row) => !best || row.bestGrade > best.bestGrade ? row : best,
		null,
	);
	const nextAssessment = allRows.find((row) => row.status !== "graded");
	const quizPoints = latestModuleRows.reduce((total, row) => total + row.points.score, 0);
	const quizPossiblePoints = latestModuleRows.reduce((total, row) => total + row.points.maxScore, 0);
	const examPoints = gradedExamRows.reduce((total, row) => total + row.points.score, 0);
	const examPossiblePoints = gradedExamRows.reduce((total, row) => total + row.points.maxScore, 0);
	const overallPoints = quizPoints + examPoints;
	const overallPossiblePoints = quizPossiblePoints + examPossiblePoints;
	const classGrade = overallPossiblePoints
		? Math.round((overallPoints / overallPossiblePoints) * 100)
		: null;

	useEffect(() => {
		if (prefersReducedMotion) return undefined;

		let characterIndex = 0;
		let timeoutId;

		function typeWelcome() {
			characterIndex += 1;
			setTypedWelcome(welcomeText.slice(0, characterIndex));
			if (characterIndex < welcomeText.length) {
				timeoutId = window.setTimeout(typeWelcome, 45);
			}
		}

		timeoutId = window.setTimeout(typeWelcome, 140);
		return () => window.clearTimeout(timeoutId);
	}, [prefersReducedMotion, welcomeText]);

	return (
		<main className="ccna-page-enter min-h-screen bg-[#f5f7f8] pb-12 text-[#152536]">
			<div className="mx-auto max-w-[1680px] px-4 py-6 sm:px-8 lg:px-10 2xl:px-12">
				{backendGradebook.error && backendGradebook.userId === userId && (
					<p role="alert" className="mb-4 rounded-md border border-[#f2c6c3] bg-white px-4 py-3 text-sm font-medium text-[#b42318]">
						{backendGradebook.error}
					</p>
				)}
				<header className="relative">
					<div className="relative left-1/2 w-screen -translate-x-1/2 bg-[#087a91] px-4 py-6 text-white sm:px-8 sm:py-7 lg:px-10 2xl:px-12">
						<div className="mx-auto max-w-[1680px] px-2 sm:px-0">
							<Link to="/modules/programs/ccna" className="inline-flex items-center gap-2 text-base font-semibold text-white/85 transition hover:text-white">
								<ArrowLeft size={18} /> Back to course
							</Link>
							<div className="pt-3">
								<h1 aria-label={welcomeText} className="typewriter-caret text-3xl font-bold sm:text-4xl">{typedWelcome}</h1>
								<p className="mt-1 text-base text-white/85">Your grades and progress on CCNA</p>
							</div>
						</div>
					</div>
					<div className="relative left-1/2 w-screen -translate-x-1/2 bg-white shadow-sm">
						<div className="mx-auto grid max-w-[1680px] grid-cols-2 gap-4 px-4 py-5 sm:grid-cols-3 sm:gap-5 sm:px-8 sm:py-8 lg:px-10 xl:grid-cols-5 2xl:px-12">
							<SummaryStat label="Class grade" value={classGrade === null ? "--" : `${classGrade}%`} detail={overallPossiblePoints ? `${overallPoints}/${overallPossiblePoints} points` : "No graded assessments"} progress={classGrade ?? undefined} />
							<SummaryStat label="Quizzes completed" value={`${latestModuleRows.length} of ${CCNA_MODULE_QUIZZES.length}`} detail="module quizzes completed" />
							<SummaryStat label="Exams completed" value={`${completedExamCount} of ${Object.keys(CCNA_EXAMS).length}`} detail="exams completed" />
							<SummaryStat label="Best score" value={bestAssessment ? `${bestAssessment.bestPoints.score}/${bestAssessment.bestPoints.maxScore}` : "--"} detail={bestAssessment?.name ?? "No results yet"} gradeScore={bestAssessment?.bestGrade} />
							<SummaryStat label="Up next" value={nextAssessment?.name ?? "All complete"} detail={nextAssessment?.status === "in-progress" ? "In progress" : nextAssessment ? "Not submitted" : "Assessment list complete"} compactValue />
						</div>
					</div>
				</header>

				<div className="mt-6 flex flex-wrap items-center justify-end gap-x-5 gap-y-3 text-base">
					<label className="flex items-center gap-2 font-semibold text-[#334454]">
						Show
						<select value={filter} onChange={(event) => setFilter(event.target.value)} className="h-10 min-w-32 rounded-md border border-[#bcc8ce] bg-white px-3 font-normal text-[#233442] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a91]">
							<option value="all">All</option>
							<option value="graded">Completed</option>
							<option value="in-progress">In progress</option>
							<option value="upcoming">Not started</option>
						</select>
					</label>
					<label className="flex items-center gap-2 font-semibold text-[#334454]">
						Sort
						<select value={sort} onChange={(event) => setSort(event.target.value)} className="h-10 min-w-40 rounded-md border border-[#bcc8ce] bg-white px-3 font-normal text-[#233442] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a91]">
							<option value="default">Default</option>
							<option value="recent">Newest first</option>
							<option value="oldest">Oldest first</option>
							<option value="highest">Highest score</option>
							<option value="lowest">Lowest score</option>
						</select>
					</label>
				</div>

				<div className="mt-4 space-y-2">
					<div className="flex items-center justify-between bg-[#edf1f3] px-5 py-4 text-base font-bold">
						<span>Class Grades</span>
						<span className={getGradeTone(classGrade).text}>{classGrade === null ? "--" : `${classGrade}%`}</span>
					</div>
					<AssessmentTable title="Module Quizzes" rows={moduleRows} filter={filter} sort={sort} />
					<div className="flex items-center justify-between border border-[#dce4e8] bg-[#f2f5f6] px-5 py-4 text-sm text-[#4c5b67]">
						<strong className="font-medium">Module quizzes average</strong>
						<span className={getGradeTone(quizPossiblePoints ? Math.round(quizPoints / quizPossiblePoints * 100) : null).text}>{quizPossiblePoints ? `${quizPoints}/${quizPossiblePoints}` : "--"}</span>
					</div>
				</div>

				<div className="mt-8 space-y-2">
					<AssessmentTable title="Exams" rows={examRows} filter={filter} sort={sort} />
					<div className="flex items-center justify-between border border-[#dce4e8] bg-[#f2f5f6] px-5 py-4 text-sm text-[#4c5b67]">
						<strong className="font-medium">Exam average</strong>
						<span className={getGradeTone(examPossiblePoints ? Math.round(examPoints / examPossiblePoints * 100) : null).text}>{examPossiblePoints ? `${examPoints}/${examPossiblePoints}` : "--"}</span>
					</div>
				</div>
			</div>
		</main>
	);
}

function SummaryStat({ label, value, detail, progress, gradeScore, compactValue = false }) {
	const hasGrade = progress !== undefined || gradeScore !== undefined;
	const gradeTone = getGradeTone(gradeScore ?? progress);
	const progressValue = progress ?? 0;

	return (
		<div className="gradebook-stat-card min-h-[132px] min-w-0 rounded-md border border-[#e0e6e9] px-5 py-5">
			<div className="gradebook-stat-content">
				<p className="gradebook-stat-label text-sm text-[#687887]">{label}</p>
				<strong className={`gradebook-stat-value mt-1 block font-bold leading-tight ${compactValue ? "break-words text-lg" : "truncate text-2xl"} ${hasGrade ? gradeTone.text : "text-[#152536]"}`}>{value}</strong>
				{progress !== undefined && (
					<div role="progressbar" aria-label="Class grade" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressValue} className="gradebook-stat-progress-track mt-2 h-1.5 overflow-hidden rounded-full bg-[#e0e6e9]">
						<div className={`h-full transition-[width] duration-700 motion-reduce:transition-none ${gradeTone.fill}`} style={{ width: `${progressValue}%` }} />
					</div>
				)}
				<p className="gradebook-stat-detail mt-1 truncate text-sm text-[#6c7a86]">{detail}</p>
			</div>
		</div>
	);
}