import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";

let vite;
let PRACTICE_LABS;
let HIDDEN_PRACTICE_LABS;
let createLabState;
let execute;
let configCommands;
let applyWorksheetCommands;
let canReach;
let canReachIpv6;
let getOspfDr;
let buildPacketTracerGuide;
let ptIfName;

before(async () => {
	vite = await createServer({
		configFile: false,
		server: { middlewareMode: true, hmr: false },
		optimizeDeps: { noDiscovery: true, include: [] },
		appType: "custom",
	});
	({ PRACTICE_LABS, HIDDEN_PRACTICE_LABS } = await vite.ssrLoadModule("/src/pages/training/cisco/ccna/labs/labDefinitions.js"));
	({ createLabState, execute, configCommands, canReach, canReachIpv6, getOspfDr, buildPacketTracerGuide, ptIfName } = await vite.ssrLoadModule("/src/pages/training/cisco/ccna/labs/labEngine.js"));
	({ applyWorksheetCommands } = await vite.ssrLoadModule("/src/pages/training/cisco/ccna/labs/worksheetCommands.js"));
});

after(async () => {
	await vite.close();
});

test("shows the unlocked dual-stack Lab 5 and all six additional labs", () => {
	assert.deepEqual(PRACTICE_LABS.map(({ id }) => id), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
	assert.equal(PRACTICE_LABS[0].title, "Voice VLAN Configuration 2");
	assert.equal(PRACTICE_LABS[1].title, "Voice VLANs and LLDP");
	assert.equal(PRACTICE_LABS[2].title, "Allowed VLANs, Native VLAN, and LACP");
	assert.equal(PRACTICE_LABS[3].title, "Static Routing and Failover");
	assert.equal(PRACTICE_LABS[4].title, "IPv4 and IPv6 Router Connectivity");
	assert.deepEqual(HIDDEN_PRACTICE_LABS, []);
});

test("every lab final check accepts its lab topology", () => {
	for (const lab of PRACTICE_LABS) {
		assert.doesNotThrow(
			() => lab.finalCheck.check(createLabState(lab), lab),
			`Lab ${lab.id} final check should accept its topology`,
		);
	}
});

test("every lab topology displays all devices and links only existing interfaces", () => {
	for (const lab of PRACTICE_LABS) {
		assert.deepEqual(
			Object.keys(lab.layout.nodes).sort(),
			Object.keys(lab.devices).sort(),
			`Lab ${lab.id} should display every declared device and no undeclared devices`,
		);
		const linkedDevices = new Set();
		for (const link of lab.links) {
			for (const endpoint of [link.a, link.b]) {
				const [deviceName, interfaceName] = endpoint.split(":");
				assert.ok(lab.devices[deviceName], `Lab ${lab.id} link ${endpoint} should reference a declared device`);
				assert.ok(
					lab.devices[deviceName].interfaces[interfaceName],
					`Lab ${lab.id} link ${endpoint} should reference a declared interface`,
				);
				linkedDevices.add(deviceName);
			}
		}
		assert.deepEqual(
			[...linkedDevices].sort(),
			Object.keys(lab.devices).sort(),
			`Lab ${lab.id} should connect every displayed device`,
		);
	}
});

test("worksheet prompts target editable devices and real interfaces", () => {
	for (const lab of PRACTICE_LABS) {
		for (const group of lab.worksheet ?? []) {
			for (const slot of group.slots) {
				for (const name of slot.devices) {
					assert.ok(lab.editable.includes(name), `Lab ${lab.id} worksheet should only target editable device ${name}`);
					if (slot.iface) {
						assert.ok(
							lab.devices[name].interfaces[slot.iface],
							`Lab ${lab.id} worksheet should only target existing interface ${name}:${slot.iface}`,
						);
					}
				}
			}
		}
	}
});

test("Layer 2 labs omit nonexistent gateways from Packet Tracer setup", () => {
	for (const [labId, deviceNames] of [
		[1, ["IP Phone", "PC1", "PC2"]],
		[7, ["PC1", "PC2"]],
		[8, ["PC1", "PC2"]],
	]) {
		const lab = PRACTICE_LABS.find(({ id }) => id === labId);
		for (const deviceName of deviceNames) {
			const device = lab.devices[deviceName];
			assert.equal(device.gateway, "");
			assert.ok(configCommands(device).every((command) => !command.startsWith("Default gateway ")));
		}
	}
});

test("Packet Tracer build guides use Packet Tracer interface names and complete preconfiguration", () => {
	for (const lab of PRACTICE_LABS) {
		const guide = buildPacketTracerGuide(lab);
		assert.ok(guide.includes(`DEVICES: ${lab.ptDevices}`), `Lab ${lab.id} should list Packet Tracer devices`);
		assert.ok(guide.includes("PRE-CONFIGURATION"), `Lab ${lab.id} should include preconfiguration`);
		assert.ok(guide.includes("YOUR TASKS"), `Lab ${lab.id} should include tasks`);
		for (const name of Object.keys(lab.devices)) {
			assert.ok(guide.includes(`[${name}]`), `Lab ${lab.id} should include setup for ${name}`);
		}
		for (const link of lab.links) {
			const [deviceA, interfaceA] = link.a.split(":");
			const [deviceB, interfaceB] = link.b.split(":");
			assert.ok(
				guide.split("\n").some((line) => (
					line.includes(`${deviceA} ${ptIfName(lab.devices[deviceA], interfaceA, deviceA)}`) &&
					line.includes(`${deviceB} ${ptIfName(lab.devices[deviceB], interfaceB, deviceB)}`)
				)),
				`Lab ${lab.id} guide should cable ${link.a} to ${link.b}`,
			);
		}
	}

	const lab1 = PRACTICE_LABS.find(({ id }) => id === 1);
	const lab1Guide = buildPacketTracerGuide(lab1);
	assert.ok(lab1Guide.includes("FastEthernet0/2 (E0/1)"), "switch E0/1 should map to Packet Tracer FastEthernet0/2");
	assert.ok(lab1Guide.includes("GigabitEthernet0/0"), "router G0/0 should map to Packet Tracer GigabitEthernet0/0");
	assert.ok(lab1Guide.includes("Switch"), "IP Phone fa0 should map to the Switch port");
	assert.ok(lab1Guide.includes("PC"), "IP Phone fa1 should map to the PC port");
	assert.equal(ptIfName(lab1.devices["SW-1"], "e0/1", "SW-1"), "FastEthernet0/2");
	assert.equal(ptIfName(lab1.devices.R1, "g0/0", "R1"), "GigabitEthernet0/0");
});

test("every lab's terminal solution executes and passes every task", () => {
	for (const lab of PRACTICE_LABS) {
		let state = createLabState(lab);
		for (const [device, commands] of Object.entries(lab.solution)) {
			for (const command of commands) {
				const result = execute(lab, state, device, command);
				assert.ok(
					!result.out.some((line) => /% Invalid input|% Incomplete command/.test(line)),
					`Lab ${lab.id} ${device} should accept "${command}"`,
				);
				state = result.state;
			}
		}
		for (const task of lab.tasks) {
			assert.ok(task.check(state, lab), `Lab ${lab.id} task "${task.id}" should pass`);
		}
		assert.ok(lab.finalCheck.check(state, lab), `Lab ${lab.id} final check should pass`);
	}
});

test("the recreated voice VLAN lab matches its topology and worksheet", () => {
	const lab = PRACTICE_LABS.find(({ id }) => id === 1);
	const answers = [
		"interface e0/1", "switchport mode access", "switchport access vlan 10", "switchport voice vlan 11",
		"interface e0/1", "switchport mode access", "switchport access vlan 30",
		"vlan 10", "name Engineering", "exit", "vlan 11", "exit", "vlan 30", "exit",
		"lldp run", "interface e0/0", "lldp transmit", "lldp receive",
		"interface e0/2", "no cdp enable", "copy running-config startup-config",
	];
	const result = applyWorksheetCommands(lab, lab.worksheet, answers, createLabState(lab));

	assert.deepEqual(result.failedSlots, []);
	for (const task of lab.tasks) assert.ok(task.check(result.state), `${task.id} should pass`);
	assert.ok(lab.finalCheck.check(result.state));
	assert.equal(lab.links.length, 5);
	assert.equal(result.state.devices["SW-1"].vlans["11"], "");
	assert.equal(result.state.devices["SW-2"].vlans["30"], "");
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

test("the static-routing lab worksheet configures primary, backup, default, and save tasks", () => {
	const lab = PRACTICE_LABS.find(({ id }) => id === 4);
	const answers = [
		"ip route 10.0.41.10 255.255.255.255 10.0.12.2",
		"ip route 10.0.41.10 255.255.255.255 10.0.24.4",
		"ip route 10.0.41.10 255.255.255.255 10.0.13.3 254",
		"ip route 10.0.41.10 255.255.255.255 10.0.34.4",
		"ip route 0.0.0.0 0.0.0.0 10.0.13.3",
		"ip route 0.0.0.0 0.0.0.0 209.165.201.1",
		"copy running-config startup-config",
	];
	const result = applyWorksheetCommands(lab, lab.worksheet, answers, createLabState(lab));

	assert.deepEqual(result.failedSlots, []);
	for (const task of lab.tasks) assert.ok(task.check(result.state, lab), `task "${task.id}" should be complete`);
	assert.ok(canReach(lab, result.state, "R1", "10.0.41.10"));
	const failoverState = structuredClone(result.state);
	failoverState.devices.R1.interfaces["e0/0"].up = false;
	assert.ok(canReach(lab, failoverState, "R1", "10.0.41.10"), "R1 should reach PC1 through R3 when its primary link is down");
	assert.ok(lab.finalCheck.check(result.state, lab));
});

test("the simulator still supports IPv6 addressing, ping, and saving for a future lab", () => {
	const lab = PRACTICE_LABS.find(({ id }) => id === 5);
	const answers = [
		"interface e0/1",
		"ip address 192.168.180.17 255.255.255.240",
		"ipv6 address 2001:db8:acca::1/64",
		"no shutdown",
		"interface e0/1",
		"ip address 192.168.180.30 255.255.255.240",
		"ipv6 address 2001:db8:acca::2/64",
		"no shutdown",
		"ping 192.168.180.30",
		"ping ipv6 2001:db8:acca::2",
		"copy running-config startup-config",
	];
	const result = applyWorksheetCommands(lab, lab.worksheet, answers, createLabState(lab));

	assert.deepEqual(result.failedSlots, []);
	for (const task of lab.tasks) assert.ok(task.check(result.state, lab), `task "${task.id}" should be complete`);
	assert.ok(canReach(lab, result.state, "R1", "192.168.180.30"));
	assert.ok(canReachIpv6(lab, result.state, "R1", "2001:db8:acca::2"));
	for (const device of lab.editable) {
		assert.ok(execute(lab, result.state, device, "show running-config").out.some((line) => line.includes(" ipv6 address 2001:db8:acca::")));
	}
	assert.ok(lab.finalCheck.check(result.state, lab));
});

test("IPv6 interface addresses require a valid prefix length", () => {
	const lab = PRACTICE_LABS.find(({ id }) => id === 5);
	const state = createLabState(lab);
	state.consoles.R1.mode = "config-if";
	state.consoles.R1.iface = "e0/1";

	const result = execute(lab, state, "R1", "ipv6 address 2001:db8:acca::1");
	assert.ok(result.out.some((line) => line.includes("% Invalid input")));
	assert.equal(result.state.devices.R1.interfaces["e0/1"].ipv6, "");
});

test("the /26 and /125 point-to-point worksheet configures and verifies both protocols", () => {
	const lab = PRACTICE_LABS.find(({ id }) => id === 6);
	const answers = [
		"interface e0/0", "ip address 10.26.0.1 255.255.255.192", "ipv6 address 2001:db8:26::1/125", "no shutdown",
		"interface e0/0", "ip address 10.26.0.2 255.255.255.192", "ipv6 address 2001:db8:26::2/125", "no shutdown",
		"ping 10.26.0.2", "ping ipv6 2001:db8:26::2", "copy running-config startup-config",
	];
	const result = applyWorksheetCommands(lab, lab.worksheet, answers, createLabState(lab));

	assert.deepEqual(result.failedSlots, []);
	for (const task of lab.tasks) assert.ok(task.check(result.state, lab), `${task.id} should pass`);
	assert.ok(canReach(lab, result.state, "R1", "10.26.0.2"));
	assert.ok(canReachIpv6(lab, result.state, "R1", "2001:db8:26::2"));
});

test("the VLAN and LACP worksheets pass their configuration checks", () => {
	const vlanLab = PRACTICE_LABS.find(({ id }) => id === 7);
	const vlanAnswers = [
		"vlan 20", "name Staff", "vlan 30", "name Guest", "exit",
		"interface e0/1", "switchport mode access", "switchport access vlan 20",
		"interface e0/1", "switchport mode access", "switchport access vlan 30",
		"interface e0/0", "switchport mode trunk", "switchport trunk allowed vlan 20,30",
		"copy running-config startup-config",
	];
	const vlanResult = applyWorksheetCommands(vlanLab, vlanLab.worksheet, vlanAnswers, createLabState(vlanLab));
	assert.deepEqual(vlanResult.failedSlots, []);
	for (const task of vlanLab.tasks) assert.ok(task.check(vlanResult.state, vlanLab), `${task.id} should pass`);

	const lacpLab = PRACTICE_LABS.find(({ id }) => id === 8);
	const lacpAnswers = [
		"vlan 40", "vlan 50",
		"interface e0/2", "switchport mode access", "switchport access vlan 40",
		"interface range e0/0 - 1", "switchport mode trunk", "switchport trunk allowed vlan 40,50",
		"interface range e0/0 - 1", "channel-group 10 mode active",
		"interface range e0/0 - 1", "channel-group 10 mode passive",
		"copy running-config startup-config",
	];
	const lacpResult = applyWorksheetCommands(lacpLab, lacpLab.worksheet, lacpAnswers, createLabState(lacpLab));
	assert.deepEqual(lacpResult.failedSlots, []);
	for (const task of lacpLab.tasks) assert.ok(task.check(lacpResult.state, lacpLab), `${task.id} should pass`);
});

test("standard ACLs filter packets by source and routing labs verify both directions", () => {
	const aclLab = PRACTICE_LABS.find(({ id }) => id === 9);
	const aclAnswers = [
		"ip route 192.168.50.0 255.255.255.0 10.0.12.2",
		"ip route 192.168.10.0 255.255.255.0 10.0.12.1",
		"access-list 10 permit host 192.168.10.10",
		"interface e0/0", "ip access-group 10 in",
		"copy running-config startup-config",
	];
	const aclResult = applyWorksheetCommands(aclLab, aclLab.worksheet, aclAnswers, createLabState(aclLab));
	assert.deepEqual(aclResult.failedSlots, []);
	for (const task of aclLab.tasks) assert.ok(task.check(aclResult.state, aclLab), `${task.id} should pass`);
	assert.ok(canReach(aclLab, aclResult.state, "Trusted PC", "192.168.50.10"));
	assert.equal(canReach(aclLab, aclResult.state, "Guest PC", "192.168.50.10"), false);
	assert.ok(execute(aclLab, aclResult.state, "R1", "show running-config").out
		.some((line) => line.includes("access-list 10 permit 192.168.10.10 0.0.0.0")));

	const routeLab = PRACTICE_LABS.find(({ id }) => id === 10);
	const routeAnswers = [
		"ip route 172.16.20.0 255.255.255.0 10.10.12.2",
		"ip route 0.0.0.0 0.0.0.0 10.10.12.1",
		"show ip route",
		"copy running-config startup-config",
	];
	const routeResult = applyWorksheetCommands(routeLab, routeLab.worksheet, routeAnswers, createLabState(routeLab));
	assert.deepEqual(routeResult.failedSlots, []);
	for (const task of routeLab.tasks) assert.ok(task.check(routeResult.state, routeLab), `${task.id} should pass`);
	assert.ok(canReach(routeLab, routeResult.state, "PC1", "172.16.20.20"));
});

test("OSPF DR election uses interface priority then router ID", () => {
	const lab = PRACTICE_LABS.find(({ id }) => id === 11);
	assert.deepEqual(Object.keys(lab.solution), ["R3", "R2", "R1"]);
	const bringUpGroup = lab.worksheet.find(({ title }) => title.startsWith("Task 4"));
	assert.deepEqual([...new Set(bringUpGroup.slots.flatMap(({ devices }) => devices))], ["R3", "R2", "R1"]);
	assert.match(buildPacketTracerGuide(lab), /bring R3 GigabitEthernet0\/0 up before R2 and R1/i);
	const answers = [
		"interface e0/0", "ip ospf priority 100",
		"interface e0/0", "ip ospf priority 150",
		"interface e0/0", "ip ospf priority 150",
		"router ospf 10", "router-id 1.1.1.1",
		"router ospf 10", "router-id 2.2.2.2",
		"router ospf 10", "router-id 3.3.3.3",
		"network 10.11.0.0 0.0.0.7 area 0",
		"network 10.11.0.0 0.0.0.7 area 0",
		"network 10.11.0.0 0.0.0.7 area 0",
		"interface e0/0", "no shutdown",
		"interface e0/0", "no shutdown",
		"interface e0/0", "no shutdown",
		"copy running-config startup-config",
	];
	const result = applyWorksheetCommands(lab, lab.worksheet, answers, createLabState(lab));

	assert.deepEqual(result.failedSlots, []);
	for (const task of lab.tasks) assert.ok(task.check(result.state, lab), `${task.id} should pass`);
	assert.equal(getOspfDr(lab, result.state, "10.11.0.0/29"), "R3");
	assert.ok(execute(lab, result.state, "R3", "show running-config").out
		.some((line) => line.includes("network 10.11.0.0 0.0.0.7 area 0")));
});
