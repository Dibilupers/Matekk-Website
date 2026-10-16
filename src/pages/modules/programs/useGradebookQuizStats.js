import { useEffect, useRef, useState } from "react";
import { readGradebookAssessments } from "../../../utils/gradebookApi";

function getLatestQuizStats(assessments, modules) {
	const moduleNumbers = new Set(modules.map((module) => module.number));
	const latestByModule = new Map();
	const completedExamFormats = new Set();

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
		if (assessment.type === "exam" && Number.isFinite(assessment.maxScore) && assessment.maxScore > 0) {
			const title = assessment.title.split(" · ")[0].toLowerCase();
			const format = title.match(/\b(short|medium|long|quick|standard|comprehensive)\s+exam\b/)?.[1];
			if (format) completedExamFormats.add(format);
		}
	}

	const latestAssessments = [...latestByModule.values()];
	const points = latestAssessments.reduce((sum, assessment) => sum + assessment.score, 0);
	const possiblePoints = latestAssessments.reduce((sum, assessment) => sum + assessment.maxScore, 0);

	return {
		attempted: latestAssessments.length,
		completedQuizzes: latestAssessments.length,
		completedExams: completedExamFormats.size,
		average: possiblePoints ? Math.round((points / possiblePoints) * 100) : 0,
	};
}

export default function useGradebookQuizStats(
	programKey,
	userId,
	modules,
	fallbackAttempted,
	fallbackAverage,
	fallbackCompletedQuizzes = fallbackAttempted,
	fallbackCompletedExams = 0,
) {
	const [backendState, setBackendState] = useState(null);
	const [retryCount, setRetryCount] = useState(0);
	const fallbackStatsRef = useRef({
		attempted: fallbackAttempted,
		average: fallbackAverage,
		completedQuizzes: fallbackCompletedQuizzes,
		completedExams: fallbackCompletedExams,
	});
	const hasCurrentBackendState = backendState?.programKey === programKey && backendState?.userId === userId;

	useEffect(() => {
		fallbackStatsRef.current = {
			attempted: fallbackAttempted,
			average: fallbackAverage,
			completedQuizzes: fallbackCompletedQuizzes,
			completedExams: fallbackCompletedExams,
		};
	}, [fallbackAttempted, fallbackAverage, fallbackCompletedExams, fallbackCompletedQuizzes]);

	useEffect(() => {
		if (!userId) return undefined;
		let isActive = true;

		readGradebookAssessments(programKey, userId)
			.then((assessments) => {
				if (isActive) {
					setBackendState({
						programKey,
						userId,
						stats: getLatestQuizStats(assessments, modules),
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
				},
				error: null,
			}),
		retry: () => setRetryCount((count) => count + 1),
	};
}
