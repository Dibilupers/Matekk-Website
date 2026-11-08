import assert from "node:assert/strict";
import test from "node:test";
import { placeTopologyLabels } from "./topologyLabels.js";

test("moves a link label away from a device annotation", () => {
	const [label] = placeTopologyLabels(
		[{ x: 100, y: 100, width: 50, height: 20, centerOffsetY: -2 }],
		[{ x: 100, y: 100, width: 40, height: 40 }],
	);

	assert.notDeepEqual([label.x, label.y], [100, 100]);
});

test("separates colliding labels while preserving clear requested positions", () => {
	const labels = placeTopologyLabels([
		{ x: 100, y: 100, width: 70, height: 20 },
		{ x: 100, y: 100, width: 70, height: 20 },
		{ x: 300, y: 100, width: 70, height: 20 },
	], []);

	assert.notDeepEqual([labels[0].x, labels[0].y], [labels[1].x, labels[1].y]);
	assert.deepEqual([labels[2].x, labels[2].y], [300, 100]);
});

test("keeps labels close to their requested cable positions", () => {
	const [label] = placeTopologyLabels(
		[{ x: 100, y: 100, width: 80, height: 20 }],
		[{ x: 100, y: 100, width: 80, height: 50 }],
	);

	assert.ok(Math.hypot(label.x - 100, label.y - 100) <= 36);
});

test("keeps interface labels for parallel LACP links visibly separated", () => {
	const labelHeight = 17.5;
	const labels = placeTopologyLabels([
		{ x: 100, y: 86, width: 36, height: labelHeight, centerOffsetY: 2 - labelHeight / 2 },
		{ x: 100, y: 114, width: 36, height: labelHeight, centerOffsetY: 2 - labelHeight / 2 },
	], []);

	assert.ok(Math.abs(labels[0].y - labels[1].y) >= labelHeight + 3);
});
