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

function chooseClickBox(event, question, assignments, choiceIndex, itemIndex, onChange) {
	const selectedBox = event.currentTarget;
	const previousBounds = selectedBox.getBoundingClientRect();
	const nextAssignments = assignChoice(question, assignments, choiceIndex, itemIndex);
	const isBeingAssigned = nextAssignments[itemIndex] === choiceIndex;
	const transitionDuration = isBeingAssigned ? 900 : 210;

	if (isBeingAssigned && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		const answerCell = selectedBox.parentElement;
		const questionRow = answerCell?.parentElement;
		const board = questionRow?.parentElement;
		const boardChoices = [...(board?.querySelectorAll("[data-choice]") ?? [])];
		const previousChoiceBounds = new Map(
			boardChoices
				.filter((choice) => choice !== selectedBox && choice.getAttribute("aria-hidden") !== "true")
				.map((choice) => [choice, choice.getBoundingClientRect()]),
		);
		const sources = new Set([
			...(board?.querySelectorAll(`[data-choice="${choiceIndex}"]`) ?? []),
			...(answerCell?.querySelectorAll("[data-choice]") ?? []),
		]);
		const clones = [...sources]
			.filter((source) => source !== selectedBox && source.getAttribute("aria-hidden") !== "true")
			.map((source) => {
				const bounds = source.getBoundingClientRect();
				if (!bounds.width || !bounds.height) return null;
				const clone = source.cloneNode(true);
				const style = window.getComputedStyle(source);
				for (const property of [
					"background-color", "border", "border-radius", "box-shadow", "box-sizing", "color",
					"display", "font-family", "font-size", "font-weight", "line-height", "padding", "text-align",
				]) {
					clone.style.setProperty(property, style.getPropertyValue(property));
				}
				Object.assign(clone.style, {
					position: "fixed",
					left: `${bounds.left}px`,
					top: `${bounds.top}px`,
					width: `${bounds.width}px`,
					height: `${bounds.height}px`,
					margin: "0",
					pointerEvents: "none",
					zIndex: "1200",
				});
				clone.setAttribute("aria-hidden", "true");
				clone.tabIndex = -1;
				document.body.append(clone);
				return { clone, bounds };
			})
			.filter(Boolean);

		onChange(nextAssignments);
		requestAnimationFrame(() => {
			if (!selectedBox.isConnected) {
				clones.forEach(({ clone }) => clone.remove());
				return;
			}
			const targetBounds = selectedBox.getBoundingClientRect();
			const x = previousBounds.left - targetBounds.left;
			const y = previousBounds.top - targetBounds.top;
			if (x || y) {
				selectedBox.animate(
					[
						{ transform: `translate(${x}px, ${y}px)` },
						{ transform: "translate(0, 0)" },
					],
					{ duration: transitionDuration, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
				);
			}
			previousChoiceBounds.forEach((bounds, choice) => {
				if (sources.has(choice) || !choice.isConnected || choice.getClientRects().length === 0) return;
				const nextBounds = choice.getBoundingClientRect();
				const x = bounds.left - nextBounds.left;
				const y = bounds.top - nextBounds.top;
				if (!x && !y) return;
				choice.animate(
					[
						{ transform: `translate(${x}px, ${y}px)` },
						{ transform: "translate(0, 0)" },
					],
					{ duration: transitionDuration, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
				);
			});
			clones.forEach(({ clone, bounds }) => {
				const x = targetBounds.left + targetBounds.width / 2 - bounds.left - bounds.width / 2;
				const y = targetBounds.top + targetBounds.height / 2 - bounds.top - bounds.height / 2;
				const animation = clone.animate(
					[
						{ transform: "translate(0, 0) scale(1)", opacity: 1 },
						{
							transform: `translate(${x}px, ${y}px) scale(0.1)`,
							opacity: 0,
						},
					],
					{ duration: transitionDuration, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
				);
				animation.finished.then(
					() => clone.remove(),
					() => clone.remove(),
				);
			});
		});
		return;
	}

	onChange(nextAssignments);

	if (isBeingAssigned || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	requestAnimationFrame(() => {
		if (!selectedBox.isConnected) return;
		const nextBounds = selectedBox.getBoundingClientRect();
		const x = previousBounds.left - nextBounds.left;
		const y = previousBounds.top - nextBounds.top;
		if (!x && !y) return;
		selectedBox.animate(
			[
				{ transform: `translate(${x}px, ${y}px)` },
				{ transform: "translate(0, 0)" },
			],
			{ duration: transitionDuration, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
		);
	});
}

export function ClickBoxesQuestionInput({ question, value, onChange, disabled }) {
	const assignments = Array.isArray(value) ? value : question.items.map(() => null);

	return (
		<div className="space-y-2">
			<p className="text-sm text-[#263654]">
				Choose one of the answer boxes on the right to match each item on the left.
			</p>
			<div className="min-w-0 border border-[#bdbdbd] bg-white">
				{question.items.map((item, itemIndex) => (
					<div
						key={itemIndex}
						className="grid min-h-[54px] min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b border-[#d0d0d0] last:border-b-0"
					>
						<div className="flex min-w-0 items-center border-r border-[#d0d0d0] px-2.5 py-2 text-sm leading-5 text-[#263654]">
							{item}
						</div>
						<div className="flex min-w-0 flex-wrap items-center px-2.5 py-2">
							{question.choices
								.map((choice, choiceIndex) => ({ choice, choiceIndex }))
								.sort((first, second) =>
									Number(second.choiceIndex === assignments[itemIndex]) -
									Number(first.choiceIndex === assignments[itemIndex]),
								)
								.map(({ choice, choiceIndex }) => {
									const selected = assignments[itemIndex] === choiceIndex;
									const rowAssigned = Number.isInteger(assignments[itemIndex]);
									const usedElsewhere = assignments.some((assigned, index) =>
										index !== itemIndex && assigned === choiceIndex,
									);
									const collapsed = usedElsewhere || (rowAssigned && !selected);
									return (
										<button
											key={choiceIndex}
											type="button"
											data-choice={choiceIndex}
											disabled={disabled || collapsed}
											aria-hidden={collapsed}
											tabIndex={collapsed ? -1 : undefined}
											aria-pressed={selected}
											aria-label={`${choice}${usedElsewhere ? ", already matched" : ""}`}
											onClick={(event) => chooseClickBox(event, question, assignments, choiceIndex, itemIndex, onChange)}
											className={`box-border min-w-0 max-w-full overflow-hidden whitespace-normal break-words border border-dashed px-2 py-1.5 text-left text-[13px] leading-5 [overflow-wrap:anywhere] transition-[max-width,opacity,padding,border-width,background-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#005b6b] disabled:cursor-default motion-reduce:transition-none ${
												selected
													? "border-2 border-[#16a34a] bg-[#ecfdf3] font-semibold text-[#14532d] shadow-[0_0_0_1px_rgba(22,163,74,0.18)]"
													: collapsed
														? "hidden"
														: "border-[#999] bg-white text-[#17345f] hover:bg-[#f1f5fa]"
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
	);
}

export function ClickBoxesQuestionReview({ question, value }) {
	const selected = Array.isArray(value) ? value : [];
	return (
		<div className="min-w-0 border border-[#bdbdbd] bg-white">
			{question.items.map((item, itemIndex) => {
				const picked = selected[itemIndex];
				const correct = question.answer?.[itemIndex];
				const isCorrect = Number.isInteger(correct) && picked === correct;
				return (
					<div
						key={itemIndex}
						className={`grid min-h-[54px] min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b border-[#d0d0d0] last:border-b-0 ${
							isCorrect ? "bg-white" : "bg-[#fff8f4]"
						}`}
					>
						<div className="flex min-w-0 items-center border-r border-[#d0d0d0] px-2.5 py-2 text-sm text-[#263654]">{item}</div>
						<div className="flex min-w-0 flex-wrap items-center px-2.5 py-2 text-sm">
							<span className={`mr-2 min-w-0 break-words [overflow-wrap:anywhere] ${isCorrect ? "text-[#236a43]" : "text-[#a44b13]"}`}>
								{Number.isInteger(picked) ? question.choices[picked] : "No answer"}
							</span>
							{Number.isInteger(correct) && !isCorrect && (
								<span className="min-w-0 break-words text-xs font-semibold text-[#287849] [overflow-wrap:anywhere]">
									Correct: {question.choices[correct]}
								</span>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
