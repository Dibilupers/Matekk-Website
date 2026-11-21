import assert from "node:assert/strict";
import test from "node:test";
import {
	applyNativeExhibit,
	CCNA_RECREATED_TEXT_EXHIBITS,
} from "./ccnaCompositeSetQuestions.js";
import { CCNA_RECREATED_CANDIDATE_EXHIBITS } from "./ccnaRecreatedCandidateExhibits.js";
import { CCNA_LEGACY_QUESTIONS } from "./ccnaLegacyQuestions.js";

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

test("uses the source-faithful four-router OSPF exhibit for Question 1167", () => {
	const question = applyNativeExhibit({ bankId: 1167 });

	assert.equal(question.exhibitDiagram, "ospf-four-router-broadcast");
	assert.equal(question.hideExhibitImage, true);
});

test("adds the three VLAN subnet labels to Question 1194's topology", () => {
	const question = applyNativeExhibit({ bankId: 1194 });

	assert.equal(question.exhibitDiagram, "vlan-switch-web-server");
	assert.equal(question.hideExhibitImage, true);
});

test("recreates Question 1197's R1-to-PC-1 exhibit with its source configuration", () => {
	const question = applyNativeExhibit({ bankId: 1197 });

	assert.equal(question.exhibitDiagram, "r1-ssh-acl-pc1");
	assert.equal(question.hideExhibitImage, true);
	assert.equal(question.exhibitQuality, "source-backed");
});

test("recreates Question 1199's database and client topology", () => {
	const question = applyNativeExhibit({ bankId: 1199 });

	assert.equal(question.exhibitDiagram, "r1-r2-database-security");
	assert.equal(question.hideExhibitImage, true);
});

test("redraws legacy question 405 without reusing the database question 405 exhibit", () => {
	const legacyQuestion = CCNA_LEGACY_QUESTIONS.find(({ legacyIndex }) => legacyIndex === 405);
	const question = applyNativeExhibit(legacyQuestion);

	assert.equal(question.exhibitDiagram, "router-internet-two-lans-four-pcs");
	assert.equal(question.hideExhibitImage, true);
	assert.equal(applyNativeExhibit({ bankId: 405 }).exhibitDiagram, "nat-router-lans-internet");
});

test("reconstructs the missing mixed-protocol exhibit without retaining its mismatched after image", () => {
	for (const question of [
		applyNativeExhibit({ legacyIndex: 415, afterExhibit: { imageUrl: "stale-image.png" } }),
		applyNativeExhibit({ bankId: 99, afterExhibit: { imageUrl: "stale-image.png" } }),
	]) {
		assert.equal(question.exhibitDiagram, "r4-mixed-routing");
		assert.equal(question.hideExhibitImage, true);
		assert.equal(question.hideAfterExhibit, true);
		assert.equal(question.afterExhibit, undefined);
		assert.equal(question.exhibitQuality, "illustrative");
	}
});

test("redraws legacy index 421 from its source exhibit instead of the mismatched after image", () => {
	for (const question of [
		applyNativeExhibit({ legacyIndex: 421, afterExhibit: { imageUrl: "stale-image.png" } }),
		applyNativeExhibit({ bankId: 105, afterExhibit: { imageUrl: "stale-image.png" } }),
	]) {
		assert.equal(question.exhibitDiagram, "ipv6-three-router-policy");
		assert.equal(question.hideExhibitImage, true);
		assert.equal(question.hideAfterExhibit, true);
		assert.equal(question.afterExhibit, undefined);
		assert.equal(question.exhibitQuality, "source-backed");
	}
});

test("uses the corrected LACP terminal for legacy index 460 instead of its conflicting PAgP image", () => {
	for (const question of [
		applyNativeExhibit({ legacyIndex: 460, afterExhibit: { imageUrl: "stale-image.png" } }),
		applyNativeExhibit({ bankId: 143, afterExhibit: { imageUrl: "stale-image.png" } }),
	]) {
		assert.equal(question.hideExhibitImage, true);
		assert.equal(question.hideAfterExhibit, true);
		assert.equal(question.afterExhibit, undefined);
		assert.equal(question.exhibitQuality, "partial");
		assert.match(question.exhibit, /Protocol\s+Ports\n1\s+Po1\(SD\)\s+LACP/);
		assert.match(question.exhibit, /channel-group 1 mode passive/);
	}
});

test("reconstructs legacy index 474 from the question-matched site topology", () => {
	for (const question of [
		applyNativeExhibit({ legacyIndex: 474, afterExhibit: { imageUrl: "stale-image.png" } }),
		applyNativeExhibit({ bankId: 157, afterExhibit: { imageUrl: "stale-image.png" } }),
	]) {
		assert.equal(question.exhibitDiagram, "two-site-r1-r2-wan");
		assert.equal(question.hideExhibitImage, true);
		assert.equal(question.hideAfterExhibit, true);
		assert.equal(question.afterExhibit, undefined);
		assert.equal(question.exhibitQuality, "illustrative");
	}
});

test("redraws legacy index 478 as overlapping wireless zones with the original channel legend", () => {
	for (const question of [
		applyNativeExhibit({ legacyIndex: 478 }),
		applyNativeExhibit({ bankId: 161 }),
	]) {
		assert.equal(question.exhibitDiagram, "wireless-zone-overlap");
		assert.equal(question.hideExhibitImage, true);
		assert.equal(question.exhibitQuality, "partial");
	}
});

test("hides legacy index 486's image because its options already contain the complete configurations", () => {
	const question = applyNativeExhibit({ legacyIndex: 486 });

	assert.equal(question.hideExhibitImage, true);
});

test("reuses the source-backed access-list topology and terminal for legacy index 489", () => {
	for (const question of [
		applyNativeExhibit({ legacyIndex: 489, afterExhibit: { imageUrl: "stale-image.png" } }),
		applyNativeExhibit({ bankId: 172, afterExhibit: { imageUrl: "stale-image.png" } }),
	]) {
		assert.equal(question.exhibitDiagram, "rtr1-access-list-lan");
		assert.equal(question.hideExhibitImage, true);
		assert.equal(question.hideAfterExhibit, true);
		assert.equal(question.afterExhibit, undefined);
		assert.equal(question.exhibitQuality, "source-backed");
		assert.match(question.exhibit, /access-list 10 deny host 10\.150\.1\.1/);
	}
});

test("keeps Question 130's DR/BDR answer aligned with its exhibit priorities", () => {
	const question = CCNA_LEGACY_QUESTIONS.find(({ legacyIndex }) => legacyIndex === 130);

	assert.equal(question.options[question.answer], "Router R2 will become the DR and router R4 will become the BDR.");
	assert.match(question.explanation, /Priority 0.*ineligible/i);
});

test("recreates Question 1157's interface summary and hides its mismatched image", () => {
	const question = applyNativeExhibit({ bankId: 1157 });

	assert.equal(question.exhibit, CCNA_RECREATED_TEXT_EXHIBITS.routerInterfaceBrief);
	assert.equal(question.hideExhibitImage, true);
	assert.match(question.exhibit, /192\.168\.0\.1/);
	assert.match(question.exhibit, /10\.10\.10\.20/);
	assert.match(question.exhibit, /172\.16\.15\.10/);
	assert.doesNotMatch(question.exhibit, /10\.0\.8\.29|10\.7\.3\.28/);
});

test("uses the voice-and-data VLAN topology for Question 268", () => {
	assert.equal(applyNativeExhibit({ bankId: 268 }).exhibitDiagram, "voice-vlan-two-switch");
});

test("redraws Question 382's voice and data VLAN exhibit", () => {
	const question = applyNativeExhibit({ bankId: 382 });

	assert.equal(question.exhibitDiagram, "voice-data-vlan300-400");
	assert.equal(question.hideExhibitImage, true);
});

test("redraws Question 39's switch configurations as a two-column exhibit", () => {
	const question = applyNativeExhibit({ bankId: 39 });

	assert.equal(question.exhibitDiagram, "switch-config-two-column-39");
	assert.equal(question.hideExhibitImage, true);
	assert.equal(question.exhibit, undefined);
});

test("rebuilds Question 246 as a complete route topology and hides the source image", () => {
	const question = applyNativeExhibit({ bankId: 246 });

	assert.equal(question.exhibitDiagram, "r14-r86-static-route-172");
	assert.equal(question.hideExhibitImage, true);
});

test("rebuilds the R14-to-PC10 host-route exhibit for the database and legacy question", () => {
	const prompt = "Refer to the exhibit. Router R14 is in the process of being configured. Which configuration must be used to establish a host route to PC 10?";
	for (const question of [
		applyNativeExhibit({ prompt, bankId: 834, afterExhibit: { imageUrl: "unrelated.png" } }),
		applyNativeExhibit({ prompt, legacyIndex: 834, afterExhibit: { imageUrl: "unrelated.png" } }),
	]) {
		assert.equal(question.exhibitDiagram, "r14-r86-pc10-host-route");
		assert.equal(question.hideExhibitImage, true);
		assert.equal(question.hideAfterExhibit, true);
		assert.equal(question.afterExhibit, undefined);
		assert.equal(question.exhibitQuality, "source-backed");
	}
});

test("rebuilds the R86 route to R14's 172.16.34.0/29 network", () => {
	const question = applyNativeExhibit({
		prompt: "Refer to the exhibit. A static route must be configured on R86 to forward traffic for the 172.16.34.0/29 network, which resides on R14.",
	});

	assert.equal(question.exhibitDiagram, "r86-static-route-to-r14-17216-34");
	assert.equal(question.hideExhibitImage, true);
});

test("uses the IPv6 WAN exhibit for both its live-bank ID and legacy prompt", () => {
	const byBankId = applyNativeExhibit({ bankId: 159 });
	const byPrompt = applyNativeExhibit({
		prompt: "Refer to the exhibit. Which IPv6 configuration is required for R17 to successfully ping the WAN interface on R18?",
	});

	assert.equal(byBankId.exhibitDiagram, "candidate-ipv6-wan-159");
	assert.equal(byBankId.hideExhibitImage, true);
	assert.equal(byPrompt.exhibitDiagram, "candidate-ipv6-wan-159");
	assert.equal(byPrompt.hideExhibitImage, true);
});

test("selects answer-enriched candidate topologies for matching live question IDs", () => {
	const expectedDiagrams = new Map([
		[24, "candidate-vlan-roles-24"],
		[66, "candidate-voice-data-66"],
		[82, "candidate-cdp-target-82"],
		[198, "candidate-etherchannel-198"],
		[703, "candidate-pc2-file-server-policy-703"],
	]);

	for (const [bankId, exhibitDiagram] of expectedDiagrams) {
		const question = applyNativeExhibit({ bankId });
		assert.equal(question.exhibitDiagram, exhibitDiagram);
		assert.equal(question.hideExhibitImage, true);
	}

	assert.equal(applyNativeExhibit({ bankId: 24 }).exhibitQuality, "source-backed");
	const legacyQuestion = applyNativeExhibit({
		prompt: "Refer to the exhibit. An administrator must configure interfaces Gi1/1 and Gi1/3 on switch SW11.",
	});
	assert.equal(legacyQuestion.exhibitDiagram, "candidate-vlan-roles-24");
	assert.equal(legacyQuestion.hideExhibitImage, true);
});

test("uses the VLAN 100/200 PAT exhibit for the matching question prompt", () => {
	const question = applyNativeExhibit({
		prompt: "Refer to exhibit. Which configuration must be applied to the router that configures PAT to translate all addresses in VLAN 200 while allowing devices on VLAN 100 to use their own IP addresses?",
	});

	assert.equal(question.exhibitDiagram, "pat-vlan-subnetting-100-200");
	assert.equal(question.hideExhibitImage, true);
});

test("uses the Subnet A/B outbound ACL exhibit for the matching question prompt", () => {
	const question = applyNativeExhibit({
		prompt: "Refer to the exhibit. Option A: permit 10.100.100.0 0.0.0.255; deny 192.168.0.0 0.0.255.255. An access list is required to permit traffic from any host on interface G0/0 and deny traffic from interface Gi0/1. Which access list must be applied?",
	});

	assert.equal(question.exhibitDiagram, "standard-acl-subnet-a-b-gi02");
	assert.equal(question.hideExhibitImage, true);
});

test("uses the Router1/Router2 NTP exhibit for the matching question prompt", () => {
	const question = applyNativeExhibit({
		prompt: "Refer to the exhibit. The ntp server 192.168.0.3 command has been configured on Router1 to make it an NTP client of router 2. Which command must be configured on Router2 so that it operates in server-only mode?",
	});

	assert.equal(question.exhibitDiagram, "r1-r2-ntp-link");
	assert.equal(question.hideExhibitImage, true);
});

test("rebuilds Question 273 as separate WAN networks and hides the source image", () => {
	const question = applyNativeExhibit({ bankId: 273 });

	assert.equal(question.exhibitDiagram, "dual-wan-site-routing");
	assert.equal(question.hideExhibitImage, true);
});

test("redraws Question 403 as a route-focused topology and hides the source image", () => {
	const question = applyNativeExhibit({ bankId: 403 });

	assert.equal(question.exhibitDiagram, "r1-floating-default-routes");
	assert.equal(question.hideExhibitImage, true);
	assert.match(question.exhibit, /172\.16\.20\.2/);
	assert.match(question.exhibit, /10\.0\.0\.2 20/);
});

test("keeps Questions 516 and 517 as distinct matching activities without the shared route diagram", () => {
	const question516 = applyNativeExhibit({
		bankId: 516,
		type: "match",
		prompt: "Drag and drop the descriptions or AAA services from the left onto the corresponding services on the right.",
		items: ["records user commands", "logs session statistics"],
		choices: ["Accounting", "Authentication", "Authorization"],
		answer: [0, 0],
	});
	const question517 = applyNativeExhibit({
		bankId: 517,
		type: "match",
		prompt: "Drag and drop the TCP or UDP details from the left onto their corresponding protocols on the right.",
		items: ["used to reliably share files between devices"],
		choices: ["TCP", "UDP"],
		answer: [0],
	});

	assert.equal(question516.exhibitDiagram, undefined);
	assert.equal(question517.exhibitDiagram, undefined);
	assert.equal(question516.type, "match");
	assert.equal(question517.type, "match");
	assert.notEqual(question516.prompt, question517.prompt);
	assert.deepEqual(question516.items, ["records user commands", "logs session statistics"]);
	assert.deepEqual(question517.items, ["used to reliably share files between devices"]);
	assert.deepEqual(question516.choices, ["Accounting", "Authentication", "Authorization"]);
	assert.deepEqual(question517.choices, ["TCP", "UDP"]);
	assert.deepEqual(question516.answer, [0, 0]);
	assert.deepEqual(question517.answer, [0]);
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

test("reconstructs candidate exhibits from the local source records", () => {
	assert.equal(CCNA_RECREATED_CANDIDATE_EXHIBITS.size, 53);

	const jsonQuestion = applyNativeExhibit({ bankId: 303 });
	assert.match(jsonQuestion.exhibit, /"Routers": \["R1", "R2", "R3"\]/);
	assert.equal(jsonQuestion.nativeExhibitText, true);

	const terminalQuestion = applyNativeExhibit({ bankId: 1096 });
	assert.match(terminalQuestion.exhibit, /vtp mode transparent/);
	assert.equal(terminalQuestion.exhibitDiagram, "vtp-transparent-frame-flow");
	assert.equal(terminalQuestion.exhibitQuality, "source-backed");

	const wirelessQuestion = applyNativeExhibit({ bankId: 260 });
	assert.equal(wirelessQuestion.exhibitDiagram, "candidate-wlc-260");

	const illustrativeQuestion = applyNativeExhibit({ bankId: 451 });
	assert.equal(illustrativeQuestion.exhibitQuality, "illustrative");
	assert.match(illustrativeQuestion.exhibit, /original content is unavailable/i);
});

test("adds partial exhibits for live rows missing both image and inline exhibit data", () => {
	for (const bankId of [29, 66, 82, 159, 169, 198, 557, 703, 832, 924]) {
		const question = applyNativeExhibit({ bankId, prompt: "Refer to the exhibit." });
		assert.equal(question.hideExhibitImage, true);
		assert.ok(question.exhibitDiagram || question.exhibit);
		assert.ok(["partial", "illustrative"].includes(question.exhibitQuality));
	}
});

test("hides Question 491's unrelated image and removes its stale exhibit lead-in", () => {
	const question = applyNativeExhibit({
		bankId: 491,
		prompt: "Refer to the exhibit. Local access for R4 must be established.",
	});

	assert.equal(question.hideExhibitImage, true);
	assert.equal(question.prompt, "Local access for R4 must be established.");
});
