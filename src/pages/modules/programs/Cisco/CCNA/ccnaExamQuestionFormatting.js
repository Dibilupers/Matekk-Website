function parseOptionTable(prompt) {
	const text = String(prompt ?? "").replace(/\r\n/g, "\n");
	const lines = text.split("\n");
	const headings = [];
	let offset = 0;

	for (const line of lines) {
		const match = line.match(/^\s*Option ([A-H])\s*:?\s{2,}Option ([A-H])\s*:?\s*$/i);
		if (match) {
			headings.push({
				offset,
				first: match[1].toUpperCase(),
				second: match[2].toUpperCase(),
				secondColumn: line.toUpperCase().indexOf(`OPTION ${match[2].toUpperCase()}`),
			});
		}
		offset += line.length + 1;
	}

	if (headings.length > 0) {
		const options = {};
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
			const boundaries = contentLines.flatMap((line) =>
				[...line.matchAll(/\s{3,}(?=\S)/g)]
					.filter((match) => match.index >= 16 && match.index < 100)
					.map((match) => match.index + match[0].length),
			).sort((left, right) => left - right);
			if (boundaries.length === 0) continue;

			const boundary = boundaries[Math.floor(boundaries.length / 2)];
			for (const line of contentLines) {
				const left = line.slice(0, boundary).trim();
				const right = line.slice(boundary).trim();
				if (left) options[first.letter] = options[first.letter] ? `${options[first.letter]}\n${left}` : left;
				if (right) options[second.letter] = options[second.letter] ? `${options[second.letter]}\n${right}` : right;
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

// Some option tables came out of the PDFs scrambled (columns run together, a heading inside another
// option's text). Only use a split when every option was found and none swallowed another option's heading;
// otherwise the question shows the whole table as one exhibit instead.
export function parseFormattedOptions(prompt) {
	const parsed = parseOptionTable(prompt);
	if (!parsed) return null;
	const text = String(prompt ?? "");
	const letters = [...new Set([...text.matchAll(/\bOption ([A-H])\b/gi)].map((match) => match[1].toUpperCase()))];
	const contents = Object.values(parsed.options);
	// Signs the PDF's two columns got mixed together: the same line twice in a row, two commands
	// glued onto one line, or the wide gap that used to sit between the columns
	const looksScrambled =
		letters.some((letter) => !parsed.options[letter]?.trim()) ||
		contents.some((content) => /^\s*Option [A-H]\b/im.test(content)) ||
		contents.some((content) => /^(.+)\n\1$/m.test(content)) ||
		contents.some((content) => /\S[ \t]+[\w.-]+\([\w-]+\)#/.test(content)) ||
		contents.some((content) => /\S[ \t]{10,}\S/.test(content));
	return looksScrambled ? null : parsed;
}

/** The table of options as plain text, for showing it as one exhibit when it can't be split safely. */
export function getOptionTableExhibit(prompt) {
	const text = String(prompt ?? "").replace(/\r\n/g, "\n");
	const match = /^[ \t]*Option [A-H]\b.*$/im.exec(text);
	if (!match || parseFormattedOptions(text)) return null;
	return { prompt: text.slice(0, match.index).trim(), exhibit: text.slice(match.index).replace(/\s+$/, "") };
}

export function getDisplayedOption(question, option) {
	const match = String(option ?? "").match(/^Option ([A-H])$/i);
	if (!match) return option;
	return parseFormattedOptions(question.prompt)?.options[match[1].toUpperCase()] ?? option;
}
