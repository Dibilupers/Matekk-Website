import { canReach, canReachIpv6, getOspfDr, isSaved } from "./labEngine";

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
			"SW-2": { x: 610, y: 110, sub: "Data VLAN 30" },
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
		{ a: "SW-1:e0/1", b: "SW-2:e0/1", lane: -5 },
		{ a: "SW-1:e0/2", b: "SW-3:e0/2" },
		{ a: "SW-2:e0/2", b: "SW-4:e0/2" },
		{ a: "SW-3:e0/0", b: "SW-4:e0/0", net: "Po34 · LACP", lane: -14 },
		{ a: "SW-3:e0/1", b: "SW-4:e0/1", lane: 14 },
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

const LAB4_DEVICES = ["R1", "R2", "R3"];
const LAB4_ROUTE = (device, net, mask, via, ad = 1) => (
	device.routes.some((route) => route.net === net && route.mask === mask && route.via === via && route.ad === ad)
);
const LAB4 = {
	id: 4,
	level: "Advanced",
	title: "Static Routing and Failover",
	summary: "Configure a primary host route, a floating backup route, and default routes across the redundant router topology.",
	editable: LAB4_DEVICES,
	devices: {
		R1: {
			kind: "router",
			hostname: "R1",
			interfaces: {
				"e0/0": { ip: "10.0.12.1", mask: "255.255.255.252", up: true },
				"e0/1": { ip: "10.0.13.1", mask: "255.255.255.224", up: true },
			},
		},
		R2: {
			kind: "router",
			hostname: "R2",
			interfaces: {
				"e0/0": { ip: "10.0.12.2", mask: "255.255.255.252", up: true },
				"e0/1": { ip: "10.0.24.2", mask: "255.255.255.248", up: true },
			},
		},
		R3: {
			kind: "router",
			hostname: "R3",
			interfaces: {
				"e0/0": { ip: "10.0.13.3", mask: "255.255.255.224", up: true },
				"e0/1": { ip: "10.0.34.3", mask: "255.255.255.240", up: true },
				"e0/2": { ip: "209.165.201.3", mask: "255.255.255.224", up: true },
			},
		},
		R4: {
			kind: "router",
			hostname: "R4",
			interfaces: {
				"e0/0": { ip: "10.0.24.4", mask: "255.255.255.248", up: true },
				"e0/1": { ip: "10.0.34.4", mask: "255.255.255.240", up: true },
				"e0/2": { ip: "10.0.41.1", mask: "255.255.255.0", up: true },
			},
			routes: [
				{ net: "10.0.12.0", mask: "255.255.255.252", via: "10.0.24.2", ad: 1 },
				{ net: "10.0.13.0", mask: "255.255.255.224", via: "10.0.34.3", ad: 1 },
			],
		},
		PC1: pc("10.0.41.10", "255.255.255.0", "10.0.41.1"),
		ISP: {
			kind: "router",
			hostname: "ISP",
			interfaces: {
				"e0/0": { ip: "209.165.201.1", mask: "255.255.255.224", up: true },
			},
		},
	},
	links: [
		{ a: "R1:e0/0", b: "R2:e0/0", net: "10.0.12.0/30" },
		{ a: "R1:e0/1", b: "R3:e0/0", net: "10.0.13.0/27" },
		{ a: "R2:e0/1", b: "R4:e0/0", net: "10.0.24.0/29" },
		{ a: "R3:e0/1", b: "R4:e0/1", net: "10.0.34.0/28" },
		{ a: "R4:e0/2", b: "PC1:fa0", net: "10.0.41.0/24" },
		{ a: "R3:e0/2", b: "ISP:e0/0", net: "209.165.201.0/27" },
	],
	layout: {
		width: 900,
		height: 490,
		nodes: {
			R1: { x: 130, y: 170, details: ["Primary via R2", "Backup via R3"] },
			R2: { x: 385, y: 90 },
			R3: { x: 385, y: 300 },
			R4: { x: 640, y: 190, details: ["10.0.41.0/24 LAN"] },
			PC1: { x: 780, y: 190, sub: "10.0.41.10" },
			ISP: { x: 600, y: 440, sub: "209.165.201.1" },
		},
	},
	tasks: [
		{
			id: "primary-host-route",
			text: "Configure R1's primary /32 route to PC1 through R2 and configure R2's route to PC1 through R4.",
			hint: "Use ip route 10.0.41.10 255.255.255.255 with the next hop on each router's outgoing link.",
			check: (state, lab) => LAB4_ROUTE(state.devices.R1, "10.0.41.10", "255.255.255.255", "10.0.12.2") &&
				LAB4_ROUTE(state.devices.R2, "10.0.41.10", "255.255.255.255", "10.0.24.4") &&
				canReach(lab, state, "R1", "10.0.41.10"),
		},
		{
			id: "floating-backup-route",
			text: "Add a floating /32 route on R1 through R3 with administrative distance 254, and configure R3's /32 route through R4.",
			hint: "The R1 backup route ends with 254. Use R3's directly connected R4 next hop for its route.",
			check: (state, lab) => {
				const r1 = state.devices.R1;
				if (!LAB4_ROUTE(r1, "10.0.41.10", "255.255.255.255", "10.0.13.3", 254) ||
					!LAB4_ROUTE(state.devices.R3, "10.0.41.10", "255.255.255.255", "10.0.34.4")) return false;
				const failoverState = structuredClone(state);
				failoverState.devices.R1.interfaces["e0/0"].up = false;
				return canReach(lab, failoverState, "R1", "10.0.41.10");
			},
		},
		{
			id: "default-routes",
			text: "Configure R1's default route through R3 and R3's default route through the ISP.",
			hint: "Use ip route 0.0.0.0 0.0.0.0 followed by the appropriate next-hop address.",
			check: (state) => LAB4_ROUTE(state.devices.R1, "0.0.0.0", "0.0.0.0", "10.0.13.3") &&
				LAB4_ROUTE(state.devices.R3, "0.0.0.0", "0.0.0.0", "209.165.201.1"),
		},
		{
			id: "save-routers",
			text: "Save the configuration on R1, R2, and R3.",
			hint: "On all three routers run copy running-config startup-config.",
			check: (state) => LAB4_DEVICES.every((name) => isSaved(state, name)),
		},
	],
	worksheet: [
		{
			title: "Task 1. Configure the primary host route on R1 and the destination route on R2",
			slots: [
				{ devices: ["R1"], prompt: "R1(config)#", context: "config" },
				{ devices: ["R2"], prompt: "R2(config)#", context: "config" },
			],
		},
		{
			title: "Task 2. Configure the floating backup on R1 and the destination route on R3",
			slots: [
				{ devices: ["R1"], prompt: "R1(config)#", context: "config" },
				{ devices: ["R3"], prompt: "R3(config)#", context: "config" },
			],
		},
		{
			title: "Task 3. Configure default routes on R1 and R3",
			slots: [
				{ devices: ["R1"], prompt: "R1(config)#", context: "config" },
				{ devices: ["R3"], prompt: "R3(config)#", context: "config" },
			],
		},
		{
			title: "Save the configuration on all three routers",
			slots: [{ devices: LAB4_DEVICES, prompt: "R1#, R2#, R3#", context: "priv" }],
		},
	],
	solution: {
		R1: [
			"enable", "configure terminal",
			"ip route 10.0.41.10 255.255.255.255 10.0.12.2",
			"ip route 10.0.41.10 255.255.255.255 10.0.13.3 254",
			"ip route 0.0.0.0 0.0.0.0 10.0.13.3",
			"end", "copy running-config startup-config",
		],
		R2: [
			"enable", "configure terminal", "ip route 10.0.41.10 255.255.255.255 10.0.24.4",
			"end", "copy running-config startup-config",
		],
		R3: [
			"enable", "configure terminal",
			"ip route 10.0.41.10 255.255.255.255 10.0.34.4",
			"ip route 0.0.0.0 0.0.0.0 209.165.201.1",
			"end", "copy running-config startup-config",
		],
	},
	finalCheck: {
		label: "Primary and backup paths, default routes, and saved configurations are complete",
		check: (state, lab) => LAB4.tasks.every((task) => task.check(state, lab)),
	},
	ptDevices: "four routers (R1–R4), one ISP router, and one PC",
	hasPacketTracerFile: false,
};

const LAB5_DEVICES = ["R1", "R2"];
const LAB5 = {
	id: 5,
	level: "Intermediate",
	title: "IPv4 and IPv6 Router Connectivity",
	summary: "Configure an IPv4 and IPv6 point-to-point link, verify connectivity with both protocols, and save the router configurations.",
	editable: LAB5_DEVICES,
	devices: {
		R1: {
			kind: "router",
			hostname: "R1",
			interfaces: { "e0/1": { ip: "", mask: "", ipv6: "", up: false } },
		},
		R2: {
			kind: "router",
			hostname: "R2",
			interfaces: { "e0/1": { ip: "", mask: "", ipv6: "", up: false } },
		},
	},
	links: [{ a: "R1:e0/1", b: "R2:e0/1", net: "192.168.180.16/28 · 2001:db8:acca::/64" }],
	layout: {
		width: 700,
		height: 250,
		nodes: {
			R1: { x: 170, y: 125, details: ["192.168.180.17/28", "2001:db8:acca::1/64"] },
			R2: { x: 530, y: 125, details: ["192.168.180.30/28", "2001:db8:acca::2/64"] },
		},
	},
	tasks: [
		{
			id: "configure-dual-stack",
			text: "Configure R1 E0/1 as 192.168.180.17/28 and 2001:db8:acca::1/64; configure R2 E0/1 as 192.168.180.30/28 and 2001:db8:acca::2/64. Bring both interfaces up.",
			hint: "Use ip address, ipv6 address, and no shutdown under interface e0/1 on both routers.",
			check: (state) => (
				state.devices.R1.interfaces["e0/1"].ip === "192.168.180.17" &&
				state.devices.R1.interfaces["e0/1"].mask === "255.255.255.240" &&
				state.devices.R1.interfaces["e0/1"].ipv6 === "2001:db8:acca::1/64" &&
				state.devices.R1.interfaces["e0/1"].up &&
				state.devices.R2.interfaces["e0/1"].ip === "192.168.180.30" &&
				state.devices.R2.interfaces["e0/1"].mask === "255.255.255.240" &&
				state.devices.R2.interfaces["e0/1"].ipv6 === "2001:db8:acca::2/64" &&
				state.devices.R2.interfaces["e0/1"].up
			),
		},
		{
			id: "verify-connectivity",
			text: "Verify that R1 can reach R2 over IPv4 and IPv6 using ping.",
			hint: "Run ping 192.168.180.30 and ping ipv6 2001:db8:acca::2 from R1.",
			check: (state, lab) => canReach(lab, state, "R1", "192.168.180.30") &&
				canReachIpv6(lab, state, "R1", "2001:db8:acca::2"),
		},
		{
			id: "save-routers",
			text: "Save the configuration on R1 and R2.",
			hint: "On both routers run copy running-config startup-config.",
			check: (state) => LAB5_DEVICES.every((name) => isSaved(state, name)),
		},
	],
	worksheet: [
		{
			title: "Task 1. Configure IPv4, IPv6, and the link state on both routers",
			slots: [
				{ devices: ["R1"], prompt: "R1(config)#", context: "config" },
				{ devices: ["R1"], prompt: "R1(config-if)#", context: "config-if", iface: "e0/1" },
				{ devices: ["R1"], prompt: "R1(config-if)#", context: "config-if", iface: "e0/1" },
				{ devices: ["R1"], prompt: "R1(config-if)#", context: "config-if", iface: "e0/1" },
				{ devices: ["R2"], prompt: "R2(config)#", context: "config" },
				{ devices: ["R2"], prompt: "R2(config-if)#", context: "config-if", iface: "e0/1" },
				{ devices: ["R2"], prompt: "R2(config-if)#", context: "config-if", iface: "e0/1" },
				{ devices: ["R2"], prompt: "R2(config-if)#", context: "config-if", iface: "e0/1" },
			],
		},
		{
			title: "Task 2. Verify IPv4 and IPv6 connectivity from R1",
			slots: [
				{ devices: ["R1"], prompt: "R1#", context: "priv" },
				{ devices: ["R1"], prompt: "R1#", context: "priv" },
			],
		},
		{
			title: "Save the configuration on both routers",
			slots: [{ devices: LAB5_DEVICES, prompt: "R1#, R2#", context: "priv" }],
		},
	],
	solution: {
		R1: [
			"enable", "configure terminal", "interface e0/1", "ip address 192.168.180.17 255.255.255.240",
			"ipv6 address 2001:db8:acca::1/64", "no shutdown", "end",
			"ping 192.168.180.30", "ping ipv6 2001:db8:acca::2", "copy running-config startup-config",
		],
		R2: [
			"enable", "configure terminal", "interface e0/1", "ip address 192.168.180.30 255.255.255.240",
			"ipv6 address 2001:db8:acca::2/64", "no shutdown", "end", "copy running-config startup-config",
		],
	},
	finalCheck: {
		label: "IPv4 and IPv6 addressing, connectivity, and saved configurations are complete",
		check: (state, lab) => LAB5.tasks.every((task) => task.check(state, lab)),
	},
	ptDevices: "two routers (R1 and R2)",
	hasPacketTracerFile: false,
};

const LAB6_DEVICES = ["R1", "R2"];
const LAB6_ADDRESSES = {
	R1: { ipv4: "10.26.0.1", ipv6: "2001:db8:26::1/125" },
	R2: { ipv4: "10.26.0.2", ipv6: "2001:db8:26::2/125" },
};
const LAB6 = {
	id: 6,
	level: "Beginner",
	title: "IPv4 /26 and IPv6 /125 Point-to-Point",
	summary: "Address a router-to-router Ethernet link with IPv4 /26 and IPv6 /125, bring it up, and verify both paths.",
	editable: LAB6_DEVICES,
	devices: Object.fromEntries(LAB6_DEVICES.map((name) => [name, {
		kind: "router",
		hostname: name,
		interfaces: { "e0/0": { up: false } },
	}])),
	links: [{ a: "R1:e0/0", b: "R2:e0/0", net: "10.26.0.0/26 · 2001:db8:26::/125" }],
	layout: {
		width: 700,
		height: 250,
		nodes: {
			R1: { x: 170, y: 125, details: ["10.26.0.1/26", "2001:db8:26::1/125"] },
			R2: { x: 530, y: 125, details: ["10.26.0.2/26", "2001:db8:26::2/125"] },
		},
	},
	tasks: [
		{
			id: "configure-dual-stack",
			text: "Configure R1 E0/0 as 10.26.0.1/26 and 2001:db8:26::1/125; configure R2 E0/0 as 10.26.0.2/26 and 2001:db8:26::2/125. Bring both interfaces up.",
			hint: "On each router: interface e0/0, ip address ..., ipv6 address .../125, and no shutdown.",
			check: (state) => LAB6_DEVICES.every((name) => {
				const intf = state.devices[name].interfaces["e0/0"];
				return intf.ip === LAB6_ADDRESSES[name].ipv4 &&
					intf.mask === "255.255.255.192" &&
					intf.ipv6 === LAB6_ADDRESSES[name].ipv6 &&
					intf.up;
			}),
		},
		{
			id: "verify-connectivity",
			text: "Verify R1 can reach R2 over IPv4 and IPv6.",
			hint: "From R1, ping 10.26.0.2 and ping ipv6 2001:db8:26::2.",
			check: (state, lab) => canReach(lab, state, "R1", LAB6_ADDRESSES.R2.ipv4) &&
				canReachIpv6(lab, state, "R1", LAB6_ADDRESSES.R2.ipv6),
		},
		{
			id: "save-routers",
			text: "Save both router configurations.",
			hint: "Run copy running-config startup-config on R1 and R2.",
			check: (state) => LAB6_DEVICES.every((name) => isSaved(state, name)),
		},
	],
	worksheet: [
		{
			title: "Task 1. Configure the IPv4 /26 and IPv6 /125 link",
			slots: [
				{ devices: ["R1"], prompt: "R1(config)#", context: "config" },
				{ devices: ["R1"], prompt: "R1(config-if)#", context: "config-if", iface: "e0/0" },
				{ devices: ["R1"], prompt: "R1(config-if)#", context: "config-if", iface: "e0/0" },
				{ devices: ["R1"], prompt: "R1(config-if)#", context: "config-if", iface: "e0/0" },
				{ devices: ["R2"], prompt: "R2(config)#", context: "config" },
				{ devices: ["R2"], prompt: "R2(config-if)#", context: "config-if", iface: "e0/0" },
				{ devices: ["R2"], prompt: "R2(config-if)#", context: "config-if", iface: "e0/0" },
				{ devices: ["R2"], prompt: "R2(config-if)#", context: "config-if", iface: "e0/0" },
			],
		},
		{
			title: "Task 2. Verify both IP versions from R1",
			slots: [
				{ devices: ["R1"], prompt: "R1#", context: "priv" },
				{ devices: ["R1"], prompt: "R1#", context: "priv" },
			],
		},
		{
			title: "Save both router configurations",
			slots: [{ devices: LAB6_DEVICES, prompt: "R1#, R2#", context: "priv" }],
		},
	],
	solution: {
		R1: [
			"enable", "configure terminal", "interface e0/0", "ip address 10.26.0.1 255.255.255.192",
			"ipv6 address 2001:db8:26::1/125", "no shutdown", "end",
			"ping 10.26.0.2", "ping ipv6 2001:db8:26::2", "copy running-config startup-config",
		],
		R2: [
			"enable", "configure terminal", "interface e0/0", "ip address 10.26.0.2 255.255.255.192",
			"ipv6 address 2001:db8:26::2/125", "no shutdown", "end", "copy running-config startup-config",
		],
	},
	finalCheck: {
		label: "The /26 and /125 interfaces are up, reachable, and saved",
		check: (state, lab) => LAB6.tasks.every((task) => task.check(state, lab)),
	},
	ptDevices: "two routers (R1 and R2)",
	hasPacketTracerFile: false,
};

const LAB7_SWITCHES = ["SW-1", "SW-2"];
const LAB7 = {
	id: 7,
	level: "Beginner",
	title: "VLANs and Access Port Membership",
	summary: "Create matching staff and guest VLANs, assign end-device ports, and carry both VLANs across a trunk.",
	editable: LAB7_SWITCHES,
	devices: {
		"SW-1": switchDevice("SW-1", ["e0/0", "e0/1"]),
		"SW-2": switchDevice("SW-2", ["e0/0", "e0/1"]),
		PC1: pc("192.168.20.10", "255.255.255.0", "192.168.20.1"),
		PC2: pc("192.168.30.10", "255.255.255.0", "192.168.30.1"),
	},
	links: [
		{ a: "SW-1:e0/0", b: "SW-2:e0/0", net: "802.1Q · VLANs 20, 30" },
		{ a: "SW-1:e0/1", b: "PC1:fa0" },
		{ a: "SW-2:e0/1", b: "PC2:fa0" },
	],
	layout: {
		width: 760,
		height: 370,
		nodes: {
			"SW-1": { x: 210, y: 115, sub: "VLAN 20 · Staff" },
			"SW-2": { x: 550, y: 115, sub: "VLAN 30 · Guest" },
			PC1: { x: 210, y: 310, sub: "192.168.20.10" },
			PC2: { x: 550, y: 310, sub: "192.168.30.10" },
		},
	},
	tasks: [
		{
			id: "create-vlans",
			text: "Create VLAN 20 named Staff and VLAN 30 named Guest on both switches.",
			hint: "On each switch: vlan 20 → name Staff → vlan 30 → name Guest.",
			check: (state) => LAB7_SWITCHES.every((name) => (
				state.devices[name].vlans["20"] === "Staff" && state.devices[name].vlans["30"] === "Guest"
			)),
		},
		{
			id: "configure-access-ports",
			text: "Configure SW-1 E0/1 as an access port in VLAN 20 and SW-2 E0/1 as an access port in VLAN 30.",
			hint: "On each switch, enter interface e0/1, switchport mode access, and the correct switchport access vlan.",
			check: (state) => (
				state.devices["SW-1"].interfaces["e0/1"].switchportMode === "access" &&
				state.devices["SW-1"].interfaces["e0/1"].accessVlan === 20 &&
				state.devices["SW-2"].interfaces["e0/1"].switchportMode === "access" &&
				state.devices["SW-2"].interfaces["e0/1"].accessVlan === 30
			),
		},
		{
			id: "configure-trunk",
			text: "Configure the SW-1–SW-2 E0/0 link as a trunk allowing VLANs 20 and 30.",
			hint: "On both switches: interface e0/0 → switchport mode trunk → switchport trunk allowed vlan 20,30.",
			check: (state) => LAB7_SWITCHES.every((name) => {
				const port = state.devices[name].interfaces["e0/0"];
				return port.switchportMode === "trunk" &&
					port.trunkAllowedVlans?.length === 2 &&
					port.trunkAllowedVlans.includes(20) &&
					port.trunkAllowedVlans.includes(30);
			}),
		},
		{
			id: "save-switches",
			text: "Save both switch configurations.",
			hint: "Run copy running-config startup-config on each switch.",
			check: (state) => LAB7_SWITCHES.every((name) => isSaved(state, name)),
		},
	],
	worksheet: [
		{
			title: "Task 1. Create Staff VLAN 20 and Guest VLAN 30",
			instructions: "On both switches:",
			slots: [
				{ devices: LAB7_SWITCHES, prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: LAB7_SWITCHES, prompt: "SW-1, SW-2(config-vlan)#", context: "config-vlan", vlan: "20" },
				{ devices: LAB7_SWITCHES, prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: LAB7_SWITCHES, prompt: "SW-1, SW-2(config-vlan)#", context: "config-vlan", vlan: "30" },
				{ devices: LAB7_SWITCHES, prompt: "SW-1, SW-2(config-vlan)#", context: "config-vlan", vlan: "30" },
			],
		},
		{
			title: "Task 2. Assign E0/1 access ports to their VLANs",
			slots: [
				{ devices: ["SW-1"], prompt: "SW-1(config)#", context: "config" },
				{ devices: ["SW-1"], prompt: "SW-1(config-if)#", context: "config-if", iface: "e0/1" },
				{ devices: ["SW-1"], prompt: "SW-1(config-if)#", context: "config-if", iface: "e0/1" },
				{ devices: ["SW-2"], prompt: "SW-2(config)#", context: "config" },
				{ devices: ["SW-2"], prompt: "SW-2(config-if)#", context: "config-if", iface: "e0/1" },
				{ devices: ["SW-2"], prompt: "SW-2(config-if)#", context: "config-if", iface: "e0/1" },
			],
		},
		{
			title: "Task 3. Configure the E0/0 trunk to carry VLANs 20 and 30",
			instructions: "On both switches:",
			slots: [
				{ devices: LAB7_SWITCHES, prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: LAB7_SWITCHES, prompt: "SW-1, SW-2(config-if)#", context: "config-if", iface: "e0/0" },
				{ devices: LAB7_SWITCHES, prompt: "SW-1, SW-2(config-if)#", context: "config-if", iface: "e0/0" },
			],
		},
		{
			title: "Save both switch configurations",
			slots: [{ devices: LAB7_SWITCHES, prompt: "SW-1#, SW-2#", context: "priv" }],
		},
	],
	solution: {
		"SW-1": [
			"enable", "configure terminal", "vlan 20", "name Staff", "exit", "vlan 30", "name Guest", "exit",
			"interface e0/1", "switchport mode access", "switchport access vlan 20",
			"interface e0/0", "switchport mode trunk", "switchport trunk allowed vlan 20,30",
			"end", "copy running-config startup-config",
		],
		"SW-2": [
			"enable", "configure terminal", "vlan 20", "name Staff", "exit", "vlan 30", "name Guest", "exit",
			"interface e0/1", "switchport mode access", "switchport access vlan 30",
			"interface e0/0", "switchport mode trunk", "switchport trunk allowed vlan 20,30",
			"end", "copy running-config startup-config",
		],
	},
	finalCheck: {
		label: "Both VLANs, access ports, and the trunk are configured and saved",
		check: (state) => LAB7.tasks.every((task) => task.check(state)),
	},
	ptDevices: "two Catalyst switches (SW-1 and SW-2), two PCs",
	hasPacketTracerFile: false,
};

const LAB8_SWITCHES = ["SW-1", "SW-2"];
const LAB8_PORTS = ["e0/0", "e0/1"];
const LAB8 = {
	id: 8,
	level: "Intermediate",
	title: "Access Ports and LACP Trunk EtherChannel",
	summary: "Place end devices in an access VLAN and bundle two trunk links with LACP active/passive negotiation.",
	editable: LAB8_SWITCHES,
	devices: {
		"SW-1": switchDevice("SW-1", ["e0/0", "e0/1", "e0/2"]),
		"SW-2": switchDevice("SW-2", ["e0/0", "e0/1", "e0/2"]),
		PC1: pc("192.168.40.10", "255.255.255.0", "192.168.40.1"),
		PC2: pc("192.168.40.20", "255.255.255.0", "192.168.40.1"),
	},
	links: [
		{ a: "SW-1:e0/0", b: "SW-2:e0/0", net: "Po10 · LACP", lane: -12 },
		{ a: "SW-1:e0/1", b: "SW-2:e0/1", lane: 12 },
		{ a: "SW-1:e0/2", b: "PC1:fa0" },
		{ a: "SW-2:e0/2", b: "PC2:fa0" },
	],
	layout: {
		width: 760,
		height: 390,
		nodes: {
			"SW-1": { x: 210, y: 125, sub: "LACP active · Po10" },
			"SW-2": { x: 550, y: 125, sub: "LACP passive · Po10" },
			PC1: { x: 210, y: 325, sub: "Access VLAN 40" },
			PC2: { x: 550, y: 325, sub: "Access VLAN 40" },
		},
	},
	tasks: [
		{
			id: "configure-access-ports",
			text: "Configure E0/2 on both switches as access ports in VLAN 40.",
			hint: "Use interface e0/2 → switchport mode access → switchport access vlan 40.",
			check: (state) => LAB8_SWITCHES.every((name) => {
				const port = state.devices[name].interfaces["e0/2"];
				return port.switchportMode === "access" && port.accessVlan === 40;
			}),
		},
		{
			id: "configure-trunk-ports",
			text: "Configure E0/0–E0/1 as trunk ports on both switches, allowing VLANs 40 and 50.",
			hint: "Use interface range e0/0 - 1 → switchport mode trunk → switchport trunk allowed vlan 40,50.",
			check: (state) => LAB8_SWITCHES.every((name) => LAB8_PORTS.every((ifName) => {
				const port = state.devices[name].interfaces[ifName];
				return port.switchportMode === "trunk" &&
					port.trunkAllowedVlans?.length === 2 &&
					port.trunkAllowedVlans.includes(40) &&
					port.trunkAllowedVlans.includes(50);
			})),
		},
		{
			id: "configure-lacp",
			text: "Bundle E0/0–E0/1 into channel group 10 with SW-1 active and SW-2 passive.",
			hint: "On each switch, use interface range e0/0 - 1, then channel-group 10 mode active or passive.",
			check: (state) => LAB8_SWITCHES.every((name, index) => LAB8_PORTS.every((ifName) => {
				const port = state.devices[name].interfaces[ifName];
				return port.portChannel === 10 && port.lacpMode === (index === 0 ? "active" : "passive");
			})),
		},
		{
			id: "save-switches",
			text: "Save both switch configurations.",
			hint: "Run copy running-config startup-config on each switch.",
			check: (state) => LAB8_SWITCHES.every((name) => isSaved(state, name)),
		},
	],
	worksheet: [
		{
			title: "Task 1. Configure E0/2 as access ports in VLAN 40",
			slots: [
				{ devices: LAB8_SWITCHES, prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: LAB8_SWITCHES, prompt: "SW-1, SW-2(config-if)#", context: "config-if", iface: "e0/2" },
				{ devices: LAB8_SWITCHES, prompt: "SW-1, SW-2(config-if)#", context: "config-if", iface: "e0/2" },
			],
		},
		{
			title: "Task 2. Configure the two member links as trunks",
			instructions: "On both switches:",
			slots: [
				{ devices: LAB8_SWITCHES, prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: LAB8_SWITCHES, prompt: "SW-1, SW-2(config-if-range)#", context: "config-if-range" },
				{ devices: LAB8_SWITCHES, prompt: "SW-1, SW-2(config-if-range)#", context: "config-if-range" },
			],
		},
		{
			title: "Task 3. Negotiate channel group 10 with LACP",
			slots: [
				{ devices: ["SW-1"], prompt: "SW-1(config)#", context: "config" },
				{ devices: ["SW-1"], prompt: "SW-1(config-if-range)#", context: "config-if-range" },
				{ devices: ["SW-2"], prompt: "SW-2(config)#", context: "config" },
				{ devices: ["SW-2"], prompt: "SW-2(config-if-range)#", context: "config-if-range" },
			],
		},
		{
			title: "Save both switch configurations",
			slots: [{ devices: LAB8_SWITCHES, prompt: "SW-1#, SW-2#", context: "priv" }],
		},
	],
	solution: {
		"SW-1": [
			"enable", "configure terminal", "interface e0/2", "switchport mode access", "switchport access vlan 40",
			"interface range e0/0 - 1", "switchport mode trunk", "switchport trunk allowed vlan 40,50",
			"channel-group 10 mode active", "end", "copy running-config startup-config",
		],
		"SW-2": [
			"enable", "configure terminal", "interface e0/2", "switchport mode access", "switchport access vlan 40",
			"interface range e0/0 - 1", "switchport mode trunk", "switchport trunk allowed vlan 40,50",
			"channel-group 10 mode passive", "end", "copy running-config startup-config",
		],
	},
	finalCheck: {
		label: "Access ports and both LACP EtherChannel trunk members are configured and saved",
		check: (state) => LAB8.tasks.every((task) => task.check(state)),
	},
	ptDevices: "two Catalyst switches (SW-1 and SW-2), two PCs",
	hasPacketTracerFile: false,
};

const LAB9_ROUTERS = ["R1", "R2"];
const LAB9 = {
	id: 9,
	level: "Intermediate",
	title: "Standard ACL: Permit a Trusted Host",
	summary: "Use a numbered standard ACL to allow one trusted host into a remote server network and block other LAN sources.",
	editable: LAB9_ROUTERS,
	devices: {
		R1: {
			kind: "router",
			hostname: "R1",
			interfaces: {
				"e0/0": { ip: "192.168.10.1", mask: "255.255.255.0", up: true },
				"e0/1": { ip: "10.0.12.1", mask: "255.255.255.252", up: true },
			},
		},
		R2: {
			kind: "router",
			hostname: "R2",
			interfaces: {
				"e0/0": { ip: "10.0.12.2", mask: "255.255.255.252", up: true },
				"e0/1": { ip: "192.168.50.1", mask: "255.255.255.0", up: true },
			},
		},
		"SW-1": switchDevice("SW-1", ["e0/0", "e0/1", "e0/2"]),
		"Trusted PC": pc("192.168.10.10", "255.255.255.0", "192.168.10.1"),
		"Guest PC": pc("192.168.10.20", "255.255.255.0", "192.168.10.1"),
		Server: pc("192.168.50.10", "255.255.255.0", "192.168.50.1"),
	},
	links: [
		{ a: "R1:e0/0", b: "SW-1:e0/0", net: "192.168.10.0/24 · apply ACL inbound here" },
		{ a: "SW-1:e0/1", b: "Trusted PC:fa0" },
		{ a: "SW-1:e0/2", b: "Guest PC:fa0" },
		{ a: "R1:e0/1", b: "R2:e0/0", net: "10.0.12.0/30" },
		{ a: "R2:e0/1", b: "Server:fa0", net: "192.168.50.0/24" },
	],
	layout: {
		width: 900,
		height: 390,
		nodes: {
			"Trusted PC": { x: 100, y: 120, sub: "192.168.10.10 · permitted" },
			"Guest PC": { x: 100, y: 290, sub: "192.168.10.20 · denied" },
			"SW-1": { x: 300, y: 205, sub: "LAN access switch" },
			R1: { x: 495, y: 205, details: ["ACL 10 inbound", "192.168.10.1/24"] },
			R2: { x: 680, y: 205, details: ["10.0.12.2/30", "192.168.50.1/24"] },
			Server: { x: 845, y: 205, sub: "192.168.50.10" },
		},
	},
	tasks: [
		{
			id: "configure-routes",
			text: "Configure routes on R1 and R2 so both LANs have a return path.",
			hint: "R1 needs a route to 192.168.50.0/24 via 10.0.12.2; R2 needs a route to 192.168.10.0/24 via 10.0.12.1.",
			check: (state) => LAB4_ROUTE(state.devices.R1, "192.168.50.0", "255.255.255.0", "10.0.12.2") &&
				LAB4_ROUTE(state.devices.R2, "192.168.10.0", "255.255.255.0", "10.0.12.1"),
		},
		{
			id: "configure-standard-acl",
			text: "Create standard ACL 10 to permit host 192.168.10.10, then apply it inbound on R1 E0/0.",
			hint: "Use access-list 10 permit host 192.168.10.10, then interface e0/0 → ip access-group 10 in.",
			check: (state) => state.devices.R1.accessLists["10"]?.some((entry) => (
				entry.action === "permit" && entry.source === "192.168.10.10" && entry.wildcard === "0.0.0.0"
			)) && state.devices.R1.interfaces["e0/0"].accessGroups.in === 10,
		},
		{
			id: "verify-filtering",
			text: "Verify the trusted PC can reach the server while the guest PC is denied.",
			hint: "The ACL is inbound on R1's LAN interface. It permits .10; the implicit deny blocks .20.",
			check: (state, lab) => canReach(lab, state, "Trusted PC", "192.168.50.10") &&
				!canReach(lab, state, "Guest PC", "192.168.50.10"),
		},
		{
			id: "save-routers",
			text: "Save R1 and R2.",
			hint: "Run copy running-config startup-config on both routers.",
			check: (state) => LAB9_ROUTERS.every((name) => isSaved(state, name)),
		},
	],
	worksheet: [
		{
			title: "Task 1. Add routes for the remote LANs",
			slots: [
				{ devices: ["R1"], prompt: "R1(config)#", context: "config" },
				{ devices: ["R2"], prompt: "R2(config)#", context: "config" },
			],
		},
		{
			title: "Task 2. Permit the trusted host and apply ACL 10 inbound",
			slots: [
				{ devices: ["R1"], prompt: "R1(config)#", context: "config" },
				{ devices: ["R1"], prompt: "R1(config)#", context: "config" },
				{ devices: ["R1"], prompt: "R1(config-if)#", context: "config-if", iface: "e0/0" },
			],
		},
		{
			title: "Task 3. Test the routed path from R1",
			slots: [{ devices: ["R1"], prompt: "R1#", context: "priv" }],
		},
		{
			title: "Save both router configurations",
			slots: [{ devices: LAB9_ROUTERS, prompt: "R1#, R2#", context: "priv" }],
		},
	],
	solution: {
		R1: [
			"enable", "configure terminal",
			"ip route 192.168.50.0 255.255.255.0 10.0.12.2",
			"access-list 10 permit host 192.168.10.10",
			"interface e0/0", "ip access-group 10 in", "end",
			"ping 192.168.50.10", "copy running-config startup-config",
		],
		R2: [
			"enable", "configure terminal",
			"ip route 192.168.10.0 255.255.255.0 10.0.12.1",
			"end", "copy running-config startup-config",
		],
	},
	finalCheck: {
		label: "The trusted host reaches the server, the guest is filtered, and both routers are saved",
		check: (state, lab) => LAB9.tasks.every((task) => task.check(state, lab)),
	},
	ptDevices: "two routers (R1 and R2), one switch, two PCs, one server",
	hasPacketTracerFile: false,
};

const LAB10_ROUTERS = ["R1", "R2"];
const LAB10 = {
	id: 10,
	level: "Intermediate",
	title: "Static and Default Route Forwarding",
	summary: "Connect two LANs with a specific static route and a default route, then verify end-to-end reachability.",
	editable: LAB10_ROUTERS,
	devices: {
		R1: {
			kind: "router",
			hostname: "R1",
			interfaces: {
				"e0/0": { ip: "172.16.10.1", mask: "255.255.255.0", up: true },
				"e0/1": { ip: "10.10.12.1", mask: "255.255.255.252", up: true },
			},
		},
		R2: {
			kind: "router",
			hostname: "R2",
			interfaces: {
				"e0/0": { ip: "10.10.12.2", mask: "255.255.255.252", up: true },
				"e0/1": { ip: "172.16.20.1", mask: "255.255.255.0", up: true },
			},
		},
		PC1: pc("172.16.10.10", "255.255.255.0", "172.16.10.1"),
		Server: pc("172.16.20.20", "255.255.255.0", "172.16.20.1"),
	},
	links: [
		{ a: "PC1:fa0", b: "R1:e0/0", net: "172.16.10.0/24" },
		{ a: "R1:e0/1", b: "R2:e0/0", net: "10.10.12.0/30" },
		{ a: "R2:e0/1", b: "Server:fa0", net: "172.16.20.0/24" },
	],
	layout: {
		width: 900,
		height: 260,
		nodes: {
			PC1: { x: 90, y: 130, sub: "172.16.10.10" },
			R1: { x: 330, y: 130, sub: "Static route → R2" },
			R2: { x: 570, y: 130, sub: "Default route → R1" },
			Server: { x: 810, y: 130, sub: "172.16.20.20" },
		},
	},
	tasks: [
		{
			id: "configure-static-route",
			text: "Configure R1 with a route to 172.16.20.0/24 through R2 at 10.10.12.2.",
			hint: "ip route 172.16.20.0 255.255.255.0 10.10.12.2",
			check: (state) => LAB4_ROUTE(state.devices.R1, "172.16.20.0", "255.255.255.0", "10.10.12.2"),
		},
		{
			id: "configure-default-route",
			text: "Configure R2's default route through R1 at 10.10.12.1.",
			hint: "ip route 0.0.0.0 0.0.0.0 10.10.12.1",
			check: (state) => LAB4_ROUTE(state.devices.R2, "0.0.0.0", "0.0.0.0", "10.10.12.1"),
		},
		{
			id: "verify-routing",
			text: "Verify PC1 can reach the server across both routers.",
			hint: "From R1, inspect show ip route and ping 172.16.20.20. The end-to-end check also verifies the return path.",
			check: (state, lab) => canReach(lab, state, "PC1", "172.16.20.20"),
		},
		{
			id: "save-routers",
			text: "Save R1 and R2.",
			hint: "Run copy running-config startup-config on both routers.",
			check: (state) => LAB10_ROUTERS.every((name) => isSaved(state, name)),
		},
	],
	worksheet: [
		{
			title: "Task 1. Add the specific static route on R1",
			slots: [{ devices: ["R1"], prompt: "R1(config)#", context: "config" }],
		},
		{
			title: "Task 2. Add the default route on R2",
			slots: [{ devices: ["R2"], prompt: "R2(config)#", context: "config" }],
		},
		{
			title: "Task 3. Verify the route table and end-to-end path",
			slots: [
				{ devices: ["R1"], prompt: "R1#", context: "priv" },
				{ devices: ["R1"], prompt: "R1#", context: "priv" },
			],
		},
		{
			title: "Save both router configurations",
			slots: [{ devices: LAB10_ROUTERS, prompt: "R1#, R2#", context: "priv" }],
		},
	],
	solution: {
		R1: [
			"enable", "configure terminal", "ip route 172.16.20.0 255.255.255.0 10.10.12.2",
			"end", "show ip route", "ping 172.16.20.20", "copy running-config startup-config",
		],
		R2: [
			"enable", "configure terminal", "ip route 0.0.0.0 0.0.0.0 10.10.12.1",
			"end", "copy running-config startup-config",
		],
	},
	finalCheck: {
		label: "Static and default routes carry traffic between both LANs",
		check: (state, lab) => LAB10.tasks.every((task) => task.check(state, lab)),
	},
	ptDevices: "two routers (R1 and R2), one PC, one server",
	hasPacketTracerFile: false,
};

const LAB11_ROUTERS = ["R1", "R2", "R3"];
const LAB11_ROUTER_IDS = { R1: "1.1.1.1", R2: "2.2.2.2", R3: "3.3.3.3" };
const LAB11_PRIORITIES = { R1: 100, R2: 150, R3: 150 };
const LAB11_NETWORK = "10.11.0.0/29";
const LAB11 = {
	id: 11,
	level: "Advanced",
	title: "OSPF DR Election on a Broadcast LAN",
	summary: "Enable OSPF on a shared Ethernet segment, set router IDs and interface priorities, and identify the initial DR.",
	editable: LAB11_ROUTERS,
	devices: {
		R1: {
			kind: "router",
			hostname: "R1",
			interfaces: { "e0/0": { ip: "10.11.0.1", mask: "255.255.255.248", up: true } },
		},
		R2: {
			kind: "router",
			hostname: "R2",
			interfaces: { "e0/0": { ip: "10.11.0.2", mask: "255.255.255.248", up: true } },
		},
		R3: {
			kind: "router",
			hostname: "R3",
			interfaces: { "e0/0": { ip: "10.11.0.3", mask: "255.255.255.248", up: true } },
		},
		"SW-1": switchDevice("SW-1", ["e0/0", "e0/1", "e0/2"]),
	},
	links: [
		{ a: "R1:e0/0", b: "SW-1:e0/0", net: "10.11.0.0/29 · shared Ethernet segment" },
		{ a: "R2:e0/0", b: "SW-1:e0/1" },
		{ a: "R3:e0/0", b: "SW-1:e0/2" },
	],
	layout: {
		width: 760,
		height: 360,
		nodes: {
			R1: { x: 140, y: 80, sub: "RID 1.1.1.1 · priority 100" },
			R2: { x: 620, y: 80, sub: "RID 2.2.2.2 · priority 150" },
			R3: { x: 380, y: 300, sub: "RID 3.3.3.3 · priority 150" },
			"SW-1": { x: 380, y: 180, sub: "Broadcast multiaccess LAN" },
		},
	},
	tasks: [
		{
			id: "configure-ospf",
			text: "On all routers, start OSPF process 10, set the shown router ID, and advertise 10.11.0.0/29 in area 0.",
			hint: "Use router ospf 10 → router-id <ID> → network 10.11.0.0 0.0.0.7 area 0.",
			check: (state) => LAB11_ROUTERS.every((name) => {
				const ospf = state.devices[name].ospf;
				return ospf?.processId === 10 &&
					ospf.routerId === LAB11_ROUTER_IDS[name] &&
					ospf.networks.some((entry) => (
						entry.net === "10.11.0.0" && entry.wildcard === "0.0.0.7" && entry.area === "0"
					));
			}),
		},
		{
			id: "set-dr-priorities",
			text: "Set R1 E0/0 priority to 100 and R2/R3 E0/0 priority to 150. R3 should win the priority tie with its higher router ID.",
			hint: "Under interface e0/0, use ip ospf priority 100 on R1 and ip ospf priority 150 on R2 and R3.",
			check: (state) => LAB11_ROUTERS.every((name) => (
				state.devices[name].interfaces["e0/0"].ospfPriority === LAB11_PRIORITIES[name]
			)),
		},
		{
			id: "verify-dr",
			text: "Identify the initial designated router for the shared segment.",
			hint: "Highest OSPF interface priority wins; when priorities tie, the highest router ID wins.",
			check: (state, lab) => getOspfDr(lab, state, LAB11_NETWORK) === "R3",
		},
		{
			id: "save-routers",
			text: "Save all three router configurations.",
			hint: "Run copy running-config startup-config on R1, R2, and R3.",
			check: (state) => LAB11_ROUTERS.every((name) => isSaved(state, name)),
		},
	],
	worksheet: [
		{
			title: "Task 1. Enable OSPF process 10 and set each router ID",
			slots: LAB11_ROUTERS.flatMap((name) => [
				{ devices: [name], prompt: `${name}(config)#`, context: "config" },
				{ devices: [name], prompt: `${name}(config-router)#`, context: "config-router" },
			]),
		},
		{
			title: "Task 2. Advertise the shared /29 segment in area 0",
			slots: LAB11_ROUTERS.map((name) => ({
				devices: [name],
				prompt: `${name}(config-router)#`,
				context: "config-router",
			})),
		},
		{
			title: "Task 3. Set interface priorities for the DR election",
			slots: LAB11_ROUTERS.flatMap((name) => [
				{ devices: [name], prompt: `${name}(config)#`, context: "config" },
				{ devices: [name], prompt: `${name}(config-if)#`, context: "config-if", iface: "e0/0" },
			]),
		},
		{
			title: "Save all three router configurations",
			slots: [{ devices: LAB11_ROUTERS, prompt: "R1#, R2#, R3#", context: "priv" }],
		},
	],
	solution: {
		R1: [
			"enable", "configure terminal", "router ospf 10", "router-id 1.1.1.1",
			"network 10.11.0.0 0.0.0.7 area 0", "exit",
			"interface e0/0", "ip ospf priority 100", "end", "copy running-config startup-config",
		],
		R2: [
			"enable", "configure terminal", "router ospf 10", "router-id 2.2.2.2",
			"network 10.11.0.0 0.0.0.7 area 0", "exit",
			"interface e0/0", "ip ospf priority 150", "end", "copy running-config startup-config",
		],
		R3: [
			"enable", "configure terminal", "router ospf 10", "router-id 3.3.3.3",
			"network 10.11.0.0 0.0.0.7 area 0", "exit",
			"interface e0/0", "ip ospf priority 150", "end", "copy running-config startup-config",
		],
	},
	finalCheck: {
		label: "OSPF is enabled and R3 wins the initial DR election",
		check: (state, lab) => LAB11.tasks.every((task) => task.check(state, lab)),
	},
	ptDevices: "three routers (R1, R2, R3) and one Catalyst switch",
	hasPacketTracerFile: false,
};

export const PRACTICE_LABS = [LAB1, LAB2, LAB3, LAB4, LAB5, LAB6, LAB7, LAB8, LAB9, LAB10, LAB11];
export const HIDDEN_PRACTICE_LABS = [];
