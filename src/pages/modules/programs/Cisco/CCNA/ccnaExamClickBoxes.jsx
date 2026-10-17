function assignChoice(question, assignments, choiceIndex, itemIndex) {
	if (!Number.isInteger(choiceIndex) || !Number.isInteger(itemIndex) ||
		choiceIndex < 0 || choiceIndex >= question.choices.length ||
		itemIndex < 0 || itemIndex >= question.items.length) return assignments;
	const next = Array.from({ length: question.items.length }, (_, index) => assignments[index] ?? null);
	if (next[itemIndex] === choiceIndex) {
		next[itemIndex] = null;
		return next;
	}
	next.forEach((assigned, index) => {
		if (index !== itemIndex && assigned === choiceIndex) next[index] = null;
	});
	next[itemIndex] = choiceIndex;
	return next;
}

export function ClickBoxesQuestionInput({ question, value, onChange, disabled }) {
	const assignments = Array.isArray(value) ? value : question.items.map(() => null);

	return (
		<div className="space-y-2">
			<p className="text-sm text-[#263654]">
				Click one of the boxes on the right to match it with the corresponding box on the left.
			</p>
			<div className="overflow-x-auto border border-[#bdbdbd] bg-white">
				<div className="min-w-[760px]">
					{question.items.map((item, itemIndex) => (
						<div
							key={itemIndex}
							className="grid min-h-[54px] grid-cols-[minmax(280px,1fr)_minmax(660px,1fr)] border-b border-[#d0d0d0] last:border-b-0"
						>
							<div className="flex min-w-0 items-center border-r border-[#d0d0d0] px-2.5 py-2 text-sm leading-5 text-[#263654]">
								{item}
							</div>
							<div className="flex items-center overflow-x-auto px-2.5 py-2">
								{question.choices.map((choice, choiceIndex) => {
									const selected = assignments[itemIndex] === choiceIndex;
									const usedElsewhere = assignments.some((assigned, index) =>
										index !== itemIndex && assigned === choiceIndex,
									);
									return (
										<button
											key={choiceIndex}
											type="button"
											disabled={disabled || usedElsewhere}
											aria-hidden={usedElsewhere}
											aria-pressed={selected}
											aria-label={`${choice}${usedElsewhere ? ", already matched" : ""}`}
											onClick={() => onChange(assignChoice(question, assignments, choiceIndex, itemIndex))}
											className={`box-border min-w-0 shrink-0 overflow-hidden whitespace-nowrap border border-dashed px-2 py-1.5 text-left text-[13px] leading-5 transition-[max-width,opacity,padding,border-width,margin,background-color] duration-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#005b6b] disabled:cursor-default motion-reduce:transition-none ${
												selected
													? "mr-2 max-w-[640px] border-2 border-[#16a34a] bg-[#ecfdf3] font-semibold text-[#14532d] shadow-[0_0_0_1px_rgba(22,163,74,0.18)]"
													: usedElsewhere
														? "pointer-events-none mr-0 max-w-0 border-0 px-0 py-0 opacity-0"
														: "mr-2 max-w-[640px] border-[#999] bg-white text-[#17345f] hover:bg-[#f1f5fa]"
											}`}
										>
											{choice}
										</button>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function ClickBoxesQuestionReview({ question, value }) {
	const selected = Array.isArray(value) ? value : [];
	return (
		<div className="overflow-x-auto border border-[#bdbdbd] bg-white">
			<div className="min-w-[540px]">
				{question.items.map((item, itemIndex) => {
					const picked = selected[itemIndex];
					const correct = question.answer?.[itemIndex];
					const isCorrect = Number.isInteger(correct) && picked === correct;
					return (
						<div
							key={itemIndex}
							className={`grid min-h-[54px] grid-cols-[minmax(280px,1fr)_minmax(240px,0.8fr)] border-b border-[#d0d0d0] last:border-b-0 ${
								isCorrect ? "bg-white" : "bg-[#fff8f4]"
							}`}
						>
							<div className="flex items-center border-r border-[#d0d0d0] px-2.5 py-2 text-sm text-[#263654]">
								{item}
							</div>
							<div className="flex flex-wrap items-center gap-2 px-2.5 py-2 text-sm">
								<span className={isCorrect ? "text-[#236a43]" : "text-[#a44b13]"}>
									{Number.isInteger(picked) ? question.choices[picked] : "No answer"}
								</span>
								{Number.isInteger(correct) && !isCorrect && (
									<span className="text-xs font-semibold text-[#287849]">
										Correct: {question.choices[correct]}
									</span>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
