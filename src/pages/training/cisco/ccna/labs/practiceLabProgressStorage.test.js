import assert from "node:assert/strict";
import { test } from "node:test";
import { readPracticeLabProgress, writePracticeLabProgress } from "./practiceLabProgressStorage.js";

function createMemoryStorage(initial = {}) {
	const values = new Map(Object.entries(initial));
	return {
		getItem: (key) => values.get(key) ?? null,
		setItem: (key, value) => values.set(key, value),
	};
}

test("saves and restores valid practice lab progress", () => {
	const storage = createMemoryStorage();
	const progress = { version: 1, labId: 7, answers: { 0: "vlan 20" } };

	writePracticeLabProgress("lab:7", progress, storage);

	assert.deepEqual(
		readPracticeLabProgress("lab:7", (value) => value.version === 1, storage),
		{ value: progress, error: null },
	);
});

test("returns no error when practice lab progress is not present", () => {
	assert.deepEqual(
		readPracticeLabProgress("lab:7", () => true, createMemoryStorage()),
		{ value: null, error: null },
	);
});

test("reports invalid or unreadable practice lab progress", () => {
	const malformed = readPracticeLabProgress("lab:7", () => true, createMemoryStorage({ "lab:7": "{" }));
	const invalid = readPracticeLabProgress("lab:7", () => false, createMemoryStorage({ "lab:7": "{}" }));

	assert.ok(malformed.error instanceof SyntaxError);
	assert.ok(invalid.error instanceof TypeError);
	assert.equal(malformed.value, null);
	assert.equal(invalid.value, null);
});

test("surfaces browser storage write failures", () => {
	const storage = {
		setItem() {
			throw new Error("storage unavailable");
		},
	};

	assert.throws(() => writePracticeLabProgress("lab:7", {}, storage), /storage unavailable/);
});
