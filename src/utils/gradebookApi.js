import API_URL from "../config/api";

async function readResponse(response) {
	if (!response.ok) {
		throw new Error(`Gradebook request failed (${response.status}).`);
	}
	const body = await response.text();
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
	return saveGradebookAssessments(programKey, [assessment]);
}
