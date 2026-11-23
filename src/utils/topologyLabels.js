function intersects(a, b, gap) {
	return Math.abs(a.x - b.x) < (a.width + b.width) / 2 + gap
		&& Math.abs(a.y - b.y) < (a.height + b.height) / 2 + gap;
}

export function wrapTopologyNodeLabel(label, maxLineLength = 16) {
	if (!Number.isInteger(maxLineLength) || maxLineLength < 1) {
		throw new RangeError("Topology node label line length must be a positive integer.");
	}

	const lines = [];
	let currentLine = "";
	for (const word of String(label).trim().split(/\s+/).filter(Boolean)) {
		const characters = Array.from(word);
		const segments = [];
		for (let index = 0; index < characters.length; index += maxLineLength) {
			segments.push(characters.slice(index, index + maxLineLength).join(""));
		}

		segments.forEach((segment, index) => {
			if (currentLine && currentLine.length + 1 + segment.length <= maxLineLength) {
				currentLine += ` ${segment}`;
			} else {
				if (currentLine) lines.push(currentLine);
				currentLine = segment;
			}
			if (index < segments.length - 1) {
				lines.push(currentLine);
				currentLine = "";
			}
		});
	}
	if (currentLine) lines.push(currentLine);
	return lines;
}

export function placeTopologyLabels(labels, obstacles, gap = 3) {
	const placed = [];

	return labels.map((label) => {
		const step = Math.max(6, Math.ceil((label.height + gap) / 4));
		const hasCollision = (x, y) => {
			const box = { ...label, x, y: y + (label.centerOffsetY ?? 0) };
			return obstacles.some((obstacle) => intersects(box, obstacle, gap))
				|| placed.some((other) => intersects(box, other.box, gap));
		};
		const candidates = label.candidates ?? [{ x: label.x, y: label.y }];
		let position = candidates.find(({ x, y }) => !hasCollision(x, y));

		for (let ring = 1; !position && ring <= 200; ring += 1) {
			const distance = ring * step;
			const offsets = [
				[0, -distance],
				[-distance, 0],
				[0, distance],
				[distance, 0],
				[-distance, -distance],
				[distance, -distance],
				[-distance, distance],
				[distance, distance],
			];
			const clearOffset = offsets.find(([dx, dy]) => !hasCollision(label.x + dx, label.y + dy));
			if (clearOffset) {
				position = { x: label.x + clearOffset[0], y: label.y + clearOffset[1] };
			}
		}

		if (!position) {
			throw new Error(`Unable to place topology label "${label.text}" without overlap.`);
		}

		const { x, y } = position;
		const box = { ...label, x, y: y + (label.centerOffsetY ?? 0) };
		placed.push({ x, y, box });
		const { candidates: _candidates, ...placedLabel } = label;
		return { ...placedLabel, x, y };
	});
}
