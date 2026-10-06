export function TutorialDiagramFrame({ caption, children }) {
	return (
		<figure className="my-6 rounded-2xl border border-[#dbe5f5] bg-[#f7fbff] p-2 sm:p-3">
			<div className="overflow-x-auto" tabIndex={0} aria-label="Tutorial diagram; swipe or scroll horizontally to inspect">
				<div className="min-w-[720px] sm:min-w-0">{children}</div>
			</div>
			<figcaption className="px-2 pb-2 pt-3 text-center text-sm leading-6 text-[#71819b]">{caption}</figcaption>
		</figure>
	);
}
