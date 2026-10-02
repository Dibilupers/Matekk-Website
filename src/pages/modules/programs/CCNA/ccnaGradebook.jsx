import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import {
	getCcnaModuleQuizAttemptHistory,
	isCurrentCcnaModuleQuizAttempt,
	readCcnaModuleQuizProgress,
} from "../../../../utils/ccnaModuleQuizProgress";
import { readCcnaMockExamResults } from "../../../../utils/ccnaGradebook";
import { CCNA_MODULE_QUIZZES } from "./ccnaModuleQuizData";

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

function getModuleRows(progress) {
	return CCNA_MODULE_QUIZZES.flatMap((quiz, index) => {
		const attempt = progress.modules[quiz.number];
		const isCurrentAttempt = isCurrentCcnaModuleQuizAttempt(attempt);
		const history = isCurrentAttempt
			? getCcnaModuleQuizAttemptHistory(attempt, quiz.questions.length)
				.filter((result) => Number.isInteger(result.attemptNumber) && Number.isFinite(result.score))
				.sort((first, second) => first.attemptNumber - second.attemptNumber)
			: [];
		const bestScore = isCurrentAttempt && Number.isFinite(attempt.bestScore)
			? attempt.bestScore
			: Math.max(0, ...history.map((result) => result.score));
		const bestPoints = history.length
			? { score: Math.round((bestScore / quiz.questions.length) * 100), maxScore: 100 }
			: null;
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
				points: { score: Math.round((result.score / resultMaxScore) * 100), maxScore: 100 },
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

function getMockExamRows(results) {
	if (results.length === 0) {
		return [{
			id: "mock-exam",
			name: "Mock exam",
			status: "upcoming",
			submittedAt: null,
			attempts: 0,
			points: null,
			order: 0,
		}];
	}

	return [...results]
		.sort((first, second) => first.submittedAt - second.submittedAt)
		.map((result, index) => ({
			id: result.id,
			name: index === 0 ? "Mock exam" : `Mock exam ${index}`,
			status: "graded",
			submittedAt: result.submittedAt,
			attempts: 1,
			points: { score: Math.round((result.score / result.maxScore) * 100), maxScore: 100 },
			bestPoints: { score: Math.round((result.score / result.maxScore) * 100), maxScore: 100 },
			order: index,
		}));
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
			const difference = (first.points?.score ?? -1) - (second.points?.score ?? -1);
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
			<header className="flex min-h-12 items-center justify-between gap-4 bg-[#f2f5f6] px-4 py-2.5">
				<h2 id={`${sectionId}-title`} className="text-sm font-bold text-[#152536]">{title}</h2>
				<button
					type="button"
					onClick={() => setIsOpen((open) => !open)}
					aria-expanded={isOpen}
					aria-controls={sectionId}
					aria-label={`${isOpen ? "Collapse" : "Expand"} ${title}`}
					className="flex h-8 w-8 items-center justify-center rounded-md bg-[#087a91] text-white transition hover:bg-[#06677a]"
				>
					<Chevron size={17} />
				</button>
			</header>
			{isOpen && (
				<div id={sectionId} className="overflow-x-auto">
					<table className="w-full min-w-[560px] border-collapse text-left text-sm">
						<thead className="border-y border-[#e6ebee] text-xs text-[#687887]">
							<tr>
								<th scope="col" className="px-4 py-2.5 font-medium">Name</th>
								<th scope="col" className="px-4 py-2.5 font-medium">Submission date</th>
								<th scope="col" className="px-4 py-2.5 text-center font-medium">Attempts</th>
								<th scope="col" className="px-4 py-2.5 text-right font-medium">Points</th>
							</tr>
						</thead>
						<tbody>
							{visibleRows.map((row) => (
								<tr key={row.id} className="border-b border-[#e9edef] last:border-0">
									<th scope="row" className="px-4 py-3 font-semibold text-[#172536]">
										<span>{row.name}</span>
										{row.statusLabel && <span className="ml-2 text-xs font-medium text-[#a44b13]">{row.statusLabel}</span>}
									</th>
									<td className="whitespace-nowrap px-4 py-3 text-[#445363]">{formatDate(row.submittedAt)}</td>
									<td className="px-4 py-3 text-center text-[#445363]">{row.attempts || "--"}</td>
									<td className="px-4 py-3 text-right">
										{row.points ? (
											<span className={`inline-flex min-w-[58px] justify-center rounded-full px-2.5 py-1 text-xs font-bold tabular-nums ${getGradeTone(row.points.score).badge}`}>
												{row.points.score}/{row.points.maxScore}
											</span>
										) : <span className="text-[#8895a0]">--/100</span>}
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
	const progress = userId ? readCcnaModuleQuizProgress(userId) : EMPTY_PROGRESS;
	const mockResults = userId ? readCcnaMockExamResults(userId) : [];
	const moduleRows = getModuleRows(progress);
	const mockExamRows = getMockExamRows(mockResults);
	const allRows = [...moduleRows, ...mockExamRows];
	const [filter, setFilter] = useState("all");
	const [sort, setSort] = useState("default");
	const gradedRows = allRows.filter((row) => row.status === "graded");
	const classGrade = gradedRows.length
		? Math.round(gradedRows.reduce((total, row) => total + row.points.score, 0) / gradedRows.length)
		: null;
	const bestAssessment = gradedRows.reduce(
		(best, row) => !best || row.bestPoints.score > best.bestPoints.score ? row : best,
		null,
	);
	const nextAssessment = allRows.find((row) => row.status !== "graded");
	const totalPoints = gradedRows.reduce((total, row) => total + row.points.score, 0);
	const totalPossiblePoints = gradedRows.length * 100;
	const moduleAverage = moduleRows.filter((row) => row.status === "graded");
	const modulePoints = moduleAverage.reduce((total, row) => total + row.points.score, 0);
	const modulePossiblePoints = moduleAverage.length * 100;
	const gradedMockRows = mockExamRows.filter((row) => row.status === "graded");
	const mockPoints = gradedMockRows.reduce((total, row) => total + row.points.score, 0);
	const mockPossiblePoints = gradedMockRows.length * 100;

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
			<div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
				<header className="overflow-hidden bg-white shadow-sm">
					<div className="bg-[#087a91] px-6 py-5 text-white sm:px-10">
						<Link to="/modules/programs/ccna" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white">
							<ArrowLeft size={16} /> Back to course
						</Link>
						<h1 aria-label={welcomeText} className="typewriter-caret text-2xl font-bold sm:text-3xl">{typedWelcome}</h1>
						<p className="mt-1 text-sm text-white/85">Your grades and progress</p>
					</div>
					<div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-6">
						<SummaryStat label="Class grade" value={classGrade === null ? "--" : `${classGrade}%`} detail={totalPossiblePoints ? `${totalPoints}/${totalPossiblePoints} points` : "No graded assessments"} progress={classGrade} />
						<SummaryStat label="Completed" value={`${gradedRows.length} of ${allRows.length}`} detail="assessments graded" />
						<SummaryStat label="Best score" value={bestAssessment ? `${bestAssessment.bestPoints.score}/100` : "--"} detail={bestAssessment?.name ?? "No results yet"} gradeScore={bestAssessment?.bestPoints.score} />
						<SummaryStat label="Up next" value={nextAssessment?.name ?? "All complete"} detail={nextAssessment?.status === "in-progress" ? "In progress" : nextAssessment ? "Not submitted" : "Assessment list complete"} />
					</div>
				</header>

				<div className="mt-6 flex flex-wrap items-center justify-end gap-x-5 gap-y-3 text-sm">
					<label className="flex items-center gap-2 font-semibold text-[#334454]">
						Show
						<select value={filter} onChange={(event) => setFilter(event.target.value)} className="h-9 min-w-28 rounded-md border border-[#bcc8ce] bg-white px-3 font-normal text-[#233442] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a91]">
							<option value="all">All</option>
							<option value="graded">Graded</option>
							<option value="in-progress">In progress</option>
							<option value="upcoming">Upcoming</option>
						</select>
					</label>
					<label className="flex items-center gap-2 font-semibold text-[#334454]">
						Sort
						<select value={sort} onChange={(event) => setSort(event.target.value)} className="h-9 min-w-36 rounded-md border border-[#bcc8ce] bg-white px-3 font-normal text-[#233442] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a91]">
							<option value="default">Default</option>
							<option value="recent">Newest first</option>
							<option value="oldest">Oldest first</option>
							<option value="highest">Highest score</option>
							<option value="lowest">Lowest score</option>
						</select>
					</label>
				</div>

				<div className="mt-4 space-y-2">
					<div className="flex items-center justify-between bg-[#edf1f3] px-4 py-3 text-sm font-bold">
						<span>Class Grades</span>
						<span className={getGradeTone(classGrade).text}>{classGrade === null ? "--" : `${classGrade}%`}</span>
					</div>
					<AssessmentTable title="Module Quizzes" rows={moduleRows} filter={filter} sort={sort} />
					<div className="flex items-center justify-between border border-[#dce4e8] bg-[#f2f5f6] px-4 py-3 text-xs text-[#4c5b67]">
						<strong className="font-medium">Module quizzes average</strong>
						<span className={getGradeTone(modulePossiblePoints ? Math.round(modulePoints / modulePossiblePoints * 100) : null).text}>{modulePossiblePoints ? `${modulePoints}/${modulePossiblePoints} (${Math.round(modulePoints / modulePossiblePoints * 100)}%)` : "--"}</span>
					</div>
				</div>

				<div className="mt-8 space-y-2">
					<AssessmentTable title="Mock Exams" rows={mockExamRows} filter={filter} sort={sort} />
					<div className="flex items-center justify-between border border-[#dce4e8] bg-[#f2f5f6] px-4 py-3 text-xs text-[#4c5b67]">
						<strong className="font-medium">Mock exam average</strong>
						<span className={getGradeTone(mockPossiblePoints ? Math.round(mockPoints / mockPossiblePoints * 100) : null).text}>{mockPossiblePoints ? `${mockPoints}/${mockPossiblePoints} (${Math.round(mockPoints / mockPossiblePoints * 100)}%)` : "--"}</span>
					</div>
				</div>
			</div>
		</main>
	);
}

function SummaryStat({ label, value, detail, progress, gradeScore }) {
	const hasGrade = progress !== undefined || gradeScore !== undefined;
	const gradeTone = getGradeTone(gradeScore ?? progress);
	const progressValue = progress ?? 0;

	return (
		<div className="min-w-0 rounded-md border border-[#e0e6e9] bg-[#fafbfb] px-3 py-3">
			<p className="text-xs text-[#687887]">{label}</p>
			<strong className={`mt-1 block truncate text-xl font-bold leading-tight ${hasGrade ? gradeTone.text : "text-[#152536]"}`}>{value}</strong>
			{progress !== undefined && (
				<div role="progressbar" aria-label="Class grade" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressValue} className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e0e6e9]">
					<div className={`h-full transition-[width] duration-700 motion-reduce:transition-none ${gradeTone.fill}`} style={{ width: `${progressValue}%` }} />
				</div>
			)}
			<p className="mt-1 truncate text-xs text-[#6c7a86]">{detail}</p>
		</div>
	);
}