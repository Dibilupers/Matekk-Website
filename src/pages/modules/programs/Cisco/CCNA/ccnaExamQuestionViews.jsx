import { useRef, useState } from "react";
import { groupCode, groupSizes, matchMode, parseGroupCode, questionType, requiredSelections } from "../../../../../utils/ccnaExamGrading";
import { ExhibitImage } from "./ccnaExhibit";

const letter = (i) => String.fromCharCode(65 + i);

// Answer choices that are router/switch commands (e.g. "R1(config)#ip route ...") are shown like a terminal:
// monospace, one command per line (some imported questions had all commands squashed onto one line).
const CLI_PROMPT = /(^|\s)[\w.-]+(\([\w-]+\))?[>#]/;
const isCliText = (text) => typeof text === "string" && CLI_PROMPT.test(text);
const splitCliLines = (text) => text.replace(/[ \t]+(?=[\w.-]+(\([\w-]+\))?[>#])/g, "\n");

function OptionText({ text, className = "" }) {
	if (!isCliText(text)) return <span className={`whitespace-pre-wrap ${className}`}>{text}</span>;
	return (
		<code className={`block min-w-0 w-full max-w-full flex-1 overflow-x-hidden break-words whitespace-pre-wrap rounded-lg bg-[#f1f5f9] px-2 py-1.5 font-mono text-xs leading-5 text-[#0f1b2d] [overflow-wrap:anywhere] sm:px-3 sm:py-2 sm:text-sm sm:leading-6 ${className}`}>
			{splitCliLines(text)}
		</code>
	);
}

/* Matching choices can be dragged between rows or clicked to assign; clicking a placed choice clears it. */
// Same mixed-up order for everyone (based on the text), so the boxes never line up with the answers
function stableShuffle(indexes, seed) {
	const hash = (text) => [...text].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);
	return [...indexes].sort((a, b) => hash(seed + a) - hash(seed + b));
}

function animateChoiceCopies(root, target, choiceIndex) {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	const targetRect = target.getBoundingClientRect();
	const copies = [...root.querySelectorAll(`[data-match-choice="${choiceIndex}"]`)]
		.filter((choice) => choice !== target)
		.map((choice) => {
			const rect = choice.getBoundingClientRect();
			if (rect.bottom <= 0 || rect.top >= window.innerHeight || rect.right <= 0 || rect.left >= window.innerWidth) return null;

			const clone = choice.cloneNode(true);
			const computed = window.getComputedStyle(choice);
			for (const property of [
				"background-color", "border", "border-radius", "box-shadow", "box-sizing", "color",
				"display", "font-family", "font-size", "font-weight", "line-height", "padding", "text-align",
			]) {
				clone.style.setProperty(property, computed.getPropertyValue(property));
			}
			Object.assign(clone.style, {
				position: "fixed",
				left: `${rect.left}px`,
				top: `${rect.top}px`,
				width: `${rect.width}px`,
				height: `${rect.height}px`,
				margin: "0",
				pointerEvents: "none",
				zIndex: "1200",
			});
			clone.setAttribute("aria-hidden", "true");
			clone.tabIndex = -1;
			document.body.append(clone);
			return { clone, rect };
		})
		.filter(Boolean);

	copies.forEach(({ clone, rect }, index) => {
		const x = targetRect.left + targetRect.width / 2 - (rect.left + rect.width / 2);
		const y = targetRect.top + targetRect.height / 2 - (rect.top + rect.height / 2);
		const animation = clone.animate(
			[
				{ transform: "translate(0, 0) scale(1)", opacity: 1 },
				{
					transform: `translate(${x}px, ${y}px) scale(${targetRect.width / rect.width}, ${targetRect.height / rect.height})`,
					opacity: 0,
				},
			],
			{ duration: 720, delay: Math.min(index * 30, 150), easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
		);
		animation.onfinish = () => clone.remove();
		animation.oncancel = () => clone.remove();
	});
}

function AssignMatchInput({ question, value, onChange, disabled }) {
	const [dragOverItem, setDragOverItem] = useState(null);
	const choiceOrder = stableShuffle(question.choices.map((_, i) => i), question.prompt);
	const current = Array.isArray(value) ? value : question.items.map(() => null);
	const rootRef = useRef(null);
	const used = new Set(current.filter((v) => Number.isInteger(v)));
	const place = (itemIndex, choiceIndex, target, move = false) => {
		if (target && current[itemIndex] !== choiceIndex) {
			animateChoiceCopies(rootRef.current, target, choiceIndex);
		}
		const next = [...current];
		if (move) {
			const previousItem = next.indexOf(choiceIndex);
			if (previousItem === itemIndex) return;
			if (previousItem !== -1) {
				const displacedChoice = next[itemIndex];
				next[previousItem] = Number.isInteger(displacedChoice) ? displacedChoice : null;
			}
			next[itemIndex] = choiceIndex;
		} else {
			next[itemIndex] = next[itemIndex] === choiceIndex ? null : choiceIndex;
		}
		onChange(next);
	};
	return (
		<div ref={rootRef} className="space-y-3">
			<p className="text-sm text-[#70809a]">Drag a choice to a matching row, or click a choice to place it. Click a placed choice to undo it.</p>
			<div className="ccna-match-board overflow-hidden rounded-2xl border border-[#d9e1ef] bg-white">
				{question.items.map((item, itemIndex) => {
					const picked = current[itemIndex];
					const available = Number.isInteger(picked)
						? [picked]
						: choiceOrder.filter((i) => !used.has(i));
					return (
						<div
							key={itemIndex}
							onDragOver={(event) => {
								if (disabled) return;
								event.preventDefault();
								event.dataTransfer.dropEffect = "move";
								setDragOverItem(itemIndex);
							}}
							onDragLeave={(event) => {
								if (!event.currentTarget.contains(event.relatedTarget)) setDragOverItem(null);
							}}
							onDrop={(event) => {
								event.preventDefault();
								setDragOverItem(null);
								if (disabled) return;
								const draggedChoice = event.dataTransfer.getData("text/plain");
								if (!draggedChoice) return;
								const choiceIndex = Number(draggedChoice);
								if (Number.isInteger(choiceIndex) && choiceIndex >= 0 && choiceIndex < question.choices.length) {
									place(itemIndex, choiceIndex, event.currentTarget, true);
								}
							}}
							className={`ccna-match-row grid gap-3 border-b border-[#e6ecf3] px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:items-center ${dragOverItem === itemIndex ? "bg-[#f0f7f7] ring-2 ring-inset ring-[#005b6b]" : Number.isInteger(picked) ? "ccna-match-row-feedback" : ""}`}
						>
							<span className="ccna-match-prompt text-[15px] font-semibold whitespace-pre-wrap text-[#263654] sm:text-base">{item}</span>
							<div className="flex flex-wrap gap-2">
								{available.map((choiceIndex) => {
									const isPlaced = picked === choiceIndex;
									return (
										<button
											key={choiceIndex}
											type="button"
											data-match-choice={choiceIndex}
											disabled={disabled}
											onClick={(event) => place(itemIndex, choiceIndex, event.currentTarget)}
											draggable={!disabled}
											onDragStart={(event) => {
												event.dataTransfer.setData("text/plain", String(choiceIndex));
												event.dataTransfer.effectAllowed = "move";
											}}
											onDragEnd={() => setDragOverItem(null)}
											aria-pressed={isPlaced}
											aria-label={isPlaced ? `${question.choices[choiceIndex]} (placed, click to undo)` : `Place ${question.choices[choiceIndex]} here`}
											className={`ccna-match-choice cursor-grab rounded-lg px-3 py-2 text-left text-sm font-semibold transition-all duration-300 ease-out active:cursor-grabbing disabled:cursor-default motion-reduce:transition-none ${isPlaced
												? "border-2 border-[#2d8a56] bg-[#eff9f2] font-semibold text-[#1f5e3b]"
												: "border border-dashed border-[#9aa8bc] bg-white text-[#42516b] hover:-translate-y-0.5 hover:border-[#005b6b] hover:bg-[#f0f7f7] active:translate-y-0 active:scale-[0.98]"} ${isPlaced ? "ccna-match-choice-placed" : ""}`}
										>
											{question.choices[choiceIndex]}
										</button>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

/* "Type the numbers" matching: items are numbered, each group shows its slots, and the answer is the
   item numbers group by group (e.g. "1324" = 1 and 3 in the first group, 2 and 4 in the second). */
function GroupMatchInput({ question, value, onChange, disabled }) {
	const [code, setCode] = useState(() => groupCode(question, value));
	const [inputError, setInputError] = useState("");
	const [invalidInputAttempt, setInvalidInputAttempt] = useState(0);
	const { error: parsedError } = parseGroupCode(question, code);
	const error = inputError || parsedError;
	const sizes = groupSizes(question);
	// Worked example using this question's box sizes, e.g. "1234 means 1 and 2 go in copper, 3 and 4 in single-mode fiber"
	const exampleGroups = sizes.map((size, g) => Array.from({ length: size }, (_, k) => k + 1 + sizes.slice(0, g).reduce((a, b) => a + b, 0)));
	const example = exampleGroups.map((group) => group.join("")).join("");
	const exampleMeaning = exampleGroups
		.map((group, g) => (group.length ? `${group.join(" and ")} go in "${question.choices[g]}"` : null))
		.filter(Boolean)
		.join(", ");
	return (
		<div className="ccna-group-match space-y-4">
			<div className="grid gap-4 sm:grid-cols-2">
				<ol className="space-y-2">
					{question.items.map((item, itemIndex) => (
						<li key={itemIndex} className="ccna-group-match-item flex items-start gap-3 rounded-xl border border-[#cfe0f5] bg-[#eef5fe] px-3 py-2.5">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d4ed8] text-sm font-bold text-white">{itemIndex + 1}</span>
							<span className="ccna-group-match-item-text text-sm font-semibold whitespace-pre-wrap text-[#263654] sm:text-[15px]">{item}</span>
						</li>
					))}
				</ol>
				<div className="space-y-3">
					{question.choices.map((choice, choiceIndex) => (
						<div key={choiceIndex} className="ccna-group-match-box overflow-hidden rounded-xl border border-[#e6d9a8]">
							<div className="ccna-group-match-box-title bg-[#fdf8dc] px-3 py-2 text-center text-sm font-semibold text-[#5b4d12]">{choice}</div>
							{Array.from({ length: sizes[choiceIndex] }).map((_, k) => (
								<div key={k} className="ccna-group-match-slot h-7 border-t border-[#f1d4d4] bg-[#fbe7e7]" aria-hidden="true" />
							))}
						</div>
					))}
				</div>
			</div>
			<label className="block">
				<span className="ccna-group-match-instructions block text-sm text-[#526584]">
					Type the item numbers for each box in order from top to bottom, with each box's numbers in ascending order.
					For example, <strong className="font-mono text-[#263654]">{example}</strong> would mean {exampleMeaning}.
				</span>
				<input
					type="text"
					inputMode="numeric"
					autoComplete="off"
					value={code}
					disabled={disabled}
					onChange={(event) => {
						let next = "";
						let nextError = "";
						for (const digit of event.target.value) {
							if (!/^\d$/.test(digit)) {
								nextError ||= "Use numbers only.";
								continue;
							}
							const number = Number(digit);
							if (number < 1 || number > question.items.length) {
								nextError ||= `Use item numbers 1 to ${question.items.length}.`;
								continue;
							}
							if (next.includes(digit)) {
								nextError ||= "Each number can only be used once.";
								continue;
							}
							if (next.length >= question.items.length) {
								nextError ||= "Too many numbers.";
								continue;
							}
							next += digit;
						}
						setInputError(nextError);
						if (nextError) setInvalidInputAttempt((attempt) => attempt + 1);
						setCode(next);
						const parsed = parseGroupCode(question, next);
						onChange(parsed.value ?? question.items.map(() => null));
					}}
					placeholder={"e.g. " + example}
					aria-label="Your answer (item numbers)"
					className="ccna-group-match-code mt-2 w-48 rounded-xl border border-[#c9dfe2] bg-white px-3 py-2 font-mono text-lg tracking-[0.3em] text-[#005b6b] outline-none focus:border-[#005b6b] focus:ring-2 focus:ring-[#cfe7ea] disabled:cursor-default disabled:bg-[#f5f9f9]"
				/>
				{error && (
					<span
						key={invalidInputAttempt}
						role="alert"
						className={`mt-1 block text-sm font-semibold text-[#b42318] ${inputError ? "ccna-validation-shake" : ""}`}
					>
						{error}
					</span>
				)}
			</label>
		</div>
	);
}

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
	return question.options.some((option) => String(option ?? "").includes("\n"));
}

export function QuestionPrompt({ prompt, imageUrl }) {
	const normalizedPrompt = String(prompt ?? "").replace(/\r\n/g, "\n").trim();

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
			{imageUrl && (
				<ExhibitImage
					src={imageUrl}
					lazy
					imageClassName="max-h-56 object-contain sm:max-h-64"
					className="max-w-full"
				/>
			)}
		</div>
	);
}

/* Answer input for one exam question (pick one, choose two, or matching). */
export function QuestionInput({ question, value, onChange, disabled }) {
	const type = questionType(question);
	const localMatchMode = Array.isArray(question.answer) ? matchMode(question) : "select";

	if (type === "match" && localMatchMode === "assign") {
		return <AssignMatchInput question={question} value={value} onChange={onChange} disabled={disabled} />;
	}
	if (type === "match" && localMatchMode === "group") {
		return <GroupMatchInput question={question} value={value} onChange={onChange} disabled={disabled} />;
	}

	if (type === "match") {
		const current = Array.isArray(value) ? value : question.items.map(() => null);
		return (
			<div className="space-y-3">
				<p className="text-sm text-[#70809a]">Match each item on the left with the correct answer.</p>
				{question.items.map((item, itemIndex) => (
					<div key={itemIndex} className="ccna-answer-choice grid gap-2 rounded-2xl border border-[#d9e1ef] bg-white px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] sm:items-center">
						<span className="whitespace-pre-wrap text-[15px] font-semibold text-[#263654] sm:text-base">{item}</span>
						<select
							value={current[itemIndex] ?? ""}
							disabled={disabled}
							aria-label={`Answer for: ${item}`}
							onChange={(event) => {
								const next = [...current];
								next[itemIndex] = event.target.value === "" ? null : Number(event.target.value);
								onChange(next);
							}}
							className="w-full rounded-xl border border-[#c9dfe2] bg-[#f5f9f9] px-3 py-2 text-sm font-semibold text-[#005b6b] disabled:cursor-default"
						>
							<option value="">Select…</option>
							{question.choices.map((choice, choiceIndex) => (
								<option key={choiceIndex} value={choiceIndex}>{choice}</option>
							))}
						</select>
					</div>
				))}
			</div>
		);
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
				const displayedOption = option;
				const isSelected = isMulti ? selected.includes(optionIndex) : selected === optionIndex;
				return (
					<button
						key={option}
						type="button"
						onClick={() => choose(optionIndex)}
						disabled={disabled}
						aria-pressed={isSelected}
						className={`ccna-answer-choice ccna-dark-hover flex min-h-[52px] w-full items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition disabled:cursor-default sm:min-h-[60px] sm:gap-3 sm:px-4 sm:py-3 ${isSelected ? "border-[#005b6b] bg-[#e8f3f4] text-[#263654]" : "border-[#d9e1ef] bg-white text-[#263654] hover:border-[#8bb8bf] hover:bg-[#f0f7f7]"}`}
					>
						<span className={`flex h-8 w-8 shrink-0 items-center justify-center ${isMulti ? "rounded-md" : "rounded-full"} text-sm font-bold ${isSelected ? "bg-[#005b6b] text-white" : "bg-[#e8f3f4] text-[#005b6b]"}`}>
							{letter(optionIndex)}
						</span>
						{isCliText(String(displayedOption ?? "")) ? (
							<OptionText text={String(displayedOption)} className="text-sm font-semibold sm:text-base" />
						) : (
							<AnswerOptionContent option={displayedOption} codeStyle={codeStyle} />
						)}
					</button>
				);
			})}
		</div>
	);
}

/* Results review for one question: shows the student's answer and the correct one. */
export function QuestionReview({ question, value }) {
	const type = questionType(question);

	if (type === "match" && matchMode(question) === "group") {
		const current = Array.isArray(value) ? value : [];
		return (
			<div className="space-y-2.5">
				<p className="text-sm text-[#526584]">
					Your answer: <strong className="font-mono">{groupCode(question, current) || "—"}</strong>
					{" · "}Correct: <strong className="font-mono text-[#287849]">{groupCode(question, question.answer)}</strong>
				</p>
				{question.items.map((item, itemIndex) => {
					const correct = question.answer[itemIndex];
					const picked = current[itemIndex];
					const ok = picked === correct;
					return (
						<div key={item} className={`grid gap-1 rounded-xl border px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] sm:items-center ${ok ? "border-[#54a879] bg-[#eff9f2]" : "border-[#e77945] bg-[#fff5ef]"}`}>
							<span className="text-sm font-medium sm:text-base whitespace-pre-wrap text-[#263654]">{item}</span>
							<span className="text-sm">
								<span className={`font-bold ${ok ? "text-[#287849]" : "text-[#a44b13]"}`}>
									{Number.isInteger(picked) ? question.choices[picked] : "No answer"}
								</span>
								{!ok && <span className="block text-xs font-bold text-[#287849]">Correct: {question.choices[correct]}</span>}
							</span>
						</div>
					);
				})}
			</div>
		);
	}

	if (type === "match") {
		const current = Array.isArray(value) ? value : [];
		return (
			<div className="space-y-2.5">
				{question.items.map((item, itemIndex) => {
					const picked = current[itemIndex];
					const correct = question.answer[itemIndex];
					const isCorrect = picked === correct;
					return (
						<div key={itemIndex} className={`grid gap-1 rounded-xl border px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] sm:items-center ${isCorrect ? "border-[#54a879] bg-[#eff9f2]" : "border-[#e77945] bg-[#fff5ef]"}`}>
							<span className="whitespace-pre-wrap text-sm font-medium text-[#263654] sm:text-base">{item}</span>
							<span className="text-sm">
								<span className={`font-bold ${isCorrect ? "text-[#287849]" : "text-[#a44b13]"}`}>
									{Number.isInteger(picked) ? question.choices[picked] : "No answer"}
								</span>
								{!isCorrect && <span className="block text-xs font-bold text-[#287849]">Correct: {question.choices[correct]}</span>}
							</span>
						</div>
					);
				})}
			</div>
		);
	}

	const correctSet = new Set(type === "multi" ? question.answer : [question.answer]);
	const codeStyle = hasMultilineOption(question);
	const pickedSet = new Set(type === "multi" ? (Array.isArray(value) ? value : []) : value === undefined ? [] : [value]);

	return (
		<div className="space-y-2.5">
			{question.options.map((option, optionIndex) => {
				const displayedOption = option;
				const isCorrectAnswer = correctSet.has(optionIndex);
				const isSelectedAnswer = pickedSet.has(optionIndex);
				const optionStyle = isCorrectAnswer
					? "border-[#54a879] bg-[#eff9f2] text-[#236a43]"
					: isSelectedAnswer
						? "border-[#e77945] bg-[#fff5ef] text-[#a44b13]"
						: "border-[#e1e8ef] bg-white text-[#42516b]";
				return (
					<div key={option} className={`flex min-h-[54px] items-center gap-3 rounded-xl border px-4 py-3 ${optionStyle}`}>
						<span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
							isCorrectAnswer ? "bg-[#2d8a56] text-white" : isSelectedAnswer ? "bg-[#c7541a] text-white" : "bg-[#edf3fb] text-[#4764a8]"
						}`}>
							{letter(optionIndex)}
						</span>
						{isCliText(String(displayedOption ?? "")) ? (
							<OptionText text={String(displayedOption)} className="text-sm font-medium sm:text-base" />
						) : (
							<AnswerOptionContent option={displayedOption} codeStyle={codeStyle} />
						)}
						{isSelectedAnswer && !isCorrectAnswer && <span className="shrink-0 text-xs font-semibold text-[#a44b13]">Your answer</span>}
						{isCorrectAnswer && <span className="shrink-0 text-xs font-semibold text-[#287849]">Correct answer</span>}
					</div>
				);
			})}
		</div>
	);
}
