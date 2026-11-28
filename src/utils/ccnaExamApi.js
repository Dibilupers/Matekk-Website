import API_URL from "../config/api";

async function readExamResponse(response) {
	const body = await response.text();
	let payload = null;

	if (body.trim()) {
		try {
			payload = JSON.parse(body);
		} catch {
			throw new TypeError("The exam API returned an invalid response.");
		}
	}
	if (!response.ok) {
		const message = Array.isArray(payload?.message)
			? payload.message.join(" ")
			: payload?.message;
		const error = new Error(typeof message === "string" ? message : `Exam request failed (${response.status}).`);
		error.status = response.status;
		throw error;
	}
	return payload;
}

function validateExamAttempt(attempt) {
	const supportedTypes = new Set(["single", "multi", "match", "drag_drop", "click_boxes", "image"]);
	if (
		!attempt ||
		typeof attempt.attemptId !== "string" ||
		!Number.isFinite(attempt.deadline) ||
		!Number.isFinite(attempt.durationSeconds) ||
		!Array.isArray(attempt.questions) ||
		attempt.questions.length === 0 ||
		!attempt.questions.every((question) =>
			question && typeof question === "object" &&
			Number.isInteger(question.id) &&
			(question.type === undefined || supportedTypes.has(question.type)) &&
			(question.prompt === undefined || question.prompt === null || typeof question.prompt === "string") &&
			(question.imageUrl === undefined || question.imageUrl === null || typeof question.imageUrl === "string") &&
			!("answer" in question) &&
			!("correct_answer" in question),
		)
	) {
		throw new TypeError("The exam API returned an invalid or unsafe exam attempt.");
	}
	return attempt;
}

export async function startCcnaExam(examKey, excludeQuestionIds = []) {
	const request = {
		method: "POST",
		credentials: "include",
	};
	if (excludeQuestionIds.length) {
		request.headers = { "Content-Type": "application/json" };
		request.body = JSON.stringify({ excludeQuestionIds });
	}
	const response = await fetch(`${API_URL}/questions/exams/${encodeURIComponent(examKey)}/start`, {
		...request,
	});
	return validateExamAttempt(await readExamResponse(response));
}

export async function resumeCcnaExam(examKey, attemptId) {
	const response = await fetch(
		`${API_URL}/questions/exams/${encodeURIComponent(examKey)}/attempt/${encodeURIComponent(attemptId)}`,
		{ credentials: "include" },
	);
	return validateExamAttempt(await readExamResponse(response));
}

export async function repairCcnaExamAttempt(examKey, attemptId, excludeQuestionIds) {
	const response = await fetch(
		`${API_URL}/questions/exams/${encodeURIComponent(examKey)}/attempt/${encodeURIComponent(attemptId)}/repair`,
		{
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ excludeQuestionIds }),
		},
	);
	return validateExamAttempt(await readExamResponse(response));
}

export async function submitCcnaExam(examKey, attemptId, answers) {
	const response = await fetch(
		`${API_URL}/questions/exams/${encodeURIComponent(examKey)}/attempt/${encodeURIComponent(attemptId)}/submit`,
		{
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ answers }),
		},
	);
	return readExamResponse(response);
}
