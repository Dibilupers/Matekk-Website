import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";

let vite;
let PRACTICE_LABS;
let createLabState;
let execute;
let applyWorksheetCommands;

before(async () => {
	vite = await createServer({
		configFile: false,
		server: { middlewareMode: true, hmr: false },
		optimizeDeps: { noDiscovery: true, include: [] },
		appType: "custom",
	});
	({ PRACTICE_LABS } = await vite.ssrLoadModule("/src/pages/training/cisco/ccna/labs/labDefinitions.js"));
	({ createLabState, execute } = await vite.ssrLoadModule("/src/pages/training/cisco/ccna/labs/labEngine.js"));
	({ applyWorksheetCommands } = await vite.ssrLoadModule("/src/pages/training/cisco/ccna/labs/worksheetCommands.js"));
});

after(async () => {
	await vite.close();
});

test("loads the three PDF-based practice labs and keeps the level-four baseline", () => {
	assert.deepEqual(PRACTICE_LABS.map(({ id }) => id), [1, 2, 3, 4]);
	assert.equal(PRACTICE_LABS[0].title, "Voice VLAN Configuration 2");
	assert.equal(PRACTICE_LABS[1].title, "Voice VLANs and LLDP");
	assert.equal(PRACTICE_LABS[2].title, "Allowed VLANs, Native VLAN, and LACP");
	assert.equal(PRACTICE_LABS[3].level, "Advanced");
});

test("the recreated voice VLAN lab matches its topology and worksheet", () => {
	const lab = PRACTICE_LABS.find(({ id }) => id === 1);
	const answers = [
		"interface e0/1", "switchport mode access", "switchport access vlan 10", "switchport voice vlan 11",
		"interface e0/1", "switchport mode access", "switchport access vlan 30",
		"vlan 10", "name Engineering", "exit",
		"lldp run", "interface e0/0", "lldp transmit", "lldp receive",
		"interface e0/2", "no cdp enable", "copy running-config startup-config",
	];
	const result = applyWorksheetCommands(lab, lab.worksheet, answers, createLabState(lab));

	assert.deepEqual(result.failedSlots, []);
	for (const task of lab.tasks) assert.ok(task.check(result.state), `${task.id} should pass`);
	assert.ok(lab.finalCheck.check(result.state));
	assert.equal(lab.links.length, 5);
});

test("the two-switch VLAN and voice-port worksheet configures every range member", () => {
	const lab = PRACTICE_LABS.find(({ id }) => id === 2);
	const answers = [
		"vlan 77", "name User_VLAN", "vlan 177", "name Voice_VLAN", "exit",
		"interface range e0/1 - 3", "switchport mode access", "switchport access vlan 77", "switchport voice vlan 177",
		"lldp run", "interface e0/0", "lldp transmit", "lldp receive",
		"copy running-config startup-config",
	];
	const result = applyWorksheetCommands(lab, lab.worksheet, answers, createLabState(lab));

	assert.deepEqual(result.failedSlots, []);
	for (const task of lab.tasks) assert.ok(task.check(result.state), `${task.id} should pass`);
	for (const name of ["SW-1", "SW-2"]) {
		for (const ifName of ["e0/1", "e0/2", "e0/3"]) {
			assert.equal(result.state.devices[name].interfaces[ifName].accessVlan, 77);
			assert.equal(result.state.devices[name].interfaces[ifName].voiceVlan, 177);
		}
	}
});

test("the trunk and LACP worksheet configures the PDF's allowed, native, and channel settings", () => {
	const lab = PRACTICE_LABS.find(({ id }) => id === 3);
	const answers = [
		"interface e0/0", "switchport trunk allowed vlan 5,6",
		"interface e0/1", "switchport trunk native vlan 77",
		"interface e0/2", "switchport trunk allowed vlan 6",
		"interface range e0/0 - 1", "channel-group 34 mode active",
		"interface range e0/0 - 1", "channel-group 34 mode passive",
		"copy running-config startup-config",
	];
	const result = applyWorksheetCommands(lab, lab.worksheet, answers, createLabState(lab));

	assert.deepEqual(result.failedSlots, []);
	for (const task of lab.tasks) assert.ok(task.check(result.state), `${task.id} should pass`);
	assert.ok(lab.finalCheck.check(result.state));
	for (const name of ["SW-1", "SW-2", "SW-3", "SW-4"]) {
		assert.ok(Object.values(lab.devices[name].interfaces).every((port) => port.switchportMode === "trunk"));
	}
});

test("the advanced switch lab accepts its solution and completes every task", () => {
	const lab = PRACTICE_LABS.find(({ id }) => id === 4);
	let state = createLabState(lab);

	for (const device of lab.editable) {
		for (const command of lab.solution[device]) {
			const result = execute(lab, state, device, command);
			state = result.state;
			assert.ok(
				!result.out.some((line) => line.includes("% Invalid input") || line.includes("% Incomplete command")),
				`${device} rejected "${command}": ${result.out.join("\n")}`,
			);
		}
	}

	for (const task of lab.tasks) {
		assert.ok(task.check(state, lab), `task "${task.id}" should be complete`);
	}
	assert.ok(lab.finalCheck.check(state));
});

test("the screenshot-style command worksheet applies answers and passes the lab checks", () => {
	const lab = PRACTICE_LABS.find(({ id }) => id === 4);
	const answers = [
		"interface e0/1",
		"switchport mode access",
		"switchport access vlan 10",
		"switchport voice vlan 11",
		"interface e0/1",
		"switchport mode access",
		"switchport access vlan 30",
		"vlan 10",
		"name Engineering",
		"exit",
		"lldp run",
		"interface e0/0",
		"lldp transmit",
		"lldp receive",
		"interface e0/2",
		"no cdp enable",
		"copy running-config startup-config",
	];
	const result = applyWorksheetCommands(lab, lab.worksheet, answers, createLabState(lab));

	assert.deepEqual(result.failedSlots, []);
	for (const task of lab.tasks) assert.ok(task.check(result.state, lab), `${task.id} should pass`);
});
