import { useEffect, useRef, useState } from "react";
import { readGradebookAssessments } from "../../../utils/gradebookApi";
import { readCcnaExamProgress } from "../../../utils/ccnaShortExamSession";
import { getProgramExamFormats } from "./programExamFormats";

function getLatestQuizStats(assessments, modules) {
	const moduleNumbers = new Set(modules.map((module) => module.number));
	const latestByModule = new Map();
	const latestExamsByFormat = new Map();

	for (const assessment of assessments) {
		if (assessment.type === "quiz" && moduleNumbers.has(assessment.moduleNumber)) {
			const previous = latestByModule.get(assessment.moduleNumber);
			const assessmentAttempt = Number.isInteger(assessment.attemptNumber) ? assessment.attemptNumber : 0;
			const previousAttempt = Number.isInteger(previous?.attemptNumber) ? previous.attemptNumber : 0;
			if (
				!previous ||
				assessmentAttempt > previousAttempt ||
				(assessmentAttempt === previousAttempt && assessment.submittedAt > previous.submittedAt)
			) {
				latestByModule.set(assessment.moduleNumber, assessment);
			}
		}
		if (
			assessment.type === "exam" &&
			Number.isFinite(assessment.score) &&
			Number.isFinite(assessment.maxScore) &&
			assessment.maxScore > 0
		) {
			const title = typeof assessment.title === "string" ? assessment.title.split(" · ")[0].toLowerCase() : "";
			const examFormat = assessment.examFormat ??
				title.match(/\b(short|medium|long|quick|standard|comprehensive|all[_ ]questions)\s+exam\b/)?.[1] ??
				title;
			const previous = latestExamsByFormat.get(examFormat);
			if (!previous || (assessment.submittedAt ?? 0) > (previous.submittedAt ?? 0)) {
				latestExamsByFormat.set(examFormat, assessment);
			}
		}
	}

	const latestAssessments = [...latestByModule.values()];
	const points = latestAssessments.reduce((sum, assessment) => sum + assessment.score, 0);
	const possiblePoints = latestAssessments.reduce((sum, assessment) => sum + assessment.maxScore, 0);
	const latestExams = [...latestExamsByFormat.values()];
	const examPoints = latestExams.reduce((sum, assessment) => sum + assessment.score, 0);
	const examPossiblePoints = latestExams.reduce((sum, assessment) => sum + assessment.maxScore, 0);

	return {
		attempted: latestAssessments.length,
		completedQuizzes: latestAssessments.length,
		completedExams: latestExams.length,
		average: possiblePoints ? Math.round((points / possiblePoints) * 100) : 0,
		examAverage: examPossiblePoints ? Math.round((examPoints / examPossiblePoints) * 100) : null,
	};
}

function getLocalExamAverage(programKey, userId) {
	const examFormats = getProgramExamFormats(programKey);
	if (!examFormats || !userId) return null;

	const completedExams = Object.values(examFormats)
		.map((exam) => readCcnaExamProgress(exam.sessionKey, userId))
		.filter((progress) =>
			["completed", "expired"].includes(progress.status) &&
			Number.isFinite(progress.score) &&
			Number.isFinite(progress.maxScore) &&
			progress.maxScore > 0,
		);
	const points = completedExams.reduce((sum, progress) => sum + progress.score, 0);
	const possiblePoints = completedExams.reduce((sum, progress) => sum + progress.maxScore, 0);
	return possiblePoints ? Math.round((points / possiblePoints) * 100) : null;
}

export default function useGradebookQuizStats(
	programKey,
	userId,
	modules,
	fallbackAttempted,
	fallbackAverage,
	fallbackCompletedQuizzes = fallbackAttempted,
	fallbackCompletedExams = 0,
	fallbackExamAverage,
) {
	const [backendState, setBackendState] = useState(null);
	const [retryCount, setRetryCount] = useState(0);
	const localExamAverage = fallbackExamAverage ?? getLocalExamAverage(programKey, userId);
	const fallbackStatsRef = useRef({
		attempted: fallbackAttempted,
		average: fallbackAverage,
		completedQuizzes: fallbackCompletedQuizzes,
		completedExams: fallbackCompletedExams,
		examAverage: localExamAverage,
	});
	const hasCurrentBackendState = backendState?.programKey === programKey && backendState?.userId === userId;

	useEffect(() => {
		fallbackStatsRef.current = {
			attempted: fallbackAttempted,
			average: fallbackAverage,
			completedQuizzes: fallbackCompletedQuizzes,
			completedExams: fallbackCompletedExams,
			examAverage: localExamAverage,
		};
	}, [fallbackAttempted, fallbackAverage, fallbackCompletedExams, fallbackCompletedQuizzes, localExamAverage]);

	useEffect(() => {
		if (!userId) return undefined;
		let isActive = true;

		readGradebookAssessments(programKey, userId)
			.then((assessments) => {
				if (isActive) {
					const stats = getLatestQuizStats(assessments, modules);
					if (stats.examAverage === null && fallbackStatsRef.current.examAverage !== null) {
						stats.examAverage = fallbackStatsRef.current.examAverage;
					}
					setBackendState({
						programKey,
						userId,
						stats,
						error: null,
					});
				}
			})
			.catch((error) => {
				console.error(`Unable to load the backend ${programKey} gradebook stats.`, error);
				if (isActive) {
					setBackendState({
						programKey,
						userId,
						stats: fallbackStatsRef.current,
						error: "Gradebook stats could not be loaded. Showing locally saved progress.",
					});
				}
			});

		return () => {
			isActive = false;
		};
	}, [modules, programKey, retryCount, userId]);

	return {
		...(hasCurrentBackendState
			? backendState
			: {
				stats: {
					attempted: fallbackAttempted,
					average: fallbackAverage,
					completedQuizzes: fallbackCompletedQuizzes,
					completedExams: fallbackCompletedExams,
					examAverage: localExamAverage,
				},
				error: null,
			}),
		retry: () => setRetryCount((count) => count + 1),
	};
}
