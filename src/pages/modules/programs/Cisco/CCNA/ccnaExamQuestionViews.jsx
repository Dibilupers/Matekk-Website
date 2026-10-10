import { questionType, requiredSelections } from "../../../../../utils/ccnaExamGrading";
import { getDisplayedOption, parseFormattedOptions } from "./ccnaExamQuestionFormatting";
import { MatchingQuestionInput, MatchingQuestionReview } from "./ccnaExamMatching";

const letter = (i) => String.fromCharCode(65 + i);

function AnswerOptionContent({ option, codeStyle = false }) {
	const text = String(option ?? "");
	if (!codeStyle && !text.includes("\n")) {
		return <span className="min-w-0 flex-1 whitespace-pre-wrap text-sm sm:text-base">{text}</span>;
	}

	return (
		<pre className="min-w-0 flex-1 overflow-x-auto rounded-lg bg-[#101b31] px-3 py-2 font-mono text-xs leading-5 text-[#e7efff] whitespace-pre-wrap break-words [overflow-wrap:anywhere] sm:text-sm">
			<code>{text}</code>
		</pre>
	);
}

function hasMultilineOption(question) {
	return question.options.some((option) =>
		String(getDisplayedOption(question, option) ?? "").includes("\n"),
	);
}

export function QuestionPrompt({ prompt }) {
	const formattedOptions = parseFormattedOptions(prompt);
	const normalizedPrompt = (formattedOptions?.prompt ?? String(prompt ?? "")).replace(/\r\n/g, "\n").trim();

	const configuredMatch = normalizedPrompt.match(/\bConfigured (?:router IPv6 )?interfaces:\s*/i);
	const promptBeforeConfigured = configuredMatch ? normalizedPrompt.slice(0, configuredMatch.index).trim() : normalizedPrompt;
	const doubleNewlineMatch = normalizedPrompt.match(/\n\s*\n([\s\S]+)/);

	let promptText = promptBeforeConfigured;
	let exhibit = null;
	let exhibitTitle = "Exhibit";

	if (configuredMatch) {
		exhibit = normalizedPrompt.slice(configuredMatch.index + configuredMatch[0].length).trim();
		exhibitTitle = configuredMatch[0].replace(/:\s*$/, "");
	} else if (doubleNewlineMatch) {
		const candidate = doubleNewlineMatch[1].trim();
		const lines = candidate.split("\n").map((line) => line.trim()).filter(Boolean);
		const isExhibit = lines.length >= 2 && lines.some((line) => /^%/.test(line) || /^(?:[A-Za-z0-9.-]+(?:\s+\(config\))?#|[A-Za-z0-9_.-]+\s*:\s*.+|[A-Za-z0-9_.-]+\s+\w+\s*:\s*.+)/.test(line));

		if (isExhibit) {
			promptText = normalizedPrompt.slice(0, doubleNewlineMatch.index).trim();
			exhibit = candidate;
			exhibitTitle = "System output";
		}
	}

	return (
		<div className="mb-5 space-y-4 sm:mb-6">
			<h2 className="whitespace-pre-wrap text-base font-semibold leading-relaxed tracking-tight text-[#17233d] sm:text-lg">
				{promptText}
			</h2>
			{exhibit && (
				<section aria-label={exhibitTitle} className="overflow-hidden rounded-xl border border-[#d9e1ef] bg-[#f7f9fc]">
					<p className="border-b border-[#d9e1ef] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#526584]">
						{exhibitTitle}
					</p>
					<pre className="overflow-x-hidden whitespace-pre-wrap break-words px-4 py-3 font-mono text-xs leading-6 text-[#263654] [overflow-wrap:anywhere] sm:text-sm">
						{exhibit}
					</pre>
				</section>
			)}
		</div>
	);
}

/* Answer input for one exam question (pick one, choose two, or matching). */
export function QuestionInput({ question, value, onChange, disabled }) {
	const type = questionType(question);

	if (type === "match") {
		return <MatchingQuestionInput question={question} value={value} onChange={onChange} disabled={disabled} />;
	}

	const isMulti = type === "multi";
	const codeStyle = hasMultilineOption(question);
	const needed = requiredSelections(question);
	const selected = isMulti ? (Array.isArray(value) ? value : []) : value;

	function choose(optionIndex) {
		if (!isMulti) return onChange(optionIndex);
		const has = selected.includes(optionIndex);
		if (has) return onChange(selected.filter((i) => i !== optionIndex));
		if (selected.length >= needed) return onChange([...selected.slice(1), optionIndex]);
		return onChange([...selected, optionIndex]);
	}

	return (
		<div className="space-y-2.5">
			{isMulti && <p className="text-sm text-[#70809a]">Select {needed} answers ({selected.length}/{needed} selected).</p>}
			{question.options.map((option, optionIndex) => {
				const displayedOption = getDisplayedOption(question, option);
				const isSelected = isMulti ? selected.includes(optionIndex) : selected === optionIndex;
				const isMultiline = codeStyle || String(displayedOption ?? "").includes("\n");
				return (
					<button
						key={option}
						type="button"
						onClick={() => choose(optionIndex)}
						disabled={disabled}
						aria-pressed={isSelected}
						className={`ccna-answer-choice ccna-dark-hover flex min-h-[52px] w-full ${isMultiline ? "items-start" : "items-center"} gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition disabled:cursor-default sm:min-h-[60px] sm:gap-3 sm:px-4 sm:py-3 ${isSelected ? "border-[#005b6b] bg-[#e8f3f4] text-[#263654]" : "border-[#d9e1ef] bg-white text-[#263654] hover:border-[#8bb8bf] hover:bg-[#f0f7f7]"}`}
					>
						<span className={`flex h-8 w-8 shrink-0 items-center justify-center ${isMulti ? "rounded-md" : "rounded-full"} text-sm font-bold ${isSelected ? "bg-[#005b6b] text-white" : "bg-[#e8f3f4] text-[#005b6b]"}`}>
							{letter(optionIndex)}
						</span>
						<AnswerOptionContent option={displayedOption} codeStyle={codeStyle} />
					</button>
				);
			})}
		</div>
	);
}

/* Results review for one question: shows the student's answer and the correct one. */
export function QuestionReview({ question, value }) {
	const type = questionType(question);

	if (type === "match") {
		return <MatchingQuestionReview question={question} value={value} />;
	}

	const correctSet = new Set(type === "multi" ? question.answer : [question.answer]);
	const codeStyle = hasMultilineOption(question);
	const pickedSet = new Set(type === "multi" ? (Array.isArray(value) ? value : []) : value === undefined ? [] : [value]);

	return (
		<div className="space-y-2.5">
			{question.options.map((option, optionIndex) => {
				const displayedOption = getDisplayedOption(question, option);
				const isCorrectAnswer = correctSet.has(optionIndex);
				const isSelectedAnswer = pickedSet.has(optionIndex);
				const optionStyle = isCorrectAnswer
					? "border-[#54a879] bg-[#eff9f2] text-[#236a43]"
					: isSelectedAnswer
						? "border-[#e77945] bg-[#fff5ef] text-[#a44b13]"
						: "border-[#e1e8ef] bg-white text-[#42516b]";
				const isMultiline = codeStyle || String(displayedOption ?? "").includes("\n");
				return (
					<div key={option} className={`flex min-h-[54px] ${isMultiline ? "items-start" : "items-center"} gap-3 rounded-xl border px-4 py-3 ${optionStyle}`}>
						<span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
							isCorrectAnswer ? "bg-[#2d8a56] text-white" : isSelectedAnswer ? "bg-[#c7541a] text-white" : "bg-[#edf3fb] text-[#4764a8]"
						}`}>
							{letter(optionIndex)}
						</span>
						<AnswerOptionContent option={displayedOption} codeStyle={codeStyle} />
						{isSelectedAnswer && !isCorrectAnswer && <span className="shrink-0 text-xs font-semibold text-[#a44b13]">Your answer</span>}
						{isCorrectAnswer && <span className="shrink-0 text-xs font-semibold text-[#287849]">Correct answer</span>}
					</div>
				);
			})}
		</div>
	);
}
