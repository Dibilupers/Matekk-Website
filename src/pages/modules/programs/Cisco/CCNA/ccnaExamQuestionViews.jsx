import { useEffect, useRef, useState } from "react";
import { groupCode, groupSizes, isValidQuestion, matchMode, parseGroupCode, questionType, requiredSelections } from "../../../../../utils/ccnaExamGrading";
import { getDisplayedOption, getOptionTableExhibit, parseFormattedOptions } from "./ccnaExamQuestionFormatting";
import { ExhibitImage, ExhibitText } from "./ccnaExhibit";
import { looksLikeCode, tidySentence } from "../../../../../utils/answerTextStyle";
import {
	removeDuplicateExhibitLeadIn,
	removeTrailingOptionExhibitLabel,
} from "../../../../../utils/splitPromptExhibit";
import { MatchingQuestionInput, MatchingQuestionReview } from "./ccnaExamMatching";
import { DragDropQuestionInput, DragDropQuestionReview } from "./ccnaExamDragDrop";
import { ClickBoxesQuestionInput, ClickBoxesQuestionReview } from "./ccnaExamClickBoxes";

const OPTION_LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function letter(index) {
	let label = "";
	for (let number = index + 1; number > 0; number = Math.floor((number - 1) / OPTION_LABELS.length)) {
		label = `${OPTION_LABELS[(number - 1) % OPTION_LABELS.length]}${label}`;
	}
	return label;
}
const MATCH_CHOICE_MOTION_MS = 900;
const MATCH_CHOICE_STAGGER_MS = 40;

function organizeFortiOSOfflinePrompt(text) {
	if (looksLikeCode(text) || /(?:^|\n)\s*(?:[-*•+]|\d+[.)])\s/m.test(text)) {
		return { paragraphs: [text], questionIndex: -1 };
	}
	const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z0-9])/);
	if (sentences.length < 2) return { paragraphs: [text], questionIndex: -1 };

	const finalQuestionIndex = sentences.length - 1;
	const finalSentence = sentences[finalQuestionIndex].trim();
	const hasFinalQuestion = /^(?:if|which|what|why|how|when|where|who)\b/i.test(finalSentence) && /\?\s*$/.test(finalSentence);
	if (!hasFinalQuestion && (sentences.length < 3 || text.length < 180)) {
		return { paragraphs: [text], questionIndex: -1 };
	}

	const contextEnd = hasFinalQuestion ? finalQuestionIndex : sentences.length;
	const paragraphs = [];
	for (let index = 0; index < contextEnd; index += 2) {
		paragraphs.push(sentences.slice(index, Math.min(index + 2, contextEnd)).join(" "));
	}
	const questionIndex = hasFinalQuestion ? paragraphs.length : -1;
	if (hasFinalQuestion) paragraphs.push(finalSentence);
	return { paragraphs, questionIndex };
}

function PromptText({ text, fortiosOffline = false }) {
	if (!fortiosOffline) {
		return <h2 className="whitespace-pre-wrap text-base font-semibold leading-relaxed tracking-tight text-[#17233d] sm:text-lg">{text}</h2>;
	}
	const { paragraphs, questionIndex } = organizeFortiOSOfflinePrompt(text);
	return (
		<div className="max-w-[72ch] space-y-3 text-[15px] leading-7 text-[#263654] sm:text-base sm:leading-7">
			{paragraphs.map((paragraph, index) => (
				<p key={`${index}-${paragraph.slice(0, 24)}`} className={index === questionIndex ? "font-semibold text-[#17233d]" : "font-medium"}>
					{paragraph}
				</p>
			))}
		</div>
	);
}

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

/* "Click to place" matching: each row shows the choices nobody has used yet; clicking one places it
   on that row (solid green box) and removes it from the other rows. Clicking a placed box undoes it. */
// Same mixed-up order for everyone (based on the text), so the boxes never line up with the answers
function stableShuffle(indexes, seed) {
	const hash = (text) => [...text].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);
	return [...indexes].sort((a, b) => hash(seed + a) - hash(seed + b));
}

function animateChoiceCopies(root, target, choiceIndex) {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();

	const targetRect = target.getBoundingClientRect();
	// The same box in the other rows, plus the boxes NOT chosen in this row: all of them slide into
	// the chosen box (left/right/up/down depending on where each one sits) and fade away.
	const sameChoiceElsewhere = [...root.querySelectorAll(`[data-match-choice="${choiceIndex}"]`)];
	const notChosenInRow = [...(target.parentElement?.querySelectorAll("[data-match-choice]") ?? [])];
	const copies = [...new Set([...sameChoiceElsewhere, ...notChosenInRow])]
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
			choice.classList.add("ccna-match-choice-fading");
			return { choice, clone, rect };
		})
		.filter(Boolean);

	const animations = copies.map(({ choice, clone, rect }, index) => {
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
			{
				duration: MATCH_CHOICE_MOTION_MS,
				delay: Math.min(index * MATCH_CHOICE_STAGGER_MS, 200),
				easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
			},
		);
		animation.finished.then(
			() => clone.remove(),
			() => {
				clone.remove();
				choice.classList.remove("ccna-match-choice-fading");
			},
		);
		return animation;
	});
	return Promise.all(animations.map((animation) => animation.finished.catch(() => undefined))).then(() => undefined);
}

function animateChoiceReturn(root, source, choiceIndex) {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	const sourceRect = source.getBoundingClientRect();
	const sourceClone = source.cloneNode(true);
	const computed = window.getComputedStyle(source);
	for (const property of [
		"background-color", "border", "border-radius", "box-shadow", "box-sizing", "color",
		"display", "font-family", "font-size", "font-weight", "line-height", "padding", "text-align",
	]) {
		sourceClone.style.setProperty(property, computed.getPropertyValue(property));
	}
	Object.assign(sourceClone.style, {
		position: "fixed",
		left: `${sourceRect.left}px`,
		top: `${sourceRect.top}px`,
		width: `${sourceRect.width}px`,
		height: `${sourceRect.height}px`,
		margin: "0",
		pointerEvents: "none",
		zIndex: "1200",
	});
	sourceClone.classList.remove("ccna-match-choice-placed");
	sourceClone.setAttribute("aria-hidden", "true");
	sourceClone.tabIndex = -1;
	document.body.append(sourceClone);

	requestAnimationFrame(() => {
		const destinations = [...root.querySelectorAll(`[data-match-choice="${choiceIndex}"]:not(.ccna-match-choice-placed)`)]
			.filter((choice) => choice !== source);
		if (destinations.length === 0) {
			sourceClone.remove();
			return;
		}

		destinations.forEach((destination) => {
			const destinationRect = destination.getBoundingClientRect();
			const clone = sourceClone.cloneNode(true);
			document.body.append(clone);
			const x = destinationRect.left + destinationRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
			const y = destinationRect.top + destinationRect.height / 2 - (sourceRect.top + sourceRect.height / 2);
			destination.classList.add("ccna-match-choice-returned");
			const animation = clone.animate(
				[
					{ transform: "translate(0, 0) scale(1)", opacity: 1 },
					{
						transform: `translate(${x}px, ${y}px) scale(${destinationRect.width / sourceRect.width}, ${destinationRect.height / sourceRect.height})`,
						opacity: 0,
					},
				],
				{ duration: 520, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
			);
			animation.onfinish = () => {
				clone.remove();
				destination.classList.remove("ccna-match-choice-returned");
			};
			animation.oncancel = () => {
				clone.remove();
				destination.classList.remove("ccna-match-choice-returned");
			};
		});
		sourceClone.remove();
	});
}

function AssignMatchInput({ question, value, onChange, disabled }) {
	const choiceOrder = stableShuffle(question.choices.map((_, i) => i), question.prompt);
	const current = Array.isArray(value) ? value : question.items.map(() => null);
	const rootRef = useRef(null);
	const mountedRef = useRef(true);
	const [isAnimating, setIsAnimating] = useState(false);
	const used = new Set(current.filter((v) => Number.isInteger(v)));
	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const place = (itemIndex, choiceIndex, target) => {
		if (current[itemIndex] === choiceIndex) {
			animateChoiceReturn(rootRef.current, target, choiceIndex);
			const next = [...current];
			next[itemIndex] = null;
			onChange(next);
		} else {
			setIsAnimating(true);
			const next = [...current];
			next[itemIndex] = choiceIndex;
			void animateChoiceCopies(rootRef.current, target, choiceIndex).then(() => {
				if (!mountedRef.current) return;
				onChange(next);
				setIsAnimating(false);
			});
		}
	};
	return (
		<div ref={rootRef} className="space-y-3">
			<p className="text-sm text-[#70809a]">Click a box on the right to place it next to the matching item. Click a placed box to undo it.</p>
			<div className="overflow-hidden rounded-2xl border border-[#d9e1ef] bg-white">
				{question.items.map((item, itemIndex) => {
					const picked = current[itemIndex];
					const available = Number.isInteger(picked)
						? [picked]
						: choiceOrder.filter((i) => !used.has(i));
					return (
						<div key={itemIndex} className={`grid gap-3 border-b border-[#e6ecf3] px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:items-center ${Number.isInteger(picked) ? "ccna-match-row-feedback" : ""}`}>
							<span className="text-[15px] font-semibold whitespace-pre-wrap text-[#263654] sm:text-base">{item}</span>
							<div className="flex flex-wrap gap-2">
								{available.map((choiceIndex) => {
									const isPlaced = picked === choiceIndex;
									return (
										<button
											key={choiceIndex}
											type="button"
											data-match-choice={choiceIndex}
											disabled={disabled || isAnimating}
											onClick={(event) => place(itemIndex, choiceIndex, event.currentTarget)}
											aria-pressed={isPlaced}
											aria-label={isPlaced ? `${question.choices[choiceIndex]} (placed, click to undo)` : `Place ${question.choices[choiceIndex]} here`}
											className={`rounded-lg px-3 py-2 text-left text-sm font-semibold transition-all duration-300 ease-out disabled:cursor-default motion-reduce:transition-none ${isPlaced
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
		<div className="space-y-4">
			<div className="grid gap-4 sm:grid-cols-2">
				<ol className="space-y-2">
					{question.items.map((item, itemIndex) => (
						<li key={itemIndex} className="flex items-start gap-3 rounded-xl border border-[#cfe0f5] bg-[#eef5fe] px-3 py-2.5">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d4ed8] text-sm font-bold text-white">{itemIndex + 1}</span>
							<span className="text-sm font-semibold whitespace-pre-wrap text-[#263654] sm:text-[15px]">{item}</span>
						</li>
					))}
				</ol>
				<div className="space-y-3">
					{question.choices.map((choice, choiceIndex) => (
						<div key={choiceIndex} className="overflow-hidden rounded-xl border border-[#e6d9a8]">
							<div className="bg-[#fdf8dc] px-3 py-2 text-center text-sm font-semibold text-[#5b4d12]">{choice}</div>
							{Array.from({ length: sizes[choiceIndex] }).map((_, k) => (
								<div key={k} className="h-7 border-t border-[#f1d4d4] bg-[#fbe7e7]" aria-hidden="true" />
							))}
						</div>
					))}
				</div>
			</div>
			<label className="block">
				<span className="block text-sm text-[#526584]">
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
					className="mt-2 w-48 rounded-xl border border-[#c9dfe2] bg-white px-3 py-2 font-mono text-lg tracking-[0.3em] text-[#005b6b] outline-none focus:border-[#005b6b] focus:ring-2 focus:ring-[#cfe7ea] disabled:cursor-default disabled:bg-[#f5f9f9]"
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
	// Ordinary sentences stay normal text (sentences cut over two lines in the PDFs are joined back up).
	// A single word like "service port" or "router" is a plain answer here, not a command.
	if (!codeStyle && !(text.includes("\n") && looksLikeCode(text))) {
		return <span className="min-w-0 flex-1 whitespace-pre-wrap text-sm sm:text-base">{tidySentence(text)}</span>;
	}
	const formattedText = text.replace(/(?<=\S)[ \t]{3,}(?=\S)/g, "\n");

	return (
		<pre className="min-w-0 flex-1 overflow-x-hidden rounded-lg border border-[#d9e1ef] bg-[#f1f5f9] px-2 py-1.5 font-mono text-xs leading-5 text-[#263654] whitespace-pre-wrap break-words [overflow-wrap:anywhere] sm:px-3 sm:py-2 sm:text-sm">
			<code>{formattedText}</code>
		</pre>
	);
}

// Use the terminal-style box for every answer when at least half the answers are device commands/output,
// so the choices line up. One answer that merely starts with a command word ("service port",
// "shutdown command issued on the port") doesn't count; nor does a line break alone.
function hasMultilineOption(question) {
	if (!Array.isArray(question?.options)) return false;
	const codeAnswers = question.options.filter((option) => looksLikeCode(getDisplayedOption(question, option))).length;
	return codeAnswers > 0 && codeAnswers >= question.options.length / 2;
}

// Guards against broken question data (e.g. an old saved attempt), so the page shows a message instead of crashing
function hasMatchContent(question, includeAnswer = false) {
	return Array.isArray(question?.items) &&
		question.items.length > 0 &&
		question.items.every((item) => typeof item === "string") &&
		Array.isArray(question.choices) &&
		question.choices.length > 0 &&
		question.choices.every((choice) => typeof choice === "string") &&
		(!includeAnswer || Array.isArray(question.answer));
}

function InvalidQuestionMessage() {
	return (
		<p role="alert" className="rounded-xl border border-[#f2c6c3] bg-[#fff8f6] px-4 py-3 text-sm font-medium text-[#a44b13]">
			This question has invalid answer data. Reload the page to try again.
		</p>
	);
}

// imageUrl: the question's picture, for pages that don't show it themselves (the exam page shows it separately)
export function QuestionPrompt({ prompt, imageUrl, hasSeparateExhibit = Boolean(imageUrl), offline = false, fortiosOffline = false }) {
	const rawPrompt = String(prompt ?? "");
	const readablePrompt = offline ? rawPrompt
		.replace(/\r\n/g, "\n")
		.split(/\n\s*\n/)
		.map((paragraph) => {
			const lines = paragraph.split("\n").map((line) => line.trim()).filter(Boolean);
			const containsOptionTable = lines.some((line) => /^Option [A-H]\b/i.test(line));
			if (!lines.length || looksLikeCode(paragraph) || containsOptionTable) return lines.join("\n");
			const isList = lines.every((line) => /^(?:[-*•+]\s|\d+[.)]\s|[A-Z][.)]\s)/.test(line));
			return isList ? lines.join("\n") : lines.join(" ");
		})
		.join("\n\n") : rawPrompt;
	const normalizedPrompt = removeDuplicateExhibitLeadIn(
		hasSeparateExhibit ? removeTrailingOptionExhibitLabel(readablePrompt) : readablePrompt,
	);
	const formattedOptions = parseFormattedOptions(normalizedPrompt, { offline });
	// A scrambled "Option A / Option B" table: show the question, then the whole table as it appears in the source
	const optionTable = formattedOptions ? null : getOptionTableExhibit(normalizedPrompt, { offline });
	if (optionTable) {
		return (
			<div className="mb-5 space-y-4 sm:mb-6">
				<PromptText text={optionTable.prompt} fortiosOffline={fortiosOffline} />
				{imageUrl && <ExhibitImage src={imageUrl} lazy imageClassName="max-h-[32rem]" />}
				<ExhibitText text={optionTable.exhibit} />
			</div>
		);
	}
	const displayPrompt = (formattedOptions?.prompt ?? normalizedPrompt).replace(/\r\n/g, "\n").trim();

	const configuredMatch = displayPrompt.match(/\bConfigured (?:router IPv6 )?interfaces:\s*/i);
	const promptBeforeConfigured = configuredMatch ? displayPrompt.slice(0, configuredMatch.index).trim() : displayPrompt;
	const doubleNewlineMatch = displayPrompt.match(/\n\s*\n([\s\S]+)/);

	let promptText = promptBeforeConfigured;
	let exhibit = null;
	let exhibitTitle = "Exhibit";

	if (configuredMatch) {
		exhibit = displayPrompt.slice(configuredMatch.index + configuredMatch[0].length).trim();
		exhibitTitle = configuredMatch[0].replace(/:\s*$/, "");
	} else if (doubleNewlineMatch) {
		const candidate = doubleNewlineMatch[1].trim();
		const lines = candidate.split("\n").map((line) => line.trim()).filter(Boolean);
		const isExhibit = lines.length >= 2 && lines.some((line) => /^%/.test(line) || /^(?:[A-Za-z0-9.-]+(?:\s+\(config\))?#|[A-Za-z0-9_.-]+\s*:\s*.+|[A-Za-z0-9_.-]+\s+\w+\s*:\s*.+)/.test(line));

		if (isExhibit) {
			promptText = displayPrompt.slice(0, doubleNewlineMatch.index).trim();
			exhibit = candidate;
			exhibitTitle = "System output";
		}
	}

	return (
		<div className="mb-5 space-y-4 sm:mb-6">
			<PromptText text={promptText} fortiosOffline={fortiosOffline} />
			{imageUrl && <ExhibitImage src={imageUrl} lazy imageClassName="max-h-[32rem]" />}
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
	const isMatching = ["match", "drag_drop", "click_boxes", "image"].includes(type);
	// Backend exams don't include the answer key; "type the numbers" questions come with their box sizes instead
	const hasGroupSizes = Array.isArray(question.groupSizes) && question.groupSizes.length === question.choices?.length &&
		question.groupSizes.reduce((sum, size) => sum + size, 0) === question.items?.length;
	const isOneToOne = Array.isArray(question.items) && Array.isArray(question.choices) &&
		question.items.length === question.choices.length &&
		(!Array.isArray(question.answer) || new Set(question.answer).size === question.answer.length);
	const localMatchMode = type === "image" || question.matchStyle === "numbers"
		? "group"
		: Array.isArray(question.answer) ? matchMode(question) : hasGroupSizes ? "group" : isOneToOne ? "assign" : "select";

	if (isMatching && !hasMatchContent(question)) return <InvalidQuestionMessage />;
	if (!isMatching && !Array.isArray(question?.options)) return <InvalidQuestionMessage />;
	if (type === "multi" && (!Array.isArray(question.answer) || question.answer.length === 0)) {
		return <InvalidQuestionMessage />;
	}

	if (type === "drag_drop") {
		return <DragDropQuestionInput question={question} value={value} onChange={onChange} disabled={disabled} />;
	}
	if (type === "click_boxes") {
		return <ClickBoxesQuestionInput question={question} value={value} onChange={onChange} disabled={disabled} />;
	}
	if (isMatching && localMatchMode === "assign") {
		return <MatchingQuestionInput question={question} value={value} onChange={onChange} disabled={disabled} />;
	}
	if (isMatching && localMatchMode === "group") {
		return <GroupMatchInput question={question} value={value} onChange={onChange} disabled={disabled} />;
	}

	if (isMatching) {
		const current = Array.isArray(value) ? value : question.items.map(() => null);
		return (
			<div className="space-y-3">
				{question.items.map((item, itemIndex) => (
					<label key={itemIndex} className="grid gap-2 rounded-xl border border-[#d9e1ef] bg-white p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
						<span className="text-sm font-semibold whitespace-pre-wrap text-[#263654]">{item}</span>
						<select
							value={Number.isInteger(current[itemIndex]) ? current[itemIndex] : ""}
							disabled={disabled}
							onChange={(event) => {
								const next = [...current];
								next[itemIndex] = event.target.value === "" ? null : Number(event.target.value);
								onChange(next);
							}}
							aria-label={`Match for ${item}`}
							className="min-h-11 rounded-lg border border-[#cbd5e1] bg-white px-3 py-2 text-sm text-[#263654] outline-none focus:border-[#005b6b] focus:ring-2 focus:ring-[#cfe7ea] disabled:cursor-default disabled:bg-[#f5f9f9]"
						>
							<option value="">Select an answer</option>
							{question.choices.map((choice, choiceIndex) => (
								<option key={choiceIndex} value={choiceIndex}>{choice}</option>
							))}
						</select>
					</label>
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
	const isMatching = ["match", "drag_drop", "click_boxes", "image"].includes(type);
	if (isMatching && !hasMatchContent(question, true)) return <InvalidQuestionMessage />;
	if (!isMatching && !isValidQuestion(question)) return <InvalidQuestionMessage />;

	if (isMatching && (type === "image" || matchMode(question) === "group")) {
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

	if (type === "drag_drop") {
		return <DragDropQuestionReview question={question} value={value} />;
	}
	if (type === "click_boxes") {
		return <ClickBoxesQuestionReview question={question} value={value} />;
	}

	if (isMatching && matchMode(question) === "assign") {
		return <MatchingQuestionReview question={question} value={value} />;
	}

	if (type === "match") {
		return <MatchingQuestionReview question={question} value={value} />;
	}

	if (isMatching) {
		const current = Array.isArray(value) ? value : [];
		return (
			<div className="space-y-2.5">
				{question.items.map((item, itemIndex) => {
					const picked = current[itemIndex];
					const correct = question.answer?.[itemIndex];
					const hasAnswerKey = Number.isInteger(correct);
					const isCorrect = hasAnswerKey && picked === correct;
					return (
						<div key={itemIndex} className={`grid gap-1 rounded-xl border px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] sm:items-center ${hasAnswerKey ? (isCorrect ? "border-[#54a879] bg-[#eff9f2]" : "border-[#e77945] bg-[#fff5ef]") : "border-[#e1e8ef] bg-white"}`}>
							<span className="text-sm font-medium whitespace-pre-wrap text-[#263654] sm:text-base">{item}</span>
							<span className="text-sm">
								<span className={`font-bold ${hasAnswerKey ? (isCorrect ? "text-[#287849]" : "text-[#a44b13]") : "text-[#42516b]"}`}>
									{Number.isInteger(picked) ? question.choices[picked] : "No answer"}
								</span>
								{hasAnswerKey && !isCorrect && <span className="block text-xs font-bold text-[#287849]">Correct: {question.choices[correct]}</span>}
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
