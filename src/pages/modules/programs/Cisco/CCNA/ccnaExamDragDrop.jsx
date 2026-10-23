import { useState } from "react";

function assignChoice(question, current, choiceIndex, itemIndex) {
	if (!Number.isInteger(choiceIndex) || !Number.isInteger(itemIndex)) return current;
	if (choiceIndex < 0 || choiceIndex >= question.choices.length ||
		itemIndex < 0 || itemIndex >= question.items.length) return current;
	const next = Array.from({ length: question.items.length }, (_, index) => current[index] ?? null);
	next.forEach((assignedChoice, index) => {
		if (index !== itemIndex && assignedChoice === choiceIndex) next[index] = null;
	});
	next[itemIndex] = choiceIndex;
	return next;
}

export function DragDropQuestionInput({ question, value, onChange, disabled }) {
	const [activeChoice, setActiveChoice] = useState(null);
	const assignments = Array.isArray(value) ? value : question.items.map(() => null);
	const usedChoices = new Set(assignments.filter(Number.isInteger));

	if (question.dragDropMode === "items-to-choices") {
		function assignItem(itemIndex, choiceIndex) {
			if (disabled || !Number.isInteger(itemIndex) || !Number.isInteger(choiceIndex)) return;
			if (itemIndex < 0 || itemIndex >= question.items.length ||
				choiceIndex < 0 || choiceIndex >= question.choices.length) return;
			const next = Array.from({ length: question.items.length }, (_, index) => assignments[index] ?? null);
			next[itemIndex] = choiceIndex;
			onChange(next);
			setActiveChoice(null);
		}

		return (
			<div className="space-y-4">
				<p className="text-sm text-[#70809a]">
					Drag each command onto the router where it belongs. Multiple commands may go to the same router; unused commands stay unassigned.
				</p>
				<div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
					<section aria-label="Draggable commands" className="space-y-2 rounded-2xl border border-[#d9e1ef] bg-[#f7f9fc] p-3">
						<h3 className="text-xs font-bold uppercase tracking-wide text-[#64748b]">Commands</h3>
						{question.items.map((item, itemIndex) => (
							<button
								key={itemIndex}
								type="button"
								draggable={!disabled}
								disabled={disabled}
								onClick={() => setActiveChoice((current) => current === itemIndex ? null : itemIndex)}
								onDragStart={(event) => {
									event.dataTransfer.setData("text/plain", String(itemIndex));
									event.dataTransfer.effectAllowed = "move";
									setActiveChoice(itemIndex);
								}}
								onDragEnd={() => setActiveChoice(null)}
								aria-pressed={activeChoice === itemIndex}
								className={`w-full cursor-grab rounded-xl border px-3 py-2.5 text-left font-mono text-xs transition active:cursor-grabbing disabled:cursor-default sm:text-sm ${
									activeChoice === itemIndex
										? "border-[#005b6b] bg-[#e8f3f4] text-[#005b6b]"
										: Number.isInteger(assignments[itemIndex])
											? "border-[#c7d5e5] bg-[#edf2f8] text-[#64748b]"
											: "border-dashed border-[#9aa8bc] bg-white text-[#263654] hover:border-[#005b6b]"
								}`}
							>
								{item}
							</button>
						))}
					</section>
					<section aria-label="Router drop targets" className="space-y-2">
						<h3 className="text-xs font-bold uppercase tracking-wide text-[#64748b]">Routers</h3>
						{question.choices.map((choice, choiceIndex) => {
							const assignedItems = assignments.flatMap((target, itemIndex) =>
								target === choiceIndex ? [itemIndex] : [],
							);
							return (
								<div
									key={choiceIndex}
									onDragOver={(event) => {
										if (!disabled) event.preventDefault();
									}}
									onDrop={(event) => {
										event.preventDefault();
										assignItem(Number(event.dataTransfer.getData("text/plain")), choiceIndex);
									}}
									onClick={() => {
										if (activeChoice !== null) assignItem(activeChoice, choiceIndex);
									}}
									onKeyDown={(event) => {
										if (activeChoice !== null && (event.key === "Enter" || event.key === " ")) {
											event.preventDefault();
											assignItem(activeChoice, choiceIndex);
										}
									}}
									role="button"
									tabIndex={disabled ? -1 : 0}
									aria-label={`Drop commands for ${choice}`}
									className={`min-h-20 rounded-xl border p-3 text-left transition ${
										activeChoice !== null && !disabled
											? "cursor-pointer border-dashed border-[#005b6b] bg-[#f0f7f7]"
											: "border-[#d9e1ef] bg-white"
									}`}
								>
									<span className="block text-sm font-bold text-[#263654]">{choice}</span>
									<div className="mt-2 space-y-1.5">
										{assignedItems.length ? assignedItems.map((itemIndex) => (
											<div key={itemIndex} className="flex items-start justify-between gap-2 rounded-lg border border-[#8bb8bf] bg-[#e8f3f4] px-2 py-1 text-xs text-[#005b6b]">
												<span className="font-mono">{question.items[itemIndex]}</span>
												{!disabled && (
													<button
														type="button"
														onClick={(event) => {
															event.stopPropagation();
															const next = [...assignments];
															next[itemIndex] = null;
															onChange(next);
														}}
														className="shrink-0 text-xs font-semibold underline"
													>
														Remove
													</button>
												)}
											</div>
										)) : (
											<div className="rounded-lg border border-dashed border-[#cbd5e1] px-2 py-2 text-sm text-[#94a3b8]">
												Drop commands here
											</div>
										)}
									</div>
								</div>
							);
						})}
					</section>
				</div>
			</div>
		);
	}

	function assign(choiceIndex, itemIndex) {
		if (disabled) return;
		onChange(assignChoice(question, assignments, choiceIndex, itemIndex));
		setActiveChoice(null);
	}

	return (
		<div className="space-y-4">
			<p className="text-sm text-[#70809a]">
				Drag each answer onto its matching item, or select an answer and then choose an item.
			</p>
			<div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
				<section aria-label="Draggable answers" className="space-y-2 rounded-2xl border border-[#d9e1ef] bg-[#f7f9fc] p-3">
					<h3 className="text-xs font-bold uppercase tracking-wide text-[#64748b]">Answers</h3>
					{question.choices.map((choice, choiceIndex) => {
						const assigned = usedChoices.has(choiceIndex);
						return (
							<button
								key={choiceIndex}
								type="button"
								draggable={!disabled}
								disabled={disabled}
								onClick={() => setActiveChoice((current) => current === choiceIndex ? null : choiceIndex)}
								onDragStart={(event) => {
									event.dataTransfer.setData("text/plain", String(choiceIndex));
									event.dataTransfer.effectAllowed = "move";
									setActiveChoice(choiceIndex);
								}}
								onDragEnd={() => setActiveChoice(null)}
								aria-pressed={activeChoice === choiceIndex}
								className={`w-full cursor-grab rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition active:cursor-grabbing disabled:cursor-default ${
									activeChoice === choiceIndex
										? "border-[#005b6b] bg-[#e8f3f4] text-[#005b6b]"
										: assigned
											? "border-[#c7d5e5] bg-[#edf2f8] text-[#64748b]"
											: "border-dashed border-[#9aa8bc] bg-white text-[#263654] hover:border-[#005b6b]"
								}`}
							>
								{choice}
							</button>
						);
					})}
				</section>
				<section aria-label="Drop answers onto matching items" className="space-y-2">
					<h3 className="text-xs font-bold uppercase tracking-wide text-[#64748b]">Match each item</h3>
					{question.items.map((item, itemIndex) => {
						const choiceIndex = assignments[itemIndex];
						return (
							<div
								key={itemIndex}
								onDragOver={(event) => {
									if (!disabled) event.preventDefault();
								}}
								onDrop={(event) => {
									event.preventDefault();
									assign(Number(event.dataTransfer.getData("text/plain")), itemIndex);
								}}
								onClick={() => {
									if (activeChoice !== null) assign(activeChoice, itemIndex);
								}}
								onKeyDown={(event) => {
									if (activeChoice !== null && (event.key === "Enter" || event.key === " ")) {
										event.preventDefault();
										assign(activeChoice, itemIndex);
									}
								}}
								role="button"
								tabIndex={disabled ? -1 : 0}
								aria-label={`Drop an answer for ${item}`}
								className={`min-h-16 rounded-xl border p-3 text-left transition ${
									activeChoice !== null && !disabled && !Number.isInteger(choiceIndex)
										? "cursor-pointer border-dashed border-[#005b6b] bg-[#f0f7f7]"
										: "border-[#d9e1ef] bg-white"
								}`}
							>
								<span className="block text-sm font-semibold text-[#263654]">{item}</span>
								<span className={`mt-2 block min-h-8 rounded-lg border px-2 py-1 text-sm ${
									Number.isInteger(choiceIndex)
										? "border-[#8bb8bf] bg-[#e8f3f4] text-[#005b6b]"
										: "border-dashed border-[#cbd5e1] text-[#94a3b8]"
								}`}>
									{Number.isInteger(choiceIndex) ? question.choices[choiceIndex] : "Drop answer here"}
								</span>
								{Number.isInteger(choiceIndex) && !disabled && (
									<button
										type="button"
										onClick={(event) => {
											event.stopPropagation();
											const next = [...assignments];
											next[itemIndex] = null;
											onChange(next);
										}}
										className="mt-2 text-xs font-semibold text-[#526584] underline"
									>
										Remove answer
									</button>
								)}
							</div>
						);
					})}
				</section>
			</div>
		</div>
	);
}

export function DragDropQuestionReview({ question, value }) {
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
							Number.isInteger(correct)
								? isCorrect ? "border-[#54a879] bg-[#eff9f2]" : "border-[#e77945] bg-[#fff5ef]"
								: "border-[#e1e8ef] bg-white"
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
