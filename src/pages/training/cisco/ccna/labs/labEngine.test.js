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

test("adds the voice VLAN and LLDP switch lab without replacing existing labs", () => {
	assert.deepEqual(PRACTICE_LABS.map(({ id }) => id), [1, 2, 3, 4]);
	assert.equal(PRACTICE_LABS[2].title, "Multi-Router Internet Access with Default Routes");
	assert.equal(PRACTICE_LABS[3].level, "Advanced");
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
