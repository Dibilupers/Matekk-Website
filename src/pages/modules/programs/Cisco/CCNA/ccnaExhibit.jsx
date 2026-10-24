import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import { PcIcon, RouterIcon, SwitchIcon } from "../../../../training/cisco/ccna/labs/LabTopology";

/* Exam exhibits (router output and pictures). Each one can open full screen, where it starts zoomed
   to fit the screen and can be zoomed by touch: pinch with two fingers, drag with one, double-tap to
   switch between "fit" and "zoomed in". On a PC, trackpad pinch / Ctrl + mouse wheel zooms too. */

const MAX_ZOOM = 4;

/* Full-screen, touch-zoomable view of any content (a terminal printout or a picture). */
function ZoomViewer({ title, theme, onClose, children }) {
	const scrollerRef = useRef(null);
	const contentRef = useRef(null);
	const [natural, setNatural] = useState(null); // content size at 100%
	const [fit, setFit] = useState(1);
	const [scale, setScale] = useState(1);
	const pinch = useRef(null);
	const lastTap = useRef(0);

	useEffect(() => {
		const onKey = (event) => { if (event.key === "Escape") onClose(); };
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", onKey);
		};
	}, [onClose]);

	// Measure the content once it has rendered (pictures: once loaded), then start "fit to screen"
	const measure = useCallback(() => {
		const content = contentRef.current;
		const scroller = scrollerRef.current;
		if (!content || !scroller) return;
		const width = content.scrollWidth;
		const height = content.scrollHeight;
		if (!width || !height) return;
		const availableWidth = Math.max(1, scroller.clientWidth - 24);
		const availableHeight = Math.max(1, scroller.clientHeight - 24);
		const fitScale = Math.min(1, availableWidth / width, availableHeight / height);
		setNatural({ width, height });
		setFit(fitScale);
		setScale(fitScale);
	}, []);
	useLayoutEffect(() => {
		measure();
		const content = contentRef.current;
		content?.querySelectorAll("img").forEach((img) => { if (!img.complete) img.addEventListener("load", measure, { once: true }); });
	}, [measure]);

	// Zoom while keeping the point under the fingers / cursor in place
	const zoomTo = useCallback((nextScale, clientX, clientY) => {
		const scroller = scrollerRef.current;
		if (!scroller) return;
		const clamped = Math.min(MAX_ZOOM, Math.max(fit * 0.75, nextScale));
		setScale((current) => {
			const rect = scroller.getBoundingClientRect();
			const x = (clientX ?? rect.left + rect.width / 2) - rect.left;
			const y = (clientY ?? rect.top + rect.height / 2) - rect.top;
			const contentX = (scroller.scrollLeft + x) / current;
			const contentY = (scroller.scrollTop + y) / current;
			requestAnimationFrame(() => {
				scroller.scrollLeft = contentX * clamped - x;
				scroller.scrollTop = contentY * clamped - y;
			});
			return clamped;
		});
	}, [fit]);

	// Two-finger pinch (we handle it ourselves so the whole page doesn't zoom)
	useEffect(() => {
		const scroller = scrollerRef.current;
		if (!scroller) return undefined;
		const distance = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
		const center = (t) => [(t[0].clientX + t[1].clientX) / 2, (t[0].clientY + t[1].clientY) / 2];
		const onStart = (event) => {
			if (event.touches.length === 2) {
				pinch.current = { distance: distance(event.touches), scale: null };
			} else if (event.touches.length === 1) {
				// Double-tap: toggle between "fit" and 2.5x (zoomed in at the tapped spot)
				const now = Date.now();
				if (now - lastTap.current < 300) {
					event.preventDefault();
					const { clientX, clientY } = event.touches[0];
					setScale((current) => {
						const target = current > fit * 1.2 ? fit : Math.min(MAX_ZOOM, fit * 2.5);
						queueMicrotask(() => zoomTo(target, clientX, clientY));
						return current;
					});
					lastTap.current = 0;
				} else {
					lastTap.current = now;
				}
			}
		};
		const onMove = (event) => {
			const activePinch = pinch.current;
			if (event.touches.length !== 2 || !activePinch) return;
			event.preventDefault();
			const [x, y] = center(event.touches);
			setScale((current) => {
				if (pinch.current !== activePinch) return current;
				activePinch.scale ??= current;
				const next = activePinch.scale * (distance(event.touches) / activePinch.distance);
				queueMicrotask(() => {
					if (pinch.current === activePinch) zoomTo(next, x, y);
				});
				return current;
			});
		};
		const onEnd = (event) => { if (event.touches.length < 2) pinch.current = null; };
		// Trackpad pinch on a laptop arrives as Ctrl + wheel
		const onWheel = (event) => {
			if (!event.ctrlKey) return;
			event.preventDefault();
			setScale((current) => {
				queueMicrotask(() => zoomTo(current * Math.exp(-event.deltaY / 200), event.clientX, event.clientY));
				return current;
			});
		};
		scroller.addEventListener("touchstart", onStart, { passive: false });
		scroller.addEventListener("touchmove", onMove, { passive: false });
		scroller.addEventListener("touchend", onEnd);
		scroller.addEventListener("wheel", onWheel, { passive: false });
		return () => {
			scroller.removeEventListener("touchstart", onStart);
			scroller.removeEventListener("touchmove", onMove);
			scroller.removeEventListener("touchend", onEnd);
			scroller.removeEventListener("wheel", onWheel);
		};
	}, [fit, zoomTo]);

	const button = "ccna-term-btn flex h-9 w-9 items-center justify-center rounded-full transition";
	return createPortal(
		<div role="dialog" aria-modal="true" aria-label={title} data-theme={theme} className="ccna-term-screen topology-zoom-in fixed inset-0 z-1000 flex flex-col">
			<div className="ccna-term-bar flex items-center gap-3 px-4 py-2.5">
				<span className="flex gap-1.5" aria-hidden="true">
					<span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
					<span className="h-3 w-3 rounded-full bg-[#febc2e]" />
					<span className="h-3 w-3 rounded-full bg-[#28c840]" />
				</span>
				<p className="min-w-0 flex-1 truncate text-sm font-semibold">{title}</p>
				<span className="ccna-term-hint hidden text-xs sm:inline">Pinch or Ctrl + scroll to zoom</span>
				<button type="button" className={button} onClick={onClose} aria-label="Close full screen"><X size={18} /></button>
			</div>
			<div ref={scrollerRef} className="flex flex-1 overflow-auto overscroll-contain" style={{ touchAction: "pan-x pan-y" }}>
				<div className="m-auto shrink-0 p-3" style={natural ? { width: natural.width * scale + 24, height: natural.height * scale + 24 } : undefined}>
					<div ref={contentRef} className="w-max origin-top-left" style={{ transform: `scale(${scale})` }}>
						{children}
					</div>
				</div>
			</div>
			<p className="ccna-term-bar ccna-term-hint px-4 py-2 text-center text-xs sm:hidden">Pinch to zoom · double-tap to zoom in or out</p>
		</div>,
		document.body,
	);
}

function TerminalBar({ label, onExpand }) {
	return (
		<div className="ccna-term-bar flex items-center gap-2 rounded-t-xl px-3 py-2">
			<span className="flex gap-1.5" aria-hidden="true">
				<span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
				<span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
				<span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
			</span>
			<span className="min-w-0 flex-1 truncate text-xs font-semibold">{label}</span>
			{onExpand && (
				<button
					type="button"
					onClick={onExpand}
					className="ccna-term-btn flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition"
				>
					<Maximize2 size={12} /> Expand
				</button>
			)}
		</div>
	);
}

// The exam page's light/dark setting (the full-screen view opens outside the page, so it's passed along)
const pageTheme = (element) => element?.closest("[data-theme]")?.getAttribute("data-theme") ?? "light";

// The device name for the window title, e.g. "R1" from "R1#show ip route"
function terminalLabel(text) {
	const prompt = /^\s*([\w.-]+)(\([\w-]+\))?#/m.exec(text);
	return prompt ? `${prompt[1]} — Terminal` : "Exhibit";
}

/* Router output / configuration text, shown like a terminal window. */
export function ExhibitText({ text, className = "" }) {
	const boxRef = useRef(null);
	const [overflows, setOverflows] = useState(false);
	const [openTheme, setOpenTheme] = useState(null);
	const wrapRef = useRef(null);
	const label = terminalLabel(text);

	useLayoutEffect(() => {
		const box = boxRef.current;
		if (!box) return undefined;
		const check = () => setOverflows(box.scrollWidth > box.clientWidth + 2 || box.scrollHeight > box.clientHeight + 2);
		check();
		const observer = new ResizeObserver(check);
		observer.observe(box);
		return () => observer.disconnect();
	}, [text]);

	return (
		<div ref={wrapRef} className={`ccna-term relative left-1/2 w-[min(80rem,calc(100vw_-_2rem))] max-w-none -translate-x-1/2 overflow-hidden rounded-xl shadow-sm lg:left-auto lg:w-full lg:translate-x-0 ${className}`}>
			<TerminalBar label={label} onExpand={overflows ? () => setOpenTheme(pageTheme(wrapRef.current)) : null} />
			<pre ref={boxRef} aria-label="Exhibit" className="max-h-96 overflow-x-hidden overflow-y-auto whitespace-pre-wrap break-words p-4 text-xs leading-5 [overflow-wrap:anywhere] sm:text-[13px]"><code>{text}</code></pre>
			{openTheme && (
				<ZoomViewer title={label} theme={openTheme} onClose={() => setOpenTheme(null)}>
					<pre className="ccna-term rounded-lg border-0 p-4 font-mono text-[14px] leading-[1.6] whitespace-pre-wrap break-words [overflow-wrap:anywhere]"><code>{text}</code></pre>
				</ZoomViewer>
			)}
		</div>
	);
}

function TopologyNode({ role, name, details }) {
	return (
		<div className="min-w-0 rounded-xl border border-[#d6e5e7] bg-white px-3 py-3 text-center shadow-sm">
			<p className="text-[11px] font-bold uppercase tracking-wide text-[#70809a]">{role}</p>
			<p className="mt-1 font-bold text-[#17324a]">{name}</p>
			<p className="mt-1 whitespace-pre-line text-xs leading-5 text-[#526584]">{details}</p>
		</div>
	);
}

const NETWORK_TOPOLOGIES = {
	"ipv6-block-r1-r2": {
		title: "IPv6 block and access LANs",
		note: "Address block: 2001:0db8:fff:fcf3::/64",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 260, y: 175, details: ["GigabitEthernet0/0"] },
			{ id: "r2", kind: "router", name: "R2", x: 740, y: 175, details: ["GigabitEthernet0/0"] },
			{ id: "sw1", kind: "switch", name: "Access switch", x: 260, y: 340 },
			{ id: "sw2", kind: "switch", name: "Access switch", x: 740, y: 340 },
			{ id: "lan1", kind: "network", name: "Site 1 LAN", x: 260, y: 470, details: ["3 end devices"] },
			{ id: "lan2", kind: "network", name: "Site 2 LAN", x: 740, y: 470, details: ["3 end devices"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "GigabitEthernet0/1", labelX: 500, labelY: 145 },
			{ from: "r1", to: "sw1", label: "GigabitEthernet0/0", labelX: 335, labelY: 275 },
			{ from: "r2", to: "sw2", label: "GigabitEthernet0/0", labelX: 665, labelY: 275 },
			{ from: "sw1", to: "lan1" },
			{ from: "sw2", to: "lan2" },
		],
	},
	"ipv6-dhcpv6-lan": {
		title: "IPv6 DHCPv6 server and workstation networks",
		note: "Server LAN: 2001:DB8:D8D2:100::/64 · Workstation LAN: 2001:DB8:D8D2:1009::/64",
		viewBox: { x: 80, y: 0, width: 840, height: 440 },
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 95 },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 95 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 280, y: 225 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 720, y: 225 },
			{ id: "file", kind: "host", name: "File Server", x: 180, y: 350, details: ["Port .3"] },
			{ id: "dhcp", kind: "host", name: "DHCPv6 Server", x: 380, y: 350, details: ["Port .4"] },
			{ id: "pc1", kind: "host", name: "Workstation", x: 620, y: 350 },
			{ id: "pc2", kind: "host", name: "Workstation", x: 820, y: 350 },
		],
		links: [
			{ from: "r1", to: "r2", label: "G0/0 ↔ G0/0", labelX: 500, labelY: 57 },
			{ from: "r1", to: "sw1", label: "LAN", labelX: 320, labelY: 165 },
			{ from: "r2", to: "sw2", label: "LAN", labelX: 680, labelY: 165 },
			{ from: "sw1", to: "file", label: ".3", labelX: 205, labelY: 300 },
			{ from: "sw1", to: "dhcp", label: ".4", labelX: 390, labelY: 300 },
			{ from: "sw2", to: "pc1" },
			{ from: "sw2", to: "pc2" },
		],
	},
	"sales-vlan10": {
		title: "Sales VLAN 10 switch topology",
		note: "Sales-SW connects four hosts in VLAN 10.",
		nodes: [
			{ id: "sw", kind: "switch", name: "Sales-SW", x: 500, y: 150 },
			{ id: "sales1", kind: "host", name: "Sales-1", x: 170, y: 390 },
			{ id: "sales2", kind: "host", name: "Sales-2", x: 390, y: 390 },
			{ id: "sales3", kind: "host", name: "Sales-3", x: 610, y: 390 },
			{ id: "sales4", kind: "host", name: "Sales-4", x: 830, y: 390 },
		],
		links: [
			{ from: "sw", to: "sales1", label: "Gi1/0/1", labelX: 290, labelY: 265 },
			{ from: "sw", to: "sales2", label: "Gi1/0/2", labelX: 430, labelY: 265 },
			{ from: "sw", to: "sales3", label: "Gi1/0/3", labelX: 570, labelY: 265 },
			{ from: "sw", to: "sales4", label: "Gi1/0/4", labelX: 710, labelY: 265 },
		],
	},
	"etherchannel-group1": {
		title: "EtherChannel group 1",
		note: "Two parallel links form one logical LACP channel.",
		nodes: [
			{ id: "a", kind: "switch", name: "Switch A", x: 260, y: 190 },
			{ id: "b", kind: "switch", name: "Switch B", x: 740, y: 190 },
			{ id: "hosts-a", kind: "network", name: "Host group", x: 260, y: 425 },
			{ id: "hosts-b", kind: "network", name: "Host group", x: 740, y: 425 },
		],
		links: [
			{ from: "a", to: "b", label: "Group 1 · LACP", labelX: 500, labelY: 140, offset: -13 },
			{ from: "a", to: "b", label: "Gi0/0/0–Gi0/0/15", labelX: 500, labelY: 265, offset: 13 },
			{ from: "a", to: "hosts-a" },
			{ from: "b", to: "hosts-b" },
		],
	},
	"r4-supernet": {
		title: "R4 network and endpoint",
		note: "The exhibit identifies the 10.7.54.0 network.",
		nodes: [
			{ id: "r4", kind: "router", name: "R4", x: 180, y: 285 },
			{ id: "sw", kind: "switch", name: "Access switch", x: 500, y: 285 },
			{ id: "host", kind: "host", name: "Endpoint", x: 820, y: 285 },
		],
		links: [
			{ from: "r4", to: "sw", label: "10.7.54.0/x", labelX: 340, labelY: 230 },
			{ from: "sw", to: "host" },
		],
	},
	"lobby-port-security": {
		title: "Lobby conference-room access",
		note: "The 802.1Q trunk carries VLANs 1, 100, 101, 102, and 103.",
		nodes: [
			{ id: "sw1", kind: "switch", name: "SW1", x: 260, y: 190 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 740, y: 190 },
			{ id: "pc1", kind: "host", name: "PC1", x: 260, y: 430, details: ["VLAN 100", "MAC 0000.abcd.0004"] },
		],
		links: [
			{ from: "sw1", to: "sw2", label: "Gi0/1 · 802.1Q trunk · VLANs 1, 100–103", labelX: 500, labelY: 145 },
			{ from: "sw1", to: "pc1", label: "Gi1/0/15 · access port", labelX: 370, labelY: 315 },
		],
	},
	"routers-abc-ospf-dr": {
		title: "OSPF area 0 broadcast network",
		note: "Routers A, B, and C share the 10.0.0.0/24 segment.",
		height: 620,
		nodes: [
			{ id: "a", kind: "router", name: "Router A", x: 250, y: 160, details: ["10.10.10.1"] },
			{ id: "b", kind: "router", name: "Router B", x: 750, y: 160, details: ["10.10.10.2"] },
			{ id: "sw", kind: "switch", name: "Shared segment", x: 500, y: 335, details: ["OSPF area 0"] },
			{ id: "c", kind: "router", name: "Router C", x: 500, y: 500, details: ["10.10.10.3"] },
		],
		links: [
			{ from: "a", to: "sw", label: "Fa0/0", labelX: 350, labelY: 245 },
			{ from: "b", to: "sw", label: "Fa0/0", labelX: 650, labelY: 245 },
			{ from: "c", to: "sw", label: "Fa0/1", labelX: 560, labelY: 425 },
		],
	},
	"router1-host-a": {
		title: "Router 1 route to Host A",
		note: "Host A: 10.10.13.214",
		nodes: [
			{ id: "internet", kind: "network", name: "Internet", x: 180, y: 130 },
			{ id: "mpls", kind: "network", name: "MPLS", x: 180, y: 420 },
			{ id: "r1", kind: "router", name: "Router 1", x: 430, y: 275 },
			{ id: "sw", kind: "switch", name: "Switch 1", x: 700, y: 275 },
			{ id: "host", kind: "host", name: "Host A", x: 900, y: 275 },
		],
		links: [
			{ from: "internet", to: "r1", label: "10.10.11.0/30", labelX: 310, labelY: 170 },
			{ from: "mpls", to: "r1", label: "10.10.12.0/30", labelX: 310, labelY: 385 },
			{ from: "r1", to: "sw", label: "10.10.10.0/28", labelX: 565, labelY: 240 },
			{ from: "sw", to: "host", label: "10.10.13.214", labelX: 800, labelY: 240 },
		],
	},
	"ospf-r1-r2-r3-priority": {
		title: "OSPF shared network and router priorities",
		note: "Shared transit network: 10.0.4.0/24",
		height: 640,
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 230, y: 155, details: ["LAN 10.0.1.0/24"] },
			{ id: "r2", kind: "router", name: "R2", x: 770, y: 155, details: ["LAN 10.0.2.0/24"] },
			{ id: "lan", kind: "network", name: "Shared OSPF LAN", x: 500, y: 330 },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 505, details: ["LAN 10.0.3.0/24"] },
		],
		links: [
			{ from: "r1", to: "lan", label: "Gi0/1 · .1", labelX: 360, labelY: 250 },
			{ from: "r2", to: "lan", label: "Gi0/1 · .2", labelX: 640, labelY: 250 },
			{ from: "r3", to: "lan", label: "Gi0/1 · .3", labelX: 570, labelY: 425 },
		],
	},
	"ospf-drother-r1": {
		title: "OSPF DR election on a shared segment",
		note: "Network 10.0.0.0/24 · OSPF area 0",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 205, details: ["10.10.10.1"] },
			{ id: "sw", kind: "switch", name: "Shared segment", x: 500, y: 205, details: ["Fa0/0 · area 0"] },
			{ id: "r2", kind: "router", name: "R2", x: 750, y: 205, details: ["10.10.10.2"] },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 425, details: ["10.10.10.3"] },
		],
		links: [
			{ from: "r1", to: "sw", label: "Fa0/0", labelX: 375, labelY: 175 },
			{ from: "sw", to: "r2", label: "Fa0/2", labelX: 625, labelY: 175 },
			{ from: "sw", to: "r3", label: "Fa0/1", labelX: 560, labelY: 320 },
		],
	},
	"oldswitch-newswitch-trunk": {
		title: "OldSwitch to NewSwitch trunk",
		note: "VLAN 5, VLAN 10, and native VLAN 15 are shown in the exhibit.",
		nodes: [
			{ id: "old", kind: "switch", name: "OldSwitch", x: 300, y: 210 },
			{ id: "new", kind: "switch", name: "NewSwitch", x: 700, y: 210 },
			{ id: "old-hosts", kind: "network", name: "Connected hosts", x: 300, y: 430, details: ["VLANs 5, 10, and 20"] },
			{ id: "new-hosts", kind: "network", name: "Connected hosts", x: 700, y: 430, details: ["VLANs 5 and 10"] },
		],
		links: [
			{ from: "old", to: "new", label: "Fa0/1 · trunk · native VLAN 15", labelX: 500, labelY: 160 },
			{ from: "old", to: "old-hosts" },
			{ from: "new", to: "new-hosts" },
		],
	},
	"routers-abc-floating-route": {
		title: "Three-router default-route topology",
		note: "Router A's primary default route points to Router B at 192.168.2.2.",
		nodes: [
			{ id: "a", kind: "router", name: "Router A", x: 260, y: 180 },
			{ id: "b", kind: "router", name: "Router B", x: 740, y: 180 },
			{ id: "c", kind: "router", name: "Router C", x: 500, y: 440 },
		],
		links: [
			{ from: "a", to: "b", label: "192.168.2.0/24 · .1 ↔ .2", labelX: 500, labelY: 135 },
			{ from: "a", to: "c", label: "192.168.1.0/24 · .1 ↔ .2", labelX: 320, labelY: 330 },
			{ from: "c", to: "b", label: "192.168.3.0/24 · .1 ↔ .2", labelX: 680, labelY: 330 },
		],
	},
	"eigrp-three-router-pc-server": {
		title: "R1–R2–R3 EIGRP topology",
		note: "PC1, PC2, and the application server use separate /24 LANs; R1–R2 and R2–R3 use /30 links.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 220, y: 120 },
			{ id: "r2", kind: "router", name: "R2", x: 500, y: 120 },
			{ id: "r3", kind: "router", name: "R3", x: 780, y: 120 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 220, y: 300 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 500, y: 300 },
			{ id: "sw3", kind: "switch", name: "SW3", x: 780, y: 300 },
			{ id: "pc1", kind: "host", name: "PC1", x: 220, y: 485, details: ["192.168.10.10"] },
			{ id: "pc2", kind: "host", name: "PC2", x: 500, y: 485, details: ["192.168.20.20"] },
			{ id: "server", kind: "host", name: "Application Server", x: 780, y: 485, details: ["192.168.30.30"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "10.10.10.0/30 · .1 ↔ .2", labelY: 75 },
			{ from: "r2", to: "r3", label: "10.10.10.4/30 · .5 ↔ .6", labelY: 75 },
			{ from: "r1", to: "sw1", label: "192.168.10.0/24", labelX: 295, labelY: 220 },
			{ from: "r2", to: "sw2", label: "192.168.20.0/24", labelX: 575, labelY: 220 },
			{ from: "r3", to: "sw3", label: "192.168.30.0/24", labelX: 855, labelY: 220 },
			{ from: "sw1", to: "pc1" }, { from: "sw2", to: "pc2" }, { from: "sw3", to: "server" },
		],
	},
	"r14-r86-eigrp-floating-route": {
		title: "R14–R86 EIGRP route topology",
		note: "R14 reaches R86 over 10.73.65.64/30; the destination LAN on R86 is 10.80.65.0/29.",
		nodes: [
			{ id: "r14", kind: "router", name: "R14", x: 260, y: 200, details: ["Loopback0 · 10.10.1.14/32"] },
			{ id: "r86", kind: "router", name: "R86", x: 740, y: 200, details: ["Loopback0 · 10.10.1.86/32"] },
			{ id: "lan", kind: "network", name: "10.80.65.0/29", x: 740, y: 455 },
		],
		links: [
			{ from: "r14", to: "r86", label: "10.73.65.64/30 · .65 ↔ .66 · Fa0/0", labelY: 145 },
			{ from: "r86", to: "lan", label: "Fa0/1 · LAN", labelX: 815, labelY: 345 },
		],
	},
	"stp-hq-four-switch": {
		title: "Headquarters spanning-tree topology",
		note: "Four switches connect two HQ hosts across the same LAN.",
		nodes: [
			{ id: "h1", kind: "host", name: "HQ1", x: 300, y: 90 },
			{ id: "h2", kind: "host", name: "HQ2", x: 700, y: 90 },
			{ id: "s1", kind: "switch", name: "Switch 1", x: 300, y: 230 },
			{ id: "s2", kind: "switch", name: "Switch 2", x: 700, y: 230 },
			{ id: "s3", kind: "switch", name: "Switch 3", x: 300, y: 420 },
			{ id: "s4", kind: "switch", name: "Switch 4", x: 700, y: 420 },
		],
		links: [
			{ from: "h1", to: "s1" }, { from: "h1", to: "s2" },
			{ from: "h2", to: "s1" }, { from: "h2", to: "s2" },
			{ from: "s1", to: "s2" }, { from: "s1", to: "s3" },
			{ from: "s2", to: "s4" }, { from: "s3", to: "s4" },
		],
	},
	"stp-branch-four-switch": {
		title: "Branch VLAN 5 spanning-tree topology",
		note: "Four branch switches form a square with 10G links on VLAN 5.",
		nodes: [
			{ id: "b1", kind: "switch", name: "Branch-1", x: 280, y: 150 },
			{ id: "b2", kind: "switch", name: "Branch-2", x: 720, y: 150 },
			{ id: "b3", kind: "switch", name: "Branch-3", x: 280, y: 400 },
			{ id: "b4", kind: "switch", name: "Branch-4", x: 720, y: 400 },
		],
		links: [
			{ from: "b1", to: "b2", label: "10G · VLAN 5", labelY: 115 },
			{ from: "b1", to: "b3", label: "10G", labelX: 235 },
			{ from: "b2", to: "b4", label: "10G", labelX: 765 },
			{ from: "b3", to: "b4", label: "10G · VLAN 5", labelY: 440 },
		],
	},
	"r4-mixed-routing": {
		title: "R4 mixed-protocol routing topology",
		note: "R4 connects to R1 with OSPF, R2 with BGP, and R3 with EIGRP; the server is 10.10.10.10.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 520, y: 95, details: ["OSPF area 20"] },
			{ id: "r4", kind: "router", name: "R4", x: 330, y: 280, details: ["BGP AS 65513"] },
			{ id: "r2", kind: "router", name: "R2", x: 650, y: 280, details: ["BGP AS 65512"] },
			{ id: "r3", kind: "router", name: "R3", x: 520, y: 470, details: ["EIGRP 4444"] },
			{ id: "lan", kind: "switch", name: "Server LAN", x: 830, y: 280 },
			{ id: "server", kind: "host", name: "10.10.10.10", x: 920, y: 420 },
		],
		links: [
			{ from: "r4", to: "r1", label: "OSPF area 20", labelX: 410, labelY: 170 },
			{ from: "r4", to: "r2", label: "BGP", labelY: 245 },
			{ from: "r4", to: "r3", label: "EIGRP 777", labelX: 410, labelY: 395 },
			{ from: "r1", to: "lan" }, { from: "r2", to: "lan" }, { from: "lan", to: "server" },
		],
	},
	"ospf-dr-three-router": {
		title: "OSPF DR election topology",
		note: "Routers A, B, and C share an Ethernet transit network.",
		nodes: [
			{ id: "a", kind: "router", name: "Router A", x: 260, y: 170 },
			{ id: "b", kind: "router", name: "Router B", x: 740, y: 170 },
			{ id: "c", kind: "router", name: "Router C", x: 500, y: 430 },
		],
		links: [
			{ from: "a", to: "b", label: "192.168.2.0/24 · .1 ↔ .2", labelY: 120 },
			{ from: "a", to: "c", label: "192.168.1.0/24 · .1 ↔ .2", labelX: 310, labelY: 320 },
			{ from: "c", to: "b", label: "192.168.3.0/24 · .1 ↔ .2", labelX: 690, labelY: 320 },
		],
	},
	"backup-route-r1-r2-r3": {
		title: "OSPF primary and backup-route topology",
		note: "R1 reaches R2 and R3 through OSPF area 20; the R2–R3 LAN is 192.168.20.0/24.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 110 },
			{ id: "r2", kind: "router", name: "R2", x: 230, y: 420 },
			{ id: "r3", kind: "router", name: "R3", x: 770, y: 420 },
		],
		links: [
			{ from: "r1", to: "r2", label: "192.168.10.0/24", labelX: 315, labelY: 245 },
			{ from: "r1", to: "r3", label: "192.168.30.0/24", labelX: 685, labelY: 245 },
			{ from: "r2", to: "r3", label: "192.168.20.0/24", labelY: 470 },
		],
	},
	"ospf-point-to-point-r1-r2": {
		title: "R1–R2 OSPF point-to-point topology",
		note: "Transit network 10.0.0.0/30; R1 and R2 each connect to a /24 LAN.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 170 },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 170 },
			{ id: "lan1", kind: "network", name: "10.0.1.0/24", x: 280, y: 425 },
			{ id: "lan2", kind: "network", name: "10.0.2.0/24", x: 720, y: 425 },
		],
		links: [
			{ from: "r1", to: "r2", label: "Se0/1 · 10.0.0.0/30 · Se0/1", labelY: 125 },
			{ from: "r1", to: "lan1", label: "Gi0/1", labelX: 340, labelY: 300 },
			{ from: "r2", to: "lan2", label: "Gi0/1", labelX: 660, labelY: 300 },
		],
	},
	"ospf-two-site-workstations": {
		title: "R1–R2 OSPF workstation networks",
		note: "R1 and R2 share 10.0.0.0/30 and each serves a workstation LAN.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 120 },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 120 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 280, y: 280 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 720, y: 280 },
			{ id: "lan1", kind: "network", name: "Workstations", x: 280, y: 465, details: ["10.0.1.0/24"] },
			{ id: "lan2", kind: "network", name: "Workstations", x: 720, y: 465, details: ["10.0.2.0/24"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "10.0.0.0/30", labelY: 78 },
			{ from: "r1", to: "sw1", label: "Gi0/0", labelX: 340, labelY: 210 },
			{ from: "r2", to: "sw2", label: "Gi0/0", labelX: 660, labelY: 210 },
			{ from: "sw1", to: "lan1" }, { from: "sw2", to: "lan2" },
		],
	},
	"new-vlan-trunk": {
		title: "VLAN 104 trunk topology",
		note: "Add VLAN 104 to the existing 802.1Q trunk carrying VLANs 1 and 100–103.",
		nodes: [
			{ id: "sw1", kind: "switch", name: "SW1", x: 250, y: 270 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 750, y: 270 },
		],
		links: [
			{ from: "sw1", to: "sw2", label: "VLANs 1, 100–103 · 802.1Q · add VLAN 104", labelY: 220 },
		],
	},
	"sw1-sw2-dtp-trunk": {
		title: "SW1–SW2 DTP trunk topology",
		note: "SW1 Gi1/1 is connected to SW2 Gi1/1. The link carries VLANs 2–20 and SW1 must passively negotiate a trunk.",
		nodes: [
			{ id: "sw1", kind: "switch", name: "SW1", x: 260, y: 250 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 740, y: 250 },
		],
		links: [
			{ from: "sw1", to: "sw2", label: "Gi1/1 ↔ Gi1/1 · trunk · VLANs 2–20", labelY: 200 },
		],
	},
	"printer-switch-dtp": {
		title: "Printer and DTP switch topology",
		note: "SW1 connects the printer to SW2; SW2 uses dynamic trunk negotiation on the inter-switch link.",
		nodes: [
			{ id: "printer", kind: "host", name: "Printer", x: 140, y: 290 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 380, y: 290 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 680, y: 290 },
			{ id: "lan", kind: "network", name: "LAN", x: 900, y: 290 },
		],
		links: [
			{ from: "printer", to: "sw1", label: "Ethernet1/1", labelY: 250 },
			{ from: "sw1", to: "sw2", label: "Ethernet0/2 · Ethernet0/2", labelY: 245 },
			{ from: "sw2", to: "lan" },
		],
	},
	"host-switch-mac-table": {
		title: "Host-to-switch MAC learning topology",
		note: "Hosts A–D connect to the access switch on FastEthernet0/1–0/4.",
		nodes: [
			{ id: "sw", kind: "switch", name: "Switch A", x: 500, y: 150 },
			{ id: "a", kind: "host", name: "Host A", x: 170, y: 410 },
			{ id: "b", kind: "host", name: "Host B", x: 390, y: 410 },
			{ id: "c", kind: "host", name: "Host C", x: 610, y: 410 },
			{ id: "d", kind: "host", name: "Host D", x: 830, y: 410 },
		],
		links: [
			{ from: "sw", to: "a", label: "Fa0/1", labelX: 300, labelY: 285 },
			{ from: "sw", to: "b", label: "Fa0/2", labelX: 430, labelY: 285 },
			{ from: "sw", to: "c", label: "Fa0/3", labelX: 570, labelY: 285 },
			{ from: "sw", to: "d", label: "Fa0/4", labelX: 700, labelY: 285 },
		],
	},
	"phone-pc-access-vlan": {
		title: "IP phone and PC access-port topology",
		note: "The switch access port carries data VLAN 15 and voice VLAN 10 to the IP phone and PC.",
		nodes: [
			{ id: "sw", kind: "switch", name: "SW", x: 500, y: 150 },
			{ id: "phone", kind: "network", name: "IP phone", x: 500, y: 330 },
			{ id: "pc", kind: "host", name: "PC", x: 500, y: 500 },
		],
		links: [
			{ from: "sw", to: "phone", label: "Data VLAN 15 · Voice VLAN 10", labelY: 245 },
			{ from: "phone", to: "pc" },
		],
	},
	"two-router-four-pc-macs": {
		title: "Two-router workstation topology",
		note: "R1 and R2 connect two access switches and four PCs on the 10.0.1.0/24 LAN.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 120 },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 120 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 280, y: 300 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 720, y: 300 },
			{ id: "pc1", kind: "host", name: "PC1", x: 180, y: 485 },
			{ id: "pc2", kind: "host", name: "PC2", x: 380, y: 485 },
			{ id: "pc3", kind: "host", name: "PC3", x: 620, y: 485 },
			{ id: "pc4", kind: "host", name: "PC4", x: 820, y: 485 },
		],
		links: [
			{ from: "r1", to: "r2", label: "10.0.0.0/30", labelY: 75 },
			{ from: "r1", to: "sw1", label: "Gi0/1", labelX: 335, labelY: 225 },
			{ from: "r2", to: "sw2", label: "Gi0/1", labelX: 665, labelY: 225 },
			{ from: "sw1", to: "pc1", label: "Gi0/2" }, { from: "sw1", to: "pc2", label: "Gi0/3" },
			{ from: "sw2", to: "pc3", label: "Gi0/2" }, { from: "sw2", to: "pc4", label: "Gi0/3" },
		],
	},
	"voice-vlan-two-switch": {
		title: "Voice and data VLAN topology",
		note: "Switch A and Switch B provide data VLAN 50 and voice VLAN 51 to IP phones and PCs.",
		nodes: [
			{ id: "a", kind: "switch", name: "Switch A", x: 280, y: 170 },
			{ id: "b", kind: "switch", name: "Switch B", x: 720, y: 170 },
			{ id: "phonea", kind: "host", name: "PC A", x: 280, y: 350, details: ["IP phone"] },
			{ id: "phoneb", kind: "host", name: "PC B", x: 720, y: 350, details: ["IP phone"] },
		],
		links: [
			{ from: "a", to: "b", label: "Data VLAN 50 · Voice VLAN 51", labelY: 125 },
			{ from: "a", to: "phonea", label: "Gi0/1", labelX: 335, labelY: 275 },
			{ from: "b", to: "phoneb", label: "Gi0/1", labelX: 665, labelY: 275 },
		],
	},
	"ospf-r1-r2-r3-shared-lan": {
		title: "OSPF shared LAN topology",
		note: "R1, R2, and R3 connect to the same broadcast segment.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 160 },
			{ id: "r2", kind: "router", name: "R2", x: 750, y: 160 },
			{ id: "lan", kind: "switch", name: "Shared LAN", x: 500, y: 320 },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 490 },
		],
		links: [
			{ from: "r1", to: "lan", label: "Fa0/0", labelX: 360, labelY: 235 },
			{ from: "r2", to: "lan", label: "Fa0/2", labelX: 640, labelY: 235 },
			{ from: "r3", to: "lan", label: "Fa0/1", labelX: 565, labelY: 410 },
		],
	},
	"ospf-four-router-election": {
		title: "OSPF DR and BDR election topology",
		note: "Four routers share one OSPF 1 broadcast network; R1 is DR and R3 is BDR.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1 · DR", x: 220, y: 320, details: ["RID 192.168.2.8"] },
			{ id: "r2", kind: "router", name: "R2", x: 500, y: 120, details: ["RID 192.168.2.1"] },
			{ id: "r4", kind: "router", name: "R4", x: 780, y: 320, details: ["RID 192.168.2.4"] },
			{ id: "r3", kind: "router", name: "R3 · BDR", x: 500, y: 520, details: ["RID 192.168.2.6"] },
			{ id: "sw", kind: "switch", name: "OSPF 1", x: 500, y: 320 },
		],
		links: [
			{ from: "r1", to: "sw", label: "Gi0/1", labelX: 360, labelY: 275 },
			{ from: "r2", to: "sw", label: "Gi0/0", labelX: 560, labelY: 215 },
			{ from: "r4", to: "sw", label: "Gi0/1", labelX: 640, labelY: 275 },
			{ from: "r3", to: "sw", label: "Gi0/0", labelX: 560, labelY: 435 },
		],
	},
	"etherchannel-three-switch": {
		title: "Three-switch LACP EtherChannel topology",
		note: "PC1 and the server connect through a three-switch network with Port Channel 1 between SW1 and SW2.",
		nodes: [
			{ id: "pc", kind: "host", name: "PC1", x: 140, y: 160 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 350, y: 180 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 650, y: 180 },
			{ id: "sw3", kind: "switch", name: "SW3", x: 500, y: 440 },
			{ id: "server", kind: "host", name: "Server", x: 860, y: 160 },
		],
		links: [
			{ from: "pc", to: "sw1" },
			{ from: "sw1", to: "sw2", label: "LACP Port Channel 1 · 3 links", labelY: 125 },
			{ from: "sw1", to: "sw3" }, { from: "sw2", to: "sw3" },
			{ from: "sw2", to: "server" },
		],
	},
	"wlan-ap-wlc-network": {
		title: "WLAN access point and controller topology",
		note: "The user WLAN connects through an access point, network cloud, and WLC to VLAN 20 (172.16.10.0/24).",
		nodes: [
			{ id: "client", kind: "host", name: "Wireless client", x: 130, y: 290 },
			{ id: "ap", kind: "network", name: "Access Point", x: 330, y: 290, details: ["SSID USERWL"] },
			{ id: "cloud", kind: "network", name: "Network Cloud", x: 570, y: 290 },
			{ id: "wlc", kind: "network", name: "WLC", x: 820, y: 290, details: ["VLAN 20 · 172.16.10.0/24"] },
		],
		links: [
			{ from: "client", to: "ap" }, { from: "ap", to: "cloud" }, { from: "cloud", to: "wlc" },
		],
	},
	"etherchannel-two-switch-hosts": {
		title: "LACP EtherChannel between two switches",
		note: "Switch A and Switch B are joined by Port Channel 1; host groups connect to both switches.",
		nodes: [
			{ id: "a", kind: "switch", name: "Switch A", x: 280, y: 190 },
			{ id: "b", kind: "switch", name: "Switch B", x: 720, y: 190 },
			{ id: "ha", kind: "host", name: "Hosts", x: 280, y: 430 },
			{ id: "hb", kind: "host", name: "Hosts", x: 720, y: 430 },
		],
		links: [
			{ from: "a", to: "b", label: "Group 1 · Gi0/0/0–Gi0/0/15", labelY: 145 },
			{ from: "a", to: "ha" }, { from: "b", to: "hb" },
		],
	},
	"stp-four-switch-square": {
		title: "Four-switch spanning-tree topology",
		note: "All four MDF-DC switches participate in the same VLAN.",
		nodes: [
			{ id: "s1", kind: "switch", name: "MDF-DC-1", x: 280, y: 150 },
			{ id: "s2", kind: "switch", name: "MDF-DC-2", x: 720, y: 150 },
			{ id: "s3", kind: "switch", name: "MDF-DC-3", x: 280, y: 410 },
			{ id: "s4", kind: "switch", name: "MDF-DC-4", x: 720, y: 410 },
		],
		links: [
			{ from: "s1", to: "s2" }, { from: "s1", to: "s3" },
			{ from: "s2", to: "s4" }, { from: "s3", to: "s4" },
		],
	},
	"switch-link-speed-mismatch": {
		title: "Switch A to Switch B Ethernet link",
		note: "The tested 99-meter (325-foot) Cat5 cable connects access ports with mismatched speed and duplex settings.",
		nodes: [
			{ id: "a", kind: "switch", name: "Switch A", x: 280, y: 280, details: ["Port 1 · 100 Mbps · half duplex"] },
			{ id: "b", kind: "switch", name: "Switch B", x: 720, y: 280, details: ["Port 2 · 10 Mbps · full duplex"] },
		],
		links: [{ from: "a", to: "b", label: "Tested Cat5 cable", labelY: 230 }],
	},
	"ospf-r14-pc10": {
		title: "R14 and R86 OSPF network",
		note: "R14 and R86 share OSPF area 0; PC10 is on the 10.120.10.0/24 LAN.",
		nodes: [
			{ id: "r14", kind: "router", name: "R14", x: 300, y: 210, details: ["Loopback0 · 10.10.1.14/32"] },
			{ id: "r86", kind: "router", name: "R86", x: 700, y: 210, details: ["Loopback0 · 10.10.1.86/32"] },
			{ id: "pc", kind: "host", name: "PC10", x: 300, y: 440, details: ["10.120.10.0/24"] },
			{ id: "lan", kind: "network", name: "10.80.65.0/29", x: 700, y: 440 },
		],
		links: [
			{ from: "r14", to: "r86", label: "OSPF 100 · 10.73.56.0/30", labelY: 165 },
			{ from: "r14", to: "pc", label: "10.120.10.0/24", labelX: 375, labelY: 340 },
			{ from: "r86", to: "lan", label: "10.80.65.0/29", labelX: 775, labelY: 340 },
		],
	},
	"static-route-summary": {
		title: "Static routes advertised into OSPF",
		note: "R1 receives routes from Routers A–D and connects to Router R2 through the OSPF area 1 cloud.",
		nodes: [
			{ id: "a", kind: "router", name: "Router A", x: 180, y: 120, details: ["10.1.40.0/25"] },
			{ id: "b", kind: "router", name: "Router B", x: 180, y: 245, details: ["10.1.40.128/25"] },
			{ id: "c", kind: "router", name: "Router C", x: 180, y: 370, details: ["10.1.30.72/29"] },
			{ id: "d", kind: "router", name: "Router D", x: 180, y: 495, details: ["10.1.12.0/22"] },
			{ id: "r1", kind: "router", name: "R1", x: 520, y: 300 },
			{ id: "isp", kind: "network", name: "ISP Cloud", x: 760, y: 300, details: ["OSPF area 1"] },
			{ id: "r2", kind: "router", name: "R2", x: 950, y: 300 },
		],
		links: [
			{ from: "a", to: "r1" }, { from: "b", to: "r1" }, { from: "c", to: "r1" }, { from: "d", to: "r1" },
			{ from: "r1", to: "isp" }, { from: "isp", to: "r2" },
		],
	},
	"vlan10-three-pc-subnet": {
		title: "VLAN 10 three-PC network",
		note: "A router connects to VLAN 10 on 192.168.0.0/24; three PCs share the access switch.",
		nodes: [
			{ id: "r", kind: "router", name: "Router", x: 180, y: 280 },
			{ id: "sw", kind: "switch", name: "VLAN 10", x: 500, y: 280 },
			{ id: "pc1", kind: "host", name: "PC1", x: 820, y: 120 },
			{ id: "pc2", kind: "host", name: "PC2", x: 820, y: 280 },
			{ id: "pc3", kind: "host", name: "PC3", x: 820, y: 440 },
		],
		links: [
			{ from: "r", to: "sw", label: "192.168.0.0/24", labelY: 235 },
			{ from: "sw", to: "pc1" }, { from: "sw", to: "pc2" }, { from: "sw", to: "pc3" },
		],
	},
	"ospf-three-router-priorities": {
		title: "OSPF four-router priority election",
		note: "Four routers share the segment; the exhibit lists their router IDs and OSPF priorities.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 160, details: ["RID 1.1.1.1 · priority 108"] },
			{ id: "r2", kind: "router", name: "R2", x: 750, y: 160, details: ["RID 2.2.2.1 · priority 1"] },
			{ id: "sw", kind: "switch", name: "OSPF 1", x: 500, y: 320 },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 500, details: ["RID 3.3.3.3 · priority 106"] },
			{ id: "r4", kind: "router", name: "R4", x: 780, y: 320, details: ["RID 4.4.4.4 · priority 204"] },
		],
		links: [
			{ from: "r1", to: "sw", label: "Gi0/1", labelX: 360, labelY: 235 },
			{ from: "r2", to: "sw", label: "Gi0/1", labelX: 640, labelY: 235 },
			{ from: "r3", to: "sw", label: "Gi0/0", labelX: 560, labelY: 410 },
			{ from: "r4", to: "sw", label: "Gi0/1", labelX: 690, labelY: 350 },
		],
	},
	"stp-four-switch-mesh": {
		title: "Four-switch Rapid PVST+ topology",
		note: "The switches share VLAN 1; bridge priorities and MAC addresses are shown for root election.",
		nodes: [
			{ id: "s1", kind: "switch", name: "SW1", x: 280, y: 150, details: ["Priority 8192", "MAC 00:24:98:6f:3b:41"] },
			{ id: "s2", kind: "switch", name: "SW2", x: 720, y: 150, details: ["Priority 16384"] },
			{ id: "s3", kind: "switch", name: "SW3", x: 720, y: 420, details: ["Priority 32768", "MAC 00:24:98:6f:3b:42"] },
			{ id: "s4", kind: "switch", name: "SW4", x: 280, y: 420, details: ["Priority 8192", "MAC 00:24:98:6f:3b:40"] },
		],
		links: [
			{ from: "s1", to: "s2" }, { from: "s1", to: "s3" }, { from: "s1", to: "s4" },
			{ from: "s2", to: "s3" }, { from: "s2", to: "s4" }, { from: "s3", to: "s4" },
		],
	},
	"inter-vlan-routing-sw1": {
		title: "Router-on-a-stick inter-VLAN topology",
		note: "R1 provides the gateway for VLAN 10 (10.0.0.0/15) and VLAN 20 (10.0.2.0/15) through SW1.",
		nodes: [
			{ id: "internet", kind: "network", name: "WWW", x: 500, y: 75 },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 240 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 500, y: 400 },
			{ id: "v10", kind: "network", name: "VLAN 10", x: 270, y: 520, details: ["10.0.0.0/15"] },
			{ id: "v20", kind: "network", name: "VLAN 20", x: 730, y: 520, details: ["10.0.2.0/15"] },
		],
		links: [
			{ from: "internet", to: "r1", label: "Gig0/1", labelX: 565, labelY: 165 },
			{ from: "r1", to: "sw1", label: "Gig0/0", labelX: 565, labelY: 330 },
			{ from: "sw1", to: "v10", label: "SVI 10 · 10.0.0.1/15", labelX: 340, labelY: 465 },
			{ from: "sw1", to: "v20", label: "SVI 20 · 10.0.2.1/15", labelX: 660, labelY: 465 },
		],
	},
	"ospf-four-router-costs": {
		title: "OSPF equal-prefix route costs",
		note: "Router Y receives the same /27 route from Routers A–D with different OSPF costs.",
		nodes: [
			{ id: "y", kind: "router", name: "Router Y", x: 180, y: 300 },
			{ id: "a", kind: "router", name: "Router A", x: 820, y: 110 },
			{ id: "b", kind: "router", name: "Router B", x: 820, y: 235 },
			{ id: "c", kind: "router", name: "Router C", x: 820, y: 365 },
			{ id: "d", kind: "router", name: "Router D", x: 820, y: 490 },
		],
		links: [
			{ from: "y", to: "a", label: "Cost 20", labelX: 500, labelY: 155 },
			{ from: "y", to: "b", label: "Cost 40", labelX: 500, labelY: 235 },
			{ from: "y", to: "c", label: "Cost 50", labelX: 500, labelY: 350 },
			{ from: "y", to: "d", label: "Cost 30", labelX: 500, labelY: 445 },
		],
	},
	"two-switch-two-pc-trunk": {
		title: "Two-switch VLAN 67 trunk topology",
		note: "PC A and PC B connect to Switch 1 and Switch 2; VLAN 67 is to be untagged between the switches.",
		nodes: [
			{ id: "s1", kind: "switch", name: "Switch 1", x: 280, y: 190 },
			{ id: "s2", kind: "switch", name: "Switch 2", x: 720, y: 190 },
			{ id: "a", kind: "host", name: "PC A", x: 280, y: 430 },
			{ id: "b", kind: "host", name: "PC B", x: 720, y: 430 },
		],
		links: [
			{ from: "s1", to: "s2", label: "Gi0/1 · VLAN 67 untagged", labelY: 145 },
			{ from: "s1", to: "a" }, { from: "s2", to: "b" },
		],
	},
	"pc-file-server-two-switch": {
		title: "PC A to file server topology",
		note: "PC A and the file server are in neighboring /23 networks connected through Switch A and Switch B.",
		nodes: [
			{ id: "pc", kind: "host", name: "PC A", x: 180, y: 130, details: ["192.168.0.10/23"] },
			{ id: "a", kind: "switch", name: "Switch A", x: 300, y: 360 },
			{ id: "b", kind: "switch", name: "Switch B", x: 700, y: 360 },
			{ id: "server", kind: "host", name: "File Server", x: 820, y: 130, details: ["192.168.1.20/23"] },
		],
		links: [
			{ from: "pc", to: "a", label: "Gi0/4", labelX: 220, labelY: 250 },
			{ from: "a", to: "b", label: "Gi0/1 · Gi0/1", labelY: 315 },
			{ from: "b", to: "server", label: "Gi0/3", labelX: 780, labelY: 250 },
		],
	},
	"redundant-switch-network": {
		title: "Redundant network topology",
		note: "Router 1 connects to the ISP and both switches; all six hosts share a VLAN.",
		nodes: [
			{ id: "isp", kind: "network", name: "ISP", x: 170, y: 105 },
			{ id: "r1", kind: "router", name: "Router 1", x: 500, y: 115, details: ["192.168.1.1/24 · 192.168.1.2/24"] },
			{ id: "s1", kind: "switch", name: "Switch 1", x: 350, y: 330 },
			{ id: "s2", kind: "switch", name: "Switch 2", x: 650, y: 330 },
			{ id: "server", kind: "host", name: "Server", x: 150, y: 450 },
			{ id: "h1", kind: "host", name: "Hosts 1–3", x: 350, y: 500 },
			{ id: "h2", kind: "host", name: "Hosts 4–6", x: 650, y: 500 },
		],
		links: [
			{ from: "isp", to: "r1" }, { from: "r1", to: "s1" }, { from: "r1", to: "s2" },
			{ from: "s1", to: "s2" }, { from: "s1", to: "server" },
			{ from: "s1", to: "h1" }, { from: "s2", to: "h2" },
		],
	},
	"static-route-two-site": {
		title: "Two-site static-routing topology",
		note: "Router 1 and Router 2 connect the 192.168.200.0/24 and 192.168.202.0/24 LANs.",
		nodes: [
			{ id: "r1", kind: "router", name: "Router 1", x: 280, y: 150 },
			{ id: "r2", kind: "router", name: "Router 2", x: 720, y: 150 },
			{ id: "s1", kind: "switch", name: "LAN 1", x: 280, y: 380 },
			{ id: "s2", kind: "switch", name: "LAN 2", x: 720, y: 380 },
			{ id: "pc1", kind: "host", name: "Hosts", x: 280, y: 510, details: ["192.168.200.225"] },
			{ id: "pc2", kind: "host", name: "Hosts", x: 720, y: 510, details: ["192.168.202.129"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "192.168.201.1 ↔ 192.168.201.2", labelY: 105 },
			{ from: "r1", to: "s1" }, { from: "r2", to: "s2" },
			{ from: "s1", to: "pc1" }, { from: "s2", to: "pc2" },
		],
	},
	"two-switch-four-workstations": {
		title: "Two-switch workstation topology",
		note: "PC1 and PC2 connect to SW1; PC3 and PC4 connect to SW2.",
		nodes: [
			{ id: "s1", kind: "switch", name: "S1", x: 300, y: 155 },
			{ id: "s2", kind: "switch", name: "S2", x: 700, y: 155 },
			{ id: "p1", kind: "host", name: "PC1", x: 160, y: 410 },
			{ id: "p2", kind: "host", name: "PC2", x: 400, y: 410 },
			{ id: "p3", kind: "host", name: "PC3", x: 600, y: 410 },
			{ id: "p4", kind: "host", name: "PC4", x: 840, y: 410 },
		],
		links: [
			{ from: "s1", to: "s2", label: "Gi0/2 ↔ Gi0/1", labelY: 110 },
			{ from: "s1", to: "p1", label: "Gi0/0", labelX: 215, labelY: 280 },
			{ from: "s1", to: "p2", label: "Gi0/1", labelX: 375, labelY: 280 },
			{ from: "s2", to: "p3", label: "Gi0/1", labelX: 625, labelY: 280 },
			{ from: "s2", to: "p4", label: "Gi0/0", labelX: 785, labelY: 280 },
		],
	},
	"r1-r2-ntp-link": {
		title: "Router1–Router2 NTP connection",
		note: "Router1 (192.168.0.2) peers with Router2 (192.168.0.3); Router2 has Loopback0 172.17.0.1.",
		nodes: [
			{ id: "r1", kind: "router", name: "Router1", x: 280, y: 220, details: ["192.168.0.2"] },
			{ id: "r2", kind: "router", name: "Router2", x: 720, y: 220, details: ["192.168.0.3", "Loopback0 · 172.17.0.1"] },
		],
		links: [{ from: "r1", to: "r2", label: "NTP link", labelY: 170 }],
	},
	"isp-wan-r1": {
		title: "ISP–WAN–R1 topology",
		note: "The ISP and R1 connect across the WAN using 10.0.0.254/30 and 10.0.0.253/30.",
		nodes: [
			{ id: "isp", kind: "router", name: "ISP", x: 500, y: 100 },
			{ id: "wan", kind: "network", name: "WAN", x: 500, y: 300 },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 500 },
		],
		links: [
			{ from: "isp", to: "wan", label: "Gi0/1 · 10.0.0.254/30", labelX: 660, labelY: 190 },
			{ from: "wan", to: "r1", label: "Gi0/0 · 10.0.0.253/30", labelX: 660, labelY: 405 },
		],
	},
	"router-two-branch-hosts": {
		title: "Router and two switched LANs",
		note: "One router connects two access switches and the two PC networks.",
		nodes: [
			{ id: "r", kind: "router", name: "Router", x: 500, y: 100 },
			{ id: "s1", kind: "switch", name: "Access switch 1", x: 280, y: 320 },
			{ id: "s2", kind: "switch", name: "Access switch 2", x: 720, y: 320 },
			{ id: "p1", kind: "host", name: "PC-A", x: 280, y: 520, details: ["10.10.10.0/24"] },
			{ id: "p2", kind: "host", name: "PC-B", x: 720, y: 520, details: ["10.10.10.0/24"] },
		],
		links: [
			{ from: "r", to: "s1", label: "e0/1", labelX: 390, labelY: 220 },
			{ from: "r", to: "s2", label: "e0/0", labelX: 610, labelY: 220 },
			{ from: "s1", to: "p1", label: "e0/1" }, { from: "s2", to: "p2", label: "e0/1" },
		],
	},
	"ipv6-three-router-policy": {
		title: "Three-router IPv6 routing topology",
		note: "R1 connects to R2 and R3; both downstream routers serve the shared 2001:db8:23::/64 destination segment.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 100 },
			{ id: "r2", kind: "router", name: "R2", x: 260, y: 315 },
			{ id: "r3", kind: "router", name: "R3", x: 740, y: 315 },
			{ id: "lan", kind: "network", name: "2001:db8:23::/64", x: 500, y: 520 },
		],
		links: [
			{ from: "r1", to: "r2", label: "fd00:12::/64", labelX: 360, labelY: 190 },
			{ from: "r1", to: "r3", label: "fd00:13::/64", labelX: 640, labelY: 190 },
			{ from: "r2", to: "lan", label: "2001:db8:23::/64", labelX: 330, labelY: 430 },
			{ from: "r3", to: "lan", label: "2001:db8:23::/64", labelX: 670, labelY: 430 },
		],
	},
	"two-site-r1-r2-wan": {
		title: "R1–R2 site connectivity",
		note: "R1 and R2 connect over 209.165.200.0/24 and serve separate workstation LANs.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 300, y: 155 },
			{ id: "r2", kind: "router", name: "R2", x: 700, y: 155 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 300, y: 400 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 700, y: 400 },
		],
		links: [
			{ from: "r1", to: "r2", label: "209.165.200.0/24 · .225 ↔ .226", labelY: 105 },
			{ from: "r1", to: "sw1", label: "192.168.1.0/24 · Gi0/1", labelX: 380, labelY: 290 },
			{ from: "r2", to: "sw2", label: "10.1.1.0/24 · Gi0/1", labelX: 620, labelY: 290 },
		],
	},
	"rtr1-access-list-lan": {
		title: "RTR-1 access-list network",
		note: "PC-1 and PC-2 connect through a switch to RTR-1 Gi0/0; the configuration exhibit is reproduced below.",
		nodes: [
			{ id: "r", kind: "router", name: "RTR-1", x: 500, y: 100, details: ["Gi0/0 · 10.10.1.254/24"] },
			{ id: "sw", kind: "switch", name: "Access switch", x: 500, y: 300 },
			{ id: "p1", kind: "host", name: "PC-1", x: 320, y: 510, details: ["10.10.1.1"] },
			{ id: "p2", kind: "host", name: "PC-2", x: 680, y: 510, details: ["10.10.1.2"] },
		],
		links: [
			{ from: "r", to: "sw", label: "Gi0/0", labelX: 570, labelY: 205 },
			{ from: "sw", to: "p1" }, { from: "sw", to: "p2" },
		],
	},
	"r1-primary-backup-internet": {
		title: "Primary and backup Internet routes",
		note: "R1 uses R3 as the primary Internet path and R2 as the backup path.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 300 },
			{ id: "r2", kind: "router", name: "R2", x: 210, y: 500 },
			{ id: "r3", kind: "router", name: "R3", x: 790, y: 500 },
			{ id: "internet", kind: "network", name: "Internet", x: 500, y: 620 },
		],
		links: [
			{ from: "r1", to: "r2", label: "Backup · 209.165.200.224/27", labelX: 315, labelY: 390 },
			{ from: "r1", to: "r3", label: "Primary · 209.165.201.0/27", labelX: 685, labelY: 390 },
			{ from: "r2", to: "internet" }, { from: "r3", to: "internet" },
		],
	},
	"management-server-filter": {
		title: "Management and server networks",
		note: "R1 and R2 connect the management LAN (10.1.1.0/24) to the server LAN (172.16.2.0/24).",
		nodes: [
			{ id: "p1", kind: "host", name: "PC1", x: 130, y: 130, details: ["Management LAN"] },
			{ id: "p2", kind: "host", name: "PC2", x: 130, y: 500, details: ["Management LAN"] },
			{ id: "sw1", kind: "switch", name: "Management switch", x: 330, y: 315 },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 315 },
			{ id: "r2", kind: "router", name: "R2", x: 700, y: 315 },
			{ id: "sw2", kind: "switch", name: "Server switch", x: 850, y: 315 },
			{ id: "server", kind: "host", name: "New Server", x: 850, y: 510, details: ["172.16.2.0/24"] },
		],
		links: [
			{ from: "p1", to: "sw1" }, { from: "p2", to: "sw1" },
			{ from: "sw1", to: "r1", label: "Gi0/1", labelY: 270 },
			{ from: "r1", to: "r2", label: "192.168.1.0/24", labelY: 270 },
			{ from: "r2", to: "sw2", label: "Gi0/0", labelY: 270 },
			{ from: "sw2", to: "server" },
		],
	},
	"mpls-qos-branches": {
		title: "MPLS QoS branch topology",
		note: "R1 connects to the MPLS cloud through MLS1, then branches to SW1 and SW2.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 90 },
			{ id: "mpls", kind: "network", name: "MPLS", x: 760, y: 90 },
			{ id: "mls", kind: "switch", name: "MLS1", x: 500, y: 280 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 280, y: 460 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 720, y: 460 },
			{ id: "pc1", kind: "host", name: "Branch host", x: 280, y: 630 },
			{ id: "pc2", kind: "host", name: "Branch host", x: 720, y: 630 },
		],
		links: [
			{ from: "r1", to: "mpls" }, { from: "r1", to: "mls", label: "MLS1", labelX: 565, labelY: 190 },
			{ from: "mls", to: "sw1" }, { from: "mls", to: "sw2" },
			{ from: "sw1", to: "pc1" }, { from: "sw2", to: "pc2" },
		],
	},
	"switch-vlan2-mac-table": {
		title: "SW1 VLAN 2 workstation topology",
		note: "PC1 and PC2 connect to SW1 Fa0/1 and Fa0/2 in VLAN 2.",
		nodes: [
			{ id: "p1", kind: "host", name: "PC1", x: 250, y: 100, details: ["VLAN 2"] },
			{ id: "p2", kind: "host", name: "PC2", x: 750, y: 100, details: ["VLAN 2"] },
			{ id: "sw", kind: "switch", name: "SW1", x: 500, y: 300 },
		],
		links: [
			{ from: "p1", to: "sw", label: "Fa0/1", labelX: 365, labelY: 210 },
			{ from: "p2", to: "sw", label: "Fa0/2", labelX: 635, labelY: 210 },
		],
	},
	"r1-pc-internet": {
		title: "R1 secure remote-access topology",
		note: "PC1 and PC2 share the 10.0.1.0/24 LAN connected to R1 Gi0/1; R1 Gi0/0 reaches the Internet.",
		nodes: [
			{ id: "pc1", kind: "host", name: "PC1", x: 220, y: 110 },
			{ id: "pc2", kind: "host", name: "PC2", x: 220, y: 500 },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 300 },
			{ id: "internet", kind: "network", name: "Internet", x: 820, y: 300 },
		],
		links: [
			{ from: "pc1", to: "r1", label: "10.0.1.0/24", labelX: 350, labelY: 180 },
			{ from: "pc2", to: "r1", label: "Gi0/1", labelX: 350, labelY: 420 },
			{ from: "r1", to: "internet", label: "Serial0/1", labelY: 250 },
		],
	},
	"nat-router-two-pcs": {
		title: "PCs through a NAT router",
		note: "PC1 and PC2 reach the Internet through the NAT router.",
		nodes: [
			{ id: "p1", kind: "host", name: "PC1", x: 250, y: 120 },
			{ id: "p2", kind: "host", name: "PC2", x: 250, y: 500 },
			{ id: "r", kind: "router", name: "NAT Router", x: 520, y: 300 },
			{ id: "internet", kind: "network", name: "Internet", x: 820, y: 300 },
		],
		links: [
			{ from: "p1", to: "r", label: "172.16.3.1", labelX: 365, labelY: 195 },
			{ from: "p2", to: "r", label: "172.16.3.2", labelX: 365, labelY: 415 },
			{ from: "r", to: "internet" },
		],
	},
	"ospf-r1-r2-r3-broadcast": {
		title: "OSPF broadcast segment",
		note: "R1, R2, and R3 share 192.168.100.0/24 in OSPF area 0.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 130 },
			{ id: "r2", kind: "router", name: "R2", x: 750, y: 130 },
			{ id: "lan", kind: "switch", name: "192.168.100.0/24 · Area 0", x: 500, y: 330 },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 540 },
		],
		links: [
			{ from: "r1", to: "lan", label: "Fa0/0 · .1", labelX: 360, labelY: 220 },
			{ from: "r2", to: "lan", label: "Fa0/0 · .2", labelX: 640, labelY: 220 },
			{ from: "r3", to: "lan", label: "Fa0/0 · .3", labelX: 585, labelY: 440 },
		],
	},
	"ospf-two-site-server": {
		title: "OSPF sites and server LAN",
		note: "R1 and R2 connect through the 10.1.1.0/24 transit network; the server is on the R2-side LAN.",
		nodes: [
			{ id: "pc", kind: "host", name: "PC1", x: 160, y: 170, details: ["Management LAN"] },
			{ id: "r1", kind: "router", name: "R1", x: 380, y: 300 },
			{ id: "r2", kind: "router", name: "R2", x: 650, y: 300 },
			{ id: "server", kind: "host", name: "Server", x: 860, y: 300, details: ["172.16.2.0/24"] },
		],
		links: [
			{ from: "pc", to: "r1", label: "192.168.1.0/24", labelX: 270, labelY: 220 },
			{ from: "r1", to: "r2", label: "10.1.1.0/24 · OSPF", labelY: 250 },
			{ from: "r2", to: "server", label: "LAN", labelY: 250 },
		],
	},
	"pc-switch-link-status": {
		title: "PC1 access-link status",
		note: "PC1 Fa0 connects to SW Fa0/1; the exhibit records speed and duplex on both ends.",
		nodes: [
			{ id: "pc", kind: "host", name: "PC1", x: 300, y: 170, details: ["100 Mbps · full duplex"] },
			{ id: "sw", kind: "switch", name: "Switch", x: 700, y: 400, details: ["Fa0/1 · auto speed · auto duplex"] },
		],
		links: [{ from: "pc", to: "sw", label: "Fa0 ↔ Fa0/1", labelX: 500, labelY: 260 }],
	},
	"ipv6-ho-isp-cloud": {
		title: "Head-office IPv6 network",
		note: "R1 connects the server LAN to the ISP cloud and the head-office LAN.",
		nodes: [
			{ id: "server", kind: "host", name: "Server", x: 500, y: 70 },
			{ id: "core", kind: "network", name: "ISP Cloud", x: 500, y: 230 },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 410, details: ["fa0/1 · 2001:DB8:44:90::/64"] },
			{ id: "sw", kind: "switch", name: "Head Office LAN", x: 500, y: 570 },
			{ id: "pc", kind: "host", name: "HO workstation", x: 790, y: 570 },
		],
		links: [
			{ from: "server", to: "core" }, { from: "core", to: "r1", label: "WAN", labelX: 590, labelY: 325 },
			{ from: "r1", to: "sw", label: "fa0/1 · EUI-64", labelX: 605, labelY: 500 },
			{ from: "sw", to: "pc" },
		],
	},
	"dhcp-client-router-server": {
		title: "DHCP client through R1 to server",
		note: "The DHCP client reaches the DHCP server through R1.",
		nodes: [
			{ id: "client", kind: "host", name: "DHCP Client", x: 180, y: 300 },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 300, details: ["Gi0/0 · 10.10.10.1/24", "Gi0/1 · 172.16.2.1/24"] },
			{ id: "server", kind: "host", name: "DHCP Server", x: 820, y: 300, details: ["172.16.2.2"] },
		],
		links: [{ from: "client", to: "r1", label: "Gi0/0", labelY: 250 }, { from: "r1", to: "server", label: "Gi0/1", labelY: 250 }],
	},
	"r14-r86-static-route-172": {
		title: "R14–R86 static-route topology",
		note: "R14 and R86 connect over 10.73.65.64/30; the destination LAN on R86 is 172.21.34.0/25.",
		nodes: [
			{ id: "r14", kind: "router", name: "R14", x: 280, y: 220, details: ["Loopback0 · 10.10.1.14/32"] },
			{ id: "r86", kind: "router", name: "R86", x: 720, y: 220, details: ["Loopback0 · 10.10.1.86/32"] },
			{ id: "lan", kind: "network", name: "172.21.34.0/25", x: 720, y: 470 },
		],
		links: [
			{ from: "r14", to: "r86", label: "Fa0/0 · .65 ↔ .66 · 10.73.65.64/30", labelY: 165 },
			{ from: "r86", to: "lan", label: "LAN", labelX: 790, labelY: 350 },
		],
	},
	"lan-primary-backup-isps": {
		title: "Primary and backup ISP topology",
		note: "The LAN connects through Router1; Gi1/0 reaches the primary ISP and Gi1/1 reaches the backup ISP.",
		nodes: [
			{ id: "lan", kind: "network", name: "LAN", x: 180, y: 300 },
			{ id: "r", kind: "router", name: "Router1", x: 500, y: 300 },
			{ id: "isp1", kind: "router", name: "Primary ISP", x: 830, y: 150 },
			{ id: "isp2", kind: "router", name: "Backup ISP", x: 830, y: 450 },
		],
		links: [
			{ from: "lan", to: "r", label: "Gi0/1", labelY: 250 },
			{ from: "r", to: "isp1", label: "Gi1/0", labelX: 670, labelY: 185 },
			{ from: "r", to: "isp2", label: "Gi1/1", labelX: 670, labelY: 405 },
		],
	},
	"lacp-switch1-switch2-config": {
		title: "Switch 1–Switch 2 LACP topology",
		note: "Two Ethernet links between the switches form Port-channel 1; the image's interface configuration is reproduced below.",
		nodes: [
			{ id: "s1", kind: "switch", name: "Switch 1", x: 280, y: 220 },
			{ id: "s2", kind: "switch", name: "Switch 2", x: 720, y: 220 },
		],
		links: [
			{ from: "s1", to: "s2", label: "E1/1 · Port-channel 1", labelY: 170, offset: -12 },
			{ from: "s1", to: "s2", label: "E1/2 · Port-channel 1", labelY: 280, offset: 12 },
		],
	},
	"dual-wan-site-routing": {
		title: "Dual-WAN workstation sites",
		note: "R1 and R2 connect over two WAN circuits and each serves a workstation LAN.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 145 },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 145 },
			{ id: "s1", kind: "switch", name: "SW1", x: 280, y: 355 },
			{ id: "s2", kind: "switch", name: "SW2", x: 720, y: 355 },
			{ id: "p1", kind: "host", name: "Workstations", x: 280, y: 540, details: ["172.16.1.0/24"] },
			{ id: "p2", kind: "host", name: "Workstations", x: 720, y: 540, details: ["172.16.2.0/24"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "Primary · 172.16.0.0/30", labelY: 90, offset: -10 },
			{ from: "r1", to: "r2", label: "Secondary · 172.16.0.4/30", labelY: 205, offset: 10 },
			{ from: "r1", to: "s1" }, { from: "r2", to: "s2" },
			{ from: "s1", to: "p1" }, { from: "s2", to: "p2" },
		],
	},
	"vlan5-vlan100-four-hosts": {
		title: "VLAN 5 and VLAN 100 access topology",
		note: "SW1 and SW2 connect PC1–PC4 across VLAN 5 and VLAN 100.",
		nodes: [
			{ id: "s1", kind: "switch", name: "SW1", x: 300, y: 300 },
			{ id: "s2", kind: "switch", name: "SW2", x: 700, y: 300 },
			{ id: "p1", kind: "host", name: "PC1", x: 180, y: 100, details: ["VLAN 5"] },
			{ id: "p2", kind: "host", name: "PC2", x: 820, y: 100, details: ["VLAN 5"] },
			{ id: "p3", kind: "host", name: "PC3", x: 180, y: 520, details: ["VLAN 100"] },
			{ id: "p4", kind: "host", name: "PC4", x: 820, y: 520, details: ["VLAN 100"] },
		],
		links: [
			{ from: "s1", to: "s2", label: "VLAN 5 · VLAN 100", labelY: 245 },
			{ from: "s1", to: "p1" }, { from: "s2", to: "p2" },
			{ from: "s1", to: "p3" }, { from: "s2", to: "p4" },
		],
	},
	"lacp-three-parallel-switches": {
		title: "Three-link LACP EtherChannel",
		note: "SW1 and SW2 are joined by three parallel LACP member links.",
		nodes: [
			{ id: "s1", kind: "switch", name: "SW1", x: 280, y: 260 },
			{ id: "s2", kind: "switch", name: "SW2", x: 720, y: 260 },
		],
		links: [
			{ from: "s1", to: "s2", label: "Gi1/1 ↔ Gi1/1", labelY: 170, offset: -20 },
			{ from: "s1", to: "s2", label: "Gi1/2 ↔ Gi1/2", labelY: 260 },
			{ from: "s1", to: "s2", label: "Gi1/3 ↔ Gi1/3", labelY: 350, offset: 20 },
		],
	},
	"r1-r2-r3-network": {
		title: "R1–R2–R3 routed networks",
		note: "R1, R2, and R3 connect through 10.0.4.0/24; their LANs are 10.0.1.0/24, 10.0.2.0/24, and 10.0.3.0/24.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 270, y: 130, details: ["10.0.1.0/24"] },
			{ id: "r2", kind: "router", name: "R2", x: 730, y: 130, details: ["10.0.2.0/24"] },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 480, details: ["10.0.3.0/24"] },
			{ id: "lan", kind: "network", name: "10.0.4.0/24", x: 500, y: 300 },
		],
		links: [
			{ from: "r1", to: "lan", label: "Gi0/0", labelX: 355, labelY: 220 },
			{ from: "r2", to: "lan", label: "Gi0/0", labelX: 645, labelY: 220 },
			{ from: "r3", to: "lan", label: "Gi0/1", labelX: 570, labelY: 410 },
		],
	},
	"dual-circuit-r1-r2-hosts": {
		title: "Redundant R1–R2 circuits",
		note: "Primary and secondary circuits connect R1 and R2; Client A and the Image Server sit on their LANs.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 300, y: 200 },
			{ id: "r2", kind: "router", name: "R2", x: 700, y: 200 },
			{ id: "client", kind: "host", name: "Client A", x: 300, y: 490, details: ["192.168.10.0/24"] },
			{ id: "server", kind: "host", name: "Image Server", x: 700, y: 490, details: ["10.10.10.10/25"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "Primary Circuit", labelY: 135, offset: -10 },
			{ from: "r1", to: "r2", label: "Secondary Circuit", labelY: 250, offset: 10 },
			{ from: "r1", to: "client" }, { from: "r2", to: "server" },
		],
	},
	"switch-vlan200-two-pcs": {
		title: "VLAN 200 PC-to-PC topology",
		note: "PC_A and PC_B connect to one switch in VLAN 200.",
		nodes: [
			{ id: "sw", kind: "switch", name: "Switch", x: 500, y: 140 },
			{ id: "a", kind: "host", name: "PC_A", x: 250, y: 430, details: ["VLAN 200"] },
			{ id: "b", kind: "host", name: "PC_B", x: 750, y: 430, details: ["VLAN 200"] },
		],
		links: [{ from: "sw", to: "a" }, { from: "sw", to: "b" }],
	},
	"three-routers-vlan-switch-pcs": {
		title: "Three-router VLAN routing topology",
		note: "R1, R2, and R3 connect to a shared switch and PC1–PC3.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 145, details: ["192.168.0.0/24"] },
			{ id: "r2", kind: "router", name: "R2", x: 500, y: 145, details: ["172.16.0.0/24"] },
			{ id: "r3", kind: "router", name: "R3", x: 750, y: 145, details: ["192.168.0.0/24"] },
			{ id: "sw", kind: "switch", name: "SW", x: 500, y: 340 },
			{ id: "p1", kind: "host", name: "PC1", x: 250, y: 550, details: ["10.0.0.5"] },
			{ id: "p2", kind: "host", name: "PC2", x: 500, y: 550, details: ["10.0.0.8"] },
			{ id: "p3", kind: "host", name: "PC3", x: 750, y: 550, details: ["10.0.0.12"] },
		],
		links: [
			{ from: "r1", to: "sw" }, { from: "r2", to: "sw" }, { from: "r3", to: "sw" },
			{ from: "sw", to: "p1" }, { from: "sw", to: "p2" }, { from: "sw", to: "p3" },
		],
	},
	"ospf-two-site-election": {
		title: "Two-site OSPF DR election",
		note: "R1 and R2 share the 10.0.0.32/27 WAN segment; each router serves a workstation LAN.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 140 },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 140 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 280, y: 350 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 720, y: 350 },
			{ id: "p1", kind: "host", name: "Workstations", x: 280, y: 560, details: ["10.0.1.0/24"] },
			{ id: "p2", kind: "host", name: "Workstations", x: 720, y: 560, details: ["10.0.2.0/24"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "10.0.0.32/27 · .33 ↔ .34", labelY: 90 },
			{ from: "r1", to: "sw1" }, { from: "r2", to: "sw2" },
			{ from: "sw1", to: "p1" }, { from: "sw2", to: "p2" },
		],
	},
	"four-router-host-route": {
		title: "Four-router host routing topology",
		note: "R1 connects Host A to the R2/R3/R4 paths leading to Host B.",
		nodes: [
			{ id: "a", kind: "host", name: "Host A", x: 100, y: 300 },
			{ id: "r1", kind: "router", name: "R1", x: 300, y: 300 },
			{ id: "r2", kind: "router", name: "R2", x: 500, y: 100 },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 500 },
			{ id: "r4", kind: "router", name: "R4", x: 730, y: 300 },
			{ id: "b", kind: "host", name: "Host B", x: 930, y: 300 },
		],
		links: [
			{ from: "a", to: "r1" }, { from: "r1", to: "r2", label: "10.10.10.0/30", labelX: 400, labelY: 180 },
			{ from: "r1", to: "r3", label: "10.10.10.8/30", labelX: 400, labelY: 430 },
			{ from: "r2", to: "r4", label: "10.10.10.4/30", labelX: 620, labelY: 180 },
			{ from: "r3", to: "r4", label: "10.10.10.12/30", labelX: 620, labelY: 430 },
			{ from: "r4", to: "b" },
		],
	},
	"r1-r2-r3-shared-lan": {
		title: "R1–R2–R3 shared transit network",
		note: "R1, R2, and R3 connect to a shared 10.0.0.0/24 segment.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 140 },
			{ id: "r2", kind: "router", name: "R2", x: 750, y: 140 },
			{ id: "lan", kind: "network", name: "10.0.0.0/24", x: 500, y: 340 },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 550 },
		],
		links: [
			{ from: "r1", to: "lan", label: "Fa0/0", labelX: 360, labelY: 235 },
			{ from: "r2", to: "lan", label: "Fa0/2", labelX: 640, labelY: 235 },
			{ from: "r3", to: "lan", label: "Fa0/1", labelX: 570, labelY: 450 },
		],
	},
	"r1-r2-r3-neighbor-discovery": {
		title: "R1–R2–R3 neighbor-discovery network",
		note: "R1, R2, and R3 are connected in series; Gi0/1 and Gi0/2 connect to R2.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 200, y: 270 },
			{ id: "r2", kind: "router", name: "R2", x: 500, y: 270 },
			{ id: "r3", kind: "router", name: "R3", x: 800, y: 270 },
		],
		links: [{ from: "r1", to: "r2", label: "Gi0/1", labelY: 220 }, { from: "r2", to: "r3", label: "Gi0/2", labelY: 220 }],
	},
	"two-site-serial-file-server": {
		title: "Serial two-site host and server network",
		note: "Router1 and Router2 connect through serial WAN links; Router2 serves Switch1 and the server LAN.",
		nodes: [
			{ id: "r1", kind: "router", name: "Router1", x: 250, y: 270 },
			{ id: "r2", kind: "router", name: "Router2", x: 520, y: 270 },
			{ id: "sw", kind: "switch", name: "Switch1", x: 760, y: 270 },
			{ id: "server", kind: "host", name: "Server", x: 930, y: 270, details: ["10.10.10.10/24"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "Serial · 192.168.0.0/30 + 192.168.0.2/30", labelY: 215 },
			{ from: "r2", to: "sw", label: "Gi0/0 · 10.10.10.1/24", labelY: 215 },
			{ from: "sw", to: "server" },
		],
	},
	"r1-r2-point-to-point": {
		title: "R1–R2 point-to-point link",
		note: "GigabitEthernet0/0/0 connects R1 and R2.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 270 },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 270 },
		],
		links: [{ from: "r1", to: "r2", label: "GigabitEthernet0/0/0", labelY: 220 }],
	},
	"ntp-router-mesh": {
		title: "NTP network topology",
		note: "The five-router network shows Router1 and Router2 with Loopback0 and NTP server configuration.",
		nodes: [
			{ id: "internet", kind: "network", name: "Internet", x: 180, y: 150 },
			{ id: "r1", kind: "router", name: "Router1", x: 350, y: 300 },
			{ id: "r2", kind: "router", name: "Router2", x: 650, y: 300 },
			{ id: "r3", kind: "router", name: "Router3", x: 500, y: 520 },
			{ id: "r4", kind: "router", name: "Router4", x: 850, y: 150 },
		],
		links: [
			{ from: "internet", to: "r1" }, { from: "r1", to: "r2", label: "10.0.10.0/30", labelY: 245 },
			{ from: "r2", to: "r3", label: "10.0.20.0/30", labelX: 600, labelY: 420 },
			{ from: "r2", to: "r4", label: "10.0.30.0/30", labelX: 745, labelY: 210 },
			{ from: "r1", to: "r3" },
		],
	},
	"four-router-pc-routing": {
		title: "Four-router routed network",
		note: "PC1, PC3, and a remote workstation connect through R1–R2–R3–R4.",
		nodes: [
			{ id: "pc1", kind: "host", name: "PC1", x: 120, y: 130 },
			{ id: "r1", kind: "router", name: "R1", x: 320, y: 290 },
			{ id: "r2", kind: "router", name: "R2", x: 500, y: 130 },
			{ id: "r3", kind: "router", name: "R3", x: 680, y: 290 },
			{ id: "r4", kind: "router", name: "R4", x: 500, y: 500 },
			{ id: "pc3", kind: "host", name: "PC3", x: 880, y: 500 },
		],
		links: [
			{ from: "pc1", to: "r1" }, { from: "r1", to: "r2" }, { from: "r2", to: "r3" },
			{ from: "r1", to: "r4" }, { from: "r4", to: "r3" }, { from: "r3", to: "pc3" },
		],
	},
	"nat-router-lans-internet": {
		title: "ROUTER-1 Internet access topology",
		note: "ROUTER-1 connects the 192.168.1.0/24 user networks to the Internet.",
		nodes: [
			{ id: "internet", kind: "network", name: "Internet", x: 820, y: 100 },
			{ id: "r", kind: "router", name: "ROUTER-1", x: 500, y: 170, details: ["209.165.202.129 · PAT"] },
			{ id: "sw1", kind: "switch", name: "Switch 1", x: 330, y: 370 },
			{ id: "sw2", kind: "switch", name: "Switch 2", x: 670, y: 370 },
			{ id: "h1", kind: "host", name: "Subnet", x: 330, y: 560, details: ["192.168.1.0/24"] },
			{ id: "h2", kind: "host", name: "Subnet", x: 670, y: 560, details: ["192.168.1.0/24"] },
		],
		links: [
			{ from: "r", to: "internet" }, { from: "r", to: "sw1" }, { from: "r", to: "sw2" },
			{ from: "sw1", to: "h1" }, { from: "sw2", to: "h2" },
		],
	},
	"switch-voice-vlan-phone": {
		title: "Cisco switch and non-Cisco IP phone",
		note: "The non-Cisco IP phone connects to SW1 Gi1/0/1; the phone and attached PC use voice and data VLANs.",
		nodes: [
			{ id: "sw", kind: "switch", name: "SW1", x: 500, y: 160, details: ["VLAN 10 · voice", "VLAN 11 · data"] },
			{ id: "phone", kind: "network", name: "Non-Cisco IP Phone", x: 500, y: 360 },
			{ id: "pc", kind: "host", name: "PC", x: 500, y: 550 },
		],
		links: [{ from: "sw", to: "phone", label: "Gi1/0/1", labelY: 255 }, { from: "phone", to: "pc" }],
	},
	"three-router-specific-host-route": {
		title: "Three-router host-specific route",
		note: "R1 reaches 10.10.2.0/24 through R2; traffic for 10.10.2.1 can instead use R3.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 300 },
			{ id: "r2", kind: "router", name: "R2", x: 700, y: 150 },
			{ id: "r3", kind: "router", name: "R3", x: 700, y: 450 },
			{ id: "lan", kind: "network", name: "10.10.2.0/24", x: 900, y: 300 },
		],
		links: [
			{ from: "r1", to: "r2", label: "192.168.1.0/24 · .1 ↔ .2", labelX: 465, labelY: 205 },
			{ from: "r1", to: "r3", label: "192.168.2.0/24 · .1 ↔ .3", labelX: 465, labelY: 405 },
			{ from: "r2", to: "lan", label: "Gi0/0", labelX: 800, labelY: 205 },
			{ from: "r3", to: "lan", label: "Gi0/0", labelX: 800, labelY: 405 },
		],
	},
	"internet-router-pc-ipconfig": {
		title: "PC Internet connectivity topology",
		note: "PC 10.2.2.2 connects through a switch and Router 10.2.2.1/27 to the Internet.",
		nodes: [
			{ id: "internet", kind: "network", name: "Internet", x: 140, y: 270 },
			{ id: "r", kind: "router", name: "Router", x: 400, y: 270, details: ["10.2.2.1/27"] },
			{ id: "sw", kind: "switch", name: "Switch", x: 650, y: 270 },
			{ id: "pc", kind: "host", name: "PC", x: 900, y: 270, details: ["10.2.2.2"] },
		],
		links: [{ from: "internet", to: "r" }, { from: "r", to: "sw" }, { from: "sw", to: "pc" }],
	},
	"cpe-dual-isp": {
		title: "CPE dual-ISP headquarters topology",
		note: "CPE connects Headquarters to ISP 1 (198.51.100.1) and ISP 2 (203.0.113.1).",
		nodes: [
			{ id: "isp1", kind: "network", name: "ISP 1", x: 280, y: 120, details: ["198.51.100.1"] },
			{ id: "isp2", kind: "network", name: "ISP 2", x: 720, y: 120, details: ["203.0.113.1"] },
			{ id: "cpe", kind: "router", name: "CPE", x: 500, y: 340 },
			{ id: "hq", kind: "network", name: "Headquarters", x: 500, y: 560 },
		],
		links: [{ from: "isp1", to: "cpe" }, { from: "isp2", to: "cpe" }, { from: "cpe", to: "hq" }],
	},
	"ipv6-r1-r2-access-lans": {
		title: "Dual-site IPv6 server and workstation LANs",
		note: "R1 and R2 connect over 2001:DB8:44:90::/64; each router serves a separate switch and endpoint LAN.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 150, details: ["2001:DB8:44:90::1/64"] },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 150, details: ["2001:DB8:44:90::2/64"] },
			{ id: "sw1", kind: "switch", name: "SW1", x: 280, y: 340 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 720, y: 340 },
			{ id: "server", kind: "host", name: "File + Management Servers", x: 280, y: 550, details: ["2001:DB8:D8D2:1008::/64"] },
			{ id: "pcs", kind: "host", name: "Workstations", x: 720, y: 550, details: ["2001:DB8:D8D2:1009::/64"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "GigabitEthernet0/0", labelY: 100 },
			{ from: "r1", to: "sw1", label: "2001:DB8:D8D2:1008::/64", labelX: 390, labelY: 260 },
			{ from: "r2", to: "sw2", label: "2001:DB8:D8D2:1009::/64", labelX: 610, labelY: 260 },
			{ from: "sw1", to: "server" }, { from: "sw2", to: "pcs" },
		],
	},
	"r14-r86-pc10-static-routes": {
		title: "R14–R86 PC10 static-route topology",
		note: "R14 and R86 connect over 10.73.65.64/30; PC10 (.10) is on R86 LAN 10.80.65.0/28.",
		nodes: [
			{ id: "r14", kind: "router", name: "R14", x: 280, y: 190, details: ["Loopback0 · 10.10.1.14/32"] },
			{ id: "r86", kind: "router", name: "R86", x: 720, y: 190, details: ["Loopback0 · 10.10.1.86/32"] },
			{ id: "lan", kind: "network", name: "10.80.65.0/28", x: 720, y: 390 },
			{ id: "pc10", kind: "host", name: "PC10", x: 720, y: 570, details: ["10.80.65.10"] },
		],
		links: [
			{ from: "r14", to: "r86", label: "Fa0/0 · .65 ↔ .66", labelY: 140 },
			{ from: "r86", to: "lan", label: "Fa0/1", labelX: 790, labelY: 285 },
			{ from: "lan", to: "pc10" },
		],
	},
	"ospf-four-router-two-area": {
		title: "OSPF two-area four-router topology",
		note: "R1, R2, and R3 connect across areas 0 and 1; R3 advertises loopback 1.1.1.3/32.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 110, details: ["Loopback · 1.1.1.1/32"] },
			{ id: "r2", kind: "router", name: "R2", x: 250, y: 320, details: ["1.1.1.2/32"] },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 530, details: ["Loopback · 1.1.1.3/32"] },
			{ id: "r4", kind: "router", name: "R4", x: 750, y: 320, details: ["1.1.1.4/32"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "OSPF Area 0", labelX: 360, labelY: 220 },
			{ from: "r1", to: "r4", label: "OSPF Area 0", labelX: 640, labelY: 220 },
			{ from: "r2", to: "r3", label: "OSPF Area 1", labelX: 360, labelY: 430 },
			{ from: "r4", to: "r3", label: "OSPF Area 1", labelX: 640, labelY: 430 },
		],
	},
	"site-a-site-b-routing": {
		title: "Site A–Site B routing topology",
		note: "Router1 and Router2 connect Site A and Site B over two paths; the exhibit includes Router2's route table.",
		nodes: [
			{ id: "a", kind: "network", name: "Site A", x: 180, y: 300 },
			{ id: "r1", kind: "router", name: "Router1", x: 400, y: 300 },
			{ id: "r2", kind: "router", name: "Router2", x: 680, y: 300 },
			{ id: "b", kind: "network", name: "Site B", x: 900, y: 300 },
		],
		links: [
			{ from: "a", to: "r1" },
			{ from: "r1", to: "r2", label: "10.10.10.0/30 · 10.10.10.8/30", labelY: 230, offset: -10 },
			{ from: "r1", to: "r2", label: "10.10.10.4/30 · 10.10.10.12/30", labelY: 360, offset: 10 },
			{ from: "r2", to: "b" },
		],
	},
	"r1-r2-r3-multi-lan": {
		title: "R1–R2–R3 multi-LAN topology",
		note: "R1 and R3 connect to R2 through routed subnets; each site has local workstation or server networks.",
		nodes: [
			{ id: "pc", kind: "host", name: "PC1", x: 120, y: 310, details: ["172.16.5.0/24"] },
			{ id: "r1", kind: "router", name: "R1", x: 320, y: 310 },
			{ id: "r2", kind: "router", name: "R2", x: 540, y: 180 },
			{ id: "r3", kind: "router", name: "R3", x: 760, y: 310 },
			{ id: "s", kind: "switch", name: "Access switch", x: 540, y: 470 },
			{ id: "hosts", kind: "host", name: "PCs / Server", x: 850, y: 520 },
		],
		links: [
			{ from: "pc", to: "r1" }, { from: "r1", to: "r2", label: "10.10.10.0/24", labelX: 420, labelY: 220 },
			{ from: "r2", to: "r3", label: "10.10.10.4/24", labelX: 660, labelY: 220 },
			{ from: "r1", to: "s", label: "192.168.2.0/24", labelX: 410, labelY: 400 },
			{ from: "s", to: "r3", label: "10.10.10.0/24", labelX: 670, labelY: 400 },
			{ from: "r3", to: "hosts" },
		],
	},
	"vendor-switch-trunk": {
		title: "Inter-company switch trunk",
		note: "SW_1 and SW_12 connect over Ethernet0/0; VLANs 5 and 6 are carried on the inter-switch link.",
		nodes: [
			{ id: "a", kind: "network", name: "VLANs 5, 6 · Floor 5", x: 150, y: 230 },
			{ id: "s1", kind: "switch", name: "SW_1", x: 350, y: 300 },
			{ id: "s2", kind: "switch", name: "SW_12", x: 700, y: 300 },
			{ id: "b", kind: "network", name: "VLANs 5, 6 · Floor 6", x: 900, y: 230 },
		],
		links: [
			{ from: "a", to: "s1" },
			{ from: "s1", to: "s2", label: "Ethernet0/0 · 802.1Q", labelY: 245 },
			{ from: "s2", to: "b" },
		],
	},
	"branch-r1-r2-wan": {
		title: "R1–R2 branch-office network",
		note: "R1 connects the 192.168.25.0/24 office LAN to R2 across 192.168.2.0/30; R2 serves 172.25.0.0/24.",
		nodes: [
			{ id: "pc1", kind: "host", name: "Main office", x: 150, y: 300, details: ["192.168.25.0/24"] },
			{ id: "r1", kind: "router", name: "R1", x: 380, y: 300 },
			{ id: "r2", kind: "router", name: "R2", x: 680, y: 300 },
			{ id: "pc2", kind: "host", name: "New office", x: 900, y: 300, details: ["172.25.0.0/24"] },
		],
		links: [
			{ from: "pc1", to: "r1" },
			{ from: "r1", to: "r2", label: "192.168.2.0/30 · .1 ↔ .2", labelY: 245 },
			{ from: "r2", to: "pc2", label: "Gi0/2", labelY: 245 },
		],
	},
	"dhcp-multi-vlan-topology": {
		title: "DHCP server, VLANs, and DHCP client",
		note: "The DHCP server and client reach SW1 on VLAN 10 and VLAN 20; SW1 relays VLAN 10 client requests to the server.",
		nodes: [
			{ id: "server", kind: "host", name: "DHCP Server", x: 160, y: 300, details: ["192.168.202.30"] },
			{ id: "sw", kind: "switch", name: "SW1", x: 500, y: 300 },
			{ id: "pc", kind: "host", name: "DHCP Client", x: 840, y: 300, details: ["VLAN 10"] },
		],
		links: [
			{ from: "server", to: "sw", label: "Trunk · VLANs 10, 20", labelY: 245 },
			{ from: "sw", to: "pc", label: "Access · VLAN 10", labelY: 245 },
		],
	},
	"rip-three-router-triangle": {
		title: "RIP three-router triangle",
		note: "R1, R2, and R3 connect over 192.168.12.0/24, 192.168.13.0/24, and 192.168.23.0/24.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 100 },
			{ id: "r2", kind: "router", name: "R2", x: 250, y: 460 },
			{ id: "r3", kind: "router", name: "R3", x: 750, y: 460 },
		],
		links: [
			{ from: "r1", to: "r2", label: "192.168.12.0/24 · Gi0/1", labelX: 340, labelY: 280 },
			{ from: "r1", to: "r3", label: "192.168.13.0/24 · Gi0/2", labelX: 660, labelY: 280 },
			{ from: "r2", to: "r3", label: "192.168.23.0/24", labelY: 405 },
		],
	},
	"stp-four-switch-five-link": {
		title: "Four-switch root-election topology",
		note: "SW1–SW4 form a square with one diagonal link; interface labels are shown on each connection.",
		nodes: [
			{ id: "s1", kind: "switch", name: "SW1", x: 250, y: 150 },
			{ id: "s2", kind: "switch", name: "SW2", x: 750, y: 150 },
			{ id: "s3", kind: "switch", name: "SW3", x: 750, y: 470 },
			{ id: "s4", kind: "switch", name: "SW4", x: 250, y: 470 },
		],
		links: [
			{ from: "s1", to: "s2", label: "Gi1/0/1 ↔ Gi1/0/1", labelY: 100 },
			{ from: "s2", to: "s3", label: "Gi1/0/2 ↔ Gi1/0/1", labelX: 830, labelY: 310 },
			{ from: "s3", to: "s4", label: "Gi1/0/2 ↔ Gi1/0/2", labelY: 520 },
			{ from: "s4", to: "s1", label: "Gi1/0/1 ↔ Gi1/0/3", labelX: 170, labelY: 310 },
			{ from: "s1", to: "s3", label: "Gi1/0/2 ↔ Gi1/0/3", labelX: 500, labelY: 300 },
		],
	},
	"ipv6-city-lan-r1": {
		title: "IPv6 ISP, Atlanta, and San Francisco",
		note: "Atlanta and San Francisco connect to the ISP over IPv6 and each serves local users or servers.",
		nodes: [
			{ id: "isp", kind: "network", name: "ISP", x: 500, y: 90 },
			{ id: "atl", kind: "router", name: "Atlanta · R1", x: 280, y: 270 },
			{ id: "sf", kind: "router", name: "San Francisco · R2", x: 720, y: 270 },
			{ id: "sw1", kind: "switch", name: "Atlanta LAN", x: 280, y: 450 },
			{ id: "sw2", kind: "switch", name: "San Francisco LAN", x: 720, y: 450 },
			{ id: "users", kind: "host", name: "End users", x: 280, y: 640 },
			{ id: "servers", kind: "host", name: "DNS + File Servers", x: 720, y: 640 },
		],
		links: [
			{ from: "isp", to: "atl", label: "2001:DB8:1555:100::/64", labelX: 360, labelY: 165 },
			{ from: "isp", to: "sf", label: "2001:DB8:1555:100::/64", labelX: 640, labelY: 165 },
			{ from: "atl", to: "sw1", label: "Gi0/0", labelX: 350, labelY: 360 },
			{ from: "sf", to: "sw2", label: "Gi0/0", labelX: 650, labelY: 360 },
			{ from: "sw1", to: "users" }, { from: "sw2", to: "servers" },
		],
	},
	"qos-ingress-packet-classification": {
		title: "R1 QoS ingress traffic classification",
		note: "R1 receives AF31, AF21, and AF11 traffic on Gi0/0 and forwards classified packets from Gi0/1.",
		nodes: [
			{ id: "af31", kind: "network", name: "AF31", x: 160, y: 130 },
			{ id: "af21", kind: "network", name: "AF21", x: 160, y: 300 },
			{ id: "af11", kind: "network", name: "AF11", x: 160, y: 470 },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 300 },
			{ id: "out31", kind: "network", name: "AF31", x: 830, y: 130 },
			{ id: "out21", kind: "network", name: "AF21", x: 830, y: 270 },
			{ id: "out11", kind: "network", name: "AF11", x: 830, y: 410 },
		],
		links: [
			{ from: "af31", to: "r1", label: "Gi0/0", labelX: 335, labelY: 180 },
			{ from: "af21", to: "r1" }, { from: "af11", to: "r1" },
			{ from: "r1", to: "out31", label: "Gi0/1", labelX: 665, labelY: 175 },
			{ from: "r1", to: "out21" }, { from: "r1", to: "out11" },
		],
	},
	"four-router-protocol-mesh": {
		title: "Four-router multi-protocol routing topology",
		note: "Routers A–D connect through EIGRP and OSPF segments; each router serves a subnet.",
		nodes: [
			{ id: "a", kind: "router", name: "Router A", x: 250, y: 180 },
			{ id: "b", kind: "router", name: "Router B", x: 750, y: 180 },
			{ id: "c", kind: "router", name: "Router C", x: 750, y: 460 },
			{ id: "d", kind: "router", name: "Router D", x: 250, y: 460 },
		],
		links: [
			{ from: "a", to: "b", label: "EIGRP · 192.168.1.0/24", labelY: 130 },
			{ from: "b", to: "c", label: "OSPF · 10.0.1.0/30", labelX: 830, labelY: 320 },
			{ from: "c", to: "d", label: "EIGRP · 10.0.0.0/30", labelY: 510 },
			{ from: "d", to: "a", label: "192.168.1.0/24", labelX: 170, labelY: 320 },
		],
	},
	"ipv6-isp-r1-lan": {
		title: "IPv6 R1–ISP WAN and LAN",
		note: "R1 uses a manually assigned IPv6 address on the ISP WAN and a self-provisioned IPv6 LAN.",
		nodes: [
			{ id: "isp", kind: "network", name: "ISP", x: 500, y: 100 },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 320 },
			{ id: "sw", kind: "switch", name: "LAN", x: 500, y: 520 },
			{ id: "pc", kind: "host", name: "Laptop", x: 790, y: 520 },
		],
		links: [
			{ from: "isp", to: "r1", label: "WAN · 2001:DB8:0F1F:CCBC:ACCE:FCED:ACBD:FA0/127", labelX: 700, labelY: 220 },
			{ from: "r1", to: "sw", label: "LAN · 2001:DB8:0000:AFFF::/64", labelX: 640, labelY: 425 },
			{ from: "sw", to: "pc" },
		],
	},
	"r1-r2-primary-backup-lans": {
		title: "R1–R2 EIGRP primary and backup links",
		note: "R1 and R2 connect over 10.0.0.0/30 (primary) and 10.0.0.4/30 (backup), with separate LANs.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 170 },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 170 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 280, y: 390 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 720, y: 390 },
			{ id: "s1", kind: "host", name: "Servers", x: 280, y: 580, details: ["10.1.0.0/24"] },
			{ id: "s2", kind: "host", name: "Workstations", x: 720, y: 580, details: ["10.2.0.0/29"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "Primary · 10.0.0.0/30", labelY: 100, offset: -10 },
			{ from: "r1", to: "r2", label: "Backup · 10.0.0.4/30", labelY: 220, offset: 10 },
			{ from: "r1", to: "sw1" }, { from: "r2", to: "sw2" },
			{ from: "sw1", to: "s1" }, { from: "sw2", to: "s2" },
		],
	},
	"stp-four-switch-user-dns": {
		title: "Four-switch spanning-tree root-election topology",
		note: "Four switches form a ring; User1.lab and DNS1.lab connect to SW3 and SW4.",
		nodes: [
			{ id: "s1", kind: "switch", name: "SW1", x: 280, y: 150 },
			{ id: "s2", kind: "switch", name: "SW2", x: 720, y: 150 },
			{ id: "s3", kind: "switch", name: "SW3", x: 720, y: 440 },
			{ id: "s4", kind: "switch", name: "SW4", x: 280, y: 440 },
			{ id: "user", kind: "host", name: "User1.lab", x: 720, y: 650 },
			{ id: "dns", kind: "host", name: "DNS1.lab", x: 280, y: 650 },
		],
		links: [
			{ from: "s1", to: "s2", label: "STP priority", labelY: 100 },
			{ from: "s2", to: "s3" }, { from: "s3", to: "s4" }, { from: "s4", to: "s1" },
			{ from: "s3", to: "user" }, { from: "s4", to: "dns" },
		],
	},
	"ospf-seven-router-bandwidth": {
		title: "OSPF reference-bandwidth path topology",
		note: "Router Y connects to the destination network through alternate 10-Gigabit and 100-Gigabit paths.",
		nodes: [
			{ id: "y", kind: "router", name: "Router Y", x: 150, y: 300 },
			{ id: "r1", kind: "router", name: "Router 1", x: 360, y: 150 },
			{ id: "r2", kind: "router", name: "Router 2", x: 360, y: 450 },
			{ id: "r3", kind: "router", name: "Router 3", x: 570, y: 150 },
			{ id: "r4", kind: "router", name: "Router 4", x: 570, y: 450 },
			{ id: "r5", kind: "router", name: "Router 5", x: 780, y: 150 },
			{ id: "r6", kind: "router", name: "Router 6", x: 780, y: 450 },
			{ id: "dest", kind: "network", name: "192.168.1.0/24", x: 990, y: 300 },
		],
		links: [
			{ from: "y", to: "r1", label: "10 Gig", labelX: 250, labelY: 190 },
			{ from: "y", to: "r2", label: "10 Gig", labelX: 250, labelY: 410 },
			{ from: "r1", to: "r3", label: "10 Gig", labelY: 100 },
			{ from: "r2", to: "r4", label: "100 Gig", labelY: 500 },
			{ from: "r1", to: "r4", label: "100 Gig", labelX: 470, labelY: 300 },
			{ from: "r3", to: "r5", label: "100 Gig", labelY: 100 },
			{ from: "r4", to: "r6", label: "100 Gig", labelY: 500 },
			{ from: "r5", to: "r6", label: "10 Gig", labelX: 860, labelY: 300 },
			{ from: "r5", to: "dest" }, { from: "r6", to: "dest" },
		],
	},
	"r1-r2-link-local-lans": {
		title: "R1-LAB and R2-LAB IPv6 network",
		note: "R1-LAB and R2-LAB share an IPv6 WAN and each connects to a local switch and endpoint.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1-LAB", x: 300, y: 150 },
			{ id: "r2", kind: "router", name: "R2-LAB", x: 700, y: 150 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 300, y: 340 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 700, y: 340 },
			{ id: "host1", kind: "host", name: "LAN host", x: 300, y: 540 },
			{ id: "host2", kind: "host", name: "LAN host", x: 700, y: 540 },
		],
		links: [
			{ from: "r1", to: "r2", label: "Gi0/0 · 2001:DB8:0000:0FFF:AAAA:0000:0000:0000/64", labelY: 95 },
			{ from: "r1", to: "sw1", label: "Gi0/1", labelX: 380, labelY: 250 },
			{ from: "r2", to: "sw2", label: "Gi0/2", labelX: 620, labelY: 250 },
			{ from: "sw1", to: "host1" }, { from: "sw2", to: "host2" },
		],
	},
	"router-on-a-stick-vlan2-vlan3": {
		title: "Router-on-a-stick VLAN 2 and VLAN 3",
		note: "R1 connects through a trunk to the switch; VLAN 2 and VLAN 3 have separate endpoint networks.",
		nodes: [
			{ id: "r", kind: "router", name: "R1", x: 280, y: 300 },
			{ id: "sw", kind: "switch", name: "Switch", x: 560, y: 300 },
			{ id: "v2", kind: "host", name: "VLAN 2 PC", x: 850, y: 150, details: ["10.10.10.12/24"] },
			{ id: "v3", kind: "host", name: "VLAN 3 PC", x: 850, y: 460, details: ["10.10.20.12/24"] },
		],
		links: [
			{ from: "r", to: "sw", label: "802.1Q trunk · Native VLAN 10", labelY: 245 },
			{ from: "sw", to: "v2", label: "VLAN 2", labelX: 700, labelY: 200 },
			{ from: "sw", to: "v3", label: "VLAN 3", labelX: 700, labelY: 405 },
		],
	},
	"four-router-subnet-growth": {
		title: "Four-router subnet-allocation chain",
		note: "Existing /28 and /16 subnets lead to a new /27 office LAN sized for 20 hosts.",
		nodes: [
			{ id: "r1", kind: "router", name: "Router 1", x: 170, y: 250, details: ["10.0.225.0/28"] },
			{ id: "r2", kind: "router", name: "Router 2", x: 400, y: 250, details: ["10.0.225.16/28"] },
			{ id: "r3", kind: "router", name: "Router 3", x: 640, y: 250, details: ["10.0.225.64/28"] },
			{ id: "r4", kind: "router", name: "Router 4", x: 880, y: 250, details: ["20 hosts"] },
		],
		links: [
			{ from: "r1", to: "r2" }, { from: "r2", to: "r3" }, { from: "r3", to: "r4" },
		],
	},
	"ospf-multipath-reference-bandwidth": {
		title: "OSPF equal-cost path calculation",
		note: "R1 connects to R2 over parallel 1-Gbps and 10-Gbps links; R2 reaches R3 over 10 Gbps.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 300, details: ["Lo0 · 10.1.1.1"] },
			{ id: "r2", kind: "router", name: "R2", x: 600, y: 300, details: ["Lo0 · 10.2.2.2"] },
			{ id: "r3", kind: "router", name: "R3", x: 900, y: 300, details: ["Lo0 · 10.5.3.1"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "1 Gbps · 10.12.0.0/30", labelY: 200, offset: -12 },
			{ from: "r1", to: "r2", label: "10 Gbps · 10.12.0.4/30", labelY: 390, offset: 12 },
			{ from: "r2", to: "r3", label: "10 Gbps · 10.23.0.0/29", labelY: 250 },
		],
	},
	"cpe-dhcp-central-server": {
		title: "CPE and central DHCP server topology",
		note: "CPE serves the 172.20.1.0/24 LAN and relays DHCP requests to the server at 172.20.255.11.",
		nodes: [
			{ id: "pcs", kind: "host", name: "Client PCs", x: 200, y: 100 },
			{ id: "cpe", kind: "router", name: "CPE", x: 500, y: 320, details: ["Gi0/1 · 172.20.1.1/24", "Gi0/0 · 172.20.254.1/24"] },
			{ id: "network", kind: "network", name: "Company Network", x: 800, y: 320 },
			{ id: "dhcp", kind: "host", name: "DHCP Server", x: 800, y: 540, details: ["172.20.255.11"] },
		],
		links: [
			{ from: "pcs", to: "cpe", label: "172.20.1.0/24", labelX: 350, labelY: 190 },
			{ from: "cpe", to: "network", label: "172.20.254.0/24", labelY: 265 },
			{ from: "network", to: "dhcp" },
		],
	},
	"lacp-fastethernet-two-switch": {
		title: "FastEthernet LACP EtherChannel",
		note: "SW1 Fa0/1 and Fa0/2 connect to the corresponding SW2 interfaces as an EtherChannel.",
		nodes: [
			{ id: "s1", kind: "switch", name: "SW1", x: 280, y: 250 },
			{ id: "s2", kind: "switch", name: "SW2", x: 720, y: 250 },
		],
		links: [
			{ from: "s1", to: "s2", label: "Fa0/1 ↔ Fa0/1", labelY: 180, offset: -12 },
			{ from: "s1", to: "s2", label: "Fa0/2 ↔ Fa0/2", labelY: 315, offset: 12 },
		],
	},
	"stp-three-switch-triangle": {
		title: "Three-switch spanning-tree topology",
		note: "S1, S2, and S3 form a triangle; bridge priority and MAC address are shown for each switch.",
		nodes: [
			{ id: "s1", kind: "switch", name: "S1", x: 500, y: 100, details: ["Priority 32768", "MAC DDDD.DD…"] },
			{ id: "s2", kind: "switch", name: "S2", x: 250, y: 450, details: ["Priority 32768"] },
			{ id: "s3", kind: "switch", name: "S3", x: 750, y: 450, details: ["Priority 30000", "MAC CCCC.CC…"] },
		],
		links: [{ from: "s1", to: "s2" }, { from: "s1", to: "s3" }, { from: "s2", to: "s3" }],
	},
	"three-router-pc-routing": {
		title: "Three-router PC routing path",
		note: "R1–R2–R3 connect two user LANs over 10.10.1.0/30 and 10.10.2.0/30.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 170 },
			{ id: "r2", kind: "router", name: "R2", x: 580, y: 170 },
			{ id: "r3", kind: "router", name: "R3", x: 900, y: 170 },
			{ id: "pc1", kind: "host", name: "PC1", x: 250, y: 470, details: ["192.168.10.0/24"] },
			{ id: "pc2", kind: "host", name: "PC2", x: 900, y: 470, details: ["192.168.20.0/24"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "10.10.1.0/30", labelY: 115 },
			{ from: "r2", to: "r3", label: "10.10.2.0/30", labelY: 115 },
			{ from: "r1", to: "pc1", label: "Gi0/1" }, { from: "r3", to: "pc2", label: "Gi0/1" },
		],
	},
	"ospf-four-router-broadcast": {
		title: "Four-router OSPF broadcast network",
		note: "R1–R4 share an OSPF segment; router IDs and priorities determine the DR and BDR.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 140, details: ["RID 1.1.1.1 · Priority 2"] },
			{ id: "r2", kind: "router", name: "R2", x: 750, y: 140, details: ["RID 2.2.2.2 · Priority 1"] },
			{ id: "r3", kind: "router", name: "R3", x: 750, y: 500, details: ["RID 3.3.3.3 · Priority 2"] },
			{ id: "r4", kind: "router", name: "R4", x: 250, y: 500, details: ["RID 4.4.4.4 · Priority 1"] },
			{ id: "sw", kind: "network", name: "OSPF shared segment", x: 500, y: 320, details: ["192.168.100.0/16"] },
		],
		links: [
			{ from: "r1", to: "sw" }, { from: "r2", to: "sw" },
			{ from: "r3", to: "sw" }, { from: "r4", to: "sw" },
		],
	},
	"vlan-switch-web-server": {
		title: "VLAN 10 and VLAN 20 web-server topology",
		note: "Switch A connects VLAN 10 and VLAN 20 hosts to Switch B and the web server on 10.30.0.100/24.",
		nodes: [
			{ id: "s1", kind: "switch", name: "Switch A", x: 350, y: 300 },
			{ id: "s2", kind: "switch", name: "Switch B", x: 700, y: 300 },
			{ id: "p1", kind: "host", name: "VLAN 20 PC", x: 150, y: 120 },
			{ id: "p2", kind: "host", name: "VLAN 20 PC", x: 150, y: 500 },
			{ id: "p3", kind: "host", name: "VLAN 10 PC", x: 350, y: 560 },
			{ id: "server", kind: "host", name: "Web Server", x: 900, y: 120, details: ["10.30.0.100/24"] },
		],
		links: [
			{ from: "p1", to: "s1" }, { from: "p2", to: "s1" },
			{ from: "s1", to: "s2", label: "VLANs 10, 20, 30", labelY: 245 },
			{ from: "s1", to: "p3" }, { from: "s2", to: "server" },
		],
	},
	"r1-r2-database-security": {
		title: "R1–R2 internal database network",
		note: "R1 connects the 10.0.70.0/25 client LAN to R2 over two serial links; the database server is on R1's LAN.",
		nodes: [
			{ id: "db", kind: "host", name: "Internal Database", x: 150, y: 120, details: ["10.0.54.0/28"] },
			{ id: "sw1", kind: "switch", name: "Database switch", x: 300, y: 300 },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 300 },
			{ id: "r2", kind: "router", name: "R2", x: 800, y: 300 },
			{ id: "sw2", kind: "switch", name: "Client switch", x: 800, y: 500 },
			{ id: "pc", kind: "host", name: "PC", x: 800, y: 670, details: ["10.0.70.0/25"] },
			{ id: "lan", kind: "switch", name: "R1 Gi0/1 LAN", x: 500, y: 500, details: ["10.0.0.0/24"] },
		],
		links: [
			{ from: "db", to: "sw1" }, { from: "sw1", to: "r1", label: "Gi0/0" },
			{ from: "r1", to: "r2", label: "Serial0/0/0 ↔ Serial0/0/0", labelY: 245, offset: -10 },
			{ from: "r1", to: "r2", label: "Serial0/0/1 ↔ Serial0/0/1", labelY: 350, offset: 10 },
			{ from: "r1", to: "lan" }, { from: "r2", to: "sw2" }, { from: "sw2", to: "pc" },
		],
	},
	"static-nat-router-webserver": {
		title: "Static NAT web-server topology",
		note: "Webserver 172.16.1.2 connects to R1 Ethernet0; R1 Serial0 connects to the outside network.",
		nodes: [
			{ id: "web", kind: "host", name: "Webserver", x: 180, y: 230, details: ["172.16.1.2"] },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 230 },
			{ id: "outside", kind: "network", name: "Outside network", x: 820, y: 230 },
		],
		links: [
			{ from: "web", to: "r1", label: "Ethernet0", labelY: 180 },
			{ from: "r1", to: "outside", label: "Serial0", labelY: 180 },
		],
	},
	"dhcp-relay-r1-r2-server": {
		title: "R1–R2 DHCP relay topology",
		note: "R1's DHCP client LAN reaches the DHCP server on R2's network through a switch.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 200, y: 280 },
			{ id: "sw", kind: "switch", name: "Access switch", x: 450, y: 280 },
			{ id: "r2", kind: "router", name: "R2", x: 700, y: 280 },
			{ id: "dhcp", kind: "host", name: "DHCP Server", x: 930, y: 280, details: ["198.51.100.100"] },
		],
		links: [
			{ from: "r1", to: "sw", label: "Fa0/0", labelY: 230 },
			{ from: "sw", to: "r2", label: "192.0.2.2 · Gi0/0", labelY: 230 },
			{ from: "r2", to: "dhcp", label: "Gi0/1 · 198.51.100.1", labelY: 230 },
		],
	},
};

function nodeRadius(kind) {
	if (kind === "network") return 78;
	if (kind === "host") return 34;
	if (kind === "switch") return 38;
	return 34;
}

function topologyViewBox(topology) {
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	const include = (x, y, width = 0, height = 0) => {
		minX = Math.min(minX, x - width);
		maxX = Math.max(maxX, x + width);
		minY = Math.min(minY, y - height);
		maxY = Math.max(maxY, y + height);
	};
	const nodes = new Map(topology.nodes.map((node) => [node.id, node]));

	topology.nodes.forEach((node) => {
		const details = node.details ?? [];
		const textWidth = Math.max(nodeRadius(node.kind), node.name.length * 4, ...details.map((detail) => detail.length * 2.8));
		include(node.x, node.y, textWidth + 10, 36);
		include(node.x, node.y + 62 + details.length * 12, textWidth + 10, 8);
	});

	topology.links.forEach((link) => {
		if (!link.label) return;
		const from = nodes.get(link.from);
		const to = nodes.get(link.to);
		const labelX = link.labelX ?? (from.x + to.x) / 2;
		const labelY = link.labelY ?? (from.y + to.y) / 2 - 10;
		include(labelX, labelY, link.label.length * 3.5 + 8, 12);
	});

	if (!Number.isFinite(minX)) return { x: 0, y: 0, width: 1000, height: topology.height ?? 560 };
	const padding = 24;
	const x = Math.floor(minX - padding);
	const y = Math.floor(minY - padding);
	return {
		x,
		y,
		width: Math.ceil(maxX - minX + padding * 2),
		height: Math.ceil(maxY - minY + padding * 2),
	};
}

function TopologyLink({ link, nodes }) {
	const from = nodes.get(link.from);
	const to = nodes.get(link.to);
	const dx = to.x - from.x;
	const dy = to.y - from.y;
	const distance = Math.hypot(dx, dy) || 1;
	const offsetX = (-dy / distance) * (link.offset ?? 0);
	const offsetY = (dx / distance) * (link.offset ?? 0);
	const startRadius = nodeRadius(from.kind);
	const endRadius = nodeRadius(to.kind);
	const x1 = from.x + (dx / distance) * startRadius + offsetX;
	const y1 = from.y + (dy / distance) * startRadius + offsetY;
	const x2 = to.x - (dx / distance) * endRadius + offsetX;
	const y2 = to.y - (dy / distance) * endRadius + offsetY;
	const labelX = link.labelX ?? (x1 + x2) / 2;
	const labelY = link.labelY ?? (y1 + y2) / 2 - 10;

	return (
		<g>
			<line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#16a34a" strokeWidth="3" />
			<circle cx={x1} cy={y1} r="4" fill="#16a34a" />
			<circle cx={x2} cy={y2} r="4" fill="#16a34a" />
			{link.label && (
				<>
					<rect
						x={labelX - Math.max(22, link.label.length * 3.5 + 7)}
						y={labelY - 12}
						width={Math.max(44, link.label.length * 7 + 14)}
						height="20"
						rx="6"
						fill="white"
						fillOpacity="0.97"
						stroke="#dbe4ee"
					/>
					<text
						x={labelX}
						y={labelY + 3}
						textAnchor="middle"
						fontSize="12"
						fontWeight="600"
						fill="#334155"
					>
						{link.label}
					</text>
				</>
			)}
		</g>
	);
}

function TopologyDevice({ node }) {
	if (node.kind === "router") return <RouterIcon x={node.x} y={node.y} label={node.name} details={node.details} labelBackdrop />;
	if (node.kind === "switch") return <SwitchIcon x={node.x} y={node.y} label={node.name} details={node.details} labelBackdrop />;
	if (node.kind === "host") {
		const server = /server/i.test(node.name);
		return <PcIcon x={node.x} y={node.y} label={node.name} details={node.details} server={server} labelBackdrop />;
	}

	return (
		<g transform={`translate(${node.x} ${node.y})`}>
			<ellipse cx="0" cy="0" rx="72" ry="27" fill="#e0ecfb" stroke="#1775ee" strokeWidth="1.5" />
			<text x="0" y="4" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1775ee">{node.name}</text>
			{node.details?.length > 0 && (
				<rect
					x={-Math.max(36, ...node.details.map((detail) => detail.length * 2.8 + 8))}
					y="31"
					width={Math.max(72, ...node.details.map((detail) => detail.length * 5.6 + 16))}
					height={node.details.length * 12 + 10}
					rx="5"
					fill="white"
					stroke="#e2e8f0"
				/>
			)}
			{node.details?.map((detail, index) => (
				<text key={detail} x="0" y={40 + index * 12} textAnchor="middle" fontSize="9.5" fill="#4b5b78">{detail}</text>
			))}
		</g>
	);
}

export function ExhibitDiagram({ type, className = "" }) {
	const [openTheme, setOpenTheme] = useState(null);
	const wrapRef = useRef(null);
	const isRouterOnAStick = type === "router-on-a-stick-vlan20";
	const topology = isRouterOnAStick ? null : NETWORK_TOPOLOGIES[type];
	if (!isRouterOnAStick && !topology) return null;
	const title = topology?.title ?? "Network topology";
	const nodes = topology ? new Map(topology.nodes.map((node) => [node.id, node])) : null;
	const viewBox = topology
		? topology.viewBox ?? topologyViewBox(topology)
		: null;
	const renderDiagram = (expanded = false) => topology ? (
		<svg
			viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
			role="img"
			aria-label={title}
			className={expanded ? "block h-auto w-[1000px]" : "block h-auto w-full"}
		>
			<rect x={viewBox.x} y={viewBox.y} width={viewBox.width} height={viewBox.height} fill="#fff" />
			{topology.links.map((link, index) => (
				<TopologyLink key={`${link.from}-${link.to}-${index}`} link={link} nodes={nodes} />
			))}
			{topology.nodes.map((node) => <TopologyDevice key={node.id} node={node} />)}
		</svg>
	) : (
		<div className={expanded ? "w-[1000px]" : ""}>
			<div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
				<TopologyNode role="Router" name="R1" details={"E0/0\nSubinterface E0/0.20"} />
				<p className="text-center text-xs font-semibold text-[#526584]">E0/0 to E0/0</p>
				<TopologyNode role="Switch" name="SW1" details={"E0/0 trunk\nE0/1 trunk: VLANs 10, 20"} />
				<p className="text-center text-xs font-semibold text-[#526584]">E0/1 to E0/1</p>
				<TopologyNode role="Switch" name="SW2" details={"E0/1 trunk\nE0/2 access: VLAN 20"} />
				<p className="text-center text-xs font-semibold text-[#526584]">E0/2</p>
				<TopologyNode role="End device" name="VLAN 20 host" details="Connected to SW2 E0/2" />
			</div>
		</div>
	);

	return (
		<>
			<section ref={wrapRef} aria-label={title} className={`mb-4 rounded-2xl border border-[#d9e1ef] bg-[#f7f9fc] p-4 shadow-sm sm:p-5 ${className}`}>
				<div className="mb-1 flex items-center justify-between gap-3">
					<p className="text-xs font-bold uppercase tracking-wide text-[#526584]">{title}</p>
					<button
						type="button"
						onClick={() => setOpenTheme(pageTheme(wrapRef.current))}
						className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/25 bg-[#1e2b44]/90 px-3 py-1.5 text-xs font-bold text-white shadow transition hover:bg-[#28395a]"
					>
						<Maximize2 size={13} /> Expand
					</button>
				</div>
				{topology && <p className="mb-3 text-sm text-[#526584]">{topology.note}</p>}
				<div className={topology ? "overflow-x-auto rounded-xl border border-[#e2e8f0] bg-white p-2 sm:p-3" : ""}>{renderDiagram()}</div>
			</section>
			{openTheme && (
				<ZoomViewer title={title} theme={openTheme} onClose={() => setOpenTheme(null)}>
					{renderDiagram(true)}
				</ZoomViewer>
			)}
		</>
	);
}

/* Picture exhibit: always expandable, since diagrams shrink a lot on phones. */
export function ExhibitImage({ src, className = "", imageClassName = "", lazy = false, cropTop = false, offlineLayout = false }) {
	const [openTheme, setOpenTheme] = useState(null);
	const wrapRef = useRef(null);
	const image = offlineLayout
		? <img key={src} src={src} alt="Exhibit diagram" loading={lazy ? "lazy" : undefined} className={`block h-auto max-h-[75vh] w-auto max-w-full rounded-lg object-contain !max-h-[75vh] ${imageClassName}`} />
		: cropTop
		? (
			<div className="aspect-[578/260] w-full overflow-hidden rounded-lg bg-white">
				<img key={src} src={src} alt="Exhibit" loading={lazy ? "lazy" : undefined} className={`h-full w-full object-cover object-top ${imageClassName}`} />
			</div>
		)
		: <img key={src} src={src} alt="Exhibit diagram" loading={lazy ? "lazy" : undefined} className={`block h-auto w-auto max-w-full rounded-lg object-contain ${imageClassName}`} />;
	return (
		<div ref={wrapRef} className={`relative mx-auto ${offlineLayout ? "flex w-full max-w-full flex-col items-center gap-3 rounded-2xl border border-[#d6e5e7] bg-[#f8fafb] p-3 shadow-sm sm:p-4" : cropTop ? "w-full max-w-[36rem] rounded-xl border border-[#d6e5e7] bg-white p-2 shadow-sm sm:p-3" : "w-fit max-w-full rounded-xl border border-[#d6e5e7] bg-white p-2 shadow-sm sm:p-3"} ${className}`}>
			{image}
			<button
				type="button"
				onClick={() => setOpenTheme(pageTheme(wrapRef.current))}
				className={offlineLayout
					? "inline-flex min-h-10 items-center gap-1.5 self-end rounded-full border border-[#cbd5e1] bg-white px-4 py-2 text-sm font-semibold text-[#1e2b44] shadow-sm transition hover:bg-[#eef3f5]"
					: "absolute right-2 top-2 flex items-center gap-1.5 rounded-full border border-white/25 bg-[#1e2b44]/90 px-3 py-1.5 text-xs font-bold text-white shadow backdrop-blur transition hover:bg-[#28395a]"}
			>
				<Maximize2 size={13} /> Expand
			</button>
			{openTheme && (
				<ZoomViewer title="Exhibit" theme={openTheme} onClose={() => setOpenTheme(null)}>
					{cropTop && !offlineLayout
						? (
							<div className="aspect-[578/260] w-[36rem] max-w-[90vw] overflow-hidden rounded-lg bg-white">
								<img src={src} alt="Exhibit (full screen)" className="h-full w-full object-cover object-top" />
							</div>
						)
						: <img src={src} alt="Exhibit (full screen)" className="block max-w-none rounded-lg bg-white" />}
				</ZoomViewer>
			)}
		</div>
	);
}
