import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import { PcIcon, PhoneIcon, RouterIcon, SwitchIcon } from "../../../../training/cisco/ccna/labs/LabTopology";
import { topologyFitScale } from "../../../../../utils/topologyFit";
import { placeTopologyLabels, wrapTopologyNodeLabel } from "../../../../../utils/topologyLabels";
import {
	topologyLinkGeometry,
	topologyLinkLabelPosition,
	topologyPortLabelCandidates,
	topologyPortLabelParts,
	topologyPortLabelPositions,
} from "../../../../../utils/topologyGeometry";

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
		const fitScale = topologyFitScale(width, height, scroller.clientWidth, scroller.clientHeight);
		setNatural({ width, height });
		setFit(fitScale);
		setScale(fitScale);
	}, []);
	useLayoutEffect(() => {
		measure();
		const scroller = scrollerRef.current;
		const resizeObserver = new ResizeObserver(measure);
		if (scroller) resizeObserver.observe(scroller);
		const content = contentRef.current;
		const pendingImages = Array.from(content?.querySelectorAll("img") ?? []).filter((img) => !img.complete);
		pendingImages.forEach((img) => img.addEventListener("load", measure, { once: true }));
		return () => {
			resizeObserver.disconnect();
			pendingImages.forEach((img) => img.removeEventListener("load", measure));
		};
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
			<pre ref={boxRef} aria-label="Exhibit" className="ccna-term-output max-h-96 overflow-x-hidden overflow-y-auto whitespace-pre-wrap break-words p-4 text-xs leading-5 [overflow-wrap:anywhere] sm:text-[13px]"><code>{text}</code></pre>
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
			{details && <p className="mt-1 whitespace-pre-line text-xs leading-5 text-[#526584]">{details}</p>}
		</div>
	);
}

const NETWORK_TOPOLOGIES = {
	"switch-config-two-column-39": {
		title: "Switch A and Switch B configuration",
		viewBox: { x: 0, y: 0, width: 640, height: 320 },
		canvasBackground: "#fff",
		nodes: [],
		links: [],
		annotations: [
			{ x: 0, y: 0, lines: [], box: { x: 15, y: 15, width: 613, height: 300, fill: "#fff", stroke: "#4b4b4b", strokeWidth: 2, rx: 0 } },
			{ x: 0, y: 0, lines: [], box: { x: 321, y: 16, width: 2, height: 298, fill: "#4b4b4b", stroke: "none", rx: 0 } },
			{
				x: 27,
				y: 39,
				lines: [
					"Switch A",
					"Vlan 10,11,12,13",
					"",
					"interface GigabitEthernet0/1",
					"switchport mode trunk",
					"switchport trunk allowed vlan 10-12",
					"!",
					"interface GigabitEthernet0/4",
					"switchport access vlan 13",
					"switchport mode access",
				],
				indentLines: [4, 5, 8, 9],
				indentWidth: 7,
				lineHeight: 25,
				fontFamily: "Arial, Helvetica, sans-serif",
				fontSize: 16,
				fontWeight: 400,
				color: "#222",
			},
			{
				x: 337,
				y: 39,
				lines: [
					"Switch B",
					"Vlan 10,11,12,13",
					"",
					"interface GigabitEthernet0/1",
					"switchport mode trunk",
					"!",
					"interface GigabitEthernet0/3",
					"switchport access vlan 13",
					"switchport mode access",
				],
				indentLines: [4, 7, 8],
				indentWidth: 7,
				lineHeight: 25,
				fontFamily: "Arial, Helvetica, sans-serif",
				fontSize: 16,
				fontWeight: 400,
				color: "#222",
			},
		],
	},
	"voice-data-vlan300-400": {
		title: "Voice at Data VLAN Configuration sa GigabitEthernet1/1",
		viewBox: { x: 0, y: 0, width: 1000, height: 750 },
		canvasBackground: "#fff",
		nodes: [
			{ id: "router", kind: "router", name: "", x: 500, y: 335, scale: 2 },
			{ id: "switch", kind: "switch", name: "", x: 500, y: 535, scale: 2.2 },
			{ id: "phone", kind: "phone", name: "", x: 305, y: 635, scale: 2.3 },
			{ id: "pc", kind: "host", name: "", x: 705, y: 635, scale: 1.8 },
		],
		links: [
			{ points: [{ x: 480, y: 370 }, { x: 480, y: 490 }], color: "#222", strokeWidth: 2 },
			{ points: [{ x: 520, y: 370 }, { x: 520, y: 490 }], color: "#222", strokeWidth: 2 },
			{ points: [{ x: 430, y: 545 }, { x: 305, y: 545 }, { x: 305, y: 596 }], color: "#222", strokeWidth: 2 },
			{ points: [{ x: 570, y: 545 }, { x: 705, y: 545 }, { x: 705, y: 596 }], color: "#222", strokeWidth: 2 },
		],
		flowArrows: [
			{ points: [{ x: 300, y: 580 }, { x: 300, y: 520 }, { x: 430, y: 520 }], color: "#a01f24", strokeWidth: 4 },
			{ points: [{ x: 600, y: 520 }, { x: 730, y: 520 }, { x: 730, y: 580 }], color: "#176f96", strokeWidth: 4 },
		],
		annotations: [
			{ x: 40, y: 62, lines: ["Voice at Data VLAN Configuration sa GigabitEthernet1/1"], fontSize: 36, fontWeight: 700, color: "#111" },
			{ x: 0, y: 0, lines: [], box: { x: 610, y: 130, width: 360, height: 150, fill: "#f3f3f3", stroke: "#555", strokeWidth: 1.5, rx: 0 } },
			{ x: 622, y: 163, lines: ["interface GigabitEthernet1/1"], fontSize: 25, color: "#222" },
			{ x: 635, y: 198, lines: ["switchport mode access", "switchport access vlan 300", "switchport voice vlan 400"], lineHeight: 34, fontSize: 25, fontWeight: 700, color: "#222" },
			{ x: 265, y: 410, lines: ["GigabitEthernet1/1"], fontSize: 23, fontWeight: 700, color: "#111" },
			{ x: 155, y: 497, lines: ["Voice Traffic (VLAN 400)"], textAnchor: "middle", fontSize: 21, fontWeight: 700, color: "#8f1d22" },
			{ x: 155, y: 527, lines: ["Tagged Traffic (802.1Q)"], textAnchor: "middle", fontSize: 20, color: "#222" },
			{ x: 748, y: 497, lines: ["Data Traffic (VLAN 300)"], fontSize: 21, fontWeight: 700, color: "#176f96" },
			{ x: 748, y: 527, lines: ["Untagged Traffic"], fontSize: 20, color: "#222" },
			{ x: 500, y: 592, lines: ["Multilayer", "Switch"], textAnchor: "middle", lineHeight: 26, fontSize: 22, fontWeight: 700, color: "#111" },
			{ x: 155, y: 615, lines: ["IP Phone", "(VLAN 400 - Voice)"], textAnchor: "middle", lineHeight: 25, fontSize: 21, fontWeight: 700, color: "#111" },
			{ x: 305, y: 700, lines: ["IP Phone", "(VLAN 400 - Voice)"], textAnchor: "middle", lineHeight: 25, fontSize: 21, fontWeight: 700, color: "#111" },
			{ x: 855, y: 615, lines: ["PC", "(VLAN 300 - Data)"], textAnchor: "middle", lineHeight: 25, fontSize: 21, fontWeight: 700, color: "#111" },
			{ x: 705, y: 700, lines: ["PC (Host)", "(VLAN 300 - Data)"], textAnchor: "middle", lineHeight: 25, fontSize: 21, fontWeight: 700, color: "#111" },
		],
	},
	"candidate-vlan-roles-24": {
		title: "Exhibit: SW11 VLAN Configuration",
		viewBox: { x: 0, y: 0, width: 1000, height: 640 },
		canvasBackground: "#f1f0ec",
		rightLabels: {
			x: 760,
			y: 565,
			lineHeight: 30,
			fontSize: 18,
			fontWeight: 500,
			items: ["Data VLAN: 8", "Voice VLAN: 9"],
		},
		connectionMarkers: [
			{ x: 335, y: 297 },
			{ x: 571, y: 166 },
			{ x: 335, y: 333 },
			{ x: 568, y: 424 },
			{ x: 634, y: 430 },
			{ x: 796, y: 430 },
		],
		nodes: [
			{ id: "sw11", kind: "switch", name: "SW11", x: 300, y: 315 },
			{ id: "pc1", kind: "host", name: "PC-1", x: 600, y: 150 },
			{ id: "phone1", kind: "phone", name: "Phone-1", x: 600, y: 430 },
			{ id: "pc2", kind: "host", name: "PC-2", x: 830, y: 430 },
		],
		links: [
			{
				from: "sw11",
				to: "pc1",
				color: "#111827",
				label: "Gi1/1",
				labelX: 435,
				labelY: 270,
				fixedLabel: true,
				labelFontSize: 17,
				labelFontWeight: 500,
				extraLabels: [
					{ text: "Switch", x: 292, y: 270, fontSize: 20, fontWeight: 500 },
					{ text: "Data VLAN", x: 690, y: 185, fontSize: 20, fontWeight: 500 },
				],
			},
			{
				from: "sw11",
				to: "phone1",
				color: "#111827",
				label: "Gi1/3",
				labelX: 465,
				labelY: 420,
				fixedLabel: true,
				labelFontSize: 17,
				labelFontWeight: 500,
				extraLabels: [{ text: "Voice VLAN", x: 600, y: 385, fontSize: 20, fontWeight: 500 }],
			},
			{
				from: "phone1",
				to: "pc2",
				color: "#111827",
				extraLabels: [{ text: "Data VLAN", x: 790, y: 385, fontSize: 20, fontWeight: 500 }],
			},
		],
	},
	"candidate-acl-sources-29": {
		title: "ACL source-interface requirements",
		note: "The prompt specifies the permit/deny policy and source interfaces, but the live row omits addresses, topology, and ACL direction.",
		nodes: [
			{ id: "g00", kind: "network", name: "G0/0 source", x: 160, y: 150, details: ["Permit hosts"] },
			{ id: "router", kind: "router", name: "Router", x: 500, y: 230, details: ["ACL placement unknown"] },
			{ id: "gi01", kind: "network", name: "Gi0/1 source", x: 840, y: 310, details: ["Deny traffic"] },
		],
		links: [
			{ from: "g00", to: "router", label: "Permit" },
			{ from: "gi01", to: "router", label: "Deny" },
		],
	},
	"candidate-voice-data-66": {
		title: "Voice and data on SW1 Gi1/1",
		note: "The answer choices specify data VLAN 300 and voice VLAN 400 on the Gi1/1 access port.",
		nodes: [
			{ id: "data", kind: "network", name: "Data VLAN 300", x: 160, y: 220 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 500, y: 220, details: ["Gi1/1 · access VLAN 300", "Voice VLAN 400"] },
			{ id: "voice", kind: "network", name: "Voice VLAN 400", x: 840, y: 220 },
		],
		links: [
			{ from: "data", to: "sw1", label: "Access VLAN 300" },
			{ from: "sw1", to: "voice", label: "Voice VLAN 400" },
		],
	},
	"candidate-cdp-target-82": {
		title: "CDP visibility toward Router C",
		note: "The correct configuration disables CDP on Gi0/0/0, leaving the Gi0/0/1 path to Router C enabled.",
		nodes: [
			{ id: "other", kind: "network", name: "Other interface", x: 150, y: 220, details: ["CDP disabled"] },
			{ id: "routerA", kind: "router", name: "Router A", x: 500, y: 220, details: ["CDP enabled globally"] },
			{ id: "routerC", kind: "router", name: "Router C", x: 850, y: 220, details: ["Target neighbor"] },
		],
		links: [
			{ from: "other", to: "routerA", label: "Gi0/0/0 · no cdp enable" },
			{ from: "routerA", to: "routerC", label: "Gi0/0/1 · CDP enabled" },
		],
	},
	"candidate-ipv6-wan-159": {
		title: "R17 to R18 WAN reachability",
		note: "IPv6 addresses and prefixes shown here are taken from the answer choices for the R17–R18 WAN path.",
		nodes: [
			{ id: "r17", kind: "router", name: "R17", x: 180, y: 220, details: ["Fa0/0 · 2001:DB8:2::201/64", "Fa1/0 · 2001:DB8:3::201/64"] },
			{ id: "r18", kind: "router", name: "R18", x: 610, y: 220, details: ["Transit · 2001:DB8:3::301/64"] },
			{ id: "wan", kind: "network", name: "2001:DB8:4::/64", x: 940, y: 220, details: ["R18 · 2001:DB8:4::302/64"] },
		],
		links: [
			{ from: "r17", to: "r18", label: "2001:DB8:3::/64" },
			{ from: "r18", to: "wan", label: "WAN interface" },
		],
	},
	"wireless-zone-overlap": {
		title: "Wireless coverage zones and channel legend",
		note: "The source identifies Zones 3 and 4 as using Channel 11; other zone assignments were not recovered.",
		viewBox: { x: 0, y: 0, width: 500, height: 400 },
		nodes: [
			{ id: "zone1", kind: "network", shape: "wireless-coverage", name: "Zone 1", x: 95, y: 80 },
			{ id: "zone2", kind: "network", shape: "wireless-coverage", name: "Zone 2", x: 195, y: 80 },
			{ id: "zone3", kind: "network", shape: "wireless-coverage", name: "Zone 3", x: 295, y: 80, details: ["Channel 11"] },
			{ id: "zone4", kind: "network", shape: "wireless-coverage", name: "Zone 4", x: 395, y: 80, details: ["Channel 11"] },
			{ id: "zone5", kind: "network", shape: "wireless-coverage", name: "Zone 5", x: 95, y: 185 },
			{ id: "zone6", kind: "network", shape: "wireless-coverage", name: "Zone 6", x: 195, y: 185 },
			{ id: "zone7", kind: "network", shape: "wireless-coverage", name: "Zone 7", x: 295, y: 185 },
			{ id: "zone8", kind: "network", shape: "wireless-coverage", name: "Zone 8", x: 395, y: 185 },
			{ id: "channel1", kind: "network", shape: "wireless-channel", name: "Channel 1", x: 135, y: 330 },
			{ id: "channel6", kind: "network", shape: "wireless-channel", name: "Channel 6", x: 245, y: 330 },
			{ id: "channel11", kind: "network", shape: "wireless-channel", name: "Channel 11", x: 355, y: 330 },
		],
		links: [],
	},
	"candidate-etherchannel-198": {
		title: "SW1/SW2 LACP EtherChannel",
		note: "The answer choices use Gi0/1 and Gi0/2 as trunks, with LACP active on SW1 and passive on SW2.",
		nodes: [
			{ id: "pcsA", kind: "network", name: "PC group A", x: 120, y: 220 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 380, y: 220, details: ["Gi0/1 · Gi0/2 trunks", "LACP channel 1 · active"] },
			{ id: "sw2", kind: "switch", name: "SW2", x: 660, y: 220, details: ["Gi0/1 · Gi0/2 trunks", "LACP channel 1 · passive"] },
			{ id: "pcsB", kind: "network", name: "PC group B", x: 920, y: 220 },
		],
		links: [
			{ from: "pcsA", to: "sw1" },
			{ from: "sw1", to: "sw2", label: "Gi0/1 ↔ Gi0/1", offset: -12 },
			{ from: "sw1", to: "sw2", label: "Gi0/2 ↔ Gi0/2", offset: 12 },
			{ from: "sw2", to: "pcsB" },
		],
	},
	"vtp-transparent-frame-flow": {
		title: "VTP domain and VLAN 2 frame flow",
		note: "The sending switch adds VLAN ID 2 to frames from PC A; the receiving switch removes the VLAN ID before sending frames to PC B.",
		nodes: [
			{ id: "pcA", kind: "host", name: "PC A", x: 120, y: 440, details: ["VLAN 2"] },
			{ id: "sw1", kind: "switch", name: "Switch", x: 120, y: 240 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 500, y: 240, details: ["VTP transparent"] },
			{ id: "sw3", kind: "switch", name: "Switch", x: 880, y: 240 },
			{ id: "pcB", kind: "host", name: "PC B", x: 880, y: 440 },
		],
		links: [
			{ from: "pcA", to: "sw1", label: "Access · VLAN 2" },
			{ from: "sw1", to: "sw2", label: "Trunk · VLAN ID 2" },
			{ from: "sw2", to: "sw3", label: "Trunk · VLAN ID 2" },
			{ from: "sw3", to: "pcB", label: "Access · untagged" },
		],
	},
	"candidate-pc2-file-server-policy-703": {
		title: "PC2 access policy",
		note: "The answer choices identify PC2 as 192.168.2.10 and place ACL 1 outbound on R2 Gi0/1; no file-server address is specified.",
		nodes: [
			{ id: "pc2", kind: "host", name: "PC2", x: 140, y: 220, details: ["192.168.2.10"] },
			{ id: "policy", kind: "router", name: "R2", x: 500, y: 220, details: ["Gi0/1 · ACL 1 outbound", "deny PC2 · permit any"] },
			{ id: "server", kind: "host", name: "File server", x: 860, y: 140 },
			{ id: "other", kind: "network", name: "Other hosts", x: 860, y: 310 },
		],
		links: [
			{ from: "pc2", to: "policy" },
			{ from: "policy", to: "server", label: "Blocked", color: "#dc2626" },
			{ from: "policy", to: "other", label: "Allowed" },
		],
	},
	"candidate-router2-route-sources-832": {
		title: "Router 2 route-learning context",
		note: "The live row contains route-set options but no topology, neighbor identities, or routing-protocol data. The exact installed routes cannot be reconstructed.",
		nodes: [
			{ id: "router2", kind: "router", name: "Router 2", x: 380, y: 220, details: ["Installed routes unavailable"] },
			{ id: "neighbors", kind: "network", name: "Neighbor advertisements", x: 800, y: 220, details: ["Topology and protocols unavailable"] },
		],
		links: [{ from: "neighbors", to: "router2", label: "Route sources missing" }],
	},
	"candidate-workstation-fqdn-924": {
		title: "Workstation-to-server name resolution",
		note: "The prompt names Workstation 1, Server 1, and FQDN access. The live row omits the IP, gateway, and DNS values needed for a source-faithful exhibit.",
		nodes: [
			{ id: "workstation", kind: "host", name: "Workstation 1", x: 150, y: 220, details: ["IP settings unavailable"] },
			{ id: "network", kind: "network", name: "Network / DNS", x: 500, y: 220, details: ["Resolver details unavailable"] },
			{ id: "server", kind: "host", name: "Server 1", x: 850, y: 220, details: ["FQDN / IP unavailable"] },
		],
		links: [
			{ from: "workstation", to: "network", label: "Name resolution" },
			{ from: "network", to: "server" },
		],
	},
	"candidate-wifi-zones": {
		title: "2.4 GHz channel overlap",
		note: "The source identifies Zones 3 and 4 as using Channel 11; other zone assignments were not recovered.",
		nodes: [
			{ id: "zone3", kind: "network", name: "Zone 3", x: 250, y: 210, details: ["2.4 GHz", "Channel 11"] },
			{ id: "zone4", kind: "network", name: "Zone 4", x: 750, y: 210, details: ["2.4 GHz", "Channel 11"] },
		],
		links: [{ from: "zone3", to: "zone4", label: "Overlapping channel" }],
	},
	"candidate-static-route": {
		title: "Illustrative static-route path",
		note: "The question export did not include the original addresses. Documentation-only prefixes are used here for illustration.",
		nodes: [
			{ id: "hostA", kind: "host", name: "Host A", x: 120, y: 220, details: ["192.0.2.10/24"] },
			{ id: "r1", kind: "router", name: "R1", x: 380, y: 220, details: ["192.0.2.1/24"] },
			{ id: "r2", kind: "router", name: "R2", x: 640, y: 220, details: ["198.51.100.1/24"] },
			{ id: "hostB", kind: "host", name: "Host B", x: 900, y: 220, details: ["198.51.100.10/24"] },
		],
		links: [
			{ from: "hostA", to: "r1", label: "LAN A" },
			{ from: "r1", to: "r2", label: "Transit network" },
			{ from: "r2", to: "hostB", label: "LAN B" },
		],
	},
	"site-to-site-vpn-main-remote-campuses": {
		title: "Main Campus and Remote Campuses",
		viewBox: { x: 0, y: 0, width: 1000, height: 600 },
		canvasBackground: "#d0d0d0",
		rightLabels: {
			x: 850,
			y: 130,
			lineHeight: 170,
			fontSize: 13,
			fontWeight: 700,
			items: ["Remote Campus", "Remote Campus", "Remote Campus"],
		},
		nodes: [
			{ id: "main", kind: "router", name: "Main Campus", x: 125, y: 310 },
			{ id: "internet", kind: "network", shape: "cloud", name: "Internet", x: 475, y: 310 },
			{ id: "remote1", kind: "router", name: "", x: 820, y: 120 },
			{ id: "remote2", kind: "router", name: "", x: 820, y: 310 },
			{ id: "remote3", kind: "router", name: "", x: 820, y: 500 },
		],
		links: [
			{ from: "main", to: "internet", color: "#facc15", label: "S0/0/0", fixedLabel: true, labelX: 245, labelY: 292 },
			{ from: "internet", to: "remote1", color: "#facc15" },
			{ from: "internet", to: "remote2", color: "#facc15" },
			{ from: "internet", to: "remote3", color: "#facc15" },
		],
	},
	"pat-vlan-subnetting-100-200": {
		title: "PAT at VLAN Subnetting (VLAN 100 at VLAN 200)",
		viewBox: { x: 0, y: 0, width: 1250, height: 850 },
		canvasBackground: "#fff",
		nodes: [
			{ id: "isp", kind: "network", shape: "cloud", name: "Internet / ISP", x: 630, y: 120, fontSize: 19 },
			{ id: "router", kind: "router", name: "Router1", x: 630, y: 325 },
			{ id: "switch", kind: "switch", name: "", x: 630, y: 535 },
			{ id: "hostA", kind: "host", name: "Host A:", x: 350, y: 705, details: ["192.168.100.5"] },
			{ id: "hostB", kind: "host", name: "Host B:", x: 910, y: 705, details: ["192.168.200.10"] },
		],
		links: [
			{ from: "isp", to: "router", color: "#111827", points: [{ x: 630, y: 146 }, { x: 630, y: 309 }] },
			{ from: "router", to: "switch", color: "#111827", points: [{ x: 610, y: 350 }, { x: 610, y: 515 }] },
			{ from: "router", to: "switch", color: "#111827", points: [{ x: 650, y: 350 }, { x: 650, y: 515 }] },
			{ from: "switch", to: "hostA", color: "#111827", points: [{ x: 596, y: 535 }, { x: 350, y: 535 }, { x: 350, y: 683 }] },
			{ from: "switch", to: "hostB", color: "#111827", points: [{ x: 664, y: 535 }, { x: 910, y: 535 }, { x: 910, y: 683 }] },
		],
		flowArrows: [
			{ points: [{ x: 350, y: 683 }, { x: 350, y: 535 }, { x: 596, y: 535 }], color: "#1683b5" },
			{ points: [{ x: 664, y: 535 }, { x: 910, y: 535 }, { x: 910, y: 683 }], color: "#a3171b" },
			{ points: [{ x: 670, y: 285 }, { x: 670, y: 185 }], color: "#a3171b" },
			{ points: [{ x: 590, y: 185 }, { x: 590, y: 285 }], color: "#1683b5" },
		],
		connectionMarkers: [
			{ x: 610, y: 382, fill: "#1683b5", radius: 11 },
			{ x: 650, y: 382, fill: "#35a857", radius: 11 },
		],
		annotations: [
			{ x: 55, y: 235, lines: ["VLAN 100 Traffic → Walang NAT ->"], fontSize: 21, fontWeight: 700, color: "#167798" },
			{ x: 55, y: 264, lines: ["Internet (gamit ang 192.168.100.x)"], fontSize: 19, color: "#111827" },
			{ x: 805, y: 235, lines: ["VLAN 200 Traffic → May PAT (Overload)"], fontSize: 21, fontWeight: 700, color: "#9b1c22" },
			{ x: 805, y: 264, lines: ["-> Internet (isinasalin sa 209.165.201.2)"], fontSize: 19, color: "#111827" },
			{ x: 785, y: 130, lines: ["209.165.201.2"], fontSize: 22, fontWeight: 700, color: "#111827" },
			{ x: 785, y: 158, lines: ["(IP ng NAT outside)"], fontSize: 19, color: "#333" },
			{
				x: 607,
				y: 258,
				lines: ["gi1/0/0"],
				textAnchor: "middle",
				fontSize: 18,
				fontWeight: 700,
				color: "#fff",
				box: { x: 550, y: 230, width: 115, height: 36, fill: "#555" },
			},
			{ x: 510, y: 350, lines: ["Router1"], textAnchor: "end", fontSize: 24, fontWeight: 700, color: "#111827" },
			{
				x: 590,
				y: 425,
				lines: ["gi2/0/1.100"],
				textAnchor: "middle",
				fontSize: 19,
				fontWeight: 700,
				color: "#fff",
				box: { x: 505, y: 397, width: 170, height: 38, fill: "#1683b5" },
			},
			{
				x: 765,
				y: 425,
				lines: ["gi2/0/1.200"],
				textAnchor: "middle",
				fontSize: 19,
				fontWeight: 700,
				color: "#fff",
				box: { x: 680, y: 397, width: 170, height: 38, fill: "#35a857" },
			},
			{ x: 590, y: 463, lines: ["192.168.100.0/24"], textAnchor: "middle", fontSize: 19, color: "#111827" },
			{ x: 765, y: 463, lines: ["192.168.200.0/24"], textAnchor: "middle", fontSize: 19, color: "#111827" },
			{
				x: 780,
				y: 320,
				lines: [
					"access-list 99 permit 192.168.200.0 0.0.0.255",
					"ip nat inside source list 99 interface gi1/0/0 overload",
				],
				lineHeight: 25,
				fontSize: 16,
				fontFamily: "monospace",
				color: "#111827",
				box: { x: 760, y: 290, width: 440, height: 72, fill: "#f8f8f8", stroke: "#555" },
			},
			{ x: 145, y: 495, lines: ["VLAN 100:"], fontSize: 22, fontWeight: 700, color: "#167798" },
			{ x: 105, y: 525, lines: ["Gagamit ng sariling", "IP address (No NAT)"], lineHeight: 26, fontSize: 20, fontWeight: 700, color: "#111827" },
			{ x: 970, y: 495, lines: ["VLAN 200:"], fontSize: 22, fontWeight: 700, color: "#9b1c22" },
			{ x: 930, y: 525, lines: ["Isasailalim sa PAT", "(NAT overload)"], lineHeight: 26, fontSize: 20, fontWeight: 700, color: "#111827" },
			{ x: 630, y: 600, lines: ["Multilayer", "Switch"], textAnchor: "middle", lineHeight: 28, fontSize: 21, fontWeight: 700, color: "#111827" },
		],
	},
	"standard-acl-subnet-a-b-gi02": {
		title: "Exhibit for Question 77: Network Topology",
		viewBox: { x: 0, y: 0, width: 1200, height: 760 },
		canvasBackground: "#fff",
		nodes: [
			{ id: "subnetA", kind: "network", shape: "cloud", name: "", x: 200, y: 350, scale: 1.45, fill: "#fff", stroke: "#2c697f" },
			{ id: "subnetB", kind: "network", shape: "cloud", name: "", x: 1000, y: 350, scale: 1.45, fill: "#fff", stroke: "#2c697f" },
			{ id: "core", kind: "network", shape: "cloud", name: "", x: 600, y: 575, scale: 1.45, fill: "#fff", stroke: "#2c697f" },
			{ id: "pcA", kind: "host", name: "PC-A", x: 200, y: 310, details: ["(10.100.100.10)"] },
			{ id: "pcB", kind: "host", name: "PC-B", x: 1000, y: 310, details: ["(192.168.10.10)"] },
			{ id: "r1", kind: "router", name: "R1", x: 600, y: 335 },
		],
		links: [
			{ from: "subnetA", to: "r1", color: "#111827", points: [{ x: 322, y: 350 }, { x: 568, y: 335 }] },
			{ from: "r1", to: "subnetB", color: "#111827", points: [{ x: 632, y: 335 }, { x: 878, y: 350 }] },
			{ from: "r1", to: "core", color: "#111827", points: [{ x: 600, y: 357 }, { x: 600, y: 478 }] },
		],
		flowArrows: [
			{ points: [{ x: 405, y: 305 }, { x: 545, y: 305 }], color: "#57b46e" },
			{ points: [{ x: 655, y: 305 }, { x: 795, y: 305 }], color: "#bf252a" },
			{ points: [{ x: 615, y: 405 }, { x: 615, y: 465 }], color: "#8bcf9a" },
		],
		annotations: [
			{ x: 200, y: 205, lines: ["Subnet A:"], textAnchor: "middle", fontSize: 22, fontWeight: 700, color: "#111827" },
			{ x: 200, y: 233, lines: ["10.100.100.0/24"], textAnchor: "middle", fontSize: 20, fontWeight: 700, color: "#111827" },
			{ x: 1000, y: 205, lines: ["Subnet B:"], textAnchor: "middle", fontSize: 22, fontWeight: 700, color: "#111827" },
			{ x: 1000, y: 233, lines: ["192.168.0.0/16"], textAnchor: "middle", fontSize: 20, fontWeight: 700, color: "#111827" },
			{ x: 430, y: 290, lines: ["permit"], textAnchor: "middle", fontSize: 19, color: "#111827" },
			{ x: 520, y: 289, lines: ["✓"], textAnchor: "middle", fontSize: 29, fontWeight: 700, color: "#348a4b" },
			{ x: 700, y: 290, lines: ["deny"], textAnchor: "middle", fontSize: 19, color: "#111827" },
			{ x: 790, y: 289, lines: ["✕"], textAnchor: "middle", fontSize: 27, fontWeight: 700, color: "#b32026" },
			{ x: 558, y: 319, lines: ["Gi0/0"], textAnchor: "end", fontSize: 17, color: "#111827" },
			{ x: 435, y: 369, lines: ["GigabitEthernet0/0"], textAnchor: "middle", fontSize: 17, color: "#111827" },
			{ x: 642, y: 319, lines: ["Gi0/1"], fontSize: 17, color: "#111827" },
			{ x: 580, y: 394, lines: ["Gi0/2"], textAnchor: "end", fontSize: 17, color: "#111827" },
			{ x: 630, y: 402, lines: ["GigabitEthernet0/2"], fontSize: 17, color: "#111827" },
			{ x: 630, y: 425, lines: ["172.16.0.1"], fontSize: 17, color: "#111827" },
			{
				x: 700,
				y: 493,
				lines: ["99"],
				textAnchor: "middle",
				fontSize: 20,
				fontWeight: 700,
				color: "#fff",
				box: { x: 675, y: 464, width: 50, height: 42, fill: "#315f82", stroke: "#244b68", rx: 12 },
			},
			{ x: 740, y: 480, lines: ["Outbound Access List", "Applied: ACL 99"], lineHeight: 23, fontSize: 18, color: "#111827" },
			{ x: 600, y: 568, lines: ["Core Network /", "Destination"], textAnchor: "middle", lineHeight: 25, fontSize: 20, fontWeight: 700, color: "#111827" },
			{
				x: 95,
				y: 701,
				lines: [
					"Scenario Goal: Create a standard access list that permits traffic from 'Subnet A' and denies",
					"traffic from 'Subnet B', to be applied to traffic leaving Gi0/2.",
				],
				lineHeight: 23,
				fontSize: 17,
				color: "#111827",
				box: { x: 80, y: 676, width: 1040, height: 60, fill: "#f4f4f4", stroke: "#777" },
			},
		],
	},
	"candidate-host-c-gateway": {
		title: "Host C default-gateway mismatch",
		note: "Router A's LAN address is 192.168.1.254; Host C is configured with the incorrect gateway 192.168.1.1.",
		nodes: [
			{ id: "router", kind: "router", name: "Router A", x: 270, y: 220, details: ["Gi0/0/0 · 192.168.1.254"] },
			{ id: "lan", kind: "network", name: "192.168.1.0/24 LAN", x: 590, y: 220 },
			{ id: "host", kind: "host", name: "Host C", x: 900, y: 220, details: ["Default gateway · 192.168.1.1 (incorrect)"] },
		],
		links: [
			{ from: "router", to: "lan" },
			{ from: "lan", to: "host" },
		],
	},
	"routing-protocols-prefix": {
		title: "Router1 routes to 10.10.10.0/24",
		note: "Router1 learns the same destination through five routing methods.",
		nodes: [
			{ id: "router", kind: "router", name: "Router1", x: 220, y: 300 },
			{ id: "network", kind: "network", name: "10.10.10.0/24", x: 780, y: 300 },
		],
		links: [
			{
				from: "router",
				to: "network",
				label: "OSPF · eBGP · Static",
				secondaryLabel: "EIGRP · iBGP",
				labelX: 500,
				labelY: 270,
				fixedLabel: true,
			},
		],
	},
	"dc-hq-interface-addressing": {
		title: "DC-1 and HQ-1 interface addressing",
		note: "Select the address command that matches each interface requirement; no link between the routers is specified.",
		nodes: [
			{
				id: "dc1",
				kind: "router",
				name: "DC-1",
				x: 300,
				y: 220,
				details: ["Gi1/0 · last usable /30", "Gi1/1 · first usable /29", "Gi1/2 · last usable /28"],
			},
			{
				id: "hq1",
				kind: "router",
				name: "HQ-1",
				x: 700,
				y: 220,
				details: ["Gi1/3 · last usable /29"],
			},
		],
		links: [],
	},
	"r14-r86-ospf-adjacency": {
		title: "R14 and R86 OSPF adjacency",
		note: "Both FastEthernet0/0 interfaces share the 10.73.65.64/30 Ethernet network in OSPF area 0.",
		nodes: [
			{ id: "r14", kind: "router", name: "R14", x: 180, y: 250, details: ["Fa0/0 · 10.73.65.65/30"] },
			{ id: "segment", kind: "network", name: "Shared Ethernet segment", x: 500, y: 250, details: ["10.73.65.64/30", "OSPF area 0"] },
			{ id: "r86", kind: "router", name: "R86", x: 820, y: 250, details: ["Fa0/0 · 10.73.65.66/30"] },
		],
		links: [
			{ from: "r14", to: "segment", label: "Fa0/0" },
			{ from: "segment", to: "r86", label: "Fa0/0" },
		],
	},
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
	"ipv6-block-r1-r2-716": {
		title: "IPv6 block and access LANs",
		note: "Address block: 2001:DB8:FFFF:FCF3::/64",
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
		viewBox: { x: 25, y: 0, width: 950, height: 600 },
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 205, details: ["10.10.10.1"] },
			{ id: "sw", kind: "switch", name: "Shared segment", x: 500, y: 205, details: ["Fa0/0 · area 0"] },
			{ id: "r2", kind: "router", name: "R2", x: 750, y: 205, details: ["10.10.10.2"] },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 425, details: ["10.10.10.3"] },
		],
		links: [
			{ from: "r1", to: "sw", label: "Fa0/0 ↔ Fa0/0", labelX: 375, labelY: 175 },
			{ from: "sw", to: "r2", label: "Fa0/2 ↔ Fa0/2", labelX: 625, labelY: 175 },
			{ from: "sw", to: "r3", label: "Fa0/1 ↔ Fa0/1", labelX: 560, labelY: 320 },
		],
		annotations: [
			{ x: 500, y: 34, lines: ["10.0.0.0/24"], textAnchor: "middle", fontSize: 16 },
			{ x: 740, y: 505, lines: ["OSPF", "Area 0"], fontSize: 16, fontWeight: 700 },
			{
				x: 0,
				y: 0,
				lines: [],
				ellipse: { cx: 500, cy: 300, rx: 450, ry: 260, fill: "none", stroke: "#444", strokeWidth: 1.5 },
			},
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
	"routers-abc-floating-route-source": {
		title: "Router A, Router B, and Router C networks",
		note: "Network labels and interfaces are reproduced from the source exhibit.",
		configuration: "RouterA(config)#ip route 0.0.0.0 0.0.0.0 172.168.177.2",
		nodes: [
			{ id: "a", kind: "router", name: "Router A", x: 260, y: 180 },
			{ id: "b", kind: "router", name: "Router B", x: 740, y: 140 },
			{ id: "c", kind: "router", name: "Router C", x: 260, y: 440 },
		],
		links: [
			{
				from: "a",
				to: "b",
				label: "Gi0/0/0 ↔ Gi0/0/0 · 10.170.5.0/24",
				labelX: 500,
				labelY: 112,
				labelConnector: true,
				color: "#dc2626",
			},
			{
				from: "a",
				to: "c",
				label: "Gi0/0/1 ↔ Gi0/0/0 · 172.40.39.0/24",
				labelX: 180,
				labelY: 310,
				labelConnector: true,
				color: "#dc2626",
			},
			{
				from: "c",
				to: "b",
				label: "Gi0/0/1 · 192.82.43.0/24",
				labelX: 540,
				labelY: 330,
				labelConnector: true,
				color: "#dc2626",
			},
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
	"r14-r86-pc10-host-route": {
		title: "R14–R86 PC10 host route",
		note: "R14 and R86 connect over 10.73.65.64/30. PC10 (.10) is on R86's Fa0/1 LAN 10.80.65.0/28.",
		height: 650,
		nodes: [
			{ id: "r14", kind: "router", name: "R14", x: 230, y: 210, details: ["Loopback0 · 10.10.1.14/32"] },
			{ id: "r86", kind: "router", name: "R86", x: 650, y: 210, details: ["Loopback0 · 10.10.1.86/32"] },
			{ id: "lan", kind: "network", name: "10.80.65.0/28", x: 650, y: 390 },
			{ id: "pc10", kind: "host", name: "PC10", x: 650, y: 545, details: ["10.80.65.10"] },
		],
		links: [
			{ from: "r14", to: "r86", label: "10.73.65.64/30 · Fa0/0 · .65 ↔ .66", labelY: 155 },
			{ from: "r86", to: "lan", label: "Fa0/1", labelX: 725, labelY: 305 },
			{ from: "lan", to: "pc10" },
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
			{ from: "b1", to: "b2", label: "10G · VLAN 5", labelY: 115, labelConnector: true },
			{ from: "b1", to: "b3", label: "10G", labelX: 235, labelConnector: true },
			{ from: "b2", to: "b4", label: "10G", labelX: 765, labelConnector: true },
			{ from: "b3", to: "b4", label: "10G · VLAN 5", labelY: 440, labelConnector: true },
		],
	},
	"r4-mixed-routing": {
		title: "R4 mixed-protocol routing topology",
		note: "R4 connects to R1 with OSPF, R2 with BGP, and R3 with EIGRP; the server is 10.10.10.10.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 520, y: 95, details: ["OSPF area 20"] },
			{ id: "r4", kind: "router", name: "R4", x: 330, y: 280, details: ["BGP AS 65513"] },
			{ id: "r2", kind: "router", name: "R2", x: 650, y: 280, details: ["BGP AS 65512"] },
			{ id: "r3", kind: "router", name: "R3", x: 520, y: 470, details: ["EIGRP 44"] },
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
	"ospf-point-to-point-r1-r2-source": {
		title: "R1–R2 OSPF point-to-point topology",
		note: "R1 Se0/1 and R2 Se0/1 share 172.137.191.0/30; R1 Gi0/1 serves 172.139.8.0/24 and R2 Gi0/1 serves 10.168.119.0/24.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 170, details: [".1"] },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 170, details: [".2"] },
			{ id: "lan1", kind: "network", name: "172.139.8.0/24", x: 280, y: 425 },
			{ id: "lan2", kind: "network", name: "10.168.119.0/24", x: 720, y: 425 },
		],
		links: [
			{ from: "r1", to: "r2", label: "Se0/1 · 172.137.191.0/30 · Se0/1", labelY: 125 },
			{ from: "r1", to: "lan1", label: "Gi0/1", labelX: 340, labelY: 300 },
			{ from: "r2", to: "lan2", label: "Gi0/1", labelX: 660, labelY: 300 },
		],
	},
	"ospf-two-site-workstations": {
		title: "R1–R2 OSPF workstation networks",
		note: "R1 and R2 share 10.0.0.0/30 on Gi0/0 (.1 and .2). R1 serves Workstations on 10.0.1.0/24; R2 serves Workstations on 10.0.2.0/24.",
		height: 680,
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 105 },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 105 },
			{ id: "sw3", kind: "switch", name: "SW3", x: 280, y: 260 },
			{ id: "sw4", kind: "switch", name: "SW4", x: 720, y: 260 },
			{ id: "phone1", kind: "phone", name: "IP", x: 210, y: 390 },
			{ id: "phone2", kind: "phone", name: "IP", x: 350, y: 390 },
			{ id: "phone3", kind: "phone", name: "IP", x: 650, y: 390 },
			{ id: "phone4", kind: "phone", name: "IP", x: 790, y: 390 },
			{ id: "pc1", kind: "host", name: "PC", x: 210, y: 525 },
			{ id: "pc2", kind: "host", name: "PC", x: 350, y: 525 },
			{ id: "pc3", kind: "host", name: "PC", x: 650, y: 525 },
			{ id: "pc4", kind: "host", name: "PC", x: 790, y: 525 },
		],
		links: [
			{ from: "r1", to: "r2", label: "10.0.0.0/30 · Gi0/0 · .1 ↔ Gi0/0 · .2", labelY: 58 },
			{ from: "r1", to: "sw3" },
			{ from: "r2", to: "sw4" },
			{ from: "sw3", to: "phone1" },
			{ from: "sw3", to: "phone2" },
			{ from: "sw4", to: "phone3" },
			{ from: "sw4", to: "phone4" },
			{ from: "phone1", to: "pc1" },
			{ from: "phone2", to: "pc2" },
			{ from: "phone3", to: "pc3" },
			{ from: "phone4", to: "pc4" },
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
			{
				from: "sw1",
				to: "sw2",
				label: "Gi1/1 ↔ Gi1/1 · trunk · VLANs 2–20",
				labelY: 200,
				labelConnector: true,
			},
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
			{ from: "sw1", to: "sw2", label: "Ethernet0/2 ↔ Ethernet0/2", labelY: 245 },
			{ from: "sw2", to: "lan", label: "Ethernet0/2", labelY: 250 },
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
	"two-router-port-security-704": {
		title: "Two-router workstation topology",
		note: "R1–R2 transit: 10.0.0.0/30 · R1 LAN: 10.0.1.0/24 · R2 LAN: 10.0.2.0/24",
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
			{ from: "r1", to: "r2", label: "Gi0/0 ↔ Gi0/0 · 10.0.0.0/30", labelY: 75 },
			{ from: "r1", to: "sw1", label: "Gi0/1 · 10.0.1.0/24", labelX: 335, labelY: 225 },
			{ from: "r2", to: "sw2", label: "Gi0/1 · 10.0.2.0/24", labelX: 665, labelY: 225 },
			{ from: "sw1", to: "pc1", label: "Gi0/2" }, { from: "sw1", to: "pc2", label: "Gi0/3" },
			{ from: "sw2", to: "pc3", label: "Gi0/2" }, { from: "sw2", to: "pc4", label: "Gi0/3" },
		],
	},
	"voice-vlan-two-switch": {
		title: "Voice and data VLAN topology",
		note: "Each switch carries data VLAN 50 and voice VLAN 61; the attached PC connects through an IP phone.",
		nodes: [
			{ id: "a", kind: "switch", name: "Switch A", x: 280, y: 170 },
			{ id: "b", kind: "switch", name: "Switch B", x: 720, y: 170 },
			{ id: "phonea", kind: "phone", name: "IP Phone", x: 280, y: 330 },
			{ id: "phoneb", kind: "phone", name: "IP Phone", x: 720, y: 330 },
			{ id: "pca", kind: "host", name: "PC A", x: 280, y: 485 },
			{ id: "pcb", kind: "host", name: "PC B", x: 720, y: 485 },
		],
		links: [
			{
				from: "a",
				to: "b",
				label: "Gi0/0 ↔ Gi0/0 · Data VLAN 50 · Voice VLAN 61",
				labelY: 125,
				labelConnector: true,
				color: "#dc2626",
			},
			{ from: "a", to: "phonea", label: "Gi0/1", labelX: 335, labelY: 275, color: "#dc2626" },
			{ from: "b", to: "phoneb", label: "Gi0/1", labelX: 665, labelY: 275, color: "#dc2626" },
			{ from: "phonea", to: "pca", color: "#dc2626" },
			{ from: "phoneb", to: "pcb", color: "#dc2626" },
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
		note: "Router 1 connects to the ISP and both switches; the server and all six hosts are shown individually in the same VLAN.",
		nodes: [
			{ id: "isp", kind: "network", name: "ISP", x: 500, y: 55 },
			{ id: "r1", kind: "router", name: "Router 1", x: 500, y: 160 },
			{ id: "s1", kind: "switch", name: "Switch 1", x: 340, y: 305 },
			{ id: "s2", kind: "switch", name: "Switch 2", x: 660, y: 305 },
			{ id: "server", kind: "host", name: "Server", x: 130, y: 425 },
			{ id: "h1", kind: "host", name: "Host 1", x: 230, y: 485 },
			{ id: "h2", kind: "host", name: "Host 2", x: 340, y: 515 },
			{ id: "h3", kind: "host", name: "Host 3", x: 450, y: 485 },
			{ id: "h4", kind: "host", name: "Host 4", x: 550, y: 485 },
			{ id: "h5", kind: "host", name: "Host 5", x: 660, y: 515 },
			{ id: "h6", kind: "host", name: "Host 6", x: 770, y: 485 },
		],
		links: [
			{ from: "isp", to: "r1" },
			{ from: "r1", to: "s1", label: "10.142.137.1/24", labelX: 365, labelY: 235 },
			{ from: "r1", to: "s2", label: "172.25.117.2/24", labelX: 635, labelY: 235 },
			{ from: "s1", to: "s2" },
			{ from: "s1", to: "server" },
			{ from: "s1", to: "h1" },
			{ from: "s1", to: "h2" },
			{ from: "s1", to: "h3" },
			{ from: "s2", to: "h4" },
			{ from: "s2", to: "h5" },
			{ from: "s2", to: "h6" },
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
		viewBox: { x: 0, y: 0, width: 1000, height: 430 },
		nodes: [
			{ id: "r1", kind: "router", name: "Router1", x: 280, y: 220, details: ["192.168.0.2"] },
			{ id: "r2", kind: "router", name: "Router2", x: 720, y: 220, details: ["192.168.0.3", "Loopback0 · 172.17.0.1"] },
		],
		links: [{ from: "r1", to: "r2", label: "NTP link", labelY: 170 }],
		annotations: [
			{
				x: 500,
				y: 385,
				lines: ["The ntp server 192.168.0.2 command has been configured."],
				textAnchor: "middle",
				fontSize: 16,
				color: "#333",
			},
		],
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
	"router-internet-two-lans-four-pcs": {
		title: "Router, Internet, and two switched LANs",
		viewBox: { x: 0, y: 0, width: 900, height: 720 },
		nodes: [
			{ id: "router", kind: "router", name: "ROUTER-1", x: 450, y: 125 },
			{ id: "internet", kind: "network", shape: "cloud", name: "Internet", x: 760, y: 120 },
			{ id: "switch1", kind: "switch", name: "SWITCH-1", x: 270, y: 355 },
			{ id: "switch2", kind: "switch", name: "SWITCH-2", x: 650, y: 355 },
			{ id: "pc1", kind: "host", name: "PC", x: 165, y: 560 },
			{ id: "pc2", kind: "host", name: "PC", x: 375, y: 560 },
			{ id: "pc3", kind: "host", name: "PC", x: 545, y: 560 },
			{ id: "pc4", kind: "host", name: "PC", x: 755, y: 560 },
		],
		links: [
			{ from: "router", to: "internet", label: ".1", fixedLabel: true, labelX: 575, labelY: 105 },
			{ from: "router", to: "switch1", label: ".2", fixedLabel: true, labelX: 350, labelY: 230 },
			{ from: "router", to: "switch2" },
			{ from: "switch1", to: "pc1" },
			{ from: "switch1", to: "pc2" },
			{ from: "switch2", to: "pc3" },
			{ from: "switch2", to: "pc4" },
		],
		annotations: [
			{ x: 270, y: 665, lines: ["Subnet", "192.168.1.0/24"], textAnchor: "middle", fontSize: 13, lineHeight: 18 },
			{ x: 650, y: 665, lines: ["Subnet", "192.168.1.0/24"], textAnchor: "middle", fontSize: 13, lineHeight: 18 },
		],
	},
	"ipv6-three-router-policy": {
		title: "Three-router IPv6 routing topology",
		note: "R2 and R3 connect to one shared 2001:db8:23::/64 LAN; three PCs and a separate addressed PC are attached to it.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 100 },
			{ id: "r2", kind: "router", name: "R2", x: 260, y: 315, details: ["fd00:59:12::2/64"] },
			{ id: "r3", kind: "router", name: "R3", x: 740, y: 315, details: ["fd00:59:13::3/64"] },
			{ id: "lan", kind: "network", name: "2001:db8:23::/64", x: 500, y: 495 },
			{ id: "pc1", kind: "host", name: "", x: 210, y: 680 },
			{ id: "pc2", kind: "host", name: "", x: 290, y: 680 },
			{ id: "pc3", kind: "host", name: "", x: 370, y: 680 },
			{ id: "pc4", kind: "host", name: "", x: 750, y: 680, details: ["2001:db8:23::14/64"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "fd00:59:12::1/64", labelX: 360, labelY: 190 },
			{ from: "r1", to: "r3", label: "fd00:59:13::1/64", labelX: 640, labelY: 190 },
			{ from: "r2", to: "lan" },
			{ from: "r3", to: "lan" },
			{ from: "lan", to: "pc1" },
			{ from: "lan", to: "pc2" },
			{ from: "lan", to: "pc3" },
			{ from: "lan", to: "pc4" },
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
		note: "PC-1 and PC-2 connect through SW1 to RTR-1 Gi0/0 on 10.150.1.0/24; the configuration exhibit is reproduced below.",
		nodes: [
			{ id: "r", kind: "router", name: "RTR-1", x: 500, y: 100, details: ["Gi0/0 · 10.150.1.254/24"] },
			{ id: "sw", kind: "switch", name: "SW1", x: 500, y: 300 },
			{ id: "p1", kind: "host", name: "PC-1", x: 320, y: 510, details: ["10.150.1.1/24"] },
			{ id: "p2", kind: "host", name: "PC-2", x: 680, y: 510, details: ["10.150.1.2/24"] },
		],
		links: [
			{ from: "r", to: "sw", label: "Gi0/0", labelX: 570, labelY: 205 },
			{ from: "sw", to: "p1" }, { from: "sw", to: "p2" },
		],
	},
	"r1-primary-backup-internet": {
		title: "Primary and backup Internet routes",
		note: "R1 connects the 192.150.16.0/24 LAN to the Internet through primary R3 and backup R2 paths.",
		nodes: [
			{ id: "sw", kind: "switch", name: "Switch", x: 300, y: 120 },
			{ id: "pc", kind: "host", name: "PC1", x: 780, y: 120, details: ["192.150.16.1"] },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 300, details: ["Gi0/0 · 192.150.16.2", "Gi0/1 · 10.151.9.226", "Gi0/2 · 172.73.189.4"] },
			{ id: "r2", kind: "router", name: "R2", x: 210, y: 530, details: ["Gi0/0 · 10.151.9.230"] },
			{ id: "r3", kind: "router", name: "R3", x: 790, y: 530, details: ["Gi0/0 · 172.73.189.5"] },
			{ id: "internet", kind: "network", name: "Internet", x: 500, y: 700 },
		],
		links: [
			{ from: "sw", to: "pc", label: "192.150.16.0/24", labelY: 75 },
			{ from: "sw", to: "r1", label: "Gi0/0", labelX: 390, labelY: 210 },
			{ from: "r1", to: "r2", label: "Gi0/1 · 10.151.9.224/27 · .226 ↔ .230", labelX: 315, labelY: 415 },
			{ from: "r1", to: "r3", label: "Gi0/2 · 172.73.189.0/27 · .4 ↔ .5", labelX: 685, labelY: 415 },
			{ from: "r2", to: "internet" }, { from: "r3", to: "internet" },
		],
	},
	"management-server-filter": {
		title: "Management and server networks",
		note: "Management LAN: 10.1.1.0/24 (.10 at the switch side, .5 at R1). Transit link: 192.168.1.0/24 (.15 at R1, .10 at R2). Server LAN: 172.16.2.0/24; the new server is .2.",
		nodes: [
			{ id: "p1", kind: "host", name: "PC1", x: 130, y: 130, details: ["Management LAN"] },
			{ id: "p2", kind: "host", name: "PC2", x: 130, y: 500, details: ["Management LAN"] },
			{ id: "sw1", kind: "switch", name: "Management switch", x: 330, y: 315 },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 315 },
			{ id: "r2", kind: "router", name: "R2", x: 700, y: 315 },
			{ id: "sw2", kind: "switch", name: "Server switch", x: 850, y: 315 },
			{ id: "server", kind: "host", name: "New Server", x: 850, y: 510, details: ["172.16.2.0/24", "172.16.2.2"] },
		],
		links: [
			{ from: "p1", to: "sw1" }, { from: "p2", to: "sw1" },
			{ from: "sw1", to: "r1", label: "Gi0/1 · .10 ↔ .5", labelY: 270 },
			{ from: "r1", to: "r2", label: "192.168.1.0/24 · .15 ↔ .10", labelY: 270 },
			{ from: "r2", to: "sw2", label: "Gi0/0", labelY: 270 },
			{ from: "sw2", to: "server" },
		],
	},
	"r1-secure-remote-access": {
		title: "R1 secure remote-access network",
		note: "PC1 and PC2 share the 192.24.105.0/24 LAN. R1 Gi0/1 is 192.24.105.1/24; R1 reaches the Internet over Serial0/1.",
		nodes: [
			{ id: "pc1", kind: "host", name: "PC1", x: 150, y: 145 },
			{ id: "pc2", kind: "host", name: "PC2", x: 150, y: 455 },
			{ id: "lan", kind: "network", name: "192.24.105.0/24", x: 420, y: 300 },
			{ id: "r1", kind: "router", name: "R1", x: 680, y: 300 },
			{ id: "internet", kind: "network", name: "Internet", x: 910, y: 300 },
		],
		links: [
			{ from: "pc1", to: "lan" }, { from: "pc2", to: "lan" },
			{ from: "lan", to: "r1", label: "Gi0/1 · .1", labelX: 550, labelY: 250 },
			{ from: "r1", to: "internet", label: "Serial0/1", labelY: 250 },
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
			{ id: "phone", kind: "phone", name: "IP phone", x: 280, y: 630 },
			{ id: "pc2", kind: "host", name: "Branch host", x: 720, y: 630 },
		],
		links: [
			{ from: "r1", to: "mpls" }, { from: "r1", to: "mls", label: "MLS1", labelX: 565, labelY: 190 },
			{ from: "mls", to: "sw1" }, { from: "mls", to: "sw2" },
			{ from: "sw1", to: "phone" }, { from: "sw2", to: "pc2" },
		],
	},
	"switch-vlan2-mac-table": {
		title: "SW1 VLAN 2 workstation topology",
		note: "PC1 and PC2 connect to SW1 Fa0/1 and Fa0/2 in VLAN 2.",
		nodes: [
			{ id: "p1", kind: "host", name: "PC1", x: 250, y: 100, details: ["VLAN 2", "MAC 0007.ec53.3390"] },
			{ id: "p2", kind: "host", name: "PC2", x: 750, y: 100, details: ["VLAN 2", "MAC 0007.ec89.2748"] },
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
	"nat-router-lan-pcs": {
		title: "PCs through a NAT router",
		note: "PC1 and PC2 share the 172.16.0.0/24 LAN on R1 G0/0; R1 G0/1 connects to the Internet.",
		nodes: [
			{ id: "p1", kind: "host", name: "PC1", x: 170, y: 170, details: ["172.16.0.1"] },
			{ id: "p2", kind: "host", name: "PC2", x: 170, y: 430, details: ["172.16.0.2"] },
			{ id: "lan", kind: "network", name: "172.16.0.0/24 LAN", x: 440, y: 300, shape: "cloud" },
			{ id: "r", kind: "router", name: "R1 · NAT Router", x: 710, y: 300, details: ["G0/0 · 172.16.0.5/24", "G0/1 · 209.165.200.130/27"] },
			{ id: "internet", kind: "network", name: "Internet", x: 980, y: 300, shape: "cloud" },
		],
		links: [
			{ from: "p1", to: "lan" },
			{ from: "p2", to: "lan" },
			{ from: "lan", to: "r", label: "G0/0" },
			{ from: "r", to: "internet", label: "G0/1" },
		],
	},
	"ospf-backup-route-server": {
		title: "R1's OSPF route to the server",
		note: "R1 reaches 10.1.1.10 on the 10.1.1.0/24 server LAN through R2 over the 172.16.2.0/24 OSPF link.",
		nodes: [
			{ id: "pc1", kind: "host", name: "PC1", x: 140, y: 300 },
			{ id: "management", kind: "switch", name: "Management LAN", x: 360, y: 300, details: ["192.168.1.0/24"] },
			{ id: "r1", kind: "router", name: "R1", x: 580, y: 300 },
			{ id: "r2", kind: "router", name: "R2", x: 800, y: 300 },
			{ id: "server", kind: "host", name: "Server", x: 1020, y: 300, details: ["10.1.1.10"] },
		],
		links: [
			{ from: "pc1", to: "management" },
			{ from: "management", to: "r1" },
			{ from: "r1", to: "r2", label: "172.16.2.0/24 · OSPF" },
			{ from: "r2", to: "server", label: "10.1.1.0/24" },
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
	"switch-port-security-gig0-1": {
		title: "Switch port-security topology",
		note: "A switch connects to one PC on GigabitEthernet0/1.",
		nodes: [
			{ id: "sw", kind: "switch", name: "SW", x: 300, y: 280 },
			{ id: "pc", kind: "host", name: "PC", x: 700, y: 280 },
		],
		links: [{ from: "sw", to: "pc", label: "Gig0/1", labelY: 235 }],
	},
	"ipv6-ho-isp-cloud": {
		title: "Head-office IPv6 network",
		note: "R0 connects the server to the ISP cloud. R1 connects the cloud to S2 and Host A; its Fa0/1 MAC address is C601.420F.0007.",
		nodes: [
			{ id: "server", kind: "host", name: "Server", x: 500, y: 70 },
			{ id: "r0", kind: "router", name: "R0", x: 500, y: 210 },
			{ id: "core", kind: "network", name: "ISP Cloud", x: 500, y: 370 },
			{ id: "r1", kind: "router", name: "R1", x: 500, y: 540 },
			{ id: "sw", kind: "switch", name: "S2", x: 500, y: 700 },
			{ id: "pc", kind: "host", name: "Host A", x: 790, y: 700 },
		],
		links: [
			{ from: "server", to: "r0" }, { from: "r0", to: "core" },
			{ from: "core", to: "r1", label: "2001:db8:4:1::/64", labelX: 605, labelY: 470 },
			{ from: "r1", to: "sw", label: "Fa0/1 · MAC C601.420F.0007", labelX: 610, labelY: 635 },
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
		title: "R14 to R86 route path",
		note: "R14 reaches 172.21.34.0/25 through R86. Router interface and loopback addresses are shown at each endpoint.",
		nodes: [
			{ id: "r14", kind: "router", name: "R14", x: 180, y: 440, details: ["Loopback0 · 10.10.1.14/32", "Fa0/0 · 10.73.65.65/30"] },
			{ id: "r86", kind: "router", name: "R86", x: 500, y: 180, details: ["Loopback0 · 10.10.1.86/32", "Fa0/0 · 10.73.65.66/30"] },
			{ id: "lan", kind: "network", name: "Destination LAN", x: 820, y: 440, details: ["172.21.34.0/25"] },
		],
		links: [
			{ from: "r14", to: "r86", label: "Transit · 10.73.65.64/30", labelX: 330, labelY: 280, labelConnector: true },
			{ from: "r86", to: "lan", label: "Connected LAN", labelX: 680, labelY: 290, labelConnector: true },
		],
	},
	"r86-static-route-to-r14-17216-34": {
		title: "R86 route to R14 network",
		note: "R86 reaches 172.16.34.0/29 through R14 over the 10.73.65.64/30 transit link.",
		nodes: [
			{ id: "r14", kind: "router", name: "R14", x: 260, y: 200, details: ["Loopback0 · 10.10.1.14/32", "Fa0/0 · 10.73.65.65/30"] },
			{ id: "r86", kind: "router", name: "R86", x: 740, y: 200, details: ["Loopback0 · 10.10.1.86/32", "Fa0/0 · 10.73.65.66/30"] },
			{ id: "destination", kind: "network", name: "172.16.34.0/29", x: 260, y: 465, details: ["Connected to R14"] },
		],
		links: [
			{ from: "r14", to: "r86", label: "10.73.65.64/30 · Fa0/0 · .65 ↔ .66", labelY: 145 },
			{ from: "r14", to: "destination", label: "Destination network", labelX: 345, labelY: 345 },
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
		title: "Dual-link R1–R2 branch network",
		note: "OSPF Area 10 · R1–R2 links: 172.16.0.0/30 on Gi0/0 and 172.16.0.4/30 on Gi0/1 · SW3 LAN: 172.16.1.0/24 · SW4 LAN: 172.16.2.0/27",
		configuration: `SW3
Router OSPF 200
Network 172.16.0.0 0.0.0.3
Network 172.16.1.0 0.0.0.3

SW4
Router OSPF 200
Network 172.16.0.0 0.0.0.3
Network 172.16.2.0 0.0.0.31`,
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 330, y: 310 },
			{ id: "r2", kind: "router", name: "R2", x: 670, y: 310 },
			{ id: "sw3", kind: "switch", name: "SW3", x: 150, y: 700 },
			{ id: "sw4", kind: "switch", name: "SW4", x: 850, y: 700 },
			{ id: "phone1", kind: "phone", name: "IP Phone 1", x: 85, y: 900 },
			{ id: "phone2", kind: "phone", name: "IP Phone 2", x: 215, y: 900 },
			{ id: "phone3", kind: "phone", name: "IP Phone 3", x: 785, y: 900 },
			{ id: "phone4", kind: "phone", name: "IP Phone 4", x: 915, y: 900 },
			{ id: "pc1", kind: "host", name: "PC1", x: 85, y: 1040 },
			{ id: "pc2", kind: "host", name: "PC2", x: 215, y: 1040 },
			{ id: "pc3", kind: "host", name: "PC3", x: 785, y: 1040 },
			{ id: "pc4", kind: "host", name: "PC4", x: 915, y: 1040 },
		],
		links: [
			{ from: "r1", to: "r2", offset: -38, label: "Gi0/0 ↔ Gi0/0 · 172.16.0.0/30", labelX: 500, labelY: 230, fixedLabel: true, color: "#dc2626" },
			{ from: "r1", to: "r2", offset: 38, label: "Gi0/1 ↔ Gi0/1 · 172.16.0.4/30", labelX: 500, labelY: 390, fixedLabel: true, color: "#dc2626" },
			{ from: "r1", to: "sw3" }, { from: "r2", to: "sw4" },
			{ from: "sw3", to: "phone1" }, { from: "sw3", to: "phone2" },
			{ from: "sw4", to: "phone3" }, { from: "sw4", to: "phone4" },
			{ from: "phone1", to: "pc1" }, { from: "phone2", to: "pc2" },
			{ from: "phone3", to: "pc3" }, { from: "phone4", to: "pc4" },
		],
	},
	"vlan5-vlan10-four-hosts": {
		title: "VLAN 5 and VLAN 10 access topology",
		note: "PC1 and PC2 are in VLAN 5; PC3 and PC4 are in VLAN 10. The source labels the inter-switch link VLAN 100, while the displayed SW2 configuration allows VLANs 5 and 10.",
		nodes: [
			{ id: "s1", kind: "switch", name: "SW1", x: 300, y: 300 },
			{ id: "s2", kind: "switch", name: "SW2", x: 700, y: 300 },
			{ id: "p1", kind: "host", name: "PC1", x: 180, y: 100, details: ["VLAN 5"] },
			{ id: "p2", kind: "host", name: "PC2", x: 820, y: 100, details: ["VLAN 5"] },
			{ id: "p3", kind: "host", name: "PC3", x: 180, y: 520, details: ["VLAN 10"] },
			{ id: "p4", kind: "host", name: "PC4", x: 820, y: 520, details: ["VLAN 10"] },
		],
		links: [
			{ from: "s1", to: "s2", label: "Fa0/1 ↔ Fa0/1 · VLAN 100", labelY: 245 },
			{ from: "s1", to: "p1", label: "Fa0/2", labelX: 240, labelY: 190 },
			{ from: "s2", to: "p2", label: "Fa0/2", labelX: 760, labelY: 190 },
			{ from: "s1", to: "p3", label: "Fa0/3", labelX: 240, labelY: 410 },
			{ from: "s2", to: "p4", label: "Fa0/3", labelX: 760, labelY: 410 },
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
			{ from: "s1", to: "s2", label: "G1/1 ↔ G1/1", labelY: 170, offset: -20, color: "#222", strokeWidth: 2 },
			{ from: "s1", to: "s2", label: "G1/2 ↔ G1/2", labelY: 260, color: "#222", strokeWidth: 2 },
			{ from: "s1", to: "s2", label: "G1/3 ↔ G1/3", labelY: 350, offset: 20, color: "#222", strokeWidth: 2 },
		],
	},
	"r1-r2-r3-network": {
		title: "R1–R2–R3 routed networks",
		note: "R1, R2, and R3 connect through 10.0.4.0/24; their LANs are 10.0.1.0/24, 10.0.2.0/24, and 10.0.3.0/24.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 270, y: 130, details: ["Int Gi0/0 · 10.0.1.0/24"] },
			{ id: "r2", kind: "router", name: "R2", x: 730, y: 130, details: ["Int Gi0/0 · 10.0.2.0/24"] },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 480, details: ["Int Gi0/0 · 10.0.3.0/24"] },
			{ id: "lan", kind: "network", name: "10.0.4.0/24", x: 500, y: 300 },
		],
		links: [
			{ from: "r1", to: "lan", label: "Gi0/1 · .1", labelX: 355, labelY: 220 },
			{ from: "r2", to: "lan", label: "Gi0/1 · .2", labelX: 645, labelY: 220 },
			{ from: "r3", to: "lan", label: "Gi0/1 · .3", labelX: 570, labelY: 410 },
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
			{ from: "r1", to: "r2", label: "Primary Circuit · .1 ↔ .2", labelY: 135, offset: -10 },
			{ from: "r1", to: "r2", label: "Secondary Circuit · .5 ↔ .6", labelY: 250, offset: 10 },
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
		title: "Three-router network topology",
		note: "The left router connects separately to the upper router, lower router, and switch; each endpoint remains on its original path.",
		nodes: [
			{ id: "r1", kind: "router", name: "Router", x: 170, y: 330 },
			{ id: "r2", kind: "router", name: "Router", x: 620, y: 130 },
			{ id: "r3", kind: "router", name: "Router", x: 620, y: 530 },
			{ id: "p1", kind: "host", name: "PC1", x: 870, y: 100, details: ["10.0.0.5"] },
			{ id: "sw", kind: "switch", name: "SW", x: 430, y: 330 },
			{ id: "p2", kind: "host", name: "PC2", x: 700, y: 330, details: ["10.0.0.8"] },
			{ id: "p3", kind: "host", name: "PC3", x: 870, y: 560, details: ["10.0.0.12"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "172.16.0.0/24", labelX: 385, labelY: 210 },
			{ from: "r1", to: "r3", label: "192.168.0.0/24", labelX: 385, labelY: 460 },
			{ from: "r1", to: "sw", label: "10.0.0.0/24", labelY: 285 },
			{ from: "r2", to: "p1" },
			{ from: "sw", to: "p2" },
			{ from: "r3", to: "p3" },
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
			{ id: "b", kind: "host", name: "Host B", x: 930, y: 300, details: ["10.10.13.0/25"] },
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
	"r1-r2-r3-static-route": {
		title: "R1 route to the R3 LAN",
		note: "Illustrative reconstruction: R1, R2, and R3 share 10.0.20.0/24; R1 and R3 LANs are 10.0.0.64/26 and 10.0.15.0/24.",
		height: 640,
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 140, details: ["LAN 10.0.0.64/26"] },
			{ id: "r2", kind: "router", name: "R2", x: 750, y: 140 },
			{ id: "lan", kind: "network", name: "10.0.20.0/24", x: 500, y: 340 },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 550, details: ["Transit IP 10.0.20.3", "LAN 10.0.15.0/24"] },
		],
		links: [
			{ from: "r1", to: "lan" },
			{ from: "r2", to: "lan" },
			{ from: "r3", to: "lan" },
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
			{ id: "r1", kind: "router", name: "Router1", x: 250, y: 270, details: ["S0/0 · 192.168.0.1/30"] },
			{ id: "r2", kind: "router", name: "Router2", x: 520, y: 270, details: ["S0/0 · 192.168.0.2/30", "Gi0/0 · 10.10.10.1/24"] },
			{ id: "sw", kind: "switch", name: "Switch1", x: 760, y: 270, details: ["10.10.10.2/24"] },
			{ id: "server", kind: "host", name: "Server", x: 930, y: 270, details: ["10.10.10.10/24"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "S0/0 ↔ S0/0", labelY: 215 },
			{ from: "r2", to: "sw", label: "Gi0/0", labelY: 215 },
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
	"r1-r2-point-to-point-714": {
		title: "R1–R2 point-to-point link",
		note: "GigabitEthernet0/0 on R1 connects to GigabitEthernet0/0 on R2.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 280, y: 270 },
			{ id: "r2", kind: "router", name: "R2", x: 720, y: 270 },
		],
		links: [{ from: "r1", to: "r2", label: "GigabitEthernet0/0", labelY: 220 }],
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
	"r1-floating-default-routes": {
		title: "Three-router floating default routes",
		note: "Primary: 172.16.20.2 · Floating backup: 10.0.0.2 · Administrative distance: 20.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 450, y: 250 },
			{ id: "primary", kind: "router", name: "Primary next hop", x: 260, y: 520, details: ["172.16.20.2"] },
			{ id: "backup", kind: "router", name: "Backup next hop", x: 640, y: 520, details: ["10.0.0.2 · AD 20"] },
			{ id: "pc1-lan", kind: "network", name: "172.16.30.0/24", x: 80, y: 250, details: ["PC1 LAN"] },
			{ id: "pc1", kind: "host", name: "PC1", x: 80, y: 430 },
			{ id: "pc3-lan", kind: "network", name: "172.16.10.0/24", x: 260, y: 720, details: ["PC3 LAN"] },
			{ id: "pc3", kind: "host", name: "PC3", x: 260, y: 900 },
			{ id: "pc2-lan", kind: "network", name: "192.168.200.0/24", x: 810, y: 520, details: ["PC2 LAN"] },
			{ id: "sw", kind: "switch", name: "Switch", x: 810, y: 690 },
			{ id: "pc2", kind: "host", name: "PC2", x: 810, y: 860 },
		],
		links: [
			{ from: "r1", to: "primary", label: "172.16.20.0/24", color: "#2563eb" },
			{ from: "r1", to: "backup", label: "10.0.0.0/24", color: "#d97706" },
			{ from: "primary", to: "backup", label: "209.165.201.0/27", color: "#64748b" },
			{ from: "r1", to: "pc1-lan" }, { from: "pc1-lan", to: "pc1" },
			{ from: "primary", to: "pc3-lan" }, { from: "pc3-lan", to: "pc3" },
			{ from: "backup", to: "pc2-lan" }, { from: "pc2-lan", to: "sw" }, { from: "sw", to: "pc2" },
		],
	},
	"r1-floating-default-routes-legacy-721": {
		title: "Three-router floating default routes",
		note: "R1's primary route uses 172.16.20.2; the route through 10.0.0.2 is a floating backup with administrative distance 20.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 180, y: 300 },
			{ id: "r3", kind: "router", name: "R3", x: 500, y: 130 },
			{ id: "r2", kind: "router", name: "R2", x: 820, y: 300 },
			{ id: "pc1-lan", kind: "network", name: "172.16.30.0/24", x: 45, y: 300, details: ["PC1 LAN"] },
			{ id: "pc1", kind: "host", name: "PC1", x: 45, y: 420 },
			{ id: "pc3-lan", kind: "network", name: "172.16.10.0/24", x: 500, y: 35, details: ["PC3 LAN"] },
			{ id: "pc3", kind: "host", name: "PC3", x: 500, y: 0 },
			{ id: "pc2-lan", kind: "network", name: "192.168.200.0/24", x: 955, y: 300, details: ["PC2 LAN"] },
			{ id: "sw", kind: "switch", name: "Switch", x: 955, y: 415 },
			{ id: "pc2", kind: "host", name: "PC2", x: 955, y: 550 },
		],
		links: [
			{
				from: "r1",
				to: "r3",
				label: "172.16.20.0/24",
				labelX: 310,
				labelY: 215,
				color: "#2563eb",
				extraLabels: [{ text: "Gi0/0", x: 210, y: 260 }],
			},
			{
				from: "r3",
				to: "r2",
				label: "209.165.201.0/27",
				labelX: 690,
				labelY: 215,
				color: "#d97706",
				extraLabels: [{ text: "Gi0/0", x: 790, y: 260 }],
			},
			{ from: "r1", to: "r2", label: "10.0.0.0/24", labelX: 500, labelY: 335, color: "#64748b" },
			{ from: "r1", to: "pc1-lan" }, { from: "pc1-lan", to: "pc1" },
			{ from: "r3", to: "pc3-lan" }, { from: "pc3-lan", to: "pc3" },
			{ from: "r2", to: "pc2-lan" }, { from: "pc2-lan", to: "sw" }, { from: "sw", to: "pc2" },
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
	"nat-router-lans-internet-legacy-723": {
		title: "ROUTER-1 Internet access topology",
		note: "ROUTER-1 connects two 192.168.1.0/24 user LANs to the Internet using PAT address 209.165.202.129.",
		nodes: [
			{ id: "internet", kind: "network", name: "Internet", x: 820, y: 100 },
			{ id: "r", kind: "router", name: "ROUTER-1", x: 500, y: 170, details: ["209.165.202.129 · PAT"] },
			{ id: "sw1", kind: "switch", name: "SWITCH-1", x: 330, y: 370, details: ["192.168.1.0/24"] },
			{ id: "sw2", kind: "switch", name: "SWITCH-2", x: 670, y: 370, details: ["192.168.1.0/24"] },
			{ id: "pc1", kind: "host", name: "PC1", x: 250, y: 570 },
			{ id: "pc2", kind: "host", name: "PC2", x: 410, y: 570 },
			{ id: "pc3", kind: "host", name: "PC3", x: 590, y: 570 },
			{ id: "pc4", kind: "host", name: "PC4", x: 750, y: 570 },
		],
		links: [
			{ from: "r", to: "internet" },
			{ from: "r", to: "sw1" },
			{ from: "r", to: "sw2" },
			{ from: "sw1", to: "pc1" },
			{ from: "sw1", to: "pc2" },
			{ from: "sw2", to: "pc3" },
			{ from: "sw2", to: "pc4" },
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
	"switch-voice-vlan-phone-review-724": {
		title: "SW1, non-Cisco IP phone, and PC",
		note: "Illustrative reconstruction from the available description; the original exhibit image is missing.",
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
	"three-router-specific-host-route-review-754": {
		title: "R1 host-specific route through R3",
		note: "Partial reconstruction: the original exhibit is missing. Paths and next-hop values use only the prompt and answer choices.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 250, y: 300 },
			{ id: "r2", kind: "router", name: "R2", x: 700, y: 150 },
			{ id: "r3", kind: "router", name: "R3", x: 700, y: 450 },
			{ id: "lan", kind: "network", name: "10.10.2.0/24", x: 930, y: 300, details: ["Host 10.10.2.1"] },
		],
		links: [
			{ from: "r1", to: "r2", label: "Existing next hop 192.168.1.2", labelX: 480, labelY: 195 },
			{ from: "r1", to: "r3", label: "Host-route next hop 192.168.1.4", labelX: 480, labelY: 415 },
			{ from: "r2", to: "lan" },
			{ from: "r3", to: "lan" },
		],
	},
	"static-route-three-router-799": {
		title: "R1–R2–R3 static-route topology",
		note: "Illustrative reconstruction from the keyed commands: 10.10.13.0/25 is behind R3 and 10.10.14.0/24 is behind R1. Transit masks are unavailable.",
		nodes: [
			{ id: "lan14", kind: "network", name: "10.10.14.0/24", x: 100, y: 300 },
			{ id: "r1", kind: "router", name: "R1", x: 330, y: 300 },
			{ id: "r2", kind: "router", name: "R2", x: 600, y: 300 },
			{ id: "r3", kind: "router", name: "R3", x: 870, y: 300 },
			{ id: "lan13", kind: "network", name: "10.10.13.0/25", x: 1100, y: 300 },
		],
		links: [
			{ from: "lan14", to: "r1" },
			{ from: "r1", to: "r2", label: "10.10.10.2 ↔ 10.10.10.1", labelY: 235 },
			{ from: "r2", to: "r3", label: "10.10.10.6 ↔ 10.10.10.5", labelY: 235 },
			{ from: "r3", to: "lan13" },
		],
	},
	"ospf-destination-segments-888": {
		title: "OSPF destination mapping between sites",
		note: "Illustrative reconstruction from the saved answer key. OSPF connects Site A and Site B; all five destinations are assigned to the keyed Internet or Router1 segments below.",
		viewBox: { x: 0, y: 0, width: 1100, height: 490 },
		nodes: [
			{ id: "siteA", kind: "network", name: "Site A", x: 290, y: 105 },
			{ id: "siteB", kind: "network", name: "Site B", x: 810, y: 105 },
		],
		links: [{ from: "siteA", to: "siteB", label: "OSPF between sites" }],
		annotations: [
			{
				x: 290,
				y: 255,
				lines: ["Internet"],
				textAnchor: "middle",
				fontSize: 18,
				fontWeight: 700,
				color: "#17233d",
				box: { x: 80, y: 220, width: 420, height: 220, rx: 14, fill: "#f1f8ff", stroke: "#80acd0" },
			},
			{
				x: 290,
				y: 300,
				lines: ["10.10.10.16", "10.10.13.129", "10.10.100.128"],
				textAnchor: "middle",
				fontFamily: "monospace",
				fontSize: 17,
				lineHeight: 34,
				color: "#26354b",
			},
			{
				x: 810,
				y: 255,
				lines: ["Router1"],
				textAnchor: "middle",
				fontSize: 18,
				fontWeight: 700,
				color: "#17233d",
				box: { x: 600, y: 220, width: 420, height: 220, rx: 14, fill: "#f1f8ff", stroke: "#80acd0" },
			},
			{
				x: 810,
				y: 300,
				lines: ["10.10.13.1", "10.10.13.150"],
				textAnchor: "middle",
				fontFamily: "monospace",
				fontSize: 17,
				lineHeight: 34,
				color: "#26354b",
			},
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
	"cpe-dual-isp-review-797": {
		title: "CPE dual-ISP headquarters topology",
		note: "Partial reconstruction: the original exhibit is missing. The question and options identify the CPE, Headquarters, ISP1, ISP2, and both next-hop addresses.",
		nodes: [
			{ id: "isp1", kind: "network", name: "ISP 1", x: 280, y: 120, details: ["198.51.100.1"] },
			{ id: "isp2", kind: "network", name: "ISP 2", x: 720, y: 120, details: ["203.0.113.1"] },
			{ id: "cpe", kind: "router", name: "CPE", x: 500, y: 340 },
			{ id: "hq", kind: "network", name: "Headquarters", x: 500, y: 560 },
		],
		links: [{ from: "isp1", to: "cpe" }, { from: "isp2", to: "cpe" }, { from: "cpe", to: "hq" }],
	},
	"r2-eui64-review-802": {
		title: "R2 IPv6 LAN EUI-64 information",
		note: "Partial reconstruction: the original exhibit is unavailable. The explanation lists MAC 12A0.ABDD.0002, but its derived EUI-64 address does not match the keyed option.",
		nodes: [
			{ id: "r2", kind: "router", name: "R2", x: 340, y: 270, details: ["LAN MAC · 12A0.ABDD.0002"] },
			{ id: "lan", kind: "network", name: "R2 LAN", x: 680, y: 270, details: ["2001:DB8:D8D2:1009::/64"] },
		],
		links: [{ from: "r2", to: "lan" }],
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
	"dual-site-ipv6-isp-file-workstations": {
		title: "Dual-site IPv6 network with ISP",
		note: "R1 connects to the server LAN and R2; R2 connects to the workstation LAN and ISP.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 220, y: 170 },
			{ id: "r2", kind: "router", name: "R2", x: 600, y: 170 },
			{ id: "isp", kind: "network", name: "ISP", x: 940, y: 170 },
			{ id: "sw1", kind: "switch", name: "SW1", x: 220, y: 370, details: ["2001:DB8:D8D2:1008::/64"] },
			{ id: "sw2", kind: "switch", name: "SW2", x: 600, y: 370, details: ["2001:DB8:D8D2:1009::/64"] },
			{ id: "file", kind: "host", name: "File Server", x: 100, y: 570 },
			{ id: "mgmt", kind: "host", name: "Network Management Server", x: 340, y: 570 },
			{ id: "phones", kind: "host", name: "IP Phones", x: 500, y: 570 },
			{ id: "pcs", kind: "host", name: "Workstations", x: 700, y: 570 },
		],
		links: [
			{ from: "r1", to: "r2", label: "Int G0/0", labelY: 120 },
			{ from: "r2", to: "isp", label: "Int G0/1", labelY: 120 },
			{ from: "r1", to: "sw1" },
			{ from: "r2", to: "sw2" },
			{ from: "sw1", to: "file" }, { from: "sw1", to: "mgmt" },
			{ from: "sw2", to: "phones" }, { from: "sw2", to: "pcs" },
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
	"internet-router-pc-ipconfig-review-760": {
		title: "PC Internet connectivity and IPv4 configuration",
		note: "Partial reconstruction: the original exhibit is missing; the PC configuration is recovered from the available explanation.",
		nodes: [
			{ id: "internet", kind: "network", name: "Internet", x: 140, y: 270 },
			{ id: "r", kind: "router", name: "Router", x: 400, y: 270, details: ["10.2.2.1/27"] },
			{ id: "sw", kind: "switch", name: "Switch", x: 650, y: 270 },
			{ id: "pc", kind: "host", name: "PC", x: 900, y: 270, details: ["10.2.2.2"] },
		],
		links: [
			{ from: "internet", to: "r" },
			{ from: "r", to: "sw" },
			{ from: "sw", to: "pc" },
		],
	},
	"etherchannel-min-links-review-770": {
		title: "Port Channel 1 between SW1 and SW2",
		note: "Partial reconstruction: the original exhibit is unavailable. The prompt identifies PC1-to-server traffic at 1800 Mbps and SW2 ports Gi0/0 and Gi0/1 going down; other links and placements are unknown.",
		nodes: [
			{ id: "sw1", kind: "switch", name: "SW1", x: 300, y: 270 },
			{ id: "sw2", kind: "switch", name: "SW2", x: 700, y: 270, details: ["Gi0/0", "Gi0/1"] },
		],
		links: [
			{ from: "sw1", to: "sw2", label: "Port Channel 1", labelY: 215 },
		],
	},
	"lacp-passive-channel-review-804": {
		title: "Switch A and Switch B EtherChannel",
		note: "Partial reconstruction: the original exhibit is unavailable. The prompt specifies channel group 1 and 1000 Mbps/full-duplex settings on both ends; member ports and host connections are unknown.",
		nodes: [
			{ id: "swA", kind: "switch", name: "Switch A", x: 300, y: 270, details: ["1000 Mbps · full duplex"] },
			{ id: "swB", kind: "switch", name: "Switch B", x: 700, y: 270, details: ["1000 Mbps · full duplex"] },
		],
		links: [{ from: "swA", to: "swB", label: "Channel group 1", labelY: 215 }],
	},
	"r14-r86-eigrp-floating-route-review-824": {
		title: "R14 floating route to the R86 LAN",
		note: "Partial reconstruction: the original exhibit is unavailable. The prompt and choices identify R14, R86's 10.80.65.0/29 LAN, and next hop 10.73.65.66; transit details are omitted.",
		nodes: [
			{ id: "r14", kind: "router", name: "R14", x: 220, y: 270 },
			{ id: "r86", kind: "router", name: "R86", x: 560, y: 270 },
			{ id: "lan", kind: "network", name: "R86 LAN", x: 870, y: 270, details: ["10.80.65.0/29"] },
		],
		links: [
			{ from: "r14", to: "r86", label: "Next hop · 10.73.65.66", labelY: 215 },
			{ from: "r86", to: "lan" },
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
	"stp-four-switch-ring": {
		title: "Four-switch spanning-tree ring",
		note: "S1–S4 connect in a four-link ring; each switch shows its bridge priority and MAC address.",
		nodes: [
			{ id: "s1", kind: "switch", name: "S1", x: 500, y: 100, details: ["Priority 30000", "MAC AA:AA:AA:AA:AA:AA"] },
			{ id: "s2", kind: "switch", name: "S2", x: 800, y: 330, details: ["Priority 4096", "MAC BB:BB:BB:BB:BB:BB"] },
			{ id: "s3", kind: "switch", name: "S3", x: 500, y: 560, details: ["Priority 28672", "MAC CC:CC:CC:CC:CC:CC"] },
			{ id: "s4", kind: "switch", name: "S4", x: 200, y: 330, details: ["Priority 8192", "MAC DD:DD:DD:DD:DD:DD"] },
		],
		links: [
			{ from: "s1", to: "s2" }, { from: "s2", to: "s3" },
			{ from: "s3", to: "s4" }, { from: "s4", to: "s1" },
		],
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
		note: "All four routers connect to the same OSPF broadcast segment. The highest eligible priority wins the DR election.",
		viewBox: { x: 0, y: 0, width: 1000, height: 620 },
		broadcastArea: { x: 500, y: 310, rx: 320, ry: 210 },
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 260, y: 135, details: ["Router ID 1.1.1.1", "Priority 0", "Lo0 10.1.1.1/32"] },
			{ id: "r2", kind: "router", name: "R2", x: 740, y: 135, details: ["Router ID 2.2.2.2", "Priority 3", "Lo0 10.2.2.2/32"] },
			{ id: "r4", kind: "router", name: "R4", x: 260, y: 485, details: ["Router ID 4.4.4.4", "Priority 2", "Lo0 10.4.4.4/32"] },
			{ id: "r3", kind: "router", name: "R3", x: 740, y: 485, details: ["Router ID 3.3.3.3", "Priority 1", "Lo0 10.3.3.3/32"] },
			{ id: "sw", kind: "switch", name: "OSPF", x: 500, y: 300, details: ["172.16.100.0/16"] },
		],
		links: [
			{ from: "r1", to: "sw" }, { from: "r2", to: "sw" },
			{ from: "r4", to: "sw" }, { from: "r3", to: "sw" },
		],
	},
	"vlan-switch-web-server": {
		title: "VLAN 10 and VLAN 20 web-server topology",
		note: "Switch A connects VLAN 10 and VLAN 20 hosts to Switch B and the web server on 10.30.0.100/24.",
		viewBox: { x: 0, y: 0, width: 1150, height: 620 },
		rightLabels: {
			x: 820,
			y: 270,
			lineHeight: 26,
			items: [
				"Int VLAN 10: 10.10.0.0/24",
				"Int VLAN 20: 10.20.0.0/24",
				"Int VLAN 30: 10.30.0.0/24",
			],
		},
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
	"r1-ssh-acl-pc1": {
		title: "R1, SW1, and PC-1",
		viewBox: { x: 0, y: 0, width: 1000, height: 560 },
		rightLabels: {
			x: 390,
			y: 90,
			lineHeight: 25,
			fontFamily: "monospace",
			fontSize: 14,
			fontWeight: 500,
			items: [
				"interface Loopback1",
				" ip address 192.168.1.1 255.255.255.0",
				"!",
				"interface Loopback2",
				" ip address 192.168.2.1 255.255.255.0",
				"!",
				"interface Loopback3",
				" ip address 192.168.3.1 255.255.255.0",
				"!",
				"interface GigabitEthernet0/0",
				" ip address 172.16.1.62 255.255.255.224",
			],
		},
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 150, y: 100, details: ["172.16.1.62"] },
			{ id: "sw1", kind: "switch", name: "SW1", x: 150, y: 270 },
			{ id: "pc1", kind: "host", name: "PC-1", x: 150, y: 440, details: ["172.16.1.57/27"] },
		],
		links: [
			{ from: "r1", to: "sw1", color: "#dc2626", label: "gi0/0", fixedLabel: true, labelX: 220, labelY: 165 },
			{ from: "sw1", to: "pc1", color: "#dc2626" },
		],
	},
	"r1-r2-database-security": {
		title: "R1–R2 database and client network",
		viewBox: { x: 0, y: 0, width: 1000, height: 600 },
		nodes: [
			{ id: "dbSwitch", kind: "switch", name: "", x: 150, y: 190 },
			{ id: "db", kind: "host", name: "Internal Database Server", x: 150, y: 330, details: ["192.168.141.0/28"] },
			{ id: "r1", kind: "router", name: "R1", x: 380, y: 200 },
			{ id: "r2", kind: "router", name: "R2", x: 760, y: 200 },
			{ id: "sw1", kind: "switch", name: "", x: 380, y: 370 },
			{ id: "pc1", kind: "host", name: "", x: 380, y: 520, details: ["172.19.108.0/24"] },
			{ id: "sw2", kind: "switch", name: "", x: 760, y: 370 },
			{ id: "pc2", kind: "host", name: "", x: 760, y: 520, details: ["192.168.205.0/25"] },
		],
		links: [
			{ from: "dbSwitch", to: "db", color: "#dc2626" },
			{ from: "dbSwitch", to: "r1", color: "#dc2626", label: "Gi0/0", fixedLabel: true, labelX: 270, labelY: 165 },
			{ from: "r1", to: "r2", color: "#dc2626", label: "S0/0/0", fixedLabel: true, labelX: 450, labelY: 170, extraLabels: [{ text: "S0/0/0", x: 690, y: 170 }] },
			{ from: "r1", to: "sw1", color: "#dc2626", label: "Gi0/1", fixedLabel: true, labelX: 430, labelY: 290 },
			{ from: "sw1", to: "pc1", color: "#dc2626" },
			{ from: "r2", to: "sw2", color: "#dc2626" },
			{ from: "sw2", to: "pc2", color: "#dc2626" },
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
		title: "DHCP relay topology",
		note: "A router connects through a switch to R2 and then to the DHCP server.",
		nodes: [
			{ id: "r1", kind: "router", name: "R1", x: 160, y: 280 },
			{ id: "sw", kind: "switch", name: "Switch", x: 400, y: 280 },
			{ id: "r2", kind: "router", name: "R2", x: 650, y: 280 },
			{ id: "dhcp", kind: "host", name: "DHCP server", x: 920, y: 280, details: ["198.51.100.100"] },
		],
		links: [
			{ from: "r1", to: "sw", label: "Fa0/0", labelX: 280, labelY: 265, fixedLabel: true },
			{ from: "sw", to: "r2", label: "Gi0/0", secondaryLabel: "192.0.2.2", labelX: 525, labelY: 265, fixedLabel: true },
			{ from: "r2", to: "dhcp", label: "Gi0/1", secondaryLabel: "198.51.100.1", labelX: 785, labelY: 265, fixedLabel: true },
		],
	},
};

function nodeRadius(kind, shape) {
	if (shape === "wireless-coverage") return 62;
	if (shape === "wireless-channel") return 28;
	if (kind === "network") return 78;
	if (kind === "host") return 34;
	if (kind === "switch") return 38;
	if (kind === "phone") return 32;
	return 34;
}

function topologyGeometryKind(node) {
	return node.kind === "host" && /server/i.test(node.name) ? "server" : node.kind;
}

function topologyLabels(topology) {
	const obstacles = topology.nodes.map((node) => {
		const details = node.details ?? [];
		const nameLines = node.kind === "network" ? wrapTopologyNodeLabel(node.name) : [node.name];
		const width = Math.max(
			nodeRadius(node.kind, node.shape),
			...nameLines.map((line) => line.length * 7.2 + 16),
			...details.map((detail) => detail.length * 5.2 + 12),
		);
		const top = node.kind === "network" ? -27 : -30;
		const bottom = 55 + details.length * 12;
		return { x: node.x, y: node.y + (top + bottom) / 2, width: width * 2, height: bottom - top };
	});
	const portLabels = [];
	const networkLabels = [];
	topology.links.forEach((link, index) => {
		if (!link.label) return;
		const from = topology.nodes.find((node) => node.id === link.from);
		const to = topology.nodes.find((node) => node.id === link.to);
		const geometry = topologyLinkGeometry(
			from,
			to,
			topologyGeometryKind(from),
			topologyGeometryKind(to),
			link.offset ?? 0,
		);
		const portNames = topologyPortLabelParts(link.label);
		if (portNames) {
			const [start, end] = topologyPortLabelPositions(geometry);
			portNames.forEach((text, part) => {
				const endpoint = portNames.length === 1 ? 0 : part;
				const point = endpoint === 0 ? start : end;
				portLabels.push({
					key: index,
					text,
					x: point.x,
					y: point.y,
					width: Math.max(20, text.length * 6.3),
					height: 12,
					centerOffsetY: -2,
					onCable: true,
					candidates: topologyPortLabelCandidates(geometry, endpoint),
				});
			});
			return;
		}
		const { x: labelX, y: labelY } = topologyLinkLabelPosition(
			geometry.x1,
			geometry.y1,
			geometry.x2,
			geometry.y2,
			link.labelX,
			link.labelY,
			{
				width: Math.max(44, link.label.length * 7 + 14),
				height: 20,
				centerOffsetY: -2,
			},
		);
		const width = Math.max(20, link.label.length * 6.3);
		networkLabels.push({
			key: index,
			text: link.label,
			x: labelX,
			y: labelY,
			width,
			height: 12,
			centerOffsetY: -2,
		});
	});
	const placedLabels = placeTopologyLabels([...portLabels, ...networkLabels], [
		...obstacles,
	]);
	return placedLabels.reduce((map, label) => {
		const linkLabels = map.get(label.key) ?? [];
		linkLabels.push(label);
		map.set(label.key, linkLabels);
		return map;
	}, new Map());
}

function topologyViewBox(topology, labels) {
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
	topology.nodes.forEach((node) => {
		const details = node.details ?? [];
		const nameLines = node.kind === "network" ? wrapTopologyNodeLabel(node.name) : [node.name];
		const textWidth = Math.max(
			nodeRadius(node.kind, node.shape),
			...nameLines.map((line) => line.length * 4),
			...details.map((detail) => detail.length * 2.8),
		);
		include(node.x, node.y, textWidth + 10, 36);
		include(node.x, node.y + 62 + details.length * 12, textWidth + 10, 8);
	});

	labels.forEach((linkLabels) => {
		linkLabels.forEach((label) => {
			include(label.x, label.y + label.centerOffsetY, label.width / 2, label.height / 2);
		});
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

function includeViewBox(base, expanded) {
	const x = Math.min(base.x, expanded.x);
	const y = Math.min(base.y, expanded.y);
	const right = Math.max(base.x + base.width, expanded.x + expanded.width);
	const bottom = Math.max(base.y + base.height, expanded.y + expanded.height);
	return { x, y, width: right - x, height: bottom - y };
}

function TopologyLink({ link, nodes }) {
	if (link.points?.length > 1) {
		return (
			<polyline
				points={link.points.map(({ x, y }) => `${x},${y}`).join(" ")}
				fill="none"
				stroke={link.color ?? "#16a34a"}
				strokeWidth={link.strokeWidth ?? 3}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		);
	}
	const from = nodes.get(link.from);
	const to = nodes.get(link.to);
	const geometry = topologyLinkGeometry(
		from,
		to,
		topologyGeometryKind(from),
		topologyGeometryKind(to),
		link.offset ?? 0,
	);
	const { x1, y1, x2, y2 } = geometry;
	const color = link.color ?? "#16a34a";
	return (
		<g>
			<line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
			<circle cx={x1} cy={y1} r="4" fill={color} />
			<circle cx={x2} cy={y2} r="4" fill={color} />
		</g>
	);
}

function TopologyFlowArrow({ arrow }) {
	if (!arrow.points || arrow.points.length < 2) return null;
	const end = arrow.points[arrow.points.length - 1];
	const previous = arrow.points[arrow.points.length - 2];
	const angle = Math.atan2(end.y - previous.y, end.x - previous.x);
	const headLength = 16;
	const halfWidth = 8;
	const baseX = end.x - Math.cos(angle) * headLength;
	const baseY = end.y - Math.sin(angle) * headLength;
	const sideX = Math.sin(angle) * halfWidth;
	const sideY = Math.cos(angle) * halfWidth;
	const headPoints = [
		`${end.x},${end.y}`,
		`${baseX - sideX},${baseY + sideY}`,
		`${baseX + sideX},${baseY - sideY}`,
	].join(" ");

	return (
		<g>
			<polyline
				points={arrow.points.map(({ x, y }) => `${x},${y}`).join(" ")}
				fill="none"
				stroke={arrow.color}
				strokeWidth={arrow.strokeWidth ?? 4}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<polygon points={headPoints} fill={arrow.color} />
		</g>
	);
}

function TopologyAnnotation({ annotation }) {
	const lines = annotation.lines ?? [annotation.text];
	return (
		<g>
			{annotation.ellipse && (
				<ellipse
					cx={annotation.ellipse.cx}
					cy={annotation.ellipse.cy}
					rx={annotation.ellipse.rx}
					ry={annotation.ellipse.ry}
					fill={annotation.ellipse.fill ?? "none"}
					stroke={annotation.ellipse.stroke ?? "none"}
					strokeWidth={annotation.ellipse.strokeWidth ?? 1}
				/>
			)}
			{annotation.box && (
				<rect
					x={annotation.box.x}
					y={annotation.box.y}
					width={annotation.box.width}
					height={annotation.box.height}
					rx={annotation.box.rx ?? 2}
					fill={annotation.box.fill ?? "none"}
					stroke={annotation.box.stroke ?? "none"}
					strokeWidth={annotation.box.strokeWidth ?? 1}
				/>
			)}
			<text
				x={annotation.x}
				y={annotation.y}
				textAnchor={annotation.textAnchor ?? "start"}
				fontFamily={annotation.fontFamily}
				fontSize={annotation.fontSize ?? 16}
				fontWeight={annotation.fontWeight ?? 500}
				fill={annotation.color ?? "#17233d"}
			>
				{lines.map((line, index) => (
					<tspan
						key={`${line}-${index}`}
						x={annotation.x + (annotation.indentLines?.includes(index) ? annotation.indentWidth ?? 8 : 0)}
						dy={index === 0 ? 0 : annotation.lineHeight ?? 20}
					>
						{line}
					</tspan>
				))}
			</text>
		</g>
	);
}

function TopologyLinkLabel({ link, nodes, labelPosition }) {
	if (!link.label) return null;
	const from = nodes.get(link.from);
	const to = nodes.get(link.to);
	const geometry = topologyLinkGeometry(
		from,
		to,
		topologyGeometryKind(from),
		topologyGeometryKind(to),
		link.offset ?? 0,
	);
	const x = link.fixedLabel
		? link.labelX ?? (geometry.x1 + geometry.x2) / 2
		: labelPosition?.x ?? link.labelX ?? (geometry.x1 + geometry.x2) / 2;
	const y = link.fixedLabel
		? link.labelY ?? (geometry.y1 + geometry.y2) / 2 - 10
		: labelPosition?.y ?? link.labelY ?? (geometry.y1 + geometry.y2) / 2 - 10;
	const connector = (() => {
		if (!link.labelConnector || labelPosition?.onCable) return null;
		const cableX = geometry.x2 - geometry.x1;
		const cableY = geometry.y2 - geometry.y1;
		const cableLengthSquared = cableX * cableX + cableY * cableY;
		if (!cableLengthSquared) return null;
		const centerX = x;
		const centerY = y + (labelPosition?.centerOffsetY ?? -2);
		const projection = Math.max(0, Math.min(1, (
			(centerX - geometry.x1) * cableX + (centerY - geometry.y1) * cableY
		) / cableLengthSquared));
		const endX = geometry.x1 + projection * cableX;
		const endY = geometry.y1 + projection * cableY;
		const towardCableX = endX - centerX;
		const towardCableY = endY - centerY;
		if (Math.hypot(towardCableX, towardCableY) < 1) return null;
		const halfWidth = (labelPosition?.width ?? link.label.length * 6.3) / 2;
		const halfHeight = (labelPosition?.height ?? 12) / 2;
		const edgeScale = Math.min(
			Math.abs(towardCableX) > 0 ? halfWidth / Math.abs(towardCableX) : Infinity,
			Math.abs(towardCableY) > 0 ? halfHeight / Math.abs(towardCableY) : Infinity,
		);
		return {
			x1: centerX + towardCableX * edgeScale,
			y1: centerY + towardCableY * edgeScale,
			x2: endX,
			y2: endY,
		};
	})();

	return (
		<g>
			{connector && (
				<line
					{...connector}
					stroke={link.color ?? "#16a34a"}
					strokeWidth="3"
				/>
			)}
			<text
				x={x}
				y={labelPosition?.onCable ? y : y + 3}
				textAnchor="middle"
				fontSize={link.labelFontSize ?? 12}
				fontWeight={link.labelFontWeight ?? 600}
				fill="#17233d"
				paintOrder="stroke"
				stroke="#fff"
				strokeWidth="3"
				strokeLinejoin="round"
			>
				{labelPosition?.text ?? link.label}
				{link.secondaryLabel && <tspan x={x} dy="16">{link.secondaryLabel}</tspan>}
			</text>
			{link.extraLabels?.map((extraLabel, index) => (
				<text
					key={`${extraLabel.text}-${index}`}
					x={extraLabel.x}
					y={extraLabel.y}
					textAnchor="middle"
					fontSize={extraLabel.fontSize ?? 12}
					fontWeight={extraLabel.fontWeight ?? 600}
					fill="#17233d"
					paintOrder="stroke"
					stroke="#fff"
					strokeWidth="3"
					strokeLinejoin="round"
				>
					{extraLabel.text}
				</text>
			))}
		</g>
	);
}

function TopologyDevice({ node, coverageHatchId }) {
	if (node.kind === "router") {
		return node.scale
			? <g transform={`translate(${node.x} ${node.y}) scale(${node.scale})`}><RouterIcon x={0} y={0} label={node.name} details={node.details} /></g>
			: <RouterIcon x={node.x} y={node.y} label={node.name} details={node.details} />;
	}
	if (node.kind === "switch") {
		return node.scale
			? <g transform={`translate(${node.x} ${node.y}) scale(${node.scale})`}><SwitchIcon x={0} y={0} label={node.name} details={node.details} /></g>
			: <SwitchIcon x={node.x} y={node.y} label={node.name} details={node.details} />;
	}
	if (node.kind === "network" && node.shape === "cloud") {
		return (
			<g transform={`translate(${node.x} ${node.y}) scale(${node.scale ?? 1})`}>
				<path
					d="M-56 26 C-76 26 -90 12 -88 -6 C-86 -24 -71 -36 -52 -35 C-49 -53 -34 -65 -16 -62 C-4 -80 20 -79 32 -60 C51 -63 68 -51 68 -33 C84 -33 95 -20 93 -4 C92 13 79 25 62 25 H-56 Z"
					fill={node.fill ?? "#e8f4ff"}
					stroke={node.stroke ?? "#80acd0"}
					strokeWidth="2"
				/>
				<text x="0" y="5" textAnchor="middle" fontSize={node.fontSize ?? 13} fill="#26354b">{node.name}</text>
			</g>
		);
	}
	if (node.kind === "network" && (node.shape === "wireless-coverage" || node.shape === "wireless-channel")) {
		const radius = node.shape === "wireless-coverage" ? 62 : 28;
		const fontSize = node.shape === "wireless-coverage" ? 10 : 8;
		return (
			<g transform={`translate(${node.x} ${node.y})`}>
				<circle cx="0" cy="0" r={radius} fill={`url(#${coverageHatchId})`} stroke="#555" strokeWidth="1" />
				<text x="0" y={node.details?.length ? -4 : 3} textAnchor="middle" fontSize={fontSize} fontWeight="600" fill="#111">{node.name}</text>
				{node.details?.map((detail, index) => (
					<text key={`${node.id}-${index}`} x="0" y={12 + index * 10} textAnchor="middle" fontSize="8" fill="#111">
						{detail}
					</text>
				))}
			</g>
		);
	}
	if (node.kind === "phone") {
		if (node.scale) {
			return (
				<g transform={`translate(${node.x} ${node.y}) scale(${node.scale})`}>
					<PhoneIcon x={0} y={0} label={node.name} details={node.details} />
				</g>
			);
		}
		return (
			<g transform={`translate(${node.x} ${node.y})`}>
				<path d="M-28 -15 H28 V12 H-28 Z" fill="#2879bd" stroke="#1b5b88" strokeWidth="1.5" />
				<text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">IP</text>
				<text x="0" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill="#17233d">{node.name}</text>
			</g>
		);
	}
	if (node.kind === "host") {
		const server = /server/i.test(node.name);
		return node.scale
			? <g transform={`translate(${node.x} ${node.y}) scale(${node.scale})`}><PcIcon x={0} y={0} label={node.name} details={node.details} server={server} /></g>
			: <PcIcon x={node.x} y={node.y} label={node.name} details={node.details} server={server} />;
	}

	const nameLines = wrapTopologyNodeLabel(node.name);
	const lineHeight = 13;
	const firstLineY = 4 - ((nameLines.length - 1) * lineHeight) / 2;
	const fontSize = nameLines.length === 1 ? 12 : nameLines.length === 2 ? 11 : 9.5;
	return (
		<g transform={`translate(${node.x} ${node.y})`}>
			<ellipse cx="0" cy="0" rx="72" ry="27" fill="#e0ecfb" stroke="#1775ee" strokeWidth="1.5" />
			<text x="0" y={firstLineY} textAnchor="middle" fontSize={fontSize} fontWeight="700" fill="#1775ee">
				{nameLines.map((line, index) => (
					<tspan key={`${node.id}-${index}`} x="0" dy={index === 0 ? 0 : lineHeight}>{line}</tspan>
				))}
			</text>
			{node.details?.map((detail, index) => (
				<text key={detail} x="0" y={43 + index * 12} textAnchor="middle" fontSize="9.5" fill="#4b5b78">{detail}</text>
			))}
		</g>
	);
}

const candidateWlc = (title, activeTab, sections, path = "WLANs > Edit WLAN", nestedTab = "Layer 2") => ({
	title,
	activeTab,
	nestedTab,
	path,
	sections,
	note: "Illustrative reconstruction from the question's answer details; unspecified settings are omitted.",
});

const WLC_EXHIBITS = {
	"wlc-security-tab": { title: "WLC Security settings", variant: "security" },
	"wlc-security-tab-legacy": { title: "WLC Security settings", variant: "security-legacy" },
	"wlc-my-wlan-layer2": { title: "WLC WLAN Layer 2 settings", variant: "my-wlan" },
	"wlc-psk-layer2": { title: "WLC PSK Layer 2 settings", variant: "psk" },
	"wlc-advanced-tab": { title: "WLC Advanced settings", variant: "advanced" },
	"candidate-wlc-260": candidateWlc("802.11r fast transition", "Security", [
		{ title: "Layer 2 Security", settings: [{ label: "Security", value: "WPA+WPA2" }] },
		{ title: "Fast Transition", settings: [{ label: "Fast Transition", value: "Enabled" }] },
		{ title: "Authentication Key Management", settings: [{ label: "FT 802.1X", checked: true, value: "Enable" }] },
	]),
	"wlc-security-80211r-source": {
		title: "WLC Security settings",
		activeTab: "Security",
		sections: [
			{ title: "Protected Management Frame", settings: [{ label: "PMF", value: "Disabled" }] },
			{ title: "WPA+WPA2 Parameters", settings: [
				{ label: "WPA Policy", checked: false },
				{ label: "WPA2 Policy", checked: true },
				{ label: "WPA2 Encryption", checked: true, value: "AES   TKIP   CCMP256   GCMP128   GCMP256" },
				{ label: "OSEN Policy", checked: false },
			] },
			{ title: "Authentication Key Management", settings: [
				{ label: "802.1X", checked: false, value: "Enable" },
				{ label: "CCKM", checked: false, value: "Enable" },
				{ label: "PSK", checked: true, value: "Enable" },
				{ label: "FT 802.1X", checked: false, value: "Enable" },
				{ label: "FT PSK", checked: false, value: "Enable" },
			] },
		],
	},
	"wlc-security-layer2-source": {
		title: "WLC Security settings",
		activeTab: "Security",
		singleColumn: true,
		sections: [
			{ title: "Layer 2", settings: [
				{ label: "Security Type", value: "Enterprise" },
				{ label: "MAC Filtering", checked: false },
			] },
			{ title: "WPA2+WPA3 Parameters", settings: [
				{ label: "WPA2 Policy", checked: true, value: "WPA2" },
				{ label: "WPA3 Policy", checked: false, value: "WPA3" },
				{ label: "Encryption Cipher", value: "CCMP128(AES)" },
			] },
			{ title: "Authentication Key Management", settings: [
				{ label: "PSK Format", value: "ASCII" },
				{ label: "Pre-Shared Key", value: "******" },
				{ label: "PSK", checked: true },
				{ label: "PSK-SHA2", checked: false },
			] },
		],
	},
	"wlc-radius-server-source": {
		title: "WLC RADIUS server settings",
		activeTab: "Security",
		path: "RADIUS Authentication Servers > New",
		singleColumn: true,
		sections: [{
			settings: [
				{ label: "Server Index (Priority)", value: "2" },
				{ label: "Server IP Address (IPv4/IPv6)", value: "192.168.11.2" },
				{ label: "Shared Secret Format", value: "ASCII" },
				{ label: "Shared Secret", value: "••••••" },
				{ label: "Confirm Shared Secret", value: "••••••" },
				{ label: "Key Wrap", checked: false, value: "(for FIPS customers)" },
				{ label: "Port Number", value: "1812" },
				{ label: "Server Status", value: "Enabled" },
				{ label: "Support for CoA", value: "Disabled" },
				{ label: "Server Timeout", value: "2 seconds" },
				{ label: "Network User", checked: false, value: "Enable" },
				{ label: "Management", checked: false, value: "Enable" },
				{ label: "Tunnel Proxy", checked: false, value: "Enable" },
			],
		}],
	},
	"wlc-layer2-enterprise-source": {
		title: "WLC Layer 2 security settings",
		nestedOnly: true,
		nestedTab: "Layer 2",
		singleColumn: true,
		sections: [
			{ title: "Layer 2 Security", settings: [
				{ label: "Layer 2 Security", value: "None" },
				{ label: "MAC Filtering", checked: false },
			] },
			{ title: "Fast Transition", settings: [{ label: "Fast Transition", checked: false }] },
			{ title: "Protected Management Frame", settings: [{ label: "PMF", value: "Disabled" }] },
			{ title: "WPA+WPA2 Parameters", settings: [
				{ label: "WPA Policy", checked: false },
				{ label: "WPA2 Policy", checked: false },
				{ label: "WPA2 Encryption", checked: false, value: "AES [ ]   TKIP [ ]" },
			] },
			{ title: "Authentication Key Management", settings: [
				{ label: "802.1X", checked: false, value: "Enable" },
				{ label: "CCKM", checked: false, value: "Enable" },
				{ label: "PSK", checked: false, value: "Enable" },
			] },
		],
	},
	"candidate-wlc-281": candidateWlc("802.11w protected management frames", "Security", [
		{ title: "Layer 2 Security", settings: [{ label: "Security", value: "WPA+WPA2" }, { label: "WPA2 Encryption", value: "AES" }] },
		{ title: "Protected Management Frame", settings: [{ label: "PMF", value: "Required" }] },
	]),
	"candidate-wlc-285": candidateWlc("RADIUS network-user authentication", "Security", [
		{ title: "RADIUS Authentication Server", settings: [{ label: "Server Status", checked: true, value: "Enabled" }, { label: "Network User", checked: true, value: "Enable" }, { label: "Management", checked: false, value: "Enable" }] },
	], "Security > AAA Servers", "AAA Servers"),
	"candidate-wlc-294": candidateWlc("WPA2 enterprise authentication", "Security", [
		{ title: "Layer 2 Security", settings: [{ label: "Security", value: "WPA+WPA2" }] },
		{ title: "WPA+WPA2 Parameters", settings: [{ label: "WPA2 Policy", checked: true }, { label: "AES Encryption", checked: true }] },
		{ title: "Authentication Key Management", settings: [{ label: "802.1X", checked: true, value: "Enable" }] },
	]),
	"candidate-wlc-361": candidateWlc("802.11r fast transition", "Security", [
		{ title: "Layer 2 Security", settings: [{ label: "Security", value: "WPA+WPA2" }] },
		{ title: "Fast Transition", settings: [{ label: "Fast Transition", value: "Enabled" }] },
		{ title: "Authentication Key Management", settings: [{ label: "FT 802.1X", checked: true, value: "Enable" }] },
	]),
	"candidate-wlc-377": candidateWlc("FlexConnect local switching", "Advanced", [
		{ title: "FlexConnect", settings: [{ label: "Local Switching", checked: true, value: "Enabled" }] },
	], "WLANs > Edit WLAN > Advanced", null),
	"candidate-wlc-384": candidateWlc("Local EAP user lifetime", "Security", [
		{ title: "Local EAP", settings: [{ label: "Authentication", checked: true, value: "Enabled" }] },
		{ title: "Local Net Users", settings: [{ label: "Guest User", checked: false, value: "Enabled" }, { label: "Lifetime", value: "Not limited" }] },
	], "Security > Local EAP"),
	"candidate-wlc-414": candidateWlc("Guest web authentication prerequisites", "Security", [
		{ title: "Layer 2 Security", settings: [{ label: "Security", value: "None" }, { label: "MAC Filtering", checked: false }] },
		{ title: "Layer 3 Security", settings: [{ label: "Authentication", checked: true, value: "Web Auth" }] },
	], "WLANs > Edit guest WLAN", "Layer 3"),
	"candidate-wlc-518": candidateWlc("WPA2 preshared-key authentication", "Security", [
		{ title: "WPA+WPA2 Parameters", settings: [{ label: "WPA2 Policy", checked: true }, { label: "PMF", value: "Disabled" }] },
		{ title: "Authentication Key Management", settings: [{ label: "PSK", checked: true, value: "Enable" }, { label: "802.1X", checked: false, value: "Enable" }] },
	]),
	"candidate-wlc-593": candidateWlc("2.4 GHz high-speed WLAN", "General", [
		{ title: "WLAN", settings: [{ label: "Profile Name", value: "lantest" }, { label: "Status", checked: true, value: "Enabled" }, { label: "Radio Policy", value: "802.11g only" }] },
	], "WLANs > Edit lantest", null),
	"candidate-wlc-1076": candidateWlc("2.4 GHz WLAN with hidden SSID", "General", [
		{ title: "WLAN", settings: [
			{ label: "Broadcast SSID", checked: false, value: "Disabled" },
			{ label: "Radio Policy", value: "802.11g only" },
		] },
	], "WLANs > Edit WLAN", null),
	"candidate-wlc-1199-interface": candidateWlc("WPA2 PSK WLAN on the Data interface", "General", [
		{ title: "WLAN", settings: [
			{ label: "Profile Name", value: "My_WLAN" },
			{ label: "Interface / Interface Group", value: "Data" },
		] },
		{ title: "Layer 2 Security", settings: [{ label: "Security", value: "WPA2 PSK" }] },
	], "WLANs > Edit My_WLAN", null),
	"candidate-wlc-666": candidateWlc("Static IP client tunneling", "Advanced", [
		{ title: "Client mobility", settings: [{ label: "P2P Blocking Action", value: "Disabled" }, { label: "Static IP Tunneling", checked: true, value: "Enabled" }] },
	], "WLANs > Edit WLAN > Advanced", null),
	"candidate-wlc-712": candidateWlc("Band selection and AAA override", "Advanced", [
		{ title: "Client policy", settings: [{ label: "Client Band Select", checked: true, value: "Enabled" }, { label: "Allow AAA Override", checked: true, value: "Enabled" }] },
	], "WLANs > Edit WLAN > Advanced", null),
	"candidate-wlc-760": candidateWlc("2.4 GHz WLAN with hidden SSID", "General", [
		{ title: "WLAN", settings: [{ label: "Broadcast SSID", checked: false, value: "Enabled" }, { label: "Radio Policy", value: "802.11g only" }] },
	], "WLANs > Edit WLAN", null),
	"candidate-wlc-794": candidateWlc("Web authentication policy", "Security", [
		{ title: "Layer 3 Security", settings: [{ label: "Web Policy", checked: true, value: "Authentication" }, { label: "Pre-authentication traffic", value: "DHCP and DNS" }] },
	], "WLANs > Edit WLAN", "Layer 3"),
	"candidate-wlc-794-max-clients-review": candidateWlc("WLC WLAN client limit", "General", [
		{ title: "WLAN", settings: [
			{ label: "Profile Name", value: "USERWL" },
			{ label: "Maximum Allowed Clients", value: "125" },
		] },
	], "WLANs > Edit USERWL", null),
	"candidate-wlc-827": candidateWlc("WPA2 with client MAC filtering", "Security", [
		{ title: "Layer 2 Security", settings: [{ label: "WPA2 Policy", checked: true }, { label: "MAC Filtering", checked: true }] },
	]),
	"candidate-wlc-838": candidateWlc("WPA2 AES preshared key", "Security", [
		{ title: "WPA+WPA2 Parameters", settings: [{ label: "WPA2 Policy", checked: true }, { label: "Encryption", value: "AES (CCMP128)" }] },
		{ title: "Authentication Key Management", settings: [{ label: "PSK", checked: true, value: "Enable" }] },
	]),
	"candidate-wlc-854": candidateWlc("WPA2 AES PSK configuration", "Security", [
		{ title: "WPA+WPA2 Parameters", settings: [{ label: "WPA2 Policy", checked: true }, { label: "WPA2 Encryption", value: "AES" }] },
		{ title: "Authentication Key Management", settings: [{ label: "PSK", checked: true, value: "Enable" }, { label: "PSK Format", value: "ASCII" }, { label: "Pre-shared key", value: "***********" }] },
	]),
	"candidate-wlc-872": candidateWlc("WLAN MAC filtering", "Security", [
		{ title: "Layer 2 Security", settings: [{ label: "MAC Filtering", checked: true, value: "Enabled" }] },
	]),
	"candidate-wlc-883": candidateWlc("Assign WLAN clients to Data", "General", [
		{ title: "WLAN", settings: [{ label: "Status", checked: true, value: "Enabled" }, { label: "Interface / Interface Group", value: "Data" }] },
	], "WLANs > Edit My_WLAN", null),
	"candidate-wlc-890": candidateWlc("WPA3 SAE authentication", "Security", [
		{ title: "Authentication Key Management", settings: [{ label: "FT + SAE", checked: true, value: "Enabled" }] },
	]),
	"candidate-wlc-911": candidateWlc("WPA2-only 63-character PSK", "Security", [
		{ title: "WPA+WPA2 Parameters", settings: [{ label: "WPA Policy", checked: false }, { label: "WPA2 Policy", checked: true }, { label: "WPA Encryption", checked: false }] },
		{ title: "Authentication Key Management", settings: [{ label: "PSK", checked: true, value: "ASCII" }, { label: "Key length", value: "63 characters (masked)" }] },
	]),
	"candidate-wlc-955": candidateWlc("Secure software download", "General", [
		{ title: "Download File", settings: [{ label: "File Type", value: "Code" }, { label: "Transfer Mode", value: "SFTP (TCP 22)" }, { label: "File Server IP", value: "Not recovered" }] },
	], "Commands > Download File", null),
	"candidate-wlc-992": candidateWlc("Wi-Fi Direct client policy", "Advanced", [
		{ title: "Peer-to-peer policy", settings: [{ label: "Wi-Fi Direct Client Policy", value: "Not-Allow" }] },
	], "WLANs > Edit WLAN > Advanced", null),
	"candidate-wlc-1015": candidateWlc("PSK-SHA2 authentication", "Security", [
		{ title: "Authentication Key Management", settings: [{ label: "PSK-SHA2", checked: true, value: "Enable" }, { label: "AAA server", checked: false, value: "Not used" }] },
	]),
};

function WlcTabs({ active = "Security", nested = false }) {
	const tabs = nested ? ["Layer 2", "Layer 3", "AAA Servers"] : ["General", "Security", "QoS", "Policy-Mapping", "Advanced"];
	return (
		<div className={`flex gap-1 border-b border-[#a9bdd3] ${nested ? "bg-[#e5edf5] px-3 pt-2" : "bg-[#d5e4f2] px-2 pt-2"}`}>
			{tabs.map((tab) => (
				<span
					key={tab}
					aria-current={tab === active ? "page" : undefined}
					className={`rounded-t-md border border-b-0 px-3 py-1.5 font-semibold ${tab === active ? "border-[#9aaec4] bg-[#f8f7f8] text-[#26354b]" : "border-[#b4c6d9] bg-[#c4d9ee] text-[#3d516b]"}`}
				>
					{tab}
				</span>
			))}
		</div>
	);
}

function WlcSection({ title, children, className = "" }) {
	return (
		<section className={`mb-3 ${className}`}>
			<h4 className="mb-1 border-b border-[#96b4d2] pb-1 text-[11px] leading-4 font-bold text-[#3c7184]">{title}</h4>
			<div className="space-y-1 px-2">{children}</div>
		</section>
	);
}

function WlcSetting({ label, value, checked }) {
	return (
		<div className="grid min-h-6 grid-cols-[minmax(0,1fr)_minmax(8rem,0.8fr)] items-center gap-2">
			<span>{label}</span>
			{checked !== undefined ? (
				<span className="flex items-center gap-2">
					<span
						role="img"
						aria-label={checked ? "Enabled" : "Disabled"}
						className={`flex h-4 w-4 items-center justify-center rounded-[2px] border ${checked ? "border-[#2784d8] bg-[#2784d8] text-white" : "border-[#aab2ba] bg-white"} ${checked ? "text-[11px] font-bold" : ""}`}
					>
						{checked ? "✓" : ""}
					</span>
					{value}
				</span>
			) : (
				<span className="inline-flex min-h-6 items-center rounded-sm border border-[#bac0c7] bg-white px-2 shadow-inner">{value}</span>
			)}
		</div>
	);
}

function WlcSettingsPanel({ variant, expanded, config }) {
	if (config.sections) {
		return (
			<div
				role="group"
				aria-label="Recreated Cisco Wireless LAN Controller configuration exhibit"
				className={`mx-auto w-full overflow-hidden border border-[#c5ccd3] bg-[#f8f7f8] text-left font-sans text-xs text-[#262a2e] shadow-sm ${expanded ? "min-w-[52rem] max-w-5xl" : "max-w-3xl"}`}
			>
				{config.nestedOnly
					? <WlcTabs active={config.nestedTab} nested />
					: <WlcTabs active={config.activeTab} />}
				{config.path && <div className="bg-[#f4f3f5] px-4 pt-2 text-sm font-semibold text-[#4c5664]">{config.path}</div>}
				{config.nestedTab && !config.nestedOnly && <WlcTabs active={config.nestedTab} nested />}
				<div className={`grid gap-x-8 p-3 sm:p-4 ${config.singleColumn ? "" : "sm:grid-cols-2"}`}>
					{config.sections.map((section) => (
						section.title ? (
							<WlcSection key={section.title} title={section.title}>
								{section.settings.map((setting) => <WlcSetting key={setting.label} {...setting} />)}
							</WlcSection>
						) : (
							<div key="settings" className="space-y-1 px-2">
								{section.settings.map((setting) => <WlcSetting key={setting.label} {...setting} />)}
							</div>
						)
					))}
				</div>
				{config.note && <p className="border-t border-[#d5dbe2] px-4 py-2 text-[11px] leading-4 text-[#64748b]">{config.note}</p>}
			</div>
		);
	}
	const legacySecurity = variant === "security-legacy";
	return (
		<div
			role="group"
			aria-label="Recreated Cisco Wireless LAN Controller configuration exhibit"
			className={`mx-auto w-full overflow-hidden border border-[#c5ccd3] bg-[#f8f7f8] text-left font-sans text-xs text-[#262a2e] shadow-sm ${expanded ? "min-w-[52rem] max-w-5xl" : "max-w-3xl"}`}
		>
			<WlcTabs active={variant === "advanced" ? "Advanced" : "Security"} />
			{(variant === "my-wlan" || variant === "psk") && (
				<>
					<div className="bg-[#f4f3f5] px-4 pt-2 text-sm font-semibold text-[#4c5664]">WLANs &gt; Edit &quot;my_WLAN&quot;</div>
					<WlcTabs active="Layer 2" nested />
				</>
			)}
			<div className="grid gap-x-8 p-3 sm:grid-cols-2 sm:p-4">
				{variant === "security" || legacySecurity ? (
					<>
						<div>
							<WlcSection title="Fast Transition">
								<WlcSetting label="Fast Transition" value={legacySecurity ? "Disable" : "Adaptive"} />
								<WlcSetting label="Over the DS" checked={false} />
								<WlcSetting label="Reassociation Timeout" value={legacySecurity ? "30 Seconds" : "20 Seconds"} />
							</WlcSection>
							<WlcSection title="Protected Management Frame">
								<WlcSetting label="PMF" value={legacySecurity ? "Optional" : "Required"} />
								<WlcSetting label="Comeback timer (1-10 sec)" value="1" />
								<WlcSetting label="SA Query Timeout (100-500 msec)" value="200" />
							</WlcSection>
						</div>
						<div>
							<WlcSection title="Authentication Key Management">
								<WlcSetting label="802.1X-SHA1" checked value="Enable" />
								<WlcSetting label="802.1X-SHA2" checked={false} value="Enable" />
								<WlcSetting label="CCKM" checked={false} value="Enable" />
							</WlcSection>
							{!legacySecurity && <WlcSetting label="WPA gtk-randomize State 4" value="Disable" />}
						</div>
					</>
				) : null}
				{variant === "my-wlan" && (
					<>
						<div>
							<WlcSection title="Layer 2 Security">
								<WlcSetting label="Layer 2 Security" value="WPA+WPA2" />
								<WlcSetting label="MAC Filtering" checked={false} />
							</WlcSection>
							<WlcSection title="Fast Transition">
								<WlcSetting label="Fast Transition" value="Adaptive" />
								<WlcSetting label="Over the DS" checked />
								<WlcSetting label="Reassociation Timeout" value="20 Seconds" />
							</WlcSection>
							<WlcSection title="Protected Management Frame">
								<WlcSetting label="PMF" value="Disabled" />
							</WlcSection>
						</div>
						<WlcSection title="WPA+WPA2 Parameters">
							<WlcSetting label="WPA Policy" checked={false} />
							<WlcSetting label="WPA2 Policy" checked />
							<WlcSetting label="WPA2 Encryption: AES" checked />
							<WlcSetting label="TKIP / CCMP256 / GCMP128 / GCMP256" checked={false} />
							<WlcSetting label="OSEN Policy" checked={false} />
							<WlcSetting label="802.1X" value="Enable" />
						</WlcSection>
					</>
				)}
				{variant === "psk" && (
					<>
						<div>
							<WlcSection title="Layer 2 Security">
								<WlcSetting label="Layer 2 Security" value="WPA+WPA2" />
								<WlcSetting label="Security Type" value="Personal" />
								<WlcSetting label="MAC Filtering" checked={false} />
								<WlcSetting label="AutoConfig iPSK" checked={false} value="Enable" />
							</WlcSection>
							<WlcSection title="WPA+WPA2 Parameters">
								<WlcSetting label="WPA Policy" checked={false} />
								<WlcSetting label="WPA2 Policy" checked={false} />
								<WlcSetting label="CCMP128 (AES)" checked />
								<WlcSetting label="TKIP" checked={false} />
							</WlcSection>
						</div>
						<div>
							<WlcSection title="Authentication Key Management">
								<WlcSetting label="PSK Format" value="ASCII" />
								<WlcSetting label="Key" value="••••••••" />
							</WlcSection>
							<WlcSetting label="WPA GTK-randomize State 14" value="Disable" />
						</div>
					</>
				)}
				{variant === "advanced" && (
					<>
						<div>
							<WlcSection title="Advanced">
								<WlcSetting label="Allow AAA Override" checked={false} value="Enabled" />
								<WlcSetting label="Coverage Hole Detection" checked={false} value="Enabled" />
								<WlcSetting label="Enable Session Timeout" checked={false} />
								<WlcSetting label="Session Timeout (secs)" value="" />
								<WlcSetting label="Aironet IE" checked={false} value="Enabled" />
								<WlcSetting label="Override Interface ACL (IPv4)" value="None" />
								<WlcSetting label="Layer2 ACL" value="None" />
								<WlcSetting label="P2P Blocking Action" value="Disabled" />
								<WlcSetting label="Maximum Allowed Clients" value="0" />
								<WlcSetting label="Maximum Allowed Clients Per AP Radio" value="200" />
							</WlcSection>
						</div>
						<div>
							<WlcSection title="DHCP">
								<WlcSetting label="DHCP Server Override" checked={false} />
								<WlcSetting label="DHCP Addr. Assignment Required" checked={false} />
							</WlcSection>
							<WlcSection title="Management Frame Protection (MFP)">
								<WlcSetting label="MFP Client Protection" value="Optional" />
							</WlcSection>
							<WlcSection title="DTIM Period (in beacon intervals)">
								<WlcSetting label="802.11a/n (1-255)" value="1" />
								<WlcSetting label="802.11b/g/n (1-255)" value="1" />
							</WlcSection>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export function ExhibitDiagram({ type, className = "", offlineLayout = false, compact = false }) {
	const [openTheme, setOpenTheme] = useState(null);
	const wrapRef = useRef(null);
	const isRouterOnAStick = type === "router-on-a-stick-vlan20";
	const topology = isRouterOnAStick ? null : NETWORK_TOPOLOGIES[type];
	const wlcExhibit = WLC_EXHIBITS[type];
	if (!isRouterOnAStick && !topology && !wlcExhibit) return null;
	const title = topology?.title ?? wlcExhibit?.title ?? "Network topology";
	const coverageHatchId = `${type}-coverage-hatch`;
	const nodes = topology ? new Map(topology.nodes.map((node) => [node.id, node])) : null;
	const labels = topology ? topologyLabels(topology) : null;
	const generatedViewBox = topology ? topologyViewBox(topology, labels) : null;
	const viewBox = topology
		? topology.viewBox ? includeViewBox(topology.viewBox, generatedViewBox) : generatedViewBox
		: null;
	const renderDiagram = (expanded = false) => wlcExhibit ? (
		<WlcSettingsPanel variant={wlcExhibit.variant} config={wlcExhibit} expanded={expanded} />
	) : topology ? (
		<>
			<svg
				viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
				role="img"
				aria-label={title}
				className={expanded
					? "mx-auto block h-auto w-[1000px]"
					: offlineLayout || compact
						? "mx-auto block h-auto w-full max-w-5xl !max-h-[min(38vh,20rem)]"
						: "mx-auto block h-auto w-full max-w-5xl"}
			>
				{topology.nodes.some((node) => node.shape === "wireless-coverage" || node.shape === "wireless-channel") && (
					<defs>
						<pattern id={coverageHatchId} width="6" height="6" patternUnits="userSpaceOnUse">
							<rect width="6" height="6" fill="#f7f7f7" />
							<path d="M-1 1 L1 -1 M0 6 L6 0 M5 7 L7 5" stroke="#c7c7c7" strokeWidth="0.7" />
						</pattern>
					</defs>
				)}
				<rect
					x={viewBox.x}
					y={viewBox.y}
					width={viewBox.width}
					height={viewBox.height}
					fill={topology.canvasBackground ?? "#fff"}
				/>
				{topology.broadcastArea && (
					<ellipse
						cx={topology.broadcastArea.x}
						cy={topology.broadcastArea.y}
						rx={topology.broadcastArea.rx}
						ry={topology.broadcastArea.ry}
						fill="#ffd89a"
					/>
				)}
				{topology.links.map((link, index) => (
					<TopologyLink key={`${link.from}-${link.to}-${index}`} link={link} nodes={nodes} />
				))}
				{topology.flowArrows?.map((arrow, index) => (
					<TopologyFlowArrow key={`flow-arrow-${index}`} arrow={arrow} />
				))}
				{topology.nodes.map((node) => (
					<TopologyDevice key={node.id} node={node} coverageHatchId={coverageHatchId} />
				))}
				{topology.connectionMarkers?.map((marker, index) => (
					<circle
						key={`connection-marker-${index}`}
						cx={marker.x}
						cy={marker.y}
						r={marker.radius ?? 10}
						fill={marker.fill ?? "#2bea32"}
					/>
				))}
				{topology.links.map((link, index) => (
					(labels.get(index) ?? []).map((labelPosition, labelIndex) => (
						<TopologyLinkLabel
							key={`label-${link.from}-${link.to}-${index}-${labelIndex}`}
							link={link}
							nodes={nodes}
							labelPosition={labelPosition}
						/>
					))
				))}
				{topology.rightLabels?.items.map((label, index) => (
					<text
						key={label}
						x={topology.rightLabels.x}
						y={topology.rightLabels.y + index * topology.rightLabels.lineHeight}
						textAnchor="start"
						fontFamily={topology.rightLabels.fontFamily}
						fontSize={topology.rightLabels.fontSize ?? 15}
						fontWeight={topology.rightLabels.fontWeight ?? 700}
						fill="#17233d"
					>
						{label}
					</text>
				))}
				{topology.annotations?.map((annotation, index) => (
					<TopologyAnnotation key={`annotation-${index}`} annotation={annotation} />
				))}
			</svg>
			{topology.configuration && (
				<pre className="mt-3 overflow-x-auto rounded-lg bg-[#f8fafc] p-3 font-mono text-xs text-[#26354b]">
					<code>{topology.configuration}</code>
				</pre>
			)}
		</>
	) : (
		<div className={expanded ? "mx-auto w-[1000px]" : ""}>
			<div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
				<TopologyNode role="Router" name="R1" />
				<p className="text-center text-xs font-semibold text-[#526584]">E0/0 to E0/0</p>
				<TopologyNode role="Switch" name="SW1" />
				<p className="text-center text-xs font-semibold text-[#526584]">E0/1 to E0/1</p>
				<TopologyNode role="Switch" name="SW2" />
			</div>
		</div>
	);
	return (
		<>
			<section ref={wrapRef} aria-label={title} className={`mb-4 rounded-2xl border border-[#d9e1ef] bg-[#f7f9fc] ${offlineLayout ? "p-3 sm:p-4" : "p-4 sm:p-5"} shadow-sm ${className}`}>
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
				{topology && <p className="mb-3 text-sm leading-5 text-[#526584]">{topology.note}</p>}
				<div className={topology || wlcExhibit ? "overflow-x-auto rounded-xl border border-[#e2e8f0] bg-white p-2 sm:p-3" : ""}>{renderDiagram()}</div>
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
export function ExhibitImage({ src, alt = "Exhibit diagram", className = "", imageClassName = "", lazy = false, cropTop = false, offlineLayout = false, compact = false }) {
	const [openTheme, setOpenTheme] = useState(null);
	const wrapRef = useRef(null);
	const image = offlineLayout
		? <img key={src} src={src} alt={alt} loading={lazy ? "lazy" : undefined} className={`block h-auto w-auto max-w-full rounded-lg object-contain !max-h-[min(38vh,20rem)] ${imageClassName}`} />
		: cropTop
		? (
			<div className="aspect-[578/260] w-full overflow-hidden rounded-lg bg-white">
				<img key={src} src={src} alt={alt} loading={lazy ? "lazy" : undefined} className={`h-full w-full object-cover object-top ${imageClassName}`} />
			</div>
		)
		: <img key={src} src={src} alt={alt} loading={lazy ? "lazy" : undefined} className={`block h-auto w-auto max-w-full rounded-lg object-contain ${compact ? "!max-h-[min(38vh,20rem)]" : ""} ${imageClassName}`} />;
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
