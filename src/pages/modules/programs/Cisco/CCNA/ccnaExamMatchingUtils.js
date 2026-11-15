export function shuffleChoiceIndexes(choiceCount) {
	const indexes = Array.from({ length: choiceCount }, (_, index) => index);
	for (let index = indexes.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[indexes[index], indexes[randomIndex]] = [indexes[randomIndex], indexes[index]];
	}
	if (indexes.length > 1 && indexes.every((choiceIndex, index) => choiceIndex === index)) {
		indexes.push(indexes.shift());
	}
	return indexes;
}
