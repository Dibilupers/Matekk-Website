export function shuffleMatchingChoices(question, shuffle) {
	if (
		!["match", "drag_drop"].includes(question.type) ||
		question.matchStyle === "numbers" ||
		!Array.isArray(question.items) ||
		!Array.isArray(question.choices) ||
		question.choices.length < 2 ||
		!Array.isArray(question.answer) ||
		question.answer.length !== question.items?.length ||
		new Set(question.answer).size !== question.answer.length ||
		question.answer.some((index) => !Number.isInteger(index) || index < 0 || index >= question.choices.length)
	) {
		return question;
	}

	const choiceOrder = shuffle(question.choices.map((_, index) => index));
	if (choiceOrder.every((index, shuffledIndex) => index === shuffledIndex)) {
		choiceOrder.push(choiceOrder.shift());
	}
	const shuffledIndexes = new Map(choiceOrder.map((originalIndex, index) => [originalIndex, index]));
	return {
		...question,
		choices: choiceOrder.map((index) => question.choices[index]),
		answer: question.answer.map((index) => shuffledIndexes.get(index)),
	};
}
