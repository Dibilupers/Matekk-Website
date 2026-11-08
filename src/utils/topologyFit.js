export function topologyFitScale(contentWidth, contentHeight, viewportWidth, viewportHeight, padding = 24) {
	if (![contentWidth, contentHeight, viewportWidth, viewportHeight].every(Number.isFinite)
		|| contentWidth <= 0 || contentHeight <= 0 || viewportWidth <= 0 || viewportHeight <= 0) {
		return 1;
	}

	const availableWidth = Math.max(1, viewportWidth - padding);
	const availableHeight = Math.max(1, viewportHeight - padding);
	return Math.min(1, availableWidth / contentWidth, availableHeight / contentHeight);
}
