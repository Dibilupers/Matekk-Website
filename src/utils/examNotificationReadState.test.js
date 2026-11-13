import assert from "node:assert/strict";
import { test } from "node:test";
import {
	getExamNotificationDismissedStorageKey,
	getExamNotificationReadId,
	getExamNotificationReadStorageKey,
	readExamNotificationDismissedIds,
	readExamNotificationReadIds,
	shouldShowExamNotification,
	writeExamNotificationDismissedIds,
	writeExamNotificationReadIds,
} from "./examNotificationReadState.js";

test("notification read state is scoped to the user", () => {
	assert.equal(getExamNotificationReadStorageKey("user 1"), "matekk-exam-notifications-read:user%201");
	assert.notEqual(getExamNotificationReadStorageKey("user 1"), getExamNotificationReadStorageKey("user 2"));
});

test("notification updates are identified by exam, status, and completion time", () => {
	const active = { id: "ccna:all_questions", sessionId: "attempt-1", status: "in-progress", submittedAt: 0 };
	assert.equal(getExamNotificationReadId(active), "ccna:all_questions:attempt-1:in-progress:0");
	assert.notEqual(
		getExamNotificationReadId(active),
		getExamNotificationReadId({ ...active, sessionId: "attempt-2" }),
	);
	assert.notEqual(
		getExamNotificationReadId(active),
		getExamNotificationReadId({ ...active, status: "completed", submittedAt: 123 }),
	);
});

test("read notification IDs persist and malformed data is reported", () => {
	const values = new Map();
	const storage = {
		getItem: (key) => values.get(key) ?? null,
		setItem: (key, value) => values.set(key, value),
	};
	const ids = ["ccna:all_questions:attempt-1:in-progress:0"];

	writeExamNotificationReadIds(storage, "user-1", ids);
	assert.deepEqual(readExamNotificationReadIds(storage, "user-1"), ids);

	values.set(getExamNotificationReadStorageKey("user-1"), "{invalid");
	const originalError = console.error;
	const errors = [];
	console.error = (...args) => errors.push(args);
	try {
		assert.deepEqual(readExamNotificationReadIds(storage, "user-1"), []);
		assert.equal(errors.length, 1);
	} finally {
		console.error = originalError;
	}
});

test("dismissed notification IDs persist separately from read IDs", () => {
	const values = new Map();
	const storage = {
		getItem: (key) => values.get(key) ?? null,
		setItem: (key, value) => values.set(key, value),
	};
	const dismissedIds = ["ccna:all_questions:attempt-1:in-progress:0"];

	writeExamNotificationDismissedIds(storage, "user-1", dismissedIds);
	assert.deepEqual(readExamNotificationDismissedIds(storage, "user-1"), dismissedIds);
	assert.equal(
		values.has(getExamNotificationDismissedStorageKey("user-1")),
		true,
	);
	assert.deepEqual(readExamNotificationReadIds(storage, "user-1"), []);
});

test("active exam notifications remain visible even after being dismissed", () => {
	const active = { id: "ccna:medium", sessionId: "attempt-1", status: "in-progress", submittedAt: 0 };
	const dismissedIds = new Set([getExamNotificationReadId(active)]);
	assert.equal(shouldShowExamNotification(active, dismissedIds), true);

	const completed = { ...active, status: "completed", submittedAt: 123 };
	dismissedIds.add(getExamNotificationReadId(completed));
	assert.equal(shouldShowExamNotification(completed, dismissedIds), false);
});
