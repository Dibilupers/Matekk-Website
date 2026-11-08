import assert from "node:assert/strict";
import test from "node:test";
import { placeTopologyLabels } from "./topologyLabels.js";

test("moves a link label away from a device annotation", () => {
	const [label] = placeTopologyLabels(
		[{ x: 100, y: 100, width: 90, height: 20, centerOffsetY: -2 }],
		[{ x: 100, y: 100, width: 120, height: 60 }],
	);

	assert.notEqual(label.y, 100);
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
