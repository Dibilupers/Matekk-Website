import assert from "node:assert/strict";
import { test } from "node:test";
import { isCcnaQuestionModule } from "./ccnaQuestionModule.js";

const cases = [
	["CCNA", true],
	["CCNA Part 9", true],
	["CCNA 200-301 Set 1", true],
	["ccna part 2", true],
	["CompTIA Security+", false],
	["CCNA Cybersecurity", false],
	["", false],
	[null, false],
	[undefined, false],
];

for (const [module, expected] of cases) {
	test(`module ${String(module)} is${expected ? "" : " not"} a CCNA bank`, () => {
		assert.equal(isCcnaQuestionModule(module), expected);
	});
}
