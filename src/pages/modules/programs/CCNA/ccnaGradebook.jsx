import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import {
	getCcnaModuleQuizAttemptHistory,
	isCurrentCcnaModuleQuizAttempt,
	readCcnaModuleQuizProgress,
} from "../../../../utils/ccnaModuleQuizProgress";
import { readCcnaShortExamProgress } from "../../../../utils/ccnaShortExamSession";
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

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
	const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
	return `${minutes}:${remainingSeconds}`;
}

function AssessmentCountdown({ deadline }) {
	const [secondsLeft, setSecondsLeft] = useState(() =>
		Math.max(0, Math.ceil((deadline - Date.now()) / 1000)),
	);

	useEffect(() => {
		function updateCountdown() {
			setSecondsLeft(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
		}

		updateCountdown();
		const intervalId = window.setInterval(updateCountdown, 1000);
		return () => window.clearInterval(intervalId);
	}, [deadline]);

	return (
		<span className="mt-1 block text-sm font-semibold tabular-nums text-[#087a91]">
			{secondsLeft > 0 ? `${formatTime(secondsLeft)} remaining` : "00:00"}
		</span>
	);
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
		const bestResult = history.reduce((best, result) => {
			const resultMaxScore = Number.isFinite(result.maxScore) && result.maxScore > 0
				? result.maxScore
				: quiz.questions.length;
			const bestMaxScore = Number.isFinite(best?.maxScore) && best.maxScore > 0
				? best.maxScore
				: quiz.questions.length;
			return !best || result.score / resultMaxScore > best.score / bestMaxScore
				? { ...result, maxScore: resultMaxScore }
				: best;
		}, null);
		const bestPoints = bestResult
			? { score: bestResult.score, maxScore: bestResult.maxScore }
			: bestScore > 0
				? { score: bestScore, maxScore: quiz.questions.length }
				: null;
		const bestGrade = bestPoints
			? Math.round((bestPoints.score / bestPoints.maxScore) * 100)
			: null;
		const historyRows = history.map((result) => {
			const resultMaxScore = Number.isFinite(result.maxScore) && result.maxScore > 0
				? result.maxScore
				: quiz.questions.length;
			return {
				id: `${quiz.number}-attempt-${result.attemptNumber}`,
				name: `${quiz.number} ${quiz.title}`,
				status: "graded",
				statusLabel: result.status === "expired"
					? `Attempt ${result.attemptNumber} · Time expired`
					: `Attempt ${result.attemptNumber}`,
				submittedAt: result.submittedAt,
				attempts: result.attemptNumber,
				points: { score: result.score, maxScore: resultMaxScore },
				grade: Math.round((result.score / resultMaxScore) * 100),
				bestPoints,
				bestGrade,
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
					statusLabel: `Attempt ${attempt.attempts ?? 1} · In progress`,
					submittedAt: null,
					deadline: attempt.deadline,
					attempts: attempt.attempts ?? 0,
					points: null,
					grade: null,
					bestPoints,
					bestGrade,
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
			grade: null,
			bestPoints: null,
			bestGrade: null,
			order: index * 100,
		}];
	});
}

function getExamRows(shortExamProgress) {
	const shortExamCompleted = ["completed", "expired"].includes(shortExamProgress.status);
	const shortExamGrade = shortExamCompleted && shortExamProgress.maxScore > 0
		? Math.round((shortExamProgress.score / shortExamProgress.maxScore) * 100)
		: null;
	return [
		{
			id: "short-exam",
			name: "Short Exam",
			status: shortExamProgress.status === "in-progress" ? "in-progress" : shortExamCompleted ? "graded" : "upcoming",
			statusLabel: shortExamProgress.status === "expired" ? "Time expired" : null,
			submittedAt: null,
			attempts: shortExamCompleted || shortExamProgress.status === "in-progress" ? 1 : 0,
			points: shortExamCompleted
				? { score: shortExamProgress.score, maxScore: shortExamProgress.maxScore }
				: null,
			grade: shortExamGrade,
			bestPoints: shortExamCompleted
				? { score: shortExamProgress.score, maxScore: shortExamProgress.maxScore }
				: null,
			bestGrade: shortExamGrade,
			order: 0,
		},
		...["Medium Exam", "Long Exam"].map((name, index) => ({
			id: name.toLowerCase().replaceAll(" ", "-"),
			name,
			status: "upcoming",
			submittedAt: null,
			attempts: 0,
			points: null,
			grade: null,
			bestPoints: null,
			bestGrade: null,
			order: index + 1,
		})),
	];
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
										{row.status === "in-progress" && Number.isFinite(row.deadline) && (
											<AssessmentCountdown deadline={row.deadline} />
										)}
									</th>
									<td className="whitespace-nowrap px-5 py-4 text-[#445363]">{formatDate(row.submittedAt)}</td>
									<td className="px-5 py-4 text-center text-[#445363]">{row.attempts || "--"}</td>
									<td className="px-5 py-4 text-right">
										{row.points ? (
											<span className={`inline-flex min-w-[68px] justify-center rounded-full px-3 py-1.5 text-sm font-bold tabular-nums ${getGradeTone(row.grade).badge}`}>
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
	const progress = userId ? readCcnaModuleQuizProgress(userId) : EMPTY_PROGRESS;
	const shortExamProgress = readCcnaShortExamProgress(userId);
	const moduleRows = getModuleRows(progress);
	const examRows = getExamRows(shortExamProgress);
	const allRows = [...moduleRows, ...examRows];
	const [filter, setFilter] = useState("all");
	const [sort, setSort] = useState("default");
	const completedQuizCount = CCNA_MODULE_QUIZZES.filter((quiz) =>
		moduleRows.some((row) => row.id.startsWith(`${quiz.number}-attempt-`) && row.status === "graded"),
	).length;
	const completedExamCount = examRows.filter((row) => row.status === "graded").length;
	const gradedRows = allRows.filter((row) => row.status === "graded");
	const classGrade = gradedRows.length
		? Math.round(gradedRows.reduce((total, row) => total + row.grade, 0) / gradedRows.length)
		: null;
	const bestAssessment = gradedRows.reduce(
		(best, row) => !best || row.bestGrade > best.bestGrade ? row : best,
		null,
	);
	const nextAssessment = allRows.find((row) => row.status !== "graded");
	const totalPoints = gradedRows.reduce((total, row) => total + row.grade, 0);
	const totalPossiblePoints = gradedRows.length * 100;
	const moduleAverage = moduleRows.filter((row) => row.status === "graded");
	const modulePoints = moduleAverage.reduce((total, row) => total + row.grade, 0);
	const modulePossiblePoints = moduleAverage.length * 100;
	const gradedExamRows = examRows.filter((row) => row.status === "graded");
	const examPoints = gradedExamRows.reduce((total, row) => total + row.grade, 0);
	const examPossiblePoints = gradedExamRows.length * 100;

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
				<header className="ccna-gradebook-summary">
					<div className="ccna-gradebook-banner relative px-6 py-6 text-white sm:px-10 sm:py-7">
						<Link to="/modules/programs/ccna" className="absolute left-6 top-5 inline-flex items-center gap-2 text-base font-semibold text-white/85 transition hover:text-white sm:left-10 sm:top-6">
							<ArrowLeft size={18} /> Back to course
						</Link>
						<div className="mx-auto max-w-[1680px] pt-10">
							<h1 aria-label={welcomeText} className="typewriter-caret text-3xl font-bold sm:text-4xl">{typedWelcome}</h1>
							<p className="mt-1 text-base text-white/85">Your grades and progress on CCNA</p>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 sm:gap-5 sm:p-8 xl:grid-cols-5">
						<SummaryStat label="Class grade" value={classGrade === null ? "--" : `${classGrade}%`} detail={totalPossiblePoints ? `${totalPoints}/${totalPossiblePoints} points` : "No graded assessments"} progress={classGrade} />
						<SummaryStat label="Quizzes completed" value={`${completedQuizCount} of ${CCNA_MODULE_QUIZZES.length}`} detail="module quizzes completed" />
						<SummaryStat label="Exams completed" value={`${completedExamCount} of ${examRows.length}`} detail="exam formats completed" />
						<SummaryStat label="Best score" value={bestAssessment ? `${bestAssessment.bestPoints.score}/${bestAssessment.bestPoints.maxScore}` : "--"} detail={bestAssessment?.name ?? "No results yet"} gradeScore={bestAssessment?.bestGrade} />
						<SummaryStat label="Up next" value={nextAssessment?.name ?? "All complete"} detail={nextAssessment?.status === "in-progress" ? "In progress" : nextAssessment ? "Not submitted" : "Assessment list complete"} compactValue />
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
						<span className={getGradeTone(modulePossiblePoints ? Math.round(modulePoints / modulePossiblePoints * 100) : null).text}>{modulePossiblePoints ? `${modulePoints}/${modulePossiblePoints} (${Math.round(modulePoints / modulePossiblePoints * 100)}%)` : "--"}</span>
					</div>
				</div>

				<div className="mt-8 space-y-2">
					<AssessmentTable title="Exams" rows={examRows} filter={filter} sort={sort} />
					<div className="flex items-center justify-between border border-[#dce4e8] bg-[#f2f5f6] px-5 py-4 text-sm text-[#4c5b67]">
						<strong className="font-medium">Exam average</strong>
						<span className={getGradeTone(examPossiblePoints ? Math.round(examPoints / examPossiblePoints * 100) : null).text}>{examPossiblePoints ? `${examPoints}/${examPossiblePoints} (${Math.round(examPoints / examPossiblePoints * 100)}%)` : "--"}</span>
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
		<div className="min-h-[132px] min-w-0 rounded-md border border-[#e0e6e9] bg-[#fafbfb] px-5 py-5">
			<p className="text-sm text-[#687887]">{label}</p>
			<strong className={`mt-1 block font-bold leading-tight ${compactValue ? "break-words text-lg" : "truncate text-2xl"} ${hasGrade ? gradeTone.text : "text-[#152536]"}`}>{value}</strong>
			{progress !== undefined && (
				<div role="progressbar" aria-label="Class grade" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressValue} className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e0e6e9]">
					<div className={`h-full transition-[width] duration-700 motion-reduce:transition-none ${gradeTone.fill}`} style={{ width: `${progressValue}%` }} />
				</div>
			)}
			<p className="mt-1 truncate text-sm text-[#6c7a86]">{detail}</p>
		</div>
	);
}