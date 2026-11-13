import assert from "node:assert/strict";
import test from "node:test";
import {
	applyNativeExhibit,
	CCNA_RECREATED_TEXT_EXHIBITS,
} from "./ccnaCompositeSetQuestions.js";

test("applies the Question 299 IP-address matching override", () => {
	const question = applyNativeExhibit({
		bankId: 299,
		prompt: "Refer to the exhibit. Match the interface to its IP address.",
	});

	assert.equal(question.type, "match");
	assert.deepEqual(question.items, ["DC-1 Gi1/0", "DC-1 Gi1/1", "DC-1 Gi1/2", "HQ-1 Gi1/3"]);
	assert.deepEqual(question.answer, [2, 5, 4, 6]);
	assert.equal(question.choices.length, 7);
	assert.equal(question.hideExhibitImage, true);
	assert.equal(question.prompt, "Match the interface to its IP address.");
});

test("uses source-matching WLC security values for Question 1012", () => {
	const question = applyNativeExhibit({ bankId: 1012 });

	assert.equal(question.exhibitDiagram, "wlc-security-tab-legacy");
});

test("uses the source-faithful three-router exhibit for Question 177", () => {
	const question = applyNativeExhibit({ bankId: 177 });

	assert.equal(question.exhibitDiagram, "routers-abc-floating-route-source");
	assert.equal(question.hideExhibitImage, true);
});

test("uses the voice-and-data VLAN topology for Question 268", () => {
	assert.equal(applyNativeExhibit({ bankId: 268 }).exhibitDiagram, "voice-vlan-two-switch");
});

test("rebuilds Question 246 as a complete route topology and hides the source image", () => {
	const question = applyNativeExhibit({ bankId: 246 });

	assert.equal(question.exhibitDiagram, "r14-r86-static-route-172");
	assert.equal(question.hideExhibitImage, true);
});

test("rebuilds Question 273 as separate WAN networks and hides the source image", () => {
	const question = applyNativeExhibit({ bankId: 273 });

	assert.equal(question.exhibitDiagram, "dual-wan-site-routing");
	assert.equal(question.hideExhibitImage, true);
});

test("corrects Question 275's trunk label to match the allowed VLANs", () => {
	const question = applyNativeExhibit({ bankId: 275 });

	assert.equal(question.exhibitDiagram, "vlan5-vlan10-four-hosts");
	assert.equal(question.hideExhibitImage, true);
	assert.match(question.exhibit, /switchport trunk allowed vlan 5,10/);
});

test("extends the Question 1305 matching choices without changing its answer", () => {
	const originalAnswer = [4, 1, 2, 3, 0];
	const question = applyNativeExhibit({
		bankId: 1305,
		type: "match",
		items: ["A", "B", "C", "D", "E"],
		choices: ["route source", "administrative distance", "metric", "timestamp", "outbound interface"],
		answer: originalAnswer,
	});

	assert.deepEqual(question.answer, originalAnswer);
	assert.deepEqual(question.choices.slice(-2), ["next-hop interface", "subnet mask"]);
	assert.equal(question.exhibit, CCNA_RECREATED_TEXT_EXHIBITS.routingTableComponents);
	assert.match(question.exhibit, /GigabitEthernet0\/0\/1/);
	assert.equal(question.hideExhibitImage, true);
});

test("aligns the Question 1305 exhibit markers with their routing-table values", () => {
	const question = applyNativeExhibit({ bankId: 1305 });
	const lines = question.exhibit.split("\n");
	const markerLine = lines.find((line) => line.startsWith("A"));
	const pointerLine = lines.find((line) => line.startsWith("↓"));
	const defaultRoute = lines.find((line) => line.startsWith("B*"));
	const outboundMarker = lines.find((line) => line.trim() === "E");
	const outboundPointer = lines.find((line) => line.trim() === "↓");
	const outboundRoute = lines.find((line) => line.includes("GigabitEthernet0/0/1"));
	const markerPositions = [...markerLine].flatMap((character, index) => (
		"ABCD".includes(character) ? [index] : []
	));
	const pointerPositions = [...pointerLine].flatMap((character, index) => (
		character === "↓" ? [index] : []
	));

	assert.equal(markerLine.indexOf("A"), defaultRoute.indexOf("B*"));
	assert.equal(markerLine.indexOf("B"), defaultRoute.indexOf("[20/0]") + 1);
	assert.equal(markerLine.indexOf("C"), defaultRoute.indexOf("[20/0]") + 4);
	assert.equal(markerLine.indexOf("D"), defaultRoute.indexOf("6w3d"));
	assert.deepEqual(pointerPositions, markerPositions);
	assert.equal(outboundMarker.indexOf("E"), outboundRoute.indexOf("GigabitEthernet0/0/1"));
	assert.equal(outboundPointer.indexOf("↓"), outboundMarker.indexOf("E"));
});
