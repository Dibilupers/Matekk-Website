import { useEffect, useLayoutEffect, useRef, useState } from "react";

const letter = (index) => String.fromCharCode(65 + index);
const EMPTY_CONNECTIONS = [];

function MatchBoard({ question, value, onChange, disabled = false, review = false }) {
	const boardRef = useRef(null);
	const leftDots = useRef([]);
	const rightDots = useRef([]);
	const [activeItem, setActiveItem] = useState(null);
	const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
	const [lines, setLines] = useState([]);
	const connections = Array.isArray(value) ? value : EMPTY_CONNECTIONS;
	useEffect(() => {
		const board = boardRef.current;
		if (!board) return undefined;

		function updateBoardSize() {
			const bounds = board.getBoundingClientRect();
			setBoardSize((current) =>
				current.width === bounds.width && current.height === bounds.height
					? current
					: { width: bounds.width, height: bounds.height },
			);
		}

		updateBoardSize();
		const observer = new ResizeObserver(updateBoardSize);
		observer.observe(board);
		return () => observer.disconnect();
	}, [question.choices.length, question.items.length]);

	function connectTo(choiceIndex) {
		if (disabled || activeItem === null) return;
		const next = Array.from({ length: question.items.length }, (_, index) => connections[index] ?? null);
		if (next[activeItem] === choiceIndex) {
			next[activeItem] = null;
			onChange(next);
			setActiveItem(null);
			return;
		}
		for (let index = 0; index < next.length; index += 1) {
			if (index !== activeItem && next[index] === choiceIndex) next[index] = null;
		}
		next[activeItem] = choiceIndex;
		onChange(next);
		setActiveItem(null);
	}

	function activateItem(itemIndex) {
		if (disabled) return;
		if (Number.isInteger(connections[itemIndex])) {
			const next = [...connections];
			next[itemIndex] = null;
			onChange(next);
			setActiveItem(null);
			return;
		}
		setActiveItem((current) => current === itemIndex ? null : itemIndex);
	}

	function clearChoice(choiceIndex) {
		if (disabled) return;
		const itemIndex = connections.findIndex((answer) => answer === choiceIndex);
		if (itemIndex < 0) return;
		const next = [...connections];
		next[itemIndex] = null;
		onChange(next);
		setActiveItem(null);
	}

	useLayoutEffect(() => {
		const board = boardRef.current;
		if (!board) return;
		const bounds = board.getBoundingClientRect();
		setLines(connections.flatMap((choiceIndex, itemIndex) => {
			if (!Number.isInteger(choiceIndex) || choiceIndex < 0 || choiceIndex >= question.choices.length) return [];
			const left = leftDots.current[itemIndex];
			const right = rightDots.current[choiceIndex];
			if (!left || !right) return [];
			const leftBounds = left.getBoundingClientRect();
			const rightBounds = right.getBoundingClientRect();
			return [{
				itemIndex,
				choiceIndex,
				x1: leftBounds.left + leftBounds.width / 2 - bounds.left,
				y1: leftBounds.top + leftBounds.height / 2 - bounds.top,
				x2: rightBounds.left + rightBounds.width / 2 - bounds.left,
				y2: rightBounds.top + rightBounds.height / 2 - bounds.top,
			}];
		}));
	}, [boardSize, connections, question]);

	return (
		<div className="space-y-3">
			<p className="text-sm text-[#70809a]">
				{review
					? "Your connections are shown below."
					: "Select an item in Column A, then select its match in Column B. Click a connected row to remove its match."}
			</p>
			<div
				role="region"
				aria-label="Scrollable matching board"
				tabIndex={0}
				className="overflow-x-auto rounded-2xl border border-[#d9e1ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5746bd]"
			>
				<div ref={boardRef} className="relative min-w-[640px] overflow-hidden bg-white md:min-w-0">
				{boardSize.width > 0 && (
					<svg
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
						viewBox={`0 0 ${boardSize.width} ${boardSize.height}`}
						preserveAspectRatio="none"
					>
						{lines.map((line) => {
							const correct = review && question.answer[line.itemIndex] === line.choiceIndex;
							return (
								<line
									key={line.itemIndex}
									x1={line.x1}
									y1={line.y1}
									x2={line.x2}
									y2={line.y2}
									stroke={review ? (correct ? "#287849" : "#c7541a") : "#5746bd"}
									strokeWidth="3"
									strokeLinecap="round"
								/>
							);
						})}
					</svg>
				)}
				<div className="relative z-20 flex flex-col">
					<div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] sm:grid-cols-2">
						<div role="heading" aria-level={3} aria-label="Column A" className="grid h-12 place-items-center border-b border-r border-[#e5eaf1] text-xs font-bold uppercase tracking-wider text-[#64748b]">
							Column A
						</div>
						<div role="heading" aria-level={3} aria-label="Column B" className="grid h-12 place-items-center border-b border-[#e5eaf1] text-xs font-bold uppercase tracking-wider text-[#64748b]">
							Column B
						</div>
					</div>
					{Array.from({ length: Math.max(question.items.length, question.choices.length) }, (_, rowIndex) => {
						const item = question.items[rowIndex];
						const choice = question.choices[rowIndex];
						const isActive = activeItem === rowIndex;
						const itemConnected = Number.isInteger(connections[rowIndex]);
						const itemCorrect = review && connections[rowIndex] === question.answer[rowIndex];
						const connectedItem = connections.findIndex((answer) => answer === rowIndex);
						const choiceConnected = connectedItem >= 0;
						const choiceCorrect = review && connectedItem === question.answer.findIndex((answer) => answer === rowIndex);

						return (
							<div key={rowIndex} className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] items-stretch border-b border-[#e5eaf1] sm:grid-cols-2">
								<button
									ref={(element) => { if (element) leftDots.current[rowIndex] = element.querySelector("[data-match-dot]"); }}
									type="button"
									disabled={disabled || review || item === undefined}
									onClick={() => activateItem(rowIndex)}
									aria-label={itemConnected
										? `Remove match for ${item}`
										: `${isActive ? "Cancel connection from" : "Connect"} ${item ?? ""}`}
									aria-pressed={isActive}
									className={`grid min-h-[76px] min-w-0 grid-cols-[1.75rem_minmax(0,1fr)_4rem] items-center gap-1 border-r border-[#e5eaf1] bg-transparent px-2 py-2 text-left focus-visible:z-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#5746bd] disabled:cursor-default sm:grid-cols-[2.25rem_minmax(0,1fr)_4rem] sm:gap-4 sm:px-5 ${isActive ? "bg-[#f6f4ff]/50" : ""}`}
								>
									{item !== undefined && (
										<>
											<span className="text-left text-sm font-semibold tabular-nums text-[#263654] sm:text-base">{rowIndex + 1}.</span>
											<span className="min-w-0 break-words text-left text-[13px] leading-snug text-[#263654] sm:text-base">{item}</span>
											<span className="group grid h-16 w-16 shrink-0 place-items-center rounded-full">
												<span data-match-dot aria-hidden="true" className={`h-[18px] w-[18px] rounded-full border-2 transition ${review
													? (itemCorrect ? "border-[#287849] bg-[#287849]" : itemConnected ? "border-[#c7541a] bg-[#c7541a]" : "border-[#a8b2bf] bg-white")
													: isActive || itemConnected ? "border-[#5746bd] bg-[#5746bd]"
														: "border-[#a8b2bf] bg-white group-hover:border-[#5746bd]"
												}`} />
											</span>
										</>
									)}
								</button>
								{choice !== undefined ? (
									<button
										ref={(element) => { if (element) rightDots.current[rowIndex] = element.querySelector("[data-match-dot]"); }}
										type="button"
										disabled={disabled || review}
										onClick={() => {
											if (activeItem !== null) connectTo(rowIndex);
											else if (choiceConnected) clearChoice(rowIndex);
										}}
										aria-label={choiceConnected ? `Remove match for ${question.items[connectedItem]}: ${choice}` : `Connect to ${choice}`}
										className="grid min-h-[76px] min-w-0 grid-cols-[4rem_minmax(0,1fr)] items-center gap-1 bg-transparent px-2 py-2 text-left focus-visible:z-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#5746bd] disabled:cursor-default sm:gap-4 sm:px-5"
									>
										<span className="group grid h-16 w-16 shrink-0 place-items-center rounded-full">
											<span data-match-dot aria-hidden="true" className={`h-[18px] w-[18px] rounded-full border-2 transition ${review
												? (choiceCorrect ? "border-[#287849] bg-[#287849]" : choiceConnected ? "border-[#c7541a] bg-[#c7541a]" : "border-[#a8b2bf] bg-white")
												: choiceConnected ? "border-[#5746bd] bg-[#5746bd]" : "border-[#a8b2bf] bg-white group-hover:border-[#5746bd]"
											}`} />
										</span>
										<span className="min-w-0 break-words text-[13px] leading-snug text-[#263654] sm:text-base">
											<span className="font-semibold">{letter(rowIndex)}.</span> {choice}
										</span>
									</button>
								) : (
									<div className="min-h-[76px] border-r border-[#e5eaf1]" />
								)}
							</div>
						);
					})}
				</div>
				{!review && activeItem !== null && (
					<p className="sr-only" aria-live="polite">
						Select the matching answer in Column B for {question.items[activeItem]}.
					</p>
				)}
			</div>
			</div>
		</div>
	);
}

export function MatchingQuestionInput({ question, value, onChange, disabled }) {
	return <MatchBoard question={question} value={value} onChange={onChange} disabled={disabled} />;
}

export function MatchingQuestionReview({ question, value }) {
	return <MatchBoard question={question} value={value} disabled review />;
}
