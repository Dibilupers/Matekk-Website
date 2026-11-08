function intersects(a, b, gap) {
	return Math.abs(a.x - b.x) < (a.width + b.width) / 2 + gap
		&& Math.abs(a.y - b.y) < (a.height + b.height) / 2 + gap;
}

export function placeTopologyLabels(labels, obstacles, gap = 3) {
	const placed = [];

	return labels.map((label) => {
		const step = Math.max(6, Math.ceil((label.height + gap) / 4));
		const offsets = [[0, 0]];
		for (let ring = 1; ring <= 6; ring += 1) {
			const distance = ring * step;
			offsets.push(
				[0, -distance],
				[-distance, 0],
				[0, distance],
				[distance, 0],
				[-distance, -distance],
				[distance, -distance],
				[-distance, distance],
				[distance, distance],
			);
		}

		const candidates = offsets
			.map(([dx, dy]) => ({ x: label.x + dx, y: label.y + dy }))
			.map((candidate) => {
				const box = { ...label, ...candidate, y: candidate.y + (label.centerOffsetY ?? 0) };
				const collisions = obstacles.filter((obstacle) => intersects(box, obstacle, gap)).length
					+ placed.filter((other) => intersects(box, other.box, gap)).length;
				return {
					...candidate,
					box,
					collisions,
					distance: Math.hypot(candidate.x - label.x, candidate.y - label.y),
				};
			})
			.sort((a, b) => a.collisions - b.collisions || a.distance - b.distance);
		const { x, y } = candidates[0] ?? { x: label.x, y: label.y };
		const position = { x, y };
		const box = { ...label, ...position, y: position.y + (label.centerOffsetY ?? 0) };
		placed.push({ ...position, box });
		return { ...label, ...position };
	});
}
