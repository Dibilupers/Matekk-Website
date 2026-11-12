import { linkUp } from "./labEngine";
import { placeTopologyLabels } from "../../../../../utils/topologyLabels";
import {
	topologyCableLabelPosition,
	topologyLinkGeometry,
	topologyPortLabelPositions,
} from "../../../../../utils/topologyGeometry";

/* Packet Tracer-style network diagram. Links are green when both ends are up,
   red/dashed when down. Router labels follow the live hostname. */

export function RouterIcon({ x, y, label, sub, details, active }) {
	const deviceDetails = details ?? (sub ? [sub] : []);
	return (
		<g transform={`translate(${x} ${y})`}>
			{active && <ellipse cx="0" cy="3" rx="44" ry="25" fill="none" stroke="#1775EE" strokeWidth="2" strokeDasharray="4 3" />}
			<ellipse cx="0" cy="12" rx="32" ry="10" fill="#0f4c81" />
			<rect x="-32" y="-6" width="64" height="18" fill="#1f6fb2" />
			<ellipse cx="0" cy="-6" rx="32" ry="10" fill="#3b8fd6" stroke="#0f4c81" strokeWidth="1.5" />
			<g stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none">
				<path d="M-6 -9 L-18 -3 M-18 -3 L-12 -3 M-18 -3 L-15 -8" />
				<path d="M6 -3 L18 -9 M18 -9 L12 -9 M18 -9 L15 -4" />
			</g>
			<text x="0" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#17233d">{label}</text>
			{deviceDetails.map((detail, index) => (
				<text key={detail} x="0" y={60 + index * 12} textAnchor="middle" fontSize="9.5" fill="#4b5b78">{detail}</text>
			))}
		</g>
	);
}

export function SwitchIcon({ x, y, label, sub, details }) {
	const deviceDetails = details ?? (sub ? [sub] : []);
	return (
		<g transform={`translate(${x} ${y})`}>
			<path d="M-34 -7 L-22 -20 H34 L23 -7 Z" fill="#4a9bda" stroke="#0f4c81" strokeWidth="1.5" />
			<path d="M-34 -7 H23 V12 H-34 Z" fill="#1f6fb2" stroke="#0f4c81" strokeWidth="1.5" />
			<path d="M23 -7 L34 -20 V0 L23 12 Z" fill="#155d99" stroke="#0f4c81" strokeWidth="1.5" />
			<g stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
				<path d="M-22 -12h5M-10 -12h5M2 -12h5M14 -12h5" />
			</g>
			<text x="0" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#17233d">{label}</text>
			{deviceDetails.map((detail, index) => (
				<text key={detail} x="0" y={60 + index * 12} textAnchor="middle" fontSize="9.5" fill="#4b5b78">{detail}</text>
			))}
		</g>
	);
}

export function PcIcon({ x, y, label, sub, details, server }) {
	const deviceDetails = details ?? (sub ? [sub] : []);
	return (
		<g transform={`translate(${x} ${y})`}>
			{server ? (
				<>
					<rect x="-16" y="-26" width="32" height="44" rx="3" fill="#1f2937" />
					{[-18, -8, 2].map((yy) => <rect key={yy} x="-11" y={yy} width="22" height="6" rx="1" fill="#60a5fa" />)}
				</>
			) : (
				<>
					<rect x="-26" y="-22" width="52" height="34" rx="3" fill="#1f2937" />
					<rect x="-22" y="-18" width="44" height="26" rx="1.5" fill="#60a5fa" />
					<rect x="-5" y="12" width="10" height="7" fill="#374151" />
					<rect x="-16" y="19" width="32" height="4" rx="2" fill="#374151" />
				</>
			)}
			<text x="0" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#17233d">{label}</text>
			{deviceDetails.map((detail, index) => (
				<text key={detail} x="0" y={60 + index * 12} textAnchor="middle" fontSize="9.5" fill="#4b5b78">{detail}</text>
			))}
		</g>
	);
}

function CloudIcon({ x, y, label, sub }) {
	return (
		<g transform={`translate(${x} ${y})`}>
			<path d="M-30 8 a14 14 0 0 1 4-27 a18 18 0 0 1 32-6 a14 14 0 0 1 24 10 a12 12 0 0 1-2 23 z" fill="#e0ecfb" stroke="#1775EE" strokeWidth="1.5" />
			<text x="0" y="0" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1775EE">{label}</text>
			<text x="0" y="12" textAnchor="middle" fontSize="9" fill="#4b5b78">{sub}</text>
		</g>
	);
}

const SHORT = (ifName) => (ifName.startsWith("g") ? `G${ifName.slice(1)}` : ifName.startsWith("fa") ? "Fa0" : ifName);
const geometryKind = (device, name) => device.kind === "pc" && name.startsWith("SRV") ? "server" : device.kind;

function TopologyLabel({ x, y, children, fontSize = 9.5, fontWeight = 500 }) {
	return (
		<text
			x={x}
			y={y}
			textAnchor="middle"
			dominantBaseline="auto"
			fontSize={fontSize}
			fontWeight={fontWeight}
			fill="#17233d"
			paintOrder="stroke"
			stroke="#f7fafc"
			strokeWidth="3"
			strokeLinejoin="round"
		>
			{children}
		</text>
	);
}

function topologyNodeBounds(name, node, state) {
	const device = state.devices[name];
	const label = device.kind === "router" ? device.hostname : name;
	const details = node.details ?? (node.sub ? [node.sub] : []);
	const labelWidth = Math.max(48, label.length * 7.2 + 16);
	const detailWidth = Math.max(48, ...details.map((detail) => detail.length * 5.2 + 12));
	const iconHalfWidth = device.kind === "pc" ? 30 : 38;
	const top = device.kind === "pc" ? -30 : -28;
	const bottom = details.length ? 55 + details.length * 12 : 45;
	return {
		x: node.x,
		y: node.y + (top + bottom) / 2,
		width: 2 * Math.max(iconHalfWidth, labelWidth / 2, details.length ? detailWidth / 2 : 0),
		height: bottom - top,
	};
}

function topologyLabels(lab, state) {
	const obstacles = Object.entries(lab.layout.nodes)
		.map(([name, node]) => topologyNodeBounds(name, node, state));
	const portLabels = [];
	const networkLabels = [];
	lab.links.forEach((link, index) => {
		const [aDevice, aInterface] = link.a.split(":");
		const [bDevice, bInterface] = link.b.split(":");
		const a = lab.layout.nodes[aDevice];
		const b = lab.layout.nodes[bDevice];
		const geometry = topologyLinkGeometry(
			a,
			b,
			geometryKind(state.devices[aDevice], aDevice),
			geometryKind(state.devices[bDevice], bDevice),
			link.lane ?? 0,
		);
		const { x1, y1, x2, y2, nx, ny } = geometry;
		const [portA, portB] = topologyPortLabelPositions(geometry);
		const addLabel = (key, text, point, side, fontSize = 9.5) => {
			const height = fontSize + 2;
			const width = Math.max(18, String(text).length * fontSize * 0.58);
			const centerOffsetY = 2 - height / 2;
			const position = side === 0
				? point
				: topologyCableLabelPosition({
					...point,
					nx,
					ny,
					width,
					height,
					side,
					centerOffsetY,
				});
			(side === 0 ? portLabels : networkLabels).push({
				key,
				text,
				...position,
				width,
				height,
				centerOffsetY,
			});
		};
		addLabel(`${index}-a`, SHORT(aInterface), portA, 0);
		addLabel(`${index}-b`, SHORT(bInterface), portB, 0);
		if (link.net) {
			addLabel(`${index}-net`, link.net, { x: (x1 + x2) / 2, y: (y1 + y2) / 2 }, -1);
		}
	});

	const placedNetworkLabels = placeTopologyLabels(networkLabels, [
		...obstacles,
		...portLabels.map((label) => ({
			x: label.x,
			y: label.y + label.centerOffsetY,
			width: label.width,
			height: label.height,
		})),
	]);
	return [...portLabels, ...placedNetworkLabels].reduce((map, label) => {
		map.set(label.key, label);
		return map;
	}, new Map());
}

function topologyViewBox(lab, state, labels) {
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	const include = (x, y, halfWidth = 0, halfHeight = 0) => {
		minX = Math.min(minX, x - halfWidth);
		minY = Math.min(minY, y - halfHeight);
		maxX = Math.max(maxX, x + halfWidth);
		maxY = Math.max(maxY, y + halfHeight);
	};
	const pos = (name) => lab.layout.nodes[name];

	Object.entries(lab.layout.nodes).forEach(([name, node]) => {
		const bounds = topologyNodeBounds(name, node, state);
		include(bounds.x, bounds.y, bounds.width / 2, bounds.height / 2);
	});

	labels.forEach((label) => {
		include(label.x, label.y + label.centerOffsetY, label.width / 2, label.height / 2);
	});

	if (lab.layout.cloud) {
		const cloud = lab.layout.cloud;
		const attached = pos(cloud.attach);
		include(cloud.x, cloud.y - 5, 40, 36);
		include(cloud.x, cloud.y + 22, 0, 0);
		include(attached.x, attached.y - 22, 0, 0);
	}

	if (!Number.isFinite(minX)) return { x: 0, y: 0, width: lab.layout.width, height: lab.layout.height };
	const padding = 18;
	const width = Math.max(lab.layout.width, Math.ceil(maxX - minX + padding * 2));
	const height = Math.max(lab.layout.height, Math.ceil(maxY - minY + padding * 2));
	return {
		x: Math.floor((minX + maxX - width) / 2),
		y: Math.floor((minY + maxY - height) / 2),
		width,
		height,
	};
}

export default function LabTopology({
	lab,
	state,
	activeDevice,
	className = "mx-auto h-auto w-full max-w-5xl",
	style,
	svgRef,
}) {
	const { layout } = lab;
	const pos = (name) => layout.nodes[name];
	const labels = topologyLabels(lab, state);
	const viewBox = topologyViewBox(lab, state, labels);
	const cloudLink = layout.cloud
		? topologyLinkGeometry(
			{ x: layout.cloud.x, y: layout.cloud.y },
			pos(layout.cloud.attach),
			"cloud",
			geometryKind(state.devices[layout.cloud.attach], layout.cloud.attach),
		)
		: null;
	return (
		<svg ref={svgRef} viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`} className={className} style={style} role="img" aria-label={`Lab topology: ${lab.title}`}>
			{cloudLink && (
				<line x1={cloudLink.x1} y1={cloudLink.y1} x2={cloudLink.x2} y2={cloudLink.y2} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
			)}
			{lab.links.map((l) => {
				const [ad] = l.a.split(":");
				const [bd] = l.b.split(":");
				const A = pos(ad);
				const B = pos(bd);
				const up = linkUp(lab, state, l);
				const color = up ? "#16a34a" : "#dc2626";
				const geometry = topologyLinkGeometry(
					A,
					B,
					geometryKind(state.devices[ad], ad),
					geometryKind(state.devices[bd], bd),
					l.lane ?? 0,
				);
				const { x1, y1, x2, y2 } = geometry;
				return (
					<g key={`${l.a}-${l.b}`}>
						<line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeDasharray={up ? "0" : "6 5"} />
						<circle cx={x1} cy={y1} r="4" fill={color} />
						<circle cx={x2} cy={y2} r="4" fill={color} />
					</g>
				);
			})}
			{Object.entries(layout.nodes).map(([name, n]) => {
				const d = state.devices[name];
				if (d.kind === "pc") return <PcIcon key={name} x={n.x} y={n.y} label={n.label ?? name} sub={n.sub} details={n.details} server={name.startsWith("SRV")} />;
				if (d.kind === "switch") return <SwitchIcon key={name} x={n.x} y={n.y} label={name} sub={n.sub} details={n.details} />;
				return <RouterIcon key={name} x={n.x} y={n.y} label={d.hostname} sub={n.sub} details={n.details} active={activeDevice === name} />;
			})}
			{layout.cloud && <CloudIcon x={layout.cloud.x} y={layout.cloud.y} label={layout.cloud.label} sub={layout.cloud.sub} />}
			{lab.links.map((link, index) => (
				<g key={`labels-${link.a}-${link.b}`}>
					<TopologyLabel x={labels.get(`${index}-a`).x} y={labels.get(`${index}-a`).y}>{SHORT(link.a.split(":")[1])}</TopologyLabel>
					<TopologyLabel x={labels.get(`${index}-b`).x} y={labels.get(`${index}-b`).y}>{SHORT(link.b.split(":")[1])}</TopologyLabel>
					{link.net && <TopologyLabel x={labels.get(`${index}-net`).x} y={labels.get(`${index}-net`).y} fontWeight={600}>{link.net}</TopologyLabel>}
				</g>
			))}
		</svg>
	);
}
