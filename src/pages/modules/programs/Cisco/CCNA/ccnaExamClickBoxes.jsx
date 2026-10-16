import { useEffect, useRef, useState } from "react";

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
	const boardRef = useRef(null);
	const previousAssignments = useRef(assignments);
	const [animatingChoices, setAnimatingChoices] = useState(() => new Set());

	useEffect(() => {
		const previous = previousAssignments.current;
		const changedItems = assignments.flatMap((assigned, index) =>
			assigned === previous[index] ? [] : [index],
		);
		if (changedItems.length === 0) return;
		const changedChoices = new Set(changedItems.flatMap((index) =>
			[previous[index], assignments[index]].filter(Number.isInteger),
		));
		const board = boardRef.current;
		setAnimatingChoices((current) => new Set([...current, ...changedChoices]));
		const animations = [];
		if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			for (const choiceIndex of changedChoices) {
				const currentOwner = assignments.indexOf(choiceIndex);
				const previousOwner = previous.indexOf(choiceIndex);
				const sourceItem = currentOwner >= 0 ? currentOwner : previousOwner;
				if (sourceItem < 0) continue;
				const source = board?.querySelector(
					`[data-click-box="${sourceItem}"][data-choice="${choiceIndex}"]`,
				);
				if (!source) continue;
				const destinations = [...(board?.querySelectorAll(`[data-choice="${choiceIndex}"]`) ?? [])]
					.filter((element) => element !== source);
				const sourceBounds = source.getBoundingClientRect();
				const isBeingAssigned = currentOwner >= 0;
				for (const destination of destinations) {
					const destinationBounds = destination.getBoundingClientRect();
					const clone = source.cloneNode(true);
					clone.textContent = question.choices[choiceIndex];
					const style = window.getComputedStyle(source);
					Object.assign(clone.style, {
						position: "fixed",
						left: `${sourceBounds.left}px`,
						top: `${sourceBounds.top}px`,
						width: `${sourceBounds.width}px`,
						height: `${sourceBounds.height}px`,
						margin: "0",
						pointerEvents: "none",
						zIndex: "1200",
					});
					clone.style.backgroundColor = style.backgroundColor;
					clone.style.border = style.border;
					clone.style.color = style.color;
					clone.setAttribute("aria-hidden", "true");
					clone.tabIndex = -1;
					document.body.append(clone);
					destination.style.visibility = "hidden";
					const x = destinationBounds.left - sourceBounds.left;
					const y = destinationBounds.top - sourceBounds.top;
					const animation = clone.animate(
						isBeingAssigned
							? [
								{ transform: "translate(0, 0) scale(1)", opacity: 1 },
								{ transform: `translate(${x}px, ${y}px) scale(0.85)`, opacity: 0 },
							]
							: [
								{ transform: `translate(${x}px, ${y}px) scale(0.85)`, opacity: 0 },
								{ transform: "translate(0, 0) scale(1)", opacity: 1 },
							],
						{ duration: 420, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
					);
					animations.push(animation.finished.finally(() => {
						clone.remove();
						destination.style.visibility = "";
					}));
				}
			}
		}

		previousAssignments.current = assignments;
		Promise.allSettled(animations).then(() => {
			setAnimatingChoices((current) => {
				const next = new Set(current);
				for (const choiceIndex of changedChoices) next.delete(choiceIndex);
				return next;
			});
		});
	}, [assignments, question.choices]);

	return (
		<div className="space-y-2">
			<p className="text-sm text-[#263654]">
				Click one of the boxes on the right to match it with the corresponding box on the left.
			</p>
			<div ref={boardRef} className="overflow-x-auto border border-[#bdbdbd] bg-white">
				<div className="min-w-[760px]">
					{question.items.map((item, itemIndex) => (
						<div
							key={itemIndex}
							className="grid min-h-[54px] grid-cols-[minmax(280px,1fr)_minmax(660px,1fr)] border-b border-[#d0d0d0] last:border-b-0"
						>
							<div className="flex min-w-0 items-center border-r border-[#d0d0d0] px-2.5 py-2 text-sm leading-5 text-[#263654]">
								{item}
							</div>
							<div className="flex items-center gap-2 overflow-x-auto px-2.5 py-2">
								{question.choices.map((choice, choiceIndex) => {
									const selected = assignments[itemIndex] === choiceIndex;
									const usedElsewhere = assignments.some((assigned, index) =>
										index !== itemIndex && assigned === choiceIndex,
									);
									const animating = animatingChoices.has(choiceIndex);
									return (
										<button
											key={choiceIndex}
											type="button"
											data-click-box={itemIndex}
											data-choice={choiceIndex}
											disabled={disabled || (usedElsewhere && !animating)}
											aria-pressed={selected}
											aria-label={`${choice}${usedElsewhere ? ", already matched" : ""}`}
											onClick={() => onChange(assignChoice(question, assignments, choiceIndex, itemIndex))}
											className={`shrink-0 border border-dashed px-2 py-1.5 text-left text-[13px] leading-5 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#005b6b] disabled:cursor-default ${
												selected
													? "border-[#405f8c] bg-[#e8eef7] font-semibold text-[#17345f]"
													: usedElsewhere || animating
														? "pointer-events-none scale-90 border-transparent bg-transparent text-transparent opacity-0"
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
