import assert from "node:assert/strict";
import test from "node:test";
import { shuffleChoiceIndexes } from "./ccnaExamMatchingUtils.js";

test("shuffles matching choices without changing their answer indexes", () => {
	for (const choiceCount of [2, 3, 5, 8]) {
		const indexes = shuffleChoiceIndexes(choiceCount);

		assert.equal(indexes.length, choiceCount);
		assert.deepEqual([...indexes].sort((a, b) => a - b), Array.from({ length: choiceCount }, (_, index) => index));
		assert.notDeepEqual(indexes, Array.from({ length: choiceCount }, (_, index) => index));
	}
});

test("keeps zero- and one-choice lists valid", () => {
	assert.deepEqual(shuffleChoiceIndexes(0), []);
	assert.deepEqual(shuffleChoiceIndexes(1), [0]);
});
