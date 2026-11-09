import assert from "node:assert/strict";
import test from "node:test";
import {
	topologyCableLabelPosition,
	topologyLinkGeometry,
	topologyLinkLabelPosition,
	topologyPortLabelPositions,
} from "./topologyGeometry.js";

test("connects vertical links to the visible device boundaries", () => {
	const link = topologyLinkGeometry(
		{ x: 100, y: 0 },
		{ x: 100, y: 200 },
		"network",
		"router",
	);

	assert.equal(link.x1, 100);
	assert.equal(link.y1, 27);
	assert.equal(link.x2, 100);
	assert.equal(link.y2, 184);
});

test("connects diagonal links to the visible device boundaries", () => {
	const link = topologyLinkGeometry(
		{ x: 0, y: 0 },
		{ x: 200, y: 200 },
		"switch",
		"host",
	);

	assert.ok(link.x1 > 0 && link.x1 < 34);
	assert.ok(link.y1 > 0 && link.y1 < 34);
	assert.ok(link.x2 < 200 && link.x2 > 166);
	assert.ok(link.y2 < 200 && link.y2 > 166);
});

test("keeps offset links attached to device shapes", () => {
	const link = topologyLinkGeometry(
		{ x: 0, y: 0 },
		{ x: 200, y: 0 },
		"switch",
		"host",
		5,
	);

	assert.equal(link.x1, 34);
	assert.equal(link.y1, 5);
	assert.equal(link.x2, 174);
	assert.equal(link.y2, 5);
});

test("anchors interface labels at even points along the cable", () => {
	assert.deepEqual(
		topologyPortLabelPositions({ x1: 40, y1: 10, x2: 40, y2: 110 }),
		[{ x: 40, y: 35 }, { x: 40, y: 85 }],
	);
});

test("keeps wide interface and network labels clear of vertical cables", () => {
	const label = topologyCableLabelPosition({
		x: 100,
		y: 50,
		nx: -1,
		ny: 0,
		width: 110,
		height: 17.5,
		side: -1,
		centerOffsetY: 2 - 17.5 / 2,
	});

	assert.equal(label.x, 159);
	assert.equal(label.y, 50);
});

test("keeps a legacy label hint close to the cable", () => {
	const label = topologyLinkLabelPosition(0, 100, 200, 100, 70, 0);

	assert.equal(label.x, 70);
	assert.equal(label.y, 80);
});

test("places an unconfigured label next to the cable midpoint", () => {
	const label = topologyLinkLabelPosition(0, 100, 200, 100);

	assert.equal(label.x, 100);
	assert.equal(label.y, 86);
});
