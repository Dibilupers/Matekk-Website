import assert from "node:assert/strict";
import test from "node:test";
import { topologyFitScale } from "./topologyFit.js";

test("fits a landscape topology within both viewport dimensions", () => {
	assert.equal(topologyFitScale(1000, 500, 800, 600), 0.776);
});

test("fits a tall topology by height when width is available", () => {
	assert.equal(topologyFitScale(600, 900, 1200, 700), 0.7511111111111111);
});

test("does not enlarge content that already fits", () => {
	assert.equal(topologyFitScale(400, 200, 800, 600), 1);
});

test("uses a safe scale for invalid dimensions", () => {
	assert.equal(topologyFitScale(0, 200, 800, 600), 1);
});
