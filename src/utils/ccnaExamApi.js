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
	const isSingleQuestion = (question) =>
		question?.type !== "match" &&
		Array.isArray(question?.options) &&
		question.options.length >= 2 &&
		question.options.every((option) => typeof option === "string");
	const isMatchQuestion = (question) =>
		question?.type === "match" &&
		Array.isArray(question.items) &&
		question.items.length >= 2 &&
		question.items.length <= 8 &&
		question.items.every((item) => typeof item === "string") &&
		Array.isArray(question.choices) &&
		question.choices.length >= 2 &&
		question.choices.length <= 8 &&
		question.choices.every((choice) => typeof choice === "string") &&
		(question.groupSizes === undefined ||
			(Array.isArray(question.groupSizes) &&
				question.groupSizes.length === question.choices.length &&
				question.groupSizes.every((size) => Number.isInteger(size) && size >= 0) &&
				question.groupSizes.reduce((total, size) => total + size, 0) === question.items.length));
	if (
		!attempt ||
		typeof attempt.attemptId !== "string" ||
		!Number.isFinite(attempt.deadline) ||
		!Number.isFinite(attempt.durationSeconds) ||
		!Array.isArray(attempt.questions) ||
		attempt.questions.length === 0 ||
		!attempt.questions.every((question) =>
			Number.isInteger(question?.id) &&
			typeof question.prompt === "string" &&
			(question.imageUrl === undefined || question.imageUrl === null || typeof question.imageUrl === "string") &&
			(isSingleQuestion(question) || isMatchQuestion(question)) &&
			!("answer" in question) &&
			!("correct_answer" in question),
		)
	) {
		throw new TypeError("The exam API returned an invalid or unsafe exam attempt.");
	}
	return attempt;
}

export async function startCcnaExam(examKey) {
	const response = await fetch(`${API_URL}/questions/exams/${encodeURIComponent(examKey)}/start`, {
		method: "POST",
		credentials: "include",
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
