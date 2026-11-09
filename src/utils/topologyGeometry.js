const NODE_SHAPES = {
	router: { type: "rect", left: -32, right: 32, top: -16, bottom: 22 },
	switch: { type: "rect", left: -34, right: 34, top: -20, bottom: 12 },
	host: { type: "rect", left: -26, right: 26, top: -22, bottom: 23 },
	pc: { type: "rect", left: -26, right: 26, top: -22, bottom: 23 },
	server: { type: "rect", left: -16, right: 16, top: -26, bottom: 18 },
	network: { type: "ellipse", rx: 72, ry: 27 },
	cloud: { type: "rect", left: -34, right: 34, top: -20, bottom: 20 },
};

const LABEL_SIDE_OFFSET = 14;
const MAX_LABEL_SIDE_OFFSET = 20;

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

export function topologyLinkLabelPosition(x1, y1, x2, y2, preferredX, preferredY) {
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
	const sideOffset = Math.abs(preferredOffset) < 4
		? -LABEL_SIDE_OFFSET
		: Math.max(-MAX_LABEL_SIDE_OFFSET, Math.min(MAX_LABEL_SIDE_OFFSET, preferredOffset));

	return {
		x: anchorX + nx * sideOffset,
		y: anchorY + ny * sideOffset,
	};
}
