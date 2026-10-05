// Grading helpers for CCNA exam questions.
// Question types:
//   single (default) — options: string[], answer: number            (pick one)
//   multi            — options: string[], answer: number[]          ("Choose two")
//   match            — items: string[], choices: string[],
//                      answer: number[] (choice index for each item)  (drag-and-drop matching)

export function questionType(question) {
	return question?.type ?? "single";
}

export function isValidQuestion(question) {
	const type = questionType(question);
	if (type === "match") {
		return Array.isArray(question.items) &&
			Array.isArray(question.choices) &&
			Array.isArray(question.answer) &&
			question.answer.length === question.items.length &&
			question.answer.every((a) => Number.isInteger(a) && a >= 0 && a < question.choices.length);
	}
	if (!Array.isArray(question?.options)) return false;
	if (type === "multi") {
		return Array.isArray(question.answer) &&
			question.answer.length > 0 &&
			question.answer.every((a) => Number.isInteger(a) && a >= 0 && a < question.options.length);
	}
	return Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length;
}

// How many choices a "multi" question needs (e.g. 2 for "Choose two")
export function requiredSelections(question) {
	return questionType(question) === "multi" ? question.answer.length : 1;
}

export function isQuestionAnswered(question, value) {
	const type = questionType(question);
	if (type === "multi") return Array.isArray(value) && value.length === question.answer.length;
	if (type === "match") {
		return Array.isArray(value) &&
			value.length === question.items.length &&
			value.every((v) => Number.isInteger(v));
	}
	return value !== undefined && value !== null;
}

export function isAnswerCorrect(question, value) {
	const type = questionType(question);
	if (type === "multi") {
		if (!Array.isArray(value) || value.length !== question.answer.length) return false;
		const picked = [...value].sort((a, b) => a - b);
		const correct = [...question.answer].sort((a, b) => a - b);
		return picked.every((v, i) => v === correct[i]);
	}
	if (type === "match") {
		return Array.isArray(value) && question.answer.every((a, i) => value[i] === a);
	}
	return value === question.answer;
}
