/* ==========================================================================
   CCNA Practice Lab engine
   A small multi-device network simulator: routers, PCs, links, connected and
   static routes (with administrative distance / floating routes), ping and
   traceroute that follow the real routing tables, and a Cisco-IOS-style CLI.
   ========================================================================== */

// ---------- addressing helpers ----------
export const ipToInt = (ip) => ip.split(".").reduce((n, o) => (n << 8) + Number(o), 0) >>> 0;
export const intToIp = (n) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join(".");
export const isIp = (s) => /^(\d{1,3}\.){3}\d{1,3}$/.test(s || "") && s.split(".").every((o) => Number(o) <= 255);
export const isMask = (m) => {
	if (!isIp(m)) return false;
	const inv = ~ipToInt(m) >>> 0;
	return (inv & (inv + 1)) === 0;
};
export const prefixLen = (m) => ipToInt(m).toString(2).replace(/0/g, "").length;
export const networkOf = (ip, mask) => intToIp((ipToInt(ip) & ipToInt(mask)) >>> 0);
export const sameSubnet = (a, b, mask) => networkOf(a, mask) === networkOf(b, mask);

function parseIpv6(value) {
	const [address, prefixText, ...extra] = value.trim().toLowerCase().split("/");
	if (!address || extra.length || (prefixText !== undefined && !/^\d{1,3}$/.test(prefixText))) return null;
	const prefix = prefixText === undefined ? 128 : Number(prefixText);
	if (prefix > 128) return null;
	const halves = address.split("::");
	if (halves.length > 2) return null;
	const left = halves[0] ? halves[0].split(":") : [];
	const right = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
	const groups = [...left, ...right];
	if (groups.some((group) => !/^[\da-f]{1,4}$/.test(group))) return null;
	const missing = 8 - groups.length;
	if ((halves.length === 1 && missing !== 0) || (halves.length === 2 && missing < 1)) return null;
	const expanded = [...left, ...Array(missing).fill("0"), ...right].map((group) => Number.parseInt(group, 16));
	const addressValue = expanded.reduce((result, group) => (result << 16n) | BigInt(group), 0n);
	return { address: expanded.map((group) => group.toString(16)).join(":"), addressValue, prefix };
}

export const isIpv6 = (address) => typeof address === "string" && parseIpv6(address) !== null;

function sameIpv6Subnet(left, right, prefix = left.prefix) {
	if (!left || !right) return false;
	const shift = BigInt(128 - prefix);
	return (left.addressValue >> shift) === (right.addressValue >> shift);
}

const FULL_NAME = (ifName) => {
	if (ifName.startsWith("g")) return `GigabitEthernet${ifName.slice(1)}`;
	if (ifName.startsWith("lo")) return `Loopback${ifName.slice(2)}`;
	if (ifName.startsWith("fa")) return `FastEthernet${ifName.slice(2)}`;
	if (ifName.startsWith("e")) return `Ethernet${ifName.slice(1)}`;
	return ifName;
};
export const fullIfName = FULL_NAME;

// ---------- lab state ----------
export function createLabState(lab) {
	const devices = structuredClone(lab.devices);
	for (const d of Object.values(devices)) {
		d.routes = d.routes || [];
		d.accessLists = d.accessLists || {};
		d.ospf = d.ospf || null;
		d.secret = d.secret || "";
		d.startup = null;
		if (d.kind === "switch") {
			d.vlans = d.vlans || {};
			d.lldpEnabled = Boolean(d.lldpEnabled);
		}
		for (const i of Object.values(d.interfaces)) {
			i.ip = i.ip || "";
			i.mask = i.mask || "";
			i.ipv6 = i.ipv6 || "";
			i.up = d.kind === "pc" || d.kind === "switch" ? true : Boolean(i.up);
			i.desc = i.desc || "";
			if (d.kind === "switch") {
				i.switchportMode = i.switchportMode || "dynamic";
				i.trunkNativeVlan = i.trunkNativeVlan ?? 1;
				i.cdpEnabled = i.cdpEnabled !== false;
				i.lldpTransmit = Boolean(i.lldpTransmit);
				i.lldpReceive = Boolean(i.lldpReceive);
			} else if (d.kind === "router") {
				i.ospfPriority = i.ospfPriority ?? 1;
				i.accessGroups = i.accessGroups || {};
			}
		}
	}
	const consoles = {};
	for (const name of lab.editable) consoles[name] = { mode: "user", iface: null, ifaces: null };
	return { devices, consoles, initial: Object.fromEntries(lab.editable.map((n) => [n, signature(devices[n])])) };
}

export function signature(d) {
	return JSON.stringify({
		h: d.hostname,
		s: d.secret,
		i: d.interfaces,
		r: d.routes,
		a: d.accessLists,
		o: d.ospf,
		...(d.kind === "switch" ? { v: d.vlans, l: d.lldpEnabled } : {}),
	});
}

export const isSaved = (state, name) => {
	const d = state.devices[name];
	return d.startup !== null && d.startup === signature(d) && signature(d) !== state.initial[name];
};

// ---------- link / routing model ----------
function peerOf(lab, devName, ifName) {
	for (const l of lab.links) {
		const [a, b] = [l.a.split(":"), l.b.split(":")];
		if (a[0] === devName && a[1] === ifName) return { dev: b[0], ifName: b[1] };
		if (b[0] === devName && b[1] === ifName) return { dev: a[0], ifName: a[1] };
	}
	return null;
}

export function ifaceUp(lab, state, devName, ifName) {
	const i = state.devices[devName]?.interfaces[ifName];
	if (!i || !i.up) return false;
	if (ifName.startsWith("lo")) return true;
	const p = peerOf(lab, devName, ifName);
	if (!p) return false;
	return Boolean(state.devices[p.dev]?.interfaces[p.ifName]?.up);
}

export function linkUp(lab, state, link) {
	const [d, i] = link.a.split(":");
	return ifaceUp(lab, state, d, i);
}

function connectedRoutes(lab, state, devName) {
	const d = state.devices[devName];
	const out = [];
	for (const [ifName, i] of Object.entries(d.interfaces)) {
		if (!i.ip || !isMask(i.mask) || !ifaceUp(lab, state, devName, ifName)) continue;
		out.push({ type: "C", net: networkOf(i.ip, i.mask), mask: i.mask, ad: 0, outIf: ifName });
		out.push({ type: "L", net: i.ip, mask: "255.255.255.255", ad: 0, outIf: ifName });
	}
	return out;
}

export function routingTable(lab, state, devName) {
	const d = state.devices[devName];
	const connected = connectedRoutes(lab, state, devName);
	const candidates = [...connected];
	for (const r of d.routes) {
		const via = connected.find((c) => c.type === "C" && sameSubnet(c.net, r.via, c.mask));
		if (!via) continue; // next hop not reachable -> route not installed
		candidates.push({ type: "S", net: r.net, mask: r.mask, ad: r.ad ?? 1, via: r.via, outIf: via.outIf });
	}
	const best = new Map();
	for (const c of candidates) {
		const key = `${c.net}/${c.mask}`;
		if (!best.has(key) || c.ad < best.get(key).ad) best.set(key, c);
	}
	return [...best.values()];
}

function lookup(table, ip) {
	let found = null;
	for (const r of table) {
		if (r.type === "L" && r.net !== ip) continue;
		if (!sameSubnet(ip, r.net, r.mask)) continue;
		if (!found || prefixLen(r.mask) > prefixLen(found.mask)) found = r;
	}
	return found;
}

function owns(lab, state, devName, ip) {
	const d = state.devices[devName];
	return Object.entries(d.interfaces).some(([ifName, i]) => i.ip === ip && ifaceUp(lab, state, devName, ifName));
}

function aclAllows(device, ifName, sourceIp, direction) {
	const accessList = device.interfaces[ifName]?.accessGroups?.[direction];
	if (!accessList) return true;
	const entries = device.accessLists[String(accessList)] || [];
	for (const entry of entries) {
		const matches = ((ipToInt(sourceIp) ^ ipToInt(entry.source)) & (~ipToInt(entry.wildcard))) === 0;
		if (matches) return entry.action === "permit";
	}
	return false;
}

/* Walk the packet hop by hop. Returns { ok, hops: [next-hop IPs], dev, firstOutIf } */
export function forward(lab, state, srcDev, dstIp) {
	let cur = srcDev;
	const hops = [];
	let firstOutIf = null;
	let pendingNextIp = dstIp;
	let sourceIp = state.devices[srcDev].kind === "pc"
		? Object.values(state.devices[srcDev].interfaces)[0].ip
		: "";
	let incomingIf = null;
	for (let ttl = 0; ttl < 16; ttl++) {
		const d = state.devices[cur];
		if (d.kind === "router" && incomingIf && !aclAllows(d, incomingIf, sourceIp, "in")) {
			return { ok: false, hops, reason: "access-list", dev: cur };
		}
		if (owns(lab, state, cur, dstIp)) return { ok: true, hops, dev: cur, firstOutIf };
		if (d.kind === "switch") {
			const targetLink = lab.links.find((link) => {
				const [aDev, aIf] = link.a.split(":");
				const [bDev, bIf] = link.b.split(":");
				const peer = aDev === cur ? { dev: bDev, ifName: bIf } : bDev === cur ? { dev: aDev, ifName: aIf } : null;
				return peer &&
					ifaceUp(lab, state, cur, aDev === cur ? aIf : bIf) &&
					state.devices[peer.dev]?.interfaces[peer.ifName]?.ip === pendingNextIp;
			});
			if (!targetLink) return { ok: false, hops, reason: "unreachable", dev: cur };
			const [aDev, aIf] = targetLink.a.split(":");
			const [bDev, bIf] = targetLink.b.split(":");
			incomingIf = aDev === cur ? bIf : aIf;
			cur = aDev === cur ? bDev : aDev;
			pendingNextIp = state.devices[cur].interfaces[aDev === cur ? aIf : bIf].ip;
			continue;
		}
		let nextIp;
		let outIf;
		if (d.kind === "pc") {
			const [ifName, i] = Object.entries(d.interfaces)[0];
			if (!ifaceUp(lab, state, cur, ifName)) return { ok: false, hops, reason: "down" };
			nextIp = sameSubnet(i.ip, dstIp, i.mask) ? dstIp : d.gateway;
			outIf = ifName;
		} else {
			const r = lookup(routingTable(lab, state, cur), dstIp);
			if (!r) return { ok: false, hops, reason: "noroute", dev: cur };
			nextIp = r.type === "S" ? r.via : dstIp;
			outIf = r.outIf;
		}
		if (!firstOutIf) firstOutIf = outIf;
		if (!sourceIp) sourceIp = d.interfaces[outIf].ip;
		if (d.kind === "router" && !aclAllows(d, outIf, sourceIp, "out")) {
			return { ok: false, hops, reason: "access-list", dev: cur };
		}
		pendingNextIp = nextIp;
		const p = peerOf(lab, cur, outIf);
		const peerIf = p && state.devices[p.dev]?.interfaces[p.ifName];
		const isSwitchPeer = p && state.devices[p.dev]?.kind === "switch";
		if (!p || !peerIf || (!isSwitchPeer && peerIf.ip !== nextIp) || !ifaceUp(lab, state, p.dev, p.ifName)) {
			return { ok: false, hops, reason: "unreachable", dev: cur };
		}
		hops.push(nextIp);
		incomingIf = p.ifName;
		cur = p.dev;
	}
	return { ok: false, hops, reason: "loop" };
}

function ospfNetworksFor(device, intf) {
	if (!device.ospf || !intf.ip || !isMask(intf.mask)) return [];
	return device.ospf.networks.filter(({ net, wildcard }) => (
		((ipToInt(intf.ip) ^ ipToInt(net)) & (~ipToInt(wildcard))) === 0
	));
}

function routerIdFor(device) {
	if (device.ospf?.routerId) return device.ospf.routerId;
	const loopback = Object.entries(device.interfaces)
		.filter(([name, intf]) => name.startsWith("lo") && intf.ip)
		.map(([, intf]) => intf.ip)
		.sort((left, right) => ipToInt(right) - ipToInt(left))[0];
	if (loopback) return loopback;
	return Object.values(device.interfaces)
		.filter((intf) => intf.ip)
		.map((intf) => intf.ip)
		.sort((left, right) => ipToInt(right) - ipToInt(left))[0] || "0.0.0.0";
}

export function getOspfDr(lab, state, subnet) {
	const [network, prefixText] = subnet.split("/");
	const prefix = Number(prefixText);
	if (!isIp(network) || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) return null;
	const candidates = [];
	for (const [name, device] of Object.entries(state.devices)) {
		if (device.kind !== "router") continue;
		for (const [ifName, intf] of Object.entries(device.interfaces)) {
			if (!intf.ip || !isMask(intf.mask) || prefixLen(intf.mask) !== prefix ||
				networkOf(intf.ip, intf.mask) !== network || !ifaceUp(lab, state, name, ifName) ||
				!ospfNetworksFor(device, intf).length) continue;
			if (!candidates.some((candidate) => candidate.name === name)) {
				candidates.push({
					name,
					routerId: routerIdFor(device),
					priority: intf.ospfPriority ?? 1,
				});
			}
		}
	}
	return candidates
		.filter(({ priority }) => priority > 0)
		.sort((left, right) => right.priority - left.priority || ipToInt(right.routerId) - ipToInt(left.routerId))[0]?.name ?? null;
}

function sourceIpFor(state, devName, outIf) {
	return state.devices[devName].interfaces[outIf]?.ip;
}

/* Round trip: there and back. */
export function canReach(lab, state, fromDev, dstIp) {
	if (owns(lab, state, fromDev, dstIp)) return true;
	const go = forward(lab, state, fromDev, dstIp);
	if (!go.ok) return false;
	const d = state.devices[fromDev];
	const srcIp = d.kind === "pc" ? Object.values(d.interfaces)[0].ip : sourceIpFor(state, fromDev, go.firstOutIf);
	if (!srcIp) return false;
	return forward(lab, state, go.dev, srcIp).ok;
}

export function canReachIpv6(lab, state, fromDev, dstAddress) {
	const destination = parseIpv6(dstAddress);
	if (!destination) return false;
	const device = state.devices[fromDev];
	return Object.entries(device.interfaces).some(([ifName, intf]) => {
		if (!intf.ipv6 || !ifaceUp(lab, state, fromDev, ifName)) return false;
		const source = parseIpv6(intf.ipv6);
		const peer = peerOf(lab, fromDev, ifName);
		const peerInterface = peer && state.devices[peer.dev]?.interfaces[peer.ifName];
		const peerAddress = peerInterface?.ipv6 && parseIpv6(peerInterface.ipv6);
		return source && peerAddress && peerAddress.address === destination.address &&
			sameIpv6Subnet(source, destination) && sameIpv6Subnet(peerAddress, source) &&
			ifaceUp(lab, state, peer.dev, peer.ifName);
	});
}

// ---------- show commands ----------
export function runningConfig(d) {
	const lines = ["Building configuration...", "", "Current configuration : 1342 bytes", "!", "version 15.4", "!", `hostname ${d.hostname}`, "!"];
	if (d.secret) lines.push("enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0", "!");
	if (d.kind === "switch") {
		if (d.lldpEnabled) lines.push("lldp run", "!");
		for (const [vlanId, name] of Object.entries(d.vlans).sort(([left], [right]) => Number(left) - Number(right))) {
			lines.push(`vlan ${vlanId}`);
			if (name) lines.push(` name ${name}`);
			lines.push("!");
		}
		for (const [ifName, i] of Object.entries(d.interfaces)) {
			lines.push(`interface ${FULL_NAME(ifName)}`);
			if (i.switchportMode === "trunk") lines.push(" switchport trunk encapsulation dot1q");
			if (i.switchportMode !== "dynamic") lines.push(` switchport mode ${i.switchportMode}`);
			if (i.accessVlan !== undefined) lines.push(` switchport access vlan ${i.accessVlan}`);
			if (i.voiceVlan !== undefined) lines.push(` switchport voice vlan ${i.voiceVlan}`);
			if (i.trunkAllowedVlans) lines.push(` switchport trunk allowed vlan ${i.trunkAllowedVlans.join(",")}`);
			if (i.trunkNativeVlan !== 1) lines.push(` switchport trunk native vlan ${i.trunkNativeVlan}`);
			if (i.portChannel !== undefined) lines.push(` channel-group ${i.portChannel} mode ${i.lacpMode}`);
			if (i.lldpTransmit) lines.push(" lldp transmit");
			if (i.lldpReceive) lines.push(" lldp receive");
			if (!i.cdpEnabled) lines.push(" no cdp enable");
			lines.push("!");
		}
		lines.push("line con 0", "line vty 0 4", " login", "!", "end");
		return lines;
	}
	for (const [aclId, entries] of Object.entries(d.accessLists || {})) {
		for (const entry of entries) lines.push(`access-list ${aclId} ${entry.action} ${entry.source} ${entry.wildcard}`);
	}
	if (d.ospf) {
		lines.push(`router ospf ${d.ospf.processId}`);
		if (d.ospf.routerId) lines.push(` router-id ${d.ospf.routerId}`);
		for (const network of d.ospf.networks) {
			lines.push(` network ${network.net} ${network.wildcard} area ${network.area}`);
		}
		lines.push("!");
	}
	for (const [ifName, i] of Object.entries(d.interfaces)) {
		lines.push(`interface ${FULL_NAME(ifName)}`);
		if (i.desc) lines.push(` description ${i.desc}`);
		for (const [direction, aclId] of Object.entries(i.accessGroups || {})) {
			lines.push(` ip access-group ${aclId} ${direction}`);
		}
		if (i.ospfPriority !== undefined && i.ospfPriority !== 1) lines.push(` ip ospf priority ${i.ospfPriority}`);
		lines.push(i.ip ? ` ip address ${i.ip} ${i.mask}` : " no ip address");
		if (i.ipv6) lines.push(` ipv6 address ${i.ipv6}`);
		if (!i.up && !ifName.startsWith("lo")) lines.push(" shutdown");
		lines.push("!");
	}
	for (const r of d.routes) lines.push(`ip route ${r.net} ${r.mask} ${r.via}${r.ad && r.ad !== 1 ? ` ${r.ad}` : ""}`);
	if (d.routes.length) lines.push("!");
	lines.push("line con 0", "line vty 0 4", " login", "!", "end");
	return lines;
}

/* IOS commands that recreate a device's configuration (used for Packet Tracer build steps). */
export function configCommands(d) {
	if (d.kind === "pc") {
		const i = Object.values(d.interfaces)[0];
		return [`IP address ${i.ip}`, `Subnet mask ${i.mask}`, `Default gateway ${d.gateway}`];
	}
	const out = ["enable", "configure terminal", `hostname ${d.hostname}`];
	if (d.kind === "switch") {
		for (const [vlanId, name] of Object.entries(d.vlans ?? {}).sort(([left], [right]) => Number(left) - Number(right))) {
			out.push(`vlan ${vlanId}`);
			if (name) out.push(` name ${name}`);
			out.push("exit");
		}
		if (d.lldpEnabled) out.push("lldp run");
		for (const [ifName, intf] of Object.entries(d.interfaces)) {
			out.push(`interface ${ifName}`);
			if (intf.switchportMode === "trunk") {
				out.push(" switchport trunk encapsulation dot1q", " switchport mode trunk");
			} else if (intf.switchportMode === "access") {
				out.push(" switchport mode access");
			}
			if (intf.accessVlan !== undefined) out.push(` switchport access vlan ${intf.accessVlan}`);
			if (intf.voiceVlan !== undefined) out.push(` switchport voice vlan ${intf.voiceVlan}`);
			if (intf.trunkAllowedVlans) out.push(` switchport trunk allowed vlan ${intf.trunkAllowedVlans.join(",")}`);
			if (intf.trunkNativeVlan !== undefined && intf.trunkNativeVlan !== 1) out.push(` switchport trunk native vlan ${intf.trunkNativeVlan}`);
			if (intf.portChannel !== undefined) out.push(` channel-group ${intf.portChannel} mode ${intf.lacpMode}`);
			if (intf.lldpTransmit) out.push(" lldp transmit");
			if (intf.lldpReceive) out.push(" lldp receive");
			if (!intf.cdpEnabled) out.push(" no cdp enable");
			out.push("exit");
		}
		out.push("end");
		return out;
	}
	for (const [ifName, i] of Object.entries(d.interfaces)) {
		if (!i.ip && !i.ipv6) continue;
		out.push(`interface ${ifName}`);
		if (i.ip) out.push(` ip address ${i.ip} ${i.mask}`);
		if (i.ipv6) out.push(` ipv6 address ${i.ipv6}`);
		if (i.up || ifName.startsWith("lo")) out.push(" no shutdown");
	}
	out.push("exit");
	for (const [aclId, entries] of Object.entries(d.accessLists || {})) {
		for (const entry of entries) out.push(`access-list ${aclId} ${entry.action} ${entry.source} ${entry.wildcard}`);
	}
	if (d.ospf) {
		out.push(`router ospf ${d.ospf.processId}`);
		if (d.ospf.routerId) out.push(` router-id ${d.ospf.routerId}`);
		for (const network of d.ospf.networks) {
			out.push(` network ${network.net} ${network.wildcard} area ${network.area}`);
		}
		out.push("exit");
	}
	for (const r of d.routes) out.push(`ip route ${r.net} ${r.mask} ${r.via}${r.ad && r.ad !== 1 ? ` ${r.ad}` : ""}`);
	out.push("end");
	return out;
}

function showIpRoute(lab, state, devName) {
	const table = routingTable(lab, state, devName);
	const out = ["Codes: L - local, C - connected, S - static, * - candidate default", ""];
	const def = table.find((r) => r.net === "0.0.0.0" && r.mask === "0.0.0.0");
	out.push(def ? `Gateway of last resort is ${def.via} to network 0.0.0.0` : "Gateway of last resort is not set", "");
	const sorted = [...table].sort((a, b) => ipToInt(a.net) - ipToInt(b.net) || prefixLen(a.mask) - prefixLen(b.mask));
	for (const r of sorted) {
		const p = `${r.net}/${prefixLen(r.mask)}`;
		if (r.type === "S") out.push(`${r.net === "0.0.0.0" ? "S*" : "S "}    ${p} [${r.ad}/0] via ${r.via}`);
		else out.push(`${r.type}     ${p} is directly connected, ${FULL_NAME(r.outIf)}`);
	}
	return out;
}

function showIpIntBrief(lab, state, devName) {
	const out = ["Interface              IP-Address      OK? Method Status                Protocol"];
	for (const [ifName, i] of Object.entries(state.devices[devName].interfaces)) {
		const status = i.up || ifName.startsWith("lo") ? "up" : "administratively down";
		const proto = ifaceUp(lab, state, devName, ifName) ? "up" : "down";
		out.push(`${FULL_NAME(ifName).padEnd(23)}${(i.ip || "unassigned").padEnd(16)}YES ${(i.ip ? "manual" : "unset").padEnd(7)}${status.padEnd(22)}${proto}`);
	}
	return out;
}

// ---------- CLI ----------
const kw = (token, word, min = 1) => !!token && token.length >= min && word.startsWith(token.toLowerCase());

function parseIface(tokens, device) {
	const joined = tokens.join("").toLowerCase();
	let m;
	m = joined.match(/^e(?:t(?:h(?:e(?:r(?:n(?:e(?:t)?)?)?)?)?)?)?0\/(\d)$/);
	if (m && device.interfaces[`e0/${m[1]}`]) return `e0/${m[1]}`;
	m = joined.match(/^g(?:i(?:g(?:a(?:b(?:i(?:t(?:e(?:t(?:h(?:e(?:r(?:n(?:e(?:t)?)?)?)?)?)?)?)?)?)?)?)?)?)?0\/(\d)$/);
	if (m && device.interfaces[`g0/${m[1]}`]) return `g0/${m[1]}`;
	m = joined.match(/^lo(?:o(?:p(?:b(?:a(?:c(?:k)?)?)?)?)?)?(\d)$/);
	if (m && device.interfaces[`lo${m[1]}`]) return `lo${m[1]}`;
	return null;
}

function parseIfaceRange(tokens, device) {
	const input = tokens.join("").toLowerCase();
	const match = input.match(/^(e0\/\d+)-(\d+)$/);
	if (!match) return null;
	const first = Number(match[1].slice(match[1].lastIndexOf("/") + 1));
	const last = Number(match[2]);
	if (last < first) return null;
	const interfaces = Array.from({ length: last - first + 1 }, (_, index) => `e0/${first + index}`);
	return interfaces.every((name) => device.interfaces[name]) ? interfaces : null;
}

const HELP = {
	user: ["enable           Turn on privileged commands", "ping             Send echo messages", "show             Show running system information", "traceroute       Trace route to destination"],
	priv: ["configure        Enter configuration mode", "copy             Copy from one file to another", "disable          Turn off privileged commands", "ping             Send echo messages", "show             Show running system information", "traceroute       Trace route to destination", "write            Write running configuration to memory"],
	config: ["access-list      Configure a numbered standard ACL", "do               Run an exec-level command", "enable           Modify enable password parameters", "end              Exit to privileged mode", "exit             Exit from configure mode", "hostname         Set system's network name", "interface        Select an interface or interface range", "ip               Global IP configuration subcommands (ip route)", "lldp             Global LLDP configuration", "no               Negate a command", "router           Enable a routing process", "vlan             Configure a VLAN"],
	"config-if": ["channel-group    Configure LACP EtherChannel", "description      Interface specific description", "do               Run an exec-level command", "end              Exit to privileged mode", "exit             Exit from interface configuration mode", "ip               Interface IP config commands (ip address, access-group, ospf priority)", "ipv6             IPv6 interface configuration", "lldp             Configure LLDP on the interface", "no               Negate a command", "shutdown         Shutdown the selected interface", "switchport       Configure switch port mode and VLANs"],
	"config-if-range": ["channel-group    Configure LACP EtherChannel", "description      Interface specific description", "do               Run an exec-level command", "end              Exit to privileged mode", "exit             Exit from interface configuration mode", "lldp             Configure LLDP on the interface range", "no               Negate a command", "switchport       Configure switch port mode and VLANs"],
	"config-vlan": ["end              Exit to privileged mode", "exit             Exit from VLAN configuration mode", "name             Assign a name to the VLAN"],
	"config-router": ["end              Exit to privileged mode", "exit             Exit from routing protocol configuration mode", "network          Enable OSPF on matching interfaces", "router-id        Set the OSPF router ID"],
};

function tokenStart(line, tokenIndex) {
	const tokens = /\S+/g;
	let match;
	let index = 0;
	while ((match = tokens.exec(line))) {
		if (index === tokenIndex) return match.index;
		index += 1;
	}
	return line.length;
}

export function promptFor(state, devName) {
	const h = state.devices[devName].hostname;
	const mode = state.consoles[devName].mode;
	return {
		user: `${h}>`,
		priv: `${h}#`,
		config: `${h}(config)#`,
		"config-if": `${h}(config-if)#`,
		"config-if-range": `${h}(config-if-range)#`,
		"config-vlan": `${h}(config-vlan)#`,
		"config-router": `${h}(config-router)#`,
	}[mode];
}

/* Run one CLI line on a device. Returns the new state and output lines. */
export function execute(lab, prev, devName, line) {
	const state = structuredClone(prev);
	const d = state.devices[devName];
	const con = state.consoles[devName];
	const out = [];
	const t = line.trim().split(/\s+/).filter(Boolean);
	const invalidAt = (index = 0, message = "% Invalid input detected at '^' marker.") => {
		const cursor = promptFor(state, devName).length + tokenStart(line, index);
		out.push(`${" ".repeat(cursor)}^`, message);
	};
	const incomplete = () => {
		const cursor = promptFor(state, devName).length + line.length;
		out.push(`${" ".repeat(cursor)}^`, "% Incomplete command.");
	};
	if (t.length === 0) return { state, out };
	if (t[0] === "?" || t[t.length - 1] === "?") return { state, out: HELP[con.mode] };

	const exec = (tk, privileged, tokenOffset = 0) => {
		const invalid = (index = 0) => invalidAt(tokenOffset + index);
		if (kw(tk[0], "ping", 1)) {
			if (kw(tk[1], "ipv6", 2)) {
				if (!tk[2]) return incomplete();
				if (!isIpv6(tk[2])) return invalid(2);
				const ok = canReachIpv6(lab, state, devName, tk[2]);
				return out.push("Type escape sequence to abort.", `Sending 5, 100-byte ICMP Echos to ${tk[2]}, timeout is 2 seconds:`, ok ? "!!!!!" : ".....", ok ? "Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms" : "Success rate is 0 percent (0/5)");
			}
			if (!tk[1]) return incomplete();
			if (!isIp(tk[1])) return invalid(1);
			const ok = canReach(lab, state, devName, tk[1]);
			return out.push("Type escape sequence to abort.", `Sending 5, 100-byte ICMP Echos to ${tk[1]}, timeout is 2 seconds:`, ok ? "!!!!!" : ".....", ok ? "Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms" : "Success rate is 0 percent (0/5)");
		}
		if (kw(tk[0], "traceroute", 4)) {
			if (!tk[1]) return incomplete();
			if (!isIp(tk[1])) return invalid(1);
			out.push("Type escape sequence to abort.", `Tracing the route to ${tk[1]}`, "");
			const f = forward(lab, state, devName, tk[1]);
			const ok = f.ok && canReach(lab, state, devName, tk[1]);
			f.hops.forEach((h, i) => out.push(`  ${i + 1} ${h} ${2 + i} msec ${2 + i} msec ${3 + i} msec`));
			if (!ok) out.push(`  ${f.hops.length + 1} * * *`, `  ${f.hops.length + 2} * * *`);
			return;
		}
		if (kw(tk[0], "show", 2)) {
			if (!tk[1]) return incomplete();
			if (privileged && kw(tk[1], "running-config", 3)) return out.push(...runningConfig(d));
			if (privileged && kw(tk[1], "startup-config", 3)) return out.push(...(d.startup ? (con.startupText || []) : ["startup-config is not present"]));
			let errorToken = 1;
			if (kw(tk[1], "ip", 2)) {
				if (!tk[2]) return incomplete();
				if (kw(tk[2], "interface", 3)) {
					if (!tk[3]) return incomplete();
					if (kw(tk[3], "brief", 2)) return out.push(...showIpIntBrief(lab, state, devName));
					errorToken = 3;
				} else if (kw(tk[2], "route", 2)) return out.push(...showIpRoute(lab, state, devName));
				else errorToken = 2;
			}
			return invalid(errorToken);
		}
		if (privileged && (kw(tk[0], "write", 2) || (kw(tk[0], "copy", 2) && kw(tk[1], "running-config", 3) && kw(tk[2], "startup-config", 3)))) {
			if (kw(tk[0], "copy", 2)) out.push("Destination filename [startup-config]? ");
			d.startup = signature(d);
			con.startupText = runningConfig(d);
			return out.push("Building configuration...", "[OK]");
		}
		return invalid();
	};

	const mode = con.mode;
	if (mode === "user") {
		if (kw(t[0], "enable", 2)) con.mode = "priv";
		else exec(t, false);
	} else if (mode === "priv") {
		if (kw(t[0], "configure", 4)) {
			if (t[1] && !kw(t[1], "terminal", 1)) invalidAt(1);
			else {
				con.mode = "config";
				out.push("Enter configuration commands, one per line.  End with CNTL/Z.");
			}
		} else if (kw(t[0], "disable", 4) || kw(t[0], "exit", 2)) con.mode = "user";
		else exec(t, true);
	} else {
		const neg = kw(t[0], "no", 2);
		const tk = neg ? t.slice(1) : t;
		if (kw(t[0], "do", 2)) exec(t.slice(1), true);
		else if (kw(t[0], "end", 2)) {
			con.mode = "priv";
			con.iface = null;
			con.ifaces = null;
			con.vlan = null;
		} else if (kw(t[0], "exit", 2)) {
			if (mode === "config-if" || mode === "config-if-range") {
				con.mode = "config";
				con.iface = null;
				con.ifaces = null;
			} else if (mode === "config-vlan") {
				con.mode = "config";
				con.vlan = null;
			} else if (mode === "config-router") {
				con.mode = "config";
			} else con.mode = "priv";
		} else if (mode === "config" && d.kind === "switch" && kw(tk[0], "vlan", 2)) {
			if (!/^\d+$/.test(tk[1] ?? "") || Number(tk[1]) < 1 || Number(tk[1]) > 4094) {
				if (tk[1]) invalidAt((neg ? 1 : 0) + 1);
				else incomplete();
			} else {
				const vlanId = String(Number(tk[1]));
				if (neg) delete d.vlans[vlanId];
				else {
					d.vlans[vlanId] ??= "";
					con.mode = "config-vlan";
					con.vlan = vlanId;
				}
			}
		} else if (mode === "config" && d.kind === "switch" && kw(tk[0], "lldp", 2) && kw(tk[1], "run", 2)) {
			d.lldpEnabled = !neg;
		} else if (mode === "config" && d.kind === "router" && kw(tk[0], "access-list", 7)) {
			const aclId = tk[1];
			const action = tk[2]?.toLowerCase();
			let source;
			let wildcard;
			if (!/^\d+$/.test(aclId ?? "") || Number(aclId) < 1 || Number(aclId) > 99 ||
				!["permit", "deny"].includes(action)) {
				incomplete();
			} else if (kw(tk[3], "any", 3)) {
				source = "0.0.0.0";
				wildcard = "255.255.255.255";
			} else if (kw(tk[3], "host", 2)) {
				if (!isIp(tk[4])) invalidAt((neg ? 1 : 0) + 4);
				else {
					source = tk[4];
					wildcard = "0.0.0.0";
				}
			} else if (isIp(tk[3]) && isIp(tk[4])) {
				source = tk[3];
				wildcard = tk[4];
			} else {
				incomplete();
			}
			if (source && wildcard) {
				const entries = d.accessLists[aclId] || [];
				if (neg) {
					const index = entries.findIndex((entry) => entry.action === action &&
						entry.source === source && entry.wildcard === wildcard);
					if (index >= 0) entries.splice(index, 1);
					if (entries.length) d.accessLists[aclId] = entries;
					else delete d.accessLists[aclId];
				} else {
					d.accessLists[aclId] = [...entries, { action, source, wildcard }];
				}
			}
		} else if (mode === "config" && d.kind === "router" && kw(tk[0], "router", 3) && kw(tk[1], "ospf", 4)) {
			const processId = Number(tk[2]);
			if (!Number.isInteger(processId) || processId < 1 || processId > 65535) incomplete();
			else {
				d.ospf = { processId, routerId: d.ospf?.routerId || "", networks: d.ospf?.networks || [] };
				con.mode = "config-router";
			}
		} else if (mode === "config-vlan" && kw(tk[0], "name", 2)) {
			if (neg) d.vlans[con.vlan] = "";
			else if (!tk[1]) incomplete();
			else d.vlans[con.vlan] = tk.slice(1).join(" ");
		} else if (kw(tk[0], "interface", 3)) {
			const isRange = kw(tk[1], "range", 3);
			const names = isRange ? parseIfaceRange(tk.slice(2), d) : null;
			const name = isRange ? null : parseIface(tk.slice(1), d);
			if (!tk[1]) incomplete();
			else if (isRange && !names) invalidAt((neg ? 1 : 0) + 2);
			else if (!isRange && !name) invalidAt((neg ? 1 : 0) + 1);
			else {
				con.mode = isRange ? "config-if-range" : "config-if";
				con.iface = name;
				con.ifaces = names;
			}
		} else if (mode === "config" && kw(tk[0], "hostname", 3)) {
			if (neg) d.hostname = "Router";
			else if (!tk[1]) incomplete();
			else d.hostname = tk[1];
		} else if (mode === "config" && kw(tk[0], "enable", 2)) {
			if (kw(tk[1], "secret", 2) || kw(tk[1], "password", 2)) {
				if (neg) d.secret = "";
				else if (!tk[2]) incomplete();
				else d.secret = tk[2];
			} else invalidAt((neg ? 1 : 0) + 1);
		} else if (mode === "config" && kw(tk[0], "ip", 2) && kw(tk[1], "route", 3)) {
			const [, , net, mask, via, adRaw] = tk;
			const ad = adRaw === undefined ? 1 : Number(adRaw);
			const offset = neg ? 1 : 0;
			if (!net || !mask || !via) incomplete();
			else if (!isIp(net)) invalidAt(offset + 2);
			else if (!isMask(mask)) invalidAt(offset + 3);
			else if (!isIp(via)) invalidAt(offset + 4);
			else if (!(Number.isInteger(ad) && ad >= 1 && ad <= 255)) invalidAt(offset + 5);
			else if (networkOf(net, mask) !== net) invalidAt(offset + 2, "%Inconsistent address and mask");
			else if (neg) d.routes = d.routes.filter((r) => !(r.net === net && r.mask === mask && r.via === via));
			else {
				d.routes = d.routes.filter((r) => !(r.net === net && r.mask === mask && r.via === via));
				d.routes.push({ net, mask, via, ad });
			}
		} else if (mode === "config-router" && kw(tk[0], "router-id", 6)) {
			if (neg) d.ospf.routerId = "";
			else if (!isIp(tk[1])) incomplete();
			else d.ospf.routerId = tk[1];
		} else if (mode === "config-router" && kw(tk[0], "network", 2)) {
			const [, net, wildcard, areaKeyword, area] = tk;
			if (!isIp(net) || !isIp(wildcard) || !kw(areaKeyword, "area", 2) ||
				!(isIp(area) || /^\d+$/.test(area ?? ""))) {
				incomplete();
			} else {
				const entry = { net, wildcard, area };
				if (neg) {
					d.ospf.networks = d.ospf.networks.filter((item) => (
						item.net !== net || item.wildcard !== wildcard || item.area !== area
					));
				} else if (!d.ospf.networks.some((item) => (
					item.net === net && item.wildcard === wildcard && item.area === area
				))) {
					d.ospf.networks.push(entry);
				}
			}
		} else if (mode === "config-if" && kw(tk[0], "ip", 2) && kw(tk[1], "address", 3)) {
			const i = d.interfaces[con.iface];
			if (neg) {
				i.ip = "";
				i.mask = "";
			} else if (!tk[2] || !tk[3]) incomplete();
			else if (!isIp(tk[2])) invalidAt((neg ? 1 : 0) + 2);
			else if (!isMask(tk[3])) invalidAt((neg ? 1 : 0) + 3);
			else {
				i.ip = tk[2];
				i.mask = tk[3];
			}
		} else if (mode === "config-if" && d.kind === "router" && kw(tk[0], "ip", 2) &&
			kw(tk[1], "access-group", 6)) {
			const aclId = tk[2];
			const direction = tk[3]?.toLowerCase();
			if (!/^\d+$/.test(aclId ?? "") || !["in", "out"].includes(direction)) incomplete();
			else if (neg) delete d.interfaces[con.iface].accessGroups[direction];
			else d.interfaces[con.iface].accessGroups[direction] = Number(aclId);
		} else if (mode === "config-if" && d.kind === "router" && kw(tk[0], "ip", 2) &&
			kw(tk[1], "ospf", 4) && kw(tk[2], "priority", 4)) {
			const priority = Number(tk[3]);
			if (!Number.isInteger(priority) || priority < 0 || priority > 255) incomplete();
			else d.interfaces[con.iface].ospfPriority = neg ? 1 : priority;
		} else if (mode === "config-if" && kw(tk[0], "ipv6", 4) && kw(tk[1], "address", 3)) {
			const i = d.interfaces[con.iface];
			if (neg) i.ipv6 = "";
			else if (!tk[2]) incomplete();
			else if (!tk[2].includes("/") || !isIpv6(tk[2])) invalidAt((neg ? 1 : 0) + 2);
			else i.ipv6 = tk[2].toLowerCase();
		} else if (mode === "config-if" && kw(tk[0], "shutdown", 2)) {
			const i = d.interfaces[con.iface];
			const name = FULL_NAME(con.iface);
			if (neg && !i.up) {
				i.up = true;
				out.push(`%LINK-5-CHANGED: Interface ${name}, changed state to up`);
				if (ifaceUp(lab, state, devName, con.iface)) out.push(`%LINEPROTO-5-UPDOWN: Line protocol on Interface ${name}, changed state to up`);
			} else if (!neg && i.up) {
				i.up = false;
				out.push(`%LINK-5-CHANGED: Interface ${name}, changed state to administratively down`, `%LINEPROTO-5-UPDOWN: Line protocol on Interface ${name}, changed state to down`);
			}
		} else if (mode === "config-if" && kw(tk[0], "description", 3)) {
			d.interfaces[con.iface].desc = neg ? "" : tk.slice(1).join(" ");
		} else if ((mode === "config-if" || mode === "config-if-range") && d.kind === "switch" && kw(tk[0], "switchport", 6)) {
			const ports = (con.ifaces ?? [con.iface]).map((name) => d.interfaces[name]);
			if (kw(tk[1], "mode", 1) && (kw(tk[2], "access", 2) || kw(tk[2], "trunk", 2))) {
				for (const port of ports) port.switchportMode = neg ? "dynamic" : kw(tk[2], "trunk", 2) ? "trunk" : "access";
			} else if (kw(tk[1], "access", 2) && kw(tk[2], "vlan", 2)) {
				const vlanId = Number(tk[3]);
				if (!Number.isInteger(vlanId) || vlanId < 1 || vlanId > 4094) incomplete();
				else for (const port of ports) port.accessVlan = neg ? undefined : vlanId;
			} else if (kw(tk[1], "voice", 2) && kw(tk[2], "vlan", 2)) {
				const vlanId = Number(tk[3]);
				if (!Number.isInteger(vlanId) || vlanId < 1 || vlanId > 4094) incomplete();
				else for (const port of ports) port.voiceVlan = neg ? undefined : vlanId;
			} else if (kw(tk[1], "trunk", 2) && kw(tk[2], "native", 2) && kw(tk[3], "vlan", 2)) {
				const vlanId = Number(tk[4]);
				if (!Number.isInteger(vlanId) || vlanId < 1 || vlanId > 4094) incomplete();
				else for (const port of ports) port.trunkNativeVlan = neg ? 1 : vlanId;
			} else if (kw(tk[1], "trunk", 2) && kw(tk[2], "allowed", 2) && kw(tk[3], "vlan", 2)) {
				const allowed = (tk[4] ?? "").split(",").map(Number);
				if (!tk[4] || allowed.some((vlanId) => !Number.isInteger(vlanId) || vlanId < 1 || vlanId > 4094)) incomplete();
				else for (const port of ports) port.trunkAllowedVlans = neg ? undefined : allowed;
			} else invalidAt((neg ? 1 : 0) + 2);
		} else if ((mode === "config-if" || mode === "config-if-range") && d.kind === "switch" && kw(tk[0], "channel-group", 7)) {
			const channelGroup = Number(tk[1]);
			const lacpMode = tk[3]?.toLowerCase();
			if (!Number.isInteger(channelGroup) || channelGroup < 1 || channelGroup > 4096 || !kw(tk[2], "mode", 2) || !["active", "passive"].includes(lacpMode)) {
				incomplete();
			} else {
				for (const name of con.ifaces ?? [con.iface]) {
					d.interfaces[name].portChannel = neg ? undefined : channelGroup;
					d.interfaces[name].lacpMode = neg ? undefined : lacpMode;
				}
			}
		} else if ((mode === "config-if" || mode === "config-if-range") && d.kind === "switch" && kw(tk[0], "lldp", 2)) {
			const ports = (con.ifaces ?? [con.iface]).map((name) => d.interfaces[name]);
			if (kw(tk[1], "transmit", 2)) for (const port of ports) port.lldpTransmit = !neg;
			else if (kw(tk[1], "receive", 2)) for (const port of ports) port.lldpReceive = !neg;
			else invalidAt((neg ? 1 : 0) + 2);
		} else if ((mode === "config-if" || mode === "config-if-range") && d.kind === "switch" && kw(tk[0], "cdp", 2) && kw(tk[1], "enable", 2)) {
			for (const name of con.ifaces ?? [con.iface]) d.interfaces[name].cdpEnabled = !neg;
		} else {
			const offset = neg ? 1 : 0;
			const errorToken = kw(tk[0], "ip", 2) || kw(tk[0], "enable", 2)
				? offset + 1
				: offset;
			invalidAt(errorToken);
		}
	}
	return { state, out };
}
