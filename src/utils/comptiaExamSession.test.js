import assert from "node:assert/strict";
import { test } from "node:test";
import { getCompTIAExamSessionKey } from "./comptiaExamSession.js";

test("CompTIA session keys include the correct question-bank versions", () => {
	assert.equal(
		getCompTIAExamSessionKey("comptia-network-plus", "short"),
		"matekk-comptia-network-plus-short-exam-session-v2",
	);
	assert.equal(
		getCompTIAExamSessionKey("comptia-network-plus", "all_questions"),
		"matekk-comptia-network-plus-all_questions-exam-session",
	);
	assert.equal(
		getCompTIAExamSessionKey("comptia-security-plus", "short"),
		"matekk-comptia-security-plus-short-exam-session-v2-organized-logs-v1",
	);
	assert.equal(
		getCompTIAExamSessionKey("comptia-security-plus", "all_questions"),
		"matekk-comptia-security-plus-all_questions-exam-session-organized-logs-v1",
	);
});
