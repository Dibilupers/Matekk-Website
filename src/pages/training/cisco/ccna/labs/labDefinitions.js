import { isSaved } from "./labEngine";

const pc = (ip, mask, gateway, extraInterfaces = {}) => ({
	kind: "pc",
	hostname: "",
	gateway,
	interfaces: { fa0: { ip, mask }, ...extraInterfaces },
});

const switchDevice = (hostname, interfaces) => ({
	kind: "switch",
	hostname,
	interfaces: Object.fromEntries(interfaces.map((name) => [name, {}])),
	vlans: {},
	lldpEnabled: false,
});

const VOICE_VLAN_WORKSHEET = [
	{
		title: "Task 1. Configure SW-1 switch port E0/1 for the PC and Cisco IP phone",
		slots: [
			{ devices: ["SW-1"], prompt: "SW-1(config)#", context: "config" },
			{ devices: ["SW-1"], prompt: "SW-1(config-if)#", context: "config-if", iface: "e0/1" },
			{ devices: ["SW-1"], prompt: "SW-1(config-if)#", context: "config-if", iface: "e0/1" },
			{ devices: ["SW-1"], prompt: "SW-1(config-if)#", context: "config-if", iface: "e0/1" },
		],
	},
	{
		title: "Task 2. Configure SW-2 E0/1 for PC2",
		slots: [
			{ devices: ["SW-2"], prompt: "SW-2(config)#", context: "config" },
			{ devices: ["SW-2"], prompt: "SW-2(config-if)#", context: "config-if", iface: "e0/1" },
			{ devices: ["SW-2"], prompt: "SW-2(config-if)#", context: "config-if", iface: "e0/1" },
		],
	},
	{
		title: 'Task 3. Create VLAN 10 named "Engineering" on SW-1',
		slots: [
			{ devices: ["SW-1"], prompt: "SW-1(config)#", context: "config" },
			{ devices: ["SW-1"], prompt: "SW-1(config-vlan)#", context: "config-vlan", vlan: "10" },
			{ devices: ["SW-1"], prompt: "SW-1(config-vlan)#", context: "config-vlan", vlan: "10" },
		],
	},
	{
		title: "Task 4. Enable LLDP on the SW-1–SW-2 link",
		instructions: "On both switches:",
		slots: [
			{ devices: ["SW-1", "SW-2"], prompt: "SW-1, SW-2(config)#", context: "config" },
			{ devices: ["SW-1", "SW-2"], prompt: "SW-1, SW-2(config)#", context: "config" },
			{ devices: ["SW-1", "SW-2"], prompt: "SW-1, SW-2(config-if)#", context: "config-if", iface: "e0/0" },
			{ devices: ["SW-1", "SW-2"], prompt: "SW-1, SW-2(config-if)#", context: "config-if", iface: "e0/0" },
		],
	},
	{
		title: "Task 5. Disable CDP on the SW-1 link to R1",
		slots: [
			{ devices: ["SW-1"], prompt: "SW-1(config)#", context: "config" },
			{ devices: ["SW-1"], prompt: "SW-1(config-if)#", context: "config-if", iface: "e0/2" },
		],
	},
	{
		title: "Save the configuration on SW-1 and SW-2",
		slots: [{ devices: ["SW-1", "SW-2"], prompt: "SW-1#, SW-2#", context: "priv" }],
	},
];

const voiceVlanTasks = [
	{
		id: "sw1-phone-port",
		text: "Configure SW-1 E0/1 as an access port in data VLAN 10 and voice VLAN 11.",
		hint: "interface e0/1 → switchport mode access → switchport access vlan 10 → switchport voice vlan 11",
		check: (state) => {
			const port = state.devices["SW-1"].interfaces["e0/1"];
			return port.switchportMode === "access" && port.accessVlan === 10 && port.voiceVlan === 11;
		},
	},
	{
		id: "sw2-pc-port",
		text: "Configure SW-2 E0/1 as an access port in VLAN 30 for PC2.",
		hint: "interface e0/1 → switchport mode access → switchport access vlan 30",
		check: (state) => {
			const port = state.devices["SW-2"].interfaces["e0/1"];
			return port.switchportMode === "access" && port.accessVlan === 30;
		},
	},
	{
		id: "sw1-vlan10",
		text: 'Create VLAN 10 on SW-1 and name it "Engineering".',
		hint: "configure terminal → vlan 10 → name Engineering",
		check: (state) => state.devices["SW-1"].vlans["10"] === "Engineering",
	},
	{
		id: "lldp-link",
		text: "Enable LLDP globally and enable transmit and receive on both ends of the SW-1–SW-2 link.",
		hint: "On both switches: lldp run, then on interface e0/0 use lldp transmit and lldp receive.",
		check: (state) => ["SW-1", "SW-2"].every((name) => {
			const port = state.devices[name].interfaces["e0/0"];
			return state.devices[name].lldpEnabled && port.lldpTransmit && port.lldpReceive;
		}),
	},
	{
		id: "disable-cdp",
		text: "Disable CDP on SW-1 E0/2, the link to R1.",
		hint: "interface e0/2 → no cdp enable",
		check: (state) => state.devices["SW-1"].interfaces["e0/2"].cdpEnabled === false,
	},
	{
		id: "save-switches",
		text: "Save the configuration on both switches.",
		hint: "On each switch run copy running-config startup-config.",
		check: (state) => ["SW-1", "SW-2"].every((name) => isSaved(state, name)),
	},
];

const voiceVlanSolution = {
	"SW-1": [
		"enable", "configure terminal",
		"interface e0/1", "switchport mode access", "switchport access vlan 10", "switchport voice vlan 11", "exit",
		"vlan 10", "name Engineering", "exit",
		"lldp run", "interface e0/0", "lldp transmit", "lldp receive", "exit",
		"interface e0/2", "no cdp enable", "end", "copy running-config startup-config",
	],
	"SW-2": [
		"enable", "configure terminal",
		"interface e0/1", "switchport mode access", "switchport access vlan 30", "exit",
		"lldp run", "interface e0/0", "lldp transmit", "lldp receive", "end",
		"copy running-config startup-config",
	],
};

const voiceVlanLab = {
	level: "Beginner",
	summary: "Configure phone-and-PC access, a data VLAN, LLDP between switches, and disable CDP on the router link.",
	editable: ["SW-1", "SW-2"],
	worksheetInstructions: "R1 is preconfigured for VLANs 10 and 30. All physical cabling is in place; configure switch connectivity for the end devices.",
	devices: {
		"SW-1": switchDevice("SW-1", ["e0/0", "e0/1", "e0/2"]),
		"SW-2": switchDevice("SW-2", ["e0/0", "e0/1"]),
		R1: {
			kind: "router",
			hostname: "R1",
			interfaces: {
				"g0/0": { ip: "10.10.1.1", mask: "255.255.255.0", up: true },
				"g0/1": { ip: "192.168.30.1", mask: "255.255.255.0", up: true },
			},
		},
		"IP Phone": {
			kind: "pc",
			hostname: "",
			gateway: "10.11.1.1",
			interfaces: {
				fa0: { ip: "10.11.1.10", mask: "255.255.255.0" },
				fa1: {},
			},
		},
		PC1: pc("10.10.1.10", "255.255.255.0", "10.10.1.1"),
		PC2: pc("192.168.30.10", "255.255.255.0", "192.168.30.1"),
	},
	links: [
		{ a: "R1:g0/0", b: "SW-1:e0/2" },
		{ a: "SW-1:e0/0", b: "SW-2:e0/0", net: "LLDP" },
		{ a: "SW-1:e0/1", b: "IP Phone:fa0" },
		{ a: "IP Phone:fa1", b: "PC1:fa0", net: "Phone pass-through" },
		{ a: "SW-2:e0/1", b: "PC2:fa0" },
	],
	layout: {
		width: 760,
		height: 480,
		nodes: {
			R1: { x: 310, y: 35, details: ["VLAN 10 · 10.10.1.1", "VLAN 30 · 192.168.30.1"] },
			"SW-1": { x: 310, y: 170, sub: "Data VLAN 10 · Voice VLAN 11" },
			"SW-2": { x: 610, y: 170, sub: "Data VLAN 30" },
			"IP Phone": { x: 140, y: 280, label: "IP Phone", sub: "Voice VLAN 11 · 10.11.1.10" },
			PC1: { x: 140, y: 465, sub: "VLAN 10 · 10.10.1.10" },
			PC2: { x: 610, y: 285, sub: "VLAN 30 · 192.168.30.10" },
		},
	},
	tasks: voiceVlanTasks,
	worksheet: VOICE_VLAN_WORKSHEET,
	solution: voiceVlanSolution,
	finalCheck: {
		label: "Switch ports and LLDP match the voice VLAN topology",
		check: (state) => voiceVlanTasks.slice(0, 5).every((task) => task.check(state)),
	},
	ptDevices: "two Catalyst switches (SW-1, SW-2), one router (R1), one IP phone, and two PCs",
	hasPacketTracerFile: false,
};

const LAB1 = { ...voiceVlanLab, id: 1, title: "Voice VLAN Configuration 2" };
const LAB4 = { ...voiceVlanLab, id: 4, level: "Advanced", title: "Voice VLANs and Neighbor Discovery" };

const LAB2_DEVICES = ["SW-1", "SW-2"];
const LAB2_PORTS = ["e0/1", "e0/2", "e0/3"];
const LAB2 = {
	id: 2,
	level: "Intermediate",
	title: "Voice VLANs and LLDP",
	summary: "Create matching data and voice VLANs, configure access and phone ports, and enable LLDP between the switches.",
	editable: LAB2_DEVICES,
	devices: {
		"SW-1": switchDevice("SW-1", ["e0/0", ...LAB2_PORTS]),
		"SW-2": switchDevice("SW-2", ["e0/0", ...LAB2_PORTS]),
	},
	links: [{ a: "SW-1:e0/0", b: "SW-2:e0/0", net: "LLDP link" }],
	layout: {
		width: 720,
		height: 250,
		nodes: {
			"SW-1": {
				x: 180,
				y: 120,
				details: ["VLAN 77 · User_VLAN", "VLAN 177 · Voice_VLAN", "E0/1–E0/3 · data + voice"],
			},
			"SW-2": {
				x: 540,
				y: 120,
				details: ["VLAN 77 · User_VLAN", "VLAN 177 · Voice_VLAN", "E0/1–E0/3 · data + voice"],
			},
		},
	},
	tasks: [
		{
			id: "create-vlans",
			text: "Create VLAN 77 (User_VLAN) and VLAN 177 (Voice_VLAN) on both switches.",
			hint: "On both switches: vlan 77 → name User_VLAN → vlan 177 → name Voice_VLAN.",
			check: (state) => LAB2_DEVICES.every((name) => (
				state.devices[name].vlans["77"] === "User_VLAN" &&
				state.devices[name].vlans["177"] === "Voice_VLAN"
			)),
		},
		{
			id: "configure-access-ports",
			text: "On both switches, configure E0/1–E0/3 as access ports in data VLAN 77 and voice VLAN 177.",
			hint: "Use interface range e0/1 - 3, then switchport mode access, switchport access vlan 77, and switchport voice vlan 177.",
			check: (state) => LAB2_DEVICES.every((name) => LAB2_PORTS.every((ifName) => {
				const port = state.devices[name].interfaces[ifName];
				return port.switchportMode === "access" && port.accessVlan === 77 && port.voiceVlan === 177;
			})),
		},
		{
			id: "enable-lldp",
			text: "Enable LLDP globally on both switches and enable transmit and receive on E0/0.",
			hint: "Use lldp run, then interface e0/0, lldp transmit, and lldp receive on both switches.",
			check: (state) => LAB2_DEVICES.every((name) => {
				const port = state.devices[name].interfaces["e0/0"];
				return state.devices[name].lldpEnabled && port.lldpTransmit && port.lldpReceive;
			}),
		},
		{
			id: "save-switches",
			text: "Save the configuration on both switches.",
			hint: "On both switches run copy running-config startup-config.",
			check: (state) => LAB2_DEVICES.every((name) => isSaved(state, name)),
		},
	],
	worksheetInstructions: "All physical cabling is in place. Configure both switches for the data and voice VLANs shown in the topology.",
	worksheet: [
		{
			title: "Task 1. Create VLAN 77 (User_VLAN) and VLAN 177 (Voice_VLAN)",
			instructions: "On both switches:",
			slots: [
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config-vlan)#", context: "config-vlan", vlan: "77" },
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config-vlan)#", context: "config-vlan", vlan: "177" },
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config-vlan)#", context: "config-vlan", vlan: "177" },
			],
		},
		{
			title: "Task 2. Configure E0/1–E0/3 for data VLAN 77 and voice VLAN 177",
			instructions: "On both switches:",
			slots: [
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config-if-range)#", context: "config-if-range" },
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config-if-range)#", context: "config-if-range" },
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config-if-range)#", context: "config-if-range" },
			],
		},
		{
			title: "Task 3. Enable LLDP on the E0/0 inter-switch link",
			instructions: "On both switches:",
			slots: [
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config-if)#", context: "config-if", iface: "e0/0" },
				{ devices: LAB2_DEVICES, prompt: "SW-1, SW-2(config-if)#", context: "config-if", iface: "e0/0" },
			],
		},
		{
			title: "Save the configuration on both switches",
			slots: [{ devices: LAB2_DEVICES, prompt: "SW-1#, SW-2#", context: "priv" }],
		},
	],
	solution: {
		"SW-1": [
			"enable", "configure terminal", "vlan 77", "name User_VLAN", "vlan 177", "name Voice_VLAN", "exit",
			"interface range e0/1 - 3", "switchport mode access", "switchport access vlan 77", "switchport voice vlan 177",
			"exit", "lldp run", "interface e0/0", "lldp transmit", "lldp receive", "end", "copy running-config startup-config",
		],
		"SW-2": [
			"enable", "configure terminal", "vlan 77", "name User_VLAN", "vlan 177", "name Voice_VLAN", "exit",
			"interface range e0/1 - 3", "switchport mode access", "switchport access vlan 77", "switchport voice vlan 177",
			"exit", "lldp run", "interface e0/0", "lldp transmit", "lldp receive", "end", "copy running-config startup-config",
		],
	},
	finalCheck: {
		label: "VLANs, voice access ports, and LLDP are configured on both switches",
		check: (state) => ["create-vlans", "configure-access-ports", "enable-lldp"]
			.every((id) => LAB2.tasks.find((task) => task.id === id).check(state)),
	},
	ptDevices: "two Catalyst switches (SW-1, SW-2)",
	hasPacketTracerFile: false,
};

const LAB3_SWITCHES = ["SW-1", "SW-2", "SW-3", "SW-4"];
const trunkedSwitch = (hostname, interfaces) => {
	const device = switchDevice(hostname, interfaces);
	for (const intf of Object.values(device.interfaces)) intf.switchportMode = "trunk";
	return device;
};
const lagInterfaces = ["e0/0", "e0/1"];
const lagConfigured = (device, mode) => lagInterfaces.every((ifName) => {
	const port = device.interfaces[ifName];
	return port.portChannel === 34 && port.lacpMode === mode;
});

const LAB3 = {
	id: 3,
	level: "Advanced",
	title: "Allowed VLANs, Native VLAN, and LACP",
	summary: "Restrict trunk VLANs, set the native VLAN, and form an LACP EtherChannel between SW-3 and SW-4.",
	worksheetInstructions: "Router R1 is configured for VLANs 5 and 6. Trunk ports are preconfigured; inspect the initial configuration before making the requested changes.",
	editable: LAB3_SWITCHES,
	devices: {
		"SW-1": trunkedSwitch("SW-1", ["e0/0", "e0/1", "e0/2"]),
		"SW-2": trunkedSwitch("SW-2", ["e0/1", "e0/2"]),
		"SW-3": trunkedSwitch("SW-3", ["e0/0", "e0/1", "e0/2"]),
		"SW-4": trunkedSwitch("SW-4", ["e0/0", "e0/1", "e0/2"]),
		R1: {
			kind: "router",
			hostname: "R1",
			interfaces: { "g0/0": { up: true } },
		},
	},
	links: [
		{ a: "R1:g0/0", b: "SW-1:e0/0", net: "VLANs 5, 6" },
		{ a: "SW-1:e0/1", b: "SW-2:e0/1", net: "Native VLAN 77", lane: -5 },
		{ a: "SW-1:e0/2", b: "SW-3:e0/2", net: "Trunk" },
		{ a: "SW-2:e0/2", b: "SW-4:e0/2", net: "Trunk" },
		{ a: "SW-3:e0/0", b: "SW-4:e0/0", net: "Po34 · LACP", lane: -5 },
		{ a: "SW-3:e0/1", b: "SW-4:e0/1", net: "Po34 · LACP", lane: 5 },
	],
	layout: {
		width: 740,
		height: 390,
		nodes: {
			R1: { x: 370, y: 35, sub: "Preconfigured · VLANs 5 and 6" },
			"SW-1": { x: 240, y: 150, sub: "Allowed VLANs · E0/0" },
			"SW-2": { x: 500, y: 150, sub: "Native VLAN · E0/1" },
			"SW-3": { x: 240, y: 315, sub: "LACP active · Po34" },
			"SW-4": { x: 500, y: 315, sub: "LACP passive · Po34" },
		},
	},
	tasks: [
		{
			id: "sw1-allowed",
			text: "On SW-1 E0/0, allow only VLANs 5 and 6 on the trunk.",
			hint: "interface e0/0 → switchport trunk allowed vlan 5,6",
			check: (state) => {
				const allowed = state.devices["SW-1"].interfaces["e0/0"].trunkAllowedVlans;
				return allowed?.length === 2 && allowed.includes(5) && allowed.includes(6);
			},
		},
		{
			id: "native-vlan",
			text: "Set SW-1 and SW-2 E0/1 to use VLAN 77 as the native VLAN.",
			hint: "On both switches: interface e0/1 → switchport trunk native vlan 77",
			check: (state) => ["SW-1", "SW-2"].every((name) => state.devices[name].interfaces["e0/1"].trunkNativeVlan === 77),
		},
		{
			id: "sw2-allowed",
			text: "On SW-2 E0/2, allow only VLAN 6 on the trunk.",
			hint: "interface e0/2 → switchport trunk allowed vlan 6",
			check: (state) => {
				const allowed = state.devices["SW-2"].interfaces["e0/2"].trunkAllowedVlans;
				return allowed?.length === 1 && allowed[0] === 6;
			},
		},
		{
			id: "lacp",
			text: "Bundle SW-3 and SW-4 E0/0–E0/1 into channel group 34 using LACP active on SW-3 and passive on SW-4.",
			hint: "Use interface range e0/0 - 1; configure channel-group 34 mode active on SW-3 and passive on SW-4.",
			check: (state) => lagConfigured(state.devices["SW-3"], "active") && lagConfigured(state.devices["SW-4"], "passive"),
		},
		{
			id: "save",
			text: "Save the configuration on SW-1, SW-2, SW-3, and SW-4.",
			hint: "On each switch run copy running-config startup-config.",
			check: (state) => LAB3_SWITCHES.every((name) => isSaved(state, name)),
		},
	],
	worksheet: [
		{
			title: "Task 1. Permit only VLANs 5 and 6 on SW-1 E0/0",
			slots: [
				{ devices: ["SW-1"], prompt: "SW-1(config)#", context: "config" },
				{ devices: ["SW-1"], prompt: "SW-1(config-if)#", context: "config-if", iface: "e0/0" },
			],
		},
		{
			title: "Task 2. Set VLAN 77 as the native VLAN on both E0/1 trunk ports",
			instructions: "On SW-1 and SW-2:",
			slots: [
				{ devices: ["SW-1", "SW-2"], prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: ["SW-1", "SW-2"], prompt: "SW-1, SW-2(config-if)#", context: "config-if", iface: "e0/1" },
			],
		},
		{
			title: "Task 3. Permit only VLAN 6 on SW-2 E0/2",
			slots: [
				{ devices: ["SW-2"], prompt: "SW-2(config)#", context: "config" },
				{ devices: ["SW-2"], prompt: "SW-2(config-if)#", context: "config-if", iface: "e0/2" },
			],
		},
		{
			title: "Task 4. Configure LACP channel group 34 between SW-3 and SW-4",
			slots: [
				{ devices: ["SW-3"], prompt: "SW-3(config)#", context: "config" },
				{ devices: ["SW-3"], prompt: "SW-3(config-if-range)#", context: "config-if-range" },
				{ devices: ["SW-4"], prompt: "SW-4(config)#", context: "config" },
				{ devices: ["SW-4"], prompt: "SW-4(config-if-range)#", context: "config-if-range" },
			],
		},
		{
			title: "Save the configuration on all four switches",
			slots: [{ devices: LAB3_SWITCHES, prompt: "SW-1#, SW-2#, SW-3#, SW-4#", context: "priv" }],
		},
	],
	solution: {
		"SW-1": [
			"enable", "configure terminal", "interface e0/0", "switchport trunk allowed vlan 5,6",
			"interface e0/1", "switchport trunk native vlan 77", "end", "copy running-config startup-config",
		],
		"SW-2": [
			"enable", "configure terminal", "interface e0/1", "switchport trunk native vlan 77",
			"interface e0/2", "switchport trunk allowed vlan 6", "end", "copy running-config startup-config",
		],
		"SW-3": [
			"enable", "configure terminal", "interface range e0/0 - 1",
			"channel-group 34 mode active", "end", "copy running-config startup-config",
		],
		"SW-4": [
			"enable", "configure terminal", "interface range e0/0 - 1",
			"channel-group 34 mode passive", "end", "copy running-config startup-config",
		],
	},
	finalCheck: {
		label: "Allowed VLANs, native VLAN, and LACP settings are configured",
		check: (state) => LAB3.tasks.slice(0, 4).every((task) => task.check(state)),
	},
	ptDevices: "five switches/routers: R1 and SW-1 through SW-4",
	hasPacketTracerFile: false,
};

export const PRACTICE_LABS = [LAB1, LAB2, LAB3, LAB4];
