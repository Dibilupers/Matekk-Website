function intersects(a, b, gap) {
	return Math.abs(a.x - b.x) < (a.width + b.width) / 2 + gap
		&& Math.abs(a.y - b.y) < (a.height + b.height) / 2 + gap;
}

export function placeTopologyLabels(labels, obstacles, gap = 8) {
	const placed = [];

	return labels.map((label) => {
		const step = Math.max(label.height + gap, 16);
		const offsets = [[0, 0]];
		for (let ring = 1; ring <= 10; ring += 1) {
			const distance = ring * step;
			offsets.push(
				[0, -distance],
				[0, distance],
				[-distance, 0],
				[distance, 0],
				[-distance, -distance],
				[distance, -distance],
				[-distance, distance],
				[distance, distance],
			);
		}

		const position = offsets
			.map(([dx, dy]) => ({ x: label.x + dx, y: label.y + dy }))
			.find((candidate) => {
				const box = { ...label, ...candidate, y: candidate.y + (label.centerOffsetY ?? 0) };
				return !obstacles.some((obstacle) => intersects(box, obstacle, gap))
					&& !placed.some((other) => intersects(box, other.box, gap));
			}) ?? { x: label.x, y: label.y };
		const box = { ...label, ...position, y: position.y + (label.centerOffsetY ?? 0) };
		placed.push({ ...position, box });
		return { ...label, ...position };
	});
}
