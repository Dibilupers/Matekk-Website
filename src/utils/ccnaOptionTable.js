function parseOfflineColumnTable(text, lines) {
	const pairs = [];
	const standalone = [];
	for (const [lineIndex, line] of lines.entries()) {
		const inline = line.match(/^\s*Option ([A-H])\s*:?\s{2,}Option ([A-H])\s*:?\s*$/i);
		if (inline) {
			pairs.push({
				firstLine: lineIndex,
				startLine: lineIndex + 1,
				left: inline[1].toUpperCase(),
				right: inline[2].toUpperCase(),
				rightColumn: line.toUpperCase().indexOf(`OPTION ${inline[2].toUpperCase()}`),
			});
		}
		const heading = line.match(/^\s*Option ([A-H])\s*:?\s*$/i);
		if (heading) standalone.push({ lineIndex, letter: heading[1].toUpperCase(), column: line.indexOf("Option") });
	}

	for (let index = 0; index + 1 < standalone.length; index += 1) {
		const left = standalone[index];
		const right = standalone[index + 1];
		const linesBetween = lines.slice(left.lineIndex + 1, right.lineIndex);
		if (linesBetween.some((line) => line.trim()) || Math.abs(right.column - left.column) < 16) continue;
		const leftIsFirst = left.column < right.column;
		pairs.push({
			firstLine: left.lineIndex,
			startLine: right.lineIndex + 1,
			left: leftIsFirst ? left.letter : right.letter,
			right: leftIsFirst ? right.letter : left.letter,
			rightColumn: Math.max(left.column, right.column),
		});
		index += 1;
	}

	if (pairs.length === 0) return null;
	pairs.sort((left, right) => left.firstLine - right.firstLine);
	const options = {};
	for (const [index, pair] of pairs.entries()) {
		const endLine = pairs[index + 1]?.firstLine ?? lines.length;
		for (const line of lines.slice(pair.startLine, endLine)) {
			if (!line.trim()) continue;
			const left = line.slice(0, pair.rightColumn).trim();
			const right = line.slice(pair.rightColumn).trim();
			if (left) options[pair.left] = options[pair.left] ? `${options[pair.left]}\n${left}` : left;
			if (right) options[pair.right] = options[pair.right] ? `${options[pair.right]}\n${right}` : right;
		}
	}
	const letters = [...new Set([...text.matchAll(/\bOption ([A-H])\b/gi)].map((match) => match[1].toUpperCase()))];
	if (letters.length < 2 || letters.some((letter) => !options[letter]?.trim())) return null;
	return { prompt: lines.slice(0, pairs[0].firstLine).join("\n").trim(), options };
}

export function parseOptionTable(prompt, { offlineColumns = false } = {}) {
	const text = String(prompt ?? "").replace(/\r\n/g, "\n");
	const lines = text.split("\n");
	if (offlineColumns) {
		const offlineParsed = parseOfflineColumnTable(text, lines);
		if (offlineParsed) return offlineParsed;
	}
	const headings = [];
	let offset = 0;
	const columnHeadingLines = [];

	for (const [lineIndex, line] of lines.entries()) {
		const match = line.match(/^\s*Option ([A-H])\s*:?\s{2,}Option ([A-H])\s*:?\s*$/i);
		if (match) {
			const heading = {
				offset,
				lineIndex,
				first: match[1].toUpperCase(),
				second: match[2].toUpperCase(),
				secondColumn: line.toUpperCase().indexOf(`OPTION ${match[2].toUpperCase()}`),
			};
			headings.push(heading);
			columnHeadingLines.push(heading);
		}
		offset += line.length + 1;
	}

	if (headings.length > 0) {
		const options = {};
		if (offlineColumns) {
			for (const [headingIndex, heading] of columnHeadingLines.entries()) {
				const nextHeading = columnHeadingLines[headingIndex + 1];
				const startLine = heading.lineIndex + 1;
				const endLine = nextHeading?.lineIndex ?? lines.length;
				for (const line of lines.slice(startLine, endLine)) {
					if (!line.trim()) continue;
					const first = line.slice(0, heading.secondColumn).trim();
					const second = line.slice(heading.secondColumn).trim();
					if (first) options[heading.first] = options[heading.first] ? `${options[heading.first]}\n${first}` : first;
					if (second) options[heading.second] = options[heading.second] ? `${options[heading.second]}\n${second}` : second;
				}
			}
		} else {
			offset = 0;
			let headingIndex = 0;
			let activeHeading = null;

			for (const line of lines) {
				if (headingIndex < headings.length && offset === headings[headingIndex].offset) {
					activeHeading = headings[headingIndex];
					headingIndex += 1;
				} else if (activeHeading && line.trim()) {
					const first = line.slice(0, activeHeading.secondColumn).trim();
					const second = line.slice(activeHeading.secondColumn).trim();
					if (first) options[activeHeading.first] = options[activeHeading.first] ? `${options[activeHeading.first]}\n${first}` : first;
					if (second) options[activeHeading.second] = options[activeHeading.second] ? `${options[activeHeading.second]}\n${second}` : second;
				}
				offset += line.length + 1;
			}
		}

		if (Object.keys(options).length >= 2) return { prompt: text.slice(0, headings[0].offset).trim(), options };
	}

	const standaloneHeadings = [];
	offset = 0;
	for (const [index, line] of lines.entries()) {
		const match = line.match(/^\s*Option ([A-H])\s*$/i);
		if (match) standaloneHeadings.push({ index, offset, letter: match[1].toUpperCase() });
		offset += line.length + 1;
	}

	const headingPairs = [];
	for (const heading of standaloneHeadings) {
		const previousPair = headingPairs[headingPairs.length - 1];
		if (previousPair && previousPair[previousPair.length - 1].index + 1 === heading.index) {
			previousPair.push(heading);
		} else {
			headingPairs.push([heading]);
		}
	}

	if (headingPairs.some((pair) => pair.length === 2)) {
		const options = {};
		for (const pair of headingPairs) {
			if (pair.length !== 2) continue;
			const first = pair[0];
			const second = pair[1];
			const nextHeading = standaloneHeadings.find(({ index }) => index > second.index);
			const contentEnd = nextHeading?.index ?? lines.length;
			const contentLines = lines.slice(second.index + 1, contentEnd);
			let leftHeading = first;
			let rightHeading = second;
			let rightColumnStart;
			if (offlineColumns) {
				const firstColumnStart = lines[first.index].indexOf(`Option ${first.letter}`);
				const secondColumnStart = lines[second.index].indexOf(`Option ${second.letter}`);
				leftHeading = firstColumnStart <= secondColumnStart ? first : second;
				rightHeading = leftHeading === first ? second : first;
				rightColumnStart = Math.max(firstColumnStart, secondColumnStart);
			}
			if (!offlineColumns || rightColumnStart < 16) {
				const boundaries = contentLines.flatMap((line) =>
					[...line.matchAll(/\s{3,}(?=\S)/g)]
						.filter((match) => match.index >= 16 && match.index < 100)
						.map((match) => match.index + match[0].length),
				).sort((left, right) => left - right);
				if (!offlineColumns) {
					rightColumnStart = boundaries[Math.floor(boundaries.length / 2)] ?? -1;
				} else if (rightColumnStart < 16) {
					rightColumnStart = boundaries[Math.floor(boundaries.length / 2)] ?? -1;
				}
			}
			if (rightColumnStart < 16) continue;

			for (const line of contentLines) {
				const left = line.slice(0, rightColumnStart).trim();
				const right = line.slice(rightColumnStart).trim();
				if (left) options[leftHeading.letter] = options[leftHeading.letter] ? `${options[leftHeading.letter]}\n${left}` : left;
				if (right) options[rightHeading.letter] = options[rightHeading.letter] ? `${options[rightHeading.letter]}\n${right}` : right;
			}
		}

		const allHeadingsParsed = standaloneHeadings.every(({ letter: optionLetter }) => Object.hasOwn(options, optionLetter));
		if (allHeadingsParsed && Object.keys(options).length >= 2) {
			return { prompt: text.slice(0, standaloneHeadings[0].offset).trim(), options };
		}
	}

	if (standaloneHeadings.length < 2 || standaloneHeadings.some(({ index }) => lines[index + 1]?.trim())) return null;

	const options = {};
	for (const [index, heading] of standaloneHeadings.entries()) {
		const endLine = standaloneHeadings[index + 1]?.index ?? lines.length;
		const content = lines.slice(heading.index + 1, endLine).filter((line) => line.trim()).join("\n").trim();
		if (content) options[heading.letter] = content;
	}
	if (Object.keys(options).length < 2) return null;
	return { prompt: text.slice(0, standaloneHeadings[0].offset).trim(), options };
}
