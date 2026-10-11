import API_URL from "../config/api";

async function readResponse(response) {
	const body = await response.text();
	if (!response.ok) {
		let detail = "";
		try {
			const errorBody = JSON.parse(body);
			const message = errorBody?.message;
			if (typeof message === "string") detail = message;
			else if (Array.isArray(message)) detail = message.filter((item) => typeof item === "string").join(" ");
		} catch {
			// The status remains useful when a proxy or server returns a non-JSON error body.
		}
		throw new Error(`Gradebook request failed (${response.status})${detail ? `: ${detail}` : "."}`);
	}
	if (!body.trim()) return null;
	try {
		return JSON.parse(body);
	} catch {
		const contentType = response.headers.get("content-type") ?? "unknown content type";
		throw new TypeError(
			`The gradebook API returned a non-JSON response (${contentType}). Check that VITE_API_URL points to the backend.`,
		);
	}
}

export async function readGradebookAssessments(programKey) {
	const response = await fetch(`${API_URL}/gradebook/${encodeURIComponent(programKey)}`, {
		credentials: "include",
	});
	const gradebook = await readResponse(response);
	const assessments = gradebook?.data?.assessments;
	if (assessments === undefined || assessments === null) return [];
	if (typeof assessments !== "object" || Array.isArray(assessments)) {
		throw new TypeError("The saved gradebook assessments have an invalid format.");
	}
	return Object.values(assessments).filter((assessment) =>
		typeof assessment?.id === "string" &&
		Number.isFinite(assessment.score) &&
		Number.isFinite(assessment.maxScore) &&
		assessment.maxScore > 0 &&
		Number.isFinite(assessment.submittedAt),
	);
}

export async function saveGradebookAssessments(programKey, assessments) {
	if (!Array.isArray(assessments) || assessments.some((assessment) =>
		typeof assessment?.id !== "string" ||
		!Number.isFinite(assessment.score) ||
		!Number.isFinite(assessment.maxScore) ||
		assessment.maxScore <= 0 ||
		!Number.isFinite(assessment.submittedAt),
	)) {
		throw new TypeError("Gradebook assessments must include an ID, valid score, maximum score, and submission time.");
	}
	if (assessments.length === 0) return;
	const assessmentMap = Object.fromEntries(assessments.map((assessment) => [assessment.id, assessment]));
	const response = await fetch(`${API_URL}/gradebook/${encodeURIComponent(programKey)}`, {
		method: "PUT",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ data: { assessments: assessmentMap } }),
	});
	await readResponse(response);
}

export async function saveGradebookAssessment(programKey, assessment) {
	if (
		typeof assessment?.id !== "string" ||
		!Number.isFinite(assessment.score) ||
		!Number.isFinite(assessment.maxScore) ||
		assessment.maxScore <= 0 ||
		!Number.isFinite(assessment.submittedAt)
	) {
		throw new TypeError("A gradebook assessment must include an ID, valid score, maximum score, and submission time.");
	}

	const response = await fetch(`${API_URL}/gradebook/${encodeURIComponent(programKey)}/assessments`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ assessment }),
	});
	const gradebook = await readResponse(response);
	const savedAssessment = gradebook?.data?.assessments?.[assessment.id];
	if (
		!savedAssessment ||
		savedAssessment.id !== assessment.id ||
		savedAssessment.score !== assessment.score ||
		savedAssessment.maxScore !== assessment.maxScore ||
		savedAssessment.submittedAt !== assessment.submittedAt
	) {
		throw new Error("The backend did not confirm that this assessment was saved to UserGradebook.");
	}
	return gradebook;
}
