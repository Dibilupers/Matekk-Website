import { useEffect, useLayoutEffect, useRef, useState } from "react";

const letter = (index) => String.fromCharCode(65 + index);
const ROW_HEIGHT = 76;
const EMPTY_CONNECTIONS = [];

function MatchBoard({ question, value, onChange, disabled = false, review = false }) {
	const boardRef = useRef(null);
	const leftDots = useRef([]);
	const rightDots = useRef([]);
	const [activeItem, setActiveItem] = useState(null);
	const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
	const [lines, setLines] = useState([]);
	const connections = Array.isArray(value) ? value : EMPTY_CONNECTIONS;
	const boardHeight = Math.max(question.items.length, question.choices.length) * ROW_HEIGHT;

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
	}, [boardHeight]);

	function connectTo(choiceIndex) {
		if (disabled || activeItem === null) return;
		const next = Array.from({ length: question.items.length }, (_, index) => connections[index] ?? null);
		for (let index = 0; index < next.length; index += 1) {
			if (index !== activeItem && next[index] === choiceIndex) next[index] = null;
		}
		next[activeItem] = choiceIndex;
		onChange(next);
		setActiveItem(null);
	}

	function activateItem(itemIndex) {
		if (disabled) return;
		setActiveItem((current) => current === itemIndex ? null : itemIndex);
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
				{review ? "Your connections are shown below." : "Select a dot in Column A, then select its match in Column B."}
			</p>
			<div
				ref={boardRef}
				className="relative overflow-hidden rounded-2xl border border-[#d9e1ef] bg-white"
				style={{ minHeight: boardHeight }}
			>
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
				<div className="relative z-20 grid h-full grid-cols-2">
					<section aria-label="Column A" className="border-r border-[#e5eaf1]">
						<div role="heading" aria-level={3} className="grid h-12 place-items-center border-b border-[#e5eaf1] text-xs font-bold uppercase tracking-wider text-[#64748b]">
							Column A
						</div>
						<div className="flex flex-col">
							{question.items.map((item, itemIndex) => {
								const isActive = activeItem === itemIndex;
								const connected = Number.isInteger(connections[itemIndex]);
								const correct = review && connections[itemIndex] === question.answer[itemIndex];
								return (
									<div key={itemIndex} className="grid h-[76px] grid-cols-[2.25rem_minmax(0,1fr)_18px] items-center gap-2 px-3 sm:gap-4 sm:px-5">
										<span className="text-left text-sm font-semibold tabular-nums text-[#263654] sm:text-base">{itemIndex + 1}.</span>
										<span className="min-w-0 break-words text-left text-sm leading-snug text-[#263654] sm:text-base">{item}</span>
										<button
											ref={(element) => { leftDots.current[itemIndex] = element; }}
											type="button"
											disabled={disabled || review}
											onClick={() => activateItem(itemIndex)}
											aria-label={`${isActive ? "Cancel connection from" : "Connect"} ${item}`}
											aria-pressed={isActive}
											className={`h-[18px] w-[18px] shrink-0 rounded-full border-2 transition ${review
												? (correct ? "border-[#287849] bg-[#287849]" : connected ? "border-[#c7541a] bg-[#c7541a]" : "border-[#a8b2bf] bg-white")
												: isActive || connected ? "border-[#5746bd] bg-[#5746bd]"
													: "border-[#a8b2bf] bg-white hover:border-[#5746bd]"
											} disabled:cursor-default`}
										/>
									</div>
								);
							})}
						</div>
					</section>
					<section aria-label="Column B">
						<div role="heading" aria-level={3} className="grid h-12 place-items-center border-b border-[#e5eaf1] text-xs font-bold uppercase tracking-wider text-[#64748b]">
							Column B
						</div>
						<div className="flex flex-col">
							{question.choices.map((choice, choiceIndex) => {
								const connectedItem = connections.findIndex((answer) => answer === choiceIndex);
								const correctItem = review ? question.answer.findIndex((answer) => answer === choiceIndex) : -1;
								const connected = connectedItem >= 0;
								const correct = review && connectedItem === correctItem;
								return (
									<div key={choiceIndex} className="grid h-[76px] grid-cols-[18px_minmax(0,1fr)] items-center gap-2 px-3 sm:gap-4 sm:px-5">
										<button
											ref={(element) => { rightDots.current[choiceIndex] = element; }}
											type="button"
											disabled={disabled || review}
											onClick={() => {
												if (activeItem !== null) connectTo(choiceIndex);
												else if (connected) setActiveItem(connectedItem);
											}}
											aria-label={connected ? `Connected to ${question.items[connectedItem]}. Select to change connection.` : `Connect to ${choice}`}
											className={`h-[18px] w-[18px] shrink-0 rounded-full border-2 transition ${review
												? (correct ? "border-[#287849] bg-[#287849]" : connected ? "border-[#c7541a] bg-[#c7541a]" : "border-[#a8b2bf] bg-white")
												: connected ? "border-[#5746bd] bg-[#5746bd]" : "border-[#a8b2bf] bg-white hover:border-[#5746bd]"
											} disabled:cursor-default`}
										/>
										<span className="min-w-0 break-words text-sm leading-snug text-[#263654] sm:text-base">
											<span className="font-semibold">{letter(choiceIndex)}.</span> {choice}
										</span>
									</div>
								);
							})}
						</div>
					</section>
				</div>
				{!review && activeItem !== null && (
					<p className="sr-only" aria-live="polite">
						Select the matching answer in Column B for {question.items[activeItem]}.
					</p>
				)}
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
