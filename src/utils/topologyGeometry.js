const NODE_SHAPES = {
	router: { type: "rect", left: -32, right: 32, top: -16, bottom: 22 },
	switch: { type: "rect", left: -34, right: 34, top: -20, bottom: 12 },
	phone: { type: "rect", left: -28, right: 28, top: -15, bottom: 12 },
	host: { type: "rect", left: -26, right: 26, top: -22, bottom: 23 },
	pc: { type: "rect", left: -26, right: 26, top: -22, bottom: 23 },
	server: { type: "rect", left: -16, right: 16, top: -26, bottom: 18 },
	network: { type: "ellipse", rx: 72, ry: 27 },
	cloud: { type: "rect", left: -34, right: 34, top: -20, bottom: 20 },
};

const LABEL_SIDE_OFFSET = 14;
const MAX_LABEL_SIDE_OFFSET = 20;
const TOPOLOGY_PORT_NAME = /^(?:fa|fastethernet|gi|gigabitethernet|te|tengigabitethernet|se|serial|eth|ethernet|e)\d+(?:\/\d+)*(?:\.\d+)?$/i;

function boundaryDistance(kind, x, y, ux, uy) {
	const shape = NODE_SHAPES[kind] ?? NODE_SHAPES.router;
	if (shape.type === "ellipse") {
		const a = (ux * ux) / (shape.rx * shape.rx) + (uy * uy) / (shape.ry * shape.ry);
		const b = 2 * ((x * ux) / (shape.rx * shape.rx) + (y * uy) / (shape.ry * shape.ry));
		const c = (x * x) / (shape.rx * shape.rx) + (y * y) / (shape.ry * shape.ry) - 1;
		return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
	}

	const xDistance = ux > 0
		? (shape.right - x) / ux
		: ux < 0
			? (shape.left - x) / ux
			: Infinity;
	const yDistance = uy > 0
		? (shape.bottom - y) / uy
		: uy < 0
			? (shape.top - y) / uy
			: Infinity;
	return Math.min(xDistance, yDistance);
}

export function topologyLinkGeometry(from, to, fromKind, toKind, offset = 0) {
	const dx = to.x - from.x;
	const dy = to.y - from.y;
	const length = Math.hypot(dx, dy) || 1;
	const ux = dx / length;
	const uy = dy / length;
	const nx = -uy;
	const ny = ux;
	const offsetX = nx * offset;
	const offsetY = ny * offset;
	const startDistance = boundaryDistance(fromKind, offsetX, offsetY, ux, uy);
	const endDistance = boundaryDistance(toKind, offsetX, offsetY, -ux, -uy);

	return {
		ux,
		uy,
		nx,
		ny,
		x1: from.x + offsetX + ux * startDistance,
		y1: from.y + offsetY + uy * startDistance,
		x2: to.x + offsetX - ux * endDistance,
		y2: to.y + offsetY - uy * endDistance,
	};
}

export function topologyPortLabelPositions({ x1, y1, x2, y2 }) {
	const dx = x2 - x1;
	const dy = y2 - y1;

	return [
		{ x: x1 + dx * 0.25, y: y1 + dy * 0.25 },
		{ x: x1 + dx * 0.75, y: y1 + dy * 0.75 },
	];
}

export function topologyPortLabelCandidates({ x1, y1, x2, y2, nx, ny }, endpoint) {
	const fromStart = endpoint === 0;
	const fractions = fromStart
		? [0.25, 0.3, 0.35, 0.4, 0.45, 0.5]
		: [0.75, 0.7, 0.65, 0.6, 0.55, 0.5];
	const offsets = [0, -8, 8, -16, 16, -24, 24];

	const atFraction = (fraction, offset) => ({
		x: x1 + (x2 - x1) * fraction + nx * offset,
		y: y1 + (y2 - y1) * fraction + ny * offset,
	});

	return [
		...fractions.map((fraction) => atFraction(fraction, 0)),
		...fractions.flatMap((fraction) => offsets.slice(1).map((offset) => atFraction(fraction, offset))),
	];
}

export function topologyPortLabelParts(label) {
	const parts = label.split(/\s*↔\s*/);
	return parts.length <= 2 && parts.every((part) => TOPOLOGY_PORT_NAME.test(part)) ? parts : null;
}

export function topologyCableLabelPosition({
	x,
	y,
	nx,
	ny,
	width,
	height,
	side = 1,
	centerOffsetY = 0,
	gap = 4,
	requestedOffset = 0,
}) {
	const boxRadius = Math.abs(nx) * width / 2 + Math.abs(ny) * height / 2;
	const requiredOffset = boxRadius + gap - side * centerOffsetY * ny;
	const normalOffset = side * Math.max(requiredOffset, requestedOffset);
	return {
		x: x + nx * normalOffset,
		y: y + ny * normalOffset,
	};
}

export function topologyLinkLabelPosition(
	x1,
	y1,
	x2,
	y2,
	preferredX,
	preferredY,
	{ width = 44, height = 20, centerOffsetY = -2, gap = 4 } = {},
) {
	const dx = x2 - x1;
	const dy = y2 - y1;
	const lengthSquared = dx * dx + dy * dy || 1;
	const length = Math.sqrt(lengthSquared);
	const ux = dx / length;
	const uy = dy / length;
	const nx = -uy;
	const ny = ux;
	const hasPreference = Number.isFinite(preferredX) || Number.isFinite(preferredY);
	const targetX = Number.isFinite(preferredX) ? preferredX : (x1 + x2) / 2;
	const targetY = Number.isFinite(preferredY) ? preferredY : (y1 + y2) / 2;
	const projection = hasPreference
		? Math.max(0, Math.min(1, ((targetX - x1) * dx + (targetY - y1) * dy) / lengthSquared))
		: 0.5;
	const anchorX = x1 + projection * dx;
	const anchorY = y1 + projection * dy;
	const preferredOffset = hasPreference
		? (targetX - anchorX) * nx + (targetY - anchorY) * ny
		: -LABEL_SIDE_OFFSET;
	const side = Math.abs(preferredOffset) < 4 ? -1 : Math.sign(preferredOffset);
	const requestedOffset = Math.abs(preferredOffset) < 4
		? LABEL_SIDE_OFFSET
		: Math.min(MAX_LABEL_SIDE_OFFSET, Math.abs(preferredOffset));

	return topologyCableLabelPosition({
		x: anchorX,
		y: anchorY,
		nx,
		ny,
		width,
		height,
		centerOffsetY,
		gap,
		side,
		requestedOffset,
	});
}
