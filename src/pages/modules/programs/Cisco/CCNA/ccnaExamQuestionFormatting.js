import { parseOptionTable } from "../../../../../utils/ccnaOptionTable";

// Some option tables came out of the PDFs scrambled (columns run together, a heading inside another
// option's text). Only use a split when every option was found and none swallowed another option's heading;
// otherwise the question shows the whole table as one exhibit instead.
export function parseFormattedOptions(prompt, { offline = false } = {}) {
	const parsed = parseOptionTable(prompt, { offlineColumns: offline });
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
export function getOptionTableExhibit(prompt, { offline = false } = {}) {
	const text = String(prompt ?? "").replace(/\r\n/g, "\n");
	const match = /^[ \t]*Option [A-H]\b.*$/im.exec(text);
	if (!match || parseFormattedOptions(text, { offline })) return null;
	return { prompt: text.slice(0, match.index).trim(), exhibit: text.slice(match.index).replace(/\s+$/, "") };
}

export function getDisplayedOption(question, option) {
	const match = String(option ?? "").match(/^Option ([A-H])$/i);
	if (!match) return option;
	return parseFormattedOptions(question.prompt, { offline: question.offlineLegacy === true })?.options[match[1].toUpperCase()] ?? option;
}
