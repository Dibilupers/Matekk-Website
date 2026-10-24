import { linkUp } from "./labEngine";

/* Packet Tracer-style network diagram. Links are green when both ends are up,
   red/dashed when down. Router labels follow the live hostname. */

export function RouterIcon({ x, y, label, sub, details, active, labelBackdrop = false }) {
	const deviceDetails = details ?? (sub ? [sub] : []);
	const detailWidth = Math.max(48, ...deviceDetails.map((detail) => detail.length * 5.2 + 12));
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
			{labelBackdrop && <rect x={-Math.max(24, label.length * 3.6 + 8)} y="25" width={Math.max(48, label.length * 7.2 + 16)} height="20" rx="7" fill="#fff" stroke="#dbe4ee" strokeWidth="1" />}
			<text x="0" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#17233d">{label}</text>
			{labelBackdrop && deviceDetails.length > 0 && <rect x={-detailWidth / 2} y="47" width={detailWidth} height={deviceDetails.length * 12 + 8} rx="5" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />}
			{deviceDetails.map((detail, index) => (
				<text key={detail} x="0" y={60 + index * 12} textAnchor="middle" fontSize="9.5" fill="#4b5b78">{detail}</text>
			))}
		</g>
	);
}

export function SwitchIcon({ x, y, label, sub, details, labelBackdrop = false }) {
	const deviceDetails = details ?? (sub ? [sub] : []);
	const detailWidth = Math.max(48, ...deviceDetails.map((detail) => detail.length * 5.2 + 12));
	return (
		<g transform={`translate(${x} ${y})`}>
			<path d="M-34 -7 L-22 -20 H34 L23 -7 Z" fill="#4a9bda" stroke="#0f4c81" strokeWidth="1.5" />
			<path d="M-34 -7 H23 V12 H-34 Z" fill="#1f6fb2" stroke="#0f4c81" strokeWidth="1.5" />
			<path d="M23 -7 L34 -20 V0 L23 12 Z" fill="#155d99" stroke="#0f4c81" strokeWidth="1.5" />
			<g stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
				<path d="M-22 -12h5M-10 -12h5M2 -12h5M14 -12h5" />
			</g>
			{labelBackdrop && <rect x={-Math.max(24, label.length * 3.6 + 8)} y="25" width={Math.max(48, label.length * 7.2 + 16)} height="20" rx="7" fill="#fff" stroke="#dbe4ee" strokeWidth="1" />}
			<text x="0" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#17233d">{label}</text>
			{labelBackdrop && deviceDetails.length > 0 && <rect x={-detailWidth / 2} y="47" width={detailWidth} height={deviceDetails.length * 12 + 8} rx="5" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />}
			{deviceDetails.map((detail, index) => (
				<text key={detail} x="0" y={60 + index * 12} textAnchor="middle" fontSize="9.5" fill="#4b5b78">{detail}</text>
			))}
		</g>
	);
}

export function PcIcon({ x, y, label, sub, details, server, labelBackdrop = false }) {
	const deviceDetails = details ?? (sub ? [sub] : []);
	const detailWidth = Math.max(48, ...deviceDetails.map((detail) => detail.length * 5.2 + 12));
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
			{labelBackdrop && <rect x={-Math.max(24, label.length * 3.6 + 8)} y="25" width={Math.max(48, label.length * 7.2 + 16)} height="20" rx="7" fill="#fff" stroke="#dbe4ee" strokeWidth="1" />}
			<text x="0" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#17233d">{label}</text>
			{labelBackdrop && deviceDetails.length > 0 && <rect x={-detailWidth / 2} y="47" width={detailWidth} height={deviceDetails.length * 12 + 8} rx="5" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />}
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

function TopologyLabel({ x, y, children, fontSize = 9.5, fontWeight = 500 }) {
	const width = Math.max(24, String(children).length * fontSize * 0.58 + 10);
	const height = fontSize + 8;
	return (
		<g>
			<rect x={x - width / 2} y={y - height + 2} width={width} height={height} rx="4" fill="#fff" fillOpacity="0.97" stroke="#dbe4ee" strokeWidth="1" />
			<text x={x} y={y} textAnchor="middle" dominantBaseline="auto" fontSize={fontSize} fontWeight={fontWeight} fill="#334155">
				{children}
			</text>
		</g>
	);
}

function topologyViewBox(lab, state) {
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
	const includeLabel = (x, y, label) => {
		const width = Math.max(24, String(label).length * 9.5 * 0.58 + 10);
		const height = 9.5 + 8;
		include(x, y - height / 2 + 2, width / 2, height / 2);
	};
	const pos = (name) => lab.layout.nodes[name];

	Object.entries(lab.layout.nodes).forEach(([name, node]) => {
		const device = state.devices[name];
		const label = device.kind === "router" ? device.hostname : name;
		const details = node.sub ? [node.sub] : [];
		const labelWidth = Math.max(48, label.length * 7.2 + 16);
		const detailWidth = Math.max(48, ...details.map((detail) => detail.length * 5.2 + 12));
		const iconHalfWidth = device.kind === "pc" ? 30 : 38;
		const top = device.kind === "pc" ? -30 : -28;
		const bottom = details.length ? 55 + details.length * 12 : 45;
		include(node.x, node.y + (top + bottom) / 2, Math.max(iconHalfWidth, labelWidth / 2, details.length ? detailWidth / 2 : 0), (bottom - top) / 2);
	});

	lab.links.forEach((link) => {
		const [aDevice, aInterface] = link.a.split(":");
		const [bDevice, bInterface] = link.b.split(":");
		const a = pos(aDevice);
		const b = pos(bDevice);
		const dx = b.x - a.x;
		const dy = b.y - a.y;
		const length = Math.hypot(dx, dy) || 1;
		const ux = dx / length;
		const uy = dy / length;
		const nx = -uy * 11;
		const ny = ux * 11;
		const x1 = a.x + ux * 34;
		const y1 = a.y + uy * 34;
		const x2 = b.x - ux * 34;
		const y2 = b.y - uy * 34;
		includeLabel(x1 + ux * 16 + nx, y1 + uy * 16 + ny + 3, SHORT(aInterface));
		includeLabel(x2 - ux * 16 + nx, y2 - uy * 16 + ny + 3, SHORT(bInterface));
		includeLabel((x1 + x2) / 2 - nx, (y1 + y2) / 2 - ny + 3, link.net);
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

export default function LabTopology({ lab, state, activeDevice }) {
	const { layout } = lab;
	const pos = (name) => layout.nodes[name];
	const viewBox = topologyViewBox(lab, state);
	return (
		<svg viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`} className="mx-auto h-auto w-full max-w-5xl" role="img" aria-label={`Lab topology: ${lab.title}`}>
			{layout.cloud && (
				<line x1={layout.cloud.x} y1={layout.cloud.y + 22} x2={pos(layout.cloud.attach).x} y2={pos(layout.cloud.attach).y - 22} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
			)}
			{lab.links.map((l) => {
				const [ad, ai] = l.a.split(":");
				const [bd, bi] = l.b.split(":");
				const A = pos(ad);
				const B = pos(bd);
				const up = linkUp(lab, state, l);
				const color = up ? "#16a34a" : "#dc2626";
				const dx = B.x - A.x;
				const dy = B.y - A.y;
				const len = Math.hypot(dx, dy) || 1;
				const ux = dx / len;
				const uy = dy / len;
				const off = 34; // keep cable ends clear of the icons
				const x1 = A.x + ux * off, y1 = A.y + uy * off, x2 = B.x - ux * off, y2 = B.y - uy * off;
				const nx = -uy * 11, ny = ux * 11; // perpendicular offset for labels
				return (
					<g key={`${l.a}-${l.b}`}>
						<line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeDasharray={up ? "0" : "6 5"} />
						<circle cx={x1} cy={y1} r="4" fill={color} />
						<circle cx={x2} cy={y2} r="4" fill={color} />
						<TopologyLabel x={x1 + ux * 16 + nx} y={y1 + uy * 16 + ny + 3}>{SHORT(ai)}</TopologyLabel>
						<TopologyLabel x={x2 - ux * 16 + nx} y={y2 - uy * 16 + ny + 3}>{SHORT(bi)}</TopologyLabel>
						<TopologyLabel x={(x1 + x2) / 2 - nx} y={(y1 + y2) / 2 - ny + 3} fontWeight={600}>{l.net}</TopologyLabel>
					</g>
				);
			})}
			{Object.entries(layout.nodes).map(([name, n]) => {
				const d = state.devices[name];
				if (d.kind === "pc") return <PcIcon key={name} x={n.x} y={n.y} label={name} sub={n.sub} server={name.startsWith("SRV")} labelBackdrop />;
				if (d.kind === "switch") return <SwitchIcon key={name} x={n.x} y={n.y} label={name} sub={n.sub} labelBackdrop />;
				return <RouterIcon key={name} x={n.x} y={n.y} label={d.hostname} sub={n.sub} active={activeDevice === name} labelBackdrop />;
			})}
			{layout.cloud && <CloudIcon x={layout.cloud.x} y={layout.cloud.y} label={layout.cloud.label} sub={layout.cloud.sub} />}
		</svg>
	);
}
