import LessonImageExpand from "../../LessonImageExpand";

export function TutorialDiagramFrame({ caption, children }) {
	return (
		<figure className="my-6 min-w-0 max-w-full overflow-hidden rounded-2xl border border-[#dbe5f5] bg-[#f7fbff] p-2 sm:p-3 [&_img]:h-auto [&_img]:max-w-full [&_svg]:h-auto [&_svg]:max-w-full">
			<LessonImageExpand>
				<div className="min-w-0 max-w-full overflow-x-auto" tabIndex={0} aria-label="Tutorial diagram; swipe or scroll horizontally to inspect">
					<div className="w-full min-w-0">{children}</div>
				</div>
			</LessonImageExpand>
			<figcaption className="px-2 pb-2 pt-3 text-center text-sm leading-6 text-[#71819b]">{caption}</figcaption>
		</figure>
	);
}
