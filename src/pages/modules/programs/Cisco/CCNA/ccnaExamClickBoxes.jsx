import { useState } from "react";

function assignChoice(question, assignments, choiceIndex, itemIndex) {
	if (!Number.isInteger(choiceIndex) || !Number.isInteger(itemIndex) ||
		choiceIndex < 0 || choiceIndex >= question.choices.length ||
		itemIndex < 0 || itemIndex >= question.items.length) return assignments;
	const next = Array.from({ length: question.items.length }, (_, index) => assignments[index] ?? null);
	next.forEach((assigned, index) => {
		if (index !== itemIndex && assigned === choiceIndex) next[index] = null;
	});
	next[itemIndex] = choiceIndex;
	return next;
}

export function ClickBoxesQuestionInput({ question, value, onChange, disabled }) {
	const [activeChoice, setActiveChoice] = useState(null);
	const assignments = Array.isArray(value) ? value : question.items.map(() => null);
	const usedChoices = new Set(assignments.filter(Number.isInteger));

	function activateAnswer(choiceIndex) {
		if (disabled) return;
		setActiveChoice((current) => current === choiceIndex ? null : choiceIndex);
	}

	function clickBox(itemIndex) {
		if (disabled) return;
		if (activeChoice !== null) {
			onChange(assignChoice(question, assignments, activeChoice, itemIndex));
			setActiveChoice(null);
			return;
		}
		if (Number.isInteger(assignments[itemIndex])) {
			const next = [...assignments];
			next[itemIndex] = null;
			onChange(next);
		}
	}

	return (
		<div className="space-y-3">
			<p className="text-sm text-[#70809a]">
				Click an available answer, then click the box beside its matching item. Each answer can be used once. Click a filled box to remove its answer.
			</p>
			<div className="space-y-2">
				{question.items.map((item, itemIndex) => {
					const choiceIndex = assignments[itemIndex];
					return (
						<div key={itemIndex} className="grid gap-2 rounded-xl border border-[#d9e1ef] bg-white p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
							<span className="whitespace-pre-wrap text-sm font-semibold text-[#263654]">{item}</span>
							<button
								type="button"
								disabled={disabled}
								onClick={() => clickBox(itemIndex)}
								aria-label={Number.isInteger(choiceIndex)
									? activeChoice !== null
										? `Place ${question.choices[activeChoice]} on ${item}`
										: `Remove ${question.choices[choiceIndex]} from ${item}`
									: `Answer box for ${item}`}
								className={`min-h-11 rounded-lg border-2 border-dashed px-3 py-2 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005b6b] disabled:cursor-default ${
									Number.isInteger(choiceIndex)
										? "border-[#8bb8bf] bg-[#e8f3f4] font-semibold text-[#005b6b]"
										: "border-[#b8c4d3] bg-[#f8fafc] text-[#64748b] hover:border-[#005b6b]"
								}`}
							>
								{Number.isInteger(choiceIndex) ? question.choices[choiceIndex] : activeChoice !== null ? "Click to place selected answer" : "Click an answer, then place it here"}
							</button>
						</div>
					);
				})}
			</div>
			<section aria-label="Available answers" className="rounded-2xl border border-[#d9e1ef] bg-[#f7f9fc] p-3">
				<h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748b]">Available answers</h3>
				<div className="flex flex-wrap gap-2">
					{question.choices.map((choice, choiceIndex) => {
						const used = usedChoices.has(choiceIndex);
						return (
							<button
								key={choiceIndex}
								type="button"
								disabled={disabled || (used && activeChoice !== choiceIndex)}
								onClick={() => activateAnswer(choiceIndex)}
								aria-pressed={activeChoice === choiceIndex}
								className={`min-h-10 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition disabled:cursor-default ${
									activeChoice === choiceIndex
										? "border-[#005b6b] bg-[#e8f3f4] text-[#005b6b]"
										: used
										? "border-[#d5deea] bg-[#e9eef5] text-[#8793a5]"
										: "border-[#9aa8bc] bg-white text-[#263654] hover:border-[#005b6b] hover:bg-[#e8f3f4]"
								}`}
							>
								{choice}
							</button>
						);
					})}
				</div>
			</section>
		</div>
	);
}

export function ClickBoxesQuestionReview({ question, value }) {
	const selected = Array.isArray(value) ? value : [];
	return (
		<div className="space-y-2.5">
			{question.items.map((item, itemIndex) => {
				const picked = selected[itemIndex];
				const correct = question.answer?.[itemIndex];
				const isCorrect = Number.isInteger(correct) && picked === correct;
				return (
					<div
						key={itemIndex}
						className={`grid gap-1 rounded-xl border px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] sm:items-center ${
							isCorrect ? "border-[#54a879] bg-[#eff9f2]" : "border-[#e77945] bg-[#fff5ef]"
						}`}
					>
						<span className="whitespace-pre-wrap text-sm font-medium text-[#263654] sm:text-base">{item}</span>
						<span className="text-sm">
							<span className="font-bold text-[#263654]">
								{Number.isInteger(picked) ? question.choices[picked] : "No answer"}
							</span>
							{Number.isInteger(correct) && !isCorrect && (
								<span className="block text-xs font-bold text-[#287849]">Correct: {question.choices[correct]}</span>
							)}
						</span>
					</div>
				);
			})}
		</div>
	);
}
