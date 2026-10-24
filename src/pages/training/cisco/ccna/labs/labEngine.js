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

const FULL_NAME = (ifName) => {
	if (ifName.startsWith("g")) return `GigabitEthernet${ifName.slice(1)}`;
	if (ifName.startsWith("lo")) return `Loopback${ifName.slice(2)}`;
	if (ifName.startsWith("fa")) return `FastEthernet${ifName.slice(2)}`;
	return ifName;
};
export const fullIfName = FULL_NAME;

// ---------- lab state ----------
export function createLabState(lab) {
	const devices = structuredClone(lab.devices);
	for (const d of Object.values(devices)) {
		d.routes = d.routes || [];
		d.secret = d.secret || "";
		d.startup = null;
		for (const i of Object.values(d.interfaces)) {
			i.ip = i.ip || "";
			i.mask = i.mask || "";
			i.up = d.kind === "pc" || d.kind === "switch" ? true : Boolean(i.up);
			i.desc = i.desc || "";
		}
	}
	const consoles = {};
	for (const name of lab.editable) consoles[name] = { mode: "user", iface: null };
	return { devices, consoles, initial: Object.fromEntries(lab.editable.map((n) => [n, signature(devices[n])])) };
}

export function signature(d) {
	return JSON.stringify({ h: d.hostname, s: d.secret, i: d.interfaces, r: d.routes });
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

/* Walk the packet hop by hop. Returns { ok, hops: [next-hop IPs], dev, firstOutIf } */
export function forward(lab, state, srcDev, dstIp) {
	let cur = srcDev;
	const hops = [];
	let firstOutIf = null;
	let pendingNextIp = dstIp;
	for (let ttl = 0; ttl < 16; ttl++) {
		if (owns(lab, state, cur, dstIp)) return { ok: true, hops, dev: cur, firstOutIf };
		const d = state.devices[cur];
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
		pendingNextIp = nextIp;
		const p = peerOf(lab, cur, outIf);
		const peerIf = p && state.devices[p.dev]?.interfaces[p.ifName];
		const isSwitchPeer = p && state.devices[p.dev]?.kind === "switch";
		if (!p || !peerIf || (!isSwitchPeer && peerIf.ip !== nextIp) || !ifaceUp(lab, state, p.dev, p.ifName)) {
			return { ok: false, hops, reason: "unreachable", dev: cur };
		}
		hops.push(nextIp);
		cur = p.dev;
	}
	return { ok: false, hops, reason: "loop" };
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

// ---------- show commands ----------
export function runningConfig(d) {
	const lines = ["Building configuration...", "", "Current configuration : 1342 bytes", "!", "version 15.4", "!", `hostname ${d.hostname}`, "!"];
	if (d.secret) lines.push("enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0", "!");
	for (const [ifName, i] of Object.entries(d.interfaces)) {
		lines.push(`interface ${FULL_NAME(ifName)}`);
		if (i.desc) lines.push(` description ${i.desc}`);
		lines.push(i.ip ? ` ip address ${i.ip} ${i.mask}` : " no ip address");
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
	for (const [ifName, i] of Object.entries(d.interfaces)) {
		if (!i.ip) continue;
		out.push(`interface ${ifName}`, ` ip address ${i.ip} ${i.mask}`);
		if (i.up || ifName.startsWith("lo")) out.push(" no shutdown");
	}
	out.push("exit");
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
	let m = joined.match(/^g(?:i(?:g(?:a(?:b(?:i(?:t(?:e(?:t(?:h(?:e(?:r(?:n(?:e(?:t)?)?)?)?)?)?)?)?)?)?)?)?)?)?0\/(\d)$/);
	if (m && device.interfaces[`g0/${m[1]}`]) return `g0/${m[1]}`;
	m = joined.match(/^lo(?:o(?:p(?:b(?:a(?:c(?:k)?)?)?)?)?)?(\d)$/);
	if (m && device.interfaces[`lo${m[1]}`]) return `lo${m[1]}`;
	return null;
}

const HELP = {
	user: ["enable           Turn on privileged commands", "ping             Send echo messages", "show             Show running system information", "traceroute       Trace route to destination"],
	priv: ["configure        Enter configuration mode", "copy             Copy from one file to another", "disable          Turn off privileged commands", "ping             Send echo messages", "show             Show running system information", "traceroute       Trace route to destination", "write            Write running configuration to memory"],
	config: ["do               Run an exec-level command", "enable           Modify enable password parameters", "end              Exit to privileged mode", "exit             Exit from configure mode", "hostname         Set system's network name", "interface        Select an interface to configure", "ip               Global IP configuration subcommands (ip route)", "no               Negate a command"],
	"config-if": ["description      Interface specific description", "do               Run an exec-level command", "end              Exit to privileged mode", "exit             Exit from interface configuration mode", "ip               Interface IP config commands (ip address)", "no               Negate a command", "shutdown         Shutdown the selected interface"],
};

export function promptFor(state, devName) {
	const h = state.devices[devName].hostname;
	const mode = state.consoles[devName].mode;
	return { user: `${h}>`, priv: `${h}#`, config: `${h}(config)#`, "config-if": `${h}(config-if)#` }[mode];
}

/* Run one CLI line on a device. Returns the new state and output lines. */
export function execute(lab, prev, devName, line) {
	const state = structuredClone(prev);
	const d = state.devices[devName];
	const con = state.consoles[devName];
	const out = [];
	const t = line.trim().split(/\s+/).filter(Boolean);
	const invalid = () => out.push("% Invalid input detected at '^' marker.");
	const incomplete = () => out.push("% Incomplete command.");
	if (t.length === 0) return { state, out };
	if (t[0] === "?" || t[t.length - 1] === "?") return { state, out: HELP[con.mode] };

	const exec = (tk, privileged) => {
		if (kw(tk[0], "ping", 1)) {
			if (!tk[1]) return incomplete();
			if (!isIp(tk[1])) return out.push("% Unrecognized host or address, or protocol not running.");
			const ok = canReach(lab, state, devName, tk[1]);
			return out.push("Type escape sequence to abort.", `Sending 5, 100-byte ICMP Echos to ${tk[1]}, timeout is 2 seconds:`, ok ? "!!!!!" : ".....", ok ? "Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms" : "Success rate is 0 percent (0/5)");
		}
		if (kw(tk[0], "traceroute", 4)) {
			if (!tk[1] || !isIp(tk[1])) return incomplete();
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
			if (kw(tk[1], "ip", 2) && kw(tk[2], "interface", 3) && kw(tk[3], "brief", 2)) return out.push(...showIpIntBrief(lab, state, devName));
			if (kw(tk[1], "ip", 2) && kw(tk[2], "route", 2)) return out.push(...showIpRoute(lab, state, devName));
			return invalid();
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
		if (kw(t[0], "configure", 4) && (!t[1] || kw(t[1], "terminal", 1))) {
			con.mode = "config";
			out.push("Enter configuration commands, one per line.  End with CNTL/Z.");
		} else if (kw(t[0], "disable", 4) || kw(t[0], "exit", 2)) con.mode = "user";
		else exec(t, true);
	} else {
		const neg = kw(t[0], "no", 2);
		const tk = neg ? t.slice(1) : t;
		if (kw(t[0], "do", 2)) exec(t.slice(1), true);
		else if (kw(t[0], "end", 2)) {
			con.mode = "priv";
			con.iface = null;
		} else if (kw(t[0], "exit", 2)) {
			if (mode === "config-if") {
				con.mode = "config";
				con.iface = null;
			} else con.mode = "priv";
		} else if (kw(tk[0], "interface", 3)) {
			const name = parseIface(tk.slice(1), d);
			if (!tk[1]) incomplete();
			else if (!name) invalid();
			else {
				con.mode = "config-if";
				con.iface = name;
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
			} else invalid();
		} else if (mode === "config" && kw(tk[0], "ip", 2) && kw(tk[1], "route", 3)) {
			const [, , net, mask, via, adRaw] = tk;
			const ad = adRaw === undefined ? 1 : Number(adRaw);
			if (!net || !mask || !via) incomplete();
			else if (!isIp(net) || !isMask(mask) || !isIp(via) || !(Number.isInteger(ad) && ad >= 1 && ad <= 255)) invalid();
			else if (networkOf(net, mask) !== net) out.push("%Inconsistent address and mask");
			else if (neg) d.routes = d.routes.filter((r) => !(r.net === net && r.mask === mask && r.via === via));
			else {
				d.routes = d.routes.filter((r) => !(r.net === net && r.mask === mask && r.via === via));
				d.routes.push({ net, mask, via, ad });
			}
		} else if (mode === "config-if" && kw(tk[0], "ip", 2) && kw(tk[1], "address", 3)) {
			const i = d.interfaces[con.iface];
			if (neg) {
				i.ip = "";
				i.mask = "";
			} else if (!tk[2] || !tk[3]) incomplete();
			else if (!isIp(tk[2]) || !isMask(tk[3])) invalid();
			else {
				i.ip = tk[2];
				i.mask = tk[3];
			}
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
		} else invalid();
	}
	return { state, out };
}
