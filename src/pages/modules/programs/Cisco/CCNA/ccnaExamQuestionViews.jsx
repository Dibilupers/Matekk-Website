import { questionType, requiredSelections } from "../../../../../utils/ccnaExamGrading";

const letter = (i) => String.fromCharCode(65 + i);

/* Answer input for one exam question (pick one, choose two, or matching). */
export function QuestionInput({ question, value, onChange, disabled }) {
	const type = questionType(question);

	if (type === "match") {
		const current = Array.isArray(value) ? value : question.items.map(() => null);
		return (
			<div className="space-y-3">
				<p className="text-sm text-[#70809a]">Match each item on the left with the correct answer.</p>
				{question.items.map((item, itemIndex) => (
					<div key={item} className="ccna-answer-choice grid gap-2 rounded-2xl border border-[#d9e1ef] bg-white px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] sm:items-center">
						<span className="text-[15px] sm:text-base whitespace-pre-wrap text-[#263654]">{item}</span>
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
								<option key={choice} value={choiceIndex}>{choice}</option>
							))}
						</select>
					</div>
				))}
			</div>
		);
	}

	const isMulti = type === "multi";
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
				const isSelected = isMulti ? selected.includes(optionIndex) : selected === optionIndex;
				return (
					<button
						key={option}
						type="button"
						onClick={() => choose(optionIndex)}
						disabled={disabled}
						aria-pressed={isSelected}
						className={`ccna-answer-choice ccna-dark-hover flex min-h-[60px] w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition disabled:cursor-default ${isSelected ? "border-[#005b6b] bg-[#e8f3f4] text-[#263654]" : "border-[#d9e1ef] bg-white text-[#263654] hover:border-[#8bb8bf] hover:bg-[#f0f7f7]"}`}
					>
						<span className={`flex h-8 w-8 shrink-0 items-center justify-center ${isMulti ? "rounded-md" : "rounded-full"} text-sm font-bold ${isSelected ? "bg-[#005b6b] text-white" : "bg-[#e8f3f4] text-[#005b6b]"}`}>
							{letter(optionIndex)}
						</span>
						<span className="text-[15px] sm:text-base whitespace-pre-wrap">{option}</span>
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
		const current = Array.isArray(value) ? value : [];
		return (
			<div className="space-y-2.5">
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

	const correctSet = new Set(type === "multi" ? question.answer : [question.answer]);
	const pickedSet = new Set(type === "multi" ? (Array.isArray(value) ? value : []) : value === undefined ? [] : [value]);

	return (
		<div className="space-y-2.5">
			{question.options.map((option, optionIndex) => {
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
						<span className="flex-1 text-sm font-medium sm:text-base whitespace-pre-wrap">{option}</span>
						{isSelectedAnswer && !isCorrectAnswer && <span className="text-xs font-bold text-[#a44b13]">Your answer</span>}
						{isCorrectAnswer && <span className="text-xs font-bold text-[#287849]">Correct answer</span>}
					</div>
				);
			})}
		</div>
	);
}
