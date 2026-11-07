import assert from "node:assert/strict";
import { test } from "node:test";
import {
	getExamRoute,
	getExamRoutePattern,
	LEGACY_CCNA_ALL_QUESTIONS_ROUTE,
} from "./examRoutes.js";

test("exam formats and notifications share the canonical exam routes", () => {
	assert.equal(getExamRoute("ccna", "all_questions"), "/modules/programs/ccna/exam/all");
	assert.equal(getExamRoute("ccna", "short"), "/modules/programs/ccna/exam/short");
	assert.equal(
		getExamRoute("comptia-network-plus", "all_questions"),
		"/modules/programs/comptia-network-plus/exam/all_questions",
	);
	assert.equal(getExamRoute("fortios-offline", "all_questions"), "/modules/programs/fortios/exam/all");
});

test("exam route patterns and legacy CCNA links remain supported", () => {
	assert.equal(
		getExamRoutePattern("ccna-automation"),
		"/modules/programs/ccna-automation/exam/:examKey",
	);
	assert.equal(LEGACY_CCNA_ALL_QUESTIONS_ROUTE, "/modules/programs/ccna/exam/all_questions");
	assert.equal(getExamRoute("unknown-program", "short"), null);
	assert.equal(getExamRoute("ccna", "unknown-exam"), null);
});
