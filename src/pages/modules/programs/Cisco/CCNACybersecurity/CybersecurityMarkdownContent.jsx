import { Fragment } from "react";
import LessonImageExpand from "../../LessonImageExpand";

function renderInline(text) {
	const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\*[^*]+\*|_[^_]+_)/g);
	return parts.map((part, index) => {
		if ((part.startsWith("**") && part.endsWith("**")) || (part.startsWith("__") && part.endsWith("__"))) {
			return <strong key={index}>{part.slice(2, -2)}</strong>;
		}
		if (part.startsWith("`") && part.endsWith("`")) {
			return <code key={index} className="rounded bg-[#f1f5f9] px-1 py-0.5 font-mono text-[0.9em] text-[#334155]">{part.slice(1, -1)}</code>;
		}
		if ((part.startsWith("*") && part.endsWith("*")) || (part.startsWith("_") && part.endsWith("_"))) {
			return <em key={index}>{part.slice(1, -1)}</em>;
		}
		return <Fragment key={index}>{part}</Fragment>;
	});
}

function parseTableRow(line) {
	return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function isTableDivider(line) {
	return /^\s*\|?[\s:|-]+\|?\s*$/.test(line) && line.includes("-");
}

function isBlockStart(lines, index) {
	const line = lines[index];
	return /^```/.test(line) ||
		/^!\[[^\]]*\]\([^)]+\)$/.test(line) ||
		/^#{1,6}\s/.test(line) ||
		/^>\s?/.test(line) ||
		/^\s*[-*+]\s+/.test(line) ||
		/^\s*\d+\.\s+/.test(line) ||
		/^\s*\|/.test(line) ||
		/^<details>/i.test(line) ||
		/^---+\s*$/.test(line);
}

function MarkdownBlocks({ markdown, omitModuleHeading = false }) {
	const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
	const blocks = [];
	let index = 0;
	let firstHeading = true;

	while (index < lines.length) {
		const line = lines[index];
		if (!line.trim() || /^---+\s*$/.test(line)) {
			index += 1;
			continue;
		}

		const fence = /^```(\w*)/.exec(line);
		if (fence) {
			index += 1;
			const codeLines = [];
			while (index < lines.length && !/^```\s*$/.test(lines[index])) {
				codeLines.push(lines[index]);
				index += 1;
			}
			index += 1;
			blocks.push(
				<pre key={`code-${index}`} className="overflow-x-auto rounded-xl bg-[#0f172a] p-4 text-sm leading-6 text-[#e2e8f0]">
					<code className={fence[1] ? `language-${fence[1]}` : undefined}>{codeLines.join("\n")}</code>
				</pre>,
			);
			continue;
		}

		if (/^<details>/i.test(line)) {
			const detailLines = [];
			index += 1;
			while (index < lines.length && !/^<\/details>/i.test(lines[index])) {
				detailLines.push(lines[index]);
				index += 1;
			}
			index += 1;
			const summaryLine = detailLines.find((item) => /<summary>.*<\/summary>/i.test(item));
			const summary = summaryLine?.replace(/<\/?summary>/gi, "").trim() || "More details";
			const detailBody = detailLines.filter((item) => item !== summaryLine).join("\n");
			blocks.push(
				<details key={`details-${index}`} className="rounded-xl border border-[#dbe5f5] bg-[#f8fafc] p-4">
					<summary className="cursor-pointer font-semibold text-[#17233d]">{renderInline(summary)}</summary>
					<div className="mt-3 space-y-3 text-sm leading-6 text-[#526584]">
						<MarkdownBlocks markdown={detailBody} />
					</div>
				</details>,
			);
			continue;
		}

		const image = /^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)$/.exec(line.trim());
		if (image) {
			index += 1;
			const [, alt, source, title] = image;
			const label = title || alt || "lesson image";
			blocks.push(
				<figure key={`image-${index}`} className="overflow-hidden rounded-xl border border-[#dbe5f5] bg-white">
					<LessonImageExpand label={label}>
						<img
							src={source}
							alt={alt || label}
							title={title}
							loading="lazy"
							decoding="async"
							className="mx-auto h-auto max-h-[72vh] w-full object-contain"
						/>
					</LessonImageExpand>
					{title && <figcaption className="border-t border-[#e5ebf4] bg-[#f8faff] px-4 py-2 text-center text-sm text-[#71819b]">{title}</figcaption>}
				</figure>,
			);
			continue;
		}

		const heading = /^(#{1,6})\s+(.+)$/.exec(line);
		if (heading) {
			index += 1;
			if (omitModuleHeading && firstHeading && heading[1].length === 1) {
				firstHeading = false;
				continue;
			}
			firstHeading = false;
			const text = renderInline(heading[2]);
			const className = "font-bold text-[#111a2d]";
			const props = { key: `heading-${index}`, className };
			const level = heading[1].length;
			blocks.push(level === 1
				? <h2 {...props} className={`${className} text-2xl`} >{text}</h2>
				: level === 2
					? <h3 {...props} className={`${className} text-xl`} >{text}</h3>
					: <h4 {...props} className={`${className} text-lg`} >{text}</h4>);
			continue;
		}

		if (/^\s*\|/.test(line) && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
			const headers = parseTableRow(line);
			index += 2;
			const rows = [];
			while (index < lines.length && /^\s*\|/.test(lines[index])) {
				rows.push(parseTableRow(lines[index]));
				index += 1;
			}
			blocks.push(
				<div key={`table-${index}`} className="overflow-x-auto">
					<table className="w-full border-collapse text-left text-sm">
						<thead className="bg-[#f1f5f9]">
							<tr>{headers.map((header, cellIndex) => <th key={cellIndex} className="border border-[#dbe5f5] px-3 py-2 font-semibold text-[#17233d]">{renderInline(header)}</th>)}</tr>
						</thead>
						<tbody>
							{rows.map((row, rowIndex) => (
								<tr key={rowIndex} className={rowIndex % 2 ? "bg-[#f8fafc]" : "bg-white"}>
									{headers.map((_, cellIndex) => <td key={cellIndex} className="border border-[#dbe5f5] px-3 py-2 align-top text-[#526584]">{renderInline(row[cellIndex] ?? "")}</td>)}
								</tr>
							))}
						</tbody>
					</table>
				</div>,
			);
			continue;
		}

		if (/^>\s?/.test(line)) {
			const quote = [];
			while (index < lines.length && /^>\s?/.test(lines[index])) {
				quote.push(lines[index].replace(/^>\s?/, ""));
				index += 1;
			}
			blocks.push(<blockquote key={`quote-${index}`} className="border-l-4 border-[#c8102e] bg-[#fff5f6] px-4 py-3 text-sm leading-6 text-[#526584]">{renderInline(quote.join(" "))}</blockquote>);
			continue;
		}

		const unordered = /^\s*[-*+]\s+/.test(line);
		const ordered = /^\s*\d+\.\s+/.test(line);
		if (unordered || ordered) {
			const items = [];
			const expression = unordered ? /^\s*[-*+]\s+/ : /^\s*\d+\.\s+/;
			while (index < lines.length && expression.test(lines[index])) {
				items.push(lines[index].replace(expression, ""));
				index += 1;
			}
			const List = ordered ? "ol" : "ul";
			blocks.push(
				<List key={`list-${index}`} className={`${ordered ? "list-decimal" : "list-disc"} space-y-1 pl-6 text-sm leading-6 text-[#526584]`}>
					{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}
				</List>,
			);
			continue;
		}

		const paragraph = [];
		while (index < lines.length && lines[index].trim() && !isBlockStart(lines, index)) {
			paragraph.push(lines[index].trim());
			index += 1;
		}
		if (paragraph.length) {
			blocks.push(<p key={`paragraph-${index}`} className="text-sm leading-6 text-[#526584]">{renderInline(paragraph.join(" "))}</p>);
		} else {
			index += 1;
		}
	}

	return <>{blocks}</>;
}

export default function CybersecurityMarkdownContent({ markdown }) {
	return (
		<section className="mt-7 space-y-4">
			<MarkdownBlocks markdown={markdown} omitModuleHeading />
		</section>
	);
}
