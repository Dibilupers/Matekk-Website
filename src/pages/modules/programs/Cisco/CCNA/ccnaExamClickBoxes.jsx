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
				Click an answer, then click the box beside the matching statement. Each answer can be used once.
			</p>
			<div className="overflow-hidden rounded-xl border border-[#cbd5e1] bg-white">
				{question.items.map((item, itemIndex) => {
					const choiceIndex = assignments[itemIndex];
					return (
						<div key={itemIndex} className={`grid gap-2 border-b border-[#e2e8f0] p-2.5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_15rem] sm:items-center sm:px-3 ${activeChoice !== null && !Number.isInteger(choiceIndex) ? "bg-[#f8fafc]" : ""}`}>
							<span className="flex min-w-0 items-start gap-2 whitespace-pre-wrap text-sm text-[#263654]">
								<span className="shrink-0 font-semibold">{itemIndex + 1}.</span>
								<span>{item}</span>
							</span>
							<button
								type="button"
								disabled={disabled}
								onClick={() => clickBox(itemIndex)}
								aria-label={Number.isInteger(choiceIndex)
									? activeChoice !== null
										? `Place ${question.choices[activeChoice]} on ${item}`
										: `Remove ${question.choices[choiceIndex]} from ${item}`
									: `Answer box for ${item}`}
								className={`min-h-10 w-full rounded border px-2.5 py-1.5 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005b6b] disabled:cursor-default sm:justify-self-end ${
									Number.isInteger(choiceIndex)
										? "border-[#7b8da8] bg-white font-medium text-[#263654]"
										: activeChoice !== null
											? "border-[#64748b] bg-white text-[#526584] hover:border-[#005b6b] hover:bg-[#f0f7f7]"
											: "border-[#aab6c6] bg-white text-[#64748b] hover:border-[#005b6b]"
								}`}
							>
								{Number.isInteger(choiceIndex)
									? question.choices[choiceIndex]
									: activeChoice !== null
										? "Click to place selected answer"
										: "Click the box"}
							</button>
						</div>
					);
				})}
			</div>
			<section aria-label="Answer choices" className="rounded-xl border border-[#cbd5e1] bg-[#f8fafc] p-3">
				<div className="mb-2 text-sm font-semibold text-[#263654]">Answer choices</div>
				<div className="flex flex-wrap gap-1.5">
					{question.choices.map((choice, choiceIndex) => {
						const used = usedChoices.has(choiceIndex);
						return (
							<button
								key={choiceIndex}
								type="button"
								disabled={disabled || (used && activeChoice !== choiceIndex)}
								onClick={() => activateAnswer(choiceIndex)}
								aria-pressed={activeChoice === choiceIndex}
								className={`min-h-9 rounded border px-2.5 py-1.5 text-left text-sm transition disabled:cursor-default ${
									activeChoice === choiceIndex
										? "border-[#005b6b] bg-[#e8f3f4] font-semibold text-[#005b6b] ring-1 ring-[#005b6b]"
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
