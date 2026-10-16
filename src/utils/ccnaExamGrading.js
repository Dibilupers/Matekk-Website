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
	return questionType(question) === "multi" && Array.isArray(question?.answer)
		? question.answer.length
		: 1;
}

export function isQuestionAnswered(question, value) {
	const type = questionType(question);
	if (type === "multi") return Array.isArray(question?.answer) && Array.isArray(value) && value.length === question.answer.length;
	if (type === "match") {
		return Array.isArray(question?.items) &&
			Array.isArray(question?.choices) &&
			Array.isArray(value) &&
			value.length === question.items.length &&
			value.every((v) => Number.isInteger(v) && v >= 0 && v < question.choices.length);
	}
	return value !== undefined && value !== null;
}

export function isAnswerCorrect(question, value) {
	const type = questionType(question);
	if (type === "multi") {
		if (!Array.isArray(question?.answer) || !Array.isArray(value) || value.length !== question.answer.length) return false;
		const picked = [...value].sort((a, b) => a - b);
		const correct = [...question.answer].sort((a, b) => a - b);
		return picked.every((v, i) => v === correct[i]);
	}
	if (type === "match") {
		return Array.isArray(question?.answer) && Array.isArray(value) &&
			question.answer.every((a, i) => value[i] === a);
	}
	return value === question?.answer;
}

// How a matching question is answered on screen:
//   "assign" — each choice is used exactly once (e.g. order the route sources, match benefits to examples):
//              click a choice box to place it on a row; it disappears from the other rows.
//   "group"  — several items share a few groups (e.g. copper vs single-mode fiber):
//              type the item numbers, group by group, e.g. "1324".
//   "select" — anything else (or 10+ items, where typed numbers would be ambiguous): a dropdown per item.
export function matchMode(question) {
	if (questionType(question) !== "match") return null;
	const { items, choices, answer } = question ?? {};
	if (!Array.isArray(items) || !Array.isArray(choices)) return null;
	if (
		!Array.isArray(answer) ||
		answer.length !== items.length ||
		answer.some((index) => !Number.isInteger(index) || index < 0 || index >= choices.length)
	) return "select";
	if (question.matchStyle === "numbers") return "group";
	if (items.length === choices.length && new Set(answer).size === answer.length) return "assign";
	if (choices.length < items.length && items.length <= 9) return "group";
	return "select";
}

// Group mode: how many items belong in each group (shown as slots, like the original exam)
export function groupSizes(question) {
	// Exams from the backend send only the box sizes (the answer key stays on the server)
	if (Array.isArray(question?.groupSizes) && question.groupSizes.length === question.choices?.length) return question.groupSizes;
	if (!Array.isArray(question?.choices) || !Array.isArray(question?.answer)) return [];
	return question.choices.map((_, choiceIndex) => question.answer.filter((a) => a === choiceIndex).length);
}

// Group mode: turns typed digits ("1324") into a choice index per item, or explains what's wrong
export function parseGroupCode(question, code) {
	// Exams send box sizes instead of the answer key, so either one is enough here
	if (!Array.isArray(question?.items) || !Array.isArray(question?.choices) || (!Array.isArray(question?.answer) && !Array.isArray(question?.groupSizes))) {
		return { value: null, error: "This matching question has invalid data. Reload the exam and try again." };
	}
	const digits = String(code ?? "").replace(/\s+/g, "");
	const total = question.items.length;
	if (!digits) return { value: question.items.map(() => null), error: "" };
	if (!/^\d+$/.test(digits)) return { value: null, error: "Use numbers only." };
	const numbers = [...digits].map(Number);
	if (numbers.some((n) => n < 1 || n > total)) return { value: null, error: `Use item numbers 1 to ${total}.` };
	if (new Set(numbers).size !== numbers.length) return { value: null, error: "Each number can only be used once." };
	const value = question.items.map(() => null);
	let position = 0;
	groupSizes(question).forEach((size, choiceIndex) => {
		for (let k = 0; k < size && position < numbers.length; k += 1, position += 1) value[numbers[position] - 1] = choiceIndex;
	});
	return { value, error: numbers.length > total ? "Too many numbers." : "" };
}

// Group mode: the number string for a set of answers, each group's numbers in ascending order
export function groupCode(question, value) {
	if (!Array.isArray(question?.choices) || !Array.isArray(value)) return "";
	return question.choices.map((_, choiceIndex) => value
		.map((choice, itemIndex) => (choice === choiceIndex ? itemIndex + 1 : null))
		.filter((n) => n !== null)
		.join("")).join("");
}
