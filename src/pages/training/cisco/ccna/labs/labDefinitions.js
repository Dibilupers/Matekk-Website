import { canReach, forward, isSaved } from "./labEngine";

/* ==========================================================================
   CCNA Practice Labs (increasing difficulty).
   Each lab: devices (start state), links, which routers the student
   configures (editable), a diagram layout, and tasks checked live.
   ========================================================================== */

const hasRoute = (d, net, mask, via, adCheck = (ad) => ad === 1) =>
	d.routes.some((r) => r.net === net && r.mask === mask && r.via === via && adCheck(r.ad ?? 1));
const ifaceIs = (d, ifName, ip, mask) => d.interfaces[ifName].ip === ip && d.interfaces[ifName].mask === mask && d.interfaces[ifName].up;

const pc = (ip, mask, gateway) => ({ kind: "pc", hostname: "", gateway, interfaces: { fa0: { ip, mask } } });

// ---------------------------------------------------------------- Lab 1
const LAB1 = {
	id: 1,
	level: "Beginner",
	title: "Basic Router Setup & Static Default Route",
	summary: "Name a router, secure it, bring up two interfaces, and add a default route to the Internet.",
	editable: ["R1"],
	devices: {
		PC1: pc("192.168.1.10", "255.255.255.0", "192.168.1.1"),
		R1: { kind: "router", hostname: "Router", interfaces: { "g0/0": {}, "g0/1": {} } },
		ISP: {
			kind: "router",
			hostname: "ISP",
			interfaces: { "g0/0": { ip: "10.0.0.2", mask: "255.255.255.252", up: true }, lo0: { ip: "8.8.8.8", mask: "255.255.255.255", up: true } },
			routes: [{ net: "192.168.1.0", mask: "255.255.255.0", via: "10.0.0.1" }],
		},
	},
	links: [
		{ a: "PC1:fa0", b: "R1:g0/0", net: "192.168.1.0/24" },
		{ a: "R1:g0/1", b: "ISP:g0/0", net: "10.0.0.0/30" },
	],
	layout: {
		width: 560,
		height: 200,
		nodes: {
			PC1: { x: 60, y: 118, sub: "192.168.1.10 · gw .1" },
			R1: { x: 260, y: 120, sub: ".1 (LAN) · .1 (WAN)" },
			ISP: { x: 470, y: 120, sub: "10.0.0.2" },
		},
		cloud: { x: 470, y: 40, attach: "ISP", label: "Internet", sub: "8.8.8.8" },
	},
	tasks: [
		{ id: "hostname", device: "R1", text: 'Change the router name to "R1".', hint: 'enable → configure terminal → hostname R1', check: (s) => s.devices.R1.hostname === "R1" },
		{ id: "secret", device: "R1", text: 'Protect privileged mode with the encrypted password "class".', hint: 'In global configuration mode: enable secret class', check: (s) => s.devices.R1.secret === "class" },
		{ id: "g00", device: "R1", text: "Configure G0/0 (LAN) with 192.168.1.1 / 255.255.255.0 and turn it on.", hint: "interface g0/0 → ip address … → no shutdown", check: (s) => ifaceIs(s.devices.R1, "g0/0", "192.168.1.1", "255.255.255.0") },
		{ id: "g01", device: "R1", text: "Configure G0/1 (WAN to ISP) with 10.0.0.1 / 255.255.255.252 and turn it on.", hint: "Same steps as G0/0, on interface g0/1.", check: (s) => ifaceIs(s.devices.R1, "g0/1", "10.0.0.1", "255.255.255.252") },
		{ id: "route", device: "R1", text: "Add a static default route that sends all other traffic to the ISP at 10.0.0.2.", hint: "ip route 0.0.0.0 0.0.0.0 10.0.0.2", check: (s) => hasRoute(s.devices.R1, "0.0.0.0", "0.0.0.0", "10.0.0.2") },
		{ id: "save", device: "R1", text: "Save the running configuration so it survives a reboot.", hint: "end → copy running-config startup-config", check: (s) => isSaved(s, "R1") },
	],
	solution: {
		R1: ["enable", "configure terminal", "hostname R1", "enable secret class", "interface g0/0", "ip address 192.168.1.1 255.255.255.0", "no shutdown", "interface g0/1", "ip address 10.0.0.1 255.255.255.252", "no shutdown", "exit", "ip route 0.0.0.0 0.0.0.0 10.0.0.2", "end", "copy running-config startup-config"],
	},
	finalCheck: { from: "PC1", to: "8.8.8.8", label: "PC1 can reach the Internet (8.8.8.8)" },
	ptDevices: "two 2911 routers (R1, ISP) and one PC (PC1)",
};

// ---------------------------------------------------------------- Lab 2
const LAB2_SERVER_NET = ["172.16.50.0", "255.255.255.0"];
const r1Path = (lab, s) => forward(lab, s, "R1", "172.16.50.10").hops[0];
const LAB2 = {
	id: 2,
	level: "Intermediate",
	title: "Static Routing with a Backup Path",
	summary: "Send traffic to the server through R2, add a floating static route through R3, then break the link and watch traffic fail over.",
	editable: ["R1"],
	devices: {
		"PC-A": pc("192.168.10.10", "255.255.255.0", "192.168.10.1"),
		R1: {
			kind: "router",
			hostname: "R1",
			interfaces: {
				"g0/0": { ip: "192.168.10.1", mask: "255.255.255.0", up: true },
				"g0/1": { ip: "10.1.12.1", mask: "255.255.255.252", up: true },
				"g0/2": { ip: "10.1.13.1", mask: "255.255.255.252", up: true },
			},
		},
		R2: {
			kind: "router",
			hostname: "R2",
			interfaces: { "g0/0": { ip: "10.1.12.2", mask: "255.255.255.252", up: true }, "g0/1": { ip: "10.1.24.1", mask: "255.255.255.252", up: true } },
			routes: [{ net: "192.168.10.0", mask: "255.255.255.0", via: "10.1.12.1" }, { net: "172.16.50.0", mask: "255.255.255.0", via: "10.1.24.2" }],
		},
		R3: {
			kind: "router",
			hostname: "R3",
			interfaces: { "g0/0": { ip: "10.1.13.2", mask: "255.255.255.252", up: true }, "g0/1": { ip: "10.1.34.1", mask: "255.255.255.252", up: true } },
			routes: [
				{ net: "192.168.10.0", mask: "255.255.255.0", via: "10.1.13.1" },
				{ net: "10.1.12.0", mask: "255.255.255.252", via: "10.1.13.1" },
				{ net: "172.16.50.0", mask: "255.255.255.0", via: "10.1.34.2" },
			],
		},
		R4: {
			kind: "router",
			hostname: "R4",
			interfaces: {
				"g0/0": { ip: "10.1.24.2", mask: "255.255.255.252", up: true },
				"g0/1": { ip: "10.1.34.2", mask: "255.255.255.252", up: true },
				"g0/2": { ip: "172.16.50.1", mask: "255.255.255.0", up: true },
			},
			routes: [
				{ net: "192.168.10.0", mask: "255.255.255.0", via: "10.1.34.1" },
				{ net: "10.1.12.0", mask: "255.255.255.252", via: "10.1.34.1" },
				{ net: "10.1.13.0", mask: "255.255.255.252", via: "10.1.34.1" },
			],
		},
		SRV1: pc("172.16.50.10", "255.255.255.0", "172.16.50.1"),
	},
	links: [
		{ a: "PC-A:fa0", b: "R1:g0/0", net: "192.168.10.0/24" },
		{ a: "R1:g0/1", b: "R2:g0/0", net: "10.1.12.0/30" },
		{ a: "R1:g0/2", b: "R3:g0/0", net: "10.1.13.0/30" },
		{ a: "R2:g0/1", b: "R4:g0/0", net: "10.1.24.0/30" },
		{ a: "R3:g0/1", b: "R4:g0/1", net: "10.1.34.0/30" },
		{ a: "R4:g0/2", b: "SRV1:fa0", net: "172.16.50.0/24" },
	],
	layout: {
		width: 680,
		height: 290,
		nodes: {
			"PC-A": { x: 45, y: 130, sub: "192.168.10.10" },
			R1: { x: 175, y: 130 },
			R2: { x: 340, y: 50, sub: "primary path" },
			R3: { x: 340, y: 210, sub: "backup path" },
			R4: { x: 505, y: 130 },
			SRV1: { x: 630, y: 130, sub: "172.16.50.10" },
		},
	},
	tasks: [
		{ id: "primary", device: "R1", text: "Add a static route to the server LAN 172.16.50.0/24 through R2 (next hop 10.1.12.2).", hint: "ip route 172.16.50.0 255.255.255.0 10.1.12.2", check: (s) => hasRoute(s.devices.R1, ...LAB2_SERVER_NET, "10.1.12.2") },
		{ id: "floating", device: "R1", text: "Add a floating static route to the same LAN through R3 (10.1.13.2) with an administrative distance of 10, so it is only used as a backup.", hint: "Add the AD at the end: ip route 172.16.50.0 255.255.255.0 10.1.13.2 10", check: (s) => hasRoute(s.devices.R1, ...LAB2_SERVER_NET, "10.1.13.2", (ad) => ad > 1) },
		{ id: "verify", device: "R1", text: "Verify: PC-A reaches the server (172.16.50.10) through R2. Try traceroute 172.16.50.10.", hint: "In privileged mode: traceroute 172.16.50.10 — the first hop should be 10.1.12.2.", check: (s, lab) => canReach(lab, s, "PC-A", "172.16.50.10") && r1Path(lab, s) === "10.1.12.2" },
		{ id: "failover", device: "R1", sticky: true, text: "Simulate an outage: shut down R1 G0/1. Traffic must automatically fail over to the backup path through R3.", hint: "interface g0/1 → shutdown, then traceroute 172.16.50.10 — the first hop becomes 10.1.13.2.", check: (s, lab) => !s.devices.R1.interfaces["g0/1"].up && canReach(lab, s, "PC-A", "172.16.50.10") && r1Path(lab, s) === "10.1.13.2" },
		{ id: "restore", device: "R1", text: "Restore G0/1 (no shutdown). Traffic should return to the primary path through R2.", hint: "interface g0/1 → no shutdown", requires: "failover", check: (s, lab) => s.devices.R1.interfaces["g0/1"].up && r1Path(lab, s) === "10.1.12.2" },
		{ id: "save", device: "R1", text: "Save the configuration on R1.", hint: "end → copy running-config startup-config", check: (s) => isSaved(s, "R1") },
	],
	solution: {
		R1: ["enable", "configure terminal", "ip route 172.16.50.0 255.255.255.0 10.1.12.2", "ip route 172.16.50.0 255.255.255.0 10.1.13.2 10", "end", "traceroute 172.16.50.10", "configure terminal", "interface g0/1", "shutdown", "do traceroute 172.16.50.10", "no shutdown", "end", "copy running-config startup-config"],
	},
	finalCheck: { from: "PC-A", to: "172.16.50.10", label: "PC-A can reach the server (172.16.50.10)" },
	ptDevices: "four 2911 routers (R1–R4), one PC (PC-A), and one server (SRV1)",
};

// ---------------------------------------------------------------- Lab 3
const LAB3 = {
	id: 3,
	level: "Advanced",
	title: "Multi-Router Internet Access with Default Routes",
	summary: "Connect a branch network to the Internet across three routers: bring up the ISP link, then build the default and return routes on R1, R2, and R3.",
	editable: ["R1", "R2", "R3"],
	devices: {
		"PC-B": pc("192.168.20.10", "255.255.255.0", "192.168.20.1"),
		R1: {
			kind: "router",
			hostname: "R1",
			interfaces: { "g0/0": { ip: "192.168.20.1", mask: "255.255.255.0", up: true }, "g0/1": { ip: "10.2.12.1", mask: "255.255.255.252", up: true } },
		},
		R2: {
			kind: "router",
			hostname: "R2",
			interfaces: { "g0/0": { ip: "10.2.12.2", mask: "255.255.255.252", up: true }, "g0/1": { ip: "10.2.23.1", mask: "255.255.255.252", up: true } },
		},
		R3: {
			kind: "router",
			hostname: "R3",
			interfaces: { "g0/0": { ip: "10.2.23.2", mask: "255.255.255.252", up: true }, "g0/1": {} },
			routes: [{ net: "10.2.12.0", mask: "255.255.255.252", via: "10.2.23.1" }],
		},
		ISP: {
			kind: "router",
			hostname: "ISP",
			interfaces: { "g0/0": { ip: "203.0.113.1", mask: "255.255.255.252", up: true }, lo0: { ip: "8.8.8.8", mask: "255.255.255.255", up: true } },
			routes: [{ net: "192.168.20.0", mask: "255.255.255.0", via: "203.0.113.2" }, { net: "10.2.0.0", mask: "255.255.0.0", via: "203.0.113.2" }],
		},
	},
	links: [
		{ a: "PC-B:fa0", b: "R1:g0/0", net: "192.168.20.0/24" },
		{ a: "R1:g0/1", b: "R2:g0/0", net: "10.2.12.0/30" },
		{ a: "R2:g0/1", b: "R3:g0/0", net: "10.2.23.0/30" },
		{ a: "R3:g0/1", b: "ISP:g0/0", net: "203.0.113.0/30" },
	],
	layout: {
		width: 680,
		height: 200,
		nodes: {
			"PC-B": { x: 45, y: 120, sub: "192.168.20.10" },
			R1: { x: 185, y: 120, sub: "branch" },
			R2: { x: 335, y: 120, sub: "core" },
			R3: { x: 485, y: 120, sub: "edge" },
			ISP: { x: 625, y: 120, sub: "203.0.113.1" },
		},
		cloud: { x: 625, y: 38, attach: "ISP", label: "Internet", sub: "8.8.8.8" },
	},
	tasks: [
		{ id: "isp-link", device: "R3", text: "R3: configure G0/1 (to the ISP) with 203.0.113.2 / 255.255.255.252 and turn it on.", hint: "On R3: interface g0/1 → ip address 203.0.113.2 255.255.255.252 → no shutdown", check: (s) => ifaceIs(s.devices.R3, "g0/1", "203.0.113.2", "255.255.255.252") },
		{ id: "r3-default", device: "R3", text: "R3: add a default route to the ISP (203.0.113.1).", hint: "ip route 0.0.0.0 0.0.0.0 203.0.113.1", check: (s) => hasRoute(s.devices.R3, "0.0.0.0", "0.0.0.0", "203.0.113.1") },
		{ id: "r3-return", device: "R3", text: "R3: add a route back to the branch LAN 192.168.20.0/24 through R2 (10.2.23.1).", hint: "ip route 192.168.20.0 255.255.255.0 10.2.23.1", check: (s) => hasRoute(s.devices.R3, "192.168.20.0", "255.255.255.0", "10.2.23.1") },
		{ id: "r2-default", device: "R2", text: "R2: add a default route toward R3 (10.2.23.2).", hint: "On R2: ip route 0.0.0.0 0.0.0.0 10.2.23.2", check: (s) => hasRoute(s.devices.R2, "0.0.0.0", "0.0.0.0", "10.2.23.2") },
		{ id: "r2-return", device: "R2", text: "R2: add a route to the branch LAN 192.168.20.0/24 through R1 (10.2.12.1).", hint: "ip route 192.168.20.0 255.255.255.0 10.2.12.1", check: (s) => hasRoute(s.devices.R2, "192.168.20.0", "255.255.255.0", "10.2.12.1") },
		{ id: "r1-default", device: "R1", text: "R1: add a default route toward R2 (10.2.12.2).", hint: "On R1: ip route 0.0.0.0 0.0.0.0 10.2.12.2", check: (s) => hasRoute(s.devices.R1, "0.0.0.0", "0.0.0.0", "10.2.12.2") },
		{ id: "verify", device: "R1", text: "Verify: PC-B reaches the Internet (8.8.8.8). From R1, ping 8.8.8.8 and traceroute 8.8.8.8.", hint: "If it fails, check show ip route on each router — every hop needs a route there and back.", check: (s, lab) => canReach(lab, s, "PC-B", "8.8.8.8") },
		{ id: "save", device: "R1", text: "Save the configuration on R1, R2, and R3.", hint: "copy running-config startup-config on each router (use the tabs).", check: (s) => ["R1", "R2", "R3"].every((n) => isSaved(s, n)) },
	],
	solution: {
		R3: ["enable", "configure terminal", "interface g0/1", "ip address 203.0.113.2 255.255.255.252", "no shutdown", "exit", "ip route 0.0.0.0 0.0.0.0 203.0.113.1", "ip route 192.168.20.0 255.255.255.0 10.2.23.1", "end", "copy running-config startup-config"],
		R2: ["enable", "configure terminal", "ip route 0.0.0.0 0.0.0.0 10.2.23.2", "ip route 192.168.20.0 255.255.255.0 10.2.12.1", "end", "copy running-config startup-config"],
		R1: ["enable", "configure terminal", "ip route 0.0.0.0 0.0.0.0 10.2.12.2", "end", "ping 8.8.8.8", "copy running-config startup-config"],
	},
	finalCheck: { from: "PC-B", to: "8.8.8.8", label: "PC-B can reach the Internet (8.8.8.8)" },
	ptDevices: "four 2911 routers (R1, R2, R3, ISP) and one PC (PC-B)",
};

// ---------------------------------------------------------------- Lab 4
const LAB4 = {
	id: 4,
	level: "Advanced",
	title: "Voice VLANs and Neighbor Discovery",
	summary: "Configure phone-and-PC access, a data VLAN, LLDP between switches, and disable CDP on the router link.",
	editable: ["SW-1", "SW-2"],
	devices: {
		"SW-1": {
			kind: "switch",
			hostname: "SW-1",
			interfaces: { "e0/0": {}, "e0/1": {}, "e0/2": {} },
			vlans: {},
			lldpEnabled: false,
		},
		"SW-2": {
			kind: "switch",
			hostname: "SW-2",
			interfaces: { "e0/0": {}, "e0/1": {} },
			vlans: {},
			lldpEnabled: false,
		},
		R1: {
			kind: "router",
			hostname: "R1",
			interfaces: { "g0/0": { ip: "10.10.1.1", mask: "255.255.255.0", up: true } },
		},
		"IP Phone": {
			kind: "pc",
			hostname: "",
			gateway: "10.11.1.1",
			interfaces: { fa0: { ip: "10.11.1.10", mask: "255.255.255.0" }, fa1: {} },
		},
		PC1: pc("10.10.1.10", "255.255.255.0", "10.10.1.1"),
		PC2: pc("192.168.30.10", "255.255.255.0", "192.168.30.1"),
	},
	links: [
		{ a: "SW-1:e0/0", b: "SW-2:e0/0", net: "LLDP link" },
		{ a: "SW-1:e0/1", b: "IP Phone:fa0", net: "Data VLAN 10 · Voice VLAN 11" },
		{ a: "IP Phone:fa1", b: "PC1:fa0", net: "Phone pass-through" },
		{ a: "SW-2:e0/1", b: "PC2:fa0", net: "VLAN 30" },
		{ a: "SW-1:e0/2", b: "R1:g0/0", net: "Router link" },
	],
	layout: {
		width: 760,
		height: 340,
		nodes: {
			R1: { x: 310, y: 42, sub: "preconfigured · CDP disabled on SW-1" },
			"SW-1": { x: 310, y: 155, sub: "Data VLAN 10 · Voice VLAN 11" },
			"SW-2": { x: 610, y: 155, sub: "Data VLAN 30" },
			"IP Phone": { x: 140, y: 245, label: "IP Phone", sub: "Voice VLAN 11" },
			PC1: { x: 140, y: 322, sub: "Data VLAN 10" },
			PC2: { x: 610, y: 270, sub: "VLAN 30" },
		},
	},
	tasks: [
		{
			id: "sw1-phone-port",
			device: "SW-1",
			text: "Configure E0/1 as an access port for the PC in VLAN 10 and the IP phone in voice VLAN 11.",
			hint: "interface e0/1 → switchport mode access → switchport access vlan 10 → switchport voice vlan 11",
			check: (s) => {
				const port = s.devices["SW-1"].interfaces["e0/1"];
				return port.switchportMode === "access" && port.accessVlan === 10 && port.voiceVlan === 11;
			},
		},
		{
			id: "sw2-pc-port",
			device: "SW-2",
			text: "Configure E0/1 on SW-2 as an access port in VLAN 30 for PC2.",
			hint: "interface e0/1 → switchport mode access → switchport access vlan 30",
			check: (s) => {
				const port = s.devices["SW-2"].interfaces["e0/1"];
				return port.switchportMode === "access" && port.accessVlan === 30;
			},
		},
		{
			id: "sw1-vlan10",
			device: "SW-1",
			text: 'Create VLAN 10 on SW-1 and name it "Engineering".',
			hint: "configure terminal → vlan 10 → name Engineering",
			check: (s) => s.devices["SW-1"].vlans["10"] === "Engineering",
		},
		{
			id: "lldp-link",
			device: "SW-1",
			text: "Enable LLDP globally on both switches and enable LLDP transmit and receive on both ends of the SW-1–SW-2 link.",
			hint: "On both switches use lldp run, then on interface e0/0 use lldp transmit and lldp receive.",
			check: (s) => ["SW-1", "SW-2"].every((name) => {
				const port = s.devices[name].interfaces["e0/0"];
				return s.devices[name].lldpEnabled && port.lldpTransmit && port.lldpReceive;
			}),
		},
		{
			id: "disable-cdp",
			device: "SW-1",
			text: "Disable CDP on SW-1 E0/2, the link to R1.",
			hint: "interface e0/2 → no cdp enable",
			check: (s) => s.devices["SW-1"].interfaces["e0/2"].cdpEnabled === false,
		},
		{
			id: "save-switches",
			device: "SW-1",
			text: "Save the configuration on both SW-1 and SW-2.",
			hint: "On each switch run copy running-config startup-config.",
			check: (s) => ["SW-1", "SW-2"].every((name) => isSaved(s, name)),
		},
	],
	worksheet: [
		{
			title: "Task 1. Configure SW-1 switch port E0/1 to carry traffic for the Cisco IP phone and PC",
			slots: [
				{ devices: ["SW-1"], prompt: "SW-1(config)#", context: "config" },
				{ devices: ["SW-1"], prompt: "SW-1(config-if)#", context: "config-if", iface: "e0/1" },
				{ devices: ["SW-1"], prompt: "SW-1(config-if)#", context: "config-if", iface: "e0/1" },
				{ devices: ["SW-1"], prompt: "SW-1(config-if)#", context: "config-if", iface: "e0/1" },
			],
		},
		{
			title: "Task 2. Configure SW-2 E0/1 to carry traffic for PC2",
			slots: [
				{ devices: ["SW-2"], prompt: "SW-2(config)#", context: "config" },
				{ devices: ["SW-2"], prompt: "SW-2(config-if)#", context: "config-if", iface: "e0/1" },
				{ devices: ["SW-2"], prompt: "SW-2(config-if)#", context: "config-if", iface: "e0/1" },
			],
		},
		{
			title: 'Task 3. Configure VLAN 10 with the name "Engineering" on SW-1',
			slots: [
				{ devices: ["SW-1"], prompt: "SW-1(config)#", context: "config" },
				{ devices: ["SW-1"], prompt: "SW-1(config-vlan)#", context: "config-vlan", vlan: "10" },
				{ devices: ["SW-1"], prompt: "SW-1(config-vlan)#", context: "config-vlan", vlan: "10" },
			],
		},
		{
			title: "Task 4. Configure the link between SW-1 and SW-2 to use the vendor neutral neighbor discovery protocol",
			instructions: "On both SW-1 and SW-2:",
			slots: [
				{ devices: ["SW-1", "SW-2"], prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: ["SW-1", "SW-2"], prompt: "SW-1, SW-2(config)#", context: "config" },
				{ devices: ["SW-1", "SW-2"], prompt: "SW-1, SW-2(config-if)#", context: "config-if", iface: "e0/0" },
				{ devices: ["SW-1", "SW-2"], prompt: "SW-1, SW-2(config-if)#", context: "config-if", iface: "e0/0" },
			],
		},
		{
			title: "Task 5. Configure the link on SW-1 to R1 so that it does not allow the Cisco neighbor discovery protocol to pass",
			slots: [
				{ devices: ["SW-1"], prompt: "SW-1(config)#", context: "config" },
				{ devices: ["SW-1"], prompt: "SW-1(config-if)#", context: "config-if", iface: "e0/2" },
			],
		},
		{
			title: "Save configuration on SW-1, SW-2:",
			slots: [
				{ devices: ["SW-1", "SW-2"], prompt: "SW-1#, SW-2#", context: "priv" },
			],
		},
	],
	solution: {
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
	},
	finalCheck: {
		label: "SW-1 and SW-2 have LLDP enabled on their inter-switch link",
		check: (state) => ["SW-1", "SW-2"].every((name) => {
			const port = state.devices[name].interfaces["e0/0"];
			return state.devices[name].lldpEnabled && port.lldpTransmit && port.lldpReceive;
		}),
	},
	ptDevices: "two Catalyst switches (SW-1, SW-2), one router (R1), one IP phone, and two PCs",
	hasPacketTracerFile: false,
};

export const PRACTICE_LABS = [LAB1, LAB2, LAB3, LAB4];
